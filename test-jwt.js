import jwt from "jsonwebtoken";

/**
 * sign({payload}, secret code, {expire})
 * payload
 * secret code
 * expire
 */

const token = jwt.sign(
    { email: "4k@sign.by", userid:16 },
    "1234567890abc", 
    {
        expiresIn:"1d",
    }
    );

    // console.log(token)


const mytoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjRrQHNpZ24uYnkiLCJ1c2VyaWQiOjE2LCJpYXQiOjE3MDY3ODI2MDAsImV4cCI6MTcwNjg2OTAwMH0.zSJxo9H8k2MZ-Z-79TABd4AfMiKiYgx0SG5YpqWJ60M`;


jwt.verify(mytoken, "1234567890abc", (err, decode) => {
    if(err) return console.log(err.message);
    console.log(decode);
});