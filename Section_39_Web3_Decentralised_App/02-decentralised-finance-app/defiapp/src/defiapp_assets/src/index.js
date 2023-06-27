import { defiapp } from '../../declarations/defiapp';

async function updateBalance() {
  const currentAmount = await defiapp.checkBalance();
  document.querySelector('#value').innerText = currentAmount.toFixed(2);
};

window.addEventListener('load', async () => {
  await updateBalance();
});

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = event.target.querySelector('#submit-btn');
  submitButton.setAttribute("disabled", true);

  const inpAmount = parseFloat(document.querySelector('#input-amount').value);
  if (inpAmount) await defiapp.deposit(inpAmount);

  const outAmount = parseFloat(document.querySelector('#output-amount').value);
  if (outAmount) await defiapp.withdraw(outAmount);

  await defiapp.compound();

  await updateBalance();

  document.querySelector('#input-amount').value = '0';
  document.querySelector('#output-amount').value = '0';
  submitButton.removeAttribute("disabled");
})