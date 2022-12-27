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
  switch(operator) {
    case '+':
      return add(a,b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return 1;
  }
}

const state = {
  displayedValue: '0',
  pendingOperation: {
    operandA: 0,
    operandB: 0,
    operator: '',
  },
  updateDisplay: function () {
    const display = document.querySelector('.display');
    display.textContent = state.displayedValue;
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
  }
}

buttonListeners();
