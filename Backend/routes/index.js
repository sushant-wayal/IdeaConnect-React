var express = require('express');
var router = express.Router();
var cors = require("cors");
const userModel = require("./users");
const ideaModel = require("./ideas");
const passport = require("passport");
const localStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const jwtSecret = "idea-Connect";
const upload = require("./multer");
const uploadOnCloudinary = require('./cloudinary');
const fs = require("fs");

router.use(cors({ origin: 'http://localhost:5173' }));

passport.use(new localStrategy(userModel.authenticate()));

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const localFileName = req.file.path;
        const cloudFile = await uploadOnCloudinary(localFileName);
		fs.unlinkSync(localFileName);
		res.json({
            success: true,
            url: cloudFile.url,
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/register",(req,res) => {
	let userData = new userModel({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.secondName,
		contryCode: req.body.countryCode,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		DOB: req.body.dob,
		gender: req.body.gender,
		secret: req.body.nickname,
		profileImage: req.body.profileImage,
		followers: 0,
		following: 0,
		noOfIdeas: 0
	})
	userModel.register(userData, req.body.password)
	.then(() => {
		passport.authenticate("local")(req,res, async () => {
			res.json({
				authenticated: true,
				token: jwt.sign({
					userId: await userModel.findOne({ username: req.body.username })._id,
					username: req.body.username,
				}, jwtSecret),
			})
		})
	})
	.catch(error => {
		res.json({
			authenticated: false,
			error: error,
		})
	})
})

router.post("/login", (req,res,next) => {
	passport.authenticate("local", (err,user) => {
		if (err || !user) {
			return res.json({
				authenticated: false,
			});
		}
		const token = jwt.sign({
			userId: user._id,
			username: user.username,
		}, jwtSecret);
		return res.json({
			authenticated: true,
			token,
		});
	})(req,res,next);
})

const isLoggedIn = (req,res,next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			authenticated: false,
			message: "Authorization Token is required",
		});
	}
	jwt.verify(token.split(' ')[1], jwtSecret, (error, decoded) => {
		if (error) {
			return res.json({
				authenticated: false,
			})
		}
		req.user = decoded;
		next();
	})
}

router.get("/activeUser",(req,res,next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			authenticated: false,
			message: "Authorization Token is required",
		})
	}
	jwt.verify(token.split(' ')[1], jwtSecret, (error, decode) => {
		if (error) {
			return res.json({
				authenticated: false,
			})
		}
		return res.json({
			authenticated: true,
			username: decode.username,
		})
	})
});

router.get("/ideas/feed", isLoggedIn, async (req,res) => {
	const currUser = await userModel.findById(req.user.userId);
	let ideas = [];
	for (let following of currUser.followingList) {
		const followedUser = await userModel.findById(following);
		for (let idea of followedUser.ideas) {
			const currIdea = await ideaModel.findById(idea);
			const ideaOf = await userModel.findById(currIdea.ideaOf);
			let intrested = false;
			for (let intrestedUser of currIdea.intrestedUser) {
				if (intrestedUser.toString() == currUser._id.toString()) {
					intrested = true;
					break;
				}
			}
			ideas.push({
				idea: currIdea,
				profileImage: ideaOf.profileImage,
				intrested: intrested,
				ideaOf: ideaOf.username,
				ideaId: idea,
			});
		}
	}
	ideas.sort((a,b) => b.idea.date-a.idea.date);
	res.json({
		authenticated: true,
		ideas,
	})
})

router.get("/profile/:username", async (req,res) => {
	const username = req.params.username;
	const user = await userModel.findOne({ username });
	res.json(user);
})

router.get("/userInfo/:userId", async (req,res) => {
	const { userId } = req.params;
	const user = await userModel.findById(userId);
	res.json(user);
})

router.get("/checkFollow/:activeUsername/:username", async (req,res) => {
	const { followingList } = await userModel.findOne({
		username: req.params.activeUsername,
	})
	for (let following of followingList) {
		const { username } = await userModel.findById(following);
		if (username == req.params.username) {
			return res.json({
				follow: true,
			})
		}
	}
	return res.json({
		follow: false,
	})
})

router.get("/ideas/:username/:activeUsername", async (req,res) => {
	const currUser = await userModel.findOne({
		username: req.params.username,
	});
	const activeUser = await userModel.findOne({
		username: req.params.activeUsername,
	})
	let ideas = [];
	for (let idea of currUser.ideas) {
		const currIdea = await ideaModel.findById(idea);
		const ideaOf = await userModel.findById(currIdea.ideaOf);
		let intrested = false;
		for (let intrestedUser of currIdea.intrestedUser) {
			if (intrestedUser.toString() == activeUser._id.toString()) {
				intrested = true;
				break;
			}
		}
		ideas.push({
			idea: currIdea,
			profileImage: ideaOf.profileImage,
			intrested: intrested,
			ideaOf: ideaOf.username,
			ideaId: idea,
		});
	}
	ideas.sort((a,b) => b.idea.date-a.idea.date);
	res.json({
		ideas,
	})
})

router.post("/publishIdea", async (req,res) => {
	const currUser = await userModel.findOne({
		username: req.body.username,
	})
	const newIdea = await ideaModel.create({
		ideaOf: currUser._id,
		title: req.body.title,
		categories: req.body.categories,
		media: req.body.media,
		description: req.body.description,
		steps: req.body.steps,
		progress: req.body.progress,
		createdBy: currUser.username,
	})
	currUser.ideas.unshift(newIdea._id);
	currUser.noOfIdeas += 1;
	await currUser.save();
	await newIdea.save();
	res.json({
		success: true,
	})
})

router.get("/updateProgress/:ideaId/:newProgress",async (req,res) => {
	const { ideaId, newProgress } = req.params;
	const idea = await ideaModel.findById(ideaId);
	idea.progress = newProgress;
	await idea.save();
	res.json({
		success: true,
	})
})

router.get("/checkLike/:ideaId/:username",async (req,res) => {
	const { ideaId, username } = req.params;
	const idea = await ideaModel.findById(ideaId);
	for (let user of idea.likedBy) {
		const userData = await userModel.findById(user);
		if (userData.username == username) {
			return res.json({
				liked: true,
			})
		}
	}
	res.json({
		liked: false,
	})
});

router.get("/likeIdea/:ideaId/:username",async (req,res) => {
	const { ideaId, username } = req.params;
	const idea = await ideaModel.findById(ideaId);
	const user = await userModel.findOne({
		username,
	})
	let liked = false;
	for (let user of idea.likedBy) {
		const userData = await userModel.findById(user);
		if (userData.username == username) {
			liked = true;
			break;
		}
	}
	if (!liked) {
		idea.likes++;
		idea.likedBy.unshift(user._id);
	}
	else {
		idea.liked--;
		idea.likedBy.splice(user._id,1);
	}
	idea.save();
	res.json({
		success: true,
		liked,
	})
})

router.get("/likedBy/:ideaId",async (req,res) => {
	const { ideaId } = req.params;
	const idea = await ideaModel.findById(ideaId);
	let likedBy= [];
	for (let user of idea.likedBy) {
		likedBy.push(await userModel.findById(user));
	}
	res.json({
		likedBy,
	})
})

module.exports = router;
