let addBtn = document.querySelector('.addBtn');
let items = document.querySelector('.items');
let input_category = document.querySelector('#input_category');
let input_price = document.querySelector('#input_price');
let ArrObj = [];
let totalPrice = 0;
let allprice = document.querySelector('#tot_price');
let t_remain = document.querySelector('#t_remain');

console.log('ArrObj999999999999999999999999', ArrObj)

input_category.addEventListener('change', () => {
    input_price.focus();
})


// Add event listener to the "Add" button   , 'comments': [] 
addBtn.addEventListener('click', () => {
    ArrObj.push({ 'catVal': input_category.value, 'priceval': input_price.value, 'id': ArrObj.length, 'listValues': [] });



    saveCardsToLocal();

    renderCards(ArrObj);
    console.log(ArrObj);

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
            let listPriceTotal = parentContainer.querySelector('#listPriceTotal');
            let comment = parentContainer.querySelector('.comment');



            ArrObj.forEach((ele) => {

                if (ele !== null) {
                    
                    if (ele.id == e.target.dataset.cl && spentMoneyInput.value !== '' && spentMoneyInput.type == "number" && comment.value !== '' && comment.style.color !== 'red' ) {

                        ele.listValues.push({ 'price': spentMoneyInput.value, 'comment': comment.value })
                        // ele.comments.push({ 'comment': comment.value })
                    }
                }
            })

            if (spentMoneyInput.value == '') {
                spentMoneyInput.type = "text";
                spentMoneyInput.value = 'type your spent money'
                spentMoneyInput.style.color = 'red'
                spentMoneyInput.style.fontSize = '14px';
                spentMoneyInput.classList.add('errorI');
            } else {
                spentMoneyInput.classList.remove('errorI');
            }
            spentMoneyInput.addEventListener('focus', () => {
                spentMoneyInput.type = "number";
                spentMoneyInput.style.color = 'rgb(223, 215, 205)';
                spentMoneyInput.style.fontSize = '16px';
            })
            if (comment.value == '') {
                comment.value = 'type your comment'
                comment.style.color = 'red'
                comment.style.fontSize = '14px';
                comment.classList.add('errorI');
            } else {
                comment.classList.remove('errorI');
            }
            comment.addEventListener('focus', () => {
                comment.value = '';
                comment.style.color = 'burlywood';
                comment.style.fontSize = '16px';
            })


            !spentMoneyInput.classList.contains("errorI") ? !comment.classList.contains("errorI") ? spentMoneyInput.value = "" : "" : "";
            !comment.classList.contains("errorI") ? !spentMoneyInput.classList.contains("errorI") ? comment.value = "" : "" : "";

            // comment.focus();


            renderExpenses(ArrObj, e.target.dataset.cl, expensesDiv, remaining, listPriceTotal);



            saveCardsToLocal();
            console.log('ArrObjOne :', ArrObj);
        });
    });
}

function removeCrads(arrdata) {

    //    --
    let remove = document.querySelectorAll('.remove');

    arrdata.forEach((ele, index) => {
        if (ele !== null) {
            remove.forEach((item, idx) => {
                item.addEventListener('click', (e) => {

                    console.log('removeeee')
                    if (ele.id == e.target.dataset.rm) {
                        delete ArrObj[index];

                        renderCards(ArrObj)
                        saveCardsToLocal();
                        renderExpenses(ArrObj, '');
                    }

                })
            })
        }
    })

}

// Function to render the cards
function renderCards(arrdata) {

    let allListPrice = 0;
    t_remain.innerHTML = 0;

    var htmlStr = '';
    arrdata.forEach(function (ele, ind) {

        if (ele !== null) {
            htmlStr += `
            <div class="item__cat__price">
                <span class='remove' data-rm="${ele.id}" > &#10006;</span>
                <h3 id="category__price"><p id="itemCat">${ele.catVal}</p> <span class="itemPrice">${ele.priceval}&#8377;</span> </h3>
                <p id="remaining"></p>
                <div class="spent">
                    <div class="row">
                    <input type="number" class="spendMoney"  placeholder="type your spent money"> <br>
                    <input type="text" class="comment" placeholder="comment">
                    </div>
                    <i class="fa-solid fa-plus spent__add" data-cl="${ele.id}"></i>
                </div>
                <div class="expenses">
                </div>
                <p id="listPriceTotal"></p>
            </div>
        `;
        }


    });

    items.innerHTML = htmlStr;

    removeCrads(arrdata);

    if (htmlStr !== '') {
        let spentMoneyInput = document.querySelector('.spendMoney');
        spentMoneyInput.focus();
    }

    attachPlusButtonEventListeners(); // Attach event listeners after rendering the cards


    totalPrice = 0;
    arrdata.forEach((p) => {
        if (p !== null) {
            totalPrice += Number(p.priceval)
        }
    })
    allprice.innerHTML = totalPrice;

    // --
    var totalamount = document.querySelector('#tot_price');
    var all_spent_m = document.querySelector('#all_spent_m');

    all_spent_m.innerHTML = 0;
    arrdata.forEach((item) => {
        if (item !== null) {
            item.listValues.forEach((ele) => {
                if (ele !== null) {
                    allListPrice += Number(ele.price)
                    console.log('SSeleitemprice', allListPrice)
                    t_remain.innerHTML = Number(totalamount.innerText) - allListPrice;
                    console.log('SSfinallll', Number(totalamount.innerText) - allListPrice)
                    console.log('SSftotalammm', Number(totalamount.innerText))
                    all_spent_m.innerHTML = allListPrice;
                }
            })
        }
    })

}
console.log('ttpriceeeeee', totalPrice)


