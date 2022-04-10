const submitBtn = document.querySelector('button');
const username = document.querySelector('#input-username');
const email = document.querySelector('#input-email');
const pwd = document.querySelector('#input-password');
const pwdAgain = document.querySelector('#input-password-again');
const warning = document.querySelector('.warning');

// 회원이 0명, 즉 로컬저장소에 아직 회원저장공간이 없는경우에는 아무값이나 넣어서 만든다.
if(localStorage.getItem('users') === null) {
    let arr = [];
    localStorage.setItem('users',JSON.stringify(arr));
}
let users = JSON.parse(localStorage.getItem('users'));
console.log(users);

let check = {
    id: false,
    pwd: false,
    pwdAgain: false,
    nickname: false,
    email: false
};

class User {
    constructor(username, pwd, email) {
        this.username = username;
        this.email = email;
        this.pwd = pwd;
    }
}

function outlineColorChange(tag, passState) {
    tag.classList.add(`${passState}`);
}

function usernameCheck() {
    let findUsername = users.find(user => username.value === user.username);
    if(findUsername === undefined) 
        outlineColorChange(username, 'pass');
    else 
        outlineColorChange(username, 'non-pass');
}

function emailCheck() {
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != undefined && regex.test(email)); 
}

function pwdCheck() {
    if(pwd.value === pwdAgain.value) {
        outlineColorChange(pwd, 'pass');
        outlineColorChange(pwdAgain, 'pass');
    } else {
        outlineColorChange(pwd, 'non-pass');
        outlineColorChange(pwdAgain, 'non-pass');
    }
    
}

submitBtn.addEventListener('click', e => {
    usernameCheck();
    emailCheck();
    pwdCheck();
});

