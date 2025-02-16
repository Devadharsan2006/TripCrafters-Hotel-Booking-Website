export default function PlaceImg({place,index=0,classname=null})
{
    if(!place.photos.length)
        return '';
    if(!classname)
        classname="object-cover"
    return(
        <img className='object-cover'src={'http://localhost:4000/uploads/'+place.photos[index]}></img>
    )
}