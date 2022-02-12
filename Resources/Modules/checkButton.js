//This function changes the button from "is it safe?" to "check more", changes its styling, and ressets the results

const check = document.getElementById('checkbutton');
function changeButton() {
     document.getElementById('resultsandbutton').style.justifyContent = "space-between";
     check.innerHTML = "CHECK MORE"
     check.style.backgroundColor = "white";
     check.style.color = "#6B3AAF";
     check.style.border = "1px solid #6B3AAF";    
}


//This enables the button once something is typed in the textbox, disables it if it is removed
function enableButton() {
    const textbox = document.getElementById('textbox')
    textbox.addEventListener("keyup", event => {
        if(textbox.value.length !== 0){
            check.disabled = false  
        } else {
            check.disabled = true;
        }
    })
}

export { check, changeButton, enableButton };