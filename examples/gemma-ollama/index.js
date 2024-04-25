import ollama from "ollama";

const accounts = {
  C2163: "Cuenta banco 1",
  C1408: "Cuenta banco 2",
  AFC: "Cuenta banco 3",
};

const getPrompt = (text) => {
  return `Valid source and destination accounts are: C2163, C1408, AFC. Do not encode the accounts.
  ${text}`;
};

const response = await ollama.generate({
  model: "expenses-extractor:llama3",
  // prompt: getPrompt(`Vuelos a Madrid para luna de miel por 2500000, C2163`),
  // prompt: getPrompt("Transferencia pago TC de C1408 a C2163 por 1000000"),
  // prompt: getPrompt("Pay Masari administrative fee by 301000, C1408"),
  prompt: getPrompt("Ingresos por intereses 1200, AFC"),
  stream: false,
});

// console.log(response);

const json = JSON.parse(response.response);
const transaction = {
  ...json,
  sourceAccountO: json.sourceAccount && accounts[json.sourceAccount],
  destinationAccountO:
    json.destinationAccount && accounts[json.destinationAccount],
  createAt: new Date(),
};

console.log(transaction);
