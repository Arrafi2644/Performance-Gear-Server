require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.duk9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const equipmentCollection = client.db("sportsEquipmentDB").collection("equipment")

async function run() {
  try {

      // Connect the client to the server	(optional starting in v4.7)
    //   await client.connect();


    app.get("/equipments", async(req, res) => {
        const cursor = equipmentCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get("/equipments/:id", async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await equipmentCollection.findOne(query)
        res.send(result)
    })

    app.get("/equipments/user/:email", async(req, res) => {
        const userEmail = req.params.email;
        const filter = {userEmail}
        const cursor =  equipmentCollection.find(filter)
        const result = await cursor.toArray()
        res.send(result);

    })

    app.post("/equipments", async(req, res) => {
        const equipment = req.body;
        console.log(equipment);

        const result = await equipmentCollection.insertOne(equipment)
        res.send(result)
    })

    app.delete("/equipments/:id", async(req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = {_id : new ObjectId(id)}
        const result = await equipmentCollection.deleteOne(query)
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Performance gear server is running")
})

app.listen(port, ()=>{
    console.log(`Performance gear server is running on port ${port}`);
})
