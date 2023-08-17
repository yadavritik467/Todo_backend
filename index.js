import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/users.js"
import statusRouter from "./routes/post.js"
// import passport from "passport"
// import session from "express-session";
// import cookieParser from "cookie-parser";
import { passportCpnnect } from "./config/passport.js"


const app = express()
const port = 4500 ;

const mongoDB = async()=>{
   try {
    await mongoose.connect("mongodb+srv://yadavritik467:ritik23121999@cluster0.psqunil.mongodb.net/todo",{ useNewUrlParser: true, useUnifiedTopology: true })
    console.log("db is connected")
   } catch (error) {
    console.log("db is not connected")
   }
}

mongoDB()

// app.use(session({
//   name: 'userID',
//   secret: 'your-secret',
//   resave: true,
//   saveUninitialized: true,

//   cookie:{
//     secure:process.env.NODE_ENV="developement" ? false : true,
//     httpOnly:process.env.NODE_ENV="developement" ? false : true,
//     sameSite:process.env.NODE_ENV="developement" ? false : "none",
//   }
// }));
// app.use(cookieParser());
app.use(express.json())
app.use(cors())

// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());
passportCpnnect()
// app.use("/",userRouter)
app.use("/auth",userRouter)
app.use("/post",statusRouter)

// app.get('/auth/google',
// passport.authenticate("google", {
//   scope: ["profile","email"],
// })
// );

// app.get('/auth/google/callback',
// passport.authenticate("google", {
//   successRedirect: "/auth/me",
//   // successRedirect: "http://localhost:3000",
// })
// );






app.get('/', (req, res) => {
    res.send("working")
  });
// app.get("/",(req,res)=>{
//     console.log("working")
// })

app.listen(port, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port);
  });
