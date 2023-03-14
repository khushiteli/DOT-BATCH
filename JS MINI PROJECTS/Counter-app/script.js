const countValue = document.getElementById('value') ; 

function dicrement() {
    let num = parseInt(countValue.innerText) ;
    num = num - 1 ; 
    countValue.innerText = num ;
}

function increment() {
    let num = parseInt(value.innerText) ;
    num++ ; 
    value.innerText = num ;
}