
class Calculator {

    #x
    #y
    #result

    sum() {
        this.#result = Number(this.#x) + Number(this.#y)
    }

    subtract() {
        this.#result = Number(this.#x) - Number(this.#y)
    }

    multiply() {
        this.#result = Number(this.#x) * Number(this.#y)
    }

    divide() {
        this.#result = Number(this.#x) / Number(this.#y)
    }

    percentage() {

    }

    evalExpression(exp) {

        let operators = ['+', '-','/', '*']
        let methods = [this.sum, this.subtract, this.divide,this.multiply]

        for (let i in operators) {
            if (!this.#evalOne(exp, operators[i], methods[i])) {
                continue
            } else {
                break
            }
        }
    }

    getResult() {
        return this.#result
    }

    #evalOne(exp, char, meth) {
        if (exp.indexOf(char) != -1) {
            let nums = exp.split(char)
            this.#x = nums[0]
            this.#y = nums[1]
            meth.call(this)

            return true
        }

        return false
    }

}

const createCalculator = function() {
    let calCont = document.querySelector('div#keyboard')
    let viwer = document.querySelector('div#viewfinder')
    let expression = ''
    let cal = new Calculator()
    createRow('fistRow', ['()', '%', '<=', 'C'])
    createRow('secondRow',[7,8,9,'+'])
    createRow('thirdRow',[4,5,6,'-'])
    createRow('fourthRow',[1,2,3,'*'])
    createRow('fifthRow',[0,'.','=','/'])

    let equa = document.querySelector('[id="="]')
    equa.onclick = function () {
        cal.evalExpression(expression)
        expression = cal.getResult()
        viwer.innerText = expression
    }


    function createRow(id, charList) {
        let row = document.createElement('div')
        row.id = id
        calCont.appendChild(row)
        

        for (let i in charList){
            btn = document.createElement('button')
            btn.id = charList[i]
            btn.innerText = charList[i]
            btn.onclick = function () {
                expression += charList[i]
                viwer.innerText = expression
            }
            row.appendChild(btn)
        }

    }

}

window.addEventListener('load', createCalculator)