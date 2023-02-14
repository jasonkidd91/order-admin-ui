import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { globalToast } from 'src/redux/slice';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CListGroup,
  CListGroupItem,
  CRow,
  CSpinner,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { currentDate, formatDate } from 'src/helpers';

import DeliveryPreparationRoute from '../navigation/DeliveryPreparationRoute';

import {
  getDeliveryDriverList,
  getStoreSlots,
  getStores,
  createDeliveryPlan,
} from '../redux/deliveryPreparationSlice';

const DeliveryPreparationCreate = () => {
  const history = useHistory();
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  // eslint-disable-next-line
  const [remark, setRemark] = React.useState('');
  // eslint-disable-next-line
  const [selectedDate, setSelectedDate] = React.useState(formatDate(currentDate(), 'YYYY-MM-DD'));
  const [selectedSlots, setSelectedSlots] = React.useState<any>([]);

  const [loader, setLoader] = React.useState(false);
  const {
    auth,
    availableDrivers = [],
    availableSlots = [],
    availableStores = [],
  } = useSelector((state: any) => {
    return {
      auth: state.auth,
      availableDrivers: state.deliverypreparation.deliveryDriverList,
      availableSlots: state.deliverypreparation.availableSlots,
      availableStores: state.deliverypreparation.stores,
    };
  });

  const init = () => {
    // initialize effect
    try {
      dispatch(getDeliveryDriverList(auth, null));
      dispatch(getStoreSlots(auth));
      dispatch(getStores(auth));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  const [selectedDrivers, setSelectedDrivers] = React.useState([] as any);

  const [deliveryPlanState, setDeliveryPlanState] = React.useState({
    delivery_date: selectedDate,
    slot_id: selectedSlots,
    driver_list: selectedDrivers,
    remark,
  });

  const handleSlotChange = (ev: any) => {
    const { checked, value } = ev.target;
    if (checked) {
      selectedSlots.push(Number(value));
    } else {
      const existedIdx = selectedSlots.findIndex((slotId: any) => slotId === Number(value));
      selectedSlots.splice(existedIdx, 1);
    }
    setSelectedSlots([...selectedSlots]);
    setDeliveryPlanState({ ...deliveryPlanState, slot_id: [...selectedSlots] });
  };

  const toggleDriver = (driver: any) => {
    const existedIdx = selectedDrivers.indexOf(driver);
    if (existedIdx >= 0) {
      selectedDrivers.splice(existedIdx, 1);
    } else {
      selectedDrivers.push(driver);
    }
    setSelectedDrivers([...selectedDrivers]);
    setDeliveryPlanState({ ...deliveryPlanState, driver_list: [...selectedDrivers] });
  };

  // eslint-disable-next-line
  const validateForm = () => {
    console.log(selectedDate, selectedSlots, selectedDrivers);
    // validate date
    if (!selectedDate) {
      dispatch(globalToast('error', 'Date is required'));
      return false;
    }

    // validate slots
    if (selectedSlots.length <= 0) {
      dispatch(globalToast('error', 'At least one slot must be selected'));
      return false;
    }

    // validate drivers
    if (selectedDrivers.length <= 0) {
      dispatch(globalToast('error', 'At least one driver must be selected'));
      return false;
    }

    return true;
  };

  const generateList = async () => {
    // setDeliveryPlanState()
    // if (validateForm()) {
    // proceed to generate
    // history.push(DeliveryPreparationRoute.DETAIL.path.replace(':id', 'IdIsSomethingBlaBla'));
    // }
    try {
      setLoader(true);
      const res = await createDeliveryPlan(auth, deliveryPlanState);
      setLoader(false);
      dispatch(globalToast('success', 'Delivery Plan Data Created!'));
      history.replace(DeliveryPreparationRoute.DETAIL.path.replace(':id', res.id));
    } catch (err: any) {
      setLoader(false);
      dispatch(globalToast('error', err?.message));
    }
  };

  const slotIsSelected = (slot: any) => {
    return selectedSlots.findIndex((slotId: any) => slotId === slot.id) >= 0;
  };

  const driverIsSelected = (driver: any) => {
    return selectedDrivers.indexOf(driver) >= 0;
  };

  const onAllClick = (event: any) => {
    let isChecked = event.target.checked;
    let localSelectedDriver = [];
    // alert(isChecked)
    if (isChecked) {
      setSelectedDrivers([]);
      // eslint-disable-next-line no-restricted-syntax
      for (const driver of availableDrivers) {
        localSelectedDriver.push(driver);
      }
      setSelectedDrivers([...localSelectedDriver]);
    } else {
      setSelectedDrivers([]);
    }
    setDeliveryPlanState({ ...deliveryPlanState, driver_list: [...localSelectedDriver] });
  };

  return (
    <>
      <CCard accentColor="success">
        <CCardBody>
          <CRow className="py-2">
            <CCol>
              <div className="d-flex align-items-center">
                <h5>Create Delivery Preparation</h5>
                <div className="ml-auto"></div>
              </div>
            </CCol>
          </CRow>

          {/* <Remark Date Section> */}
          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  Remark <small>(max 50 characters)</small>:
                </CLabel>
                <CInput
                  id="remark"
                  value={deliveryPlanState.remark}
                  maxLength={50}
                  placeholder="Any Remark"
                  onChange={(ev: any) =>
                    setDeliveryPlanState({ ...deliveryPlanState, remark: ev.target.value })
                  }
                  className="shadow-sm"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  For Date:
                </CLabel>
                <CInput
                  id="date"
                  type="date"
                  value={deliveryPlanState.delivery_date}
                  onChange={(ev: any) =>
                    setDeliveryPlanState({ ...deliveryPlanState, delivery_date: ev.target.value })
                  }
                  className="shadow-sm"
                />
              </CFormGroup>
            </CCol>
          </CRow>
          {/* </Remark Date Section> */}

          <hr />

          {/* <Store And Slots Section> */}
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel className="font-weight-bold">For Stores - Slots:</CLabel>
                {availableStores.map((store: any, idx: number) => (
                  <CCard
                    key={store.id}
                    className={`shadow-sm ${idx + 1 === availableStores.length ? 'mb-0' : ''}`}>
                    <CCardBody className="py-2">
                      <CFormGroup row>
                        <CCol xs="12">
                          <CLabel>{store.name}</CLabel>
                        </CCol>
                        {availableSlots
                          .filter((slot: any) => slot.store_id === store.id)
                          .map((slot: any) => (
                            <CCol xs="12" sm="6" md="3" key={slot.id} className="pb-1">
                              <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox
                                  id={`${store.id}${slot.id}`}
                                  name={`${store.id}-slotcheckbox`}
                                  value={slot.id}
                                  onChange={handleSlotChange}
                                />
                                <CLabel
                                  variant="checkbox"
                                  className={`form-check-label ${
                                    slotIsSelected(slot) ? 'font-weight-bold' : ''
                                  }`}
                                  htmlFor={`${store.id}${slot.id}`}>
                                  {slot.slot_start} - {slot.slot_end}
                                </CLabel>
                              </CFormGroup>
                            </CCol>
                          ))}
                      </CFormGroup>
                    </CCardBody>
                  </CCard>
                ))}
              </CFormGroup>
            </CCol>
          </CRow>
          {/* </Store And Slots Section> */}

          <hr />

          {/* <Driver Section> */}
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <div className="d-flex">
                  <CLabel className="font-weight-bold">Drivers For Delivery:</CLabel>
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      name="checkbox2"
                      value="option2"
                      className="checkbox-lg"
                      onChange={(e) => {
                        onAllClick(e);
                      }}
                    />
                  </CFormGroup>
                  <span className="ml-auto">
                    Selected: {selectedDrivers.length}/{availableDrivers.length}
                  </span>
                </div>
                <CListGroup className="shadow-sm" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {availableDrivers.map((driver: any) => (
                    <CListGroupItem
                      key={driver.id}
                      href="#"
                      action
                      onClick={() => toggleDriver(driver)}
                      color={`${driverIsSelected(driver) ? 'info' : ''}`}>
                      <div className="d-flex">
                        <div>
                          <div className={`${driverIsSelected(driver) ? 'font-weight-bold' : ''}`}>
                            {driver.full_name} <small>- {driver.phone}</small>
                          </div>
                          <div>Zones: {driver.zones.join(', ')}</div>
                        </div>
                        <div className="ml-auto align-self-center">
                          {driverIsSelected(driver) && <CIcon name="cil-check-circle" />}
                        </div>
                      </div>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </CFormGroup>
            </CCol>
          </CRow>
          {/* </Driver Section> */}

          <hr />

          <CRow>
            <CCol xs="12" className="text-right">
              {loader && <CSpinner color="primary" />}
              <CButton color="danger" className="px-4 mr-4" onClick={generateList}>
                Generate
              </CButton>

              <CButton color="secondary" className="px-4" onClick={() => history.goBack()}>
                Back
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default DeliveryPreparationCreate;
