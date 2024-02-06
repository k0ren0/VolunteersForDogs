import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];
  console.log("token", token);
  if (!token) return res.status(401).json({ msg: "unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err)
      return res.status(403).json({ error: err.message, msg: "forbidden" });
    // console.log(decode);
    next();
  });
};



// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const verifytoken = (req, res, next) => {
//   const token = req.cookies.token || req.headers["x-access-token"];
//   console.log("token", token);
//   if (!token) return res.status(401).json({ msg: "unauthorized" });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
//     if (err)
//       return res.status(403).json({ error: err.message, msg: "forbidden" });
//     // console.log(decode);
//     next();
//   });
// };




