import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { authenticate } from '../redux/authSlice';
import AppConfig from 'src/AppConfig';

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const loginHandler = (ev: any) => {
    ev.preventDefault();
    dispatch(authenticate(loginState));
  };

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginHandler}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        defaultValue={loginState.email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        defaultValue={loginState.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12">
                        <CButton type="submit" color="success" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>
                      <img alt="logo" src={AppConfig.logo} height={100} />
                    </h2>
                    <h3>{AppConfig.name}</h3>
                    <h5>{AppConfig.version}</h5>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
