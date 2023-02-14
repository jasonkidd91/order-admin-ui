import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
  CBadge,
} from '@coreui/react';
import { deleteDriver, getDriverList } from '../redux/driverSlice';
import { useHistory } from 'react-router-dom';
import CIcon from '@coreui/icons-react';

const DriverMaintenance = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState({
    driver_name: '',
    id: '',
  });

  const fields = [
    // 'first_name',
    // 'last_name',
    'full_name',
    'max_slot',
    'phone',
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

  const { driverData, auth } = useSelector((state: any) => {
    return {
      driverData: state.driver.driverListPayload?.data,
      auth: state.auth,
    };
  });
  useEffect(() => {
    dispatch(getDriverList(auth));
  }, []);

  const history = useHistory();

  const routeChange = (item: any) => {
    let path = '/drivermaintenance/view/' + item.id;
    history.push(path);
  };

  const popUpConfirm = (item: any) => {
    setVisible(!visible);
    setSelectedDriver({
      driver_name: item.first_name + ' ' + item.last_name,
      id: item.id,
    });
  };

  const deleteDriverHandler = () => {
    dispatch(deleteDriver(auth, selectedDriver.id));
    setVisible(false);
    dispatch(getDriverList(auth));
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex flex-row-reverse pb-3">
                <CButton color="success" className="px-4" to="/drivermaintenance/create">
                  Add Driver
                </CButton>
              </div>
              <CDataTable
                items={driverData}
                fields={fields}
                hover
                striped
                border
                size="sm"
                itemsPerPage={50}
                pagination
                tableFilter={true}
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
          Are you sure you want to delete driver : {selectedDriver?.driver_name}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton onClick={() => deleteDriverHandler()} color="primary">
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DriverMaintenance;
