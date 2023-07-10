let addBtn = document.querySelector('.addBtn');
let items = document.querySelector('.items');
let input_category = document.querySelector('#input_category');
let input_price = document.querySelector('#input_price');
let ArrObj = [];
// let ArrObj2 = [];

addBtn.addEventListener('click', () => {

    ArrObj.push({ 'catVal': input_category.value, 'priceval': input_price.value, 'id': ArrObj.length, 'listValues': [] });

    renderCards(ArrObj);
    renderExpenses(ArrObj, '')
    console.log(ArrObj);

    input_category.value = '';
    input_price.value = '';


    let spent__add = document.querySelectorAll('.spent__add');
    spent__add.forEach((ele, idx) => {
        ele.addEventListener('click', (e) => {

            let parentContainer = e.target.closest('.item__cat__price');
            let expensesDiv = parentContainer.querySelector('.expenses');
            let spentMoneyInput = parentContainer.querySelector('.spendMoney');
            let itemCat = parentContainer.querySelector('#itemCat');
            var cateAO2 = itemCat.innerText;
            ArrObj.forEach(function (el) {
                if (el.id == e.target.dataset.cl) {
                    el.listValues.push({ 'price': spentMoneyInput.value })
                }
            })
            // ArrObj2.push({ [cateAO2]: itemCat.innerText, 'expensesPrice': spentMoneyInput.value, 'id': idx });
            renderExpenses(ArrObj, e.target.dataset.cl, expensesDiv);
            // console.log('ArrObj2:', ArrObj2);
        });
    });
});

function renderCards(arrdata) {
    var htmlStr = '';
    arrdata.forEach(function (ele, ind) {
        htmlStr += `
            <div class="item__cat__price">
                <h3 id="category__price"><p id="itemCat">${ele.catVal}</p><span> (${ele.priceval}&#8377)</span> </h3>
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
}

function renderExpenses(expensesData, dataSetID, expensesDiv) {
    let htmlStr2 = '';
    expensesData.forEach((expense) => {
        // console.log('expense: ' , expense)
        htmlStr2 = '';
        if (dataSetID == '') {
            expense.listValues.forEach((ex) => {
                htmlStr2 += `
            <p>${ex.price}</p>
        `;
            })
            document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('.expenses').innerHTML = htmlStr2;
        } else {
            if (expense.id == dataSetID) {
                expense.listValues.forEach((ex) => {
                    htmlStr2 += `
                <p>${ex.price}</p>
            `;
                });
                expensesDiv.innerHTML = htmlStr2;
            }
        }


    });


}