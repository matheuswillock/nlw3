const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
    
}

// create map
const map = L.map('mapid', options).setView([-23.5447599,-46.9357127], 16);

// create and tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})


// create and add marker
L.marker([-23.5447599,-46.9357127], { icon })
.addTo(map)

// img gallery
function selectImage(event) {
    // btn clickado
    const button = event.currentTarget

    // buscar todos os botões com a classe .active
    const buttons = document.querySelectorAll(".images button")    
    // Remover todas as classes .active 
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button) {
        button.classList.remove('active')
    }
    // Selecionar a img clickada.
    const image = button.children[0]
    const imageContainer = document.querySelector('.orphanage-details > img')

    // Atualizar o container de img.
    imageContainer.src = image.src
    
    // Adcionar  class .active para obutton que for selecionado.
    button.classList.add('active')
}


