import React, { useEffect } from 'react';
import './App.css';
import { Button, FeedCard } from './components';
import { constants, supabase } from "./utils"
import google from './assests/google.svg';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Success } from './pages';
import { AuthProvider } from './providers';

function App() {
  
  return (
    <div>
      {/* <p className="text-3xl font-bold underline">Learn React</p>
      <Button text={constants.CONTINUE_WITH_GOOGLE} leftIcon={google} />
      <FeedCard images={[]} hashtags={["NYC", "Travel"]} /> */}
      <Router>
        <AuthProvider>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/success' element={<Success />} />
        </Routes>
        </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
