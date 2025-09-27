import { useState, type ChangeEvent } from "react";
import bgImgSrc from "../assets/tyre-intro.jpeg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Config/AuthContext";

export default function () {

    const {login} = useAuth()

    // useStates to track the change in userInput and userPassword
    const [userInput, setUserInput] = useState('')
    const [userPassword, setUserPassword] = useState('')

    // navigator for the page according to the login
    const navigate = useNavigate()

    // change the userInput to the give data on change
    const handleUserInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
    }

    // change the userPassowrd to the given data on change
    const handleUserPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value)
    }

    // check the email and password and return true if the data are correct
    const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            email: userInput,
            password: userPassword,
        }, {
            headers: {
            "Content-Type": "application/json",
            },
        })

        const data = response.data;
        console.log("Login successful", data)

        login(data.token, data.role)

        login(data.token, data.role.toLowerCase() as "admin" | "user")
        if (data.role.toUpperCase() === "ADMIN") navigate("/adminpage")
        else navigate("/homepage")


        } catch (err) {
        console.error("Login failed", err)
        alert("Invalid credentials: " + err)
        }
    };


    return (
        <>
            <div className="login-page w-100 h-100 d-flex justify-content-center align-items-center">
                <form onSubmit={handleLogin} className="w-50 p-5 rounded">
                    <div className="mb-3 w-75">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" value={userInput} onChange={handleUserInput} />
                    </div>
                    <div className="mb-3 w-75">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={userPassword} onChange={handleUserPassword} />
                    </div>
                    <button type="submit" className="btn btn-primary">login</button>
                </form>

                <img src={bgImgSrc} className="w-50 h-100 object-fit-cover" />
            </div>
        </>
    )
}