/**
 * ============================================================================
 * CALCULATOR ENGINE (Object-Oriented Structure)
 * ============================================================================
 */

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clearActiveOperators() {
    document.querySelectorAll('.btn-operator').forEach(btn => {
      btn.classList.remove('is-active');
    });
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
    this.clearActiveOperators();
  }

  delete() {
    if (this.currentOperand === '0' || this.currentOperand === 'Error') return;

    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    this.clearActiveOperators();

    if (this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }

    if (number === '.' && this.currentOperand.includes('.')) return;

    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
      return;
    }

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  applyPercent() {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;
    this.currentOperand = (current / 100).toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === 'Error') return;

    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    this.clearActiveOperators();
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '−':
      case '-':
        computation = prev - current;
        break;
      case '×':
      case '*':
        computation = prev * current;
        break;
      case '÷':
      case '/':
        if (current === 0) {
          this.currentOperand = 'Error';
          this.previousOperand = '';
          this.operation = undefined;
          this.shouldResetScreen = true;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    computation = Math.round(computation * 1e12) / 1e12;

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.shouldResetScreen = true;
  }

  formatDisplayNumber(number) {
    if (number === 'Error') return 'Error';
    if (!number) return '';

    const [integerPart, decimalPart] = number.toString().split('.');
    const integerDigits = parseFloat(integerPart);
    let integerDisplay = isNaN(integerDigits) 
      ? '' 
      : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

    return decimalPart != null ? `${integerDisplay}.${decimalPart}` : integerDisplay;
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.formatDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousOperandElement.innerText = 
        `${this.formatDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = '';
    }
  }
}

/* ============================================================================
 * DOM ELEMENT SELECTION & EVENT LISTENERS
 * ============================================================================ */

const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const actionButtons = document.querySelectorAll('[data-action]');

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.getAttribute('data-number'));
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.clearActiveOperators();
    button.classList.add('is-active');
    calculator.chooseOperation(button.getAttribute('data-operation'));
    calculator.updateDisplay();
  });
});

actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    if (action === 'all-clear') calculator.clear();
    if (action === 'delete') calculator.delete();
    if (action === 'percent') calculator.applyPercent();
    if (action === 'equals') calculator.compute();
    calculator.updateDisplay();
  });
});

window.addEventListener('keydown', event => {
  if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
    calculator.appendNumber(event.key);
  } else if (event.key === '+') {
    calculator.chooseOperation('+');
  } else if (event.key === '-') {
    calculator.chooseOperation('−');
  } else if (event.key === '*' || event.key === 'x') {
    calculator.chooseOperation('×');
  } else if (event.key === '/') {
    event.preventDefault();
    calculator.chooseOperation('÷');
  } else if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute();
  } else if (event.key === 'Backspace') {
    calculator.delete();
  } else if (event.key === 'Escape') {
    calculator.clear();
  }
  calculator.updateDisplay();
});

