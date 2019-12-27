import global from './../../screens/api/global';

// list products in cate
export function getProductsInCate(id){
    let url;
    url = global.BASE_URL+`/products_in_cate.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function getDetailProducts(id){
    let url;
    url = global.BASE_URL+`/detail_products.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
