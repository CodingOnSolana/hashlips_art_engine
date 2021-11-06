"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const layersDir = `${basePath}/layers`;

const { layerConfigurations } = require(path.join(basePath, "/src/config.js"));

const { getElements } = require("../src/main.js");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

// intialize layers to chart
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
    // get elements for each layer
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // just get name and weight for each element
      let rarityDataElement = {
        trait: element.name,
        chance: element.weight.toFixed(0),
        occurrence: 0, // initialize at 0
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
    // don't include duplicate layers
    if (!rarityData.includes(layer.name)) {
      // add elements for each layer to chart
      rarityData[layerName] = elementsForLayer;
      switch (layerName) {
        case 'Head':
        case 'Beak':
        case 'Body':
          rarityData[layerName].rank = 3;
          break;
        case 'Feet':
        case 'Eyes':
        case 'Background':
          rarityData[layerName].rank = 3;
          break;
        case 'Clothes':
          rarityData[layerName].rank = 2;
          break;
        case 'Hands':
          rarityData[layerName].rank = 1.5;
          break;
        case 'Hat':
          rarityData[layerName].rank = 1;
          break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
    }
  });
});

// fill up rarity chart with occurrences from metadata
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // keep track of occurrences
        rarityDataTrait.occurrence++;
      }
    });
  });
});

//convert occurrences to percentages
for (var layer in rarityData) {
  for (var attribute in rarityData[layer]) {
    // convert to percentage
    if(attribute == 'rank')
      continue;
    rarityData[layer][attribute].occurrencePerc =
      (rarityData[layer][attribute].occurrence / editionSize) * 100;

    // show two decimal places in percent
    rarityData[layer][attribute].occurrencePerc =
      rarityData[layer][attribute].occurrencePerc.toFixed(4) + "% out of 100%";

      rarityData[layer][attribute].rankScore =
      (rarityData[layer][attribute].occurrence / editionSize) * rarityData[layer].rank;
  }
}

// print out rarity data
for (var layer in rarityData) {
  console.log(`Trait type: ${layer}`);
  
  for (var trait in rarityData[layer]) {
    console.log(rarityData[layer][trait]);
  }
  console.log();
}


//// fill up rarity chart with occurrences from metadata
data.forEach((element) => {
  let attributes = element.attributes;
  element.rank = 1;
  attributes.forEach((attribute) => {
    var traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // keep track of occurrences
        element.rank += rarityDataTrait.rankScore;
      }
    });
  });
});

data.sort(function(a, b) {
  if(a.rank < b.rank){
    return -1;
// a should come after b in the sorted order
}else if(a.rank > b.rank){
    return 1;
// a and b are the same
}else{
    return 0;
}
});

data.rank

for(let i = 0; i < editionSize; i++) {
  console.log(data[i].name);
}

console.log();

data.forEach((element) => {
  if(element.rank < 5) {
    console.log(element.name)
  }
});