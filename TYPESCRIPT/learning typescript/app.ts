const num1Ele = document.getElementById('num1') as HTMLInputElement
const num2Ele = document.getElementById('num2') as HTMLInputElement
const buttonEle = document.querySelector('#addBtn')!  // used exclamation mark herre and requestiong ts to ignore null case
const result : number[]= []

interface ResultObj {value: number; timeStamp : Date }


function add (num1: number, num2:number){  //defineind num1 and num 2 datatype to about adding string
                                            // typescript help to be specific of the job                
    return num1+num2
}

function printResult(resultObj: ResultObj){
    console.log(resultObj.value);
    
}
// after providind the const num1Ele the type which we give as html input ele
// only after that it takes the value of that input, else it was red flag before
// but value always return string, that its property
// here num1 is a string as value return a string not a number and we are adding number as specified in function
// but there is a way to conver string into a number
// just by adding '+' symbol before a string, it converts into a number
// hence this is a role of typescript to force us to write clean code and avoid future bugs

buttonEle.addEventListener('click', ()=>{
    const num1 = num1Ele.value    
    const num2 = num2Ele.value  
    const output = add(+num1,+num2)
    console.log(output);
    result.push(output)
    console.log(result);
    
       printResult({value: output, timeStamp : new Date()})
})

const myPromise = new Promise<string>((resolve, reject)=>{
    setTimeout(() => {
        resolve('working')
    }, 1000);   
    })
    
    myPromise.then(()=>{
        console.log(result);
     
})