import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  CLabel,
  CFormGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
  CBadge,
  CButton,
} from '@coreui/react';
import { getStoreList } from '../redux/storeMaintenanceSlice';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';

const StoreMaintenance = () => {
  const dispatch = useDispatch();

  const fields = [
    {
      key: 'name',
      label: 'Store Name',
    },
    {
      key: 'menu_name',
      label: 'Menu Name',
    },
    {
      key: 'feieyun_printer_name',
      label: 'Feieyun Printer Name',
    },
    {
      key: 'feieyun_printer_sn',
      label: 'Feieyun Printer Serial Number',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'edit',
      label: 'Update',
    },
  ];

  const { storeList = [], auth } = useSelector((state: any) => {
    return {
      storeList: state.storemaintenance.storeMaintenanceListPayload?.data,
      auth: state.auth,
    };
  });

  useEffect(() => {
    dispatch(getStoreList(auth));
  }, []);

  const getStatusDescription = (status: any) => {
    switch (status) {
      case '0':
        return 'Inactive';
      default:
        return 'Active';
    }
  };

  const getBadge = (status: any) => {
    switch (status) {
      case '0':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const history = useHistory();

  const routeChange = (item: any) => {
    let path = '/storeMaintenance/view/' + item.id;
    history.push(path);
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex pb-3 align-items-center">
                <h5>Store List</h5>
              </div>
              <CDataTable
                items={storeList}
                fields={fields}
                hover
                striped
                border
                size="sm"
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
                }}
              />
              <CFormGroup row className="my-0">
                <CCol xs="12">
                  <CLabel className={'font-weight-bold'}>
                    List of store result : {storeList?.length}
                  </CLabel>
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default StoreMaintenance;
