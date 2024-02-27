var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require("connect-flash");
const http = require('http');
const { Server } = require('socket.io');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');
var expressSession = require('express-session');
const messageModel = require('./routes/message');
const chatModel = require('./routes/chat');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
	resave: false,
	saveUninitialized: false,
	secret: "secret",
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const server = http.createServer(app);
const io = new Server(server,{
	cors: {
		origin: "*",
	}
});

io.on('connection', (socket) => {
  console.log(`user id :${socket.id}`);
  socket.on('sendMessage', async (data) => {
	const newMessage = await messageModel.create(data);
	const chat = await chatModel.findById(data.reciver);
	chat.messages.push(newMessage._id);
	chat.lastMessage = data.message;
	await chat.save();
	const room = data.reciver;
	socket.to(room).emit("reciveMessage",{room, message: newMessage});
    console.log("Message is",data.message);
	console.log("Room is",data.room);
  });

  socket.on("joinRoom",(room) => {
	socket.join(room);
	console.log("Room",room)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
