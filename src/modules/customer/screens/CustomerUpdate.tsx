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
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSwitch,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCustomerData,
  updateCustomer,
  getCustomerAddressData,
  createCustomerAddress,
  getCustomerAddressDetailData,
  updateCustomerAddress,
  deleteCustomerAddress,
} from '../redux/customerSlice';
import { useParams } from 'react-router-dom';
import GooglePlaceAutocomplete from 'src/components/GooglePlaceAutocomplete';

const CustomerUpdate = () => {
  const dispatch = useDispatch();
  let { id } = useParams<any>();
  const [visible, setVisible] = useState(false);
  const [addressDefaultFlag, setAddressDefaultFlag] = useState(false);
  const [addressViewDetailFlag, setaddressViewDetailFlag] = useState(false);
  const [deleteAddressWarningVisible, setDeleteAddressWarningVisible] = useState(false);
  const [customerState, setCustomerState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_no: '',
    organisation: '',
    remarks: '',
  });
  const [addressState, setAddressState] = useState({
    id: '',
    address_1: '',
    address_2: '',
    address_3: '',
    city: '',
    state: '',
    postal: '',
    default_flg: '',
    country: '',
    latitude: null,
    longtitude: null,
    remarks: '',
  });

  const { auth, customerAddress } = useSelector((state: any) => {
    return {
      auth: state.auth,
      customerAddress: state.customer.customerAddressPayload,
    };
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCustomerState({ ...customerState, [name]: value });
  };

  useEffect(() => {
    getCustomerData(auth, id).then((data: any) => {
      setCustomerState(data);
    });
    dispatch(getCustomerAddressData(auth, id));
  }, []);

  const updateCustomerHandler = () => {
    dispatch(updateCustomer(auth, customerState, id));
  };

  const address_fields = [
    'address',
    'city',
    'postal',
    'state',
    {
      key: 'default_flg',
      label: 'Default',
    },
    {
      key: 'edit',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
    {
      key: 'del',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
  ];

  const popUpAddress = () => {
    setVisible(!visible);
    setaddressViewDetailFlag(false);
    setAddressDefaultFlag(false);
  };

  const handleAddressChange = (event: any) => {
    const { name, value } = event.target;
    setAddressState({ ...addressState, [name]: value });
  };

  const handleAddressReset = () => {
    setAddressState({
      id: '',
      address_1: '',
      address_2: '',
      address_3: '',
      city: '',
      state: '',
      postal: '',
      default_flg: '',
      country: '',
      latitude: null,
      longtitude: null,
      remarks: '',
    });
  };

  const createCustomerAddressHandler = () => {
    dispatch(createCustomerAddress(auth, addressState, id));
    setVisible(!visible);
    handleAddressReset();
    setAddressDefaultFlag(false);
  };

  const handleAddressDefaultFlag = () => {
    if (!addressDefaultFlag) {
      setAddressState({ ...addressState, default_flg: '1' });
    } else {
      setAddressState({ ...addressState, default_flg: '0' });
    }
    setAddressDefaultFlag(!addressDefaultFlag);
  };

  const viewAddressDetail = (address_id: any) => {
    setAddressDefaultFlag(false);
    getCustomerAddressDetailData(auth, id, address_id).then((data: any) => {
      setAddressState(data);
      if (data.default_flg === '1') {
        setAddressDefaultFlag(true);
      }
    });
    setVisible(!visible);
    setaddressViewDetailFlag(true);
  };

  const updateCustomerAddressHandler = () => {
    dispatch(updateCustomerAddress(auth, addressState, id));
    setVisible(!visible);
    handleAddressReset();
    setAddressDefaultFlag(false);
  };

  const popUpDeleteAddressConfirm = (item: any) => {
    setDeleteAddressWarningVisible(true);
    setAddressState(item);
  };

  const deleteAddressHandler = () => {
    dispatch(deleteCustomerAddress(auth, id, addressState.id));
    setDeleteAddressWarningVisible(false);
    handleAddressReset();
  };

  const selectAddressHandler = (googlePlaceObject: any) => {
    const { address, coordinate, addressline } = googlePlaceObject;
    // let delivery_address_1 = [address.street_number, address.route, address.sublocality]
    //   .filter(Boolean)
    //   .join(', ');

    // if (address.building && !delivery_address_1.includes(address.building)) {
    //   delivery_address_1 = [address.building, delivery_address_1].join(', ');
    // }

    setAddressState({
      ...addressState,
      latitude: coordinate.lat,
      longtitude: coordinate.lng,
      address_1: addressline,
      postal: address.postal_code,
      city: address.city,
      state: address.state,
      country: address.country,
      remarks: address.remark,
    });

    console.log('show lat: ' + coordinate.lat + 'show lng: ' + coordinate.lng);
  };
  return (
    <>
      <CCard>
        <CCardHeader>Customer Details</CCardHeader>
        <CCardBody>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="first-name">First Name</CLabel>
                <CInput
                  id="first-name"
                  type="text"
                  name="first_name"
                  value={customerState?.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="last-name">Last Name</CLabel>
                <CInput
                  id="last-name"
                  type="text"
                  name="last_name"
                  value={customerState?.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="email">Email</CLabel>
            <CInput
              id="email"
              type="text"
              name="email"
              value={customerState?.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="password">Password</CLabel>
            <CInput
              id="password"
              type="text"
              name="password"
              value={customerState?.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="8">
              <CFormGroup>
                <CLabel htmlFor="phone-number">Phone Number</CLabel>
                <CInput
                  id="phone-number"
                  type="text"
                  name="phone_no"
                  value={customerState?.phone_no}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="organisation">Organisation</CLabel>
                <CInput
                  id="organisation"
                  type="text"
                  name="organisation"
                  value={customerState?.organisation}
                  onChange={handleChange}
                  placeholder="Organisation"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="remarks">Remarks</CLabel>
            <CInput
              id="remarks"
              type="text"
              name="remarks"
              value={customerState?.remarks}
              onChange={handleChange}
              placeholder="Remarks"
            />
          </CFormGroup>
          <CRow>
            <CCol xs="12">
              <div className="d-flex flex-row-reverse">
                <CButton color="secondary" className="px-4" to="/customer">
                  Back
                </CButton>
                <CButton color="success" className="px-4 mr-4" onClick={updateCustomerHandler}>
                  Update
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <CRow className="justify-content-evenly">
            <CCol xs={4} className="align-self-center">
              <div className="d-flex">Customer Address</div>
            </CCol>
            <CCol>
              <div className="d-flex flex-row-reverse">
                <CButton
                  color="success"
                  className="px-4"
                  onClick={() => {
                    handleAddressReset();
                    popUpAddress();
                  }}>
                  Add Address
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CDataTable
                items={customerAddress}
                fields={address_fields}
                hover
                striped
                border
                size="sm"
                // itemsPerPage={10}
                // pagination
                scopedSlots={{
                  edit: (item: any) => (
                    <td>
                      <CButton
                        color="success"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          viewAddressDetail(item.id);
                        }}>
                        <CIcon name="cil-file" />
                      </CButton>
                    </td>
                  ),
                  del: (item: any) => {
                    return (
                      <td>
                        <CButton
                          color="danger"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => popUpDeleteAddressConfirm(item)}>
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Address Maintenance</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <GooglePlaceAutocomplete onSelectPlace={selectAddressHandler} />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="address-1">Address</CLabel>
            <CInput
              id="address-1"
              type="text"
              name="address-1"
              value={addressState?.address_1}
              onChange={handleAddressChange}
              placeholder="Enter address"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="remarks">Remarks</CLabel>
            <CInput
              id="remarks"
              type="text"
              name="remarks"
              value={addressState?.remarks}
              onChange={handleAddressChange}
              placeholder="Enter remarks"
            />
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="city">City</CLabel>
                <CInput
                  id="city"
                  type="text"
                  name="city"
                  value={addressState?.city}
                  onChange={handleAddressChange}
                  placeholder="Enter City"
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
                  value={addressState?.state}
                  onChange={handleAddressChange}
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
                  value={addressState?.postal}
                  onChange={handleAddressChange}
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
                  name="longtitude"
                  value={addressState?.country}
                  onChange={handleAddressChange}
                  placeholder="Enter Country"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="latitude">latitude</CLabel>
                <CInput
                  id="latitude"
                  type="text"
                  name="latitude"
                  value={addressState?.latitude!}
                  onChange={handleAddressChange}
                  placeholder="Enter latitude"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="country">longtitude</CLabel>
                <CInput
                  id="longtitude"
                  type="text"
                  name="longtitude"
                  value={addressState?.longtitude!}
                  onChange={handleAddressChange}
                  placeholder="Enter longtitude"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol tag="label" sm="3" className="col-form-label">
              Default
            </CCol>
            <CCol sm="9">
              <CSwitch
                className="mr-1"
                color="primary"
                name="default_flg"
                onChange={handleAddressDefaultFlag}
                checked={addressDefaultFlag}
              />
            </CCol>
            <CCol xs="6"></CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          {!addressViewDetailFlag && (
            <CButton
              onClick={() => {
                createCustomerAddressHandler();
              }}
              color="primary">
              Confirm
            </CButton>
          )}
          {addressViewDetailFlag && (
            <CButton
              onClick={() => {
                updateCustomerAddressHandler();
              }}
              color="primary">
              Update
            </CButton>
          )}
        </CModalFooter>
      </CModal>

      <CModal
        show={deleteAddressWarningVisible}
        onClose={() => setDeleteAddressWarningVisible(false)}>
        <CModalHeader>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this address?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteAddressWarningVisible(false)}>
            Close
          </CButton>
          <CButton onClick={deleteAddressHandler} color="primary">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CustomerUpdate;
