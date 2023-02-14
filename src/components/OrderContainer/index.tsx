import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInputRadio,
  CLabel,
  CRow,
  CSelect,
} from '@coreui/react';

interface ContainerProps {
  menus: any[];
  selectedMenu?: string | number;
  handleMenuChange?: React.FormEventHandler;
  resetHandler?: React.FormEventHandler;
  children?: React.ReactNode;
  type?: 'list' | 'radio';
}

const OrderContainer = (props: ContainerProps) => {
  const {
    menus = [],
    selectedMenu,
    handleMenuChange = () => {},
    resetHandler = () => {},
    children,
    type = 'list',
  } = props;

  return (
    <React.Fragment>
      <CCard accentColor="warning" className="mb-0">
        <CCardBody>
          <CRow>
            <CCol xs="12" sm="6" className="p-2 align-self-center">
              {/* <ListType> */}
              {type === 'list' && (
                <CSelect
                  name="menu_id"
                  id="menu_id"
                  value={selectedMenu}
                  onChange={handleMenuChange}>
                  <option value="" disabled={!!selectedMenu}>
                    Please Select Menu
                  </option>
                  {menus.map((menu: any) => {
                    return (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    );
                  })}
                </CSelect>
              )}
              {/* </ListType> */}

              {/* <RadioType */}
              {type === 'radio' &&
                menus.map((menu: any) => {
                  return (
                    <CFormGroup variant="custom-radio" key={menu.id} inline>
                      <CInputRadio
                        custom
                        className="form-check-input"
                        id={menu.id}
                        name="menu_id"
                        value={menu.id}
                        checked={menu.id === selectedMenu}
                        onChange={handleMenuChange}
                      />
                      <CLabel variant="custom-checkbox" htmlFor={menu.id}>
                        {menu.name}
                      </CLabel>
                    </CFormGroup>
                  );
                })}
              {/* </RadioType */}
            </CCol>
            <CCol xs="12" sm="6" className="p-2 text-right">
              <CButton color="danger" onClick={resetHandler}>
                Reset
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      {children}
    </React.Fragment>
  );
};

export default React.memo(OrderContainer);
