import { FunctionDeclarationSchemaType } from "@google/generative-ai";

export class Calculator {
  metadata = {
    functionDeclarations: [
      {
        name: "add",
        description: "Add two numbers and return the result",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            a: { type: FunctionDeclarationSchemaType.NUMBER },
            b: { type: FunctionDeclarationSchemaType.NUMBER },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "multiply",
        description: "Multiply two numbers and return the result",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            a: { type: FunctionDeclarationSchemaType.NUMBER },
            b: { type: FunctionDeclarationSchemaType.NUMBER },
          },
          required: ["a", "b"],
        },
      },
    ],
  };

  add = ({ a, b }) => {
    return a + b;
  };

  sub = ({ a, b }) => {
    return a - b;
  };

  multiply = ({ a, b }) => {
    return a * b;
  };

  div = ({ a, b }) => {
    return a / b;
  };
}
