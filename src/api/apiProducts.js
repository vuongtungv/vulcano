import global from './../../screens/api/global';

// list products in cate
export function getProductsInCate(id,type,products_sort,page, id_cate, id_material, id_style, id_color, id_size, id_price){
    let url;
    url = global.BASE_URL+`/products_in_cate.api?id=${id}&type=${type}&products_sort=${products_sort}&page=${page}&id_cate=${id_cate}&id_material=${id_material}&id_style=${id_style}&id_color=${id_color}&id_size=${id_size}&id_price=${id_price}`;
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
export function getAllProducts(page, products_sort, id_cate, id_material, id_style, id_color, id_size, id_price){
    let url;
    url = global.BASE_URL+`/get_all_products.api?page=${page}&products_sort=${products_sort}&id_cate=${id_cate}&id_material=${id_material}&id_style=${id_style}&id_color=${id_color}&id_size=${id_size}&id_price=${id_price}`;
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

export function getDetailOrder(id){
    let url;  
    url = global.BASE_URL+`/get_order_id.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
}




// filter
export function filterArrayAll(){
    let url;  
    url = global.BASE_URL+`/filter_array_all.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
}
export function filterArray(id){
    let url;  
    url = global.BASE_URL+`/filter_array.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
}