import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Chat from './components/Chat';
// import SignIn from './SignIn';
import LogIn from './LogIn';
import Otp from './Otp';

const App = () => 
{
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LogIn />} />
                {/* <Route path='/' element={<SignIn />} /> */}
                <Route path='/otp' element={<Otp />} />
                <Route path='/chat' element={<Chat />} />
            </Routes>
        </BrowserRouter>)
}

export default App;