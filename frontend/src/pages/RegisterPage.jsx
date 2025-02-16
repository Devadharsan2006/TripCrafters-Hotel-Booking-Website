import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage()
{
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [pass,setpass]=useState("");
    async function registerUser(ev)
    {
        ev.preventDefault();
        try{
        await axios.post("/register",{name,email,pass});
        alert('Successfully registered.now you can login!')
    }
    catch(e)
    {
        alert('Registration failed.Please try again later')
    }
    }
    return(
    <div className="mt-20 grow flex items-center justify-around">
    <div className="">
        <h1 className="text-4xl text-center">Register</h1>
        <form className="max-w-2xl mx-auto" onSubmit={registerUser}>
            <input type='text' placeholder="Name..."
                        value={name}
                        onChange={ev => setname(ev.target.value)}/>
            <input type='email' placeholder="Email id..."
                        value={email}
                        onChange={ev => setemail(ev.target.value)}/>
            <input type='password' placeholder="Password..."
                        value={pass}
                        onChange={ev => setpass(ev.target.value)}/>
            <button className="primary">Register</button>
        </form>
        <div className="my-3 text-center text-gray-500">
            Already a member ?
            <Link className='underline text-black'to={'/login'}>Login</Link>
        </div>
    </div>
    </div>
    )
}