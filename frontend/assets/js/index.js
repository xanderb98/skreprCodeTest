var slideIndex = 1;

class GalleryComponent extends HTMLElement {
    album = 1;

    connectedCallback() {
        this.innerHTML = '<div class="container"></div>';
        this.getPhotos(this.album);
    }

    async getPhotos(album) {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + album);
        const json = await response.json();
        this.photosToGallery(json);
    }

    photosToGallery(respFromApi) {
        console.log(respFromApi);
        var page = document.getElementsByClassName("container")[0];
        var slides = '', thumbnails = '<div class="row">';
        for (var i = 1; i <= 5; i++) {
            slides += '<div class="slides">' +
                '<div class="numbertext">' + i + ' / 5</div>' +
                '<img src="' + respFromApi[i - 1].url + '" style="width: 100%">' +
                '</div>';

            thumbnails += '<div class="column">' +
                '<img class="photo cursor" style="width: 100%" src="' + respFromApi[i - 1].thumbnailUrl + '" onclick="currentSlide(' + i + ')" alt="' + respFromApi[i - 1].title + '">' +
                '</div>';
        }
        page.innerHTML += slides;
        page.innerHTML += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>' +
            '<a class="next" onclick="plusSlides(1)">&#10095;</a>' +
            '<div class="caption-container">' +
            '<p id="caption"></p>' +
            '</div>';

        page.innerHTML += thumbnails + '</div></div>';

        showSlides(slideIndex)
    }
}

customElements.define('gallery-component', GalleryComponent);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("photo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}