import global from './../../screens/api/global';

// list all city
export function getCities(){
    let url;
    url = global.BASE_URL+`/get_cities.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};


// list all districts
export function getDistricts(){
    let url;
    url = global.BASE_URL+`/get_districts.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};


// list all showrooms
export function getAllShowrooms(){
    let url;
    url = global.BASE_URL+`/get_showrooms.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};