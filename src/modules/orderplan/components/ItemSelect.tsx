import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import {
  addToCart,
  removeFromCart,
  setCartItemQuantity,
  setCartList,
  setCurrentStep,
} from '../redux/planSlice';
import { CCard, CCardBody } from '@coreui/react';
import OrderMenu from 'src/components/OrderMenu';
import OrderCart from 'src/components/OrderCart';
import { getItemDescription } from 'src/helpers';

const ItemSelect = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const planState = useSelector((state: any) => state.plan);
  const { currentStep, selectedMenu, selectedPlan, itemList, cartList } = planState;

  const addToCartHandler = (item: any) => {
    dispatch(addToCart(item));
  };

  const removeFromCartHandler = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const updateQuantityHandler = (item: any, quantity: number) => {
    dispatch(setCartItemQuantity({ item, quantity }));
  };

  const confirmOrderHandler = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between pb-4">
      {/* <MenuSection > */}
      <div
        className="pr-2"
        style={{ flex: '1', height: 'calc(100vh - 160px)', minHeight: '350px' }}>
        <CCard className="h-100">
          <CCardBody className="h-100">
            {selectedMenu && itemList.length <= 0 && <p>There is no item in this menu yet</p>}
            <OrderMenu
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
              updateQuantityHandler={updateQuantityHandler}
              selectedMenu={selectedMenu}
              itemList={itemList}
              cartList={cartList}
              title={getItemDescription(selectedPlan)}
            />
          </CCardBody>
        </CCard>
      </div>
      {/* </MenuSection > */}

      {/* <CartSection > */}
      <div
        className="pl-2"
        style={{ flex: '1', height: 'calc(100vh - 160px)', minHeight: '350px' }}>
        <CCard className="h-100">
          <CCardBody className="h-100">
            <OrderCart
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
              updateQuantityHandler={updateQuantityHandler}
              confirmOrderHandler={confirmOrderHandler}
              clearCartHandler={() => dispatch(setCartList([]))}
              cartList={cartList}
              disableConfirm={!cartList.length}
              isPlan
              selectedPlan={selectedPlan}
            />
          </CCardBody>
        </CCard>
      </div>
      {/* </CartSection > */}
    </div>
  );
};

export default React.memo(ItemSelect);
