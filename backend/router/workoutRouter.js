const express = require('express')
const upload = require('../middleware/multer')

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
router.post('/', upload.single("image"), createWorkout)

//DELETE a single workouts
router.delete('/:id', deleteWorkout)

//PATCH a single workouts
router.patch('/:id', updateWorkout)


module.exports = router