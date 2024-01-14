import express  from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/", (req, res) =>{
    const token = jwt.sign({firstName: req.body.firstName}, "jwtsecret")
    res.status(200).json({token})
})

export default router