const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { Pet } = require("../models/index");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = catchAsync(async (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "accept only jpeg or png file.");
  }
});

const uploadImage = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});

const createPet = async (pet) => {
  try {
    const petData = new Pet({
      age: pet.age,
      breeds: pet.breeds,
      sex: pet.sex,
      height: pet.height,
      weight: pet.weight,
      healthInfo: pet.healthInfo,
      registrationId: pet.registrationId,
      price: pet.price,
      images: pet.images,
    });
    const data = await petData.save();
    return data;
  } catch (error) {
    if (error.code === 11000) {
      console.log("Failed to create new ");
    }
  }
};

const getPetById = async (id) => {
  const pet = await Pet.findById({ _id: id });
  return pet;
};

const saveImages = async (id, path) => {
  try {
    let { images } = await getPetById(id);
    images.push(path);
    const data = await Pet.updateOne(
      { _id: id },
      {
        $set: {
          images: images,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error...");
  }
};

const provideAllPet = async () => {
  try {
    const data = await Pet.find();
    return data;
  } catch (error) {
    console.log("error");
  }
};

module.exports = {
  uploadImage,
  createPet,
  saveImages,
  provideAllPet,
};
