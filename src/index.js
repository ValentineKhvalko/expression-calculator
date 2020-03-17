function eval() {
    // Do not use eval!!!
    return;
}

const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
};

function calculate(exprArr) {

    for (let i = 0; i < exprArr.length; i++) {
        if (exprArr[i] == '/' || exprArr[i] == '*') {
            let value = operations[exprArr[i]](+exprArr[i - 1], +exprArr[i + 1]);
            exprArr.splice(i - 1, 3, value);
            i = -1;
        }
    }
    for (let i = 0; i < exprArr.length; i++) {
        if (exprArr[i] == '+' || exprArr[i] == '-') {
            let value = operations[exprArr[i]](+exprArr[i - 1], +exprArr[i + 1]);
            exprArr.splice(i - 1, 3, value);
            i = -1;
        }
    }
    return +exprArr[0];
}

function expressionCalculator(expr) {
    if (expr.replace(/\s/g, '').match(/\/0/g))
        throw new Error('TypeError: Division by zero.');

    if (expr.replace(/\s/g, '').replace(/\(/g, '').length != expr.replace(/\s/g, '').replace(/\)/g, '').length) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, " $& ");

    if (expr.includes('(')) {
        for (let i = expr.match(/\(/g).length; i != 0; i--) {
            let brackets = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
            let expression = brackets.slice(1, brackets.length - 1);
            expr = expr.replace(brackets, calculate(expression.split(' ')));
        }
    }
    return calculate(expr.split(' '));
}

module.exports = {
    expressionCalculator
}