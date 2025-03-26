let signUpButton = document.getElementById('signUpButton');
let signInButton = document.getElementById('signInButton');
let signInForm = document.getElementById('signIn');
let signUpForm = document.getElementById('signUp');

signUpButton.addEventListener("click", function(){
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
})

signInButton.addEventListener("click", function(){
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
})