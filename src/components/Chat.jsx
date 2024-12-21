import React, {useRef, useLayoutEffect, useState, useContext, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Chat = ({match}) => {

    const dfMessenger = useRef(null);
    const {state} = useLocation();

    useLayoutEffect( () => {

        window.addEventListener('df-messenger-loaded', () => {

            console.log('DF Messenger loaded'); 

            const token = jwtDecode(state.jwt);

            const queryParams = {
                parameters:{
                  "jwt": state.jwt,
                  "User_Authorized": "True",
                  "userId": token["signInNames.citizenId"],
                  "userName": token.name,
                  "userEmail": token["signInNamesInfo.emailAddress"],
                }
              };
            dfMessenger.current.setQueryParameters(queryParams);
        });
        
    })

    useEffect(() => {

        dfMessenger.current.renderCustomText('שלום')
        //dfMessenger.current.sendRequest('event', 'reset_conversation');  

        // window.addEventListener('df-messenger-loaded', () => {
        //     console.log('DF Messenger loaded');
        // });

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

        // window.addEventListener('df-user-input-entered', (event) => {
        //     console.log(event.detail.input);
            
        //     const token = jwtDecode(state.jwt);
        //     console.log(token);

        //     const queryParams = {
        //           parameters:{
        //             "userId": token["signInNames.citizenId"],
        //             "jwt": state.jwt,
        //           }
        //         };
        //     dfMessenger.current.setQueryParameters(queryParams);
        //   });
    })

    return (<>
        <button id="start" class="message-start" onclick="reset_conversation()">
            <img alt="Start"  width="24" height="24" src="assets/img/power-on-24.png" />
        </button>
        <button id="record" class="message-mic" onclick="openMicrophone()">
            <img alt="microphone" id="mic_img" style={{border:'none'}} width="32" height="32" src="https://www.google.com/intl/en/chrome/assets/common/images/content/mic.gif" />
        </button>
        <button id="camera" class="message-camera" onclick="openCamera()">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z">
                </path>
            </svg>
        </button>
        <input type="file" id="pictureSelector" accept="image/*" class="message-file-input" capture="camera"></input>        

        <df-messenger
            project-id="muni-tlv"
            agent-id="46727f85-4983-4edb-b8b1-55df166837da"
            language-code="he-il"
            max-query-length="-1"
            storage-option="none"
            allow-feedback="all"
            intent="reset_conversation"
            ref={dfMessenger}>
            <df-messenger-chat-bubble
                expanded="true"
                chat-title="TLV Box"
                chat-subtitle="עוזרת אישית"
                placeholder-text="טקסט חופשי..."
                chat-title-icon="./assets/img/HAL9001Logo.png"
                allow-fullscreen="always">
            </df-messenger-chat-bubble>
        </df-messenger>
        </>
    )
}

export default Chat;