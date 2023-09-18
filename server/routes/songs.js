const router = require("express").Router();
const Song = require("../models/song");

// create/save new Song
router.post("/save", async (req, res) => {
  const newSong = new Song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });

  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success: true, song: savedSong });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

// get single song info
router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await Song.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, song: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// get all songs info
router.get("/getAll", async (req, res) => {
  const options = { sort: { createdAt: 1 } };
  const data = await Song.find(options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// update song info
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await Song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );

    return res.status(200).send({ success: true, data: result });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

// delete song info
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await Song.deleteOne(filter);
  if (result) {
    return res.status(200).send({
      success: true,
      msg: "Song Deleted Successfully...",
      data: result,
    });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
module.exports = router;
