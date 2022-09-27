const mongoose = require("mongoose");
const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "This place is already exists. Try a different name"],
    minLength: [3, "Name must be at least 3 character long"],
    maxLength: [100, "Name is too large"],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can't be negative"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^http/i.test(v);
      },
    },
  },
  visitCount: {
    type: Number,
  },
});
const Tour = mongoose.model("Tour", TourSchema);
module.exports = Tour;
