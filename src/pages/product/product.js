import '/src/pages/product/product.css'
import { tiger, insertLast, comma, getPbImageURL, getNode, getStorage, setStorage, setDocumentTitle } from "/src/lib";
import gsap from 'gsap';
import defaultAuthData from '../../api/defaultAuthData';

// console.log(import.meta.env)
// console.log(import.meta.env.VITE_PB_URL)
// console.log(import.meta.env.VITE_PB_API)

setDocumentTitle('2.9CM 상품목록')

if(!localStorage.getItem('auth')) {
  setStorage('auth', defaultAuthData)
}

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );

  const userData = response.data.items;

  const {isAuth} = await getStorage('auth')
  console.log(isAuth)

  
  userData.forEach( item => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
      <li class="product-item">
      <a href="${!isAuth ? '/src/pages/login/' : `/src/pages/detail/index.html#${item.id}`}">
          <figure>
            <img src="${getPbImageURL(item)}" alt="" />
          </figure>
          <span class="brand">${item.brand}</span>
          <span class="desc">${item.description}</span>
          <span class="price">${item.price.toLocaleString('ko-KR')}</span>
          <div>
            <span class="discount">${item.discount}%</span>
            <span class="real-price">${comma(item.price - ratio)}원</span>
          </div>
        </a>
      </li>
    `;
    insertLast('.container > ul', template)
  });


  gsap.from('.product-item', {y: 30, opacity: 0, stagger: 0.1})
  
}

renderProduct();


// 로그인 된 사용자면 상품을 클릭했을 때 디테일 페이지로 넘어가게
// 로그인이 안 된 사용자면 상품을 클릭했을 때 메인 페이지로 넘어가게
// 1. localStorage에서 유저 정보 가져오기
// 2. href 조건식 작성하기


// console.log(await getStorage('auth'))







// const product = getNode('.product-item > a');

// function handleDetail(e) {
//   e.preventDefault();

//   console.log(product)
// }

// product?.addEventListener('click', handleDetail)

