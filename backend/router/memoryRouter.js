const express = require("express")
const upload = require('../middleware/multer')

const {
    getMemories,
    getMemory,
    createMemory,
    updateMemory,
    deleteMemory,
} = require ('../controller/memoryControllers')

//router
const router = express.Router()

//GET all memories
router.get('/', getMemories)

//GET a single memory
router.get('/:id', getMemory)

//POST a single memory
router.post('/', upload.single("image"), createMemory)

//DELETE a single memory
router.delete('/:id', deleteMemory)

//PUT a single memory
router.put('/:id', updateMemory)


module.exports = router