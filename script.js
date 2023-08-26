const menuSection = document.getElementById('menuSection');
const order = [];

//call to fetch food items
function getMenu(){
    const url = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';
    return fetch(url)
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log('Fetching Error : ', err);
    })
}

//creating Order Object
function TakeOrder(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            getMenu()
            .then(allItems=>{
                const burgerIds = allItems.filter(item => item.name === "Cheeseburger")[0];
                
                for (let index = 0; index < 3; index++) {
                    order.push(burgerIds);
                }
                resolve(order);
            })
        }, 2500);
    })
    .catch(err=>{
        console.log('Taking Order Error : ', err);
    })
}

//Order Preperation
function orderPrep(order){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({...order, order_status: true, paid: false});
        }, 1500);
    })
    .catch(err=>{
        console.log('Order Preparation Error : ', err);
    })

}

//Paid status
function payOrder(order){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({...order, paid: true});
        }, 1000);
    })
    .catch(err=>{
        console.log('Payment Error : ', err);
    })
}

//alert ThankYou
function thankyouFnc(){
    alert('Thank You For Ordering');
}

//function to Order
async function orderProcess(){
    try{
        await getMenu()
        .then((dishes)=>{
            let data = "";
            dishes.forEach(dish => {
                data += `
                <div class="card">
                    <div class="dishImage">
                        <img src="${dish.imgSrc}" alt="">
                    </div>
                    <div class="dishDetails">
                        <div class="left">
                            <div class="dishTitle">${dish.name}</div>
                            <div class="Price">${dish.price}</div>
                        </div>
                        <div class="right">
                            <span class="material-symbols-outlined" id="${dish.id}">add</span>
                        </div>
                    </div>
                </div>
            `;
            });
            menuSection.innerHTML = data;
        })
        .catch(err=>{
            console.log(err);
        })
    
        const takeOrder = await TakeOrder();
        console.log('Order Taken : ', takeOrder);
    
        const prepareOrder = await orderPrep(takeOrder);
        console.log('Preparing Food : ', prepareOrder);
    
        const orderPayment = await payOrder(prepareOrder);
        console.log('Order Payment : ', orderPayment);
    
        thankyouFnc()
    }
    catch(err){
        console.log('Error : ', err);
    }
}

orderProcess();