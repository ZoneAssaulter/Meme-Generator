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
