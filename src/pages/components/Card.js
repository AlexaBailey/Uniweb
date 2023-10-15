import React, { useState } from 'react'
import { useEffect } from 'react';

import setUserinfo from '../../helpers/token';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/router';

export default function Card({material,userinfo,likedMat,setMaterials,materials}) {
  const [desc,setDesc]=useState(false)
const pid=material.pid
  const [like, setLike]=useState(false)
const [count,setCount]=useState(0)
function toggleShow(){
  setDesc(curr=>!curr)
}
  useEffect((userinfo) => {
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setUserinfo(jwt);
      userinfo = jwtDecode(jwt);
      console.log(userinfo)
      console.log(userinfo.id)
    
  }
  if (likedMat.length>0)
  setLike(true)

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
 console.log(likedMat)
 const router =useRouter()

  const setPref = async () => {
    try {
    
        setLike(true)
        setCount(curr=>curr+1)
      
      
       const res=await axios.post(`http://localhost:8800/liked/${material.pid}/${userinfo.id}/${material.usid}`,{ id: material.pid, userid:userinfo.id, authorid:material.usid});
     
    } catch (err) {
      console.log(err);
    }
  };
  const setPref2 = async () => {
    try {
      setCount(curr=>curr-1)

    
     
   setLike(false)


      
       const res = await axios.post(`http://localhost:8800/disliked/${material.pid}/${userinfo.id}`,{ id: material.pid, userid:userinfo.id});
       
    } catch (err) {
      console.log(err);
    }
  };
  const deleteData = async () => {
    try {
      console.log("delete")
      const res = await axios.delete(`http://localhost:8800/materials/${material.pid}`,{params:{pid:material.pid}});
        setMaterials(materials.filter(obj=>obj.pid!=material.pid))
  
  


     
    


       console.log("Data deleted",res.data)
    } catch (err) {
      console.log(err);
    }
  };
 

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
        {!desc? <><p>Автор: {material.authors}</p>
        <p>Дисциплина: {material.discipline}</p>
      
        {!like ?  <button style={{backgroundColor:'transparent', border:'none'}} onClick={()=>setPref()}><p><img src='../heart.png'/></p></button>:<button  style={{backgroundColor:'transparent', border:'none'}} onClick={()=>setPref2()}><p><img src='../redheart.png'/>  </p></button>}
      <p>Понравилось {count} людям</p>

      </> :<div><h4>Описание</h4><p>{material.comments}</p></div>
}      
      {userinfo.job=='1' && <button onClick={()=>deleteData()} className='edit-b' ><img className='edit-img' src='../../trash.png'/></button>}
     {userinfo.job=='1' &&  <Link  href={{
      pathname: "/edit/[editid]",
      query: { pid: material.pid}
    }} as={"/edit"+"/"+material.pid}> <img  className='edit-img' src='../../edit.png'/></Link>}
    <button className='edit-b' onClick={()=>toggleShow()}><img className='edit-img' src='../info.png'/></button>
      </div>
    </div>
  </div>
  )
}
