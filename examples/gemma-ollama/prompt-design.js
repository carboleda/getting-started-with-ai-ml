const accounts = {
  C2163: "Scotiabank 2163",
  C1408: "Davivienda 1408",
  AFC: "AFC",
};
const baseShots = (inputAccount, outputAccount) => `
- Input: Pago recibo de gas por 31954, ${inputAccount}
  Output: Description: Pago recibo de gas, Amount: 31954, Type: Expense, Category: Servicios, Account: ${outputAccount}
- Input: Ingreso por salario de 2000000, ${inputAccount}
  Output: Description: Ingreso por salario, Amount: 2000000, Type: Income, Category: Salario, Account: ${outputAccount}
- Input: Pago de administración Masari por 301000, ${inputAccount}
  Output: Description: Pago de administración Masari, Amount: 301000, Type: Expense, Category: Masari, Account: ${outputAccount}
- Input: Pago de cuota Masari por 1600000, ${inputAccount}
  Output: Description: Pago de hipoteca Masari, Amount: 1600000, Type: Expense, Category: Masari, Account: ${outputAccount}
- Input: Retiro en cajero por 200000, ${inputAccount}
  Output: Description: Retiro en cajero, Amount: 200000, Type: Expense, Category: Cajero, Account: ${outputAccount}
- Input: Compra de mercado por 700000, ${inputAccount}
  Output: Description: Compra de mercado, Amount: 700000, Type: Expense, Category: Mercado, Account: ${outputAccount}
- Input: Gasolina del carro por 150000, ${inputAccount}
  Output: Description: Gasolina del carro, Amount: 150000, Type: Expense, Category: Vehiculo, Account: ${outputAccount}
- Input: SOAT del carro por 450000, ${inputAccount}
  Output: Description: SOAT del carro, Amount: 450000, Type: Expense, Category: Vehiculo, Account: ${outputAccount}
- Input: Pago de internet por 140600, ${inputAccount}
  Output: Description: Pago de internet, Amount: 140600, Type: Expense, Category: Servicios, Account: ${outputAccount}
- Input: Intereses cuenta de ahorro por 3000, ${inputAccount}
  Output: Description: Intereses cuenta de ahorro, Amount: 3000, Type: Income, Category: Ahorros, Account: ${outputAccount}
- Input: Salida familiar a pasear por 300000, ${inputAccount}
  Output: Description: Salida familiar a pasear, Amount: 300000, Type: Expense, Category: Entretenimiento, Account: ${outputAccount}
- Input: Ingreso por arriendo por 1000000, ${inputAccount}
  Output: Description: Ingreso por arriendo, Amount: 1000000, Type: Income, Category: Arriendo, Account: ${outputAccount}
- Input: Pago de medicina prepagada por 900000, ${inputAccount}
  Output: Description: Pago de medicina prepagada, Amount: 900000, Type: Expense, Category: Salud, Account: ${outputAccount}
- Input: Compra de ropa por 200000, ${inputAccount}
  Output: Description: Compra de ropa, Amount: 200000, Type: Expense, Category: Ropa, Account: ${outputAccount}
- Input: Compra de gotas oftálmicas por 50000, ${inputAccount}
  Output: Description: Compra de gotas oftálmicas, Amount: 50000, Type: Expense, Category: Salud, Account: ${outputAccount}
- Input: Costos TC 2900, ${inputAccount}
  Output: Description: Costos TC, Amount: 2900, Type: Expense, Category: Costos Scotiabank, Account: ${outputAccount}
- Input: Compra de teclado por 100000, ${inputAccount}
  Output: Description: Compra de teclado, Amount: 100000, Type: Expense, Category: Tecnologia, Account: ${outputAccount}
- Input: Alimento de Zeus por 224000, ${inputAccount}
  Output: Description: Alimento de Zeus, Amount: 2240000, Type: Expense, Category: Mascota, Account: ${outputAccount}
- Input: Devolución préstamo por 100000, ${inputAccount}
  Output: Description: Devolución préstamo, Amount: 100000, Type: Income, Category: Préstamo, Account: ${outputAccount}`;

const promptDesign = `
You will be provided with information about incomes and expenses. From each input extract: Description, Amount, Type (Income/Expense), Category and Account (${Object.values(
  accounts
).join("/")}). The following are examples of inputs and outputs:

The following are examples of inputs and outputs:
${Object.entries(accounts)
  .map(([key, value]) => baseShots(key, value))
  .join("")}

Constrains: Only respond to the last question asked. Always include in the response the fields Description, Amount, Type, Category and Account. Format the reponse in JSON.
`;

console.log(promptDesign);
