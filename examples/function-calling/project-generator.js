import { GoogleGenerativeAI } from "@google/generative-ai";
import { createFunctionCaller } from "./helper.js";
import { Calculator } from "./tools/calculator.js";
import { NodeFileSystem } from "./tools/node-file-system.js";

export const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const calculator = new Calculator();
const nfs = new NodeFileSystem("local-files/ai-project");

const tools = [nfs.metadata];
const systemInstruction = `You are an expert Javascript developer, you can write code and create files as you need.
  Do not respond with the whole code, instead use the tools to create each file.`;

const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash-latest", tools },
  { apiVersion: "v1beta" }
);

const prompt = {
  role: "user",
  parts: [
    {
      // text: `Don't do any calculation your self, instead delegate them to the tools.
      // Add 3 + 3.5 and then multiply the result by 2.
      // Answer: 3 + 3.5 = 6.5, 6.6 * 2 = 13, result 13
      // Multiply 2 * 5 and then add 2 the result.
      // Answer: `,
      // text: "3 * (2 + 2)",

      text: `${systemInstruction}
      Create a sample expressjs application using the MVC pattern.
      Then create an expressjs login route that renders a form to login a user agains mongodb`,
    },
    //
  ],
};

const caller = createFunctionCaller(model, nfs);
caller(prompt).then(console.log);
