import 'css/index.scss';

let calculator = {
  expression: [],
  result: '',
  numbers: ['0','1','2','3','4','5','6','7','8','9'],
  symbols: ['+','-','/','*','.'],
  input(char) {
    const lastChar = this.expression[this.expression.length - 1];
    if (this.expression.length > 0) {
      if (this.symbols.indexOf(lastChar) >= 0 && this.symbols.indexOf(char) >= 0) {
        this.expression.pop();
        this.expression.push(char);
      } else {
        this.expression.push(char);
      }
    } else {
      if (this.numbers.indexOf(char) >= 0) {
        this.expression.push(char);
      }
    }

    this.updateResult();
  },
  evaluate() {
    this.result = eval(this.expression.join(''));
  },
  equals() {
    this.evaluate();
    this.expression = [];
  },
  updateResult() {
    const doesExpressionContainSymbol = this.expression.some(char => this.symbols.indexOf(char) >= 0);
    const lastChar = this.expression[this.expression.length - 1];
    if (doesExpressionContainSymbol && this.numbers.indexOf(lastChar) >= 0) {
      this.evaluate();
    }
  },
  clear() {
    this.expression = [];
    this.result = '';
  },
  delete() {
    if (this.expression.length > 0) {
      this.expression.pop();
    }
  }
}

const handlers = {
  input(char) {
    calculator.input(char);
    this.displayExpression();
    this.displayResult();
  },
  delete() {
    calculator.delete();
    this.displayExpression();
    this.displayResult();
  },
  clear() {
    // debugger;
    calculator.clear();
    this.displayExpression();
    this.displayResult();
  },
  equals() {
    calculator.equals();
    this.displayExpression();
    this.displayResult();
  },
  displayExpression() {
    const expression = document.querySelector('.expression');
    expression.innerText = calculator.expression.join('');
  },
  displayResult() {
    const result = document.querySelector('.result');
    result.innerText = calculator.result;
  },
  setEventListeners() {
    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', (event) => {
      if (event.target.className === 'button') {
        const button = event.target.innerText;
        if (button !== 'DEL' && button !== '=') {
          this.input(button);
        } else if (button === 'DEL') {
          this.delete();
        } else if (button === '=') {
          this.equals();
        } else {
          console.log('error - button not handled')
        }
      }
    });

    let delay;
    const longpress = 500;
    const del = document.getElementById('del');
    del.addEventListener('mousedown', (event) => {
      delay = setTimeout(this.clear.bind(this), longpress);
    }, true);
    del.addEventListener('mouseup', (event) => clearTimeout(delay));
    del.addEventListener('mouseout', (event) => clearTimeout(delay));
  }
}

window.calculator = calculator;
window.handlers = handlers;
handlers.setEventListeners();
