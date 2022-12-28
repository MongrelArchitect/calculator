function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  let result;

  switch(operator) {
    case '+':
      result = add(a,b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    default:
      return 1;
  }

  return +result.toPrecision(10)
}

const state = {
  displayedValue: '0',
  pendingOperation: {
    operandA: 0,
    operandB: 0,
    operator: '',
  },
  equalsPressed: false,
  updateDisplay: function () {
    const display = document.querySelector('.display');
    display.textContent = state.displayedValue;
  },
  clear: function () {
    this.displayedValue = '0';
    this.pendingOperation.operandA = 0;
    this.pendingOperation.operandB = 0;
    this.pendingOperation.operator = '';
  },
};

function buttonListeners() {
  const buttons = document.querySelectorAll('.button');
  for (let i = 0; i < buttons.length; i += 1) {
    // Numbers will update the display accordingly
    if (buttons[i].classList.contains('number')) {
      buttons[i].addEventListener('click', () => {
        // Limit by about how many numbers can fit on the display
        if (state.displayedValue.length < 13) {
          // Reset the displayed value after equals or it concatenates
          if (state.equalsPressed) {
            state.equalsPressed = false;
            state.displayedValue = '0';
          }
          // Get rid of the leading 0 if there's no decimal
          if (state.displayedValue[0] === '0' &&
              !state.displayedValue.includes('.')) {
            state.displayedValue = '';
          }
          state.displayedValue += buttons[i].textContent;
          state.updateDisplay();
        }
      });
    }
    // Handles decimal
    if (buttons[i].classList.contains('decimal')) {
      buttons[i].addEventListener('click', () => {
        if (!state.displayedValue.includes('.')) {
          if (state.equalsPressed) {
            state.equalsPressed = false;
            state.displayedValue = '0';
            state.updateDisplay();
          }
          state.displayedValue += '.';
          state.updateDisplay();
        }
      });
    }
    // Clear the calculator
    if (buttons[i].classList.contains('clear')) {
      buttons[i].addEventListener('click', () => {
        state.clear();
        state.updateDisplay();
      });
    }
    // Add operator to or complete pending operation
    if (buttons[i].classList.contains('operator')) {
      buttons[i].addEventListener('click', () => {
        // Don't have a pending operation
        if (state.pendingOperation.operator === '') {
          state.pendingOperation.operandA = +state.displayedValue;
          state.pendingOperation.operator = buttons[i].textContent;
          state.displayedValue = '0';
        } else {
          // We do have one pending
          state.pendingOperation.operandB = +state.displayedValue;
          const operationResult = operate(
            state.pendingOperation.operator,
            state.pendingOperation.operandA,
            state.pendingOperation.operandB
          )
          // Move result for next operation & update display
          state.pendingOperation.operandA = operationResult;
          state.pendingOperation.operandB = 0;
          state.pendingOperation.operator = buttons[i].textContent;
          state.displayedValue = operationResult.toString();
          state.updateDisplay();
          state.displayedValue = '0';
        }
      });
    }
    // Complete any pending operations, otherwise do nothing
    if (buttons[i].classList.contains('equals')) {
      buttons[i].addEventListener('click', () => {
        if (state.pendingOperation.operator !== '') {
          // We do have one pending
          state.pendingOperation.operandB = +state.displayedValue;
          const operationResult = operate(
            state.pendingOperation.operator,
            state.pendingOperation.operandA,
            state.pendingOperation.operandB
          )
          // Move result for next operation & update display
          state.pendingOperation.operandA = operationResult;
          state.pendingOperation.operandB = 0;
          state.pendingOperation.operator = '';
          state.displayedValue = operationResult.toString();
          state.equalsPressed = true;
          state.updateDisplay();
        }
      });
    }
    // Change the sign
    if (buttons[i].classList.contains('sign')) {
      buttons[i].addEventListener('click', () => {
        if (state.displayedValue !== '0') {
          if (state.displayedValue[0] !== '-') {
            state.displayedValue = `-${state.displayedValue}`;
          } else {
            state.displayedValue = state.displayedValue.substring(1);
          }
        }
        state.updateDisplay();
      });
    }
  }
}

buttonListeners();
