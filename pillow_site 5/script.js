const products=[
 {id:'pink',name:'Pretty Pink',price:14.99,image:'assets/product_1.png'},
 {id:'white',name:'Classic White',price:12.99,image:'assets/product_4.png'},
 {id:'black',name:'Midnight Black',price:17.99,image:'assets/product_2.png'},
 {id:'blue',name:'Dreamy Blue',price:13.99,image:'assets/product_5.png'},
 {id:'floral',name:'Floral Dreams',price:15.99,image:'assets/product_3.png'},
 {id:'rainbow',name:'Rainbow Dreams',price:14.99,image:'assets/product_6.png'}
];
let cart=JSON.parse(localStorage.getItem('pillowParadiseCart')||'[]');
const money=n=>'$'+n.toFixed(2);
const productGrid=document.querySelector('#products');
productGrid.innerHTML=products.map(p=>`<article class="product"><img src="${p.image}" alt="${p.name} pillowcase"><h3>${p.name}</h3><p class="price">${money(p.price)}</p><button class="button add-button" data-id="${p.id}">Add to cart</button></article>`).join('');
function saveCart(){localStorage.setItem('pillowParadiseCart',JSON.stringify(cart));renderCart()}
function renderCart(){document.querySelector('#cart-count').textContent=cart.reduce((n,item)=>n+item.qty,0);const box=document.querySelector('#cart-items');if(!cart.length){box.innerHTML='<p>Your cart is empty.</p>'}else{box.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-row"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)} × ${item.qty}</p><button class="remove" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*item.qty)}</strong></div>`}).join('')}document.querySelector('#cart-total').textContent=money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.qty,0))}
productGrid.addEventListener('click',e=>{const button=e.target.closest('[data-id]');if(!button)return;const item=cart.find(x=>x.id===button.dataset.id);if(item)item.qty++;else cart.push({id:button.dataset.id,qty:1});saveCart();button.textContent='Added!';setTimeout(()=>button.textContent='Add to cart',900)});
document.querySelector('#cart-items').addEventListener('click',e=>{const id=e.target.dataset.remove;if(!id)return;cart=cart.filter(x=>x.id!==id);saveCart()});
const panel=document.querySelector('#cart-panel'),overlay=document.querySelector('#overlay');function openCart(){panel.classList.add('open');panel.setAttribute('aria-hidden','false');overlay.hidden=false}function closeCart(){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');overlay.hidden=true}
document.querySelector('#open-cart').addEventListener('click',openCart);document.querySelector('#close-cart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);
document.querySelector('#checkout').addEventListener('click',()=>{document.querySelector('#checkout-message').textContent=cart.length?'Checkout is a demo for this school project. No payment will be taken.':'Add a pillowcase to your cart first.'});
document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#contact-message').textContent='Thanks! Your demo message has been submitted.';e.target.reset()});document.querySelector('#year').textContent=new Date().getFullYear();renderCart();
