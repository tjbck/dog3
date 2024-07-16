const { MongoClient } = require("mongodb");

const uri = `${process.env.DB_URL}`;
const mongoClient = new MongoClient(uri);
const database = mongoClient.db("on-discord");

const insertMessage = async (username, message) => {
  const Messages = database.collection("messages");
  const result = await Messages.insertOne({
    username,
    message,
  });

  return result;
};

module.exports = {
  insertMessage,
};
