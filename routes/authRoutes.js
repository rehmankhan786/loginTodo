const express = require("express")
const {loginValidation,signUpValidation, forgotValidation} = require("../middlewares/validation")
const {loginAuth,signUpAuth,forgotpass}  =require('../controllers/authController')

const router = express.Router();


router.post("/", loginValidation,loginAuth)
router.post("/signup",signUpValidation,signUpAuth)
router.put("/forgot",forgotValidation, forgotpass)





module.exports = router;