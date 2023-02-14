import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CModalBody,
  CModal,
  CButton,
  CCard,
  CCardBody,
  CDataTable,
  CCardHeader,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CCol,
  CRow,
} from '@coreui/react';
import {
  getDriverZoneList,
  createDriverZone,
  updateDriverZone,
  deleteDriverZone,
  getDriverList,
  getDriverLinkList,
  updateDriverLinkList,
} from '../redux/driverZoneSlice';
import CIcon from '@coreui/icons-react';
import GMapPolygonView from 'src/components/GoogleMap/GoogleMapPolygonView';
import Divider from 'src/components/Divider';
import GMapPolygon from 'src/components/GoogleMap/GoogleMapPolygon';

const DriverZoneMaintenance = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [addZoneVisible, setAddZoneVisible] = useState(false);
  const [viewDriverVisible, setViewDriverVisible] = useState(false);
  const [zoneSelected, setZoneSelected] = useState({ id: '' });
  const [driverZone, setDriverZone] = useState({
    name: 'default',
    coordinate_list: [
      { lat: 3.041181713633957, lng: 101.68522888183593 },
      { lat: 3.032254580306218, lng: 101.76819995117181 },
      { lat: 3.075195102590351, lng: 101.770294189453 },
      { lat: 3.105792502914853, lng: 101.7476691894531 },
      { lat: 3.108376095588926, lng: 101.7168145751953 },
    ],
    id: null,
  });

  const zoneFields = [
    'name',
    'drivers',
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

  const { auth, driverZoneList } = useSelector((state: any) => {
    return {
      auth: state.auth,
      driverZoneList: state.driverZone.driverZoneListPayload?.data,
      driverList: state.driverZone.driverListPayload?.data,
      driverLinkList: state.driverZone.driverLinkListPayload?.data,
    };
  });

  const [driverLinkState, setDriverLinkState] = useState([{ id: '' }]);

  const submitDriverZone = (driverZoneObject: any) => {
    if (driverZoneObject.id != null) {
      dispatch(updateDriverZone(auth, driverZoneObject));
      dispatch(updateDriverLinkList(auth, driverLinkState, zoneSelected));
    } else {
      dispatch(createDriverZone(auth, driverZoneObject));
    }
    setAddZoneVisible(false);
  };

  useEffect(() => {
    // dispatch(getReduxDataList(auth));
    dispatch(getDriverZoneList(auth));
  }, []);

  useEffect(() => {
    // dispatch(getReduxDataList(auth));
    dispatch(getDriverList(auth));
  }, []);

  const viewDriver = (item: any) => {
    // dispatch(getDriverLinkList(auth, item));
    getDriverLinkList(auth, item).then((data: any) => {
      setDriverLinkState(data);
    });
    setZoneSelected({ id: item.id });
    setViewDriverVisible(true);
  };

  const editZone = (item: any) => {
    console.log('check item');
    console.log(item);
    setDriverZone({
      name: item.name,
      coordinate_list: item.coordinate_list,
      id: item.id,
    });
    getDriverLinkList(auth, item).then((data: any) => {
      setDriverLinkState(data);
    });
    setZoneSelected({ id: item.id });
    // alert(driverZone.id);
    setAddZoneVisible(true);
  };

  const addZone = () => {
    setDriverZone({
      name: 'default',
      coordinate_list: [
        { lat: 3.041181713633957, lng: 101.68522888183593 },
        { lat: 3.032254580306218, lng: 101.76819995117181 },
        { lat: 3.075195102590351, lng: 101.770294189453 },
        { lat: 3.105792502914853, lng: 101.7476691894531 },
        { lat: 3.108376095588926, lng: 101.7168145751953 },
      ],
      id: null,
    });
    // alert(driverZone.id);
    setAddZoneVisible(true);
  };

  const popUpConfirm = (item: any) => {
    setVisible(!visible);
    setDriverZone(item);
  };

  const submitDeleteDriverZone = () => {
    dispatch(deleteDriverZone(auth, driverZone));
    setVisible(!visible);
  };

  const onCheckBoxClick = (updatedItem: any) => {
    updatedItem.assigned = !updatedItem.assigned;
    setDriverLinkState(
      driverLinkState.map((item) => {
        return item.id === updatedItem.id ? updatedItem : item;
      }),
    );
  };

  const driverFields = ['checkbox', 'full_name', 'zones'];

  const handleUpdateDriverLinkList = () => {
    dispatch(updateDriverLinkList(auth, driverLinkState, zoneSelected));
  };

  return (
    <>
      {/* <ZoneMaintenance> */}
      <CCard accentColor="danger">
        <CCardHeader>
          <strong className="align-middle">Zone Maintenance</strong>
          <div className="card-header-actions">
            <CButton
              size="sm"
              color="success"
              onClick={() => {
                addZone();
              }}>
              Add Zones
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="pb-3">
            <GMapPolygonView driverZoneList={driverZoneList} />
          </div>
          <div className="text-right">
            <CLabel>*Click on map&apos;s marker to show/hide zone info and name</CLabel>
          </div>
          <CDataTable
            items={driverZoneList}
            fields={zoneFields}
            hover
            striped
            border
            size="sm"
            // itemsPerPage={10}
            // pagination
            scopedSlots={{
              viewDriver: (item: any) => (
                <td>
                  <CButton
                    color="success"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      viewDriver(item);
                    }}>
                    View
                  </CButton>
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
                      editZone(item);
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
        </CCardBody>
      </CCard>
      <CModal size="xl" show={addZoneVisible} onClose={() => setAddZoneVisible(false)}>
        <CModalBody>
          <CCardBody>
            <div className="pb-3">
              <GMapPolygon
                action={submitDriverZone}
                driverZoneList={driverZoneList}
                // coordinateList={driverZoneList}
                driverZone={driverZone}
                setDriverZone={setDriverZone}
              />
            </div>
            <Divider></Divider>
            <div className="float-left px-2">
              <h2>Driver List</h2>
              <CDataTable
                items={driverLinkState}
                fields={driverFields}
                hover
                striped
                border
                size="sm"
                // itemsPerPage={10}
                // pagination
                scopedSlots={{
                  checkbox: (item: any) => (
                    <td style={{ position: 'relative' }}>
                      <CLabel
                        className="pointer"
                        htmlFor={`item-${item.id}`}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                        }}
                      />
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id={`item-${item.id}`}
                          name="checkbox2"
                          value="option2"
                          className="checkbox-lg"
                          checked={item.assigned}
                          onChange={() => {
                            onCheckBoxClick(item);
                          }}
                        />
                      </CFormGroup>
                    </td>
                  ),
                }}
              />
            </div>
          </CCardBody>
        </CModalBody>
      </CModal>
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this data</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton onClick={() => submitDeleteDriverZone()} color="primary">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal size="xl" show={viewDriverVisible} onClose={() => setViewDriverVisible(false)}>
        <CModalHeader>
          <CModalTitle>Driver List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CDataTable
            items={driverLinkState}
            fields={driverFields}
            hover
            striped
            border
            size="sm"
            // itemsPerPage={10}
            // pagination
            scopedSlots={{
              checkbox: (item: any) => (
                <td style={{ position: 'relative' }}>
                  <CLabel
                    className="pointer"
                    htmlFor={`item-${item.id}`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                    }}
                  />
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id={`item-${item.id}`}
                      name="checkbox2"
                      value="option2"
                      className="checkbox-lg"
                      checked={item.assigned}
                      onChange={() => {
                        onCheckBoxClick(item);
                      }}
                    />
                  </CFormGroup>
                </td>
              ),
            }}
          />
          <CRow>
            <CCol xs="12">
              <div className="d-flex flex-row-reverse">
                <CButton
                  color="secondary"
                  className="px-4"
                  onClick={() => setViewDriverVisible(false)}>
                  Back
                </CButton>
                <CButton color="success" className="px-4 mr-4" onClick={handleUpdateDriverLinkList}>
                  Update
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};

export default DriverZoneMaintenance;
