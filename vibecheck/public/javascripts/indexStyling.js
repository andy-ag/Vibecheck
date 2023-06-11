const image_src_crop = 'https://i.imgur.com/q7Vt0RY.png'
const image_src_full = 'https://cdn.discordapp.com/attachments/1093240258302324878/1111576132937072670/andy_agv_large_esoteric_retro_cyberpunk_machine_that_checks_and_58405921-e3bd-4e64-a02e-13e6827c2fbd.png'
const image = document.getElementById('landing-background')
image.src = image_src_full
const homepageWrapper = document.getElementById('homepage-wrapper')
const homepageTextbox = document.getElementById('homepage-textbox')
const introText = document.getElementById('intro-text')

introText.style.boxShadow = `0 0 20px 0 ${violet}`
image.style.boxShadow = `0 0 20px 0 ${violet}`