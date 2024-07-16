// Read Config JSON file

const fs = require("fs");

const readConfig = (path) => {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
};

const writeConfig = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  return readConfig(path);
};

const updateConfig = (path, key, value) => {
  const data = readConfig(path);
  data[key] = value;
  return writeConfig(path, data);
};

const deleteConfig = (path, key) => {
  const data = readConfig(path);
  delete data[key];
  return writeConfig(path, data);
};

const config = readConfig("./config.json");

module.exports = {
  readConfig,
  writeConfig,
  updateConfig,
  deleteConfig,
  config,
};
