import React, { useState } from 'react'
import { useAuth } from '../services/AuthProvider'
import axios from 'axios';
import { api } from '../config/apis';

export const Profile = () => {
    const {tokens} = useAuth();
    const [user, setUser] = useState({
        username: "",
        email:""
    });

    axios({
        url: `${api}/auth/get-profile`,
        method: "POST",
        headers:{
            "Authorization": tokens.access.token,
            "Content-Type": "application/json" 
        }
    }).then((res) => {    
        setUser({username: res.data.user.username,
        email: res.data.user.email});
    })
    .catch((err) => {

    });
  return (
    <>
    <div>
    <p>Username: {user.username}</p><br/> 
    <p>Email: {user.email} </p><br />
    </div>
    </>
  )
}
