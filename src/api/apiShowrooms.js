import global from './../../screens/api/global';

// list all city
export function getCities() {
    let url;
    url = global.BASE_URL + `/get_cities.api`;
    console.log(url);
    return fetch(url)
        .then(res => res.json());
};


// list all districts
export function getDistricts(id) {
    let url;
    url = global.BASE_URL + `/get_districts.api?id=${id}`;
    console.log(url);
    return fetch(url)
        .then(res => res.json());
};


// list all showrooms
export function getAllShowrooms(city_id, district_id) {
    let url;
    url = global.BASE_URL + `/get_showrooms.api?city_id=${city_id}&district_id=${district_id}`;
    console.log(url);
    return fetch(url)
        .then(res => res.json());
};