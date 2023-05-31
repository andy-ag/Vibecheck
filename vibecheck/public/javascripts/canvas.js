//! Script to monitor canvas operations
// Adding divs based on form
//TODO add layering for images - active image always first

document.addEventListener('click', e => {
    let clicker = e.target.id
    switch (clicker) {
        case image: {
            toggleImageURLPopup()
        }
        break
        case text: addDiv(text)
        break
        // case link: addDiv(link)
    }
})

document.addEventListener('click', e => {
    let clicker = e.target.id
    switch (clicker) {
        case cancelImg.id: toggleImageURLPopup()
        break
        case submitImg.id: {
            addImage()
            imgUrl.innerText=''
            toggleImageURLPopup() 
        }
    }
})

// clientX, clientY track x,y client coords
//TODO command to get coordinates of div-bounding client rectangle
// let coords = []
// let getCoordsRectangle = element.getBoundingClientRec()
// console.log(rect.top, rect.right, rect.bottom, rect.left)
//TODO delete functionality

const image = document.getElementById('image').id
const text = document.getElementById('text').id
const link = document.getElementById('link').id

const popup = document.getElementById('image-popup')
const imgUrl = document.getElementById('add-url')
const submitImg = document.getElementById('submit-image')
const cancelImg = document.getElementById('cancel-image')


let idAssigner = 0

function addDiv(type) {
    let element = document.createElement('div')
    element.classList.add(type)
    element.id = idAssigner
    idAssigner++
    document.body.appendChild(element)
    let header = document.createElement('div')
    header.id = `${element.id}header`
    header.classList.add('drag')
    element.appendChild(header)
    let textdiv = document.createElement('div')
    textdiv.classList.add('textbox')
    element.appendChild(textdiv)
    textdiv.contentEditable = "true"
    makeDraggable(element)
}

function toggleImageURLPopup() {
    if (popup.style.visibility === 'visible') {
        popup.style.visibility = 'hidden'
    } else {
        popup.style.visibility = 'visible' 
    }
}

function addImage() {
    let image = document.createElement('img')
    image.id = idAssigner
    image.classList.add('image')
    idAssigner++
    image.src = imgUrl.innerText.trim()
    makeDraggable(image)
    document.body.appendChild(image)
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