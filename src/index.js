function eval(a, b, operation) {
    a = Number(a)
    b = Number(b)
    let res = 0
    switch (operation) {
        case '+': 
            res = a + b
            break
        case '-':
            res = a - b
            break
    }
    return res;
}

function expressionCalculator(expr) {
    expr = expr.replace(/ /g, '')
    exprArr = expr.split('')
    let exprRes = 0
    for (let i = 0, len = exprArr.length; i < len; i++) {
        const curEl = exprArr[i]
        if (curEl == '+' || curEl == '-') exprRes += eval(exprArr[i - 1],
            exprArr[i + 1], curEl)
    }
    return exprRes
}

module.exports = {
    expressionCalculator
}