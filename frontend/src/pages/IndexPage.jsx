import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function IndexPage()
{
    const [places,setplaces]=useState([])
    useEffect(()=>{
        axios.get('/places').then(response=>{
        setplaces(response.data)
        })
    },[])
    return(
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {places.length>0 && places.map(place=>(
                <Link to={'/place/'+place._id}>
                    <div className="bg-gray-500 rounded-2xl mb-3">
                    {place.photos?.[0] && (
                        <img className='rounded-2xl aspect-square objcet-cover'src={'http://localhost:4000/uploads/'+place.photos?.[0]}></img>
                    )}
                    </div>
                    <h2 className="font-bold">{place.address}</h2>
                    <h3 className="text-sm">{place.title}</h3>
                    <div className="mt-1">
                    <span className="font-bold">₹{place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    );
}