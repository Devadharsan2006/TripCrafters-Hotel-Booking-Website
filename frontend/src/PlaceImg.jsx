export default function PlaceImg({place,index=0,classname=null})
{
    if(!place.photos.length)
        return '';
    if(!classname)
        classname="object-cover"
    return(
        <img className='object-cover'src={'https://tripcrafters-hotel-booking-website-3.onrender.com/uploads/'+place.photos[index]}></img>
    )
}
