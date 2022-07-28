import {updateGame} from "./firebase.js";
const main = document.querySelector('#container-cards');
const products = [];

window.addEventListener('DOMContentLoaded', async () => {
  updateGame((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      createProducts(doc.data());
      products.push(doc.data());
    })
  })
})

const header = document.querySelector('#header');
const nav = document.querySelector('#nav');
const compras = document.querySelector('#compras');
const btnCreate = document.querySelector('#btn-create');
let imgSelected = ' ';
let idProduct = 55;
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('#close-modal');
const newName = document.querySelector('#new-name');
const newPlatform = document.querySelector('#select-platform');
const newType = document.querySelector('#select-type');
const newPrice= document.querySelector('#new-price');
const newImage = document.querySelector('#new-image');
const btnNewProduct = document.querySelector('#btn-new-create');
const filterXPrice = document.querySelector('#filterXPrice');
const filterXCategory = document.querySelector('#filterXCategory');
const counter_label = document.getElementById('counter-label');


// ALL GAMES 
const btnGames = document.querySelector('#btn-games')

// Log In
const log = document.querySelector('.log')


// AGREGAR AL CARRITO
const shopping_card = document.querySelector('#products');
const overlay = document.querySelector("#overlay");
const popup= document.querySelector("#popup");
const btn_close_popup = document.querySelector("#btn-close-popup");
const shoppingCart_container= document.querySelector(".shoppingCart-container");
const total =document.querySelector('#total');
let games_cart=[];
const buy = document.querySelector('#buy');
const empty = document.querySelector('#empty');

// VACIAR CARRITO

// GO TO HOME
const startGo = document.getElementById('goStart');
startGo.addEventListener('click', start);
function start() {
  window.location.href= "./inicio.html";
}



// CONTACT US
const icon = document.querySelector('.container-contact');
const contact = document.querySelector("#contact");
const cont= document.querySelector("#cont-window");
const btn_close_contact = document.querySelector("#btn-close-contact");

// CONFIRM BUY
const confirm = document.getElementById('confirm');
const cont_confirm = document.getElementById('cont-confirm')
const btnCancel = document.getElementById('cancel')
const btnConfirm = document.getElementById('okey')
const textBuy = document.getElementById('text')


btnGames.addEventListener('click', allGames);
btnCreate.addEventListener('click',showModal);
btnNewProduct.addEventListener('click', createNewProducts);
newImage.addEventListener('change', importImage);
closeModal.addEventListener('click', removeModal);
filterXPrice.addEventListener('change', filterPrice);
filterXCategory.addEventListener('change', filterCategory);
icon.addEventListener('click', showContact)
log.addEventListener('click', logIn);
buy.addEventListener('click', buyProducts);
empty.addEventListener('click', emptyCart);
btnCancel.addEventListener('click', cancel);
btnConfirm.addEventListener('click', confirmBuy);


function confirmBuy() {
  textBuy.textContent = 'Thanks For Your Purchase'
  if (textBuy.textContent === 'Thanks For Your Purchase') {
    btnCancel.textContent = 'Close'
    btnConfirm.style.display = 'none'

  }
  buy.style.display = 'none'

  emptyCart()
  close_cart()
  main.style.filter = 'blur(3px)';
}

function cancel() {
  confirm.classList.remove('activate')
  cont_confirm.classList.remove('activate')
  popup.style.filter = 'none';
  textBuy.textContent = 'Are you sure you want to buy these products?'
  btnConfirm.style.display = 'flex'
  main.style.filter = 'none';

}


function buyProducts() {
  confirm.classList.add('activate')
  cont_confirm.classList.add('activate')
  main.style.filter = 'blur(3px)';
  header.style.filter = 'blur(3px)'
  compras.style.filter = 'blur(3px)';
  nav.style.filter = 'blur(3px)';
  popup.style.filter = 'blur(2px)';
}

function showContact() {
  contact.classList.add('activate');
  cont.classList.add('activate');
  main.style.filter = 'blur(2px)';
  header.style.filter = 'blur(2px)'
  compras.style.filter = 'blur(2px)';
  nav.style.filter = 'blur(2px)';
}

function emptyCart() {
  shoppingCart_container.innerHTML = '';
  games_cart = []
  
  const div = document.createElement('div');
  div.classList.add('message')

  const p = document.createElement('p')
  p.textContent = 'Empty Cart'

  const image = document.createElement('img')
  image.setAttribute('src', 'Images/borrar.png')
  image.classList.add('icon-mail')

  div.appendChild(p)
  div.appendChild(image)
  shoppingCart_container.appendChild(div)
  counter_label.textContent = 0

  popup.classList.remove('activate')
  main.style.filter = 'none';
  header.style.filter = 'none';
  compras.style.filter = 'none';
  nav.style.filter = 'none';
  buy.style.display = 'none'
  
}

function logIn() {
  window.location.href = "/logIn.html"
}
function allGames() {
  return renderCards()
}


