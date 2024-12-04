const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Performance gear server is running")
})

app.listen(port, ()=>{
    console.log(`Performance gear server is running on port ${port}`);
})
