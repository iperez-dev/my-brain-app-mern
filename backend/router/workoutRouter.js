const express = require('express')
const upload = require('../middleware/multer')
const requireAuth = require('../middleware/requireAuth')

const {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
} = require ('../controller/workoutControllers')

//router
const router = express.Router()

//require auth for all workouts routes
router.use(requireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET a single workouts
router.get('/:id', getWorkout)

//POST a single workouts
router.post('/', upload.single("image"), createWorkout)

//DELETE a single workouts
router.delete('/:id', deleteWorkout)

//PUT a single workouts
router.put('/:id', updateWorkout)


module.exports = router