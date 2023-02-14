import React from 'react';
import {
  CListGroup,
  CListGroupItem,
  CButton,
  CFormGroup,
  CCol,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { coloriseItemName, deepCopy, filterItemList } from 'src/helpers';
import InputModal, { useInputModal } from '../Modal/InputModal';

interface MenuProps {
  addToCartHandler: React.FormEventHandler;
  removeFromCartHandler: React.FormEventHandler;
  updateQuantityHandler: Function;
  selectedMenu: any;
  itemList: any[];
  cartList: any[];
  title?: string;
}

const OrderMenu = (props: MenuProps) => {
  const {
    addToCartHandler,
    removeFromCartHandler,
    updateQuantityHandler,
    selectedMenu,
    itemList,
    cartList,
    title,
  } = props;
  const [search, setSearch] = React.useState<any>('');
  const { state: inputModalState, openModal, closeModal } = useInputModal();

  React.useEffect(() => {
    setSearch('');
  }, [selectedMenu]);

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

  const filteredList = () => {
    const cloned = deepCopy(itemList);
    const searchStr = search.toLowerCase();
    return filterItemList(cloned, searchStr);
  };

  const CartActionButtons = (actionButtonProps: any) => {
    const { item } = actionButtonProps;
    const existedInCart = cartList.find((i: any) => {
      if (item.variant) return item.variant.id === i.variant?.id;
      return i.id === item.id;
    });

    if (cartList) {
      if (existedInCart) {
        return (
          <div className="float-right align-middle">
            <CButton size="sm" onClick={() => removeFromCartHandler(item)}>
              <CIcon name="cil-minus" size="sm" />
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              size="sm"
              className="py-1 px-2"
              onClick={() => editQuantityHandler(item, existedInCart.quantity)}>
              {existedInCart.quantity}
            </CButton>
            <CButton size="sm" onClick={() => addToCartHandler(item)}>
              <CIcon name="cil-plus" size="sm" />
            </CButton>
          </div>
        );
      }
      return (
        <div className="float-right align-middle">
          <CButton size="sm" onClick={() => addToCartHandler(item)}>
            <CIcon name="cil-plus" size="sm" />
          </CButton>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {inputModalState.show && <InputModal {...inputModalState} />}

      <div className="h-100">
        {!!itemList.length && (
          <CFormGroup row>
            <CCol className="controls">
              {!!title && <p className="font-weight-bold">{title}</p>}
              <CInputGroup className="input-prepend">
                <CInputGroupPrepend>
                  <CInputGroupText className="bg-white">
                    <CIcon name="cil-magnifying-glass" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  id="prependedInput"
                  size="16"
                  type="search"
                  placeholder="Search Item"
                  value={search}
                  onChange={(ev: any) => setSearch(ev.target.value)}
                />
              </CInputGroup>
            </CCol>
          </CFormGroup>
        )}
        <div style={{ height: `calc(100% - ${title ? 90 : 50}px)`, overflow: 'auto' }}>
          <CListGroup>
            {(search ? filteredList() : itemList).map((category: any) => {
              return (
                <div key={`category-${category.id}`}>
                  <CListGroupItem
                    className="text-uppercase justify-content-between font-weight-bold"
                    color="info">
                    <span
                      className="align-middle"
                      // eslint-disable-next-line
                      dangerouslySetInnerHTML={{ __html: coloriseItemName(category.name) }}
                    />
                  </CListGroupItem>
                  {category.items.map((item: any) => (
                    <CListGroupItem
                      key={`item-${item.id}`}
                      className={`justify-content-between ${
                        item.variants.length <= 0 && 'hover-bg-light'
                      }`}>
                      <div>
                        <span
                          className="align-middle"
                          // eslint-disable-next-line
                          dangerouslySetInnerHTML={{ __html: coloriseItemName(item.name) }}
                        />
                        {item.variants.length <= 0 && <CartActionButtons item={item} />}
                      </div>
                      {item.variants.length > 0 &&
                        item.variants.map((variant: any) => (
                          <div key={`item-variant-${variant.id}`}>
                            <CListGroup className="w-100" flush>
                              <CListGroupItem
                                className="justify-content-between p-0 py-1 pl-3 hover-bg-light"
                                accent="info">
                                <span
                                  className="align-middle"
                                  // eslint-disable-next-line
                                  dangerouslySetInnerHTML={{
                                    __html: coloriseItemName(variant.description),
                                  }}
                                />
                                <CartActionButtons item={{ ...item, variant }} />
                              </CListGroupItem>
                            </CListGroup>
                          </div>
                        ))}
                    </CListGroupItem>
                  ))}
                </div>
              );
            })}
          </CListGroup>
        </div>
      </div>
    </>
  );
};

export default React.memo(OrderMenu);
