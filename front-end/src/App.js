import React, {useEffect, useState} from 'react'; 
import  './global.css'; 
import  './app.css'; 
import  './Sidebar.css'; 
import  './Main.css'; 
import DevItem from './components/DevItem/DevItem';
import DevForm from './components/Form'; 

import api from './services/api'; 

function App() { // component app  
const [devs, setDevs] = useState([]);
 
 
 useEffect(() => {   
  async function loadDevs(){ 
    const response = await api.get('/devs'); 
    console.log(response.data.devs) 
    setDevs(response.data.devs);
  } 

  loadDevs();

 }, []);

 async function handleAddDev(data){ 
  const response = await api.post('/devs', data) 
  setDevs([...devs, response.data.newdev]); 

 }
  return ( 
    <div id="app">  
    <aside>  
    <strong> Cadastrar </strong> 
      <DevForm onSubmit={handleAddDev} />    
    </aside> 
    <main>  
      <ul>     
        { devs.map(dev => ( 
            <DevItem key = {dev._id} dev={dev}/>
          ) 

        ) } 
        
      </ul>

    </main>
    </div>
  );
}

export default App;
