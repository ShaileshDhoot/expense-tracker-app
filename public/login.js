document.getElementById('loginBtn').addEventListener('click', logIn)
function logIn (){
    console.log('login function called')
    const loginDetails = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value

    }
    
    axios.post('http://localhost:3000/postlogin',loginDetails)
    .then(response => { 
      console.log('login post api');
        localStorage.setItem('token', response.data.token);
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