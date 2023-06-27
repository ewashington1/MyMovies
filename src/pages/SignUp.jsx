import React from 'react';
import {firebase, auth} from "../firebase/config.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from '../functions/userFunctions.js';

//simple sign up form -- no need for comments
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>  {
            const user = userCredential.user;
            console.log(user);
            createUserProfile(email, user.uid);
            nav("/");
        })
        .catch((error) => {
            console.log(error.message);
        });
        
    };

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

                <button className="outline outline-slate-600 pl-3 pr-3 pt-1 pb-1 rounded-full bg-slate-400 text-white" type="submit">Create Account</button>
            </form>
        </div>
  )
}
