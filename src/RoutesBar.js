import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';



function RoutesBar() {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>             
                <Route path="login" element={<Login />}/>             
                <Route path="signup" element={<Signup />}/>             
                <Route path="profile" element={<Profile />}/>    
                <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>}/>    
       
            </Routes>
        </main>
    );
  
}


export default RoutesBar;