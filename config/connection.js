const res = require('express/lib/response')
const mongoose = require('mongoose')
 
 const connection_string = process.env.CONNECTIONSTRING

 mongoose.connect(connection_string).then((res)=>{
    console.log("MONGODB ATLAS CONNECTED SUCCESSFULLY WITH EBSERVER");
    
 }).catch(err=>{
    console.log("connection failed!!");
    console.log(err);
    
 })