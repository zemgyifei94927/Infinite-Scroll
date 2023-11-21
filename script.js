const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 30;
const apiKey = 'vqlhxToB4E4z71RyYSiSNHRBCOWW3HThOw-37jYrczs';
let apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded==totalImages){
        loader.hidden = true;
        ready = true;
    }
}
// Create Elements for Links & Photos, Add to Dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Nothing need to be implement at this time
    }
}

// Check to see if scrolling bar is near bottom of the page, Load more photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();