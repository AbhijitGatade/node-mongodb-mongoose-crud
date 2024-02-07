let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");



let app = express();
app.use(express.static("public"));
app.use(bodyparser.json({limit:'500mb'}));
app.use(bodyparser.urlencoded({limit:'500mb', extended:true}));
app.use(express.json());

//To give access from outside world(React / Angular)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get("/", (req, res)=>{
    res.end("Welcome to Mongoose CRUD Project");
});


mongoose.connect("mongodb://127.0.0.1:27017/mongooseproject");
let db = mongoose.connection;
db.on("error", (error)=>{
    console.log("Connection failed");
    console.log(error);
});

db.on("open", ()=>{
    console.log("Connection successful");    
});


app.use("/users", require("./routes/users"));

app.listen(8081, ()=>{
    console.log("Server running on http://127.0.0.1:8081/");
})