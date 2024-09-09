import React, {useRef, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import classNames from "classnames";
import { CacheProvider } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, responsiveFontSizes , ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { white, green, blue, red } from '@mui/material/colors';

import LogInLogo from './components/LogInLogo'

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
var theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: [
            "system-ui"
        ]},
        fontSize: 10
});
//theme = responsiveFontSizes(theme);

const LogIn = () => {

    const [flipped, setFlipped] = useState(false);
    const [cardClass, setCardClass] = useState('flip-card');

    const [invoking, setInvoking] = useState(false);
    
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

        setInvoking(true);

        try {
            const res = await axios.post("https://apimtlvppr.tel-aviv.gov.il/sso/request_otp", {
                "phoneNumber": phoneNumber, 
                "userId": userId,
                "clientId": "993f503d-8081-4a84-b5b5-30b3e7f3c641",
                 "lang": "he-IL"
            })
            console.log(res.data)            
            
            setInvoking(true);
            rotate();
        }
        catch(error) {
            console.error(error)
        }
    }

    const onLogin = async(event) => {
        event.preventDefault();

        try {
            const res = await axios.post("https://apimtlvppr.tel-aviv.gov.il/sso/login", {
                    "phoneNumber": phoneNumber, 
                    "otp": otpValue,
                    "clientId": "993f503d-8081-4a84-b5b5-30b3e7f3c641",
                    "scope": "openid offline_access https://TlvfpB2CPPR.onmicrosoft.com/chat/access_all",
                    "deviceId": "00155DBCA33D"
            })
            console.log(res.data) 

            navigate('/chat', {
                state: {
                    jwt: res.data.access_token
                }
            });
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
                            <div style={{ paddingTop: 4}}>
                                
                                <div style={{visibility: invoking? "hidden" : "visible" }} >
                                    <p>תעודת זהות</p>
                                    <input value={userId}
                                            id="user_id"
                                            style={{fontFamily: "system-ui", fontSize: 12}}
                                            onChange={ (event) => setUserId(event.target.value) }/>
                                    
                                    <p>מספר טלפון</p>
                                    <input value={phoneNumber}
                                            id="phoneNumber"
                                            style={{fontFamily: "system-ui", fontSize: 12}}
                                            onChange={ (event) => setPhoneNumber(event.target.value) }/>

                                    <Button type="submit"
                                            style={{position: "absolute", top: "300px", left: "120px"}}
                                            variant="contained"
                                            onClick={onRequestOtp}>
                                            שלח קוד
                                    </Button>  
                                </div>

                                <CircularProgress size={40}
                                            style={{visibility: invoking? "visible": "hidden" }}
                                            sx={{
                                            color: blue[700],
                                            position: 'absolute',
                                            top: 38,
                                            left: 140,
                                            zIndex: 1,
                                            }} />
                            </div>
                        </figure>
                        <figure className="signup-side">
                            <LogInLogo />
                            <div>
                                <p>קוד</p>
                                <input value={otpValue}
                                        id="otpValue"
                                        style={{fontFamily: "system-ui", fontSize: 12}}
                                        onChange={ (event) => setOtpValue(event.target.value) } />
                                <Button type="submit"
                                        style={{position: "absolute", top: "300px", left: "120px"}}
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