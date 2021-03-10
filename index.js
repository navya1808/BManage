//declaring the variable
let addText;
let addDescription;
let addValue;
let ex = 0;
let incomeTotal = 0;
let expenseTotal = 0;
let budget = 0;
let initialExpense = 0;

//adding event listener by clicking the icon
document.getElementById("add-btn").addEventListener("click", function (e) {
  e.preventDefault();
  inputFields();
  display();
});

//adding event listener by pressing the enter key
document.addEventListener("keypress", function (e) {
  //when the user press enter then only it will display the output
  if (e.keyCode === 13) {
    e.preventDefault();
    inputFields();
    display();
  }
});

//taking the input field
function inputFields() {
  addText = document.getElementById("add-text").value;
  addDescription = document.getElementById("add-description").value;
  addValue = parseFloat(document.getElementById("add-value").value); //string to float
}

function display() {
  //addding regex
  let reg = /^([0-9]){0,10}$/;

  if (addText === "inc" && reg.test(addValue)) {
    //taking the total income
    incomeTotal += addValue;

    //displaying the income in table
    document.getElementById(
      "displayIncome"
    ).innerHTML += `<li class="list-group-item">
         <div class="row">
         <div class="col-sm-6 col-6">
           ${addDescription}
         </div>
         <div class="col-sm-6 col-6" style="text-align: right;color: blue; ">
           +${addValue}
         </div>
       </div>
       </li>`;

    //updating the income in ui
    document.getElementById(
      "total-income"
    ).innerHTML = `<b>+${incomeTotal}</b>`;

    //calling updatebudget to update the ui
    updatebudget();
  } else if (addText === "exp" && reg.test(addValue)) {
    ex = addValue;
    //taking the total Expense
    initialExpense = addValue;
    if (incomeTotal - expenseTotal - ex >= 0) {
      expenseTotal += addValue;
      //displaying the expense in table
      document.getElementById(
        "displayExpense"
      ).innerHTML += `<li class="list-group-item">
        <div class="row">
         <div class="col-sm-6 col-6">
         ${addDescription}
         </div>
         <div class="col-sm-6 col-6" style="text-align: right; color:crimson;">
         -${addValue}
         </div>
         </li>`;
    } else if (incomeTotal - expenseTotal - ex < 0) {
      document.getElementById(
        "alert"
      ).innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" style="display:block;">
  <strong>NOT ENOUGH BALANCE TO SPEND!! </strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
      function alertbox() {
        setTimeout(() => {
          document.getElementById(
            "alert"
          ).innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" style="display:none;">
  <strong>NOT ENOUGH BALANCE TO SPEND!! </strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;
        }, 4000);
      }
      alertbox();
    }

    //updating the expense in ui
    document.getElementById(
      "total-expense"
    ).innerHTML = `<b>-${expenseTotal}</b>`;

    //calling updatebudget to update the ui
    updatebudget();
  } else {
    document.getElementById(
      "get"
    ).innerHTML = `<sm style="color : red;font-size : 10px;display: block" >ENTER THE VALID  AMOUNT!!</sm>`;
    function set() {
      setTimeout(() => {
        document.getElementById(
          "get"
        ).innerHTML = `<sm style="color : red;font-size : 10px;display: none" >ENTER THE VALID  AMOUNT!!</sm>`;
      }, 4000);
    }
    set();
  }

  //clearing the input fields
  document.getElementById("form").reset();
}

//function for updating the budget controller
function updatebudget() {
  console.log(incomeTotal, expenseTotal);

  let t = incomeTotal - expenseTotal - ex;
  // console.log(t);
  if (incomeTotal - expenseTotal >= 0) {
    console.log("heee1!!");
    budget = incomeTotal - expenseTotal;
    document.getElementById(
      "total-expense"
    ).innerHTML = `<b>-${expenseTotal}</b>`;
    document.getElementById("budget").innerHTML = `<h1>+${budget}</h1>`;
  }
}
