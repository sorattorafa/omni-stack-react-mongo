const Dev = require('../models/Dev');   
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = { 
    async newDev(req,res) {  
        const { github_username, techs, latitude, longitude } = req.body; 
         
        const devexist = await Dev.findOne({ github_username }); 
        if(devexist){  

            return res.status(400).json({ 
                message: 'Usuário já foi cadastrado anteriormente'
            })

        }
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); 
        const { avatar_url, bio } = apiResponse.data;  
        const name = apiResponse.data.login; 
        const techsArray = parseStringAsArray(techs)
     
        const location ={ 
            type: 'Point', 
            coordinates: [longitude, latitude],
        }
        const dev = await Dev.create({ 
            github_username, 
            name, 
            avatar_url, 
            bio, 
            techs: techsArray, 
            location
        })  
    
        return res.json({ 
            newdev: dev
        })
    },  
 
    async getAllDevs(req,res){ 
        const devs = await Dev.find({ }) 
        return res.status(200).json({ 
            devs
        })
    }, 
    
    async getDevs(req,res) {     
        const { latitude, longitude, techs } = req.body;  
        const techsArray = await parseStringAsArray(techs)
        //console.log(techsArray)
        const devs = await Dev.find({ 
            techs: { 
                $in: techsArray,
            }, 
            location:{ 
                $near:{ 
                    $geometry:{ 
                        type: 'Point', 
                        coordinates: [longitude, latitude]
                    }, 
                    $maxDistance: 10000, // max distance of the point (lat, lng) is 10 km
                }
            }
        });
        return res.json({ 
            devs
        })
    }
}