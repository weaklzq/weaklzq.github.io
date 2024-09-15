const num1 = document.getElementById('1');
const num2 = document.getElementById('2');
const num3 = document.getElementById('3');
const num4 = document.getElementById('4');
const num5 = document.getElementById('5');
const num6 = document.getElementById('6');
const num7 = document.getElementById('7');
const num8 = document.getElementById('8');
const num9 = document.getElementById('9');
const num0 = document.getElementById('0');

const operatorAdd = document.getElementById('plus');
const operatorSub = document.getElementById('minus');
const operatorMul = document.getElementById('multiply');
const operatorDiv = document.getElementById('divide');

const operatorEqual = document.getElementById('equal');
const operatorClear = document.getElementById('clear');

const display = document.querySelector('b');

var firstNum = 0;
var secondNum = 0;
var operator = '';
var result = 0;

function choiceFirstNum() {
    num1.addEventListener('click', () => {
        var firstNum = 1;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num2.addEventListener('click', () => {
        const firstNum = 2;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num3.addEventListener('click', () => {
        const firstNum = 3;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num4.addEventListener('click', () => {
        const firstNum = 4;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num5.addEventListener('click', () => {
        const firstNum = 5;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num6.addEventListener('click', () => {
        const firstNum = 6;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num7.addEventListener('click', () => {
        const firstNum = 7;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num8.addEventListener('click', () => {
        const firstNum = 8;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num9.addEventListener('click', () => {
        const firstNum = 9;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
    num0.addEventListener('click', () => {
        const firstNum = 0;
        display.textContent = firstNum;
        localStorage.setItem('firstNum', firstNum);
    });
  
}


var storageFirtsNum;

choiceFirstNum();
// Запускаем цикл с интервалом
setInterval(() => {
    localStorage.getItem('firstNum');
}, 100); // Интервал в миллисекундах (1000 мс = 1 секунда)


operatorAdd.addEventListener('click', () => {
    operator = '+';
    display.textContent = localStorage.getItem('firstNum') + operator;
    storageFirtsNum = localStorage.getItem('firstNum');
    choiceSecondNum();
    
});
operatorSub.addEventListener('click', () => {
    operator = '-';
    display.textContent = localStorage.getItem('firstNum') + operator;
    storageFirtsNum = localStorage.getItem('firstNum');
    choiceSecondNum();
});
operatorMul.addEventListener('click', () => {
    operator = '*';
    display.textContent = localStorage.getItem('firstNum') + operator;
    storageFirtsNum = localStorage.getItem('firstNum');
    choiceSecondNum();
});
operatorDiv.addEventListener('click', () => {
        operator = '/';
        display.textContent = localStorage.getItem('firstNum') + operator;
        storageFirtsNum = localStorage.getItem('firstNum');
        choiceSecondNum();
});



function choiceSecondNum() {
    num1.addEventListener('click', () => {
        secondNum = 1;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num2.addEventListener('click', () => {
        secondNum = 2;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num3.addEventListener('click', () => {
        secondNum = 3;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num4.addEventListener('click', () => {
        secondNum = 4;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num5.addEventListener('click', () => {
        secondNum = 5;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num6.addEventListener('click', () => {
        secondNum = 6;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num7.addEventListener('click', () => {
        secondNum = 7;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num8.addEventListener('click', () => {
        secondNum = 8;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num9.addEventListener('click', () => {
        secondNum = 9;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
    num0.addEventListener('click', () => {
        secondNum = 0;
        display.textContent = storageFirtsNum + operator + secondNum;
    });
}


operatorEqual.addEventListener('click', () => {
    if (operator === '+') {
        result = Number(storageFirtsNum) + secondNum;
        display.textContent = result;
    } else if (operator === '-') {
        result = storageFirtsNum - secondNum;
        display.textContent = result;
    } else if (operator === '*') {            
        result = storageFirtsNum * secondNum;
        display.textContent = result;
    } else if (operator === '/') {          
        result = storageFirtsNum / secondNum;
        display.textContent = result;
    }
});    

operatorClear.addEventListener('click', () => {
    window.location.reload();
});





    
    
