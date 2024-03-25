const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/videos");

app.use(cors());
app.use(express.json());
const PORT = 8080;
app.use("/image", express.static("./public/images"));

app.use("/api", routes);

app.listen(PORT, () => console.log("the server is running"));
