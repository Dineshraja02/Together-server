const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts");
const cors = require('cors');
require("dotenv").config();

(async ()=>{
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
            {useNewUrlParser:true , useUnifiedTopology:true},
            ()=>{
                console.log("Connected with mongodb");
            }
        );

        //middleware
        app.use(express.json());
        app.use(cors());
        app.use(helmet());
        app.use(morgan("common"));

        app.use("/api/users",userRoute);
        app.use("/api/auth",authRoute);
        app.use("/api/posts",postRoute);

        const port =process.env.PORT||3001
        app.listen(port,()=>
        {
                console.log("Server running in port 3001");
        })
        } catch (error) {
            console.error(error)
        }
})();

    