btn_close_contact.addEventListener('click', close_section)
function close_section(){
  contact.classList.remove('activate');
  cont.classList.remove('activate');
  main.style.filter = 'none';
  header.style.filter = 'none';
  compras.style.filter = 'none';
  nav.style.filter = 'none';
}

function filterPrice(event) {
    const responseFilter = event.target.value === 'gratuito'
    ? products.filter(element => element.price === 0)
    : event.target.value === '$9.00 - $20.00'
    ? products.filter(element => element.price >= 9 && element.price <= 20)
    : event.target.value === '$21.00 - $40.00'
    ? products.filter(element => element.price >= 21 && element.price <= 40)
    : event.target.value === '$41.00 - $60.00'
    ? products.filter(element => element.price >= 41 && element.price <= 60)
    : event.target.value === '$61.00'
    ? products.filter(element => element.price >= 61)
    : null;

    main.innerHTML = '';
    responseFilter.map(element => createProducts(element))
}
function filterCategory(event) {
  const category = event.target.value === "Accion"
  ? products.filter(element => element.type === "Acción")
  : event.target.value === 'Aventura'
  ? products.filter(element => element.type === "Aventura")
  : event.target.value === "Disparo"
  ? products.filter(element => element.type === "Juego de disparos")
  : event.target.value === "Deportes"
  ? products.filter(element => element.type === "Deportes")
  : event.target.value === "Terror"
  ? products.filter(element => element.type === "Terror")
  : null;

  main.innerHTML = '';
  category.map(element=> createProducts(element))
}

function removeModal() {
    modal.style.display = 'none';
    main.style.filter = 'none';
    header.style.filter = 'none';
    compras.style.filter = 'none';
    nav.style.filter = 'none';
}

function importImage(event) {
    const currentImage = event.target.files[0];
    const objectURL = URL.createObjectURL(currentImage);
    imgSelected = objectURL
}

function createNewProducts() {
  idProduct++;
  const titleName = newName.value; 
    const titlePlatform = newPlatform.value;
    const titleType = newType.value;
    const titlePrice = newPrice.value;
    const id = idProduct;

    const newelement = {id:id, name:titleName, platform:titlePlatform, type:titleType, price:titlePrice, image:imgSelected};
    
    products.push(newelement);
    renderCards();
    modal.style.display = 'none';
    main.style.filter = 'none';
    header.style.filter = 'none';
    compras.style.filter = 'none';
    nav.style.filter = 'none';
}

function showModal() {
    modal.style.display = 'flex';
    main.style.filter = 'blur(2px)';
    header.style.filter = 'blur(2px)'
    compras.style.filter = 'blur(2px)';
    nav.style.filter = 'blur(2px)';
}

function renderCards() {
    main.innerHTML = '';
    products.map(products => {
      const {name, image, id, price, platform} = products;

      const card = document.createElement('div');
      card.classList.add('card-product');
  
      const cardChild = document.createElement('div');
      cardChild.classList.add('card-child');
  
      const imgCard = document.createElement('img');
      imgCard.setAttribute('src', image);
      imgCard.setAttribute('alt', `${id}-${name}`);    
      imgCard.classList.add('img-product');
      
      const nameCard = document.createElement('p');
      nameCard.textContent = name;
      nameCard.classList.add('name-product');
  
      const priceCard = document.createElement('p');
      priceCard.textContent = `US$${price}`;
      priceCard.classList.add('price-product');
  
      const play = document.createElement('p');
      play.textContent = platform;
      play.classList.add('play')
  
      const img = document.createElement('img');
      img.setAttribute('src', "Images/playstation-logotype.png");
      img.classList.add('icon-img');
  
  
      const btnCard = document.createElement('button');
      btnCard.setAttribute('id', id);
      btnCard.classList.add('btn-add');
      btnCard.textContent = 'Add To Cart'
      btnCard.addEventListener('click', add_cart)
  
      card.appendChild(imgCard);
      card.appendChild(cardChild);
      cardChild.appendChild(nameCard);
      play.appendChild(img);
      cardChild.appendChild(play);
      cardChild.appendChild(priceCard);
      cardChild.appendChild(btnCard);

  
      main.appendChild(card);
  
    })

}


