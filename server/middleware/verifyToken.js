import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifytoken = (req, res, next) => {
    let token = req.cookies.token || req.headers["authorization"];
    console.log("Received token:", token); // Improved logging

    // Trim leading and trailing spaces
    if (token) token = token.trim();

    // Extract token after 'Bearer '
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim(); // Remove 'Bearer ' and extra spaces
    }

    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err); // Enhanced error logging
            let msg = "Forbidden: Token is not valid";
            let statusCode = 403; // Default error as access forbidden

            switch (err.name) {
                case "TokenExpiredError":
                    msg = "Unauthorized: Token has expired";
                    statusCode = 401; // Use 401 for expired tokens
                    break;
                case "JsonWebTokenError":
                    msg = "Forbidden: Invalid token";
                    break;
                case "NotBeforeError":
                    msg = "Unauthorized: Token not active";
                    statusCode = 401; // Use 401 for not yet active tokens
                    break;
            }

            return res.status(statusCode).json({ error: err.message, msg });
        }

        if (!decoded.user_id) {
            console.error("User ID not found in token data");
            return res.status(403).json({ error: "Unauthorized: User ID not found in token data" });
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
//     console.log("token", token);

   
//     if (token && token.startsWith('Bearer ')) {
//         token = token.slice(7);
//     }

//     if (!token) {
//         return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             // Детализированная обработка ошибок
//             let msg = "Forbidden: Token is not valid"; 
//             if (err.name === "TokenExpiredError") {
//                 msg = "Unauthorized: Token has expired";
//                 return res.status(401).json({ error: err.message, msg });
//             } else if (err.name === "JsonWebTokenError") {
//                 msg = "Forbidden: Invalid token";
//             } else if (err.name === "NotBeforeError") {
//                 msg = "Unauthorized: Token not active";
//             }
//             return res.status(403).json({ error: err.message, msg });
//         }
        
//         if (!decoded.user_id) {
//             return res.status(403).json({ error: "Unauthorized: User ID not found in token data" });
//         }
//         req.user = decoded; 
//         next(); 
//     });
// };


