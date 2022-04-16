'use strict';

function initSaved() {
  loadMemes();
  renderSaved();
}

function renderSaved() {
  const memesData = getMemesData();
  let savedHTMLs = [];
  if (!memesData.length) savedHTMLs = [`<p>No saved photos yet</p>`];
  else
    savedHTMLs = memesData.map(
      (memeData, i) =>
        `<div class="gallery-img"><img src="${memeData}" onclick="onOpenSaved(this.src)"><button class="delete-saved-btn fas fa-trash-alt fa-2x" onclick="onDeleteSaved(${i})"></button></div>`
    );
  document.querySelector('.saved .images-container').innerHTML =
    savedHTMLs.join('');
}

function onOpenSaved(savedSrc) {
  document.querySelector('.test-img').src = savedSrc;
  resetMeme();
  onImgSelect(0);
}

function onDeleteSaved(savedIdx) {
  if (!confirm('Are you sure?')) return;
  deleteMeme(savedIdx);
  renderSaved();
}
