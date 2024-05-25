const express = require("express");
const mongoose = require("mongoose");
const Workout = require("../model/workoutModel");
const cloudinary = require("../middleware/cloudinary")

//GET all workouts - find
const getWorkouts = async (req, res) => {

  //GET ALL

  const workouts = await Workout.find().sort({ createdAt: -1 });

  try {
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET SINGLE
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //mongoose error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" });
  }

  const workout = await Workout.findById(id);

  //response
  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }
  res.status(200).json(workout);
};

//POST 
const createWorkout = async (req, res) => {

  try {

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const workout = await Workout.create({
      name: req.body.name,
      stack: req.body.stack,
      features: req.body.features,
      url: req.body.url,
      githubUrl: req.body.githubUrl,
      image: result.secure_url,
      cloudinaryId: result.public_id,
    })
    res.status(200).json(workout);
    console.log(workout);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE a single workouts - findOneAndDelete
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  //mongoose error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: error.message })
  }

  const workout = await Workout.findOneAndDelete({ _id: id })

  if (!workout) {
    res.status(404).json({ error: "workout not found" })
  }
  res.status(200).json({ workout })
};

//PATCH a single workouts - findOneAndUpdate
const updateWorkout = async (req, res) => {
  const { id } = req.params

  //mongoose error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" })
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

  //response
  if (!workout) {
    return res.status(404).json({ error: "No workout found" })
  }
  res.status(200).json({ workout })



};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
