var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var category = document.getElementById("category");
var submit = document.getElementById("submit");
var productContainer = [];

// get total
function getTotal() {
  if (price.value != "") {
    total.innerHTML =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.style.backgroundColor = "rgb(6, 131, 69)";
  } else {
    total.style.backgroundColor = "rgb(131, 6, 6)";
  }
}

// create product
var productContainer;
if (localStorage.getItem("product") != null) {
  productContainer = JSON.parse(localStorage.getItem("product"));
} else {
  productContainer = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if(newPro.count>1){
for (let i = 0; i < newPro.count; i++) {
  
  productContainer.push(newPro);
}
  }else{
  productContainer.push(newPro);
}
  localStorage.setItem("product", JSON.stringify(productContainer));
  console.log(productContainer);
  clearProduct();
  redProduct();
};

// clear product
function clearProduct() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read product
function redProduct() {
  let table=''
  for (let i = 0; i < productContainer.length; i++) {
     table += `<tr>
        <td>${i+1}</td>
        <td>${productContainer[i].title}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].taxes}</td>
        <td>${productContainer[i].ads}</td>
        <td>${productContainer[i].discount}</td>
        <td>${productContainer[i].total}</td>
        <td>${productContainer[i].category}</td>
        <td><button>update</button></td>
        <td onclick=deleteProduct(${i})><button>delete</button></td>
    </tr>`;

  }
  document.getElementById("tbody").innerHTML = table;

}
redProduct()



// Delete Product
function deleteProduct(i){
productContainer.splice(i,1)
localStorage.product=JSON.stringify(productContainer)
redProduct()
}

// delete All
var btnDelete= document.getElementById('deleteAll')
if(productContainer.length>0){
  btnDelete.innerHTML=`
  <button onclick=deleteAll()>delete all</button>
  `
}else {
  btnDelete.innerHTML=``
}
function deleteAll(){
localStorage.clear()
productContainer.splice(0)
redProduct()
}