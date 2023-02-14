import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CInput,
  CLabel,
  CFormGroup,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CPagination,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
  CBadge,
} from '@coreui/react';
import { deleteCustomer, getReduxData, getReduxDataList } from '../redux/customerSlice';
import { useHistory } from 'react-router-dom';
import CIcon from '@coreui/icons-react';

const Customer = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState({
    customer_name: '',
    id: '',
  });

  const [customerSearchState, setCustomerSearchState] = useState({
    first_name: '',
    phone_no: '',
  });

  const fields = [
    'first_name',
    'last_name',
    'email',
    'phone_no',
    'status',
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
  const getBadge = (status: any) => {
    switch (status) {
      case '0':
        return 'secondary';
      default:
        return 'primary';
    }
  };
  const getStatusDescription = (status: any) => {
    switch (status) {
      case '0':
        return 'Inactive';
      default:
        return 'Active';
    }
  };

  const { reduxData, auth, pagingPayload, customerSearchPayload } = useSelector((state: any) => {
    return {
      reduxData: state.customer.customerListPayload?.customers,
      auth: state.auth,
      pagingPayload: state.customer.customerListPayload?.paging,
      customerSearchPayload: state.customer?.customerListPayload,
    };
  });
  const setActivePage = (page: any) => {
    dispatch(getReduxDataList(auth, page, customerSearchState));
  };
  useEffect(() => {
    dispatch(getReduxData(auth));
  }, []);

  const history = useHistory();

  const routeChange = (item: any) => {
    let path = '/customer/view/' + item.id;
    history.push(path);
  };

  const popUpConfirm = (item: any) => {
    setVisible(!visible);
    setSelectedCustomer({
      customer_name: item.first_name + ' ' + item.last_name,
      id: item.id,
    });
  };

  const deleteCustomerHandler = () => {
    dispatch(deleteCustomer(auth, selectedCustomer.id));
    setVisible(false);
    window.location.reload();
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCustomerSearchState({ ...customerSearchState, [name]: value });
  };

  const filter = () => {
    // let path = `/customer?first_name=${customerSearchState?.first_name}&phone_no=${customerSearchState?.phone_no}`;
    dispatch(getReduxDataList(auth, 1, customerSearchState));
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex flex-row-reverse pb-3">
                <CButton color="success" className="px-4" to="/customer/create">
                  Add Customer
                </CButton>
              </div>

              {/* <Search Section */}
              <CCard accentColor="info">
                <CCardBody>
                  <CFormGroup row className="my-0">
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="first-name">Name</CLabel>
                        <CInput
                          id="first-name"
                          type="text"
                          name="first_name"
                          value={customerSearchPayload?.first_name}
                          onChange={handleChange}
                          placeholder="Enter Name"
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                      <CFormGroup>
                        <CLabel htmlFor="phone-no">Phone Number</CLabel>
                        <CInput
                          id="phone-no"
                          type="text"
                          name="phone_no"
                          value={customerSearchPayload?.phone_no}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                        />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div className="d-flex flex-row-reverse">
                    <CButton
                      color="success"
                      className="px-4"
                      onClick={() => {
                        filter();
                      }}>
                      Search
                    </CButton>
                  </div>
                </CCardBody>
                {/* <CCardFooter>
                  <CRow className="text-justify">
                    <CCol sm="12">{JSON.stringify(pagingPayload)}</CCol>
                  </CRow>
                </CCardFooter> */}
              </CCard>
              {/* <Search Section /> */}

              <CDataTable
                items={reduxData}
                fields={fields}
                hover
                striped
                border
                size="sm"
                // itemsPerPage={10}
                // pagination
                scopedSlots={{
                  status: (item: any) => (
                    <td className="text-center">
                      <CBadge color={getBadge(item.status)}>
                        {getStatusDescription(item.status)}
                      </CBadge>
                    </td>
                  ),
                  edit: (item: any) => (
                    <td>
                      <CButton
                        color="success"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          routeChange(item);
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
                          onClick={() => {
                            popUpConfirm(item);
                          }}>
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
              <CPagination
                activePage={pagingPayload?.current_page}
                pages={pagingPayload?.last_page}
                onActivePageChange={(i: any) => setActivePage(i)}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      {/* <CButton onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton> */}
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete customer : {selectedCustomer?.customer_name}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton onClick={() => deleteCustomerHandler()} color="primary">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Customer;
