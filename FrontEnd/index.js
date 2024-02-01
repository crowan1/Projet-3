async function init() {
    const local = await fetch('http://localhost:5678/api/works');
    const nouvellesImages = await local.json();
    
    const sectionsfiches = document.querySelector(".fiches");
    const imagesExistantes = sectionsfiches.querySelectorAll("img");

    // image en un tableau
    const imagesExistantesArray = Array.from(imagesExistantes);

    // Ajouter des images 
    nouvellesImages.forEach(function(image) {
        // Image dans la galerie
        const imageExistante = imagesExistantesArray.find(function(imgElement) {
            return imgElement.src === image.imageUrl;
        });

       
        if (!imageExistante) {
            const pieceElement = document.createElement("article");
            const imageselement = document.createElement("img");
            imageselement.src = image.imageUrl;
            const titleelemnt = document.createElement("h6");
            titleelemnt.innerText = image.title;

            pieceElement.appendChild(imageselement);
            pieceElement.appendChild(titleelemnt);
            sectionsfiches.appendChild(pieceElement);
        }
    });

    // Supprimer les images 
    imagesExistantesArray.forEach(function(imgElement) {
        const imageExistante = nouvellesImages.find(function(image) {
            return imgElement.src === image.imageUrl;
        });

        
        if (!imageExistante) {
            imgElement.parentNode.parentNode.removeChild(imgElement.parentNode);
        }
    });
}


init();


async function button() { 
    const local = await fetch('http://localhost:5678/api/works');
    const objets = await local.json();

    const buttontout = document.querySelector(".buttuntout");
    const buttunobjets = document.querySelector(".buttunobjets");
    const buttunappartement = document.querySelector(".buttunappartement");
    const buttunresto = document.querySelector(".buttunresto");
    const allbutton = document.querySelectorAll("button")


   buttontout.addEventListener("click", function () {
        displayImages(objets); 
    });

    buttunobjets.addEventListener("click", function () {
        const piecesOrdonnees = objets.filter(function (pieces) {
            return pieces.categoryId === 1;
        });
        displayImages(piecesOrdonnees)
    });

    buttontout.addEventListener("click", function () {

        const piecesID  = objets.filter(function (pieces) {
            return pieces.categoryId !== objets;
        });
        displayImages(piecesID)
    });

    buttunobjets.addEventListener("click", function () {
  

        const piecesID1 = objets.filter(function (pieces) {
            return pieces.categoryId === 1;
        });
        displayImages(piecesID1)
    });

    buttunappartement.addEventListener("click", function () {
 
        const piecesID2 = objets.filter(function (pieces) {
            return pieces.categoryId === 2;
        });
        displayImages(piecesID2)
    });


    buttunresto.addEventListener("click", function () {

        const piecesID3 = objets.filter(function (pieces) {
            return pieces.categoryId === 3;
        });
        displayImages(piecesID3)
    });
 
    
  

    function displayImages(images) {
        const imageContainer = document.querySelector(".fiches");
        imageContainer.innerHTML = "";
    

    
        images.forEach((image) => {
            const imgElement = document.createElement("img");
            const titleEle = document.createElement("h5");
            imgElement.src = image.imageUrl;
            imgElement.alt = image.altText; 
            titleEle.innerText = image.title;
            titleEle.alt = image.altText; 

            const sectionsimgaes = document.createElement("article")

            imageContainer.appendChild(sectionsimgaes);
            sectionsimgaes.appendChild(imgElement)
            sectionsimgaes.appendChild(titleEle)
        })
    }
    
}

button();



const buttunobjets = document.querySelector(".buttunobjets")
const butuntout = document.querySelector(".buttuntout")
const butunapart = document.querySelector(".buttunappartement")
const buttunresto = document.querySelector(".buttunresto")

buttunobjets.addEventListener("click", () =>{
    buttunobjets.style.background = "#1D6154"
    buttunobjets.style.color = "#FFF"
    buttunresto.style.background = "#FFF"
    buttunresto.style.color = "#1D6154"
    butunapart.style.background = "#FFF"
    butunapart.style.color = "#1D6154"
    butuntout.style.background = "#FFF"
    butuntout.style.color = "#1D6154"
 
})

buttunresto.addEventListener("click", () =>{
    buttunresto.style.background = "#1D6154"
    buttunresto.style.color = "#FFF"
    buttunobjets.style.background = "#FFF"
    buttunobjets.style.color = "#1D6154"
    butunapart.style.background = "#FFF"
    butunapart.style.color = "#1D6154"
    butuntout.style.background = "#FFF"
    butuntout.style.color = "#1D6154"
})

butuntout.addEventListener("click", () =>{
    butuntout.style.background = "#1D6154"
    butuntout.style.color = "#FFF"
    buttunresto.style.background = "#FFF"
    buttunresto.style.color = "#1D6154"
    butunapart.style.background = "#FFF"
    butunapart.style.color = "#1D6154"
    buttunobjets.style.background = "#FFF"
    buttunobjets.style.color = "#1D6154"
})

butunapart.addEventListener("click", () =>{
    butunapart.style.background = "#1D6154"
    butunapart.style.color = "#FFF"
    buttunresto.style.background = "#FFF"
    buttunresto.style.color = "#1D6154"
    butuntout.style.background = "#FFF"
    butuntout.style.color = "#1D6154"
    buttunobjets.style.background = "#FFF"
    buttunobjets.style.color = "#1D6154"
})



// Ajout images PageAdmin
function addWorkModal() {
    const fragment = document.createDocumentFragment();
    const galleryModal = document.getElementsByClassName('gallerymodal')[0];
    
   
    galleryModal.innerHTML = '';
    

    const works = JSON.parse(localStorage.getItem('worksedit'));

    works.forEach((work) => {
        const div = document.createElement('div');
        div.id = "gallery_edit_img";

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.crossOrigin = 'anonymous';
        div.appendChild(img);

        const i = document.createElement('i');
        i.setAttribute("class", "fa fa-trash");
        i.setAttribute("data-id", work.id);
        i.setAttribute("onclick", "deleteWork(this, " + work.id + ")");
        div.appendChild(i);

        const p = document.createElement('p');
        p.textContent = 'éditer';
        p.setAttribute("data-id", work.id);
        div.appendChild(p);

        fragment.appendChild(div);
    });
  
   
    galleryModal.appendChild(fragment);
}
