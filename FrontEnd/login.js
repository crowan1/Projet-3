
const messageError = document.getElementById("msg-eror");
const loginURL = fetch ("http://localhost:5678/api/users/login");


const form = document.forms["form-login"]; 
const submitButton = form.elements["submit-form"]; 


submitButton.addEventListener("click",function (event) {
event.preventDefault();


  if (form.email.value === "" || form.password.value === "") {
    messageError.style.display = "flex";
    return;
  } else {
    messageError.style.display = "none";
  }

    fetch(loginURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
    .then((response) => response.json())
    .then((data) => {

        localStorage.setItem('auth', JSON.stringify(data));
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth && auth.token) {
          window.location = "index.html";
        } else {
          messageError.style.display = "flex";
        }
    })
    .catch((error) => {
      console.error('Error:', error);
      messageError.style.display = "flex";
    });
})


