// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();
// const PORT = 5000;

// // Middleware to handle CORS and JSON request bodies
// app.use(cors());
// app.use(express.json()); // This middleware is necessary to parse incoming JSON

// // POST endpoint to interact with Gemini API
// app.post('/api/gemini', async (req, res) => {
//   const { prompt } = req.body; // Extract prompt from the request body

//   // Log the incoming request body for debugging purposes
//   console.log('Received request body:', req.body);

//   // Check if the prompt is missing and return an error if so
//   if (!prompt) {
//     return res.status(400).json({ error: 'Missing prompt in the request body' });
//   }

//   try {
//     // Fetch data from Gemini API
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: 'user',
//               parts: [{ text: prompt }],
//             },
//           ],
//         }),
//       }
//     );

//     // Check if the response from Gemini is successful
//     if (!response.ok) {
//       console.error('Error from Gemini API:', response.statusText);
//       return res.status(500).json({ error: 'Gemini API request failed' });
//     }

//     // Parse the response from Gemini API
//     const data = await response.json();

//     // Extract content from the response or return a default message
//     const content =
//       data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';

//     // Send the response back to the client
//     res.json({ text: content });
//   } catch (error) {
//     // Catch any errors during the API request and log them
//     console.error('Gemini API Error:', error);
//     res.status(500).json({ error: 'Gemini API request failed due to an error' });
//   }
// });

// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//   console.log(`🟢 Gemini backend running at http://localhost:${PORT}`);
// });

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { GoogleGenAI } from '@google/genai';

// dotenv.config();

// const app = express();
// const PORT = 5000;

// // Initialize GoogleGenAI client
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// app.use(cors());
// app.use(express.json());
// app.post('/api/gemini', async (req, res) => {
//     const { prompt } = req.body;
  
//     if (!prompt) {
//       return res.status(400).json({ error: 'Missing prompt in the request body' });
//     }
  
//     try {
//       const response = await ai.models.generateContent({
//         model: 'gemini-2.0-flash',
//         contents: [
//           {
//             role: 'user',
//             parts: [{ text: prompt }],
//           },
//         ],
//       });
  
//       if (response.candidates && response.candidates.length > 0) {
//         const generatedText = response.candidates[0].content; // Adjust based on actual structure
//         res.json({ text: generatedText });
        
//       } else {
//         res.status(500).json({ error: 'No candidates found in the response' });
//       }
//     } catch (error) {
//       console.error('Gemini API Error:', error);
//       res.status(500).json({ error: 'Gemini API request failed' });
//     }
//   });
// app.listen(PORT, () => {
//   console.log(`🟢 Gemini backend running at http://localhost:${PORT}`);
// });




// // server.js
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { GoogleGenAI } from '@google/genai';

// dotenv.config();

// const app = express();
// const PORT = 5000;

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// app.use(cors());
// app.use(express.json());

// app.post('/api/gemini', async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   try {
//     const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const response = result.response;
//     const text = await response.text();

//     res.json({ text });
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     res.status(500).json({ error: "Gemini API request failed" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🟢 Gemini backend running at http://localhost:${PORT}`);
// });




// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { GoogleGenAI } from '@google/genai';

// dotenv.config();

// const app = express();
// const PORT = 5000;

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// app.use(cors());
// app.use(express.json());

// async function generateWithRetry(prompt, retries = 3, delay = 2000) {
//   for (let i = 0; i <= retries; i++) {
//     try {
//       const response = await ai.models.generateContent({
//         model: 'gemini-2.0-flash',
//         contents: [
//           {
//             role: 'user',
//             parts: [{ text: prompt }],
//           },
//         ],
//       });
//       return response;
//     } catch (error) {
//       const isRetryable = error.message?.includes('503') || error.message?.includes('UNAVAILABLE');
//       if (i < retries && isRetryable) {
//         console.warn(`Retry ${i + 1}/${retries}: Gemini model overloaded, retrying after ${delay}ms...`);
//         await new Promise((resolve) => setTimeout(resolve, delay * (i + 1))); // exponential backoff
//       } else {
//         throw error;
//       }
//     }
//   }
// }

// app.post('/api/gemini', async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: 'Missing prompt in the request body' });
//   }

//   try {
//     const response = await generateWithRetry(prompt);

//     if (response.candidates && response.candidates.length > 0) {
//       const generatedText = response.candidates[0].content;
//       res.json({ text: generatedText });
//     } else {
//       res.status(500).json({ error: 'No candidates found in the response' });
//     }
//   } catch (error) {
//     console.error('Gemini API Error:', error);
//     res.status(503).json({
//       error: 'Gemini API is temporarily unavailable. Please try again shortly.',
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🟢 Gemini backend running at http://localhost:${PORT}`);
// });



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());

async function generateWithRetry(prompt, retries = 3, delay = 2000) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      });
      return response;
    } catch (error) {
      const isRetryable = error.message?.includes('503') || error.message?.includes('UNAVAILABLE');
      if (i < retries && isRetryable) {
        console.warn(`Retry ${i + 1}/${retries}: Gemini model overloaded, retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1))); // exponential backoff
      } else {
        throw error;
      }
    }
  }
}

app.post('/api/gemini', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages array in the request body' });
  }

  try {
    const contents = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents
    });

    if (response.candidates && response.candidates.length > 0) {
      const generatedText = response.candidates[0].content?.parts?.[0]?.text || response.candidates[0].content;
      res.json({ text: generatedText });
    } else {
      res.status(500).json({ error: 'No candidates found in the response' });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(503).json({
      error: 'Gemini API is temporarily unavailable. Please try again shortly.',
    });
  }
});


app.listen(PORT, () => {
  console.log(`🟢 Gemini backend running at http://localhost:${PORT}`);
});
