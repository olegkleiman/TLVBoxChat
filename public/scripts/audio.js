const openMicrophone = async() => {
    
    const micPermissions = localStorage.getItem("microphonePermissions"); 
    
    const micImage = document.getElementById('mic_img');

    try {
        await requestMicrophonePermission();
        micImage.src = "https://www.google.com/intl/en/chrome/assets/common/images/content/mic-animate.gif";

        startRecording();
    } catch (error) {
        console.error(error);
    }
}

const requestMicrophonePermission = async() => {
    
    try {
        const mediaDevices = navigator.mediaDevices;

        if (!mediaDevices || !mediaDevices.getUserMedia) {
            alert("getUserMedia() not supported.");
            return;
        }

        // prompts the user for permission to use a microphone
        await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch(ex) {
        console.error("Microphone permission denied:", ex.message);
    }
}

const startRecording = () => {
    try {

        recognition.start();

        const micImage = document.getElementById('mic_img');
        micImage.alt = "Stop";
        micImage.src = "https://www.google.com/intl/en/chrome/assets/common/images/content/mic-animate.gif";

    } catch(ex) {
        console.log(ex.message);
        recognition.stop();
    }
}

const stopRecording = () => {
    try {
        recognition.stop();

        const micImage = document.getElementById('mic_img');
        micImage.alt = "Start";
        micImage.src = "https://www.google.com/intl/en/chrome/assets/common/images/content/mic.gif";

    } catch(ex) {
        console.log(ex.message);
    }
}

async function playAudio(audioText) {

    const synth = window.speechSynthesis;

    const utterThis = new SpeechSynthesisUtterance(audioText);
    const voices = synth.getVoices()
    const filteredVoices = voices.filter(voice => voice.lang === "he-IL");
    utterThis.lang = 'he-IL';
    utterThis.voice = filteredVoices[0];
    utterThis.pitch = 1.0; // pitch.value;
    utterThis.rate = 1.0; //rate.value;
    synth.speak(utterThis);

    // const data = {
    //       "text": audioText
    // }

    // const resp = await fetch("https://tlvbox.azurewebsites.net/api/t2s", {
    //         method: 'POST',
    //         body: JSON.stringify(data)
    // })

    // if( resp.ok ) {
    //     const synthResponse = await resp.json()
    //     const oggBase64 = synthResponse.audioContent
        
    //     // Convert the synthesation resut into pure binary form
    //     var binaryAudioData = convertToBinary(oggBase64)
    //     playRawAudioData(binaryAudioData);
    // }
}

async function playAudioStream(text) {

    const data = {
          "prompt": text,
          "sessionid": ""
    }

    const jwt = localStorage.getItem("accessToken");
    const resp = await fetch("http://localhost:7079/api/chat", {
            method: 'POST',
            headers: {
                "Authorization" : jwt
            },
            body: JSON.stringify(data)
    })
    if( resp.ok ) {
        const chatResponse = await resp.json()
        const base64AudioContent = chatResponse.audioContent;

        const binaryAudioData = convertToBinary(base64AudioContent);
        playRawAudioData(binaryAudioData);
    }   
}

function playRawAudioData(binaryAudioData) {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const source = audioCtx.createBufferSource();

    audioCtx.decodeAudioData(binaryAudioData.buffer.slice(0), function(buffer) {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
    })       
}