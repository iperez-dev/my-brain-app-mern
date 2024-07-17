import express from "express"


//GET - get all Memories - find()
const loginUsers = async (req, res) => {

    const getLoginUsers = await Memory.find().sort({ createdAt: -1 });
    try {
      res.status(200).json(memories);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  module.exports = { loginUsers };