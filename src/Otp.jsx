import React, {useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import {
    Container,
    Form, FormGroup,
    Label,
    Row, Col,
    Input,
    Button
} from 'reactstrap';
import axios from 'axios';

const Otp = () => {

    const [otp, setOtp] = useState("");
    const {state} = useLocation();

    const navigate = useNavigate();

    const handleChange = async(event) => {

        setOtp(event.target.value)
    }

    const onSignIn = async(event) => {

        event.preventDefault()

        try {
            const res = await axios.post("https://apimtlvppr.tel-aviv.gov.il/sso/login", {
                "phoneNumber": state.phoneNumber, 
                "otp": otp,
                "clientId": "bf2700ec-4f8c-4731-bd9d-19850577789d",
                "scope": "openid offline_access https://b2ctam.onmicrosoft.com/chat/all",
                "deviceId": "00155DBCA33D"        
            },
            {
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data)

            navigate('/chat', {
                state: {
                    jwt: res.data.access_token
                }
            });
        }catch(error) {
            console.error(error)
        }        
    }

    return (
        <Form>
            <FormGroup>
                <Label for="otp">OTP:</Label>
                <Input id="otp" 
                        onChange={handleChange} value={otp}/>
            </FormGroup>
            <Button color="primary" outline
                type="submit"
                onClick={onSignIn}/>
        </Form>
    )
}

export default Otp;