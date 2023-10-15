import React from 'react'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';

import axios from 'axios';
import setUserinfo from '../helpers/token';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Footer from './components/Footer';
import FavouriteCard from './components/FavouriteCard';
import Link from 'next/link';

export default function Favourite() {
    const [materials, setMaterials] = useState('');
    const [mountEvent,setMountEvent]=useState(false)
const [name,setName]=useState('')
    const [likedMat,setLikedMat]=useState('')

let userinfo;

    useEffect((userinfo) => {
        setMountEvent(true)
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setUserinfo(jwt);
          userinfo = jwtDecode(jwt);
          console.log(userinfo)
          console.log(userinfo.id)
        
      }
        const requestData = async () => {
          
   

          try {
            console.log("id",userinfo.id)

        
            
            const res = await axios.get(`http://localhost:8800/favourite/${userinfo.id}`, {params:{id:userinfo.id}});
       
            setMaterials(res.data);
            

     

            console.log(materials)
           
      
             console.log("Info: ",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        requestData();
    

      }, []); 
      const handleSubmit= async (e) => {
        try {
          e.preventDefault()
          console.log("form")
          const res = await axios.post(`http://localhost:8800/materials/${name}`,{name:name});
          setMaterials(res.data[0]);
          setLikedMat(res.data[1]);

           console.log("Data form",res.data)
        } catch (err) {
          console.log(err);
        }
      };


    

      axios.defaults.withCredentials = true;
      if (mountEvent){
        if (localStorage.token) {
          const jwt = localStorage.getItem("token");
          setUserinfo(jwt);
          userinfo = jwtDecode(jwt);
          console.log(userinfo)
      }
  return (
    <main>
        <Navbar/>
        <div style={{display:'flex', justifyContent:'center',gap:30}}> 
        <h1 style={{alignSelf:'flex-start'}}>Любимые работы</h1>

      
        <img style={{alignSelf:'center'}} className='hero-image' src='./like.jpg'/>

        <h1 style={{alignSelf:'flex-end'}}>в одном месте</h1>

    </div>
    
    <div id="section" style={{display:'flex',flexDirection:'column'}} className='materials'>
    <form onSubmit={handleSubmit} className='searchform' style={{alignSelf:'flex-end',display:'flex', alignItems:'center', justifyContent:'space-between',gap:10, width:300}}>
              <input name='name' onChange={(e)=>setName(e.target.value)} className='searchbar' placeholder='Введите имя проекта'/>
              <button onClick={handleSubmit} style={{border:'none', background:'transparent'}}> <img style={{height:40}} src='./search.png'/></button>

              </form>

              {materials && materials!=''? 
       <div class="ag-format-container">
       <div class="ag-courses_box">
       {
materials.map((material)=>{
  
  return(
            <FavouriteCard 
            key={material.pid}
            material={material}
           userinfo={userinfo}
            
             setMaterials={setMaterials}
             materials={materials}
          />
        )})}</div></div>:<div style={{display:'flex',flexDirection:'column', alignItems:'center',gap:8}}><span>Ничего не найдено</span><img style={{height:300}} src='../../empty.png'/></div>}
   

  
   </div>
   

<Footer/>
   
    </main>
    
  )
}
else{
    return null
}
}
