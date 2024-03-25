const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const router = express.Router();

app.use(express.static("./public"));
function readVideos() {
  const videoData = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videoData);

  return parsedData;
}

router.get("/videos", (req, res) => {
  try {
    const videos = readVideos();
    res.json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
  }
});

router.get("/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = readVideos();
    const video = response.find((video) => video.id === id);
    res.json(video);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/videos", async (req, res) => {
  try {
    const videoImage = `/image/Upload-video-preview.jpg`;
    const { title, description } = req.body;
    const newVideo = {
      id: uuidv4(),
      title,
      channel: "RyanHernandez",
      image: 'http://localhost:8080/image/Upload-video-preview.jpg',
      description,
      views: 0,
      likes: 0,
      duration: 0,
      comments: [],
      timestamp: Date.now(),
    };

    const video = readVideos();
    video.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(video));

    res.json(newVideo);
  } catch (error) {
    console.error("Error adding new video:", error);
  }
});

router.post("/videos/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    let videos = readVideos();
    const videoIndex = videos.findIndex((video) => video.id === id);

    const newComment = {
      id: uuidv4(),
      name: "walid",
      comment,
      likes: 0,
      timestamp: Date.now(),
    };

    videos[videoIndex].comments.push(newComment);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.json(newComment);
  } catch (error) {
    console.error("Error adding new comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
