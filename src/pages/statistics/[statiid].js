import React from 'react'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react';

import axios from 'axios';
import setUserinfo from '../../helpers/token';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import FavouriteCard from '../components/FavouriteCard';
import Link from 'next/link';
import PopularCard from '../components/PopularCard';

export default function Statistics() {
    const [mountEvent,setMountEvent]=useState(false)
    const [materials,setMaterials]=useState('')

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

        
            
            const res = await axios.get(`http://localhost:8800/statistics/${userinfo.id}`, {params:{id:userinfo.id}});
            setMaterials(res.data)
        

  
         
            

     

         
           
      
             console.log("Info: ",res.data)
          } catch (err) {
            console.log(err);
          }
        };
        requestData();
    

      }, []); 
     


    

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
       
        <div style={{display:'flex',justifyContent:'space-between',gap:30}}>
          <img className='stati' src='../stati.jpg'/>
          
        <div className='st' style={{display:'flex',flexDirection:'column', gap:10}}>
          <h1>Статистика</h1>
          <div className='stati-line'>
            <img style={{height:30}} src='../heart-icon.png'/>
          <p1>Число лайков: {materials[0]&&materials[0].map(l=>l.slikes)}</p1>


          </div>
          <div className='stati-line'>
          <img style={{height:30}} src='../follower.png'/>

          <p1>Ваш поклонник: {materials && materials[3].length!==0 ?materials[3].map(l=>l.fio): "еще нет"}</p1>

          </div>
          <div className='stati-line'>
          <img style={{height:30}} src='../users-icon.png'/>
          <p1>Число пользователей:{materials&&materials[1].map(u=>u.susers)}</p1>

          </div>
        <div className='stati-line'>
        <img style={{height:30}} src='../projects-icon.png'/>
        <p1>Число  всех работ:{materials&&materials[5].map(p=>p.sprojects)}</p1>

        </div>
       <div className='stati-line'>
       <img style={{height:30}} src='../projects-icon.png'/>
       <p1>Число ваших работ:{materials&&materials[4].map(p=>p.yourprojects)}</p1>

       </div>
<div className='stati-line'>
<img style={{height:30}} src='../star-icon.png'/>
<p1>Наиболее популярные работы:</p1>

</div>
        {materials[2] && materials[2]!=''? 
       <div class="ag-format-container">
       <div class="ag-courses_box">
        {
materials[2].map((fa)=>{
  
  return(
            <PopularCard
            key={fa.pid}
            material={fa}
           userinfo={userinfo}
          
          />
        )})}</div></div>:<p>Ничего не найдено</p>}
        
        
        </div>
       


        </div>
        

  
   
   

<Footer/>
   
    </main>
    
  )
}
else{
    return null
}
}
