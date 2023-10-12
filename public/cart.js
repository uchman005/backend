let cart = document.querySelector(".cart-list")
const addItem=(event) =>{
    let clickButton=event.target
    let parent=clickButton.parentElement
    let productDetail=parent.parentElement
   let productName=productDetail.querySelector(".name").innerText
   let productPrice=productDetail.querySelector(".price").innerText
   //let productImage=productDetail.querySelector(".product-image>a>img")
   
   let newItem = document.createElement("li") 
   newItem.classList.add("product-box-contain")
   newItem.innerHTML=`<div class="drop-cart">
   <a href="product-left-thumbnail.html" class="drop-image">
   <img src="../assets/images/vegetable/product/2.png" class="blur-up lazyload" alt="">
</a>
   <div class="drop-contain">
       <a href="product-left-thumbnail.html">
           <h5>${productName}</h5>
       </a>
       <h6><span>1 x</span> ${productPrice}</h6>
       <button class="close-button close_button">
           <i class="fa-solid fa-xmark"></i>
       </button>
   </div>
</div>`
   cart.appendChild(newItem)
}
let addButtons= document.querySelectorAll(".judecart")
addButtons.forEach((addButton)=>{
    addButton.addEventListener("click",addItem)
})
let updatePrice= ()=>{

}
