import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage()
{
    const [redir,setredir]=useState(null);
    const {user,setuser}=useContext(UserContext);
    if(!user && !redir)
        return <Navigate to={'/login'}/>
    async function logout()
    {
        await axios.post('logout'); 
        setuser(null);
        setredir('/');
    }
    let {subpage}=useParams();
    if(subpage===undefined)
        subpage='profile'
    if(redir)
        return <Navigate to={redir}/>
    return(
        <div>
            <AccountNav/>
            {subpage==='profile' &&(
                <div className="text-center text-xl mt-10">
                    Logged in as {user.name} ({user.email})<br/>
                    <button className="bg-primary text-white rounded-full py-2 px-5 mt-5" onClick={logout}>Logout</button>
                </div>
            )}
            {subpage==='places' && (
                <PlacesPage/>
            )}
        </div>
    );
}