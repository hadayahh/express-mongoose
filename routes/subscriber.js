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
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
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

// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.deleteOne();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
