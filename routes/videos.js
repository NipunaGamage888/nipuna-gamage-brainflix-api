const express= require('express');
const router = express.Router();
const axios= require('axios')

const api_key = "?api_key=777219bc-bf2e-4b39-9a97-8cefeb6d3047";

router.get('/videos', async (req, res) => {
  try {
    const response = await axios.get(`https://unit-3-project-api-0a5620414506.herokuapp.com/videos${api_key}`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

router.get('/videos/id/comments', async (req, res) => {
    try {
        const { id } = req.params;
      const response= await axios.get((`https://unit-3-project-api-0a5620414506.herokuapp.com/videos/${id}/${api_key}`)    )

     
      res.json(response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;