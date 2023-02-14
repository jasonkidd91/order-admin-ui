import React from 'react';
import { CCard, CCardBody } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import {
  getMenuList,
  getMenuItemList,
  getMenuStores,
  setOrderDetail,
  setSelectedMenu,
  setCartList,
  addToCart,
  removeFromCart,
  getStoreSlots,
  setSelectedStore,
  getOrderDetails,
  initialState,
  setScreenState,
  resetOrderState,
  setCartItemQuantity,
} from '../redux/orderSlice';
import { globalToast } from 'src/redux/slice';
import OrderContainer from 'src/components/OrderContainer';
import OrderMenu from 'src/components/OrderMenu';
import OrderCart from 'src/components/OrderCart';
import useSearchParams from 'src/hooks/useSearchParams';
import { ScreenState } from '../redux/types';
import OrderDetailModal from '../components/OrderDetailModal';
import { deepCopy, formatDate, parseDate } from 'src/helpers';

const AddOrder = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const { id, update_ids } = useSearchParams<any>();
  const [showSummary, setShowSummary] = React.useState(false);
  const [auth, orderState] = useSelector((state: any) => [state.auth, state.order] as const);
  const { availableMenus, selectedMenu, itemList, cartList } = orderState;

  const init = () => {
    // initialize effect
    // - reset order state
    // - get menu list
    try {
      dispatch(resetOrderState());
      dispatch(getMenuList(auth));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    // on edit order effect if id is available
    // - retrieve existing order
    // - set screen state to edit
    // - set menu and store and store's slot
    // - retrieve menu item list and add to cart
    // - set order details state to existing order
    if (id) {
      getOrderDetails(auth, id)
        .then(async (data) => {
          const { menu: order_menu, store: order_store, order_details, latitude, longitude } = data;
          const coordinate = latitude && longitude ? { lat: latitude, lng: longitude } : null;

          dispatch(setScreenState(ScreenState.EDIT));
          dispatch(setSelectedMenu(order_menu));
          dispatch(getMenuStores(auth, order_menu.id));
          dispatch(setSelectedStore(order_store));
          dispatch(getStoreSlots(auth, order_store.id));
          const products = await dispatch(getMenuItemList(auth, order_menu.id));
          const flatten = products.flatMap((p: any) => p.items);
          order_details.forEach((detail: any) => {
            const { item_id, variant_id, item_quantity } = detail;
            let item = deepCopy(flatten.find((p: any) => p.id === Number(item_id)));
            if (variant_id) {
              item.variant = item.variants.find((v: any) => v.id === Number(variant_id));
            }
            // add to cart
            [...Array(item_quantity)].forEach(() => dispatch(addToCart(item)));
          });

          dispatch(
            setOrderDetail({
              ...initialState.orderDetail,
              id: data.id,
              slot_type: data.slot_type_id,
              delivery_charge: data.delivery_charge,
              discount_amount: data.discount_amount,
              customer_id: data.customer_id,
              first_name: data.customer_first_name,
              last_name: data.customer_last_name,
              phone_no: data.customer_phone_number,
              email: data.customer_email,
              recipient_name: data.recipient_name,
              recipient_phone_number: data.recipient_phone_number,
              delivery_address_1: data.delivery_address_1,
              delivery_address_2: data.delivery_address_2,
              delivery_address_3: data.delivery_address_3,
              delivery_postal: data.delivery_postal,
              delivery_city: data.delivery_city,
              delivery_state: data.delivery_state,
              delivery_country: data.delivery_country,
              coordinate,
              delivery_remark: data.delivery_remark,
              customer_remark: data.order_remarks,
              // kitchen_remark: '',
              delivery_date: formatDate(parseDate(data.original_delivery_date), 'YYYY-MM-DD'),
              slot_id: data.slot_id,
              payment_mode_id: data.payment_mode_id,
              update_ids,
            }),
          );
        })
        .catch((err) => {
          console.log(err);
          dispatch(globalToast('error', err?.message));
        });
    }
  }, [id]);

  const switchMenuHandler = (ev: any) => {
    const { value } = ev.target;
    const menu = availableMenus.find((m: any) => m.id === Number(value));

    if (!menu) {
      dispatch(globalToast('error', 'Not a valid menu'));
      return;
    }

    if (menu !== selectedMenu) {
      try {
        dispatch(setSelectedMenu(menu));
        dispatch(getMenuItemList(auth, menu.id));
        dispatch(getMenuStores(auth, menu.id)).then((res: any) => {
          if (res && res.length > 0) {
            dispatch(setSelectedStore(res[0])); // default select first store
            dispatch(getStoreSlots(auth, res[0].id)); // get store's slot
          }
        });
        // reset
        dispatch(setCartList([]));
        dispatch(setOrderDetail({ ...initialState.orderDetail }));
      } catch (err: any) {
        dispatch(globalToast('error', err?.message));
      }
    }
  };

  const addToCartHandler = (item: any) => {
    dispatch(addToCart(item));
  };

  const removeFromCartHandler = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const updateQuantityHandler = (item: any, quantity: number) => {
    dispatch(setCartItemQuantity({ item, quantity }));
  };

  return (
    <>
      {showSummary && (
        <OrderDetailModal show={showSummary} onCloseHandler={() => setShowSummary(false)} />
      )}

      <OrderContainer
        type="radio"
        menus={availableMenus}
        selectedMenu={selectedMenu?.id}
        handleMenuChange={switchMenuHandler}
        resetHandler={() => init()}>
        {!!selectedMenu && (
          <div className="d-flex flex-column flex-sm-row justify-content-between py-2">
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
                    title={id ? `Editing Order #${id}` : undefined}
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
                    confirmOrderHandler={() => setShowSummary(true)}
                    clearCartHandler={() => dispatch(setCartList([]))}
                    cartList={cartList}
                    disableConfirm={!cartList.length}
                  />
                </CCardBody>
              </CCard>
            </div>
            {/* </CartSection > */}
          </div>
        )}
      </OrderContainer>
    </>
  );
};

export default AddOrder;
