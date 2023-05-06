

function logIn (){
    //console.log('login function called')
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    axios.post('http://localhost:3000//postlogin', {
    email,
    password
    })
    .then(response => {             
        localStorage.setItem('token', response.data.token);
        console.log(response.data,'login func in login html');
        window.location.href = '/index.html';
    })
    .catch(error => {
        // const errorMessage = error.response.data.message;
        // const errorMessageDiv = document.getElementById('error');
        // errorMessageDiv.innerHTML = `<p class="text-danger">${errorMessage}</p>`;
        console.log(error, 'something is wrong with login html or controller code')
    });
}

function forgotpassword() {
 window.location.href = '/ForgotPassword.html'
 console.log('forgot')
};