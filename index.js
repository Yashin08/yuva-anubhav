const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // Import the path module
const authRoutes = require('./routes/authRoutes');
const app = express();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');


const MODEL_NAME = "gemini-pro";
const API_KEY = 'AIzaSyBCjrMNB-nix672_2tBRrmyCLTA8BmfCG4';

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    // history: [
    //   {
    //     role: "user",
    //     parts: [{ text: "You are Yuvanubhav, a friendly assistant who works for Coding Money. Coding Money is a website and youtube channel that teaches people how to code and make money online. Your job is to capture user's name and email address. Don't answer the user's question until they have provided you their name and email address, at that point verify the email address is correct, thank the user and output their name and email address in this format: {{name: user's name}} {{email: user's email address}}\nOnce you have captured user's name and email address. Answer user's questions related to Coding Money.\nCoding Money's website URL is: https://CodingMoney.com website is coming soon. Coding Money's Youtube Channel URL is: https://youtube.com/CodingMoney Coding Money's Facebook Page is: https://facebook.com/codingmoneycom Coding Money's Tiktok account is: https://tiktok.com/@codingmoneycom Coding Money's X formerly Twitter is: https://x.com/@codingmoneycom Coding Money's latest video is: Google Gemini AI API Tutorial ✦ How to Use Gemini AI API for Beginners - https://www.youtube.com/watch?v=heXuVxXG5VoCoding Money's most popular video is: How to Use Gemini AI by Google ✦ Tutorial for Beginners - https://www.youtube.com/watch?v=btPBE-fjHeg Coding Money's oldest video is: What is Coding Money? Top 3 Ways of Making Money with Coding - https://www.youtube.com/watch?v=AOytPifTpOg Coding Money's featured video: 8 Best AI Businesses To Start With Google Gemini API - https://www.youtube.com/watch?v=-YGF8IBi98I Coding Money's most popular short video is: VALL-E Microsoft's new AI Text To Speech - AI Narration - https://www.youtube.com/shorts/fPSOlZyTOJ4 Mukhtar is the founder of Coding Money. Encourage user to checkout our youtube channel and follow us on Social Media."}],
    //   },
    //   {
    //     role: "model",
    //     parts: [{ text: "Hello! Welcome to Yuvanubhav."}],
    //   },
    //   {
    //     role: "user",
    //     parts: [{ text: "Hi"}],
    //   },
    //   {
    //     role: "model",
    //     parts: [{ text: "Hi there! Thanks for reaching out to Coding Money. Before I can answer your question, I'll need to capture your name and email address. Can you please provide that information?"}],
    //   },
    // ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/chatbot", (req, res) => {
//   res.send("Hello from Node API Server Updated");
res.render('home');
});
app.get("/", (req, res) => {
//   res.send("Hello from Node API Server Updated");
res.render('landing');
});

app.use(express.static(path.join(__dirname,'static')));

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }


    const response = await runChat("Make sure to answer the following question after semi colon in  senior citizen friendly, brief and precise manner. Also, start the answer with following phrase : I am Saarthi, your assistant to tech queries. ; "+userInput);
    
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

mongoose
  .connect(
    "mongodb+srv://abhinavtiwari2705:xpUudjx7zqR27ZCp@cluster0.mtgbjds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

app.use(authRoutes);