const express = require('express'); 
const mongoose = require('mongoose');  
const routes = require('./routes'); 
const cors = require('cors'); 
 
mongoose.connect('connection string', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
const app = express();    
 
app.use(cors());
app.use(express.json()); 
app.use(routes);

app.listen(3333);
