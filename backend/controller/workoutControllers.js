const express = require("express");
const mongoose = require("mongoose");
const Workout = require("../model/workoutModel");
const cloudinary = require("../middleware/cloudinary")

//GET all workouts - find
const getWorkouts = async (req, res) => {
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }
  res.status(200).json(workout);
};

//POST 
const createWorkout = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
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

//DELETE
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout ID" })
  }
  const workout = await Workout.findOneAndDelete({ _id: id })
  if (!workout) {
    res.status(404).json({ error: "workout not found" })
  }
  res.status(200).json({ workout })
};

//PUT
const updateWorkout = async (req, res) => {
  console.log( req.body )
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" })
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })
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
