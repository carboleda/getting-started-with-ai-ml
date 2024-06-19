import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { FunctionDeclarationSchemaType } from "@google/generative-ai";

export class NodeFileSystem {
  workspace;
  constructor(workspace) {
    this.workspace = workspace;
  }

  metadata = {
    functionDeclarations: [
      {
        name: "createFile",
        description:
          "Creates or replaces a file with the given filePath and content",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            filePath: { type: FunctionDeclarationSchemaType.NUMBER },
            content: { type: FunctionDeclarationSchemaType.NUMBER },
          },
          required: ["filePath", "content"],
        },
      },
    ],
  };

  resolve = (filePath) => {
    return path.resolve(process.cwd(), this.workspace, filePath);
  };

  createFile = ({ filePath, content }) => {
    console.log(`Creating file ${filePath}...`);
    const _filePath = this.resolve(filePath);
    this.createDirIfNeeded(_filePath);

    const filehandle = fs.openSync(_filePath, "w+");
    fs.writeFileSync(
      filehandle,
      content
        .replace(/\\n/g, os.EOL)
        .replace(/\\'/g, "'")
        .replace(/\\'\\"/g, "'")
    );

    return true;
  };

  createDirIfNeeded = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };
}

// const nfs = new NodeFileSystem("ai-project");
// nfs.createFile({
//   // filePath: "routes/a/b/home.js",
//   // content:
//   //   "const express = require(\\'express\\');\\nconst app = express();\\n\\napp.get(\\'/\\', (req, res) => {\\n  res.send(\\'Hello World!\\');\\n});\\n\\napp.listen(3000, () => {\\n  console.log(\\'Server listening on port 3000\\');\\n});",
//   content:
//     '<!DOCTYPE html>\\n<html lang=\\"en\\">\\n<head>\\n  <meta charset=\\"UTF-8\\">\\n  <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">\\n  <title>Login</title>\\n</head>\\n<body>\\n  <h1>Login</h1>\\n  <form action=\\"/login\\" method=\\"POST\\">\\n    <label for=\\"username\\">Username:</label>\\n    <input type=\\"text\\" id=\\"username\\" name=\\"username\\" required>\\n    <br><br>\\n    <label for=\\"password\\">Password:</label>\\n    <input type=\\"password\\" id=\\"password\\" name=\\"password\\" required>\\n    <br><br>\\n    <button type=\\"submit\\">Login</button>\\n  </form>\\n</body>\\n</html>\\n',
//   filePath: "./views/login.ejs",
// });
