// OBTENGO ELEMENTOS HTML GENERALES
const container = document.getElementById('container');
const more = document.getElementById('more');

// OBTENGO ELEMENTOS HTML  DE CARD
const cardModel = document.getElementsByClassName('card')[0]; 
const smallPictureModel = document.getElementsByClassName('small-picture')[0];
const fullnameModel = document.getElementsByClassName('fullname')[0];
const cityModel = document.getElementsByClassName('city')[0];
const stateModel = document.getElementsByClassName('state')[0];

// OBTENGO ELEMENTOS HTML DE CARD-MODAL
const cardModal = document.getElementById('card-modal');
const modal = document.getElementById('modal');
const largePicture = document.getElementById('large-picture');
const username = document.getElementById('username');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const close = document.getElementById('close');

// OBTENER LA INFORMACION
const getInfo = (data) => {
  smallPictureModel.src = data.picture.thumbnail;
  largePicture.src = data.picture.large;
  firstname.innerText = data.name.first;
  lastname.innerText = data.name.last;
  fullnameModel.innerText = `${data.name.first} ${data.name.last}`;
  username.innerText = data.login.username;
  email.innerText = data.email;
  cityModel.innerText = data.location.city;
  stateModel.innerText = data.location.state;
}

// CARGAR 20 RESULTADOS
const loadResults = () => {
  fetch('https://randomuser.me/api/?results=60&nat=us&inc=name,location,email,picture,login')
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    // VACIO CONTAINER
    container.innerHTML='';
    // POR CADA RESULTADO OBTENIDO:
    for (let result of results) {
      // OBTENGO LA INFO
      getInfo(result);
        // CLONO EL MODELO CARD
        let newCardModel = cardModel.cloneNode(true);
        // APENDEO EL NUEVO CLON DE CARD AL CONTAINER
        newCardModel.onclick = () => {showModalInfo(result)};
        container.appendChild(newCardModel);
    };    
  });
}

// CARGAR RESULTADOS
loadResults();

// CARGAR MAS RESULTADOS
const loadMoreResults = () => {
  loadResults()
}

// MOSTRAR MODAL
const showModalInfo = (data) => {
  getInfo(data);
  cardModal.classList.toggle('hide');
}

// OCULTAR MODAL
const hideModalInfo = () => {
  cardModal.classList.toggle('hide');
}

// ONCLICK
close.onclick = () => {hideModalInfo()};
more.onclick = () => {loadMoreResults()};