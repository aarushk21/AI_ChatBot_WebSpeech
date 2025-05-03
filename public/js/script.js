const socket = io();
const startBtn = document.getElementById('start-btn');
const chatMessages = document.getElementById('chat-messages');

// Check if browser supports Web Speech API
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Your browser does not support the Web Speech API. Please try Chrome or Edge.');
    startBtn.disabled = true;
}

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

// Initialize speech synthesis
const synth = window.speechSynthesis;

// Add message to chat
function addMessage(text, isUser = false) {
    console.log('Adding message:', text, 'isUser:', isUser);
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Speak text
function synthVoice(text) {
    console.log('Speaking:', text);
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

// Handle speech recognition
startBtn.addEventListener('click', () => {
    console.log('Start button clicked');
    if (startBtn.classList.contains('recording')) {
        recognition.stop();
        startBtn.classList.remove('recording');
        startBtn.textContent = 'Start Talking';
    } else {
        recognition.start();
        startBtn.classList.add('recording');
        startBtn.textContent = 'Stop Talking';
    }
});

recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    console.log('Speech recognized:', text);
    console.log('Confidence: ' + event.results[0][0].confidence);
    addMessage(text, true);
    socket.emit('chat message', text);
};

recognition.onend = () => {
    console.log('Speech recognition ended');
    if (startBtn.classList.contains('recording')) {
        recognition.start();
    }
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    startBtn.classList.remove('recording');
    startBtn.textContent = 'Start Talking';
};

// Handle bot replies
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('bot reply', (text) => {
    console.log('Received bot reply:', text);
    addMessage(text);
    synthVoice(text);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
}); 