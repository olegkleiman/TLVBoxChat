import React, {useRef, useState} from 'react';
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

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
const theme = createTheme({
    direction: 'rtl',
});  

const LogIn = () => {

    const [isRotated, setIsRotate] = useState(false);
    
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [userId, setUserId] = useState([]);
    const [otpValue, setOtpValue] = useState([]);
    const flipCard = useRef();

    const rotate = () => {

        const rotationState = !isRotated;
        setIsRotate(rotationState);

        const cardClass = classNames({
            "flip-card": true,
            "flipped": rotationState 
        })

        flipCard.current.className = cardClass;
    }

    const onRequestOtp = async(event) => {
        event.preventDefault()

        try {

            // const res = await axios.post("https://api.tel-aviv.gov.il/sso/request_otp", {
            //     "phoneNumber": "0543307026", // phoneNumber, 
            //     "userId": "313069486", // userId,
            //     "clientId": "bf2700ec-4f8c-4731-bd9d-19850577789d",
            // })
            // console.log(res.data)            
            
            rotate();
        }
        catch(error) {
            console.error(error)
        }
    }

    const onLogin = async(event) => {
        event.preventDefault();

        try {
            // const res = await axios.post("https://api.tel-aviv.gov.il/sso/login", {
            //         "phoneNumber": "0543307026", // phoneNumber, 
            //         "otp": otpValue,
            //         "clientId": "bf2700ec-4f8c-4731-bd9d-19850577789d",
            //         "scope": "openid offline_access https://b2ctam.onmicrosoft.com/chat/all",
            //         "deviceId": "00155DBCA33D"
            // })
            // console.log(res.data) 

            rotate();
        }
        catch(error) {
            console.error(error);
        }

        rotate();
    }

    return (<CacheProvider value={cacheRtl}>
<ThemeProvider theme={theme}>
        <Container ref={flipCard} className="flip-card">
            {/* <CssBaseline /> */}
            <figure className="login-side">
                <Box>
                    <Grid item align = "center" justify = "center" alignItems = "center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className='not-rotated'>
                            כניסה למערכת
                        </Typography>
                    </Grid>
                </Box>                 
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="user_id"
                    value={userId}
                    label="תעודת זהות"
                    name="user_id"
                    autoComplete="user_id"
                    autoFocus
                    variant="outlined"
                    dir="rtl"
                    onChange={ (event) => setUserId(event.target.value) }
                    />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone_number"
                    label="מספר טלפון נייד"
                    id="phoneNumber"
                    value={phoneNumber}
                    dir="rtl"
                    onChange={ (event) => setPhoneNumber(event.target.value) }
                />
                <Box align = "center">
                    <Button type="submit"
                            variant="contained"
                            onClick={onRequestOtp}>
                            שלח קוד
                    </Button> 
                </Box>                 
            </figure>
            <figure className="otp-side">
                <Box>
                    <Grid item align = "center" justify = "center" alignItems = "center">
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className='not-rotated'>
                            כניסה למערכת
                        </Typography>
                    </Grid>
                </Box>   
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="otp_value"
                    label="קוד"
                    id="otp_value"
                    value={otpValue}
                    onChange={ (event) => setOtpValue(event.target.value) }
                    dir="rtl" />
                    <br /><br /><br /><br />
                <Box align = "center">
                    <Button type="submit"
                            variant="contained"
                            onClick={onLogin}>
                            שלח קוד
                    </Button> 
                </Box>
            </figure>
        </Container>
        </ThemeProvider>
        </CacheProvider>
    )
}

export default LogIn;