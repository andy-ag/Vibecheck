//! Script to orchestrate canvas operations
document.addEventListener('click', e => {
  let clicker = e.target.id
  switch (clicker) {
      case image: {
          togglePopup(imgPopup)
      }
      break
      case text: addDiv()
      break
      case link: togglePopup(linkPopup)
      break
      case cancelImg.id: togglePopup(imgPopup)
      break
      case submitImg.id: {
          addDiv_image()
          imgUrl.innerText=''
          togglePopup(imgPopup)
      }
      break
      case cancelLink.id: togglePopup(linkPopup)
      break
      case submitLink.id: {
          addLink()
          linkUrl.innerText=''
          linkText.innerText=''
          togglePopup(linkPopup)
      }
      break
      case submitName.id: {
        vibenameH1.innerText = vibenameInput.value
        newVibe.name = vibenameInput.value
      }
  }
})

document.addEventListener('click', e => {
  let clicker = e.target.id
  if (clicker.startsWith('delete')) {
    newVibe.removeItem(e.target)  
    deleteElement(getNumericId(e.target))
  }
})

document.addEventListener('click', e => {
  let clicker = e.target.id
  if (clicker === 'save') {
    makeTextNonEditable()
    headersOff()
    saveVibe()
  }
})

document.addEventListener('click', e => {
if (e.target.id === 'toggle-headers') {
  toggleHeaders()
}
})

const image = document.getElementById('image').id
const text = document.getElementById('text').id
const link = document.getElementById('link').id

const saveUrl = '/vibes'

const canvas = document.getElementById('canvas')
const CANVAS_HEIGHT = canvas.style.height
const CANVAS_WIDTH = canvas.style.width
const imgPopup = document.getElementById('image-popup')
const linkPopup = document.getElementById('link-popup')
const imgUrl = document.getElementById('add-url')
const submitImg = document.getElementById('submit-image')
const cancelImg = document.getElementById('cancel-image')
const submitLink = document.getElementById('submit-link')
const cancelLink = document.getElementById('cancel-link')
const linkUrl = document.getElementById('add-link')
const linkText = document.getElementById('link-text')
const submitName = document.getElementById('vibename-submit')
const vibenameInput = document.getElementById('vibename')
const vibenameH1 = document.getElementById('vibename-h1')

let idAssigner = 0

class Vibe{
constructor(name) {
  this.name = name
  this.items = []
}

addItem(element) {
  this.items.unshift(new Item(element.id))
}

removeItem(element) {
  const removalIndex = this.items.findIndex(item => item.itemId === getNumericId(element))
  this.items.splice(removalIndex, 1)
}

getValues() {
  for (let item of this.items) {
    item.getValue()
  }
}
}

class Item{
constructor(itemId) {
  this.itemId = itemId
  this.content = null
}

getValue() {
  const element = document.getElementById(this.itemId)
  this.content = element.outerHTML
}
}

newVibe = new Vibe('unnamed')

async function saveVibe() {
newVibe.getValues()
try {
  const response = await fetch(saveUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify(newVibe)
  })
  if (response.redirected) {
    window.location.href = response.url;
}
} catch (error) {
    console.log(error)
}
}

function addDiv() {
  let element = document.createElement('div')
  element.classList.add('text')
  element.classList.add('drag-resize')
  element.id = idAssigner
  idAssigner++
  canvas.appendChild(element)
  let header = document.createElement('div')
  header.id = `${element.id}header`
  header.classList.add('header')
  header.style.visibility = 'visible'
  element.appendChild(header)
  let button = document.createElement('button')
  button.id = `delete${element.id}`
  button.innerText = 'X'
  header.appendChild(button)
  let textdiv = document.createElement('div')
  textdiv.classList.add('textbox')
  element.appendChild(textdiv)
  textdiv.contentEditable = "true"
  newVibe.addItem(element)
}

function togglePopup(popup) {
if (popup.style.visibility === 'visible') {
  popup.style.visibility = 'hidden'
} else {
  popup.style.visibility = 'visible' 
}
}

function addDiv_image() {
let element = document.createElement('div')
element.classList.add('image')
element.classList.add('drag-resize')
element.id = idAssigner
idAssigner++
canvas.appendChild(element)
let header = document.createElement('div')
header.id = `${element.id}header`
header.classList.add('header')
header.style.visibility = 'visible'
element.appendChild(header)
let button = document.createElement('button')
button.id = `delete${element.id}`
button.innerText = 'X'
header.appendChild(button)
let image = document.createElement('img')
image.src = imgUrl.innerText.trim()
element.appendChild(image)
newVibe.addItem(element)
}

function addLink() {
let element = document.createElement('div')
element.classList.add('link')
element.classList.add('drag-resize')
element.id = idAssigner
idAssigner++
canvas.appendChild(element)
let header = document.createElement('div')
header.id = `${element.id}header`
header.classList.add('header')
header.style.visibility = 'visible'
element.appendChild(header)
let button = document.createElement('button')
button.id = `delete${element.id}`
button.innerText = 'X'
header.appendChild(button)
let link = document.createElement('a')
link.target = '_blank'
link.classList.add('linkbox')
element.appendChild(link)
if (linkUrl.innerText.trim().includes('http')) {
  link.href = linkUrl.innerText.trim()
} else {
  link.href = `https://${linkUrl.innerText.trim()}`
}
if (linkText.innerText) {
  link.innerText = linkText.innerText
} else {
  link.innerText = linkUrl.innerText.trim()
}
newVibe.addItem(element)
}

function deleteElement(id) {
  document.getElementById(id).remove()
}

function getNumericId(element) {
return element.id.replace(/\D/g, '')
}

function toggleHeaders() {
const headers = document.getElementsByClassName('header')
for (let i=0; i<headers.length; i++) {
  if (headers[i].style.visibility === 'visible') {
    headers[i].style.visibility = 'hidden'
  } else {
    headers[i].style.visibility = 'visible'
  }
}
}

function makeTextNonEditable() {
const textDivs = document.getElementsByClassName('text')
for (let i=0; i<textDivs.length; i++) {
  console.log(textDivs[i])
  textDivs[i].lastChild.contentEditable = 'false'
}
}

function headersOff() {
const headers = document.getElementsByClassName('header')
for (let i=0; i<headers.length; i++) {
  headers[i].style.visibility = 'hidden'
}
}

function headersOn() {
const headers = document.getElementsByClassName('header')
for (let i=0; i<headers.length; i++) {
  headers[i].style.visibility = 'visible'
}
}
