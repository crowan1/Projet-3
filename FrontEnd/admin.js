
const modalDeleteWork = document.querySelector("#GalerieIMG");
const LienOpenPageAdmin = document.getElementById("lienModifier");
const closeGalleryModalBtn = document.querySelector("#fermer-suppr");
const galeriePhtoto = document.querySelector(".GalerieImage")

const AdminAjout = document.querySelector("#AdminAjout");
const OpenAjoutImg = document.querySelector("#AjoutPhoto");
const previousBtn = document.querySelector(".precedent");
const closeAddWorkModalBtn = document.querySelector("#fermer-ajout")

const uploadImageInput = document.querySelector("#imageUpload");
const projectUpload = document.querySelector("#previewImage");
const uploadContent = document.querySelector("#previewdetails");
const submitProjet = document.querySelector("#validerAjout");
const backgroundPreview = document.querySelector(".AjoutPhotoContainer");

const addProjectForm = document.querySelector("#ajout-form");

const backgroundModal = document.querySelector("#PageAdmin");


function OpenGAllerieAdmin() {
    modalDeleteWork.style.display = "flex";
    backgroundModal.style.display = "block";
    addWorkModal();
}

function OpenAjoutAdmin() {
    AdminAjout.style.display = "flex";
    backgroundModal.style.display = "block";
}
// fermer pageadmin
function closeGalleryModal() {
    modalDeleteWork.style.display = "none";
    backgroundModal.style.display = "none";
}

function closeAddWorkModal() {
    AdminAjout.style.display = "none";
    backgroundModal.style.display = "none";
}

// Ouvrir les modals
if (LienOpenPageAdmin) LienOpenPageAdmin.addEventListener("click", OpenGAllerieAdmin);
if (OpenAjoutImg) OpenAjoutImg.addEventListener("click", function() {
    closeGalleryModal();
    OpenAjoutAdmin();
})



// Fermer les modals et précédent
closeGalleryModalBtn.addEventListener("click", closeGalleryModal);
closeAddWorkModalBtn.addEventListener("click", closeAddWorkModal);

previousBtn.addEventListener("click", function() {
    closeAddWorkModal();
    OpenGAllerieAdmin();
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

// galerie photo

async function init1 () {
    const local = await fetch ('http://localhost:5678/api/works')
    const objets = await local.json()


    for (let i =0; i <objets.length;i++){
            const images = objets[i]

            const pieceElement = document.createElement("div")

          const imageselement = document.createElement("img")
    imageselement.src = images.imageUrl

    const titleelemnt = document.createElement("p")
    titleelemnt.innerText = images.title


 
    const IconeElement = document.createElement("i");
IconeElement.className = "fa-solid fa-trash iconeDelete";
    IconeElement.id = ("iconeDelete")
IconeElement.setAttribute("data-id", images.id); 
    
    const sectionsfiches = document.querySelector(".GalerieImage")
    sectionsfiches.appendChild(pieceElement)
    pieceElement.appendChild(imageselement)
    pieceElement.appendChild(titleelemnt)
    pieceElement.appendChild(IconeElement)





    titleelemnt.style.display ="none"
    imageselement.style.marginBottom ="15Px"
    pieceElement.style.width="60px"

    
 }
}
init1 ()




async function deleteImage(imageId) {
    const deleteImageUrl = `http://localhost:5678/api/works/${imageId}`;
    

    try {
        const response = await fetch(deleteImageUrl, {
            method: "DELETE",
            headers: {
                'Authorization': getAuthorization(),
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(`L'image avec l'ID ${imageId} a été supprimée avec succès.`);
    
            init1();
        } else {
            console.error(`La suppression de l'image avec l'ID ${imageId} a échoué.`, response.status);
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
 
    const galleryContainer = document.getElementById("GalerieIMG");

    galleryContainer.addEventListener("click", function (event) {
  
        if (event.target.classList.contains("iconeDelete")) {
        
            const imageId = event.target.getAttribute("data-id");

           
            deleteImage(imageId);
        }
    });
});
