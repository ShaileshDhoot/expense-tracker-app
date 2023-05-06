document.querySelector('#signup-form').addEventListener('submit', (event) =>{
    event.preventDefault(); // prevent default form submission
    const fullName = document.querySelector('#name').value;
    const emailId = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    axios.post('http://localhost:3000/signUp', {
            name: fullName,
            email: emailId,
            password: password
        })
        .then((res)=>{
            window.location.href = 'http://localhost:3000/login.html'
        })
        .catch(err=>console.log(err))
});