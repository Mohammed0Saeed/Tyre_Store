import NavBar from "./NavBar"
import AdminView from "./AdminView";


export default function() {
    return (
        <div className="user-interface container w-100 h-100 d-flex flex-column align-items-center">
            <NavBar />
            <div className="w-100">
                <AdminView />
            </div>
        </div>
        
    );
}