import React, {useRef, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {
    Container,
    Form, FormGroup,
    Label,
    Row, Col,
    Input,
    Button
} from 'reactstrap';
import axios from 'axios';
import { FaSignInAlt } from 'react-icons/fa';
import Footer from './components/Footer';

const SignIn = () => {

    const phoneNumber = useRef();
    const userId = useRef();

    const navigate = useNavigate();

    const onRequestOtp = async(event) => {
        event.preventDefault()

        try {
            const res = await axios.post("https://api.tel-aviv.gov.il/sso/request_otp", {
                "phoneNumber": phoneNumber.current.props.defaultValue, 
                "userId": userId.current.props.defaultValue,
                "clientId": "29e60c77-9a0b-4a80-9745-64ba51ff3aa2",
                "lang": "he-IL"         
            })
            console.log(res.data)

            navigate('/otp', {
                state: {
                    phoneNumber: phoneNumber.current.props.defaultValue,
                    userId: userId.current.props.defaultValue
                }
            });
        }catch(error) {
            console.error(error)
        }
    }

    return (<>
        <Container>
            <Row  className="main-container">
            <Col className="class-col">
                <Form>
                    <FormGroup>
                        <Label for="tz">T.Z.</Label>
                        <Input id="tz"
                                ref={userId} 
                                placeholder="type t.z." defaultValue={'313069486'}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" 
                                ref={phoneNumber}
                                placeholder="type your phone number" 
                                type="tel" 
                                defaultValue={'0543307026'}/>
                    </FormGroup>
                </Form>
            </Col>
            <Col className="class-col">
                <Button color="primary" outline
                        size="sm"
                        onClick={onRequestOtp}>
                    <FaSignInAlt />
                </Button>
            </Col>
            </Row>
        </Container>
        <Footer />
    </>)
}

export default SignIn;