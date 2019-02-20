;(function() {
  const keys = document.querySelectorAll('#calculator span')
  const operators = ['+', '-', 'x', '÷']
  let decimalAdded = false

  for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {
      let input = document.querySelector('.formula')
      let output = document.querySelector('.screen')
      let inputVal = input.innerHTML
      let btnVal = this.innerHTML
      let total
      if (btnVal == 'AC') {
        input.innerHTML = ''
        output.innerHTML = ''
        decimalAdded = false
      } else if (btnVal == '=') {
        let equation = inputVal
        let lastChar = equation[equation.length - 1]

        equation = equation.replace(/x/g, '*').replace(/÷/g, '/')

        if (operators.indexOf(lastChar) > -1 || lastChar == '.')
          equation = equation.replace(/.$/, '')

        if (equation) {
          // eval, Number.toFixed
          total = eval(equation)
          if (total.toString().indexOf('.') != -1) total = total.toFixed(2)

          output.innerHTML = total
        }

        decimalAdded = false
      } else if (operators.indexOf(btnVal) > -1) {
        // 換掉最後一個字元，如果是+-x÷
        let lastChar = inputVal[inputVal.length - 1]

        if (inputVal != '' && operators.indexOf(lastChar) == -1)
          input.innerHTML += btnVal
        else if (inputVal == '' && btnVal == '-') input.innerHTML += btnVal

        if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
          input.innerHTML = inputVal.replace(/.$/, btnVal)
        }
        // ------------------------

        decimalAdded = false
      } else if (btnVal == '.') {
        if (!decimalAdded) {
          input.innerHTML += btnVal
          decimalAdded = true
        }
      } else if (btnVal == '⌫') {
        inputVal = inputVal.substr(0, inputVal.length - 1)
        input.innerHTML = inputVal
        decimalAdded = false
      } else {
        input.innerHTML += btnVal
      }

      e.preventDefault()
    }
  }
})()
