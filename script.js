
    function strAppend(val)
    {
        var display=document.getElementById("display");
        if(val=='AC')    display.value='0';
        else if(val=='DL')
        {
            var val2=display.value.toString();
            if(val2.length<=1)  display.value='0';
            else   display.value=val2.slice(0,-1);
        }
        else if(display.value=='0' || display.value=='error') display.value=val;
        else   display.value += val;
    }

    var evaluated;
    function Evaluate() {
        var display = document.getElementById("display");
        
    
        try {
            evaluated = display.value.replace('π','Math.PI');
            evaluated=evaluated.replace('^','**');
            evaluated=evaluated.replace('√','Math.sqrt');
            evaluated=evaluated.replace('log','Math.log10');
            evaluated=evaluated.replace('ln','Math.log');
            evaluated=evaluated.replace('asin','Math.asin');
            evaluated=evaluated.replace('acos','Math.acos');
            evaluated=evaluated.replace('atan','Math.atan');
            evaluated=evaluated.replace('floor','Math.floor');
            evaluated=evaluated.replace(' e','Math.E');
            evaluated=evaluated.replace('ceil','Math.ceil');
            evaluated=evaluated.replace('abs','Math.abs');
            
            evaluated=processExpression(evaluated);
            display.value = eval(evaluated);

            // alert('Result: '+evaluated);
    
        } catch {
    
            display.value = 'Syntax Error';
            alert('Syntax error on: '+evaluated);
        }
    }




    let firstArray=[
        ["AC",     "DEL",   "(",      ")"],
        ["7" ,     "8",     "9",      "*"],
        ["4" ,     "5",     "6",      "/"],
        ["1" ,     "2",     "3",      "-"],
        ["." ,     "0",     "%",      "+"],
        ["E" ,     "^",     "2nd",    "="]
    ];
    let secondArray=[
        ["AC" ,    "DEL",   "|",     "Deg"],
        ["Sin" ,   "Cos",   "Tan",   "<<"],
        ["asin" ,  "acos",  "atan",  ">>"],
        ["√" ,     "floor", "ceil",  "π"],
        ["abs" ,   "!",   " e",   "&"],
        ["log" ,   "ln",    "1st",   "="]
    ];

    const stringSet=new Set(['abs','Sin', 'Cos', 'Tan', 'log', 'ln', '√', 'asin', 'acos', 'atan', 'floor', 'ceil']);

    function switchButtons() {
        let sBtn = document.getElementById("63");
        let isSecondPage = sBtn.value === "2nd";


        
        // Toggle the button value
        sBtn.value = isSecondPage ? "1st" : "2nd";
    
        // Loop through rows and columns
        for (let a = 1; a <= 6; a++) {
            for (let b = 1; b <= 4; b++) {

                let btnId = a.toString() + b.toString();
                if (btnId == '63' || btnId == '64' || btnId == '11' || btnId == '12')
                  continue;
                let btn = document.getElementById(btnId);
    
                // Use the correct array based on the current page
                btn.value = isSecondPage ? secondArray[a - 1][b - 1] : firstArray[a - 1][b - 1];
                
                if(stringSet.has(btn.value))
                {
                    let nstr=btn.value+'(';
                    btn.onclick = () => strAppend(nstr);
                }
                else
                btn.onclick = () => strAppend(btn.value);
            }
        }
    }
    




// Function to convert degrees to radian 
function degreeToRadian(degrees) {
    return degrees * (Math.PI/180);
}
// Function to convert radian to degree 
function radianToDegree(radian) {
    return radian * (180/Math.PI);
}

// Function to process the expression and replace trigonometric functions and log
function processExpression(expression) {
    // expression = expression.replace(/Math.ceil\(([^)]+)\)/g, function(match, p1) {
    //     return match;
    // });
    //to replace 'sin(' with 'radiansToDegrees(Math.sin('
    expression = expression.replace(/Sin\(([^)]+)\)/g, function(match, p1) {
        return Math.sin(degreeToRadian(p1));
    });

    //to replace 'cos(' with 'radiansToDegrees(Math.cos('
    expression = expression.replace(/Cos\(([^)]+)\)/g, function(match, p1) {
        return Math.cos(degreeToRadian(p1));
    });

    //to replace 'tan(' with 'radiansToDegrees(Math.tan('
    expression = expression.replace(/Tan\(([^)]+)\)/g, function(match, p1) {
        return Math.tan(degreeToRadian(p1));
    });
   
    //to replace asin(...) with its converted value in degree 
    expression = expression.replace(/Math.asin\(([^)]+)\)/g, function(match, p1) {
        return radianToDegree(Math.asin(p1));
    });
    
    //to replace acos(...) with its converted value in degree 
    expression = expression.replace(/Math.acos\(([^)]+)\)/g, function(match, p1) {
        return radianToDegree(Math.acos(p1));
    });
    
    //to replace atan(...) with its converted value in degree 
    expression = expression.replace(/Math.atan\(([^)]+)\)/g, function(match, p1) {
        return radianToDegree(Math.atan(p1));
    });


    return expression;
}
