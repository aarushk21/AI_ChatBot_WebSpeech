# AI Chatbot with Web Speech API and Dialogflow

A web-based AI chatbot that uses the Web Speech API for voice recognition and Dialogflow for natural language processing. This project allows users to interact with the chatbot through voice commands and text input.

## Features

- Voice recognition using Web Speech API
- Natural language processing with Dialogflow
- Real-time chat interface
- Responsive design
- Sentiment analysis
- Voice-to-text and text-to-voice capabilities

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Cloud account with Dialogflow API enabled
- Dialogflow service account key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/aarushk21/AI_ChatBot_WebSpeech.git
cd AI_ChatBot_WebSpeech
```

2. Install dependencies:
```bash
npm install
```

3. Set up Dialogflow:
   - Create a project in Google Cloud Console
   - Enable the Dialogflow API
   - Create a service account and download the key
   - Place the service account key in the `credentials` folder as `service-account-key.json`

4. Configure Dialogflow intents:
   - Go to the Dialogflow Console
   - Create a new agent or use an existing one
   - Set up the following intents:
     - Default Welcome Intent
     - Default Fallback Intent
     - Help Intent
     - Weather Intent
     - Time Intent
     - Goodbye Intent

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Interact with the chatbot:
   - Click the "Start Talking" button to begin voice recognition
   - Speak into your microphone
   - The chatbot will process your input and respond
   - Click "Stop Talking" to end the voice recognition

## Project Structure

```
AI_ChatBot_WebSpeech/
├── credentials/           # Dialogflow service account key
├── public/               # Static files
│   ├── css/             # Stylesheets
│   └── js/              # Client-side JavaScript
├── views/               # HTML templates
├── index.js            # Server application
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Technologies Used

- Node.js
- Express.js
- Socket.IO
- Web Speech API
- Dialogflow
- HTML5
- CSS3
- JavaScript (ES6+)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Web Speech API documentation
- Dialogflow documentation
- Socket.IO documentation 