import React, { useState } from 'react';
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
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from '../redux/customerSlice';
import { useHistory } from 'react-router-dom';

const CustomerCreate = () => {
  const dispatch = useDispatch();
  const [customerState, setCustomerState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_no: '',
    organisation: '',
    remarks: '',
  });

  const history = useHistory();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCustomerState({ ...customerState, [name]: value });
  };
  const { auth } = useSelector((state: any) => {
    return {
      auth: state.auth,
      customer: state.customer.customerPayload,
    };
  });

  const createCustomerHandler = () => {
    dispatch(createCustomer(auth, customerState, history));
  };

  const handleReset = () => {
    setCustomerState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_no: '',
      organisation: '',
      remarks: '',
    });
  };
  return (
    <>
      <CCard>
        <CCardHeader>Add Customer</CCardHeader>
        <CCardBody>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="first-name">First Name</CLabel>
                <CInput
                  id="first-name"
                  type="text"
                  name="first_name"
                  value={customerState.first_name}
                  defaultValue={customerState.first_name}
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
                  value={customerState.last_name}
                  defaultValue={customerState.last_name}
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
              value={customerState.email}
              defaultValue={customerState.email}
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
              value={customerState.password}
              defaultValue={customerState.password}
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
                  value={customerState.phone_no}
                  defaultValue={customerState.phone_no}
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
                  value={customerState.organisation}
                  defaultValue={customerState.organisation}
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
              value={customerState.remarks}
              defaultValue={customerState.remarks}
              onChange={handleChange}
              placeholder="Remarks"
            />
          </CFormGroup>
          <CRow>
            <CCol xs={12} className="text-right">
              <CButton color="success" className="px-4 mr-4" onClick={createCustomerHandler}>
                Create
              </CButton>
              <CButton color="warning" className="px-4 mr-4" onClick={handleReset}>
                Reset
              </CButton>
              <CButton color="secondary" className="px-4" to="/customer">
                Back
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CustomerCreate;
