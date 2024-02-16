// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import usersRouter from './routes/users.route.js';
// import eventsRouter from './routes/events.route.js';
// import dogsRouter from './routes/dogs.route.js';
// import { verifytoken } from './middleware/verifyToken.js';

// dotenv.config();

// const app = express();
// const port = process.env.SERVER_PORT || 3001;

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Middleware для логирования
// app.use((req, res, next) => {
//     console.log(`Incoming request to ${req.path}:`, req.body);
//     next();
// });

// // Middleware для проверки токена
// app.use('/users', verifytoken);
// app.use('/events', verifytoken);
// app.use('/dogs', verifytoken);

// app.use('/users', usersRouter);
// app.use('/events', eventsRouter);
// app.use('/dogs', dogsRouter);

// app.get('/api/verifytoken', verifytoken, (req, res) => {
//     res.status(200).json({ message: 'Token is valid' });
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.route.js';
import eventsRouter from './routes/events.route.js';
import dogsRouter from './routes/dogs.route.js';
import { verifytoken } from './middleware/verifyToken.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Incoming request to ${req.path}:`, req.body);
    next();
});

app.get('/api/verifytoken', verifytoken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});


app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/dogs', dogsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { db } from "./config/db.js";
// import usersRouter from "./routes/users.route.js"; 
// import eventsRouter from "./routes/events.route.js";
// import dogsRouter from "./routes/dogs.route.js";
// import cookieParser from "cookie-parser";
// import { verifytoken } from "./middleware/verifytoken.js"; 

// dotenv.config();

// const app = express();
// const port = process.env.SERVER_PORT || 3001;

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Update route token
// app.post("/api/verifytoken", verifytoken, (req, res) => {
//   // If middleware `verifytoken` didn't return, token ok
//   res.status(200).json({ message: "Token is valid" });
// });

// app.use("/users", usersRouter);
// app.use("/events", eventsRouter);
// app.use("/dogs", dogsRouter);

// app.listen(process.env.SERVER_PORT || 3001, () => {
//   console.log(`I'm running on ${process.env.SERVER_PORT || 3001}`);
// });



