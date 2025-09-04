let cart = [
    { name: "Shoes", price: 50, quantity: 2 },
    { name: "T-shirt", price: 20, quantity: 1 },
    { name: "Jeans", price: 40, quantity: 3 }
];

function formatMoney(value) {
    return "$" + value.toFixed(2);
}

function applyDiscount(total, discountRate) {
    return total * discountRate;
}

function applyTax(total, taxRate) {
    return total * taxRate;
}

function applyoffer(price, quantity) {
    let normal = price * quantity;
    let bogo = Math.ceil(quantity / 2) * price;
    let halfoff = quantity >= 2 ? normal * 0.50 : normal;

    return Math.min(normal, bogo, halfoff);
}


function showExpensiveItems(cart, minPrice) {
    let expensive = cart.filter(({ price }) => price > minPrice);
    console.log("Expensive Items:");
    expensive.forEach(({ name, price }) => {
        console.log(name + " -> " + formatMoney(price));
    });
}


function showCheapest(cart, maxPrice) {
    let cheapest = cart.filter(({ price }) => price <= maxPrice);
    console.log("Cheapest Items:");
    cheapest.forEach(({ name, price }) => {
        console.log(name + " -> " + formatMoney(price));
    });
}


function averageofitems(cart) {
    let sum = cart.reduce((sum, { price, quantity }) => {
        return sum + applyoffer(price, quantity);
    }, 0);

    let average = sum / cart.length;
    console.log("Average Item Total (after offers): " + formatMoney(average));
}

function listItems(cart){
    let items = cart.map(({name,price,quantity})=>{
        let total = applyoffer(price,quantity);
        return (name +"x"+quantity+ "->"+ formatMoney(total))
    })
    console.log("cart items")
    items.forEach(line => console.log(line))

}

function validateCart(cart){
    if(cart.some(({price})=> price>100)){
        console.log("Warning: Some items are expensive")
    }
    if(cart.every(({quantity})=> quantity>0)){
        console.log(" All items are valid with proper quantities.")
    } else {
        console.log(" All items are invalid")
    }
}
listItems(cart);
validateCart(cart);
checkout(cart, 0.15, 0.08, 15);

function sortCartByPrice(cart,order='asc'){
    let sorted= [...cart].sort((a,b)=>{
        return order==='asc' ? a.price-b.price:b.price-a.price
    })
    console.log("cart sorted by price (" + order + "):")
    sorted.forEach(({name,price})=>{
        console.log(name+ "->"+formatMoney(price))
    })
}
sortCartByPrice(cart, "asc");
sortCartByPrice(cart, "desc");

function checkout(cart, discountRate, taxRate, shiprate) {
    let discount = 0;
    let shipping = 0;
    let grandTotal = 0;

    discountRate = discountRate || 0;
    taxRate = taxRate || 0;
    shiprate = shiprate || 0;

    for (let { name, price, quantity } of cart) {
        let itemTotal = applyoffer(price, quantity);
        console.log(name + " (x" + quantity + ") -> " + formatMoney(itemTotal));
        grandTotal += itemTotal;
    }

    console.log("----------------");
    console.log("Grand Total: " + formatMoney(grandTotal));

    if (grandTotal < 100) {
        console.log("No Discount Applied");
    } else {
        discount = applyDiscount(grandTotal, discountRate);
        console.log("Discount applied: " + formatMoney(discount));
    }

    let afterDiscount = grandTotal - discount;
    console.log("After Discount: " + formatMoney(afterDiscount));

    let tax = applyTax(afterDiscount, taxRate);
    console.log("Tax: " + formatMoney(tax));

    let finalTotal = afterDiscount + tax;

    if (finalTotal < 200) {
        shipping = shiprate;
        console.log("Shipping: " + formatMoney(shipping));
    }

    finalTotal += shipping;
    console.log("Final Total: " + formatMoney(finalTotal));
}


showExpensiveItems(cart, 30);
showCheapest(cart, 30);
averageofitems(cart);
checkout(cart, 0.15, 0.08, 15);
