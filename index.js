const express = require('express')
const app = express()
const cors = require('cors');
const { use } = require('express/lib/router');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3300

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wapon.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const collection = client.db("Doctor").collection("services");

        app.get('/services', async(req,res)=>{
            const query={}
            const cursor = collection.find(query);
            const services=await cursor.toArray();
            res.send(services);


        })

    }

    finally{

    }


}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})