import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
  const accesstoken = req.cookies.token || req.headers["x-access-token"];
  console.log("accesstoken", accesstoken);
  if (!accesstoken) return res.status(401).json({ msg: "unauthorized" });

  jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
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
//     const accesstoken = req.cookies.token;

//     if(!accesstoken) return res.status(401).json({msg: "unautorized"});

//     jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
//         if(err) return res.status(403).json({error:err.message, msg: "forbidden"})
//         console.log(decode)
//         next();
//     });
// };