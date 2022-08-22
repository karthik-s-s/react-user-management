const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const objectid = mongoose.Types.ObjectId;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/user-management");

app.post("/register", async (req, res) => {
  try {

// const checkEmail = await User.findOne({
//     email: req.body.email,
//   });
//     if(!checkEmail){return res.json({status:"error", user:false})}

    const newPassword = await bcrypt.hash(req.body.password,10)
    console.log(req.body);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      role:"user"
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if(!user){return res.json({status:"error", user:false})}

  const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
  if (isPasswordValid) {
    console.log(user);
    if(user.role === 'user'){
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123",{
          expiresIn:'30m'
        }
      );
      return res.json({ status: "ok", user: token });
    }
    else{
      return res.json({ status: "error", user: false });
    }
    
   
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log("error");
    res.json({ status: "error", error: "invalid token" });
  }

   const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
});
app.post("/quote", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
      const decoded = jwt.verify(token, "secret123");
      const email = decoded.email;
      await User.updateOne({ email: email },{$set:{quote:req.body.quote}});
      return res.json({ status: "ok" });
    } catch (error) {
      console.log("error");
      res.json({ status: "error", error: "invalid token" });
    }
  
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
  });

  app.post("/adminLogin", async (req, res) => {
    console.log(req.body);
    const admin = await User.findOne({
      email: req.body.email,
    });

    if(!admin){return res.json({status:"error", admin:false})}
  
    const isPasswordValid = await bcrypt.compare(req.body.password,admin.password)
    if (isPasswordValid) {
     
      if(admin.role==='admin'){
      
        const token = jwt.sign(
          {
            name: admin.name,
            email: admin.email,
          },
          "secret123"
        );
        return res.json({ status: "ok", admin: token });
      }else{
        return res.json({ status: "error", admin: false });

      }

    } else {
     
      return res.json({ status: "error", admin: false });
    }
  });

  app.get("/users-list",async (req,res)=>{
    // const token = req.headers["x-access-token"];
    try{
      // const decoded = jwt.verify(token, "secret123");

      const allUser = await User.find({role:"user"})
      return res.json(allUser);
    } catch (error) {
      console.log("error");
      return res.json({ status: "error", error: "invalid token" });
    }


  })
  app.get("/delete-user/:id",async (req,res)=>{
    let userId = req.params.id
    console.log(userId);
    await User.deleteOne({_id:objectid(userId)})
    return res.json({ status: "Ok" });

  })

  app.get("/edit-user/:id",async (req,res)=>{
    let userId = req.params.id
    console.log(userId);
    const user = await User.findOne({_id:objectid(userId)})
    return res.json({ user });

  })
  app.post("/update-user/:id",async(req,res)=>{
    let userId = req.params.id
    let userDetails = req.body;

    console.log(userDetails.name);
    console.log(userDetails.email);
    const user = await User.updateOne({_id:objectid(userId)},{
      $set:{
        name:userDetails.name,
        email:userDetails.email,
        password:userDetails.password
      }
      
    })
    console.log(user);
    return res.json({ user });

  })


app.listen(9000, () => {
  console.log("SERVER STARTED");
});
