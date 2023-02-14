function getItemUnitPrice(item: any) {
  const itemPrice = item.variant ? item.variant.price : item.default_price;
  return Number(itemPrice);
}

function getItemTotalPrice(item: any) {
  return getItemUnitPrice(item) * item.quantity;
}

function sumItemsPrice(items: any[]) {
  return items.reduce((total: number, item: any) => {
    return total + getItemTotalPrice(item);
  }, 0);
}

function formatPrice(price: string | number, currency: string = 'RM') {
  if (typeof price === 'string') {
    price = Number(price);
  }
  return `${currency} ${price.toFixed(2)}`;
}

function findItemIndexFromCart(item: any, cartList: any[]) {
  return cartList.findIndex((i: any) => {
    if (item.variant) return item.variant.id === i.variant?.id;
    return i.id === item.id;
  });
}

function addItemToCart(item: any, cartList: any[]): any[] {
  const existedIdx = findItemIndexFromCart(item, cartList);
  if (existedIdx >= 0) {
    const cartItem = cartList[existedIdx];
    cartItem.quantity += 1;
  } else {
    const product = { ...item, quantity: 1 };
    cartList.push(product);
  }
  return [...cartList];
}

function removeItemFromCart(item: any, cartList: any[]): any[] {
  const existedIdx = findItemIndexFromCart(item, cartList);
  const cartItem = cartList[existedIdx];
  cartItem.quantity -= 1;
  if (cartItem.quantity <= 0) {
    cartList.splice(existedIdx, 1);
  }
  return [...cartList];
}

function updateItemQuantityFromCart(item: any, cartList: any[], quantity: number): any[] {
  const existedIdx = findItemIndexFromCart(item, cartList);
  const cartItem = cartList[existedIdx];
  if (quantity <= 0) {
    cartList.splice(existedIdx, 1);
  } else {
    cartItem.quantity = quantity;
  }
  return [...cartList];
}

function filterItemList(itemList: any, searchStr: string) {
  return itemList.filter((category: any) => {
    // 1st level filter - if category name matched search string, return found
    if (category.name.toLowerCase().includes(searchStr)) return true;

    const innerFiltered = category.items.filter((i: any) => {
      // 2nd level filter - if item name matched search string, return found
      if (i.name.toLowerCase().includes(searchStr)) return true;

      // 3rd level filter - if any of item variants matched search string, return found
      const variantFiltered = i.variants.filter((vi: any) =>
        vi.description.toLowerCase().includes(searchStr),
      );
      return variantFiltered.length > 0;
    });

    category.items = innerFiltered;
    return innerFiltered.length > 0;
  });
}

function getItemDescription(item: any) {
  return item.variant ? `${item.description} - ${item.variant.description}` : item.description;
}

function formatAddress(object: any) {
  if (object) {
    const { address_1, address_2, address_3, city, state, postal, country } = object;
    return (
      [address_1, address_2, address_3, city, state, postal, country].filter(Boolean).join(', ') ||
      '-'
    );
  }
  return '-';
}

function coloriseItemName(itemName: string) {
  if (itemName) {
    itemName = itemName.replace(/lunch/gi, '<strong class="text-primary">$&</strong>');
    itemName = itemName.replace(/dinner/gi, '<strong class="text-danger">$&</strong>');
  }
  return itemName;
}

export {
  getItemUnitPrice,
  getItemTotalPrice,
  sumItemsPrice,
  formatPrice,
  findItemIndexFromCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantityFromCart,
  filterItemList,
  getItemDescription,
  formatAddress,
  coloriseItemName,
};
