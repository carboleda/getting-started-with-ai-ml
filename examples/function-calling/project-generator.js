import { FunctionCallingMode, GoogleGenerativeAI } from "@google/generative-ai";
import { createFunctionCaller } from "./helper.js";
import { Calculator } from "./tools/calculator.js";
import { NodeFileSystem } from "./tools/node-file-system.js";

export const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const calculator = new Calculator();
const nfs = new NodeFileSystem("local-files/ai-project");

const tools = [nfs.metadata, calculator.metadata];
const systemInstruction = `You are an expert Javascript developer, you can create files and write code as you need.
  Do not respond with the whole code, instead use the tools to create each file.`;

const model = genAI.getGenerativeModel(
  {
    model: "gemini-1.5-flash-latest",
    tools,
    generationConfig: {
      temperature: 0,
    },
    // systemInstruction: {
    //   role: "system",
    //   parts: [
    //     {
    //       text: systemInstruction,
    //     },
    //   ],
    // },
    // toolConfig: {
    //   functionCallingConfig: {
    //     mode: FunctionCallingMode.ANY,
    //     allowedFunctionNames: ["createFile"],
    //   },
    // },
  },
  { apiVersion: "v1beta" }
);

const prompt = {
  role: "user",
  parts: [
    // {
    //   text: `${systemInstruction}.
    //   Create a sample expressjs application using the MVC pattern. The application should include:
    //   1. A GET /login route that renders a form with user and password fields
    //   2. A POST "/login" route to authenticate the user agains mongodb
    //   3. A GET /dashboard route to redirect the user after successful authentication`,
    // },
    {
      text: `How much is 35 + 34?`,
    },
  ],
};

const caller = createFunctionCaller(model, { ...nfs, ...calculator });
caller(prompt).then(console.log);
