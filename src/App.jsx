import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Site from './components/Site';
import SignIn from './SignIn';
import Otp from './Otp';

const App = () => 
{
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/site' element={<Site />} />
            </Routes>
        </BrowserRouter>)
}

export default App;