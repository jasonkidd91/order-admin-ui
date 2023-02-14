import React from 'react';
import { CListGroup, CListGroupItem, CButton, CContainer, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import InputModal, { useInputModal } from '../Modal/InputModal';
import { formatPrice, getItemTotalPrice, getItemUnitPrice, sumItemsPrice } from 'src/helpers';

interface RequiredProps {
  addToCartHandler: React.FormEventHandler;
  removeFromCartHandler: React.FormEventHandler;
  updateQuantityHandler: Function;
  confirmOrderHandler: React.FormEventHandler;
  clearCartHandler: React.FormEventHandler;
  cartList: any[];
  disableConfirm?: boolean;
}

type CartProps =
  | (RequiredProps & { isPlan?: false; selectedPlan?: any })
  | (RequiredProps & { isPlan: true; selectedPlan: any });

const OrderCart = (props: CartProps) => {
  const {
    addToCartHandler,
    removeFromCartHandler,
    updateQuantityHandler,
    confirmOrderHandler,
    clearCartHandler,
    cartList,
    disableConfirm,
    isPlan,
    selectedPlan,
  } = props;
  const { state: inputModalState, openModal, closeModal } = useInputModal();

  const editQuantityHandler = (item: any, currentQty: any) => {
    openModal({
      show: true,
      title: 'Quantity',
      placeholder: 'Enter quntity',
      value: currentQty || 0,
      size: 'sm',
      closeHandler: closeModal,
      submitHandler: (quantity: any) => {
        if (!Number.isNaN(+quantity)) {
          updateQuantityHandler(item, quantity);
        }
        closeModal();
      },
    });
  };

  // const getSubTotal = () => (isPlan ? getItemUnitPrice(selectedPlan) : sumItemsPrice(cartList));
  const getSubTotal = () =>
    isPlan ? getItemUnitPrice(selectedPlan) + sumItemsPrice(cartList) : sumItemsPrice(cartList);

  const CartItem = (itemProps: any) => {
    const { item } = itemProps;
    return (
      <CListGroupItem className="justify-content-between" accent="dark" color="secondary">
        <span className="d-flex w-100 justify-content-between align-items-center">
          <span className="d-flex flex-column">
            <div className="d-flex flex-column">
              <strong>{item.name}</strong>
              {!!item.variant && <small>{item.variant.description}</small>}
            </div>
            {!isPlan && <small>{formatPrice(getItemTotalPrice(item))}</small>}
          </span>
          <span className="align-middle">
            <div className="float-right align-middle">
              <CButton size="sm" onClick={() => removeFromCartHandler(item)}>
                <CIcon name="cil-minus" size="sm" />
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                size="sm"
                className="py-1 px-2"
                onClick={() => editQuantityHandler(item, item.quantity)}>
                {item.quantity}
              </CButton>
              <CButton size="sm" onClick={() => addToCartHandler(item)}>
                <CIcon name="cil-plus" size="sm" />
              </CButton>
            </div>
          </span>
        </span>
      </CListGroupItem>
    );
  };

  return (
    <>
      {inputModalState.show && <InputModal {...inputModalState} />}

      <div className="d-flex flex-column  h-100">
        <div className="d-flex py-1 align-items-center">
          <h5>Cart Items ({cartList.length})</h5>
          <div className="ml-auto">
            <CButton
              size="sm"
              className="btn-facebook btn-brand mr-1 mb-1"
              onClick={clearCartHandler}
              disabled={!cartList.length}>
              Clear Cart
            </CButton>
          </div>
        </div>

        <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <CListGroup accent>
            {cartList.length ? (
              cartList.map((item: any, idx: number) => (
                <CartItem key={`${item.id}-${idx}`} item={item} />
              ))
            ) : (
              <span>This is an empty cart</span>
            )}
          </CListGroup>
        </div>
        <CContainer fluid className="border-top mt-3 pt-3">
          <CRow>
            <CCol>
              <CButton
                color="danger font-weight-bold"
                block
                onClick={confirmOrderHandler}
                disabled={disableConfirm}>
                Confirm Order ({formatPrice(getSubTotal())})
              </CButton>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default React.memo(OrderCart);
