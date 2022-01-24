const calculator = function() {

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
            this.#result = 0
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

    function addBtnsEvent(exp,viw) {
        let specialKeys = ['()', '[=','C', '=']

        let btns = document.querySelectorAll('button')
        let specBtns = []

        for (let i in btns) {
            if (specialKeys.includes(btns[i].id)) {
                specBtns.push(btns[i])
            } else {
                btns[i].onclick = function() {
                    exp[0] += btns[i].innerText
                    viw.innerText = exp[0]
                }
            }
        }
        return specBtns
    }

    function configSpecialBtns(btns,exp, viw,calc) {
        btns[1].onclick = function() {
            exp[0] = exp[0].slice(0, exp[0].length - 1)
            viw.innerText = exp[0]
        }
        btns[2].onclick = function() {
            exp[0] = ''
            viw.innerHTML = '&nbsp'
        }
        btns[3].onclick = function() {
            calc.evalExpression(exp[0])
            exp[0] = '' + calc.getResult()
            viw.innerText = exp[0]
        }
    }

    function makeCalculator() {
        let cal = new Calculator()
        let viewer = document.querySelector('div#viewfinder')
        let expression = ['']
        let specialBtns = addBtnsEvent(expression, viewer)
        configSpecialBtns(specialBtns, expression, viewer,cal)
    }

    window.addEventListener('load', makeCalculator)
}

calculator()