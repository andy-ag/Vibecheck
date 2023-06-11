const tiling_src = 'https://1.bp.blogspot.com/-JKIEUkNZ3NQ/Xdp0zbaStpI/AAAAAAAAMQQ/a5kMu4CVlkYbHgO3AbU9fwEW_JPXRHvhgCEwYBhgL/s1600/tiles_seamless_simple_white_texture.jpg'
const body = document.body
const banner = document.getElementById('banner')
const height = extractNumbers(banner.style.height)
const native_dimension = 650
const originalWidth = 1800
const ratio = originalWidth/14
let screenWidth = window.innerWidth

const teal = 'rgb(164, 251, 202)'
const violet = 'rgb(187, 186, 255)'
const acid = 'rgb(143, 239, 73)'
const fuchsia = 'rgb(248, 135, 239)'

// window.addEventListener('resize')
window.addEventListener('resize', createTiling)
banner.style.boxShadow = `0 0 20px 0 ${violet}`

createTiling()

function columnCalculator(width) {
    return Math.round(width/ratio)
}

function createTiling() {
    removeImages()
    const newWidth = window.innerWidth
    const cols = columnCalculator(newWidth)
    banner.style.gridTemplateRows = 'repeat(1, 1fr)'
    banner.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
    for (let i=0; i<cols; i++) {
        const image = document.createElement('img')
        image.src = tiling_src
        image.style.height = '125px'
        image.style.width = '100%';
        banner.appendChild(image) 
    }
}

function extractNumbers(string) {
    return string.replace(/\D/g, '')
}

function removeImages() {
    document.querySelectorAll("#banner img").forEach(img => img.remove());
}