import { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CButton,
  CRow,
  CSelect,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreData, getPrinterList, updateStore } from '../redux/storeMaintenanceSlice';
import { useParams } from 'react-router-dom';

const StoreMaintenanceUpdate = () => {
  const dispatch = useDispatch();
  let { id } = useParams<any>();

  const [storeState, setStoreState] = useState({
    name: '',
    address_1: '',
    address_2: '',
    address_3: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    phone_number: '',
    fax_number: '',
    menu_name: '',
    feieryun_printers_id: '',
  });

  const { auth, printerList = [] } = useSelector((state: any) => {
    return {
      auth: state.auth,
      printerList: state.storemaintenance.printerMaintenanceListPayload?.data,
    };
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setStoreState({ ...storeState, [name]: value });
  };

  useEffect(() => {
    // dispatch(getReduxDataList(auth));
    dispatch(getPrinterList(auth));
  }, []);

  useEffect(() => {
    getStoreData(auth, id).then((data: any) => {
      setStoreState(data);
    });
  }, []);

  const updateStoreHandler = () => {
    dispatch(updateStore(auth, storeState, id));
  };

  return (
    <>
      <CCard>
        <CCardHeader>Store Details</CCardHeader>
        <CCardBody>
          <CFormGroup>
            <CLabel htmlFor="name">Store Name</CLabel>
            <CInput
              id="name"
              type="text"
              name="name"
              value={storeState?.name}
              onChange={handleChange}
              placeholder="Enter store name"
            />
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="address_1">Address 1</CLabel>
                <CInput
                  id="address_1"
                  type="text"
                  name="address_1"
                  value={storeState?.address_1}
                  onChange={handleChange}
                  placeholder="Enter address 1"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="address_2">Address 2</CLabel>
                <CInput
                  id="address_2"
                  type="text"
                  name="address_2"
                  value={storeState?.address_2}
                  onChange={handleChange}
                  placeholder="Enter address 2"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="address_3">Address 3</CLabel>
                <CInput
                  id="address_3"
                  type="text"
                  name="address_3"
                  value={storeState?.address_3}
                  onChange={handleChange}
                  placeholder="Enter address 3"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="city">City</CLabel>
                <CInput
                  id="city"
                  type="text"
                  name="city"
                  value={storeState?.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="state">State</CLabel>
                <CInput
                  id="state"
                  type="text"
                  name="state"
                  value={storeState?.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="postal">Postal</CLabel>
                <CInput
                  id="postal"
                  type="text"
                  name="postal"
                  value={storeState?.postal}
                  onChange={handleChange}
                  placeholder="Enter Postal"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="country">Country</CLabel>
                <CInput
                  id="country"
                  type="text"
                  name="country"
                  value={storeState?.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="phone_number">Phone Number</CLabel>
                <CInput
                  id="phone_number"
                  type="text"
                  name="phone_number"
                  value={storeState?.phone_number}
                  onChange={handleChange}
                  placeholder="Enter Postal"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="fax_number">Fax Number</CLabel>
                <CInput
                  id="fax_number"
                  type="text"
                  name="fax_number"
                  value={storeState?.fax_number}
                  onChange={handleChange}
                  placeholder="Enter Fax Number"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="menu_name">Menu Name</CLabel>
            <CInput
              id="menu_name"
              type="text"
              name="menu_name"
              value={storeState?.menu_name}
              onChange={handleChange}
              disabled={true}
            />
          </CFormGroup>
          <CRow className="pb-3">
            <CCol xs="12" sm="6" md="4">
              <CLabel htmlFor="printer">Printer</CLabel>
              <CSelect
                name="feieryun_printers_id"
                id="feieryun_printers_id"
                value={storeState?.feieryun_printers_id}
                onChange={handleChange}>
                {printerList?.map((printer: any) => {
                  return (
                    <option key={printer.id} value={printer.id}>
                      {printer.name} - {printer.server_status}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12">
              <div className="d-flex flex-row-reverse">
                <CButton color="secondary" className="px-4" to="/storemaintenance">
                  Back
                </CButton>
                <CButton color="success" className="px-4 mr-4" onClick={updateStoreHandler}>
                  Update
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default StoreMaintenanceUpdate;
