import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage()
{
    const [places,setplaces]=useState([])
    useEffect(()=>{
        axios.get('/users-places').then(({data})=>{
            setplaces(data)
        })
    })
    return(
        <div>
            <AccountNav/>
                <div className="text-center mt-7">
                <Link className="inline-flex gap-1 bg-black text-white rounded-full py-3 px-6 " to={'/account/places/new'} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
                Add new Places</Link>
            </div>
            <div className="mt-4">
                {places.length>0 && places.map(place=>(
                   <Link to={'/account/places/'+place._id} className="mb-3 flex gap-5 bg-gray-200 rounded-2xl p-6 align-items-center">
                    <div className="flex bg-gray-300 w-40 h-40 shrink-0">
                        <PlaceImg place={place}/>
                    </div>
                    <div className="grow-0">
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-sm mt-3">{place.desc}</p>
                    </div>
                   </Link> 
                ))}
            </div>
        </div>
    );
}