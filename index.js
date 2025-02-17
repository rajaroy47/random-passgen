// console.log('hlooo');

let inp = document.getElementById('input')
let range = document.getElementById('range')
let length = document.getElementById('length')
let btn = document.getElementById('btn')
let error = document.getElementById('error-msg')
let msg = document.getElementById('msg')

function changeLength(){
    range.addEventListener('change', function(){
        length.innerHTML = range.value
        error.style.visibility = "hidden"
    })
}

changeLength()

btn.addEventListener('click', function(){
    if (range.value<8){
        // alert('Length Must Be Greater then 8')
        error.style.visibility = "visible"
        msg.textContent = "Length Must Be >= 8"
        return 0
    }
    else{
        function genPass(){
            let paslength = range.value
            let string = ''
            let pass = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*()<>'
            for(let i = 1; i<=paslength; i++){
                let idx = Math.floor(Math.random() * pass.length)
                string += pass[idx]
            }
            // console.log(string)
            inp.value = string
        
        }
        genPass()
    }
})

