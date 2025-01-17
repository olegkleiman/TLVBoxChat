class AudioEngine {
    constructor(language) {
        this.lang = language;

        // Initialize the speech recognition
        this.recognition = new (window.webkitSpeechRecognition || 
                    window.webkitSpeechRecognition ||
                    window.mozSpeechRecognition ||
                    window.msSpeechRecognition)();

            this.recognition.continuous = false; // when the user stops talking, speech recognition will end.
            this.recognition.interimResults = false; // if false only results returned by the recognizer are final and will not change. 

            this.recognition.onresult = (event) => {
                let final_transcript = '';
                let interim_transcript = '';

                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript;
                        speak(final_transcript)
                    } else {
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
        }

        // Initialize the speech synthesis
        if( 'speechSynthesis' in window ) { 
            this.speechSynthesis = window.speechSynthesis;
            const voices = this.speechSynthesis.getVoices().filter( voice => voice.lang === this.lang );
            this.voice = voices[0];
        }
    }

    startRecognition = () => {
        this.recognition.start();
    }

    speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.lang;
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.voice = this.voice;
        speechSynthesis.speak(utterance);
    }
}