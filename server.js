const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const mysql=require('mysql');


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors(   ));

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userdb'
});


connection.connect(err =>{
    if(err)
    {
        console.log("error in connecting databse ",err)
    }
    else {
        console.log("Connected successfully to MYSQL")
    }
})


app.get("/",function(req,res){
   connection.query("Select * from signup",function(err,rows){
    if(err)
    {
        res.send("Error in fetching the data",err)
    }
    else
    {
        res.send(rows)
    }
   })

})

    app.post("/signup",function(req,res){
        console.log("called")
        var username=req.body.username;
        var email=req.body.email;
        var password=req.body.password;
        var confirm_password=req.body.confirm_password;
        connection.query("Insert into signup (username,email,password,confirm_password) values (?,?,?,?)",[username,email,password,confirm_password],function(err,result){
            if(err)
            {
                console.log("err while inserting the data",err)
            }

            else
            {
                console.log("Inserted successfully")
                res.send("Inserted successfully")
            }
        })
    })


app.post("/login",function(req,res){
    var name=req.body.username;
    var password=req.body.password;
     
    connection.query(`Select * from signup where username=?`,[name],function(err,result){
        if(err)
        {
            console.log("Err while fetching",err)
        }

        else 
        {
           
            if(result.length>0)
            {
                if(password==result[0].password)
                {
                    console.log("login successfully")
                    res.send("login successfully")
                   
                    
                }
                else
                {
                     console.log("User Credentials doesn't match please check")
                     res.send("User Credentials doesn't match please check")
                  
                }
            }

            else{
                console.log("There no such user please Sigin")
                res.send("There no such user please Sigin")
               
            }
             
        }
    })

})


app.listen(5000,function(req,res){
    console.log("Server is running on port 5000");
})




