
$(document).ready(function(){
    /* Display intial result */
    var displayValue = '0';
    var displayValueTemp = '';
    var equation = [];
    var inputValue = '';
    display(displayValue);

    /* Delete any zero in front. If empty put back a zero. Also check if first letter is symbol */
    function correctMistakes(){
        if((displayValue[0] === '0' && displayValue[1] !== ".")|| isStrSymbol(displayValue[0])) {
            console.log("correctMistakes");
            displayValue = displayValue.substr(1); // remove it if user has added
            if(displayValue === ''){
                displayValue = '0'; // Need at least a zero if it is empty
            }
        }
    }

    /* Deal with the numbers */
    var inputDigit = function() {
        inputValue = this.getAttribute("data-value");

        /* check if number */
        if( isStrNum(inputValue) ){
            displayValue = displayValue + inputValue;
            /* Correct any fails */
            correctMistakes();
            console.log(displayValue);
            display(displayValue);

        } else if(isStrDotSign(inputValue)) {

            displayValue = displayValue + inputValue;
            console.log("this is stop");
            display(displayValue);

        } else if(isStrEqualSign(inputValue) ){
            var indexNum = equation.length-1;

            /* Check if the last value is still a number then push to equation*/
            if(isStrNum(displayValue)){
                equation.push(displayValue);
            }
            /* Check if a proper equation ready for calculation */
            if(isStrNum(equation[equation.length - 1]) && isStrSymbol(equation[equation.length - 2])){
                var strEquation = equation.join('');
                displayValue = eval(strEquation);
                console.log("equation ready");
                console.log(strEquation);

                display(displayValue);
                console.log(equation);
                equation = [];

            } else {
                console.log("equation NOT ready");
                console.log(equation);
            }
        } else {

            if( equation.length > 0 && isStrSymbol(equation[equation.length -1]) ){
                equation[equation.length-1] = inputValue;
            } else {
                equation.push(displayValue);
                equation.push(inputValue);
            }

            display(inputValue);
            /* temporary store value if CE is pressed */
            displayValueTemp = displayValue;
            displayValue = '';
        }
        console.log(equation);
    };

    /* Deal with the cancel */
    var inputCancelAll = function(){
        displayValue = '0';
        equation = [];

        display(displayValue);
    }

    /* Cancel last operation */
    var inputCancelLast = function(){
        console.log(" cancel: "+displayValueTemp);
        // Check if last entry is number then remove
        if(isStrNum(inputValue)){
            displayValue = displayValue.slice(0, -1);
        } else if(isStrSymbol(inputValue)){
            equation = equation.slice(0,-2);
            displayValue = displayValueTemp;
            display(displayValue);
        }
        console.log(" cancel: "+displayValue);
        display(displayValue);
        console.log(equation);
    }

    /* Add a listener for numbers */
    var classDigit = document.getElementsByClassName("digit");
    for (var i=0; i<classDigit.length; i++) {
        classDigit[i].addEventListener("click", inputDigit);
    }

    /* Add a listener for AC */
    document.getElementById("ac").addEventListener('click', inputCancelAll);

    /* Add a listener for CE */
    document.getElementById("back").addEventListener('click', inputCancelLast);

    /* Check if number */
    function isStrNum(value){
        if(value.search(/[0-9]+$/) > -1){
            return true;
        }
    }
    /* Check if math operator */
    function isStrSymbol(value){
        if(value.search(/^[^0-9]+$/) === 0){
            return true;
        }
    }
    /* Check if = sign */
    function isStrEqualSign(value){
        if(value.search(/[=]+$/) > -1){
            return true;
        }
    }
    /* Check if . sign */
    function isStrDotSign(value){
        if(value.search(/[.]+$/) > -1){
            return true;
        }
    }
    /* Display on screen */
    function display(displayValue){
        return document.getElementById("display").innerHTML = displayValue;
    }

    /* TODO: have input limit - goning off screen. try overflow hidden */
});
