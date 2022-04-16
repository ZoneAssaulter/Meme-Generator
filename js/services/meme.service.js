'use strict'

const STORED_MEMES = 'memesData'

let isSecLine = true
let gMemesData
let gMeme = {
  selectedImgId: 0,
  SelectedLineIdx: 0,
  lines: [
    {
      txt: 'Insert Your Text Here',
      size: 40,
      align: 'center',
      pos: {
        x: 250,
        y: 50,
      },
      fontFam: 'impact',
      fillColor: '#ffffff',
      StrokeColor: '#000000',
      isDrag: false,
    },
  ],
}

function getMeme() {
  return gMeme
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
  if (gMeme.SelectedLineIdx < 0) return
  getSelectedLine().txt = txt
}

function setColor(color, part) {
  if (gMeme.SelectedLineIdx < 0) return
  getSelectedLine()[part] = color
}

function setFontSize(diff) {
  const currLine = getSelectedLine()
  if (gMeme.SelectedLineIdx < 0) return
  if ((currLine.size + diff) === 5 || currLine.size + diff === 100) return
  currLine.size += diff
}

function switchLine(lineIdx) {
  if (lineIdx || lineIdx === 0) gMeme.SelectedLineIdx = lineIdx
  else
    gMeme.SelectedLineIdx =
      gMeme.SelectedLineIdx === gMeme.lines.length - 1
        ? 0
        : gMeme.SelectedLineIdx + 1
}

function setFontFam(fontFam) {
  if (gMeme.SelectedLineIdx < 0) return
  getSelectedLine().fontFam = fontFam
}

function setAlign(align) {
  if (gMeme.SelectedLineIdx < 0) return
  getSelectedLine().align = align
  let x
  if (align === 'start') x = 10
  else if (align === 'center') x = gCanvas.width / 2
  else if (align === 'end') x = gCanvas.width - 10
  getSelectedLine().pos.x = x
}

function addLine(txt = '*meme text*') {
  const line = {
    txt,
    size: 40,
    align: 'center',
    pos: {
      x: gCanvas.width / 2,
      y: gCanvas.height / 2,
    },
    fontFam: 'impact',
    fillColor: '#ffffff',
    StrokeColor: '#000000',
    isDrag: false,
  }
  if (isSecLine) line.pos.y = gCanvas.height - 50
  isSecLine = false
  gMeme.lines.push(line)
  switchLine(gMeme.lines.length - 1)
}

function deleteLine() {
  if (gMeme.SelectedLineIdx < 0) return
  if (!getSelectedLine()) return
  gMeme.lines.splice(gMeme.SelectedLineIdx, 1)
  if (!gMeme.lines.length) gMeme.SelectedLineIdx = -1
}

function isLineClicked(pos) {
  return gMeme.lines.findIndex((line) => {
    const x = line.pos.x
    const y = line.pos.y
    const lineHeight = line.size + 20
    const lineWidth = gCtx.measureText(line.txt).width
    if (line.align === 'start') {
      return (
        pox.x > x &&
        pos.y > y - lineHeight / 2 &&
        pos.x < x + lineWidth &&
        pos.y < y - lineHeight / 2 + lineHeight
      )
    } else if (line.align === 'center') {
      return (
        pos.x > x - lineWidth / 2 &&
        pos.y > y - lineHeight / 2 &&
        pos.x < x - lineWidth / 2 + lineWidth &&
        pos.y < y - lineHeight / 2 + lineHeight
      )
    } else if (line.align === 'end') {
      return (
        pos.x > x - lineWidth &&
        pos.y > y - lineHeight / 2 &&
        pos.x < x + lineWidth &&
        pos.y < y - lineHeight / 2 + lineHeight
      )
    }
  })
}

function setLineDrag (isDrag) {
    if(gMeme.SelectedLineIdx < 0 ) return
    getSelectedLine().isDrag = isDrag
}

function moveLine(dx, dy) {
    getSelectedLine().pos.x +=dx
    getSelectedLine().pos.y +=dy
}

function loadMemes() {
    gMemesData = loadFromStorage(STORED_MEMES)
    if(!gMemesData) gMemesData = []
}

function saveMeme(memeData) {
    gMemesData.push(memeData)
    saveToStorage(STORED_MEMES, gMemesData)
}

function getMemesData() {
    return gMemesData
}

function resetMeme() {
    gMeme = {
        selectedImgId: 0,
        SelectedLineIdx: -1,
        lines: []
    }
}

function deleteMeme(savedIdx){
    gMemesData.splice(savedIdx,1)
    saveToStorage(STORED_MEMES, gMemesData)
}

function getSelectedLine() {
    return gMeme.lines[gMeme.SelectedLineIdx]
}

function setLinesPos(centerX){
    gMeme.lines.forEach(line => line.pos.x = centerX)
}