let firstNum = '';
let secondNum = '';
let currentOperator = null;
let resultDisplayed = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nice try 😉";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

function clearAll() {
  firstNum = '';
  secondNum = '';
  currentOperator = null;
  resultDisplayed = false;
  updateDisplay('0');
}

function updateDisplay(value) {
  display.textContent = value.toString().slice(0, 12);
}

function handleInput(input) {
  if (input === '.' && display.textContent.includes('.')) return;

  if (resultDisplayed) {
    display.textContent = input === '.' ? '0.' : input;
    resultDisplayed = false;
  } else {
    display.textContent =
      display.textContent === '0' && input !== '.' ? input : display.textContent + input;
  }
}

function handleOperator(operator) {
  if (currentOperator && !resultDisplayed) {
    secondNum = display.textContent;
    let result = operate(currentOperator, firstNum, secondNum);
    updateDisplay(result);
    firstNum = result;
  } else {
    firstNum = display.textContent;
  }
  currentOperator = operator;
  resultDisplayed = true;
}

function handleEquals() {
  if (!currentOperator || resultDisplayed) return;
  secondNum = display.textContent;
  let result = operate(currentOperator, firstNum, secondNum);
  updateDisplay(result);
  firstNum = result;
  currentOperator = null;
  resultDisplayed = true;
}

function handleBackspace() {
  if (resultDisplayed) return;
  display.textContent =
    display.textContent.length > 1
      ? display.textContent.slice(0, -1)
      : '0';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (!isNaN(action) || action === '.') {
      handleInput(action);
    } else if (['+', '-', '*', '/'].includes(action)) {
      handleOperator(action);
    } else if (action === '=') {
      handleEquals();
    } else if (action === 'clear') {
      clearAll();
    } else if (action === 'backspace') {
      handleBackspace();
    }
  });
});

// Keyboard Support
window.addEventListener('keydown', (e) => {
  if (!isNaN(e.key) || e.key === '.') {
    handleInput(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === 'Enter') {
    handleEquals();
  } else if (e.key === 'Backspace') {
    handleBackspace();
  } else if (e.key.toLowerCase() === 'c') {
    clearAll();
  }
});
