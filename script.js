const c = (el) => document.querySelector(el);
const all = (el) => document.querySelectorAll(el);
let cart = [];
let modalQTD = 1;
let modalKey = 0;

// Listagem das pizzas

pizzaJson.map((item, index) => {

    // Clona os itens
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    // Ordena as pizzas
    pizzaItem.setAttribute('data-key',index)

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {

        // Previne a funçao principal da tag
        e.preventDefault();

        // Retorna qual ta selecionado e procura a classe mais proxima
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key; // Informa qual pizza que é

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // Aparecer o modal
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 100);

        // Percorre cada elemento e bota o tamanho
        all('.pizzaInfo--size').forEach((size, sizeIndex) => {
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

    })

    // Adiconar os itens
    c('.pizza-area').append(pizzaItem)

})

// Funçoes 

const closeModal = () => {
    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() =>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 100)
}

let updateCart = () => {
    if(cart.length > 0){
        c('aside').classList.add('show');

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => {
                // Só retorna a array do item se for igual ao do cart
                return item.id == cart[i].id 
            })

            let cartItem = c('.models .cart--item').cloneNode(true);
            let pizzaSize;

            switch(cart[i].size){
                case 0:
                    pizzaSize = 'P'
                    break
                case 1:
                    pizzaSize = 'M'
                    break
                case 2:
                    pizzaSize = 'G'
                    break
            }

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaSize})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;

            c('.cart').append(cartItem)
        }

    }else{
        c('aside').classList.remove('show');
    }
}

// Eventos

all('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})
// 
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQTD > 1){
        modalQTD--;
        c('.pizzaInfo--qt').innerHTML = modalQTD
    }
})
// 
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    if(modalQTD < 20){
        modalQTD++;
        c('.pizzaInfo--qt').innerHTML = modalQTD;
    }
})
// 
all('.pizzaInfo--size').forEach((size) =>{
    size.addEventListener('click', () => {
        c('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})
// 
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    cart.push({
        id: pizzaJson[modalKey].id,
        size,
        qtd: modalQTD
    })

    updateCart();
    closeModal();
})

