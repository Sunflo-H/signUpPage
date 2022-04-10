const submitBtn = document.querySelector('button');
const username = document.querySelector('#input-username');
const email = document.querySelector('#input-email');
const pwd = document.querySelector('#input-password');
const pwdAgain = document.querySelector('#input-password-again');
const inputs = document.querySelectorAll('input');

const check = {
    username : false,
    email : false,
    pwd : false,
    pwdAgain : false
}

class User {
    constructor(username, pwd, email) {
        this.username = username;
        this.email = email;
        this.pwd = pwd;
    }
}

// 회원이 0명, 즉 로컬저장소에 아직 회원저장공간이 없는경우에는 아무값이나 넣어서 만든다.
if (localStorage.getItem('users') === null) {
    const user = new User('','','');
    console.log(user);
    localStorage.setItem('users', JSON.stringify([user]));
}
let users = JSON.parse(localStorage.getItem('users'));
console.log(users);

function pass(input) {
    input.classList.add('pass');
    input.classList.remove('non-pass');
}

function nonPass(input) {
    input.classList.add('non-pass');
    input.classList.remove('pass');
}

function warn(input, text) {
    let target = input.nextElementSibling.firstElementChild;
    target.innerText = text;
}

function usernameCheck() {
    let findUsername = users.find(user => username.value === user.username);
    
    if (findUsername === undefined && username.value !== '') {
        pass(username);
        warn(username,'');
    }
    else if (username.value === '') { // 공백 경고
        nonPass(username);
        warn(username, "Username must not be empty");
    }
    else { // 중복 경고
        nonPass(username); 
        warn(username, "Username already exists");
    }
}

function emailCheck() {
    if(emailValid(email.value)) {
        pass(email);
        warn(email,'');
    } 
    else {
        nonPass(email);
        warn(email, "Email is not valid");
    }
}

function emailValid(email) {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != undefined && regex.test(email));
}

function pwdCheck() {
    var pw = pwd.value;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    
    if(pw.length < 8 || pw.length > 20){ // 길이 체크
        nonPass(pwd);   
        warn(pwd,"Please enter 8 to 20 digits");
        return false;
    }
    else if(pw.search(/\s/) != -1){ // 공백 체크
        nonPass(pwd);   
        warn(pwd,"Enter the password without spaces");
        return false;
    }
    else if(num < 0 || eng < 0 || spe < 0 ){ // 문자 형식 체크
        nonPass(pwd);   
        warn(pwd,"Enter a mixture of English, numbers, and special characters");
        return false;
    }
    else {
        pass(pwd);
        warn(pwd, '');
        return true;
    }
}
function pwdAgainCheck() {
    if (pwd.value === pwdAgain.value && pwdAgain.value !== '') {
        pass(pwdAgain);
        warn(pwdAgain,'');
    } 
    else if(pwdAgain.value === '') {
        nonPass(pwdAgain);
        warn(pwdAgain, "Confirm password must not be empty");
    }
    else {
        nonPass(pwdAgain);
        warn(pwdAgain,"Password doesn't match");
    }
}

function success() {
    const user = new User(username.value, email.value, pwd.value);
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    toast(`${username.value}님 가입을 환영합니다.`);
}

submitBtn.addEventListener('click', e => {
    let arr = [...inputs];
    let check = arr.find(input => input.classList.contains('non-pass'));

    usernameCheck();
    emailCheck();
    pwdCheck();
    pwdAgainCheck();
    
    if(check === undefined) {
        success();
    }
});


let removeToast;

function toast(string) {
    const toast = document.getElementById("toast");

    toast.classList.contains("show") ?
        (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("show")
        }, 2000)) :
        removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("show")
        }, 2000)
    toast.classList.add("show"),
        toast.innerText = string
}