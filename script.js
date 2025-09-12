const form = document.getElementById("form-container")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmpassword = document.getElementById("confirmpassword")


form.addEventListener("submit",function(e){
    e.preventDefault();

    const requiredValue = checkRequiredValue([username,email,password,confirmpassword]);

    let isFormValid = requiredValue;

    if(requiredValue){
        const isUsernameValid =checkLength(username,3, 15);
        const isEmailValid =checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordMatch = checkPasswordMatch(password, confirmpassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid &&isPasswordMatch;

    }
    if(isFormValid){
        alert("Registration is successful")
        form.reset();

        document.querySelectorAll(".formgroup").forEach(group =>{
            group.className = "formgroup"
        })
    }
});

function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Password does not match");
        return false;
    }
    return true;
}
 function checkEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value.trim())){
        showSuccess(email);
        return true;
    }else{
        showError(email," Email is not valid")
        return false;
    }
    
 }

function checkLength(input, min, max){
    if(input.value.length  < min){
        showError( input, `${formattedName(input)} must be atleast ${min} characters.`);
        return false;
    }else
        if(input.value.length > max){
            showError( input, `${formattedName(input)} must be less than ${max} characters.`);
            return false;
        }else{
            showSuccess(input);
            return true;
        }
    }


function checkRequiredValue(inputArray){
    let isValid = true;

 inputArray.forEach(input => {
    if (input.value.trim() === ""){
        showError(input, `${formattedName(input)} is required`)
        isValid = false;
    }else{
        showSuccess(input)
    }
 });
     return isValid;
}

function formattedName(input){

    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function showError(input,message){
    const formGroup = input.parentElement
    formGroup.className ="formgroup error"
    const small = formGroup.querySelector("small");
    small.innerText = message
}
function showSuccess(input){
    const formGroup = input.parentElement
    formGroup.className ="formgroup success"
}