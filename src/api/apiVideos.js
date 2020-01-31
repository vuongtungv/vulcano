import global from './../../screens/api/global';

// list all videos
export function getAllVideos(page){
    let url;
    url = global.BASE_URL+`/get_all_videos.api?page=${page}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};