import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import setUserinfo from '../../helpers/token';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
export default function Navbar() {
  let userinfo;
  if (typeof window!='undefined'){
  if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    setUserinfo(jwt);
    userinfo = jwtDecode(jwt);
    console.log(userinfo)
    console.log(userinfo.id)
  
  }}
  const router = useRouter();
const currentRoute = router.pathname;
console.log(currentRoute)
  return (
    <nav className='navbar'>
        <h2 style={{color:'white'}}>{"< "} UniWeb{" />"}</h2>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
        
            <Link  className={currentRoute == "/"
       ? "active" 
       : "non-active"} href="/"><span>Главная</span></Link>
          <Link className={currentRoute == "/#email"
       ? "active" 
       : "non-active"}   href={"/#email"}><span>Контакты</span></Link>  
       {userinfo?
       <>
        <Link  className={currentRoute == "/materials"
        ? "active" 
        : "non-active"} href="/materials" ><span>Наши проекты</span></Link>
           <Link  className={currentRoute == "/favourite"
        ? "active" 
        : "non-active"} href="/favourite" ><span>Избранное</span></Link>
        {userinfo.job==1 && <Link  className={currentRoute == "/statistics/[statiid]"
        ? "active" 
        : "non-active"} href={`/statistics/${userinfo.id}`} ><span>Статистика</span></Link> } 
             <Link  className={currentRoute == "/logout"
        ? "active" 
        : "non-active"} href={'/logout'}>Выйти</Link>
        <Link  href={`/profile/user/${userinfo.id}`} > <img style={{height:48}} src='../../profile.png'/></Link>
        </>
      
      
      :  <Link  className={currentRoute == "/login"
      ? "active" 
      : "non-active"} href={'/login'}>Войти</Link>
}
             
           
           
        </div>
    </nav>
  )
}
