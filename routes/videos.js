const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const router = express.Router();

const api_key = "?api_key=777219bc-bf2e-4b39-9a97-8cefeb6d3047";

app.use(express.static("./public"));

router.get("/videos", async (req, res) => {
  try {
    const response = await axios.get(
      `https://unit-3-project-api-0a5620414506.herokuapp.com/videos${api_key}`
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

router.get("/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://unit-3-project-api-0a5620414506.herokuapp.com/videos/${id}${api_key}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
function readVideos() {
    const videoData = fs.readFileSync('./data/videos.json');
    const parsedData = JSON.parse(videoData);
    return parsedData;
  }

router.post("/videos", async (req, res) => {
  try {
    
    const videoImage='/images/Upload-video-preview.jpg'
    const { title, description } = req.body;
    const newVideo = {
      id: uuidv4(),
      title,
      image: videoImage,
      description,
      timestamp: Date.now(),
    };

    const video=readVideos()
    video.push(newVideo)
    fs.writeFileSync('./data/videos.json', JSON.stringify(video))
   
    res.json(newVideo);
  } catch (error) {
    console.error("Error adding new video:", error);
  }
});

module.exports = router;
