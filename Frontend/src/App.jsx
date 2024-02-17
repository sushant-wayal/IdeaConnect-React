import { Outlet } from "react-router-dom"
import { UserProvider } from "./Context/User"
import { useState } from "react"

const App = () => {
	const [jwt, setJwt] = useState("");
	return (
		<UserProvider value={{ jwt, setJwt }}>
			<Outlet/>
		</UserProvider>
	)
}

export default App
