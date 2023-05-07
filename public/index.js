const form = document.getElementById("tracker");
form.addEventListener("submit", addExpense);

function addExpense(e) {
  e.preventDefault()
  const token = localStorage.getItem("token");
  if (token) {
    console.log(token, "add expense");
  } else {
    console.log("can't get token");
    return;
  }
  const expenseData = {
    amount: document.querySelector(".number").value,
    description: document.querySelector(".description").value,
    category: document.querySelector(".category").value,
  };
  //console.log(expenseData)
  axios
    .post("http://34.227.25.232/expense/add", expenseData, {
      headers: { Authorization: token }
    })
    .then((response) => {
      addNewExpense(expenseData)
    })
    .catch((err) => console.log(err));
}

function addNewExpense(element,page) {

  const table = document.getElementById("expenseTable");
  const fragment = document.createDocumentFragment();
  const row = document.createElement("tr");
  const idCell = document.createElement("td");
  const amountCell = document.createElement("td");
  const descriptionCell = document.createElement("td");
  const categoryCell = document.createElement("td");
  const editCell = document.createElement("td");
  const deleteCell = document.createElement("td");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const idText = document.createTextNode(element.id);
  const amountText = document.createTextNode(element.amount);
  const descriptionText = document.createTextNode(element.description);
  const categoryText = document.createTextNode(element.category);
  const editText = document.createTextNode("Edit");
  const deleteText = document.createTextNode("Delete");
  editButton.classList.add("btn", "edit", "btn-primary");
  deleteButton.classList.add("btn", "delete", "btn-danger");
  editButton.appendChild(editText);
  deleteButton.appendChild(deleteText);
  idCell.appendChild(idText);
  amountCell.appendChild(amountText);
  descriptionCell.appendChild(descriptionText);
  categoryCell.appendChild(categoryText);
  editCell.appendChild(editButton);
  deleteCell.appendChild(deleteButton);
  row.appendChild(idCell);
  row.appendChild(amountCell);
  row.appendChild(descriptionCell);
  row.appendChild(categoryCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  fragment.appendChild(row);
  table.appendChild(fragment);
}




let currentPage = 1;
const itemsPerPage = 10

function renderPaginationButtons(response) {
  const paginationDiv = document.getElementById("pagination");
  const totalPages = Math.ceil(response.data.length / itemsPerPage);

  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    if (i === currentPage) {
      button.disabled = true;
    } else {
      button.addEventListener("click", () => {
        currentPage = i;
        renderPaginationButtons(response);
        renderExpenses(response);
      });
    }
    paginationDiv.appendChild(button);
  }
}

const itemsPerPageSelect = document.getElementById('itemsPerPage');
const paginationDiv = document.getElementById('pagination');
const storageKey = 'itemsPerPage';

// Load items per page from local storage
const savedItemsPerPage = localStorage.getItem(storageKey);
if (savedItemsPerPage) {
  itemsPerPageSelect.value = savedItemsPerPage;
}

// Listen for changes to the items per page select
itemsPerPageSelect.addEventListener('change', (event) => {
  const itemsPerPage = event.target.value;
  const token = localStorage.getItem("token")
  localStorage.setItem(storageKey, itemsPerPage); // Save to local storage
  axios.get("http://34.227.25.232/expense/all", { headers: { Authorization: token } })
    .then((response) => {
      renderExpenses(response);
    })
    .catch((err) => console.log(err));
})


function renderExpenses(response = { data: [] }) {
  const itemsPerPage = itemsPerPageSelect.value;
  const table = document.getElementById("expenseTable");
  const fragment = document.createDocumentFragment();
  table.innerHTML = "";

  response.data
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .forEach((element) => {
      addNewExpense(element, currentPage);
    });

  table.appendChild(fragment);
}


window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1])); // inbuilt front end method to decode jwt token in frontend
  const isPremium = payload.isPremiumUser
  if(isPremium){
    document.getElementById('buyPremium').style.visibility = "hidden"
    document.getElementById('message').innerHTML = "You are a Premium User"
    leaderboard()
  }
  axios.get("http://34.227.25.232/expense/all", { headers: { Authorization: token } })
    .then((response) => {
      renderPaginationButtons(response);
      renderExpenses(response);
    })
    .catch((err) => console.log(err));
});
 // ----*** to decode jwt token in js file
// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }
function leaderboard(){
  const newElement = document.createElement('input')
  newElement.type = 'button'
  newElement.value = 'LEADERBOARD'
  newElement.onclick = async ()=>{
    const token =await localStorage.getItem('token')
    const userArray =await axios.get('http://34.227.25.232/premium/showLeaderBoard', {headers:{"Authorization": token}})
    console.log(userArray);  // will get array of users in form of object

    const leaderBoardElement = document.getElementById('leaderboard')
    if (!leaderBoardElement.hasChildNodes()) {
      // If the leaderboard element doesn't have any child nodes,
      // it means that the leaderboard hasn't been displayed yet,
      // so we can fetch the data and display it.
      axios.get('http://34.227.25.232/premium/showLeaderBoard', {headers:{"Authorization": token}})
        .then((response) => {
          const userArray = response.data;
          console.log(userArray); // will get array of users in form of object

          leaderBoardElement.innerHTML = '<h1>Leader Board</h1>';

          userArray.forEach((userDetails) => {
            leaderBoardElement.innerHTML += `<li>Name: ${userDetails.name} -- Total Expense : ${userDetails.totalExpense}</li>`;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        // If the leaderboard element already has child nodes,
        // it means that the leaderboard has already been displayed,
        // so we can simply replace the previous data with the new data.
        axios.get('http://34.227.25.232/premium/showLeaderBoard', {headers:{"Authorization": token}})
          .then((response) => {
            const userArray = response.data;
            console.log(userArray); // will get array of users in form of object

            leaderBoardElement.innerHTML = '<h1>Leader Board</h1>';

            userArray.forEach((userDetails) => {
              leaderBoardElement.innerHTML += `<li>Name: ${userDetails.name} -- Total Expense : ${userDetails.totalExpense}</li>`;
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
  }

  document.getElementById('message').appendChild(newElement)
}

function expenseDetails(){    
  window.location.href = "/expensedetails.html"
}

const table = document.getElementById("expenseTable");
table.addEventListener("click", (event) => {
  const target = event.target;
  const row = target.parentNode.parentNode;
  const id = row.cells[0].textContent;
  const token = localStorage.getItem("token");
  if (target.classList.contains("edit")) {
    const amount = row.cells[1].textContent;
    const description = row.cells[2].textContent;
    const category = row.cells[3].textContent;

    document.querySelector(".number").value = amount;
    document.querySelector(".description").value = description;
    document.querySelector("#Category").value = category;
  } else if (target.classList.contains("delete")) {
    axios
      .delete(`http://34.227.25.232/expense/add/delete/${id}`,{ headers: { "Authorization": token } })
      .then((response) => {
        console.log("row deleted");
        table.deleteRow(row.rowIndex);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

document.getElementById('buyPremium').onclick = (e)=>{
  e.preventDefault()
  const token = localStorage.getItem('token')
  console.log('Premium button clicked')
  axios.get('http://34.227.25.232/purchase/premiumMembership',{headers: {"Authorization": token}})
  .then(response=>{
      const options = {
          "key" : response.data.key_id,
          "order_id" : response.data.order.id,
          "handler": async (response)=>{
              const res = await axios.post('http://34.227.25.232/purchase/updateTransactionStatus',{
                  order_id : options.order_id,
                  payment_id : response.razorpay_payment_id                       
              },{ headers : {"Authorization": token}})
    
              alert('You are PREMIUM MEMBER now')
              document.getElementById('buyPremium').style.visibility = "hidden"
              document.getElementById('message').innerHTML = "You are a Premium User"  
              localStorage.setItem('token', res.data.token)  
              leaderboard()                                
          }
      }
      const stp1 = new Razorpay(options);
      stp1.open()
      e.preventDefault()

      stp1.on('payment.failed',(response)=>{
          console.log(response);
      })
  })
}



// function updateExpense(){
//     const amount = document.querySelector('.number').value;
//     const description = document.querySelector('.description').value;
//     const category = document.querySelector('#Category').value;

//     axios.put(`http://34.227.25.232/expense-tracker/${id}`, {
//             Expense_Amount: amount,
//             Description: description,
//             Category: category
//         })
//         .then(response => {
//             console.log('updated in db')
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }