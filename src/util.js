export const getLayerByName = (name, layers) => {
  try {
    return layers.getArray().filter(layer => layer.get('name') === name)[0];
  } catch (error) {
    console.error("Error: Can't get layer.");
  }
};

export const validateGeojson = fileData =>
  fileData.type === 'FeatureCollection' || fileData.type === 'Feature';
