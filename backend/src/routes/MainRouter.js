const express = require('express')
const router = express.Router();
const userRouter = require('./User')
const todoRouter = require('./Todo')

router.use('/user', userRouter );
router.use('/todo', todoRouter)

module.exports = router