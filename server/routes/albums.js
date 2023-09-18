const router = require("express").Router();
const Album = require("../models/album");

// save/create album info
router.post("/save", async (req, res) => {
  const newAlbum = new Album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });

  try {
    const savedAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: savedAlbum });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

// get single album info
router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await Album.findOne(filter);
  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// get all albums info
router.get("/getAll", async (req, res) => {
  const options = { sort: { createdAt: 1 } };
  const data = await Album.find(options);
  if (data) {
    return res.status(200).send({ success: true, data: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

// update album info
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await Album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );

    return res.status(200).send({ success: true, data: result });
  } catch (err) {
    return res.status(400).send({ success: false, msg: err });
  }
});

// delete album info
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await Album.deleteOne(filter);
  if (result) {
    return res.status(200).send({
      success: true,
      msg: "Album Deleted Successfully...",
      data: result,
    });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});
module.exports = router;
