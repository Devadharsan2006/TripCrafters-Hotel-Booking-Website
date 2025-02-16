import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place})
{
    const [checkin,setcheckin]=useState('')
    const [checkout,setcheckout]=useState('')
    const [maxguest,setmaxguest]=useState('')
    const [name,setname]=useState('')
    const [phone,setphone]=useState('')
    const [redirect,setredirect]=useState('')
    const {user}=useContext(UserContext)
    useEffect(()=>{
        if(user)
            setname(user.name)
    },[])
    let noofdays=0
    if(checkin && checkout)
    {
        noofdays=differenceInCalendarDays(checkout,checkin)
    }
    async function bookthisplace()
    {
        const response=await axios.post('/bookings',{
            checkin,checkout,maxguest,name,phone,place:place._id,price:noofdays*place.price})
        const bookingid=response.data._id
        setredirect('/account/bookings/${bookingid}')
    }
    if(redirect)
        return <Navigate to={redirect}/>
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                        Price:₹{place.price}/per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                        <div className="py-2 px-4">
                        <label>Check in:</label>
                        <input type="date" value={checkin} onChange={ev=>setcheckin(ev.target.value)}/>
                    </div>
                     <div className="py-2 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" value={checkout} onChange={ev=>setcheckout(ev.target.value)}></input>
                    </div>
                    <div className="py-2 px-4 border-l">
                        <label>No of guest:</label>
                        <input type="number" value={maxguest} onChange={ev=>setmaxguest(ev.target.value)}></input>
                    </div>
                        </div>
                        {noofdays>0 && (
                            <div className="py-2 px-4 border-l border-t">
                            <label>Your Name:</label>
                            <input type="text" value={name} onChange={ev=>setname(ev.target.value)}></input>
                            <label>Phone no:</label>
                            <input type="tel" value={phone} onChange={ev=>setphone(ev.target.value)}></input>
                        </div>
                        )}
                    </div>
                    <button onClick={bookthisplace} className=" mt-4 bg-primary w-full rounded-2xl py-2">Book this
                        {noofdays>0 && (
                            <span className="mx-2">₹{noofdays * place.price}</span>
                        )}
                    </button>
                </div>
    )
}