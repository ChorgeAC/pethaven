const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  createPet,
  saveImages,
  provideAllPet,
  deleteSinglePet,
  updatePetInfo,
  removePetImage,
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
  res.status(200).send({ code: 200, message: "Image save successfully..." });
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
  res.status(200).send({ code: 200, message: data });
});

const removeImage = catchAsync(async (req, res) => {
  const data = await removePetImage(req.body);
  if (!data.acknowledged) {
    res.status(200).send({ code: 401, message: "Image Not found" });
  }
  if (data.acknowledged)
    res.status(200).send({ code: 200, message: "Image remove Successfully" });
});

module.exports = {
  createNewPet,
  uploadImages,
  getAllpet,
  deletePet,
  updatePet,
  removeImage,
};
