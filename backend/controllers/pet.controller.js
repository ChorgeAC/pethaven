const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  createPet,
  saveImages,
  provideAllPet,
  deleteSinglePet,
  updatePetInfo,
} = require("../services/pet.service");

const createNewPet = catchAsync(async (req, res) => {
  const data = await createPet(req.body);
  res.status(200).send({
    pet: data,
  });
});

const uploadImages = catchAsync(async (req, res) => {
  const path = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const data = await saveImages(req.body.id, path);
  res.status(200).send("Image save successfully...");
});

const getAllpet = catchAsync(async (req, res) => {
  const data = await provideAllPet();
  res.status(200).send(data);
});

const deletePet = catchAsync(async (req, res) => {
  const data = await deleteSinglePet(req.body.id);
  res.status(200).send("Pet remove Successfully");
});

const updatePet = catchAsync(async (req, res) => {
  const data = await updatePetInfo(req.body);
  res.status(200).send("Pet Info Saved...");
});

module.exports = {
  createNewPet,
  uploadImages,
  getAllpet,
  deletePet,
  updatePet,
};
