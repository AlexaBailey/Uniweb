import React, { useState } from 'react'
import { useEffect } from 'react';

import setUserinfo from '../../helpers/token';
import jwtDecode from 'jwt-decode';
import axios from 'axios'

export default function FavouriteCard({material,userinfo,materials,setMaterials}) {

  const deleteFavourite = async () => {
    try {

    
     
  


      
       const res = await axios.post(`http://localhost:8800/disliked/${material.pid}/${userinfo.id}`,{ id: material.pid, userid:userinfo.id});
       setMaterials(materials.filter(obj=>obj.pid!=material.pid))

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="ag-courses_item">
    <div class="ag-courses-item_link">
      <div class="ag-courses-item_bg"></div>

      <div class="ag-courses-item_title">
        {material.pname}
      </div>
    
    
      

      <div class="ag-courses-item_date-box">
        Опубликовано{"  "}
        <span class="ag-courses-item_date">
          {material.publish}
        </span>
        <p>Автор: {material.authors}</p>
        <p>Дисциплина: {material.discipline}</p>
        <button onClick={()=>deleteFavourite()}  style={{backgroundColor:'transparent', border:'none'}} ><p><img src='../redheart.png'/>  </p></button>
      </div>
    </div>
  </div>
  )
}
