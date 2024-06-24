import React, {useRef, useState, useContext, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Chat = ({match}) => {

    const dfMessenger = useRef(null);
    const {state} = useLocation();

    useEffect(() => {

        window.addEventListener('df-request-sent', (event) => {
            console.log('Request', event.detail.data.requestBody);
        });

        window.addEventListener('df-response-received', (event) => {
            // Remove all non-text messages.
            event.detail.data.messages = event.detail.data.messages.filter(message => {
                return message.type === 'text';
            });
        });          

        // document.addEventListener('df-messenger-loaded', (event) => {
        //     const queryParams = {
        //         parameters:{
        //           "jwt": state.jwt,
        //           "User_Authorized": "True",
        //           "User_Id": token["signInNames.citizenId"],
        //           "Information_Name": token.name,
        //           "Information_Email": token["signInNamesInfo.emailAddress"],
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
                    "jwt": state.jwt,
                  }
                };
            dfMessenger.current.setQueryParameters(queryParams);
          });
    })

    return (
        <df-messenger
                    location="europe-west3"
                    project-id="muni-tlv"
                    agent-id="62c2701d-60d9-427d-a04f-4a00f15e5632"
                    language-code="he-il"
                    max-query-length="-1"
                    ref={dfMessenger}>
                        <df-messenger-chat-bubble
                            chat-title="TLV Box"
                            chat-subtitle="Personal Assistant"
                            allow-fullscreen="always"
                            placeholder-text="כתוב השאלה באן...">
                        </df-messenger-chat-bubble>
                </df-messenger>
        
        //     <div dangerouslySetInnerHTML={{ __html: `<df-messenger
        //             location="europe-west3"
        //             project-id="muni-tlv"
        //             agent-id="62c2701d-60d9-427d-a04f-4a00f15e5632"
        //             language-code="he-il"
        //             max-query-length="-1">
        //                 <df-messenger-chat-bubble
        //                     chat-title="TLV Box"
        //                     chat-subtitle="Personal Assistant"
        //                     allow-fullscreen="always"
        //                     placeholder-text="כתוב השאלה באן...">
        //                 </df-messenger-chat-bubble>
        //         </df-messenger>)
        // ` }} />
        )
}

export default Chat;