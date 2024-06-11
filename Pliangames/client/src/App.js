import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "./App.css"
import Navbar from "./component/Navbar.js"
import Main from "./component/Main.js"
import Mypost from "./component/Mypost.js"
import Profile from "./component/Profile.js";
import Chat from "./component/Chat.js";
import Signup from "./component/Signup.js";
import Login from "./component/Login.js"
import Receive from "./component/Receive.js";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navbar/>}>
            <Route index element={<Main/>} />
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup />}/>
            <Route path="mypost" element={<Mypost/>}/>
            <Route path="chat" element={<Chat />}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="receive" element={<Receive/>}/>
            
        </Route>
    )
)

const App = () => <RouterProvider router={router}/>
export default App