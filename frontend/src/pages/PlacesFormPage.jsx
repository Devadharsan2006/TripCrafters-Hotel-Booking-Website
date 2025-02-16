import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage()
{
    const {id}=useParams();
    const [title,settitle]=useState('');
    const [address,setaddress]=useState('');
    const [addedphotos,setaddedphotos]=useState([]);
    const [perks,setperks]=useState([]);
    const [extrainfo,setextrainfo]=useState('');
    const [desc,setdesc]=useState('');
    const [checkin,setcheckin]=useState('');
    const [checkout,setcheckout]=useState('');
    const [maxguest,setmaxguest]=useState(1);
    const [redirect,setredirect]=useState(false)
    const [price,setprice]=useState(100);
    useEffect(()=>{
        if(!id)
            return;
        axios.get('/places/'+id).then(response =>{
            const {data}=response;
            settitle(data.title)
            setaddress(data.address)
            setaddedphotos(data.photos)
            setcheckin(data.checkin)
            setcheckout(data.checkout)
            setextrainfo(data.extrainfo)
            setdesc(data.desc)
            setmaxguest(data.maxguests)
            setperks(data.perks)
            setprice(data.price)
        })
    },[id])
    async function saveplace(ev)
    {
        ev.preventDefault();
        const placedata={title,address,addedphotos,perks,extrainfo,desc,checkin,checkout,maxguest,price}
        if(id)
        {
            await axios.put('/places',{id,...placedata})
            setredirect(true)
        }
        else{
        await axios.post('/places',placedata)
        setredirect(true)}
    }
    if(redirect)
        return <Navigate to={'/account/places'}/>
    return(
        <div>
            <AccountNav/>
                    <form className="ml-3 mr-3 mt-7" onSubmit={saveplace}>
                        <h2 className="text-2xl ">Title</h2>
                        <input type="text" value={title} onChange={ev=>settitle(ev.target.value)} placeholder="Title"/>
                        <h2 className="text-2xl">Address</h2>
                        <input type="text" value={address} onChange={ev=>setaddress(ev.target.value)} placeholder="Address"/>
                        <h2 className="text-2xl">Photos</h2>
                        <PhotosUploader addedphotos={addedphotos} onChange={setaddedphotos}/>
                        <h2 className="text-2xl">Description</h2>
                        <textarea placeholder="Description of place.." value={desc} onChange={ev=>setdesc(ev.target.value)}></textarea>
                        <h2 className="text-2xl">Perks</h2>
                        <p className="mt-3 text-gray-500">Select the perks of your place</p>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            <Perks selected={perks} onChange={setperks}/>
                        </div>                   
                        <h2 className="mt-4 text-2xl">Extra info</h2>
                        <textarea placeholder="Extra information about the place.." value={extrainfo} onChange={ev=>setextrainfo(ev.target.value)}></textarea>
                        <h2 className="mt-3 text-2xl mb-2">Check in & out times</h2>
                        <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                            <div>
                                <h3>Check in time</h3>
                                <input type="text" value={checkin} onChange={ev=>setcheckin(ev.target.value)}/>
                            </div>
                            <div>
                                <h3>Check out time</h3>
                                <input type="text" value={checkout} onChange={ev=>setcheckout(ev.target.value)}/>
                            </div>
                            <div>
                                <h3>Max no of guests</h3>
                                <input type="number" value={maxguest} onChange={ev=>setmaxguest(ev.target.value)}/>
                            </div>
                            <div>
                                <h3>Price per night</h3>
                                <input type="number" value={price} onChange={ev=>setprice(ev.target.value)}/>
                            </div>
                        </div>
                        <button className="primary">Save</button>
                    </form>
                </div>
    );
}