function removeExpense(expensesData, dataSetID, expensesDiv, remainingTag, listPriceTag) {
    let ex_remove = document.querySelectorAll('.ex_remove')

    ex_remove.forEach((item) => {

        item.addEventListener('click', (e) => {

            expensesData.forEach((ele, idx1) => {

                if (ele !== null) {

                        let parentExRemove = e.target.closest('.item__cat__price');
                        let removeElement = parentExRemove.querySelector('.remove');
                        console.log('removeElement', removeElement.dataset.rm)

                        ele.listValues.forEach((item, index) => {
                            if (item !== null) {

                                if (ele.id == removeElement.dataset.rm && e.target.dataset.exrm == index) {
                                    // delete item.listValues[index]
                                    console.log('indexListVal', index)
                                    console.log('dataSetExrm', e.target.dataset.exrm)
                                    delete expensesData[idx1].listValues[index]

                                    renderExpenses(expensesData, dataSetID, expensesDiv, remainingTag, listPriceTag)
                                    saveCardsToLocal();

                                    console.log('expensesData', expensesData)
                                }
                                console.log('listValNew', item);

                            }
                        })
                }
            })

        })
        // console.log(ex_remove)

    })
}



// Function to render the expenses
function renderExpenses(expensesData, dataSetID, expensesDiv, remainingTag, listPriceTag) {


    let htmlStr2 = '';
    let htmlStr3 = '';
    let htmlstr4 = '';
    let sum = 0;
    let allListPrice = 0;
    t_remain.innerHTML = 0;
    all_spent_m.innerHTML = 0;
    expensesData.forEach((expense) => {

        if (expense !== null) {
            htmlStr2 = '';
            if (dataSetID == '') {
                expense.listValues.forEach((ex, idx) => {
                    if (ex !== null) {
                        htmlStr2 += `
                                  <p>${ex.price} <span class="ex_commenet">${ex.comment} <span class="ex_remove" data-exrm="${idx}">&#10006;</span></span> </p> 
                                  `;
                        sum += Number(ex.price);
                        console.log(sum);
                        htmlStr3 = `<span>Remaining ${expense.priceval - sum} &#8377;</span>`;


                        htmlstr4 = `Total : ${sum}`;


                        var totalamount = document.querySelector('#tot_price');
                        var all_spent_m = document.querySelector('#all_spent_m');

                        allListPrice += Number(ex.price)
                        console.log('eleitemprice', allListPrice)

                        t_remain.innerHTML = Number(totalamount.innerText) - allListPrice;
                        console.log('finallll', Number(totalamount.innerText) - allListPrice)
                        console.log('ftotalammm', Number(totalamount.innerText))
                        all_spent_m.innerHTML = allListPrice;

                    }
                });
                document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('.expenses').innerHTML = htmlStr2;
                document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('#remaining').innerHTML = htmlStr3;
                document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('#listPriceTotal').innerHTML = htmlstr4;
                htmlStr3 = '';
                htmlstr4 = ''
                sum = 0;
                console.log('if:');

            } else {
                if (expense.id == dataSetID) {
                    expense.listValues.forEach((ex, idx) => {
                        if (ex !== null) {
                            htmlStr2 += `
                           
                            <p>${ex.price} <span class="ex_commenet">${ex.comment} <span class="ex_remove" data-exrm="${idx}">&#10006;</span></span> </p>        
                    `;
                            sum += Number(ex.price);
                            console.log('sumListPrice', sum);
                            htmlStr3 = `<span>Remaining ${expense.priceval - sum} &#8377;</span>`;

                            console.log('abqs:', expense.priceval - sum)


                            htmlstr4 = `Total : ${sum}`;

                        }
                    });
                    expensesDiv.innerHTML = htmlStr2;
                    remainingTag.innerHTML = htmlStr3;
                    listPriceTag.innerHTML = htmlstr4;


                }
                console.log('else:');

                var totalamount = document.querySelector('#tot_price');
                var all_spent_m = document.querySelector('#all_spent_m');
                expense.listValues.forEach((ele) => {
                    if (ele !== null) {
                        allListPrice += Number(ele.price)
                        console.log('eleitemprice', allListPrice)
                    }
                })
                t_remain.innerHTML = Number(totalamount.innerText) - allListPrice;
                console.log('finallll', Number(totalamount.innerText) - allListPrice)
                console.log('ftotalammm', Number(totalamount.innerText))
                all_spent_m.innerHTML = allListPrice;


            }

            removeExpense(expensesData, dataSetID, expensesDiv, remainingTag, listPriceTag);

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
    loadExpensesFromLocal();
    // renderExpenses(ArrObj, '');
    renderExpenses(ArrObj, '');
})();
