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
  CSelect,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver } from '../redux/driverSlice';
import { useHistory } from 'react-router-dom';

const DriverMaintenanceCreate = () => {
  const dispatch = useDispatch();
  const [driverState, setDriverState] = useState({
    first_name: '',
    last_name: ' ',
    phone: '',
    max_slot: 0,
    ic: '',
    flag_colour: 'blue_MarkerA.png',
  });

  const history = useHistory();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDriverState({ ...driverState, [name]: value });
  };
  const { auth } = useSelector((state: any) => {
    return {
      auth: state.auth,
      driver: state.driver.driverPayload,
    };
  });

  const createDriverHandler = () => {
    dispatch(createDriver(auth, driverState, history));
  };

  const handleAssignFlag = (event: any) => {
    const { value } = event.target;
    setDriverState({ ...driverState, flag_colour: value });
  };

  const handleReset = () => {
    setDriverState({
      first_name: '',
      last_name: ' ',
      phone: '',
      max_slot: 0,
      ic: '',
      flag_colour: 'blue_MarkerA.png',
    });
  };
  return (
    <>
      <CCard>
        <CCardHeader>Add Driver</CCardHeader>
        <CCardBody>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="first-name">Full Name</CLabel>
                <CInput
                  id="first-name"
                  type="text"
                  name="first_name"
                  value={driverState.first_name}
                  defaultValue={driverState.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              {/* <CFormGroup>
                <CLabel htmlFor="last-name">Last Name</CLabel>
                <CInput
                  id="last-name"
                  type="text"
                  name="last_name"
                  value={driverState.last_name}
                  defaultValue={driverState.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </CFormGroup> */}
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="phone-number">Phone Number</CLabel>
                <CInput
                  id="phone-number"
                  type="text"
                  name="phone"
                  value={driverState.phone}
                  defaultValue={driverState.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="ic">IC</CLabel>
                <CInput
                  id="ic"
                  type="text"
                  name="ic"
                  value={driverState.ic}
                  defaultValue={driverState.ic}
                  onChange={handleChange}
                  placeholder="Enter ic"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="max-slot">Maximum Slot</CLabel>
                <CInput
                  id="max_slot"
                  type="number"
                  name="max_slot"
                  value={driverState.max_slot}
                  defaultValue={driverState.max_slot}
                  onChange={handleChange}
                  placeholder="Enter maximum slot"
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="max-slot">Maximum Slot</CLabel>
                <img
                  alt="logo"
                  style={{ paddingLeft: '20px' }}
                  src={process.env.REACT_APP_BASE_URL + '/images/' + driverState.flag_colour}
                />
                <CSelect onChange={(ev) => handleAssignFlag(ev)}>
                  <option key="blue_MarkerA.png" value="blue_MarkerA.png">
                    blue_MarkerA.png
                  </option>
                  <option key="blue_MarkerB.png" value="blue_MarkerB.png">
                    blue_MarkerB.png
                  </option>
                  <option key="blue_MarkerC.png" value="blue_MarkerC.png">
                    blue_MarkerC.png
                  </option>
                  <option key="blue_MarkerD.png" value="blue_MarkerD.png">
                    blue_MarkerD.png
                  </option>
                  <option key="blue_MarkerE.png" value="blue_MarkerE.png">
                    blue_MarkerE.png
                  </option>
                  <option key="blue_MarkerF.png" value="blue_MarkerF.png">
                    blue_MarkerF.png
                  </option>
                  <option key="blue_MarkerG.png" value="blue_MarkerG.png">
                    blue_MarkerG.png
                  </option>
                  <option key="blue_MarkerH.png" value="blue_MarkerH.png">
                    blue_MarkerH.png
                  </option>
                  <option key="blue_MarkerI.png" value="blue_MarkerI.png">
                    blue_MarkerI.png
                  </option>
                  <option key="blue_MarkerJ.png" value="blue_MarkerJ.png">
                    blue_MarkerJ.png
                  </option>
                  <option key="blue_MarkerK.png" value="blue_MarkerK.png">
                    blue_MarkerK.png
                  </option>
                  <option key="blue_MarkerL.png" value="blue_MarkerL.png">
                    blue_MarkerL.png
                  </option>
                  <option key="blue_MarkerM.png" value="blue_MarkerM.png">
                    blue_MarkerM.png
                  </option>
                  <option key="blue_MarkerN.png" value="blue_MarkerN.png">
                    blue_MarkerN.png
                  </option>
                  <option key="blue_MarkerO.png" value="blue_MarkerO.png">
                    blue_MarkerO.png
                  </option>
                  <option key="blue_MarkerP.png" value="blue_MarkerP.png">
                    blue_MarkerP.png
                  </option>
                  <option key="blue_MarkerQ.png" value="blue_MarkerQ.png">
                    blue_MarkerQ.png
                  </option>
                  <option key="blue_MarkerR.png" value="blue_MarkerR.png">
                    blue_MarkerR.png
                  </option>
                  <option key="blue_MarkerS.png" value="blue_MarkerS.png">
                    blue_MarkerS.png
                  </option>
                  <option key="blue_MarkerT.png" value="blue_MarkerT.png">
                    blue_MarkerT.png
                  </option>
                  <option key="blue_MarkerU.png" value="blue_MarkerU.png">
                    blue_MarkerU.png
                  </option>
                  <option key="blue_MarkerV.png" value="blue_MarkerV.png">
                    blue_MarkerV.png
                  </option>
                  <option key="blue_MarkerW.png" value="blue_MarkerW.png">
                    blue_MarkerW.png
                  </option>
                  <option key="blue_MarkerX.png" value="blue_MarkerX.png">
                    blue_MarkerX.png
                  </option>
                  <option key="blue_MarkerY.png" value="blue_MarkerY.png">
                    blue_MarkerY.png
                  </option>
                  <option key="blue_MarkerZ.png" value="blue_MarkerZ.png">
                    blue_MarkerZ.png
                  </option>
                  <option key="brown_MarkerA.png" value="brown_MarkerA.png">
                    brown_MarkerA.png
                  </option>
                  <option key="brown_MarkerB.png" value="brown_MarkerB.png">
                    brown_MarkerB.png
                  </option>
                  <option key="brown_MarkerC.png" value="brown_MarkerC.png">
                    brown_MarkerC.png
                  </option>
                  <option key="brown_MarkerD.png" value="brown_MarkerD.png">
                    brown_MarkerD.png
                  </option>
                  <option key="brown_MarkerE.png" value="brown_MarkerE.png">
                    brown_MarkerE.png
                  </option>
                  <option key="brown_MarkerF.png" value="brown_MarkerF.png">
                    brown_MarkerF.png
                  </option>
                  <option key="brown_MarkerG.png" value="brown_MarkerG.png">
                    brown_MarkerG.png
                  </option>
                  <option key="brown_MarkerH.png" value="brown_MarkerH.png">
                    brown_MarkerH.png
                  </option>
                  <option key="brown_MarkerI.png" value="brown_MarkerI.png">
                    brown_MarkerI.png
                  </option>
                  <option key="brown_MarkerJ.png" value="brown_MarkerJ.png">
                    brown_MarkerJ.png
                  </option>
                  <option key="brown_MarkerK.png" value="brown_MarkerK.png">
                    brown_MarkerK.png
                  </option>
                  <option key="brown_MarkerL.png" value="brown_MarkerL.png">
                    brown_MarkerL.png
                  </option>
                  <option key="brown_MarkerM.png" value="brown_MarkerM.png">
                    brown_MarkerM.png
                  </option>
                  <option key="brown_MarkerN.png" value="brown_MarkerN.png">
                    brown_MarkerN.png
                  </option>
                  <option key="brown_MarkerO.png" value="brown_MarkerO.png">
                    brown_MarkerO.png
                  </option>
                  <option key="brown_MarkerP.png" value="brown_MarkerP.png">
                    brown_MarkerP.png
                  </option>
                  <option key="brown_MarkerQ.png" value="brown_MarkerQ.png">
                    brown_MarkerQ.png
                  </option>
                  <option key="brown_MarkerR.png" value="brown_MarkerR.png">
                    brown_MarkerR.png
                  </option>
                  <option key="brown_MarkerS.png" value="brown_MarkerS.png">
                    brown_MarkerS.png
                  </option>
                  <option key="brown_MarkerT.png" value="brown_MarkerT.png">
                    brown_MarkerT.png
                  </option>
                  <option key="brown_MarkerU.png" value="brown_MarkerU.png">
                    brown_MarkerU.png
                  </option>
                  <option key="brown_MarkerV.png" value="brown_MarkerV.png">
                    brown_MarkerV.png
                  </option>
                  <option key="brown_MarkerW.png" value="brown_MarkerW.png">
                    brown_MarkerW.png
                  </option>
                  <option key="brown_MarkerX.png" value="brown_MarkerX.png">
                    brown_MarkerX.png
                  </option>
                  <option key="brown_MarkerY.png" value="brown_MarkerY.png">
                    brown_MarkerY.png
                  </option>
                  <option key="brown_MarkerZ.png" value="brown_MarkerZ.png">
                    brown_MarkerZ.png
                  </option>
                  <option key="darkgreen_MarkerA.png" value="darkgreen_MarkerA.png">
                    darkgreen_MarkerA.png
                  </option>
                  <option key="darkgreen_MarkerB.png" value="darkgreen_MarkerB.png">
                    darkgreen_MarkerB.png
                  </option>
                  <option key="darkgreen_MarkerC.png" value="darkgreen_MarkerC.png">
                    darkgreen_MarkerC.png
                  </option>
                  <option key="darkgreen_MarkerD.png" value="darkgreen_MarkerD.png">
                    darkgreen_MarkerD.png
                  </option>
                  <option key="darkgreen_MarkerE.png" value="darkgreen_MarkerE.png">
                    darkgreen_MarkerE.png
                  </option>
                  <option key="darkgreen_MarkerF.png" value="darkgreen_MarkerF.png">
                    darkgreen_MarkerF.png
                  </option>
                  <option key="darkgreen_MarkerG.png" value="darkgreen_MarkerG.png">
                    darkgreen_MarkerG.png
                  </option>
                  <option key="darkgreen_MarkerH.png" value="darkgreen_MarkerH.png">
                    darkgreen_MarkerH.png
                  </option>
                  <option key="darkgreen_MarkerI.png" value="darkgreen_MarkerI.png">
                    darkgreen_MarkerI.png
                  </option>
                  <option key="darkgreen_MarkerJ.png" value="darkgreen_MarkerJ.png">
                    darkgreen_MarkerJ.png
                  </option>
                  <option key="darkgreen_MarkerK.png" value="darkgreen_MarkerK.png">
                    darkgreen_MarkerK.png
                  </option>
                  <option key="darkgreen_MarkerL.png" value="darkgreen_MarkerL.png">
                    darkgreen_MarkerL.png
                  </option>
                  <option key="darkgreen_MarkerM.png" value="darkgreen_MarkerM.png">
                    darkgreen_MarkerM.png
                  </option>
                  <option key="darkgreen_MarkerN.png" value="darkgreen_MarkerN.png">
                    darkgreen_MarkerN.png
                  </option>
                  <option key="darkgreen_MarkerO.png" value="darkgreen_MarkerO.png">
                    darkgreen_MarkerO.png
                  </option>
                  <option key="darkgreen_MarkerP.png" value="darkgreen_MarkerP.png">
                    darkgreen_MarkerP.png
                  </option>
                  <option key="darkgreen_MarkerQ.png" value="darkgreen_MarkerQ.png">
                    darkgreen_MarkerQ.png
                  </option>
                  <option key="darkgreen_MarkerR.png" value="darkgreen_MarkerR.png">
                    darkgreen_MarkerR.png
                  </option>
                  <option key="darkgreen_MarkerS.png" value="darkgreen_MarkerS.png">
                    darkgreen_MarkerS.png
                  </option>
                  <option key="darkgreen_MarkerT.png" value="darkgreen_MarkerT.png">
                    darkgreen_MarkerT.png
                  </option>
                  <option key="darkgreen_MarkerU.png" value="darkgreen_MarkerU.png">
                    darkgreen_MarkerU.png
                  </option>
                  <option key="darkgreen_MarkerV.png" value="darkgreen_MarkerV.png">
                    darkgreen_MarkerV.png
                  </option>
                  <option key="darkgreen_MarkerW.png" value="darkgreen_MarkerW.png">
                    darkgreen_MarkerW.png
                  </option>
                  <option key="darkgreen_MarkerX.png" value="darkgreen_MarkerX.png">
                    darkgreen_MarkerX.png
                  </option>
                  <option key="darkgreen_MarkerY.png" value="darkgreen_MarkerY.png">
                    darkgreen_MarkerY.png
                  </option>
                  <option key="darkgreen_MarkerZ.png" value="darkgreen_MarkerZ.png">
                    darkgreen_MarkerZ.png
                  </option>
                  <option key="green_MarkerA.png" value="green_MarkerA.png">
                    green_MarkerA.png
                  </option>
                  <option key="green_MarkerB.png" value="green_MarkerB.png">
                    green_MarkerB.png
                  </option>
                  <option key="green_MarkerC.png" value="green_MarkerC.png">
                    green_MarkerC.png
                  </option>
                  <option key="green_MarkerD.png" value="green_MarkerD.png">
                    green_MarkerD.png
                  </option>
                  <option key="green_MarkerE.png" value="green_MarkerE.png">
                    green_MarkerE.png
                  </option>
                  <option key="green_MarkerF.png" value="green_MarkerF.png">
                    green_MarkerF.png
                  </option>
                  <option key="green_MarkerG.png" value="green_MarkerG.png">
                    green_MarkerG.png
                  </option>
                  <option key="green_MarkerH.png" value="green_MarkerH.png">
                    green_MarkerH.png
                  </option>
                  <option key="green_MarkerI.png" value="green_MarkerI.png">
                    green_MarkerI.png
                  </option>
                  <option key="green_MarkerJ.png" value="green_MarkerJ.png">
                    green_MarkerJ.png
                  </option>
                  <option key="green_MarkerK.png" value="green_MarkerK.png">
                    green_MarkerK.png
                  </option>
                  <option key="green_MarkerL.png" value="green_MarkerL.png">
                    green_MarkerL.png
                  </option>
                  <option key="green_MarkerM.png" value="green_MarkerM.png">
                    green_MarkerM.png
                  </option>
                  <option key="green_MarkerN.png" value="green_MarkerN.png">
                    green_MarkerN.png
                  </option>
                  <option key="green_MarkerO.png" value="green_MarkerO.png">
                    green_MarkerO.png
                  </option>
                  <option key="green_MarkerP.png" value="green_MarkerP.png">
                    green_MarkerP.png
                  </option>
                  <option key="green_MarkerQ.png" value="green_MarkerQ.png">
                    green_MarkerQ.png
                  </option>
                  <option key="green_MarkerR.png" value="green_MarkerR.png">
                    green_MarkerR.png
                  </option>
                  <option key="green_MarkerS.png" value="green_MarkerS.png">
                    green_MarkerS.png
                  </option>
                  <option key="green_MarkerT.png" value="green_MarkerT.png">
                    green_MarkerT.png
                  </option>
                  <option key="green_MarkerU.png" value="green_MarkerU.png">
                    green_MarkerU.png
                  </option>
                  <option key="green_MarkerV.png" value="green_MarkerV.png">
                    green_MarkerV.png
                  </option>
                  <option key="green_MarkerW.png" value="green_MarkerW.png">
                    green_MarkerW.png
                  </option>
                  <option key="green_MarkerX.png" value="green_MarkerX.png">
                    green_MarkerX.png
                  </option>
                  <option key="green_MarkerY.png" value="green_MarkerY.png">
                    green_MarkerY.png
                  </option>
                  <option key="green_MarkerZ.png" value="green_MarkerZ.png">
                    green_MarkerZ.png
                  </option>
                  <option key="orange_MarkerA.png" value="orange_MarkerA.png">
                    orange_MarkerA.png
                  </option>
                  <option key="orange_MarkerB.png" value="orange_MarkerB.png">
                    orange_MarkerB.png
                  </option>
                  <option key="orange_MarkerC.png" value="orange_MarkerC.png">
                    orange_MarkerC.png
                  </option>
                  <option key="orange_MarkerD.png" value="orange_MarkerD.png">
                    orange_MarkerD.png
                  </option>
                  <option key="orange_MarkerE.png" value="orange_MarkerE.png">
                    orange_MarkerE.png
                  </option>
                  <option key="orange_MarkerF.png" value="orange_MarkerF.png">
                    orange_MarkerF.png
                  </option>
                  <option key="orange_MarkerG.png" value="orange_MarkerG.png">
                    orange_MarkerG.png
                  </option>
                  <option key="orange_MarkerH.png" value="orange_MarkerH.png">
                    orange_MarkerH.png
                  </option>
                  <option key="orange_MarkerI.png" value="orange_MarkerI.png">
                    orange_MarkerI.png
                  </option>
                  <option key="orange_MarkerJ.png" value="orange_MarkerJ.png">
                    orange_MarkerJ.png
                  </option>
                  <option key="orange_MarkerK.png" value="orange_MarkerK.png">
                    orange_MarkerK.png
                  </option>
                  <option key="orange_MarkerL.png" value="orange_MarkerL.png">
                    orange_MarkerL.png
                  </option>
                  <option key="orange_MarkerM.png" value="orange_MarkerM.png">
                    orange_MarkerM.png
                  </option>
                  <option key="orange_MarkerN.png" value="orange_MarkerN.png">
                    orange_MarkerN.png
                  </option>
                  <option key="orange_MarkerO.png" value="orange_MarkerO.png">
                    orange_MarkerO.png
                  </option>
                  <option key="orange_MarkerP.png" value="orange_MarkerP.png">
                    orange_MarkerP.png
                  </option>
                  <option key="orange_MarkerQ.png" value="orange_MarkerQ.png">
                    orange_MarkerQ.png
                  </option>
                  <option key="orange_MarkerR.png" value="orange_MarkerR.png">
                    orange_MarkerR.png
                  </option>
                  <option key="orange_MarkerS.png" value="orange_MarkerS.png">
                    orange_MarkerS.png
                  </option>
                  <option key="orange_MarkerT.png" value="orange_MarkerT.png">
                    orange_MarkerT.png
                  </option>
                  <option key="orange_MarkerU.png" value="orange_MarkerU.png">
                    orange_MarkerU.png
                  </option>
                  <option key="orange_MarkerV.png" value="orange_MarkerV.png">
                    orange_MarkerV.png
                  </option>
                  <option key="orange_MarkerW.png" value="orange_MarkerW.png">
                    orange_MarkerW.png
                  </option>
                  <option key="orange_MarkerX.png" value="orange_MarkerX.png">
                    orange_MarkerX.png
                  </option>
                  <option key="orange_MarkerY.png" value="orange_MarkerY.png">
                    orange_MarkerY.png
                  </option>
                  <option key="orange_MarkerZ.png" value="orange_MarkerZ.png">
                    orange_MarkerZ.png
                  </option>
                  <option key="paleblue_MarkerA.png" value="paleblue_MarkerA.png">
                    paleblue_MarkerA.png
                  </option>
                  <option key="paleblue_MarkerB.png" value="paleblue_MarkerB.png">
                    paleblue_MarkerB.png
                  </option>
                  <option key="paleblue_MarkerC.png" value="paleblue_MarkerC.png">
                    paleblue_MarkerC.png
                  </option>
                  <option key="paleblue_MarkerD.png" value="paleblue_MarkerD.png">
                    paleblue_MarkerD.png
                  </option>
                  <option key="paleblue_MarkerE.png" value="paleblue_MarkerE.png">
                    paleblue_MarkerE.png
                  </option>
                  <option key="paleblue_MarkerF.png" value="paleblue_MarkerF.png">
                    paleblue_MarkerF.png
                  </option>
                  <option key="paleblue_MarkerG.png" value="paleblue_MarkerG.png">
                    paleblue_MarkerG.png
                  </option>
                  <option key="paleblue_MarkerH.png" value="paleblue_MarkerH.png">
                    paleblue_MarkerH.png
                  </option>
                  <option key="paleblue_MarkerI.png" value="paleblue_MarkerI.png">
                    paleblue_MarkerI.png
                  </option>
                  <option key="paleblue_MarkerJ.png" value="paleblue_MarkerJ.png">
                    paleblue_MarkerJ.png
                  </option>
                  <option key="paleblue_MarkerK.png" value="paleblue_MarkerK.png">
                    paleblue_MarkerK.png
                  </option>
                  <option key="paleblue_MarkerL.png" value="paleblue_MarkerL.png">
                    paleblue_MarkerL.png
                  </option>
                  <option key="paleblue_MarkerM.png" value="paleblue_MarkerM.png">
                    paleblue_MarkerM.png
                  </option>
                  <option key="paleblue_MarkerN.png" value="paleblue_MarkerN.png">
                    paleblue_MarkerN.png
                  </option>
                  <option key="paleblue_MarkerO.png" value="paleblue_MarkerO.png">
                    paleblue_MarkerO.png
                  </option>
                  <option key="paleblue_MarkerP.png" value="paleblue_MarkerP.png">
                    paleblue_MarkerP.png
                  </option>
                  <option key="paleblue_MarkerQ.png" value="paleblue_MarkerQ.png">
                    paleblue_MarkerQ.png
                  </option>
                  <option key="paleblue_MarkerR.png" value="paleblue_MarkerR.png">
                    paleblue_MarkerR.png
                  </option>
                  <option key="paleblue_MarkerS.png" value="paleblue_MarkerS.png">
                    paleblue_MarkerS.png
                  </option>
                  <option key="paleblue_MarkerT.png" value="paleblue_MarkerT.png">
                    paleblue_MarkerT.png
                  </option>
                  <option key="paleblue_MarkerU.png" value="paleblue_MarkerU.png">
                    paleblue_MarkerU.png
                  </option>
                  <option key="paleblue_MarkerV.png" value="paleblue_MarkerV.png">
                    paleblue_MarkerV.png
                  </option>
                  <option key="paleblue_MarkerW.png" value="paleblue_MarkerW.png">
                    paleblue_MarkerW.png
                  </option>
                  <option key="paleblue_MarkerX.png" value="paleblue_MarkerX.png">
                    paleblue_MarkerX.png
                  </option>
                  <option key="paleblue_MarkerY.png" value="paleblue_MarkerY.png">
                    paleblue_MarkerY.png
                  </option>
                  <option key="paleblue_MarkerZ.png" value="paleblue_MarkerZ.png">
                    paleblue_MarkerZ.png
                  </option>
                  <option key="pink_MarkerA.png" value="pink_MarkerA.png">
                    pink_MarkerA.png
                  </option>
                  <option key="pink_MarkerB.png" value="pink_MarkerB.png">
                    pink_MarkerB.png
                  </option>
                  <option key="pink_MarkerC.png" value="pink_MarkerC.png">
                    pink_MarkerC.png
                  </option>
                  <option key="pink_MarkerD.png" value="pink_MarkerD.png">
                    pink_MarkerD.png
                  </option>
                  <option key="pink_MarkerE.png" value="pink_MarkerE.png">
                    pink_MarkerE.png
                  </option>
                  <option key="pink_MarkerF.png" value="pink_MarkerF.png">
                    pink_MarkerF.png
                  </option>
                  <option key="pink_MarkerG.png" value="pink_MarkerG.png">
                    pink_MarkerG.png
                  </option>
                  <option key="pink_MarkerH.png" value="pink_MarkerH.png">
                    pink_MarkerH.png
                  </option>
                  <option key="pink_MarkerI.png" value="pink_MarkerI.png">
                    pink_MarkerI.png
                  </option>
                  <option key="pink_MarkerJ.png" value="pink_MarkerJ.png">
                    pink_MarkerJ.png
                  </option>
                  <option key="pink_MarkerK.png" value="pink_MarkerK.png">
                    pink_MarkerK.png
                  </option>
                  <option key="pink_MarkerL.png" value="pink_MarkerL.png">
                    pink_MarkerL.png
                  </option>
                  <option key="pink_MarkerM.png" value="pink_MarkerM.png">
                    pink_MarkerM.png
                  </option>
                  <option key="pink_MarkerN.png" value="pink_MarkerN.png">
                    pink_MarkerN.png
                  </option>
                  <option key="pink_MarkerO.png" value="pink_MarkerO.png">
                    pink_MarkerO.png
                  </option>
                  <option key="pink_MarkerP.png" value="pink_MarkerP.png">
                    pink_MarkerP.png
                  </option>
                  <option key="pink_MarkerQ.png" value="pink_MarkerQ.png">
                    pink_MarkerQ.png
                  </option>
                  <option key="pink_MarkerR.png" value="pink_MarkerR.png">
                    pink_MarkerR.png
                  </option>
                  <option key="pink_MarkerS.png" value="pink_MarkerS.png">
                    pink_MarkerS.png
                  </option>
                  <option key="pink_MarkerT.png" value="pink_MarkerT.png">
                    pink_MarkerT.png
                  </option>
                  <option key="pink_MarkerU.png" value="pink_MarkerU.png">
                    pink_MarkerU.png
                  </option>
                  <option key="pink_MarkerV.png" value="pink_MarkerV.png">
                    pink_MarkerV.png
                  </option>
                  <option key="pink_MarkerW.png" value="pink_MarkerW.png">
                    pink_MarkerW.png
                  </option>
                  <option key="pink_MarkerX.png" value="pink_MarkerX.png">
                    pink_MarkerX.png
                  </option>
                  <option key="pink_MarkerY.png" value="pink_MarkerY.png">
                    pink_MarkerY.png
                  </option>
                  <option key="pink_MarkerZ.png" value="pink_MarkerZ.png">
                    pink_MarkerZ.png
                  </option>
                  <option key="purple_MarkerA.png" value="purple_MarkerA.png">
                    purple_MarkerA.png
                  </option>
                  <option key="purple_MarkerB.png" value="purple_MarkerB.png">
                    purple_MarkerB.png
                  </option>
                  <option key="purple_MarkerC.png" value="purple_MarkerC.png">
                    purple_MarkerC.png
                  </option>
                  <option key="purple_MarkerD.png" value="purple_MarkerD.png">
                    purple_MarkerD.png
                  </option>
                  <option key="purple_MarkerE.png" value="purple_MarkerE.png">
                    purple_MarkerE.png
                  </option>
                  <option key="purple_MarkerF.png" value="purple_MarkerF.png">
                    purple_MarkerF.png
                  </option>
                  <option key="purple_MarkerG.png" value="purple_MarkerG.png">
                    purple_MarkerG.png
                  </option>
                  <option key="purple_MarkerH.png" value="purple_MarkerH.png">
                    purple_MarkerH.png
                  </option>
                  <option key="purple_MarkerI.png" value="purple_MarkerI.png">
                    purple_MarkerI.png
                  </option>
                  <option key="purple_MarkerJ.png" value="purple_MarkerJ.png">
                    purple_MarkerJ.png
                  </option>
                  <option key="purple_MarkerK.png" value="purple_MarkerK.png">
                    purple_MarkerK.png
                  </option>
                  <option key="purple_MarkerL.png" value="purple_MarkerL.png">
                    purple_MarkerL.png
                  </option>
                  <option key="purple_MarkerM.png" value="purple_MarkerM.png">
                    purple_MarkerM.png
                  </option>
                  <option key="purple_MarkerN.png" value="purple_MarkerN.png">
                    purple_MarkerN.png
                  </option>
                  <option key="purple_MarkerO.png" value="purple_MarkerO.png">
                    purple_MarkerO.png
                  </option>
                  <option key="purple_MarkerP.png" value="purple_MarkerP.png">
                    purple_MarkerP.png
                  </option>
                  <option key="purple_MarkerQ.png" value="purple_MarkerQ.png">
                    purple_MarkerQ.png
                  </option>
                  <option key="purple_MarkerR.png" value="purple_MarkerR.png">
                    purple_MarkerR.png
                  </option>
                  <option key="purple_MarkerS.png" value="purple_MarkerS.png">
                    purple_MarkerS.png
                  </option>
                  <option key="purple_MarkerT.png" value="purple_MarkerT.png">
                    purple_MarkerT.png
                  </option>
                  <option key="purple_MarkerU.png" value="purple_MarkerU.png">
                    purple_MarkerU.png
                  </option>
                  <option key="purple_MarkerV.png" value="purple_MarkerV.png">
                    purple_MarkerV.png
                  </option>
                  <option key="purple_MarkerW.png" value="purple_MarkerW.png">
                    purple_MarkerW.png
                  </option>
                  <option key="purple_MarkerX.png" value="purple_MarkerX.png">
                    purple_MarkerX.png
                  </option>
                  <option key="purple_MarkerY.png" value="purple_MarkerY.png">
                    purple_MarkerY.png
                  </option>
                  <option key="purple_MarkerZ.png" value="purple_MarkerZ.png">
                    purple_MarkerZ.png
                  </option>
                  <option key="red_MarkerA.png" value="red_MarkerA.png">
                    red_MarkerA.png
                  </option>
                  <option key="red_MarkerB.png" value="red_MarkerB.png">
                    red_MarkerB.png
                  </option>
                  <option key="red_MarkerC.png" value="red_MarkerC.png">
                    red_MarkerC.png
                  </option>
                  <option key="red_MarkerD.png" value="red_MarkerD.png">
                    red_MarkerD.png
                  </option>
                  <option key="red_MarkerE.png" value="red_MarkerE.png">
                    red_MarkerE.png
                  </option>
                  <option key="red_MarkerF.png" value="red_MarkerF.png">
                    red_MarkerF.png
                  </option>
                  <option key="red_MarkerG.png" value="red_MarkerG.png">
                    red_MarkerG.png
                  </option>
                  <option key="red_MarkerH.png" value="red_MarkerH.png">
                    red_MarkerH.png
                  </option>
                  <option key="red_MarkerI.png" value="red_MarkerI.png">
                    red_MarkerI.png
                  </option>
                  <option key="red_MarkerJ.png" value="red_MarkerJ.png">
                    red_MarkerJ.png
                  </option>
                  <option key="red_MarkerK.png" value="red_MarkerK.png">
                    red_MarkerK.png
                  </option>
                  <option key="red_MarkerL.png" value="red_MarkerL.png">
                    red_MarkerL.png
                  </option>
                  <option key="red_MarkerM.png" value="red_MarkerM.png">
                    red_MarkerM.png
                  </option>
                  <option key="red_MarkerN.png" value="red_MarkerN.png">
                    red_MarkerN.png
                  </option>
                  <option key="red_MarkerO.png" value="red_MarkerO.png">
                    red_MarkerO.png
                  </option>
                  <option key="red_MarkerP.png" value="red_MarkerP.png">
                    red_MarkerP.png
                  </option>
                  <option key="red_MarkerQ.png" value="red_MarkerQ.png">
                    red_MarkerQ.png
                  </option>
                  <option key="red_MarkerR.png" value="red_MarkerR.png">
                    red_MarkerR.png
                  </option>
                  <option key="red_MarkerS.png" value="red_MarkerS.png">
                    red_MarkerS.png
                  </option>
                  <option key="red_MarkerT.png" value="red_MarkerT.png">
                    red_MarkerT.png
                  </option>
                  <option key="red_MarkerU.png" value="red_MarkerU.png">
                    red_MarkerU.png
                  </option>
                  <option key="red_MarkerV.png" value="red_MarkerV.png">
                    red_MarkerV.png
                  </option>
                  <option key="red_MarkerW.png" value="red_MarkerW.png">
                    red_MarkerW.png
                  </option>
                  <option key="red_MarkerX.png" value="red_MarkerX.png">
                    red_MarkerX.png
                  </option>
                  <option key="red_MarkerY.png" value="red_MarkerY.png">
                    red_MarkerY.png
                  </option>
                  <option key="red_MarkerZ.png" value="red_MarkerZ.png">
                    red_MarkerZ.png
                  </option>
                  <option key="yellow_MarkerA.png" value="yellow_MarkerA.png">
                    yellow_MarkerA.png
                  </option>
                  <option key="yellow_MarkerB.png" value="yellow_MarkerB.png">
                    yellow_MarkerB.png
                  </option>
                  <option key="yellow_MarkerC.png" value="yellow_MarkerC.png">
                    yellow_MarkerC.png
                  </option>
                  <option key="yellow_MarkerD.png" value="yellow_MarkerD.png">
                    yellow_MarkerD.png
                  </option>
                  <option key="yellow_MarkerE.png" value="yellow_MarkerE.png">
                    yellow_MarkerE.png
                  </option>
                  <option key="yellow_MarkerF.png" value="yellow_MarkerF.png">
                    yellow_MarkerF.png
                  </option>
                  <option key="yellow_MarkerG.png" value="yellow_MarkerG.png">
                    yellow_MarkerG.png
                  </option>
                  <option key="yellow_MarkerH.png" value="yellow_MarkerH.png">
                    yellow_MarkerH.png
                  </option>
                  <option key="yellow_MarkerI.png" value="yellow_MarkerI.png">
                    yellow_MarkerI.png
                  </option>
                  <option key="yellow_MarkerJ.png" value="yellow_MarkerJ.png">
                    yellow_MarkerJ.png
                  </option>
                  <option key="yellow_MarkerK.png" value="yellow_MarkerK.png">
                    yellow_MarkerK.png
                  </option>
                  <option key="yellow_MarkerL.png" value="yellow_MarkerL.png">
                    yellow_MarkerL.png
                  </option>
                  <option key="yellow_MarkerM.png" value="yellow_MarkerM.png">
                    yellow_MarkerM.png
                  </option>
                  <option key="yellow_MarkerN.png" value="yellow_MarkerN.png">
                    yellow_MarkerN.png
                  </option>
                  <option key="yellow_MarkerO.png" value="yellow_MarkerO.png">
                    yellow_MarkerO.png
                  </option>
                  <option key="yellow_MarkerP.png" value="yellow_MarkerP.png">
                    yellow_MarkerP.png
                  </option>
                  <option key="yellow_MarkerQ.png" value="yellow_MarkerQ.png">
                    yellow_MarkerQ.png
                  </option>
                  <option key="yellow_MarkerR.png" value="yellow_MarkerR.png">
                    yellow_MarkerR.png
                  </option>
                  <option key="yellow_MarkerS.png" value="yellow_MarkerS.png">
                    yellow_MarkerS.png
                  </option>
                  <option key="yellow_MarkerT.png" value="yellow_MarkerT.png">
                    yellow_MarkerT.png
                  </option>
                  <option key="yellow_MarkerU.png" value="yellow_MarkerU.png">
                    yellow_MarkerU.png
                  </option>
                  <option key="yellow_MarkerV.png" value="yellow_MarkerV.png">
                    yellow_MarkerV.png
                  </option>
                  <option key="yellow_MarkerW.png" value="yellow_MarkerW.png">
                    yellow_MarkerW.png
                  </option>
                  <option key="yellow_MarkerX.png" value="yellow_MarkerX.png">
                    yellow_MarkerX.png
                  </option>
                  <option key="yellow_MarkerY.png" value="yellow_MarkerY.png">
                    yellow_MarkerY.png
                  </option>
                  <option key="yellow_MarkerZ.png" value="yellow_MarkerZ.png">
                    yellow_MarkerZ.png
                  </option>
                </CSelect>
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CRow>
            <CCol xs={12} className="text-right">
              <CButton color="success" className="px-4 mr-4" onClick={createDriverHandler}>
                Create
              </CButton>
              <CButton color="warning" className="px-4 mr-4" onClick={handleReset}>
                Reset
              </CButton>
              <CButton color="secondary" className="px-4" to="/drivermaintenance">
                Back
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default DriverMaintenanceCreate;
