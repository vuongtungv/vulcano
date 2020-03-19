import global from './../../screens/api/global';

// đăng ký thành viên
export function submitRegister(fullname, phone, email, password, birthday,gender){
    let url;
    url = global.BASE_URL+`/submit_register.api?fullname=${fullname}&phone=${phone}&email=${email}&password=${password}&birthday=${birthday}&gender=${gender}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

// cập nhật thành viên
export function updateUser(user_id, fullname, phone, email, password, newPassword, birthday, gender, address){
    let url;
    url = global.BASE_URL+`/update_user.api?user_id=${user_id}&fullname=${fullname}&phone=${phone}&email=${email}&password=${password}&newPassword=${newPassword}&birthday=${birthday}&gender=${gender}&address=${address}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};


// Đăng nhập
export function submitLogin(username, password, token){
    let url;
    url = global.BASE_URL+`/submit_login.api?username=${username}&password=${password}&token=${token}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function forgotPassword(email){
    let url;
    url = global.BASE_URL+`/forgot_password.api?email=${email}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};



// Danh sách đặt hàng
export function getListOrder(user_id, page){
    let url;
    url = global.BASE_URL+`/get_list_user_order.api?user_id=${user_id}&page=${page}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};

// Chi tiết đơn hàng
export function getDetailOrder(order_id){
    let url;
    url = global.BASE_URL+`/get_detail_user_order.api?order_id=${order_id}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};


// Danh sách notification
export function getListNotifications(page,user_id, token){
    let url;
    url = global.BASE_URL+`/get_list_notifications.api?page=${page}&user_id=${user_id}&token=${token}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function getTotalNotifications(user_id, token){
    let url;
    url = global.BASE_URL+`/get_total_notifications.api?user_id=${user_id}&token=${token}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
export function updateIsReadNotifications(user_id, token){
    let url;
    url = global.BASE_URL+`/update_notifications.api?user_id=${user_id}&token=${token}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json());
};
