import global from './../../screens/api/global';

// list news
export function getListNews(){
    let url;
    url = global.BASE_URL+`/get_list_news.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

export function getDetailNews(id){
    let url;
    url = global.BASE_URL+`/get_detail_news.api?id=${id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
