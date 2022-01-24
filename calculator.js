const calculator = function() {
    
    // Class calculator do the calculus and evaluation of expressions
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
            this.#result = (this.#x/100) * this.#y
        }

        evalExpression(exp) {

            let operators = ['+', '-','/', '*', '%']
            let methods = [this.sum, this.subtract, this.divide,this.multiply, this.percentage]

            for (let i in operators) {
                if (!this.#evalOne(exp, operators[i], methods[i])) {
                    continue
                } else {
                    break
                }

            }

            if (this.#result == undefined) {
                this.#result = exp
            }
            
        }

        getResult() {
            return this.#result
        }

        #evalOne(exp, char, meth) {
            if (exp.indexOf(char) != -1 && exp.indexOf(char) != 0) {
                let nums = exp.split(char)
                this.#x = nums[0]
                this.#y = nums[1]
                meth.call(this)

                return true
            }
            return false
        }

    }

    function addBtnsEvent(exp,viw, viwPa) {
        let specialKeys = ['()', '[=','C', '=']

        let btns = document.querySelectorAll('button')
        let specBtns = []

        for (let i in btns) {
            if (specialKeys.includes(btns[i].id)) {
                // If the buttons is in the list of special append him to a list that will be returned
                specBtns.push(btns[i])
            } else {
                btns[i].onclick = function() {
                    // Just update the text on the viewer of what the user is typing
                    exp[0] += btns[i].innerText
                    viw.innerText = exp[0]
                    
                    // Check if the text typed is overflowing and reduce the fontsize
                    if (viw.offsetWidth >= viwPa.offsetWidth) {
                        let fs = window.getComputedStyle(viw).fontSize
                        fs = fs.slice(0, fs.length-2)
                        let n = Number(fs) - 2

                        viw.style.fontSize = n +'px'
                    }
                }
            }
        }
        return specBtns
    }

    function configSpecialBtns(btns,exp, viw,calc) {
        btns[1].onclick = function() {
            // Mini trick to simulate effect of erasing one digit
            exp[0] = exp[0].slice(0, exp[0].length - 1)
            viw.innerText = exp[0]
        }
        btns[2].onclick = function() {
            exp[0] = ''
            viw.innerHTML = '&nbsp'
            viw.style.fontSize = '30px'
        }
        btns[3].onclick = function() {
            calc.evalExpression(exp[0])
            exp[0] = '' + calc.getResult()
            viw.innerText = exp[0]
            viw.style.fontSize = '30px'
        }
    }

    function makeCalculator() {
        let cal = new Calculator()

        let viewer = document.querySelector('div#viewfinder')
        let viwerSpan = document.querySelector('span')

        let expression = ['']
        
        let specialBtns = addBtnsEvent(expression, viwerSpan, viewer)
        configSpecialBtns(specialBtns, expression, viwerSpan,cal)
    }

    window.addEventListener('load', makeCalculator)
}

calculator()