import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useEffect, useState } from 'react';
import {
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CButton,
  CCard,
  CCardBody,
  CDataTable,
  CCardHeader,
} from '@coreui/react';
import {
  deletePickup,
  getReduxDataList,
  getStoreList,
  resetReduxDataList,
} from '../redux/pickupSlice';
import { useHistory, useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import MaintenanceContainer from 'src/components/MaintenanceContainer';

const Pickup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { store_id } = useParams<any>();
  const [visible, setVisible] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState({
    id: '',
  });

  const fields = [
    'slot_start',
    'slot_end',
    'max_order',
    'cut_off_time',
    'name',
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

  const [storeSelectState, setStoreState] = useState({
    store_id: '',
  });

  const { reduxData, auth, stores } = useSelector((state: any) => {
    return {
      reduxData: state.pickup.pickupListPayload?.data,
      auth: state.auth,
      stores: state.pickup.storeListPayload?.data,
    };
  });

  const search = () => {
    if (storeSelectState.store_id == null || storeSelectState.store_id === '') {
      alert('Please select the store'); // eslint-disable-line no-alert
    } else {
      dispatch(getReduxDataList(auth, storeSelectState.store_id));
    }
  };

  const handleStoreChange = (event: any) => {
    const { value } = event.target;
    history.replace('/maintenance/pickup/' + value);
  };

  const addHours = () => {
    if (storeSelectState.store_id == null || storeSelectState.store_id === '') {
      alert('Please select the store'); // eslint-disable-line no-alert
    } else {
      let path = '/maintenance/pickup/create/' + storeSelectState.store_id;
      history.push(path);
    }
  };

  const viewDetails = (item: any) => {
    let path = '/maintenance/pickup/update/' + item.id;
    history.push(path);
  };

  const popUpConfirm = (item: any) => {
    setVisible(!visible);
    setSelectedPickup({
      id: item.id,
    });
  };

  const deletePickupHandler = () => {
    dispatch(deletePickup(auth, selectedPickup.id, storeSelectState.store_id));
    setVisible(false);
  };

  useLayoutEffect(() => {
    dispatch(resetReduxDataList());
  }, []);

  useEffect(() => {
    // dispatch(getReduxDataList(auth));
    dispatch(getStoreList(auth));
  }, []);

  useEffect(() => {
    // on store params init
    if (store_id) {
      setStoreState({ ...storeSelectState, store_id });
    }
  }, [store_id]);

  useEffect(() => {
    // on store change effect
    if (storeSelectState.store_id) {
      search();
    }
  }, [storeSelectState]);

  return (
    <>
      <CModal show={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this data</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton onClick={() => deletePickupHandler()} color="primary">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>

      <MaintenanceContainer
        stores={stores}
        selectedStore={storeSelectState.store_id}
        handleStoreChange={handleStoreChange}>
        {!!storeSelectState.store_id && (
          <>
            {/* <SlotMaintenance> */}
            <CCard accentColor="danger">
              <CCardHeader>
                <strong className="align-middle">Pickup Maintenance</strong>
                <div className="card-header-actions">
                  <CButton
                    size="sm"
                    color="success"
                    onClick={() => {
                      addHours();
                    }}>
                    Add Slot
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={reduxData}
                  fields={fields}
                  hover
                  striped
                  border
                  size="sm"
                  // itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    edit: (item: any) => (
                      <td>
                        <CButton
                          color="success"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            viewDetails(item);
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
            {/* <SlotMaintenance /> */}
          </>
        )}
      </MaintenanceContainer>
    </>
  );
};

export default Pickup;
