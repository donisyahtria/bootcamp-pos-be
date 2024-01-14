import jwt from "jsonwebtoken";

export default function isAuthenticated(req, res, next){
    if(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        jwt.verify(
            req.headers.authorization.split(" ") [1],
            "jwtsecret",
            async function (err, decoded) {
                if (err) {
                    res.status(401).json({message: "invalid token"})
                    return
                }
                next()
            }
        )
    } else {
        res.status(401).json({message: "Unauthorized"})
    }
}