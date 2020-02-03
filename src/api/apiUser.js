import global from './../../screens/api/global';

// đăng ký thành viên
export function submitRegister(fullname, phone, email, password, birthday,gender){
    let url;
    url = global.BASE_URL+`/submit_register.api?fullname=${fullname}&phone=${phone}&email=${email}&password=${password}&birthday=${birthday}&gender=${gender}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};


// Đăng nhập
export function submitLogin(username, password){
    let url;
    url = global.BASE_URL+`/submit_login.api?username=${username}&password=${password}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
