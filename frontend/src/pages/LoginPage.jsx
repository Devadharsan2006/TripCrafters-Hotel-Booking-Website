import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage()
{
   const [email,setemail]=useState("");
    const [pass,setpass]=useState("");
    const [redirect,setredirect]=useState(false);
    const {setuser}=useContext(UserContext);
    async function handlesubmit(ev)
    {
      ev.preventDefault();
      try{
         const {data}=await axios.post('/login',{email,pass});
         setuser(data)
         alert('Login Successful')
         setredirect(true);
      }
      catch(e)
      {
         alert('Login Failed')
      }
    }
    if(redirect)
      return <Navigate to={'/'}/>
    return(
    <div className="mt-20 grow flex items-center justify-around">
       <div className="">
         <h1 className="text-4xl text-center">Login</h1>
         <form className="max>-w-2xl mx-auto" onSubmit={handlesubmit} >
            <input type='email' placeholder="Email id..." value={email} onChange={ev=>setemail(ev.target.value)} />
            <input type='password' placeholder="Password..." value={pass} onChange={ev=>setpass(ev.target.value)}/>
            <button className="primary">Login</button>
         </form>
         <div className="my-3 text-center text-gray-500">
            Don't have an account ?
            <Link className='underline text-black'to={'/register'}>Register Now</Link>
         </div>
        </div>
    </div>
    )
}