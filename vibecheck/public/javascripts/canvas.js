//! Script to monitor canvas operations
// Adding divs based on form
//TODO add layering for images - active image always first
//TODO test browserify

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
    }
})

document.addEventListener('click', e => {
    let clicker = e.target.id
    if (clicker.startsWith('delete')) {
      newVibe.removeItem(e.target)  
      deleteElement(getNumericId(e.target))
    }
})


//TODO Check: can viewwindow fit full canvas? If so, display normal
//TODO If not: shrink canvas and all elements proportionally
//TODO potential issue with spotify widget

// clientX, clientY track x,y client coords
//TODO command to get coordinates of div-bounding client rectangle
// let coords = []
// let getCoordsRectangle = element.getBoundingClientRec()
// console.log(rect.top, rect.right, rect.bottom, rect.left)
//TODO delete functionality
//TODO fix functionality - iterate over elements and hide headers


const image = document.getElementById('image').id
const text = document.getElementById('text').id
const link = document.getElementById('link').id

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

//TODO largest value of id needs to be retrieved, incremented 

//TODO relative page position finder
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
    const removalIndex = this.items.findIndex(item => item.itemId === element.id)
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
    this.value = null
  }

  getValue() {
    const element = document.getElementById(this.itemId)
    this.value = element.outerHTML
  }
}

newVibe = new Vibe('unnamed')

function addDiv() {
    let element = document.createElement('div')
    element.classList.add('text')
    element.id = idAssigner
    idAssigner++
    canvas.appendChild(element)
    let header = document.createElement('div')
    header.id = `${element.id}header`
    header.classList.add('drag')
    element.appendChild(header)
    let button = document.createElement('button')
    button.id = `delete${element.id}`
    button.innerText = 'X'
    header.appendChild(button)
    let textdiv = document.createElement('div')
    textdiv.classList.add('textbox')
    element.appendChild(textdiv)
    textdiv.contentEditable = "true"
    makeDraggable(element)
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
  element.id = idAssigner
  idAssigner++
  canvas.appendChild(element)
  let header = document.createElement('div')
  header.id = `${element.id}header`
  header.classList.add('drag')
  element.appendChild(header)
  let button = document.createElement('button')
  button.id = `delete${element.id}`
  button.innerText = 'X'
  header.appendChild(button)
  let image = document.createElement('img')
  image.src = imgUrl.innerText.trim()
  element.appendChild(image)
  makeDraggable(element)
  newVibe.addItem(element)
}

function addLink() {
  let element = document.createElement('div')
  element.classList.add('link')
  element.id = idAssigner
  idAssigner++
  canvas.appendChild(element)
  let header = document.createElement('div')
  header.id = `${element.id}header`
  header.classList.add('drag')
  element.appendChild(header)
  let button = document.createElement('button')
  button.id = `delete${element.id}`
  button.innerText = 'X'
  header.appendChild(button)
  let link = document.createElement('a')
  link.target = '_blank'
  link.classList.add('textbox')
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
  makeDraggable(element)
  newVibe.addItem(element)
}

function deleteElement(id) {
    document.getElementById(id).remove()
}

function getNumericId(element) {
  return element.id.replace(/\D/g, '')
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(element.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

