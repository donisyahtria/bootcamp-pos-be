const bodyParser = require("body-parser");
import express  from "express";
import cors from "cors"
import profileRoute from "./routes/profile"
import usersRoute from "./routes/users"
import isAuthenticated from "./routes/middleware/isAuthenticated";
import tokenRoute from "./routes/token"

const port = process.env.PORT || 3000;
const app = express ()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use("/profile", profileRoute)
app.use("/users", isAuthenticated, usersRoute)
app.use("/token", tokenRoute)

app.get("/*", (req, res)=>{
    const {fullname} = req.query
    res.status(200).json({message:`Welcome ${fullname}!`})
})

app.post("/", (req, res)=>{
    const {fullname, phone} = req.body
    res.status(200).json({fullname, phone})
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})