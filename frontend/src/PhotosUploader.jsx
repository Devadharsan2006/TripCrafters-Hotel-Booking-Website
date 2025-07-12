import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({addedphotos,onChange})
{
    const [photolink,setphotolink]=useState('');
    async function addphotobylink(ev)
    {
        ev.preventDefault();
        const {data:filename}=await axios.post('/upload-by-link',{link:photolink})
        onChange(prev =>{
            return [...prev,filename];
        })
        setphotolink('')
    }
    function uploadphoto(ev)
    {
        const files=ev.target.files
        const data=new FormData();
        for(let i=0;i<files.length;i++)
        {
            data.append('photos',files[i])
        }
        axios.post('/upload',data,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        .then(response =>{
            const {data:filenames}=response
            onChange(prev =>{
                return [...prev,...filenames];
            })
        })
    }
    function removephoto(ev,filename)
    {
        ev.preventDefault()
        onChange([...addedphotos.filter(photo=>photo!==filename)])
    }
    function makemainphoto(ev,filename)
    {
        ev.preventDefault();
        const temp=addedphotos.filter(photo=>photo!==filename)
        const newadded=[filename,...temp]
        onChange(newadded)
    }
    return(
        <>
        <div className="flex gap-2">
                            <input type="text" value={photolink} onChange={ev=>setphotolink(ev.target.value)}placeholder="Add using link..."/>
                            <button className="bg-gray-200 rounded-2xl px-4 max-h-12 mt-6" onClick={addphotobylink}>Add&nbsp;Photos</button>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 ml-3 mb-3">
                            {addedphotos.length>0 && addedphotos.map(link =>(
                                <div className="h-32 flex relative" key={link}>
                                    <img className="rounded-2xl w-full"src={"https://tripcrafters-hotel-booking-website-2.onrender.com/uploads/"+link}></img>
                                    <button onClick={ev=>removephoto(ev,link)} className="absolute bottom-1 right-1 text-white p-1 bg-opacity-40 bg-black rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                                    </button>
                                    <button onClick={ev=>makemainphoto(ev,link)} className="absolute bottom-1 left-1 text-white p-1 bg-opacity-40 bg-black rounded-2xl">
                                        {link===addedphotos[0] && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                          </svg>                                          
                                        )}
                                        {link!==addedphotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
                                        )}
                                    </button>
                                </div>
                            ))}
                            <label className="h-32 flex items-center justify-center gap-1 border rounded-2xl text-gray-500 text-3xl p-10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
  <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
</svg>
Upload
                            <input type='file' className="hidden" onChange={uploadphoto}></input>
                            </label>
                        </div>
        </>
    );
}
