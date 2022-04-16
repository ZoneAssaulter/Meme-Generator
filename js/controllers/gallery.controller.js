'use strict'

function initGallery() {
  createKeywordsList()
  renderKeywords()
  renderGallery()
}

function renderGallery(keyword) {
  document.querySelector('.more-btn').innerText = 'More'
  const imgs = getImgsForDisplay(keyword)
  let imgsHTMLs = imgs.map((img) => {
    return `<img class="gallery-img" src="${img.url}" onclick="onImgSelect(${img.id})">`
  })
  if (!imgs.length) imgsHTMLs = `<p>No results</p>`
  imgsHTMLs.unshift(
    `<label class="file-input gallery-img" name="image" onchange="onImgInput(event)"><span>+Upload photo</span><input type="file"/></label>`
  )
  document.querySelector('.gallery .images-container').innerHTML =
    imgsHTMLs.join('')
  if (!keyword) document.querySelector('.search-bar input').value = ''
}

function renderKeywords(isMoreOpen) {
  const keywords = getKeywords()
  let keywordsNum = isMoreOpen ? keywords.length : 8
  let datalistHTMLs = ''
  let keywordsFilter = []
  keywords.forEach((keyword) => {
    datalistHTMLs += `<option value="${keyword.name}"</option>`
    keywordsFilter.push(
      `<button style="font-size:
      ${keyword.searchCount * 0.4 + 11}px;" onclick="onKeyword('${keyword.name}')">${keyword.name}</button>`
    )
  })
  keywordsFilter.unshift(`<button class"all-btn" onclick="renderGallery()">All</button>`)
  document.querySelector('.keywordsData').innerHTML = datalistHTMLs
  document.querySelector('.filter-words-container').innerHTML = keywordsFilter.slice(0,keywordsNum).join('')
}

function onKeyword(keyword){
    updateKeyWordCount(keyword)
    document.querySelector('.search-bar input').value = keyword
    renderKeywords()
    renderGallery(keyword)
}

function onToggleMenu() {
    document.querySelector('nav').classList.toggle('open');
    document.querySelector('.main-screen').classList.toggle('open')
}

function onImgSelect(imgId){
    openEditor()
    initMeme(imgId)
}

function onImgInput(ev){
    loadImageFromInput(ev, DrawUploadedImg)
}

function DrawUploadedImg(img){
    document.querySelector('.test-img').src = img.src
    onImgSelect(0)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = (event) => {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function openEditor() {
    navigateTo('editor')
    document.body.classList.add('background')
}

function onMoreKeywords(elMoreBtn){
    const isOpen = (elMoreBtn.innerText === 'More')
    elMoreBtn.innerText = (isOpen) ? 'Less' : 'More'
    renderKeywords(isOpen)
}