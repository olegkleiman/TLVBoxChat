import React, {useContext} from 'react';
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

    const navigate = useNavigate();

    const onSignIn = async(event) => {
        event.preventDefault()

        try {
            const res = await axios.post("https://api.tel-aviv.gov.il/sso/request_otp", {
                "phoneNumber": "0543307026",
                "userId": "313069486",
                "clientId": "29e60c77-9a0b-4a80-9745-64ba51ff3aa2",
                "lang": "he-IL"         
            })
            console.log(res.data)

            navigate('/site');
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
                        <Input id="tz" placeholder="type t.z."/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" placeholder="type your phone number" type="tel"/>
                    </FormGroup>
                </Form>
            </Col>
            <Col className="class-col">
                <Button color="primary" outline
                        size="sm"
                        onClick={onSignIn}>
                    <FaSignInAlt />
                </Button>
            </Col>
            </Row>
        </Container>
        <Footer />
    </>)
}

export default SignIn;