export class Prompt {
  #text = "";
  #parts = [];

  constructor(text, parts = []) {
    this.#text = text;
    this.#parts = parts;
  }

  async *send(model) {
    const result = await model.generateContentStream([
      this.#text,
      ...this.#parts,
    ]);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      yield chunkText;
    }
  }

  toString(includeParts = false) {
    if (includeParts) {
      return JSON.stringify(
        {
          text: this.#text,
          parts: this.#parts,
        },
        (key, value) => {
          if (key === "data") {
            return "<base64>";
          }

          return value;
        },
        2
      );
    }

    return this.#text;
  }
}
