document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded. Initializing Murf TTS interaction...');

    const actionButton = document.getElementById('action-button');
    const messageElement = document.getElementById('main-message');
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const audioPlayer = document.getElementById('audio-player');

    if (actionButton && messageElement && textInput && voiceSelect && audioPlayer) {
        actionButton.addEventListener('click', async () => {
            const userText = textInput.value.trim();
            const selectedVoice = voiceSelect.value;

            if (!userText) {
                messageElement.textContent = "Please enter some text before proceeding.";
                return;
            }

            messageElement.textContent = "Generating audio... Please wait.";

            try {
                const response = await fetch("http://127.0.0.1:8000/tts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text: userText,
                        voice_id: selectedVoice
                    })
                });

                const data = await response.json();

                if (data.audio_url) {
                    audioPlayer.src = data.audio_url;
                    audioPlayer.style.display = "block";
                    messageElement.textContent = "Audio generated successfully. You may now play the file.";
                } else {
                    messageElement.textContent = "Failed to generate audio. Please check the backend or API key.";
                }
            } catch (error) {
                console.error("Error during API request:", error);
                messageElement.textContent = "An error occurred while generating the audio.";
            }
        });
    } else {
        console.error('Error: Missing one or more required DOM elements (action-button, text-input, voice-select, main-message, audio-player).');
    }
});
