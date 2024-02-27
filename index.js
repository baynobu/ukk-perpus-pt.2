import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import sequelizeStore from "connect-session-sequelize";
import AuthRoute from "./routes/AuthRoute.js";
import BookRoute from "./routes/BookRoute.js";
import BorrowRoute from "./routes/BorrowRoute.js"


dotenv.config();
const app = express();

const sessionStore = sequelizeStore(session.Store);

export const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(BookRoute);
app.use("/auth", AuthRoute);
app.use(BorrowRoute)



app.listen(process.env.APP_PORT, () => {
  console.log("💾 connected...");
});
