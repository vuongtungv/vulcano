import global from './../../screens/api/global';
import { Alert } from 'react-native';


// slide home
export function getSlidesHome(){
    let url;
    url = global.BASE_URL+`/get_slides_home.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function getOneBanner(){
    let url;
    url = global.BASE_URL+`/get_one_banner.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

export function getCateIdHome(){
    let url;
    url = global.BASE_URL+`/get_cate_id_home.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function cateBigHome(){ 
    let url;
    url = global.BASE_URL+`/get_cate_big_id_home.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};