import React from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
export default function Login() {
	
	const [error,setError] = useState(false)
	const [checked,setChecked]=useState(false)
	const toggleCheck=()=>{
		setChecked(curr=>!curr)
	}
	const router = useRouter()
	axios.defaults.withCredentials =true
	const send=()=>{
		formik.handleSubmit
		
	}
	const formik = useFormik({
  
	  initialValues: {
  
		loginname: '',
  
		loginpassword: '',
  
	  },
  
	  onSubmit: async (values)=> {
  
		try {
		  const {data} = await axios.post("http://localhost:8800/login", values)
		  localStorage.setItem("token", data);
		
		
		  router.push('/')
		  
		 
	 
		} catch (err) {
	
		  setError(true)
  
	  }
	},
	validate:values=>{
	  let errors = {};
	  const regB = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
	  const regC = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i;
	  if (!values.loginname) {
		errors.loginname = "Заполните поле";
	  } else if (values.loginname.length < 4) {
		errors.loginname = "Слишком короткое имя";
	  }
	  else if (!regB.test(values.loginname)){
		errors.loginname = "Начните с букв, исключите символы"
	  }
	  if (!values.loginpassword) {
		errors.loginpassword = "Заполните поле";
	  } else if (values.loginpassword.length < 7) {
		errors.loginpassword = "Слишком короткий парооль";
	  }
	  else if (!regC.test(values.loginpassword)){
		errors.loginpassword = "Используйте буквы обоих регистров, цифры и символы";
  
	  }
	  return errors;
	}
  })
  
  
  return (
    <div className='login'>


<div className="box-form">
	<div className="left">
		<div className="overlay">
		<h2>UniWeb</h2>
	
		</div>
	</div>
	
	
		<div className="right">
		<h5>Войти</h5>
		<p>Вы здесь впервые? <a href="/signup">  Создать аккаунт.</a> Это займет пару секунд</p>
		<form className="inputs" onSubmit={formik.handleSubmit}>
			<input name='loginname' type="text"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.loginname} placeholder="ivanuk1234"/>
			   {formik.errors.loginname ? <p className="error" >
             {formik.errors.loginname}
           </p> :null}
			
			<input name='loginpassword'  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.loginpassword} placeholder="Ivanuk1234$"/>
			
			{formik.errors.loginpassword ? <p className="error" >
             {formik.errors.loginpassword}
           </p> :null}<br/>
			
	
			
			<br/>
			<button onClick={()=>send()}> Войти</button>
		</form>
			
			
	</div>
	
</div>

  

    </div>
  )
}
