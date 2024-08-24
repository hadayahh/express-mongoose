const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//GET ALL SUBSCRIBERS
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get ONE SUBSCRIBER
router.get("/:id", (req, res) => {
  try {
    res.send(req.params.id);
  } catch (err) {
    res.json({ Error: "Unable to Retrieve" });
  }
});

// CREATE A SUBSCRIBER
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
});

//update subscriber
router.patch("/:id ", (req, res) => {});

// REMOVE  SUBSCRIBER
router.delete(":id", (req, res) => {});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.body.params.id);
    if (subscriber == null) {
      return res.status(404).json({ Message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
}

module.exports = router;
