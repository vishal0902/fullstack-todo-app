// cosnimport { PrismaClient } from '@prisma/client';

// import {PrismaClient} from '@prisma/client'
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      }
    })
    
    if(existingUser) {
      return res.json(401).json({
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
        firstName: true,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res
      .status(201)
      .json({
        msg: "User created successfully",
        data: { user: user, token: token },
      });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/signin", async (req, res)=>{
  const {email, password } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password 
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
      message: "Some error occured",
      error: error
    })
  }
  
  


})




module.exports = router;
