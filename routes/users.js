import express from "express";
import prisma from "../prisma/prisma";

const router = express.Router();

// login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.users_Doni.findMany({
            where: { username : username },
        });

        console.log(user)

        if (user && user[0].password === password) {
            res.status(200).json({ message: "Login berhasil", result: user });
        } else {
            res.status(401).json({ message: "Login gagal, username atau password salah" });
        }
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: "Internal error" });
    }
});


// tambah user
router.post("/", async (req, res) =>{   
    const {username, password, fullname} = req.body

    try{
        const user = await prisma.users_Doni.create({
            data: {username, password, fullname}
        })

        if (user && user.id){
            res.status(200).json({message:"Berhasil tambah user", result: user})
            return
        }
        res.status(400).json({message:"Gagal tambah user"})
    }
    catch (error){
        console.log({error})
        res.status(500).json({message:"internal error"})
    }
})

// get all users
router.get("/", (req, res) => {
    prisma.users_Doni
    .findMany({
        select: {
            id: true,
            username: true,
            password: true,
            fullname: true
        }
    })
    .then ((users) => res.status(200).json({results: users}))
    .catch((err) => {
        console.log({err})
        res.status(500).json({message:"internal server error"})
    })
})

//get user by id
router.get("/:userid", (req, res)=>{
    prisma.users_Doni
    .findUnique({
        where: {
            id: req.params.userid
        }
    })
    .then ((user)=>res.status(200).json({result:user}))
    .catch((err) => {
        console.log({err})
        res.status(500).json({message:"internal server error"})
    })
})

//uopdate user by id
router.put("/:userid", async (req, res)=>{
    try{
        const isExist = await prisma.users_Doni.findUnique({
            where: { id: req.params.userid}
        })

        if(!isExist){
            res.status(404).json({message:"user tidak ditemukan"})
            return
        }

        const doUpdate = await prisma.users_Doni.update({
            where: { id: req.params.userid},
            data: {
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname
            },
            select: {
                id: true,
                username: true,
                password: true,
                fullname: true
            }
        })

        res.status(200)
        .json({message:"user berhasil di update", result: doUpdate})
    } catch(error){
        console.log({error})
        res.status(500).json({message:"internal server error"})
    }
})

// delete user by id
router.delete("/:userid", async (req, res) =>{
    try {
        const isExist = await prisma.users_Doni.findUnique({
            where: {id: req.params.userid}
        })

        if (!isExist){
            res.status(404).json({message: "user tidak ditemukan"})
            return
        }

        const doDelete = await prisma.users_Doni.delete({
            where: {id: req.params.userid}
        })

        res.status(200).json({
            message: "user berhasil dihapus",
            result: doDelete
        })
    }
    catch(error){
        console.log({error})
        res.status(500).json({message: "internal server error"})
    }
})


export default router