const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken")

//jwt
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//POST - LOGIN
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)

        //create jwt
        const token = createToken(user._id)

        res.status(200).json({email, token});
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//POST - SIGNUP
const signupUser = async (req, res) => {
    const { email, password } = req.body
 try{
        const user = await User.signup(email, password)

        //create jwt
        const token = createToken(user._id)

        res.status(200).json({email, token});
    } catch(error){
        res.status(400).json({error: error.message});
    }
}


module.exports = { loginUser, signupUser }