import ollama from "ollama";

const accounts = {
  C2163: "Cuenta banco 1",
  C1408: "Cuenta banco 2",
  AFC: "Cuenta banco 3",
};

const response = await ollama.generate({
  model: "expenses-extractor:gemma2b",
  prompt: `Vuelos a Madrid para luna de miel por 2500000, C2163`,
  stream: false,
});

// console.log(response);

const json = JSON.parse(response.response);
const transaction = {
  ...json,
  account: accounts[json.account],
  createAt: new Date(),
};

console.log(transaction);
