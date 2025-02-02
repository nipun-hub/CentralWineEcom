export const getOrderData = async ({ cartItem, isPack }) => {
    console.log("getting order data ...");
    console.log(cartItem);

    const subtotal = await getSubtotal({ cartItem, isPack });
    const totalItemQuantity = await getTotalItemQuantity({ cartItem, isPack });
    const specialDiscount = await getSpecialDiscount({ cartItem, isPack });
    const bottleDiscount = specialDiscount > 0 ? 0 : await getBottleDiscount({ cartItem, totalItemQuantity, subtotal });
    const memberDiscount = await getMemberDiscount({ cartItem, subtotal, specialDiscount, bottleDiscount });
    const totalDiscount = await getTotalDiscount({ specialDiscount, bottleDiscount, memberDiscount });
    const taxPrice = await getTax({ subtotal }); // Calculate tax correctly
    const total = await getTotal({ subtotal, totalDiscount, taxPrice });

    console.log("total:", total);

    return {
        subtotal: parseFloat(subtotal).toFixed(2),
        totalItemQuantity,
        specialDiscount: parseFloat(specialDiscount).toFixed(2),
        bottleDiscount: parseFloat(bottleDiscount).toFixed(2),
        memberDiscount: { price: parseFloat(memberDiscount).toFixed(2), percentage: memberDiscountPercentage },
        totalDiscount: parseFloat(totalDiscount).toFixed(2),
        tax: { tax: parseFloat(taxPrice).toFixed(2), percentage: tax }, // Fix tax structure
        total: parseFloat(total).toFixed(2)
    };
};

const tax = 10; // Example tax percentage (fix issue)
const memberDiscountPercentage = 0;
const item6DiscountPercentage = 10;
const item12DiscountPercentage = 15;

const getSubtotal = async ({ cartItem, isPack }) => {
    const subtotal = cartItem?.reduce((total, item) => {
        const packPrice = item?.productId?.pack?.find((pack) => pack.packSize === isPack[item?.productId?._id]?.packSize)?.packPrice || 0;
        return total + (isPack[item.productId._id]?.isPack ? packPrice * item.quantity : item.productId.unitPrice * item.quantity);
    }, 0);
    return subtotal;
};

const getTotalItemQuantity = async ({ cartItem, isPack }) => {
    return cartItem?.reduce((total, item) => {
        const packBottleCount = isPack[item.productId._id]?.isPack ? isPack[item.productId._id]?.packSize || 1 : 1;
        return total + item.quantity * packBottleCount;
    }, 0);
};

const getSpecialDiscount = async ({ cartItem, isPack }) => {
    return cartItem?.reduce((total, item) => {
        if (isPack[item.productId._id]?.isPack) {
            const packPrice = item?.productId?.pack?.find((pack) => pack.packSize === isPack[item?.productId?._id]?.packSize)?.packPrice || 0;
            return total + ((item?.productId?.unitDiscount > 0) ? (packPrice * item.productId.packDiscount / 100) * item.quantity : 0);
        }
        return total + ((item?.productId?.unitDiscount > 0) ? (item.productId.unitPrice * item.productId.unitDiscount / 100) * item.quantity : 0);
    }, 0);
};

const getBottleDiscount = async ({ totalItemQuantity, subtotal }) => {
    return totalItemQuantity >= 6
        ? totalItemQuantity >= 12
            ? subtotal * (item12DiscountPercentage / 100)
            : subtotal * (item6DiscountPercentage / 100)
        : 0;
};

const getMemberDiscount = async ({ subtotal, specialDiscount, bottleDiscount }) => {
    if (memberDiscountPercentage === 0) return 0;
    let discountBase = subtotal - Math.max(specialDiscount, bottleDiscount);
    return discountBase * (memberDiscountPercentage / 100);
};

const getTotalDiscount = async ({ specialDiscount, bottleDiscount, memberDiscount }) => {
    return parseFloat(specialDiscount) + parseFloat(bottleDiscount) + parseFloat(memberDiscount);
};

const getTax = async ({ subtotal }) => {
    return subtotal * (tax / 100);
};

const getTotal = async ({ subtotal, totalDiscount, taxPrice }) => {
    return parseFloat(subtotal) - parseFloat(totalDiscount) + parseFloat(taxPrice);
};
