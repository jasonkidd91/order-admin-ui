import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CLabel, CFormGroup, CCard, CCardBody, CCol, CRow, CDataTable } from '@coreui/react';
import { getPrinterList } from '../redux/printerMaintenanceSlice';

const PrinterMaintenance = () => {
  const dispatch = useDispatch();

  const fields = [
    {
      key: 'name',
      label: 'Printer Name',
    },
    {
      key: 'sn',
      label: 'Serial Number',
    },
    {
      key: 'feieyun_respond',
      label: 'Feieyun Server Response',
    },
    {
      key: 'server_status',
      label: 'Status',
    },
  ];

  const { printerList = [], auth } = useSelector((state: any) => {
    return {
      printerList: state.printermaintenance.printerMaintenanceListPayload?.data,
      auth: state.auth,
    };
  });

  useEffect(() => {
    dispatch(getPrinterList(auth));
  }, []);

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex pb-3 align-items-center">
                <h5>Printer Status</h5>
              </div>
              <CDataTable items={printerList} fields={fields} hover striped border size="sm" />
              <CFormGroup row className="my-0">
                <CCol xs="12">
                  <CLabel className={'font-weight-bold'}>
                    List of printer result : {printerList?.length}
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

export default PrinterMaintenance;
