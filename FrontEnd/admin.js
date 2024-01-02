
const modalDeleteWork = document.querySelector("#GaleriePhoto");
const openGalleryModalBtn = document.getElementById("lienModifier");
const closeGalleryModalBtn = document.querySelector("#fermer-suppr");
const galeriePhtoto = document.querySelector(".gallerymodal")

const modalAddWork = document.querySelector("#modalsAjout");
const openAddWork = document.querySelector("#AjoutPhoto");
const previousBtn = document.querySelector(".precedent");
const closeAddWorkModalBtn = document.querySelector("#fermer-ajout")

const uploadImageInput = document.querySelector("#imageUpload");
const projectUpload = document.querySelector("#previewImage");
const uploadContent = document.querySelector("#previewdetails");
const submitProjet = document.querySelector("#validerAjout");
const backgroundPreview = document.querySelector(".AjoutPhotoContainer");

const addProjectForm = document.querySelector("#ajout-form");

const backgroundModal = document.querySelector("#PageAdmin");


function openGalleryModal() {
    modalDeleteWork.style.display = "flex";
    backgroundModal.style.display = "block";
    addWorkModal();
}

function openAddWorkModal() {
    modalAddWork.style.display = "flex";
    backgroundModal.style.display = "block";
}
// fermer pageadmin
function closeGalleryModal() {
    modalDeleteWork.style.display = "none";
    backgroundModal.style.display = "none";
}

function closeAddWorkModal() {
    modalAddWork.style.display = "none";
    backgroundModal.style.display = "none";
}

// Ouvrir les modals
if (openGalleryModalBtn) openGalleryModalBtn.addEventListener("click", openGalleryModal);
if (openAddWork) openAddWork.addEventListener("click", function() {
    closeGalleryModal();
    openAddWorkModal();
})

// Fermer les modals et précédent
closeGalleryModalBtn.addEventListener("click", closeGalleryModal);
closeAddWorkModalBtn.addEventListener("click", closeAddWorkModal);

previousBtn.addEventListener("click", function() {
    closeAddWorkModal();
    openGalleryModal();
    addWorkModal();
});

window.onclick = function (event) {
    if (event.target == backgroundModal) {
        closeAddWorkModal();
        closeGalleryModal();
    }
}



// Ajout des photos
async function sendWorkData(data) {
   const postWorkUrl = 'http://localhost:5678/api/works';

    const response = await fetch(postWorkUrl, {
        method: "POST",
        headers: {
            'Authorization': getAuthorization()
        },
        body: data,
    });

    return response.json();
}

// envoie formulaire
async function handleFormSubmit(event) {
    event.preventDefault();


    if (!addProjectForm.checkValidity()) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    // valeur formulaire
    const title = addProjectForm.querySelector("#titreAjout").value;
    const category = addProjectForm.querySelector("#selectCategorie").value;
    const file = uploadImageInput.files[0];


    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);

// confirmation ajout d'image
    try {
        const response = await sendWorkData(formData);
        console.log(response);
        
        const alert = document.getElementById('alert');
        alert.innerHTML = "Votre photo a été ajouté avec succès";
        alert.style.display = "block";
        setTimeout(function(){ alert.style.display = "none"; }, 5000);
        
    } catch (error) {
        console.error("Erreur :", error);
    }
}


uploadImageInput.addEventListener("change", function () {
    uploadImage();
});

addProjectForm.addEventListener("submit", handleFormSubmit);

// appercu de l'image
function uploadImage() {
    if (uploadImageInput.files && uploadImageInput.files[0]) {
        const reader = new FileReader();
        const image = new Image();
        const fileName = uploadImageInput.files[0].name;

        reader.onload = event => {
            image.src = event.target.result;
            image.alt = fileName.split(".")[0];
        };

        uploadContent.style.display = "none";
        submitProjet.style.backgroundColor = "#1D6154";
        projectUpload.style.display = "block";
        backgroundPreview.style.backgroundColor = "#FFFFFF";
        reader.readAsDataURL(uploadImageInput.files[0]);
        projectUpload.appendChild(image);
    }
}