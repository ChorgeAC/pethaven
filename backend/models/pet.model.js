const mongoose = require("mongoose");

const petSchema = mongoose.Schema(
  {
    age: { type: Number, required: true, trim: true },
    breeds: { type: String, required: true, trim: true },
    sex: { type: String, required: true, trim: true },
    height: { type: String, trim: true },
    weight: { type: String, trim: true },
    healthInfo: { type: String, trim: true },
    registrationId: { type: String, trim: true },
    price: { type: Number, required: true, trim: true },
    images: [{ type: String }],
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

module.exports.Pet = mongoose.model("Pet", petSchema);
