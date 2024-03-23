const express= require('express');
const app =express();
const cors= require('cors');
const routes = require('./routes/videos');

app.use(cors());
const PORT=8080

app.use('/api', routes);

app.listen(PORT,()=>console.log('the server is running'))