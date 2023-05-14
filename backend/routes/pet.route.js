const express = require("express");
// const validate = require("../middlewares/validate");
const { adminValidation } = require("../validations/admin.validation");
const petController = require("../controllers/pet.controller");
const { uploadImage } = require("../services").perService;
// const authValidation = require("../validations/auth.validation");
// const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/create", adminValidation, petController.createNewPet);

router.post("/delete", adminValidation, petController.deletePet);

router.post("/update", adminValidation, petController.updatePet);

router.post("/remove/image", adminValidation, petController.removeImage);

router.post(
  "/images",
  adminValidation,
  uploadImage.single("images"),
  petController.uploadImages
);

router.get("/get", petController.getAllpet);

module.exports = router;
