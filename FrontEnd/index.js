async function init () {
    const local = await fetch ('http://localhost:5678/api/works')
    const objets = await local.json()


    for (let i =0; i <objets.length;i++){
            const images = objets[i]

            const pieceElement = document.createElement("article")

          const imageselement = document.createElement("img")
    imageselement.src = images.imageUrl

    const titleelemnt = document.createElement("h6")
    titleelemnt.innerText = images.title

    
    const sectionsfiches = document.querySelector(".fiches")
    sectionsfiches.appendChild(pieceElement)
    pieceElement.appendChild(imageselement)
    pieceElement.appendChild(titleelemnt)
 }
}
init ()

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




