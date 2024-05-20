const express = require('express')
// const Workout = require('../model/workoutModel')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
} = require ('../controller/workoutControllers')

//router
const router = express.Router()


//GET all workouts
router.get('/', getWorkouts)

//GET a single workouts
router.get('/:id', getWorkout)

//POST a single workouts
router.post('/', createWorkout)

//DELETE a single workouts
router.delete('/:id', deleteWorkout)

//PATCH a single workouts
router.patch('/:id', updateWorkout)


module.exports = router