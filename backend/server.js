require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const routes = require("./routes");

app.use(cors());
app.use(express.json());

// Serve the HTML page
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SongScribe running at http://localhost:${PORT}`);
});
