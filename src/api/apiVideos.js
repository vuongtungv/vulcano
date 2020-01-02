import global from './../../screens/api/global';

// list all videos
export function getAllVideos(){
    let url;
    url = global.BASE_URL+`/get_all_videos.api`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};