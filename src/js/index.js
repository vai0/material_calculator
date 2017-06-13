import 'css/index.scss';
import 'material-components-web/dist/material-components-web.css';
import * as mdc from 'material-components-web/dist/material-components-web.js';

let calculator = {
  expression: [],
  result: '',
  numbers: ['0','1','2','3','4','5','6','7','8','9','.'],
  symbols: ['+','-','/','*'],
  input(char) {
    // debugger;
    const lastChar = this.expression[this.expression.length - 1];
    if (this.expression.length > 0) {
      // handle consecutive operators
      if (this.symbols.indexOf(lastChar) >= 0 && this.symbols.indexOf(char) >= 0) {
        this.expression.pop();
        this.expression.push(char);
      } else {
        // handle duplicate .
        if (char === '.') {
          if (!this.containsDecimal(this.getLastNumber())) {
            this.expression.push(char);
          }
        } else {
          this.expression.push(char);
        }
      }
    } else {
      if (this.numbers.indexOf(char) >= 0) {
        this.expression.push(char);
      }
    }

    this.updateResult();
  },
  getLastNumber() {
    const numbers = this.expression.join('').split(/\+|\-|\*|\//);
    return numbers[numbers.length - 1];
  },
  containsDecimal(str) {
    return (str.split('.').length > 1) ? true : false;
  },
  evaluate() {
    const result = eval(this.expression.join(''));
    if (result === Infinity) {
      this.result = 'Can’t divide by 0';
    } else if (result !== undefined) {
      this.result = result;
    }
  },
  equals() {
    this.evaluate();
    this.expression = [this.result];
    this.result = '';
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
    view.renderDelButton();
  },
  delete() {
    calculator.delete();
    this.displayExpression();
    this.displayResult();
  },
  clear() {
    calculator.clear();
    this.displayExpression();
    this.displayResult();
    view.renderDelButton();
    view.renderClearRipple();
  },
  equals() {
    calculator.equals();
    this.displayExpression();
    this.displayResult();
    view.renderClrButton();
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
    const pad = document.querySelector('.pad');
    pad.addEventListener('click', (event) => {
      if (event.target.classList.contains('button')) {
        const button = event.target.dataset.char;
        if (button !== 'del' && button !== '=' && button !== 'clr') {
          this.input(button);
        } else if (button === 'del') {
          this.delete();
        } else if (button === '=') {
          this.equals();
        } else if (button === 'clr') {
          this.clear();
        } else {
          console.log('error - button not handled')
        }
      }
    });

    // long press DEL to clear
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

const view = {
  renderClrButton() {
    document.getElementById('del').style.display = 'none';
    document.getElementById('clr').style.display = 'flex';
  },
  renderDelButton() {
    document.getElementById('del').style.display = 'flex';
    document.getElementById('clr').style.display = 'none';
  },
  renderClearRipple() {
    const ripple = document.querySelector('.ripple');
    ripple.classList.add('clear-ripple');
    setTimeout(() => ripple.classList.remove('clear-ripple'), 800);
  }
}

window.calculator = calculator;
window.handlers = handlers;
handlers.setEventListeners();

mdc.autoInit();
