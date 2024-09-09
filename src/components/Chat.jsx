import React, {useRef, useState, useContext, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Chat = ({match}) => {

    const dfMessenger = useRef(null);
    const {state} = useLocation();

    useEffect(() => {

        window.addEventListener('df-messenger-loaded', () => {
            console.log('DF Messenger loaded');
        });

        window.addEventListener('df-request-sent', (event) => {
            console.log('Request', event.detail.data.requestBody);
        });

        window.addEventListener('picked_up', (event) => {
            console.log('PickedUp event', event.parameters)
        })

        // window.addEventListener('df-response-received', (event) => {
        //     // Remove all non-text messages.
        //     // event.detail.data.messages = event.detail.data.messages.filter(message => {
        //     //     return message.type === 'text';
        //     // });
        // });          

        // document.addEventListener('df-messenger-loaded', (event) => {
        //     const queryParams = {
        //         parameters:{
        //           "jwt": state.jwt,
        //           "User_Authorized": "True",
        //           "userId": token["signInNames.citizenId"],
        //           "userName": token.name,
        //           "userEmail": token["signInNamesInfo.emailAddress"],
        //         }
        //       };
        //     dfMessenger.current.setQueryParameters(queryParams);
        // });

        window.addEventListener('df-user-input-entered', (event) => {
            console.log(event.detail.input);
            
            const token = jwtDecode(state.jwt);
            console.log(token);

            const queryParams = {
                  parameters:{
                    "userId": token["signInNames.citizenId"],
                    "jwt": state.jwt,
                  }
                };
            dfMessenger.current.setQueryParameters(queryParams);
          });
    })

    return (
        <df-messenger
                    project-id="muni-tlv"
                    agent-id="46727f85-4983-4edb-b8b1-55df166837da"
                    language-code="he-il"
                    max-query-length="-1"
                    storage-option="none"
                    ref={dfMessenger}>
                        <df-messenger-chat-bubble
                            chat-title="TLV Box"
                            chat-subtitle="Personal Assistant"
                            allow-fullscreen="always"
                            placeholder-text="כתוב כאן...">
                        </df-messenger-chat-bubble>
                </df-messenger>

        )
}

export default Chat;