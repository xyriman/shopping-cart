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


