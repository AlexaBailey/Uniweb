import React, { useState } from 'react'
import { useEffect } from 'react';

import setUserinfo from '../../helpers/token';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/router';

export default function PopularCard({material,userinfo}) {
const pid=material.pid
const [count,setCount]=useState(0)
  useEffect((userinfo) => {
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
      
    
        
        const res = await axios.get(`http://localhost:8800/likes/${material.pid}/${userinfo.id}`,{params:{userid:userinfo.id, id:material.pid}});
   
        setCount(res.data[0].num)

 

        
       
  
         console.log("Info: ",res.data[0].num)
      } catch (err) {
        console.log(err);
      }
    };
    requestData();


  }, []); 
 
 const router =useRouter()


  return (
    <div class="ag-courses_item">
    <div class="ag-courses-item_link">
      <div class="ag-courses-item_bg"></div>

      <div class="ag-courses-item_title">
       <Link style={{color:'white',textDecoration:'none'}} href={material.project}> {material.pname}</Link>
      </div>
    
    
      

      <div class="ag-courses-item_date-box">
        Опубликовано{"  "}
        <span class="ag-courses-item_date">
          {material.publish}
        </span>
        <p>Автор: {material.authors}</p>
        <p>Дисциплина: {material.discipline}</p>
      <p>Понравилось {count} людям</p>
    
      </div>
    </div>
  </div>
  )
}
