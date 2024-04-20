//імпорт сталих змінних
import { images, domGallery } from "./const.js";

// генеруємо шаблонні строки до кожного item of items
function createGalleryMarkup(items) {
  return items
    .map(
      (item) =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${item.original}">
        <img
        class="gallery-image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"/>
        </a>
        </li>`
    )
    .join("");
}
// додаю змінну для отримання шаблонних строк
const addGalleryMarkup = createGalleryMarkup(images);

// додаємо шаблонну строку addGalleryMarkup до DOM - "ul.gallery"
domGallery.innerHTML = addGalleryMarkup;

// навіщування event на domGallery по кліку на domGallery
domGallery.addEventListener("click", onImageClick);

//callback функція для відображення збільшеної картинки
function onImageClick(event) {
  //заборона стандартних дій, заавнтаження файлу картинки
  blockStandrtAction(event);

  //перевірка кліку на IMG
  if (event.target.nodeName !== "IMG") {
    return;
  }

  //пошук елементу у масиві для заповлення ALT
  const currentImage = images.find(
    (item) => item.original === event.target.dataset.source
  );

  //використовуємо бібліотеку basicLightbox
  const instance = basicLightbox.create(`
        <img src="${currentImage.original}" alt="${currentImage.description} "/>
  `);

  //показуємо модальне вікно із instance
  instance.show();

  //навішування  event на window по кнопці "Escape" для виходу з модалки
  window.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      instance.close();
    }
  });
}

/**
 * Блокування стандарної поведінки
 * @param {*} event Dom елемент
 */
function blockStandrtAction(event) {
  event.preventDefault();
}
