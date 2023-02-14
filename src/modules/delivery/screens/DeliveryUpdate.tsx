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
  CInputCheckbox,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDelivery, getSlotDetails } from '../redux/deliverySlice';
import { useHistory, useParams } from 'react-router-dom';
import TimePicker from 'react-time-picker';

const DeliveryUpdate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams<any>();
  const [storeState] = useState({
    name: '',
  });
  const [deliveryState, setDeliveryState] = useState({
    id: '',
    slot_type: '1',
    slot_start: '10:00:00',
    slot_end: '12:00:00',
    max_order: '120',
    cut_off_flag: true,
    cut_off_time: '22:00:00',
    // eslint-disable-next-line object-shorthand
    store_id: '',
    mon_flag: false,
    tues_flag: false,
    wed_flag: false,
    thurs_flag: false,
    fri_flag: false,
    sat_flag: false,
    sun_flag: false,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDeliveryState({ ...deliveryState, [name]: value });
  };
  const { auth } = useSelector((state: any) => {
    return {
      auth: state.auth,
    };
  });

  const updateDeliveryHandler = () => {
    dispatch(updateDelivery(auth, deliveryState.id, deliveryState));
  };

  useEffect(() => {
    getSlotDetails(auth, id).then((data: any) => {
      setDeliveryState(data);
    });
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>Add Delivery Hours</CCardHeader>
        <CCardBody>
          <CFormGroup row>
            <CCol xs="12">
              <CLabel className="font-weight-bold">Store Name : {storeState?.name} </CLabel>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="12" sm="6" md="4">
              <CFormGroup>
                <CLabel htmlFor="first-name">Delivery Slot Start At </CLabel>
                <br />
                <TimePicker
                  name="slot_start"
                  format="hh:mm:ss a"
                  disableClock={true}
                  value={deliveryState.slot_start}
                  clearIcon={null}
                  maxTime="24:60:60"
                  maxDetail="second"
                  onChange={(value) =>
                    setDeliveryState({ ...deliveryState, slot_start: value.toLocaleString() })
                  }
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="4">
              <CFormGroup>
                <CLabel htmlFor="last-name">Delivery Slot End At </CLabel>
                <br />
                <TimePicker
                  name="slot_end"
                  format="hh:mm:ss a"
                  disableClock={true}
                  value={deliveryState.slot_end}
                  clearIcon={null}
                  maxTime="24:60:60"
                  maxDetail="second"
                  onChange={(value) =>
                    setDeliveryState({ ...deliveryState, slot_end: value.toLocaleString() })
                  }
                />
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CRow>
            <CCol xs="12" sm="6">
              <CFormGroup>
                <CLabel htmlFor="email">Max Order Per Slot</CLabel>
                <CInput
                  id="max_order"
                  type="text"
                  name="max_order"
                  value={deliveryState.max_order}
                  defaultValue={deliveryState.max_order}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6">
              <CFormGroup>
                <CLabel htmlFor="password">Cut-Off Time </CLabel>
                <br />
                <TimePicker
                  name="cut_off_time"
                  format="hh:mm:ss a"
                  disableClock={true}
                  value={deliveryState.cut_off_time}
                  clearIcon={null}
                  maxTime="24:60:60"
                  maxDetail="second"
                  onChange={(value) =>
                    setDeliveryState({ ...deliveryState, cut_off_time: value.toLocaleString() })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CFormGroup row>
            <CCol xs="12">
              <CLabel>Available Days </CLabel>
            </CCol>
            <CCol xs="12">
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="mon_flag"
                  name="mon_flag"
                  checked={deliveryState.mon_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, mon_flag: !deliveryState.mon_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="mon_flag">
                  Monday
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="tues_flag"
                  name="tues_flag"
                  checked={deliveryState.tues_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, tues_flag: !deliveryState.tues_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="tues_flag">
                  Tuesday
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="wed_flag"
                  name="wed_flag"
                  checked={deliveryState.wed_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, wed_flag: !deliveryState.wed_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="wed_flag">
                  Wednesday
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="thurs_flag"
                  name="thurs_flag"
                  checked={deliveryState.thurs_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, thurs_flag: !deliveryState.thurs_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="thurs_flag">
                  Thursday
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="fri_flag"
                  name="fri_flag"
                  checked={deliveryState.fri_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, fri_flag: !deliveryState.fri_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="fri_flag">
                  Friday
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="sat_flag"
                  name="sat_flag"
                  checked={deliveryState.sat_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, sat_flag: !deliveryState.sat_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="sat_flag">
                  Saturday
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="sun_flag"
                  name="sun_flag"
                  checked={deliveryState.sun_flag}
                  onChange={() =>
                    setDeliveryState({ ...deliveryState, sun_flag: !deliveryState.sat_flag })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="sun_flag">
                  Sunday
                </CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CRow>
            <CCol xs={12} className="text-right">
              <CButton color="success" className="px-4 mr-4" onClick={updateDeliveryHandler}>
                Update
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

export default DeliveryUpdate;
