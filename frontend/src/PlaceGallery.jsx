import { useState } from "react"

export default function PlaceGallery({place})
{
    const [showall,setshowall]=useState(false)
    if(showall)
        {
            return(
                <div className="absolute bg-black text-white min-h-screen inset-0">
                    <div className="bg-black grid gap-10 p-8" >
                        <div>
                            <h2 className="text-3xl">Photos of {place.title}</h2>
                            <button onClick={()=>setshowall(false)}className="fixed right-12 top-8 bg-white rounded-2xl text-black flex py-2 px-4 shadow shadow-black"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
    Close Photos</button>
                        </div>
                    {place?.photos?.length>0 && place.photos.map(photo=>(
                        <div>
                            <img className='min-w-full' src={'https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/'+photo}></img>
                        </div>
                    ))}
                    </div>
                </div>
            )
        }
    return(
        <div className="relative">
            <div className="grid grid-cols-3 gap-4">
            <div>
                {place.photos?.[0] && (
                <img onClick={()=>setshowall(true)} className="object-cover aspect-square rounded-2xl" src={"https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/"+place.photos[0]}></img>)}
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {place.photos?.[1] && (
                <img onClick={()=>setshowall(true)} className="object-cover aspect-square rounded-2xl" src={"https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/"+place.photos[1]}></img>)}
            {place.photos?.[2] && (
                <img onClick={()=>setshowall(true)} className="object-cover aspect-square rounded-2xl" src={"https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/"+place.photos[2]}></img>)}
                {place.photos?.[3] && (
                <img onClick={()=>setshowall(true)} className="object-cover aspect-square rounded-2xl" src={"https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/"+place.photos[3]}></img>)}
                {place.photos?.[4] && (
                <img onClick={()=>setshowall(true)} className="object-cover aspect-square rounded-2xl" src={"https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/"+place.photos[4]}></img>)}
            </div>
            <button onClick={()=>setshowall(true)}className="bg-gray-300 rounded-2xl py-3 px-3 absolute top-2 right-2 shadow shadow-md">
                <div className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
</svg>
Show more photos</div></button>
            </div>
            </div>
    )
}
