const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/userModel");


//GET - LOGIN
const loginUser = async (req, res) => {
    res.json({mssg: "login user"})
    // const user = await User.findById(id);
    // if (!user) {
    //     return res.status(404).json({ error: "No user found" });
    //   }
    //   const data = res.status(200).json(user);
    //   console.log(data)
}

//POST - SIGNUP
const signupUser = async (req, res) => {
    const { email, password } = req.body
 try{
        const user = await User.signup(email, password)
        res.status(200).json({email, user});

    } catch(error){
        res.status(400).json({error: error.message});
    }
}


module.exports = { loginUser, signupUser }