function createProducts(products) {
  const {name, image, id, price, platform} = products;

    const card = document.createElement('div');
    card.classList.add('card-product');

    const cardChild = document.createElement('div');
    cardChild.classList.add('card-child');

    const imgCard = document.createElement('img');
    imgCard.setAttribute('src', image);
    imgCard.setAttribute('alt', `${id}-${name}`);    
    imgCard.classList.add('img-product');
    
    const nameCard = document.createElement('p');
    nameCard.textContent = name;
    nameCard.classList.add('name-product');

    const priceCard = document.createElement('p');
    priceCard.textContent = `US$${price}`;
    priceCard.classList.add('price-product');

    const play = document.createElement('p');
    play.textContent = platform;
    play.classList.add('play')

    const img = document.createElement('img');
    img.setAttribute('src', "Images/playstation-logotype.png");
    img.classList.add('icon-img');


    const btnCard = document.createElement('button');
    btnCard.setAttribute('id', id);
    btnCard.classList.add('btn-add');
    btnCard.textContent = 'Add To Cart'
    btnCard.addEventListener('click', add_cart)

    card.appendChild(imgCard);
    card.appendChild(cardChild);
    cardChild.appendChild(nameCard);
    play.appendChild(img);
    cardChild.appendChild(play);
    cardChild.appendChild(priceCard);
    cardChild.appendChild(btnCard);

    main.appendChild(card);
}

shopping_card.addEventListener('click', show_cart)


function show_cart(){
  overlay.classList.add('activate');
  popup.classList.add('activate');
  main.style.filter = 'blur(2px)';
  header.style.filter = 'blur(2px)'
  compras.style.filter = 'blur(2px)';
  nav.style.filter = 'blur(2px)';
}

btn_close_popup.addEventListener('click', close_cart)

function close_cart(){
  overlay.classList.remove('activate');
  popup.classList.remove('activate');
  main.style.filter = 'none';
  header.style.filter = 'none';
  compras.style.filter = 'none';
  nav.style.filter = 'none';
}

const subtract_games = (event) => {
  let resta = Number(counter_label.textContent)-1;
  let item = event.target.getAttribute('id') 
  games_cart.splice(parseInt(games_cart.indexOf(item)),1)
  show_games_cart();
  counter_label.textContent = resta;
  if (counter_label.textContent === '0') {
    buy.style.display = 'none'
  }
}

const show_games_cart = () => {
  shoppingCart_container.innerHTML = '';
  let lista = [...new Set(games_cart)]; 
  
  lista.forEach(item => {

      const todos_productos = products.filter(products => {
          return products.id === parseInt(item);
      })
      let cont = 0;
      let total= 0;

      for(let id of games_cart) {
          if(id === item) {
            cont++;
            total += parseFloat(todos_productos[0].price);
            
          }
      }
  
      const card = document.createElement('div');
      const imagen = document.createElement('img');
      const cardContent = document.createElement('div');
      const deletec = document.createElement('p');
      const title_card=document.createElement('h2');
      const info=document.createElement('p');
      const containerQuantityNumber= document.createElement('div');
      const quantity =document.createElement('h4');
      const quantityNumber=document.createElement('div');
      const sum =document.createElement('p');
      const number=document.createElement('p');
      const subtract=document.createElement('p');
      const pricecart=document.createElement('p');

      sum.setAttribute('id', todos_productos[0].id);
      subtract.setAttribute('id',todos_productos[0].id);

      card.classList.add('card');
      cardContent.classList.add('cardContent');
      deletec.classList.add('delete');
      containerQuantityNumber.classList.add('quantityNumber');
      quantity.style.fontStyle='oblique';
      quantityNumber.classList.add('numberQuantity');
      sum.classList.add('circle');
      subtract.classList.add('circle');
      pricecart.classList.add('price');

      deletec.textContent='X';
      imagen.src=todos_productos[0].image;
      title_card.textContent=todos_productos[0].name;
      info.textContent=todos_productos[0].platform;
      quantity.textContent='Quantity';
      sum.textContent='+';
      number.textContent=cont;
      subtract.textContent='-';
      pricecart.textContent=`$${total.toFixed(2)}`;

      card.appendChild(imagen);
      cardContent.appendChild(title_card);
      cardContent.appendChild(info);
      cardContent.appendChild(containerQuantityNumber);
      containerQuantityNumber.appendChild(quantity);
      containerQuantityNumber.appendChild(quantityNumber);
      quantityNumber.appendChild(subtract);
      quantityNumber.appendChild(number);
      quantityNumber.appendChild(sum);
      cardContent.appendChild(pricecart);
      card.appendChild(deletec);
      card.appendChild(cardContent);

      sum.addEventListener('click', add_cart);
      subtract.addEventListener('click', subtract_games);

      shoppingCart_container.appendChild(card);

      deletec.setAttribute('id',todos_productos[0].id);
      deletec.addEventListener('click', delete_cart)

      function delete_cart(event) {
        let cantidad = Number(counter_label.textContent)-cont;
        counter_label.textContent = cantidad;
        let item = event.target.getAttribute('id');
        games_cart = games_cart.filter((id_games) => {
        return id_games !== item;
      });     
      if (cantidad === 0) {
       buy.style.display = 'none';
      }
      show_games_cart();
      }
  })
}

const add_cart = (event) => {
  let sumar = Number(counter_label.textContent)+1
  games_cart.push(event.target.getAttribute('id'));
  show_games_cart();
  counter_label.textContent = sumar;
  buy.style.display = 'flex';
}