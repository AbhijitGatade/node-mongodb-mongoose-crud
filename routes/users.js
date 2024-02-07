let express = require("express");
let User = require("../models/User");
let multer = require("multer");
let path = require('path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '././public/userpics/');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const uniqueFilename = timestamp + "." + path.extname(file.originalname).slice(1);    
        cb(null, uniqueFilename);        
        req.imagepath = "userpics/" + uniqueFilename;
    },
});  
const upload = multer({ storage: storage });

router.get("/", (req, res)=>{
    User.find().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (error)=>{
        res.end(JSON.stringify({status:"failed", data:error}));
    });
});

router.get("/:id", (req, res)=>{
    User.findById(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (error)=>{
        res.end(JSON.stringify({status:"failed", data:error}));
    });
});

router.post("/", upload.single("image"), (req, res)=>{
    let body = req.body;
    let user = new User(body);
    user.imagepath = req.imagepath;
    user.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (error)=>{
        res.end(JSON.stringify({status:"failed", data:error}));
    });
});

router.put("/:id", (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (error)=>{
        res.end(JSON.stringify({status:"failed", data:error}));
    });
});

router.delete("/:id", (req, res)=>{
    User.findByIdAndDelete(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    }, (error)=>{
        res.end(JSON.stringify({status:"failed", data:error}));
    });
});

module.exports = router;