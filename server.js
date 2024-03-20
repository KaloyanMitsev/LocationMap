const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());

app.get("/api/layer1", async (req, res) => {
  const response = await axios.get(
    "http://sedac.ciesin.columbia.edu/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=gpw-v4:gpw-v4-population-density_2015&styles=&bbox=-180,-90,180,90&width=768&height=384&srs=EPSG:4326&format=image/png",
    { responseType: "arraybuffer" }
  );
  res.set("Content-Type", "image/png");
  res.send(Buffer.from(response.data, "binary"));
});

app.get("/api/layer2", async (req, res) => {
  const response = await axios.get(
    "http://sedac.ciesin.columbia.edu/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=lulc:lulc-global-grid-prob-urban-expansion-2030&styles=&bbox=-180,-90,180,90&width=768&height=384&srs=EPSG:4326&format=image/png",
    { responseType: "arraybuffer" }
  );
  res.set("Content-Type", "image/png");
  res.send(Buffer.from(response.data, "binary"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
