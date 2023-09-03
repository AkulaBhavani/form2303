const mysql = require("mysql");
const path= require("node:path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()
app.use(express.static(path.join(__dirname,"./client/build")));

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, "uploads");
    },
    filename:(req, file, cb)=> {
        console.log(file);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //cb(null, file.fieldname + '-' + uniqueSuffix);
     cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage })

let connection = mysql.createConnection({
    host:"localhost",
    port:process.env.dbPort,
    user:process.env.dbUser,
    password:process.env.dbPassword,
    database:process.env.dbName,
})
connection.connect((err)=>{
    if(err){
        console.log("Unable to connect to db")
    }else{
        console.log("Successfully connected to db");
    }
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));

app.post("/signup", upload.single("profilePic"), async (req,res)=>{
    console.log(req.body);
    console.log(req.file)
    //let profilePicPath =`${req.file.destination}/${req,file.filename}`;
    let profilePicPath = `${req.file.destination}/${req.file.filename}`;

     let hashedPassword =  await bcrypt.hash(req.body.password,10);

let query = `insert into users (firstName,lastName,age,email,password,mobileNo,profilePic) values ('${req.body.fn}',
'${req.body.ln}','${req.body.age}','${req.body.email}','${hashedPassword}','${req.body.mobileNo}','${profilePicPath}')`;

connection.query(query,(err,results)=>{

    if(err){
        res.json(err);
    }else {
        res.json({status:"success",msg:"Account created successfully"});
    }
});

    //console.log("inside signup api endpoint");
    //res.json(["account created successfully"]);
});
app.put("/editProfile", upload.single("profilePic"), (req,res)=>{
    console.log(req.body);
    console.log(req.file)
    let profilePicPath = `${req.file.destination}/${req.file.filename}`;
   
    let query = `update users set firstName='${req.body.fn}',lastName='${req.body.ln}',age=${req.body.age},email='${req.body.email}',
    password='${req.body.password}',mobileNo='${req.body.mobileNo}',profilePic='${profilePicPath}' where  id=${req.body.id}`; 

    
 //let query = `insert into users (firstName,lastName,age,email,password,mobileNo,profilePic) values ('${req.body.fn}',
//'${req.body.ln}','${req.body.age}','${req.body.email}','${req.body.password}','${req.body.mobileNo}','${profilePicPath}')`;

connection.query(query,(err,results)=>{

    if(err){
        res.json(err);
    }else {
        res.json({status:"success",msg:"Account updated successfully"});
    }
});

    //console.log("inside signup api endpoint");
    //res.json(["account created successfully"]);
});
app.delete("/deleteAccount",(req,res)=>{
    let query =  `delete from users where id=${req.query.id}`;
    connection.query(query,(err,results)=>{
        if(err){
            res.json(err)
        }else{
            
        res.json({status:"success",msg:"Account deleted successfully"})
        }
    })
});
app.post("/validateLogin",upload.none(),(req,res)=>{

let query = `select * from users where email='${req.body.email}'`;

    connection.query(query, async (err,results)=>{
        if(err){
            res.json(err)
        }else{
            if(results.length > 0){

let isPasswordCorrect = await bcrypt.compare(req.body.password, results[0].password)

              if(isPasswordCorrect == true) {
                console.log(results);
                let encryptedEP = jwt.sign({email:req.body.email,password:req.body.password},"BRN");

              console.log(encryptedEP);

                let userDetails = results[0];
                userDetails.token = encryptedEP;

                delete userDetails.password;
                res.json({status:"success",isLoggedIn:true,details:userDetails,});
              }else {
                res.json({status:"success",isLoggedIn:false,msg:"Invalid Password",})
              }
            }else{
                res.json({status:"success",msg:"Invalid email id"})
            }
        }
    })
})

app.post("/validateToken",upload.none(),(req,res)=>{


    let decryptedToken = jwt.verify(req.boby.token,"BRN");

   
   console.log("decrypted data");
 
    console.log(decryptedToken);

   //res.json(["some dummy response"]);

    let query = `select * from users where email='${decryptedToken.email}'`;
    
        connection.query(query,(err,results)=>{
            if(err){
                res.json(err)
            }else{
                if(results.length > 0){
                  if(results[0].password == decryptedToken.password) {
                    console.log(results);
                    let encryptedEP = jwt.sign({email:req.body.email,password:req.body.password},"BRN");
    
                  console.log(encryptedEP);
    
                    let userDetails = results[0];
                    userDetails.token = encryptedEP;
    
                    delete userDetails.password;
                    res.json({status:"success",isLoggedIn:true,details:userDetails,});
                  }else {
                    res.json({status:"success",isLoggedIn:false,msg:"Invalid Password",})
                  }
                }else{
                    res.json({status:"success",msg:"Invalid email id"})
                }
            }
        })  
    })


app.listen(2222,()=>{
    console.log("Listening to port 2222")
})