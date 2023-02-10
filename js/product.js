const products = [
    {productid:'001', productname: 'Men\'s Comfy Shirt', category: 'Shirt', price: '$29.99', discount: '', productimg: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/423527/item/goods_09_423527.jpg?width=750'},
    {productid:'002', productname: 'Men\'s Graphic T-shirt', category: 'Shirt', price: '$19.99', discount: '', productimg: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/447179/item/goods_58_447179.jpg?width=750"},
    {productid:'003', productname: 'Men\'s Fleeced Jacket', category: 'Jacket', price: '$84.99', discount: '15% off',productimg: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449631/item/goods_30_449631.jpg?width=750"},
    {productid:'004', productname: 'Men\'s Shorts', category: 'Pants', price: '$29.99', discount: '', productimg:"https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/444616/item/goods_66_444616.jpg?width=750"},
    {productid:'005', productname: 'Women\'s Dress', category: 'Dress', price: '$59.99', discount: '20% off', productimg:"https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/458115/item/goods_12_458115.jpg?width=750"},
    {productid:'006', productname: 'Women\'s Skirts', category: 'Skirts', price: '$39.99', discount: '20% off', productimg:"https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456272/item/goods_31_456272.jpg?width=750"},
    {productid:'007', productname: 'Women\'s Top', category: 'shirt', price: '$39.99', discount: '20% off', productimg:"https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/452928/item/goods_12_452928.jpg?width=750"},

  ];
  const productList = document.getElementById('productList');

  
  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
  
    const singleProduct = document.createElement('div');
    singleProduct.classList.add('single-product');
    
    // Add the styles dynamically
    singleProduct.style.background = `url("${product.productimg}") no-repeat center`;
    singleProduct.style.backgroundSize = 'cover';
    singleProduct.style.transition = 'all 0.3s';
    singleProduct.style.transform = 'rotate(0deg)';
    singleProduct.addEventListener('mouseover', function() {
      singleProduct.style.transform = 'scale(1.2,1.2) rotate(5deg)';
    });
    
    singleProduct.addEventListener('mouseout', function() {
      singleProduct.style.transform = 'rotate(0deg)';
    });
    singleProduct.innerHTML = `
      <div class="part-1">
      
        <span class="${product.discount ? 'discount' : 'new'}">${product.discount ? product.discount : 'new'}</span>
        <ul>
          <li><a href="#"><i class="fas fa-shopping-cart"></i></a></li>
          
          <li><a href="#"><i class="fas fa-heart"></i></a></li>
          <li><a href="#"><i class="fas fa-plus"></i></a></li>
          <li><a href="productinfo.html"><i class="fas fa-expand"></i></a></li>
        </ul>
      </div>
      <div class="part-2">
        <h3 class="product-title">${product.productname}</h3>
        ${product.discount ? `<h4 class="product-old-price">$49.99</h4>` : ''}
        <h4 class="product-price">${product.price}</h4>
      </div>
    `;
  
    productElement.appendChild(singleProduct);
    return productElement;
  }
  

  products.forEach(product => {
    productList.appendChild(createProductElement(product));
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', e => {
    productList.innerHTML = '';
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.productname.toLowerCase().includes(searchTerm));
    filteredProducts.forEach(product => {
      productList.appendChild(createProductElement(product));
    });
  });