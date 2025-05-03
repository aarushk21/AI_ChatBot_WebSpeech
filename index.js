const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const dialogflow = require('@google-cloud/dialogflow');

// Path to your Dialogflow service account key file
const serviceAccountPath = './credentials/service-account-key.json';

// Create a new session client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: serviceAccountPath
});

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('chat message', async (text) => {
    console.log('Received message:', text);
    try {
      // The path to identify the agent that owns the created intent
      const projectId = 'ai-chatbot-423618'; // Your Dialogflow project ID
      const sessionId = 'tabby-cat';
      const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

      console.log('Sending request to Dialogflow...');

      // The text query request
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: text,
            languageCode: 'en-US',
          },
        },
        queryParams: {
          sentimentAnalysis: true,
        }
      };

      // Send request and log result
      const [response] = await sessionClient.detectIntent(request);
      const result = response.queryResult;
      console.log('Dialogflow response:', result);
      
      if (result.intent) {
        console.log('Intent detected:', result.intent.displayName);
        let responseText = result.fulfillmentText;
        
        // Add sentiment analysis if available
        if (result.sentimentAnalysisResult) {
          const sentiment = result.sentimentAnalysisResult.sentiment;
          console.log('Sentiment score:', sentiment.score);
          console.log('Sentiment magnitude:', sentiment.magnitude);
        }

        // Check if we need to follow up
        if (result.allRequiredParamsPresent) {
          socket.emit('bot reply', responseText);
        } else {
          // Handle missing parameters
          const missingParams = result.parameters.fields;
          console.log('Missing parameters:', missingParams);
          socket.emit('bot reply', responseText || 'Could you please provide more information?');
        }
      } else {
        console.log('No intent detected');
        socket.emit('bot reply', 'I\'m not sure I understand. Could you rephrase that?');
      }
    } catch (error) {
      console.error('Dialogflow error:', error);
      socket.emit('bot reply', 'I\'m having trouble processing your request. Could you try again?');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
