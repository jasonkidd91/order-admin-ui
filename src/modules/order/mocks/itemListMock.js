const itemList = (menu) => ({
  menuId: menu.id,
  menuName: menu.name,
  items: [
    {
      name: 'Chicken Menu',
      items: [
        {
          id: '1',
          name: '(CA1) - Nourishing Chicken',
          price: 20.9,
        },
        {
          id: '2',
          name: '(CA2) - Parsley Mushroom Chicken',
          price: 19.9,
        },
        {
          id: '3',
          name: '(CA3) - Garlic Chicken Cube Stir',
          variants: [
            {
              id: '3a',
              name: 'Roasted',
              price: 18.9,
              isVariant: true,
            },
            {
              id: '3b',
              name: 'Steamed',
              price: 17.9,
              isVariant: true,
            },
            {
              id: '3c',
              name: 'Fry',
              price: 19.9,
              isVariant: true,
            },
          ],
        },
      ],
    },
    {
      name: 'Fish Menu',
      items: [
        {
          id: '4',
          name: '(F1) - Golden Oriental Dory Fish',
          price: 20.9,
        },
        {
          id: '5',
          name: '(F2) - Red Sauce with King Shrimp',
          price: 22.9,
        },
        {
          id: '6',
          name: '(F3) - Mermaid On The Rock',
          price: 21.9,
        },
      ],
    },
    {
      name: 'Waffle Menu',
      items: [
        {
          id: '7',
          name: '(W1) - Morning Cheesy Sandwich',
          price: 10.9,
        },
        {
          id: '8',
          name: '(W2) - Leaf Chicken Slices Sandwich',
          price: 9.9,
        },
      ],
    },
  ],
});

export default itemList;
