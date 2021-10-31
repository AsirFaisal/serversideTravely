const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const ObjectId = require("mongodb").ObjectId;

const { MongoClient } = require("mongodb");
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://AsirFaisal:Dip123456@cluster0.epgax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("travely");
    const tours = database.collection("packages");
    const orders = database.collection("orders");
    //GET API
    app.get("/tours", async (req, res) => {
      const cursor = tours.find({});
      const tour = await cursor.toArray();
      res.send(tour);
      console.log("Hit");
    });

    //POST API
    app.post("/orders", async (req, res) => {
      const tour = req.body;
      console.log("hit", tour);
      const result = await orders.insertOne(tour);
      console.log(result);
      res.json(result);
    });
    app.post("/tours", async (req, res) => {
      const tour = req.body;
      console.log("hit", tour);
      const result = await tours.insertOne(tour);
      console.log(result);
      res.json(result);
    });
    //DELETE API
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orders.deleteOne(query);
      console.log("Deleted");
      res.json(result);
    });
    app.get("/orders", async (req, res) => {
      const cursor = orders.find({});
      const order = await cursor.toArray();
      res.send(order);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Running Travely Server");
});

app.listen(port, () => {
  console.log("Server Running", port);
});
