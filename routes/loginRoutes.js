const express = require("express")
const router = express.Router();


router.post("/",(req,res,next)=>{
    console.log(req.body);
    res.json(req.body);
    next();
})

module.exports = router