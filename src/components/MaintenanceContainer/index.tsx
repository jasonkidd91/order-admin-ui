import React from 'react';
import { CCol, CRow, CSelect } from '@coreui/react';

const MaintenanceContainer = (props: any) => {
  const { stores = [], selectedStore, handleStoreChange = () => {}, children } = props;

  return (
    <React.Fragment>
      <CRow className="pb-3">
        <CCol xs="12" sm="6" md="4">
          <CSelect name="store_id" id="store_id" value={selectedStore} onChange={handleStoreChange}>
            <option value="">Please Select Store</option>
            {stores?.map((store: any) => {
              return (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              );
            })}
          </CSelect>
        </CCol>
      </CRow>
      {children}
    </React.Fragment>
  );
};

export default React.memo(MaintenanceContainer);
