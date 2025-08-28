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
function applyoffer(item) {
    let normal = item.price * item.quantity;
    let bogo = Math.ceil(item.quantity / 2) * item.price;
    let halfoff = item.quantity >= 2 ? normal * 0.50 : normal;

    return Math.min(normal, bogo, halfoff);
}

function checkout(cart, discountRate, taxRate, shiprate) {
    let grandTotal = 0;
    let discount = 0;
    let shipping = 0;
    discountRate = discountRate || 0;
    taxRate = taxRate || 0;
    shiprate = shiprate || 0;

    for (let item of cart) {
        let itemTotal = applyoffer(item);
        console.log(item.name + " (x" + item.quantity + ") → " + formatMoney(itemTotal));
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

checkout(cart, 0.15, 0.08, 15);
