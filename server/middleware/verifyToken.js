import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifytoken = (req, res, next) => {
    let token = req.cookies.token || req.headers["authorization"];
    console.log("token", token);

    // Удаление префикса 'Bearer ' из токена
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Детализированная обработка ошибок
            let msg = "Forbidden: Token is not valid"; 
            if (err.name === "TokenExpiredError") {
                msg = "Unauthorized: Token has expired";
                return res.status(401).json({ error: err.message, msg });
            } else if (err.name === "JsonWebTokenError") {
                msg = "Forbidden: Invalid token";
            } else if (err.name === "NotBeforeError") {
                msg = "Unauthorized: Token not active";
            }
            return res.status(403).json({ error: err.message, msg });
        }
        req.user = decoded; 
        next(); 
    });
};





// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export const verifytoken = (req, res, next) => {
//     let token = req.cookies.token || req.headers["authorization"];

//     if (token && token.startsWith('Bearer ')) {
//         token = token.slice(7, token.length);
//     }

//     if (!token) {
//         return res.status(401).json({ msg: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ error: err.message, msg: "Forbidden: Token is not valid" });
//         }
//         req.user = decoded;
//         next();
//     });
// };


