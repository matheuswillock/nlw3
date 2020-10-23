// create map
const map = L.map('mapid').setView([-23.5447599,-46.9357127], 16);

// create and tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    
})

let marker; // Vaiável undefined propositalmente, para ser sempre alterada posteriormente.

// create and add marker 
map.on('click', (event) => {   
    const lat = event.latlng.lat; // Latitude
    const lng = event.latlng.lng; // Longitude

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // Remover icon
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map) // Toda vez que clickarmos no mapa será add um icon.

    /*
    Function map.on() {}
    Criada para receber todos os eventos ali realizados dentro do mapa, evento = click.
    Após o click do client, no mapa, a função irá capturar a Latitude e Longitude e inserir um icon no local específco.
    O método nativo '.on' serve para criarmos eventos que serão capturados dentro do local, onclick/ doubleclick.

    Para evitar várias marcações desnecessárias simultâneas, o script irá analisar se já há um marker no mapa, se sim irá excluir o anterior e inserir um novo, se não irá inserir o primeiro.

    Para fazermoso tratamento da localização no nosso banco de dados precisamos enviar para os BC as lat e lng selecionadas. Então vamos selecionar os inputs escondidos da lat e lng e encaminha-los ao BC para serem tratados posteriormente.
*/
})

// add campos de fotos
function addPhotoField() {
    // Selecionar o container de foto #images
    const container = document.querySelector('#images');

    // Selecionar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload');

    // Reaizar o clone da última imagem adcionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

    // Verificar se o campo está vazio, se sim, não clonar o container de imagens.
    const input = newFieldContainer.children[0];

    if (input.value == '' ) {
        return
    } else {
        // Limpar o campo antes de adicionar o container de imagens
    input.value = ''
    }    

    // Adcionar o clone ao container de #images.
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if(fieldsContainer.length <= 1) {
        // Limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    } else {
        // Deletar o campo
        span.parentNode.remove()
    }
}

// Troca do sim / não.
function toggleSelect(event) {
    // retirar a class .active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active'))

    // colocar a clas .active nesse botao clicado 
    // Pegar o botão clickado
    const button = event.currentTarget
    button.classList.add('active')

    // Atualizar o meu input hidden como valor selecionado
    const input = document.querySelector('[name="open-on-weekends"]')    

    // Verificar se é, sim ou não.   
    input.value = button.dataset.value   
}
