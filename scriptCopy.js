
let addBtn = document.querySelector('.addBtn');
let items = document.querySelector('.items');
let input_category = document.querySelector('#input_category');
let input_price = document.querySelector('#input_price');
let ArrObj = JSON.parse(localStorage.getItem('Lcat')) || []; 
console.log('aqwe', ArrObj)
renderCards(ArrObj);

// const saveNames = () => {
//     const Lcat = document.querySelectorAll('#itemCat');
//     let data = [];
//     Lcat.forEach((item) => {
//         data.push(item.innerText)
//     })
//     console.log(data);

//     localStorage.setItem('Lcat', JSON.stringify(data))
// }



addBtn.addEventListener('click', () => {
    ArrObj.push({ 'catVal': input_category.value, 'priceval': input_price.value, 'id': ArrObj.length, 'listValues': [] ,});

    renderCards(ArrObj);
    console.log(ArrObj);

    saveToLocalStorage();

    renderExpenses(ArrObj, '')



    input_category.value = '';
    input_price.value = '';

    let spent__add = document.querySelectorAll('.spent__add');
    spent__add.forEach((ele, idx) => {
        ele.addEventListener('click', (e) => {
            alert(23)
            // console.log('clVal' , e.target.dataset.cl)
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

            console.log('ArrObjOne :', ArrObj);
        });

    });


});


function renderCards(arrdata) {
    var htmlStr = '';
    arrdata.forEach(function (ele, ind ) {
        htmlStr += `
            <div class="item__cat__price">
                <h3 id="category__price"><p id="itemCat">${ele.catVal}</p> <span class="itemPrice">${ele.priceval}&#8377</span> </h3>
         
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


}

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
                sum += Number(ex.price)
                console.log(sum)


                htmlStr3 = `<span>Remaning ${expense.priceval - sum} &#8377</span>`;


            })
            sum = 0;
            document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('.expenses').innerHTML = htmlStr2;


            document.querySelector('[data-cl="' + expense.id + '"]').closest('.item__cat__price').querySelector('#remaining').innerHTML = htmlStr3;

            htmlStr3 = '';

            console.log('if :')
        } else {
            if (expense.id == dataSetID) {
                expense.listValues.forEach((ex) => {
                    htmlStr2 += `
                    <p>${ex.price}</p>
                `;

                    sum += Number(ex.price)
                    console.log(sum)

                    htmlStr3 = `<span>Remaning ${expense.priceval - sum} &#8377</span>`;
                })

                expensesDiv.innerHTML = htmlStr2;
                remainingTag.innerHTML = htmlStr3;



            }
            console.log('else :')
        }


    });

}

function saveToLocalStorage () {
    localStorage.setItem('Lcat', JSON.stringify(ArrObj))
}

(
    function () {
      
    }
)();



