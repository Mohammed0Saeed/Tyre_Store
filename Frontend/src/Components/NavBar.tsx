import { useNavigate } from "react-router-dom";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const token = localStorage.getItem("token")

// get the username from the token
function getUserNameFromToken(token: string | null) {
    if (token === null) {
        return null
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.sub; // username
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }

}

export default function() {
    const navigate = useNavigate();

    const handeLogout = () => {
        // remove the token when logging out
        localStorage.removeItem("token")
        navigate('/login')
    }
    
    return (
        <nav className= "w-100 sticky-top bg-white navbar navbar-expand-lg d-flex justify-content-between align-items-center p-3">
            <h5 className="logo m-0">Autoreifen Store</h5>
            <div className="greeting-user d-flex justify-content-center align-items-center gap-3">
                <p className="m-0">Hello {getUserNameFromToken(token)}</p>
                <button className="btn btn-outline-danger" onClick={handeLogout}>log out</button>
            </div>
        </nav>
    );
}