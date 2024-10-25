const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

mongoose
.connect(process.env.DB_URI)
.then(()=>console.log(`DB IS CONNECTED ${process.env.DB_URI}`))
.catch((e)=>console.log(`DB IS NOT CONNECTED ${e}`))

app.listen(process.env.PORT,()=>console.log('SERVER IS LISTEN AT THE PORT ',process.env.PORT))