function UserExeption(message) {
    this.message = message
    // this.toString = function() {
    //     return this.name + ': ' + this.message
    // }

}

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
        case '*':
            res = a * b
            break
        case '/':
            if (b == 0) throw new UserExeption('TypeError: Division by zero.')

            res = a / b
            break
    }
    return res;
}

function expressionCalculator(expr) {
    const operations = ['*', '/', '+', '-']

    expr = expr.replace(/ /g, '')

    exprArr = expr.replace(/[0-9]{1,3}/g, '$& ')
        .replace(/[\+\-\*\/\(\)]{1}/g, '$& ')
        .split(' ')
        .slice(0, -1)

    console.log(exprArr);


    let openedBrackets = []
    let closedBrackets = []
    for (let i = 0, len = exprArr.length; i < len; i++) {
        const el = exprArr[i]
        if (el == '(') {
            openedBrackets.push(i)
        } else {
            if (el == ')') {
                closedBrackets.push(i)
            }
        }
    }

    if (openedBrackets.length != closedBrackets.length) {
        throw new Error('ExpressionError: Brackets must be paired')
    }

    while (openedBrackets.length > 0) {
        const opened = openedBrackets.pop()

        const closed = closedBrackets.splice(
            closedBrackets.findIndex(closed => closed > opened),
            1
        )[0]

        let innerBrackets = exprArr.slice(opened + 1, closed)
        innerBrackets = calculateOper(innerBrackets, operations.slice(0, 2))
        innerBrackets = calculateOper(innerBrackets, operations.slice(2))
        exprArr.splice(opened, closed - opened, innerBrackets[0])
        console.log('innerBrackets: ' + innerBrackets);
        console.log(openedBrackets.length + ': ' + exprArr);
    }

    exprArr = calculateOper(exprArr, operations.slice(0, 2))

    exprArr = calculateOper(exprArr, operations.slice(2))
    // console.log(exprArr);
    return exprArr[0]
}

function calculateOper(arr, operations) {
    let i = 0
    let res = 0
    while (i < arr.length) {
        curEl = arr[i]

        if (curEl == operations[0] || curEl == operations[1]) {
            res = eval(arr[i - 1], arr[i + 1], curEl)

            if (i + 1 < arr.length - 1) {
                arr = arr.slice(0, i - 1).concat(res)
                    .concat(
                        arr.slice(i + 2)
                    )
            } else {
                arr = arr.slice(0, i - 1).concat(res)
                return arr
            }
            i--
        }
        i++

    }
    return arr
}

// console.log(expressionCalculator('77 + 79 / 25 * (  64 * 63 - 89 * 14  ) * 49'));

module.exports = {
    expressionCalculator
}