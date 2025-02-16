const express=require('express')
const app=express();
const cors=require('cors')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Place=require('./models/Place.js')
const mongoose=require('mongoose')
const User=require("./models/User.js")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const imagedownloader=require('image-downloader')
const fs=require('fs')
const bcryptsalt=bcrypt.genSaltSync(10);
const Booking=require('./models/Booking.js')
const multer=require('multer');
const { rejects } = require('assert');
const jwtsecret="daeygfiaegfigde"
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.json())
require('dotenv').config()
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}
));
mongoose.connect(process.env.MONGO_URL);
app.get('/test',(req,res)=>{
    res.json("test page")
});
function getinputfromtoken(req)
{
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtsecret,{},async (err,userdata)=>{
            if(err) throw err;
            resolve(userdata)
        })
    })
}
app.post('/register',async (req,res)=>{
    const {name,email,pass}=req.body;
    try{
    const userdoc=await User.create({
        name,
        email,
        pass:bcrypt.hashSync(pass,bcryptsalt),
    })
    res.json(userdoc)
}
catch(e)
{
    res.status(422).json(e);
}
});
app.post('/login',async (req,res)=>{
    const {email,pass}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc)
    {
        const passok=bcrypt.compareSync(pass,userDoc.pass)
        if(passok)
        {
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtsecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            })
        }
        else
        res.status(422).json('password not ok')
    }
    else
    res.json('not found');
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})
app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body;
    const newname='photo' + Date.now() + '.jpg'
    await imagedownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newname,
    });
    res.json(newname)
})
const photosmiddleware=multer({dest:'uploads'})
app.post('/upload',photosmiddleware.array('photos',100),(req,res)=>{
    const uploadedfiles=[]
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i]
        const parts=originalname.split('.')
        const ext=parts[parts.length-1]
        const newname=path+'.'+ext;
        fs.renameSync(path,newname)
        uploadedfiles.push(newname.replace('uploads\\',''))
    }
    res.json(uploadedfiles)
})
app.post('/places',(req,res)=>{
    const {token}=req.cookies;
    const {title,address,addedphotos,desc,perks,extrainfo,checkin,checkout,maxguest,price}=req.body
    jwt.verify(token,jwtsecret,{},async (err,userdata)=>{
            if(err) throw err;
            const placedoc=await Place.create({
                owner:userdata.id,
                title,address,photos:addedphotos,desc,perks,extrainfo,checkin,checkout,maxguests:maxguest,price,
            })
            res.json(placedoc)
        })
})
app.get('/users-places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtsecret,{},async (err,userdata)=>{
        const {id}=userdata
        res.json(await Place.find({owner:id}))
    })
})
app.get('/places/:id',async (req,res)=>{
    const {id}=req.params
    res.json(await Place.findById(id))
})
app.put('/places',async (req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,addedphotos,desc,perks,extrainfo,checkin,checkout,maxguest,price}=req.body
    const placedoc=await Place.findById(id)
    jwt.verify(token,jwtsecret,{},async (err,userdata)=>{
        const placedoc=await Place.findById(id)
        if(userdata.id===placedoc.owner.toString())
        {
            placedoc.set({
                title,address,photos:addedphotos,desc,perks,extrainfo,checkin,checkout,maxguests:maxguest,price,
            })
            await placedoc.save()
            res.json('ok')
        }
    })
})
app.get('/places',async (req,res)=>{
    res.json(await Place.find())
})
app.post('/bookings',async (req,res)=>{
    const userdata=await getinputfromtoken(req);
    const {place,checkin,checkout,maxguest,name,phone,price}=req.body;
    Booking.create({
        place,checkin,checkout,maxguest,name,phone,price,user:userdata.id,
    }).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        throw err;
    })
})
app.get("/bookings",async (req,res)=>{
    const userdata=await getinputfromtoken(req);
    res.json(await Booking.find({user:userdata.id}).populate('place'))
})
app.listen(4000);