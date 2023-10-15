import React from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Signup() {
	const router = useRouter()

	axios.defaults.withCredentials = true;
  const [error,setError] = useState(false)

  
  
	const formik = useFormik({
  
	  initialValues: {
  
		email: "",
		password: "",
		  fio: "",
		  username: "",
		
  
	  },
  
	  onSubmit: async (values)=> {
  
		try {
		  var res=await axios.post("http://localhost:8800/signup", values);
		  console.log("res",res.data)
		 router.push('/login')
	 
		} catch (err) {
	
		  setError(true)
  
	  }
	},
	validate:values=>{
	  let errors = {};
	  const regA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	  const regB = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
	  const regC = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,^.]).{8,32}$/i;
	  if (!values.email) {
		errors.email = "Заполните поле";
	  } else if (!regA.test(values.email)) {
		errors.email = "Неверный формат";
	  }
	  if (!values.username) {
		errors.username = "Заполните поле";
	  } else if (values.username.length < 4) {
		errors.username = "Слишком короткое имя";
	  }
	  else if (!regB.test(values.username)){
		errors.username = "Начните с букв, исключите символы"
	  }
	  if (!values.password) {
		errors.password = "Заполните поле";
	  } else if (values.password.length < 7) {
		errors.password = "Слишком короткий парооль";
	  }
	  else if (!regC.test(values.password)){
		errors.password = "Используйте буквы обоих регистров, цифры и символы";
  
	  }
	  return errors;
	}
  
	
	}
  )
  return (
    <div className='login'>


<div className="box-form">
	<div className="left">
		<div className="overlay">
		<h2>UniWeb</h2>
	
		</div>
	</div>
	
	
		<div className="right">
		<h5 className='h5'>Создать аккаунт</h5>
		<p>Уже зарегистрированы? <a href="/login"> Войти</a> Приглашайте друзей!</p>
		<form className="inputs"  onSubmit={formik.handleSubmit}>
			<input name='username' type="text"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.username} placeholder="petri1234"/>
			  {formik.errors.username ? <p className="error" >
             {formik.errors.username}
           </p> :null}
	
			<input name='password'  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.password}  placeholder="petrov1234$"/>
			  {formik.errors.password ? <p className="error" >
             {formik.errors.password}
           </p> :null}

			<input name='fio'  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.fio} placeholder="Петров Петр Иванович"/>
	
  
			<input name='email' type="email"  onChange={formik.handleChange}  onBlur={formik.handleBlur}
             value={formik.values.email} placeholder="ivanuk@gmail.com"/>
				 {formik.errors.email ? <p className="error" >
             {formik.errors.email}
           </p> :null}
		  

		   <button style={{marginTop:40}} onSubmit={formik.handleSubmit}>Отправить</button>

		</form>

			
			<br/>
	</div>
	
</div>

  

    </div>
  )
}
