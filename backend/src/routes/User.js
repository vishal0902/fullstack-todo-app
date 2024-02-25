// cosnimport { PrismaClient } from '@prisma/client';

// import {PrismaClient} from '@prisma/client'
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

const express = require("express");

const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    
    if(existingUser) {
      return res.status(401).json({
        message: "Email already taken."
      })
    }
    
    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
      select: {
        id: true,
      },
    });

    const token = jwt.sign({
      userId: user.id
    }, process.env.JWT_SECRET)

    res.status(201).json({
      message: "success",
      token: token
    })

  } catch (error) {
    res.status(401).json({
      message: "Some error happened",
      error: error
    });
  }
});

router.post("/signin", async (req, res)=>{
  const {email, password} = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email, 
        password: password
      }
    })
    
    if(!user){
      throw new Error("Invalid email/password.")
    }

    const token = jwt.sign({
      userId: user.id
    }, process.env.JWT_SECRET)


    res.status(201).json({
      message: "success",
      token: token
    })

  } catch (error) {
    res.status(401).json({
      message: "Some error happened",
      error: error
    })
  }
  
  })


router.get('/getUserData', auth, async (req, res)=>{
   const userData = await prisma.user.findUnique({
     where: {
      id: req.userId
     },
     select: {
      firstName:true,
      lastName: true,
      todos: true
     }
   })
   res.status(201).json({
    message: "success",
    userData: userData
   })
})



module.exports = router;
