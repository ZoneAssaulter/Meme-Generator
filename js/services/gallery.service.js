'use strict'

let gKeywords = []
let gImgs = [
  {
    id: 1,
    url: 'img/memes/1.jpg',
    keywords: ['woman', 'sarcastic', 'calm'],
  },
  {
    id: 2,
    url: 'img/memes/2.jpg',
    keywords: ['trump', 'man', 'funny'],
  },
  {
    id: 3,
    url: 'img/memes/3.jpg',
    keywords: ['cute', 'dog'],
  },
  {
    id: 4,
    url: 'img/memes/4.jpg',
    keywords: ['baby', 'cute', 'dog'],
  },
  {
    id: 5,
    url: 'img/memes/5.jpg',
    keywords: ['baby', 'motivating'],
  },
  {
    id: 6,
    url: 'img/memes/6.jpg',
    keywords: ['cat', 'cute', 'calm'],
  },
  {
    id: 7,
    url: 'img/memes/7.jpg',
    keywords: ['funny', 'sarcastic', 'movie'],
  },
  {
    id: 8,
    url: 'img/memes/8.jpg',
    keywords: ['baby', 'cute', 'funny'],
  },
  {
    id: 9,
    url: 'img/memes/9.jpg',
    keywords: ['man', 'funny'],
  },
  {
    id: 10,
    url: 'img/memes/10.jpg',
    keywords: ['funny', 'man', 'rage'],
  },
  {
    id: 11,
    url: 'img/memes/11.jpg',
    keywords: ['funny', 'man'],
  },
  {
    id: 12,
    url: 'img/memes/12.jpg',
    keywords: ['funny', 'man'],
  },
  {
    id: 13,
    url: 'img/memes/13.jpg',
    keywords: ['kids', 'funny'],
  },
  {
    id: 14,
    url: 'img/memes/14.jpg',
    keywords: ['trump', 'manm', 'funny'],
  },
  {
    id: 15,
    url: 'img/memes/15.jpg',
    keywords: ['kid', 'cute', 'funny'],
  },
  {
    id: 16,
    url: 'img/memes/16.jpg',
    keywords: ['dog', 'cute', 'funny'],
  },
  {
    id: 17,
    url: 'img/memes/17.jpg',
    keywords: ['obama', 'man', 'funny', 'bad president'],
  },
  {
    id: 18,
    url: 'img/memes/18.jpg',
    keywords: ['man'],
  },
  {
    id: 19,
    url: 'img/memes/19.jpg',
    keywords: ['motivational', 'man', 'funny'],
  },
  {
    id: 20,
    url: 'img/memes/20.jpg',
    keywords: ['man', 'movie'],
  },
  {
    id: 21,
    url: 'img/memes/21.jpg',
    keywords: ['man', 'movie', 'funny'],
  },
  {
    id: 22,
    url: 'img/memes/22.jpg',
    keywords: ['woman', 'funny'],
  },
  {
    id: 23,
    url: 'img/memes/23.jpg',
    keywords: ['movie', 'man', 'funny'],
  },
  {
    id: 24,
    url: 'img/memes/24.jpg',
    keywords: ['man', 'bad president', 'putin'],
  },
  {
    id: 25,
    url: 'img/memes/25.jpg',
    keywords: ['movie', 'cute', 'funny'],
  },
]

function createKeywordsList() {
  const set = new Set()
  gImgs.forEach((img) => img.keywords.forEach((keyword) => set.add(keyword)))
  set.forEach((keyword) => gKeywords.push({ name: keyword, searchCount: 0 }))
}

function getKeywords() {
  return gKeywords
}

function updateKeyWordCount(keywordSearched) {
  const keyword = gKeywords.find((keyword) => keyword.name === keywordSearched)
  if (!keyword || keyword.searchCount === 25) return
  keyword.searchCount++
}

function getImgsForDisplay(keyword) {
  if (!keyword) return gImgs
  return gImgs.filter((img) => {
    const regex = new RegExp('^' + keyword, 'm')
    return img.keywords.find((keyword) => keyword.match(regex))
  })
}
