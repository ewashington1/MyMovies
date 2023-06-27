import React from 'react';
import {firebase, auth} from "../firebase/config.js";
import {useState} from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//simple login form--no need for comments
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            nav("/");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className=' ml-2 mt-2'>
            
            <form onSubmit={submit}>
                <div className='pb-2'>
                    <label htmlFor="email">Email: </label>
                    <input className=" border-2 rounded-full pl-2" id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                
                <div className='pb-2'>
                    <label htmlFor="password">Password: </label>
                    <input className=" border-2 rounded-full pl-2" id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button className="outline outline-slate-600 pl-3 pr-3 pt-1 pb-1 rounded-full bg-slate-400 text-white" type="submit">Log In</button>
            </form>

            <div className=' inline'>Don't have an account? </div>
            <Link to="/signup" className='pl-3 pr-3 pt-1 pb-1 bg-green-400 outline outline-slate-400 rounded-full'>Sign Up!</Link>
        </div>
        
  )
}
