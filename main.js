const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal-wrapper");
const modalList = document.querySelector(".modal-list");

document.addEventListener("DOMContentLoaded", () => {
  //CALLBACK > İçerisinde başka fonksiyon çalıştıran fonksiyon
  fetchCategories();
  fetchProducts();
});

function fetchCategories() {
  fetch("https://api.escuelajs.co/api/v1/categories")
    // GELEN VERİYİ İŞLEME
    .then((response) => response.json())
    // OLUŞAN DATAYI FOREACH İLE HER BİR OBJE İÇİN FONKSİYON ÇALIŞTIRMA
    .then((data) =>
      data.slice(0, 4).forEach((category) => {
        // GELENE HER BİR OBJE İÇİN DIV OLUŞTURMA
        const categoryDiv = document.createElement("div");
        // DIVE CLASS EKLEME
        categoryDiv.classList.add("category");
        // DIVIN İÇERİĞİNİ DEĞİŞTİRME
        categoryDiv.innerHTML = `         
        <img src="${category.image}"/>
        <span>${category.name}</span>
        `;
        // OLUŞAN CATEGORYİ HTMLDEKİ LİSTEYE ATMA
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.log(err));
}

// ÜRÜNLERİ ÇEKME
function fetchProducts() {
  // API YE İSTEK ATMA
  fetch("https://api.escuelajs.co/api/v1/products") //endpoint
    // İstek başarılı olursa veriyi işle
    .then((res) => res.json())
    // işlenen veriyi al ve ekrana bas
    .then((data) =>
      data.slice(0, 25).forEach((product) => {
        // DİV oluştur
        const productDıv = document.createElement("div");
        productDıv.classList.add("product");
        // içeiriği değiştir
        productDıv.innerHTML = `
            <img src="${product.images[0]}" />
              <p class="product-title">${product.title}</p>
              <p class="product-category">${product.category.name}</p>
              <div class="product-action">
                <p>${product.price} $</p>
                <button onclick="sepeteEkle({id:'${product.id}', name:'${product.title}',price:'${product.price}', image:'${product.images[0]}',amount:1})">Sepete Ekle</button>
              </div>
            </div>
          `;
        // htmle göndericez
        productList.appendChild(productDıv);
      })
    )
    // hata olursa devreye gir
    .catch();
}

//  Butonlara tıklanma olayını izliyoruz

const basket = [];

const addList = () => {
  basket.forEach((product) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    listItem.innerHTML = `            
      <div>
        <img
          src="${product.image}"/>
      </div>
      <h2>${product.name}</h2>
      <h2>${product.price}</h2>
      <p>Miktar: ${product.amount}</p>
      
      `;
    modalList.appendChild(listItem);
  });
};

openBtn.addEventListener("click", () => {
  toggleModal();
  addList();
});

closeBtn.addEventListener("click", () => {
  toggleModal();
  modalList.innerHTML = " ";
});

// Eğer dışarıya tıklanırsa da kapat
modal.addEventListener("click", (e) => {
  if (e.target.id !== "modal") {
    modal.classList.remove("active");
  }
});

//  Eğer tıklanırsa class eklenip çıkarılıyor

function toggleModal() {
  modal.classList.toggle("active");
}

//! SEPETE EKLEME İŞLEMİ

function sepeteEkle(product) {
  const findItem = basket.find((eleman) => eleman.id === product.id);

  if (findItem) {
    findItem.amount += 1;
  } else {
    basket.push(product);
  }
}
