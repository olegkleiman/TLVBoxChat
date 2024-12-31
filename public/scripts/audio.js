
async function playAudio(audioText) {

    const data = {
          "text": audioText
    }

    const resp = await fetch("https://tlvbox.azurewebsites.net/api/t2s", {
            method: 'POST',
            body: JSON.stringify(data)
    })

    if( resp.ok ) {
        const synthResponse = await resp.json()
        const oggBase64 = synthResponse.audioContent
        
        // Convert the synthesation resut into pure binary form
        var binaryAudioData = convertToBinary(oggBase64)
        playRawAudioData(binaryAudioData);
    }
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