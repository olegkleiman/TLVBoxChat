import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import classNames from "classnames";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import LogInLogo from './components/LogInLogo'

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
const theme = createTheme({
    direction: 'rtl',
});  

const LogIn = () => {

    const [flipped, setFlipped] = useState(false);
    const [cardClass, setCardClass] = useState('flip-card');
    
    const [userId, setUserId] = useState('313069486');
    const [phoneNumber, setPhoneNumber] = useState('0543307026');
    const [otpValue, setOtpValue] = useState([]);
    
    const flipCard = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const cardClass = classNames({
            "flip-card": true,
            flipped: flipped 
        })
        setCardClass(cardClass);
    }, [flipped])

    const rotate = () => {
        setFlipped(!flipped);
    }

    const onRequestOtp = async(event) => {
        event.preventDefault()

        try {
            const res = await axios.post("https://api.tel-aviv.gov.il/sso/request_otp", {
                "phoneNumber": phoneNumber, 
                "userId": userId,
                "clientId": "bf2700ec-4f8c-4731-bd9d-19850577789d",
                 "lang": "he-IL"
            })
            console.log(res.data)            
            
            rotate();
        }
        catch(error) {
            console.error(error)
        }
    }

    const onLogin = async(event) => {
        event.preventDefault();

        try {
            const res = await axios.post("https://api.tel-aviv.gov.il/sso/login", {
                    "phoneNumber": phoneNumber, 
                    "otp": otpValue,
                    "clientId": "bf2700ec-4f8c-4731-bd9d-19850577789d",
                    "scope": "openid offline_access https://b2ctam.onmicrosoft.com/chat/all",
                    "deviceId": "00155DBCA33D"
            })
            console.log(res.data) 


            navigate('/chat', {
                state: {
                    jwt: res.data.access_token
                }
            });

            // navigate('/otp', {
            //     state: {
            //         phoneNumber: phoneNumber,
            //         userId: userId
            //     }
            // });            

            //rotate();
        }
        catch(error) {
            console.error(error);
        }

        rotate();
    }

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div className="form-card-container">
                    <div ref={flipCard} className={`${cardClass}`} id="flipCard">
                
                        <figure className="login-side">
                            <LogInLogo />
                            <div>
                                
                                <p>תעודת זהות</p>
                                <input value={userId}
                                        id="user_id"
                                        onChange={ (event) => setUserId(event.target.value) }/>
                                
                                <p>מספר טלפון</p>
                                <input value={phoneNumber}
                                        id="phoneNumber"
                                        onChange={ (event) => setPhoneNumber(event.target.value) }/>

                                <Button type="submit"
                                        style={{position: "absolute", top: "200px"}}
                                        variant="contained"
                                        onClick={onRequestOtp}>
                                        שלח קוד
                                </Button>                         
                            </div>
                        </figure>
                        <figure className="signup-side">
                            <LogInLogo />
                            <div>
                                <p>קוד</p>
                                <input value={otpValue}
                                        id="otpValue"
                                        onChange={ (event) => setOtpValue(event.target.value) } />

                                <Button type="submit"
                                        style={{position: "absolute", top: "200px"}}
                                        variant="contained"
                                        onClick={onLogin}>
                                    כניסה
                                </Button> 
                            </div>
                        </figure>
                
                    </div>
                </div>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default LogIn;