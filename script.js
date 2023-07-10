let addBtn = document.querySelector('.addBtn');
let items = document.querySelector('.items');
let input_category = document.querySelector('#input_category');
let input_price = document.querySelector('#input_price');
let ArrObj = [];

console.log('ArrObj', ArrObj)

// Add event listener to the "Add" button
addBtn.addEventListener('click', () => {
    ArrObj.push({ 'catVal': input_category.value, 'priceval': input_price.value, 'id': ArrObj.length, 'listValues': [] });

    saveCardsToLocal();

    renderCards(ArrObj);
    // console.log(ArrObj);

    renderExpenses(ArrObj, '');

    input_category.value = '';
    input_price.value = '';

    // Move the event listener outside the click event for "Add" button
    // attachPlusButtonEventListeners();
});

// Function to attach event listeners to the plus buttons
function attachPlusButtonEventListeners() {
    let spent__add = document.querySelectorAll('.spent__add');
    spent__add.forEach((ele, idx) => {
        ele.addEventListener('click', (e) => {
            let parentContainer = e.target.closest('.item__cat__price');
            let expensesDiv = parentContainer.querySelector('.expenses');
            let spentMoneyInput = parentContainer.querySelector('.spendMoney');
            let remaining = parentContainer.querySelector('#remaining');
            ArrObj.forEach((ele) => {
                if (ele.id == e.target.dataset.cl) {
                    ele.listValues.push({ 'price': spentMoneyInput.value })
                }
            })
            renderExpenses(ArrObj, e.target.dataset.cl, expensesDiv, remaining);
            saveCardsToLocal();
            console.log('ArrObjOne :', ArrObj);
        });
    });
}

// Function to render the cards
function renderCards(arrdata) {
    var htmlStr = '';
    arrdata.forEach(function (ele, ind) {
        htmlStr += `
            <div class="item__cat__price">
                <h3 id="category__price"><p id="itemCat">${ele.catVal}</p> <span class="itemPrice">${ele.priceval}&#8377;</span> </h3>
         
                <p id="remaining"></p>
                <div class="spent">
                    <input type="number" class="spendMoney" placeholder="type your spent money">
                    <i class="fa-solid fa-plus spent__add" data-cl="${ele.id}"></i>
                </div>
                <div class="expenses">
                </div>
            </div>
        `;
    });

    items.innerHTML = htmlStr;

    attachPlusButtonEventListeners(); // Attach event listeners after rendering the cards

}


// Function to render the expenses
function renderExpenses(expensesData, dataSetID, expensesDiv, remainingTag) {
    let htmlStr2 = '';
    let htmlStr3 = '';
    let sum = 0;
    expensesData.forEach((expense) => {
        htmlStr2 = '';
        if (dataSetID == '') {
            expense.listValues.forEach((ex) => {
                htmlStr2 += `
                    <p>${ex.price}</p>
                `;
                sum += Number(ex.price);
                console.log(sum);
                htmlStr3 = `<span>Remaining ${expense.priceval - sum} &#8377;</span>`;
            });
            sum = 0;
            document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('.expenses').innerHTML = htmlStr2;
            document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('#remaining').innerHTML = htmlStr3;
            htmlStr3 = '';
            console.log('if:');
        } else {
            if (expense.id == dataSetID) {
                expense.listValues.forEach((ex) => {
                    htmlStr2 += `
                        <p>${ex.price}</p>
                    `;
                    sum += Number(ex.price);
                    console.log(sum);
                    htmlStr3 = `<span>Remaining ${expense.priceval - sum} &#8377;</span>`;
                });
                expensesDiv.innerHTML = htmlStr2;
                remainingTag.innerHTML = htmlStr3;
            }
            console.log('else:');
        }
    });
}

// Function to save the cards to local storage
function saveCardsToLocal() {
    localStorage.setItem('Lcat', JSON.stringify(ArrObj));
}

// Function to load the cards from local storage
function loadCardsFromLocal() {
    const storedCards = localStorage.getItem('Lcat');
    if (storedCards) {
        ArrObj = JSON.parse(storedCards);
    }
}

// Function to save the expenses to local storage
function saveExpensesToLocal() {
    localStorage.setItem('Expenses', JSON.stringify(ArrObj));
}

// Function to load the expenses from local storage
function loadExpensesFromLocal() {
    const storedExpenses = localStorage.getItem('Expenses');
    if (storedExpenses) {
        ArrObj = JSON.parse(storedExpenses);
    }
}

// Immediately invoked function expression (IIFE) to load the cards and expenses from local storage and render them on page load
(function () {
    loadCardsFromLocal();
    renderCards(ArrObj);
    loadExpensesFromLocal();
    renderExpenses(ArrObj, '');
})(); 
