const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.json());


const chatRoutes = require("./routes/chat.routes");
app.use("/chat", chatRoutes);



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})


app.get("/", (req, res)=>{
    res.send("Hello from Node.js");
});