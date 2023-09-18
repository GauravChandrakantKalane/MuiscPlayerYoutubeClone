const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model("artist", artistSchema);
module.exports = Artist;
