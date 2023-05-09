document.querySelector('#signup-form').addEventListener('submit', (event) =>{
    event.preventDefault(); // prevent default form submission
    const fullName = document.querySelector('#name').value;
    const emailId = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    axios.post('/signUp', {
            name: fullName,
            email: emailId,
            password: password
        })
        .then((res)=>{
            window.location.href = '/login.html'
        })
        .catch(err=>console.log(err))
});