require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lum0bq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✅");

    const collection = client.db("plm").collection("plm");

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await collection.insertOne(user);
      res.send(result);
    });

    app.get('/users', async (req, res) => {
  try {
    const result = await collection.find().toArray();
    console.log("GET /users =>", result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "something went wrong" });
  }
});

  app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id 
      const query = { _id: new ObjectId(id) };
      const result = await database.deleteOne(query);
      res.send(result)
    })

  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
