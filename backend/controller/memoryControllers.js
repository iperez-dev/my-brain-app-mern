const mongoose = require("mongoose");
const Memory = require("../model/memoryModel");
const cloudinary = require("../middleware/cloudinary")

//GET - get all Memories - find()
const getMemories = async (req, res) => {

  const memories = await Memory.find().sort({ createdAt: -1 });
  try {
    res.status(200).json(memories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET - get single Memory - findById()
const getMemory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Memory found" });
  }
  const memory = await Memory.findById(id);
  if (!memory) {
    return res.status(404).json({ error: "No Memory found" });
  }
  res.status(200).json(memory);
};

//POST - create Memory - create()
const createMemory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const memory = await Memory.create({
      name: req.body.name,
      stack: req.body.stack,
      features: req.body.features,
      url: req.body.url,
      githubUrl: req.body.githubUrl,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      
    })
    res.status(200).json(memory);
    console.log(memory);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE - delete Memory - findOneAndDelete()
const deleteMemory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Memory ID" })
  }
  const memory = await Memory.findOneAndDelete({ _id: id })
  if (!memory) {
    res.status(404).json({ error: "Memory not found" })
  }
  res.status(200).json({ memory })
};

//PUT
const updateMemory = async (req, res) => {
  console.log( req.body )
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Memory found" })
  }
  const memory = await Memory.findOneAndUpdate({ _id: id }, { ...req.body })
  if (!memory) {
    return res.status(404).json({ error: "No Memory found" })
  }
  res.status(200).json({ memory })
};

module.exports = {
  getMemories,
  getMemory,
  createMemory,
  updateMemory,
  deleteMemory,
};
