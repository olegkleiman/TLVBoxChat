import React, {useState, useRef, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import {
    Form, FormGroup,
    Label,
    Row, Col,
    Input,
} from 'reactstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { FaSignInAlt } from 'react-icons/fa';
import Footer from './components/Footer';

const defaultTheme = createTheme({
    direction: 'rtl',
});

const SignIn = () => {

    const [isRotated, setIsRotate] = useState(false);

    const phoneNumber = useRef();
    const userId = useRef();
    const mainCard = useRef();

    const navigate = useNavigate();

    const onRequestOtp = async(event) => {
        event.preventDefault()

        try {

            setIsRotate(!isRotated);

            const cardClass = classNames({
                "flip-card": true,
                "flipped": isRotated 
            })

            mainCard.current.className = cardClass;

            // const res = await axios.post("https://api.tel-aviv.gov.il/sso/request_otp", {
            //     "phoneNumber": phoneNumber.current.props.defaultValue, 
            //     "userId": userId.current.props.defaultValue,
            //     "clientId": "29e60c77-9a0b-4a80-9745-64ba51ff3aa2",
            //     "lang": "he-IL"         
            // })
            // console.log(res.data)

            // navigate('/otp', {
            //     state: {
            //         phoneNumber: phoneNumber.current.props.defaultValue,
            //         userId: userId.current.props.defaultValue
            //     }
            // });
        }catch(error) {
            console.error(error)
        }
    }

    return (<>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" dir="rtl" >
                <CssBaseline />
                <Box ref={mainCard} className='flip-card'>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className='not-rotated'>
                            כניסה למערכת
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} dir="rtl">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="user_id"
                                label="תעודת זהות"
                                name="user_id"
                                autoComplete="user_id"
                                autoFocus
                                variant="outlined"
                                dir="rtl"
                                ref={userId}
                                defaultValue={'313069486'}
                                />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone_number"
                                label="מספר טלפון נייד"
                                id="phoneNumber"
                                ref={phoneNumber}
                                dir="rtl"
                                defaultValue={'0543307026'}
                            /> 
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button className="exclude"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onRequestOtp}>
                                שלח קוד
                            </Button> 
                            <Grid container>
                                    <Grid item>
                                    <Link href="#" variant="body2">
                                    {"עוד לא נרשת? הרשמה"}
                                    </Link>
                                </Grid>                                                
                            </Grid>
                                            
                        </Box>
                    </Box>
                </Box>

            </Container>
            <Footer />
        </ThemeProvider>
    </>)
}

export default SignIn;