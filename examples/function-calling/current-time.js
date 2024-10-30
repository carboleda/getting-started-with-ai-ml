import {
  FunctionDeclarationSchemaType,
  GoogleGenerativeAI,
} from "@google/generative-ai";
export const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  function getCurrentTime({ timeZone }) {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", { timeZone });
    const time = now.toLocaleTimeString("en-US", { timeZone });
    return `${date} ${time}`;
  }

  const functions = {
    getCurrentTime,
  };

  const tools = [
    {
      functionDeclarations: [
        {
          name: "getCurrentTime",
          description: `Get the current time in a specific location`,
          parameters: {
            type: FunctionDeclarationSchemaType.OBJECT,
            properties: {
              timeZone: {
                type: FunctionDeclarationSchemaType.STRING,
                description:
                  "Timezone in IANA format. Example America/Bogotá, Europe/Berlin",
              },
            },
            required: ["timeZone"],
          },
        },
      ],
    },
  ];

  const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash-latest", tools },
    { apiVersion: "v1beta" }
  );

  const prompt = {
    role: "user",
    parts: [
      {
        text: "What time is it in Cali, Colombia?",
      },
    ],
  };

  const result = await model.generateContent({
    contents: [prompt],
  });
  const response = result.response;
  console.dir(response, { depth: null });

  if (response.candidates.length === 0) {
    throw new Error("No candidates");
  }

  const content = result.response.candidates[0].content;
  if (content.parts.length === 0) {
    throw new Error("No parts");
  }
  const fc = content.parts[0].functionCall;
  const text = content.parts.map(({ text }) => text).join("");
  if (fc) {
    console.log("fc", fc);
    const { name, args } = fc;
    const fn = functions[name];
    if (!fn) {
      throw new Error(`Unknown function "${name}"`);
    }
    const fr = {
      role: "function",
      parts: [
        {
          functionResponse: {
            name,
            response: {
              content: functions[name](args),
            },
          },
        },
      ],
    };
    const request2 = {
      contents: [prompt, content, fr],
    };
    const response2 = await model.generateContent(request2);
    console.log(response2.response.text());
  } else if (text) {
    console.log(text);
  }
}

run();
