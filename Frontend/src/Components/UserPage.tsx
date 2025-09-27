import NavBar from "./NavBar"
import UserView from "./UserView";


export default function () {
    return (
        <div className="user-interface container w-100 h-100 d-flex flex-column align-items-center">
            <NavBar />
            <div className="w-100">
                <UserView />
            </div>
        </div>
        
    );
}