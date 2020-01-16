import global from './../../screens/api/global';

// list products in cate
export function getProductsInCate(id,type){
    let url;
    url = global.BASE_URL+`/products_in_cate.api?id=${id}&type=${type}`;
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

export function getCateLv1(){
    let url;
    url = global.BASE_URL+`/get_cate_lv1.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function listCateSalesLv1(){
    let url;
    url = global.BASE_URL+`/get_cate_sales_lv1.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function getAllProducts(){
    let url;
    url = global.BASE_URL+`/get_all_products.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};



// cart
export function get_product_by_cart(ids){
    let url;  
    url = global.BASE_URL+`/get_product_by_cart.api?cart=${ids}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function submitDonHang(fullname,valueGender,email,address,phone,valueMethodPayment,ids){
    let url;  
    url = global.BASE_URL+`/submit_order.api?fullname=${fullname}&valueGender=${valueGender}&email=${email}&address=${address}&phone=${phone}&valueMethodPayment=${valueMethodPayment}&cart=${ids}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
}