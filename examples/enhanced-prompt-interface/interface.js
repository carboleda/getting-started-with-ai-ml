import fs from "node:fs/promises";
import path from "node:path";
import { Prompt } from "./prompt.js";

const handlers = [imageHandler, videoHandler];

// Converts local file information to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(filePath, mimeType) {
  const content = await fs.readFile(filePath);
  return {
    inlineData: {
      data: Buffer.from(content).toString("base64"),
      mimeType,
    },
  };
}

function imageHandler(exp) {
  if (/(.png|jpg|jpeg)$/.test(exp) > -1) {
    const fileName = path.basename(exp);
    const extName = path.extname(exp);

    return {
      part: fileToGenerativePart(exp, `image/${extName.replace(".", "")}`),
      name: fileName.replace(extName, ""),
    };
  }
}

function videoHandler(exp) {}

function proccessPart(exp) {
  for (const handler of handlers) {
    const result = handler(exp);
    if (result) {
      return result;
    }
  }
}

export async function p(strings, ...exps) {
  const parts = [];
  let promptText = "";

  for (let i = 0; i < strings.length; i++) {
    promptText += strings[i];

    if (i < exps.length) {
      const result = proccessPart(exps[i]);
      if (result) {
        parts.push(result.part);
        promptText += result.name;
      } else {
        promptText += exps[i];
      }
    }
  }

  return new Prompt(promptText, await Promise.all(parts));
}
