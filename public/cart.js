let cart = document.querySelector(".cart-list")
const addItem = (event) => {
    let clickButton = event.target
    let parent = clickButton.parentElement
    let productDetail = parent.parentElement
    let productName = productDetail.querySelector(".name").innerText
    let productPrice = productDetail.querySelector(".price").innerText
    //let productImage=productDetail.querySelector(".product-image>a>img")

<<<<<<< HEAD
// }
let priceBox=String(document.querySelector(".price-box>h4").innerText)
let total=Number(priceBox.replace("$","") )
console.log(total);
=======
    let newItem = document.createElement("li")
    newItem.classList.add("product-box-contain")
    newItem.innerHTML = `<div class="drop-cart">
        <a href="product-left-thumbnail.html" class="drop-image">
        <img src="../assets/images/vegetable/product/2.png" class="blur-up lazyload" alt="">
        </a>
        <div class="drop-contain">
            <a href="product-left-thumbnail.html">
                <h5>${productName}</h5>
            </a>
            <h6><span>1 x</span><span class="item-price"> ${productPrice}</span></h6>
            <button class="close-button close_button">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        </div>`
    cart.appendChild(newItem)
    updatePrice();
}
let addButtons = document.querySelectorAll(".judecart")
addButtons.forEach((addButton) => {
    addButton.addEventListener("click", addItem)
})
let updatePrice = () => {
    let counter = document.querySelector('.badge');

    let count = 0;
    let productExist = cart.querySelector('.product-box-contain');
    let priceBox = String(document.querySelector(".price-box>h4").innerText)
    let total = Number(priceBox.replace("$", ""))
    if (productExist) {
        let productboxes = cart.getElementsByClassName('product-box-contain');
        count = productboxes.length;
        for (let i = 0; i < productboxes.length; i++) {
            let productPrice = productboxes[i].querySelector('.item-price').innerHTML;
            let price = Number(productPrice.replace('$', ''));
            total += price;
        }
    }
    counter.innerHTML = count;
    document.querySelector('.price-box>h4').innerHTML = `$${total.toFixed(2)}`;
}
