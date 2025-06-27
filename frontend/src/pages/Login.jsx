import React, { useState } from "react";

const Login = () => {
  
    const [state,setState]=useState("Login");
    const [formData,setFormData]=useState({
      username:"",
      password:"",
      email:"",
    })

    const changeHandler=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    }

    const login =async()=>{
      console.log("Login function executed",formData);
      let responseData;
      await fetch('http://localhost:4000/login',{
        method:"POST",
        headers:{
          Accept:"application/formData",
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      }).then((response)=>response.json()).then((data)=>responseData=data )

      if (responseData.success) {
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace('/');
        
      }else{
        alert(responseData.errors)
      }
    }
    const signup =async()=>{
      console.log("Signup function executed",formData);
      let responseData;
      await fetch('http://localhost:4000/signup',{
        method:"POST",
        headers:{
          Accept:"application/formData",
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      }).then((response)=>response.json()).then((data)=>responseData=data )

      if (responseData.success) {
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace('/');
        
      }else{
        alert(responseData.errors)
      }

      
    }
  
  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w[555px] h-[600px] bg-white m-auto px-14 py-10">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
         {state==="Sign Up"?<input
            type="text"
            placeholder="Your Name"
            name="username" onChange={changeHandler} value={formData.username}
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />:''}
          <input
            type="email"
            placeholder="Your Email.." name="email" onChange={changeHandler} value={formData.email}
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            name="password" onChange={changeHandler} value={formData.password}
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
        </div>
        <button onClick={()=>{state==='Login'?login():signup()}} className="btn_dark_rounded my-5 w-full !rounded-md">
          Continue
        </button>
        {state==="Sign Up"?<p className="text-black font-bold">
          Already have an account?{" "}
          <span onClick={()=>{setState("Login")}} className="text-secondary underline cursor-pointer ">
            Login
          </span>
        </p>: <p className="text-black font-bold">
          Create an account?{" "}
          <span  onClick={()=>{setState("Sign Up")}} className="text-secondary underline cursor-pointer ">
            Cick here
          </span>
        </p>}
        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
