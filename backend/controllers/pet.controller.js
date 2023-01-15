const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  createPet,
  saveImages,
  provideAllPet,
} = require("../services/pet.service");

const createNewPet = catchAsync(async (req, res) => {
  const data = await createPet(req.body);
  res.status(200).send({
    pet: data,
  });
});

const uploadImages = catchAsync(async (req, res) => {
  const data = await saveImages(req.body.id, req.file.path);
  res.status(200).send("Image save successfully...");
});

const getAllpet = catchAsync(async (req, res) => {
  const data = await provideAllPet();
  res.status(200).send(data);
});

module.exports = { createNewPet, uploadImages, getAllpet };
