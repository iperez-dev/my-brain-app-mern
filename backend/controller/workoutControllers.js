const express = require("express");
const mongoose = require("mongoose");
const Workout = require("../model/workoutModel");

//GET all workouts - find
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET a single workouts - findById
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

//POST a single workouts - create
const createWorkout = async (req, res) => {
  const { name, description, url } = req.body;

  // add req to DB
  try {
    const workout = await Workout.create({ name, description, url });
    res.status(200).json(workout);
  } catch (error) {
    return res.status(404).json({ error: error.message });
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
        res.status(404).json({error: "workout not found"})
    }
    res.status(200).json({workout})
};

//PATCH a single workouts - findOneAndUpdate
const updateWorkout = async (req, res) => {
    const { id } = req.params

    //mongoose error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No workout found"})
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {... req.body})

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
