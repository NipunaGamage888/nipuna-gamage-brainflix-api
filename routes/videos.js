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
  console.log(parsedData)
  return parsedData;
}


router.get('/videos', (req, res) => {
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
    const response = readVideos()
    const video= response.find(video=>video.id===id)
    res.json(video)
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
      channel:"RyanHernandez",
      image: videoImage,
      description,
      views:0,
      likes:0,
      duration:0,
      comments:[],
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

module.exports = router;
