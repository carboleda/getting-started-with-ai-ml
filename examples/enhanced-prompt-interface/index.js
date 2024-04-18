import { GoogleGenerativeAI } from "@google/generative-ai";
import { p } from "./interface.js";

// Model configuration
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-pro-vision",
  generationConfig: {
    temperature: 0,
    maxOutputTokens: 1024,
    topK: 40,
    topP: 0.95,
  },
});

// Prompt definition
const timetable = "enhanced-prompt-interface/images/timetable.png";
const backpack = "enhanced-prompt-interface/images/Cymbal Direct backpack.png";
const prompt =
  await p`Describe everything you see in ${backpack} image and turn ${timetable} image into a markdown table`;
console.log("Prompt", prompt.toString());

// Send propmt to model and show result
console.log("Sending prompt to model...");
const result = prompt.send(model);

for await (const chunk of result) {
  process.stdout.write(chunk);
}
