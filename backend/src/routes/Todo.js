const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/add', auth, async (req, res)=>{
    const {title, description} = req.body;

    const todo = await prisma.todo.create({
        data:{
            title,
            description,
            userId: req.userId
        },
        select:{
            id: true,
            title: true,
            description: true,
            userId: true
        }
    })

    res.status(201).json({
        message: "success",
        todo: todo
    })

})


router.put('/toggleDone', auth, async (req, res)=>{
    // const {title, description} = req.body;

    const todo = await prisma.todo.update({
        where:{
            id: req.body.id
        },
        data: {
            done: req.body.done
        },
        select:{
            id: true,
            title: true,
            description: true,
            done: true
        }
    })
        
        
        

    res.status(201).json({
        message: "success",
        todo: todo
    })

})



router.delete('/delete', auth, async (req, res)=>{
    const todo = await prisma.todo.delete({
        where:{
            id: req.body.id
        }
    })

    res.status(201).json({
        message: "success",
        todo: todo
    })
})


router.get('/getTodos', auth, async (req, res)=>{
    const todos = await prisma.todo.findMany({
        where:{
            userId: req.userId
        },
        select:{
            id: true,
            title: true,
            description: true,
            done: true
        }
    })
    res.status(201).json({
        message: "success",
        todos: todos
    })
})


module.exports = router