"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));
const description =
  "We should've never swam in that pond.. dook dook.";
const baseUri = "ipfs://NewUriToReplace";

const layerConfigurations = [
  {
    growEditionSizeTo: 3000,
    layersOrder: [
      { name: "Background" },
      { name: "Secret_Treasure" },
      { name: "Wings" },
      { name: "Feet" },
      { name: "Footwear" },
      { name: "Body" },
      { name: "Ruffle" },
      { name: "Clothes" },
      { name: "Head" },
      { name: "Eyes" },
      { name: "Eyewear" },
      { name: "Hats" },
      { name: "Beak" },
      { name: "Hand" }
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1359,
  height: 1479,
};

const background = {
  generate: true,
  brightness: "80%",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
};
