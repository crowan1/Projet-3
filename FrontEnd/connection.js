const editor = document.querySelector(".style-editor");
const editor1 = document.querySelector(".editor-logo")
const editBtn = document.querySelectorAll(".modifier");
const logout = document.querySelector('[href="login.html"]');
const lienModfier = document.getElementById("lienModifier")



if (isConnected()) {
    editor.style.display ="flex"
    editor.style.position =" absolute"
    editor.style.top =" 0"
    editor.style.left ="0"
    editor.style.width = " 100%"
    editor1.style.margin ="auto"
    lienModfier.style.display="flex"


    const logo = document.getElementById("logo");
    logo.style.paddingTop = "25px";
    logo.style.fontSize = "17px";

    const navHeader = document.querySelector(".navigation");
    navHeader.style.paddingTop = "25px";
    

    logout.textContent = "logout";
    logout.setAttribute("href", "#");


    logout.addEventListener("click", event => {
        event.preventDefault();

        localStorage.removeItem("userId");
        localStorage.removeItem("auth");
        window.location.reload();
    

    });
}

