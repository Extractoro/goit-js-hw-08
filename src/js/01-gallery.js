// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery')
const galleryMarkup = createGalleryMarkup(galleryItems)
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)

function createGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
        `;
    }).join('')
}

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: 'alt',
    captionDelay: 250,
})