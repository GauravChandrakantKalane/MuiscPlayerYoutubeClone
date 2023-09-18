const router = require("express").Router();
const Artist = require("../models/artist");

// create new artist
router.post("/save", async (req, res) => {
  const newArtist = new Artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArtist });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

// get single artist info
router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await Artist.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// get all artist info
router.get("/getAll", async (req, res) => {
  const options = { sort: { createdAt: 1 } };
  const data = await Artist.find(options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// delete the artist info
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await Artist.deleteOne(filter);
  if (result) {
    return res.status(200).send({
      success: true,
      msg: "Artist Deleted Successfully...",
      data: result,
    });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// update the artist info
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await Artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );

    return res.status(200).send({ success: true, data: result });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

module.exports = router;
