export const createFunctionCaller = (model, functions) => {
  console.log("functions", functions);
  const generate = async (prompt) => {
    const result = await model.generateContent({
      contents: [prompt],
    });
    console.log("result", result);
    const response = result.response;
    // console.dir(response, { depth: null });

    if (response.candidates.length === 0) {
      throw new Error("No candidates");
    }

    const content = result.response.candidates[0].content;
    if (content.parts.length === 0) {
      throw new Error("No parts");
    }

    // const fc = content.parts[0].functionCall;
    const frs = callFunction(content.parts, functions);
    const text = content.parts.map(({ text }) => text).join("");

    if (frs.length && !text) {
      // const { name, args } = fc;
      // const fn = functions[name];
      // if (!fn) {
      //   throw new Error(`Unknown function "${name}"`);
      // }
      // const fr = {
      //   role: "function",
      //   parts: [
      //     {
      //       functionResponse: {
      //         name,
      //         response: {
      //           name,
      //           content: fn(args),
      //         },
      //       },
      //     },
      //   ],
      // };

      return generate([prompt, content, ...frs]);
    } else if (text) {
      return text;
    }
  };

  return generate;
};

function callFunction(parts, functions) {
  const fnCalls = parts.filter((part) => !!part.functionCall);

  return fnCalls.map((fc) => {
    const { name, args } = fc.functionCall;
    const fn = functions[name];
    if (!fn) {
      throw new Error(`Unknown function "${name}"`);
    }

    console.log(`Calling function ${name} with args`, args);

    return {
      role: "function",
      parts: [
        {
          functionResponse: {
            name,
            response: {
              name,
              content: fn(args),
            },
          },
        },
      ],
    };
  });
}
