const {Router} = require('express');  
const axios = require('axios');
const Dev = require('./models/Dev')
const routes = Router();  
const DevController = require('./controller/DevController') 

routes.post('/devs', DevController.newDev)  
routes.get('/devs/personalisado', DevController.getDevs)  
routes.get('/devs', DevController.getAllDevs)  


module.exports = routes; 

