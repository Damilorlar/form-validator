const form = document.getElementById("form-container")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmpassword = document.getElementById("confirmpassword")
const togglePassword = document.querySelectorAll(".toggle-password");
const input = document.querySelectorAll("input");
// // Password requirement checklist logic
const reqList = document.getElementById('password-requirements');
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

password.addEventListener('input', function() {
    const value = password.value;
    let validCount = 0;
    // At least 8 characters
    if (value.length >= 8) {
        reqLength.classList.remove('invalid');
        reqLength.classList.add('valid');
        validCount++;
    } else {
        reqLength.classList.remove('valid');
        reqLength.classList.add('invalid');
    }
    // At least one uppercase letter
    if (/[A-Z]/.test(value)) {
        reqUppercase.classList.remove('invalid');
        reqUppercase.classList.add('valid');
        validCount++;
    } else {
        reqUppercase.classList.remove('valid');
        reqUppercase.classList.add('invalid');
    }
    // At least one number
    if (/[0-9]/.test(value)) {
        reqNumber.classList.remove('invalid');
        reqNumber.classList.add('valid');
        validCount++;
    } else {
        reqNumber.classList.remove('valid');
        reqNumber.classList.add('invalid');
    }
    // At least one special character
    if (/[^A-Za-z0-9]/.test(value)) {
        reqSpecial.classList.remove('invalid');
        reqSpecial.classList.add('valid');
        validCount++;
    } else {
        reqSpecial.classList.remove('valid');
        reqSpecial.classList.add('invalid');
    }
    // Show checklist only if not all requirements are met and user has typed something
    if (value.length > 0 && validCount < 4) {
        reqList.style.display = 'block';
    } else {
        reqList.style.display = 'none';
    }
});


// Toggle password visibility
togglePassword.forEach(toggle => {
    toggle.addEventListener("click", () => {
        const input = toggle.parentElement.querySelector('input');
        if (input.type === "password") {
            input.type = "text";
            toggle.classList.replace("fa-eye-slash", "fa-eye");
        } else {
            input.type = "password";
            toggle.classList.replace("fa-eye", "fa-eye-slash");
        }
    });
});
  



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
  const formGroup = input.closest('.formgroup');
    formGroup.className ="formgroup error"
    const small = formGroup.querySelector("small");
    small.innerText = message
}
function showSuccess(input){
  const formGroup = input.closest('.formgroup');
    formGroup.className ="formgroup success"
}