import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { globalToast } from 'src/redux/slice';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CPagination,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useHistory } from 'react-router-dom';
import useSearchParams from 'src/hooks/useSearchParams';
import { formatDate, parseDate } from 'src/helpers';
import DeliveryPreparationRoute from '../navigation/DeliveryPreparationRoute';
import { deleteDeliveryPlan, getItemListPayload } from '../redux/deliveryPreparationSlice';

const DeliveryPreparation = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const history = useHistory();
  const { page = 1, limit } = useSearchParams<any>();
  const [showModal, setShowModal] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<any>();
  const [auth, deliveryPrepState] = useSelector(
    (state: any) => [state.auth, state.deliverypreparation] as const,
  );
  const { paging, records = [] } = deliveryPrepState.itemListPayload || {};

  const fields = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'delivery_date',
      label: 'Delivery Date',
    },
    {
      key: 'remark',
      label: 'Remark',
    },
    {
      key: 'created_admin',
      label: 'Created By',
    },
    {
      key: 'created_date',
      label: 'Created Date',
    },
    {
      key: 'updated_admin',
      label: 'Updated By',
    },
    {
      key: 'updated_date',
      label: 'Updated Date',
    },
    {
      key: 'action',
      label: '',
    },
  ];

  const init = async () => {
    // initialize effect
    try {
      // 1- get pagination listing
      await dispatch(getItemListPayload(auth, { page, limit }));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, [page]);

  const onSelectPage = (i: string | number) => {
    history.push(
      `${DeliveryPreparationRoute.LANDING.path}?page=${i}${limit ? `&limit=${limit}` : ''}`,
    );
  };

  const deleteItem = async (item: any) => {
    try {
      await deleteDeliveryPlan(auth, item.id);
      dispatch(globalToast('success', 'Record Deleted'));
      setShowModal(false);
      // reload data
      init();
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  const createHandler = () => {
    history.push(DeliveryPreparationRoute.CREATE.path);
  };

  const editHandler = (item: any) => {
    history.push(DeliveryPreparationRoute.DETAIL.path.replace(':id', item.id));
  };

  const deleteHandler = (item: any) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <CModal show={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader closeButton>Modal title</CModalHeader>
          <CModalBody>Do you sure you want to delete this item?</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => deleteItem(itemToDelete)}>
              Yes
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      <CCard accentColor="success">
        <CCardBody>
          <CRow className="py-3">
            <CCol>
              <div className="d-flex align-items-center">
                <h5>Delivery Preparation</h5>
                <div className="ml-auto">
                  <CButton color="danger" onClick={createHandler}>
                    <CIcon name="cil-plus" /> Create New
                  </CButton>
                </div>
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12">
              <CDataTable
                items={records}
                fields={fields}
                hover
                striped
                border
                responsive
                scopedSlots={{
                  remark: (item: any) => <td>{item.remark || '-'}</td>,
                  delivery_date: (item: any) => (
                    <td>{formatDate(parseDate(item.delivery_date), 'DD-MM-YYYY')}</td>
                  ),
                  created_admin: (item: any) => <td>{item.created_user?.name || '-'}</td>,
                  created_date: (item: any) => (
                    <td>{item.created_date ? formatDate(parseDate(item.created_date)) : '-'}</td>
                  ),
                  updated_admin: (item: any) => <td>{item.updated_user?.name || '-'}</td>,
                  updated_date: (item: any) => (
                    <td>{item.updated_date ? formatDate(parseDate(item.updated_date)) : '-'}</td>
                  ),
                  action: (item: any) => (
                    <td className="d-flex justify-content-around">
                      <CButton
                        className="py-0"
                        color="info"
                        variant="outline"
                        shape="round"
                        size="sm"
                        onClick={() => editHandler(item)}>
                        <CIcon size="sm" name="cil-pencil" />
                      </CButton>
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="round"
                        size="sm"
                        onClick={() => deleteHandler(item)}>
                        <CIcon size="sm" name="cil-trash" />
                      </CButton>
                    </td>
                  ),
                }}
              />
              <CPagination
                activePage={paging?.current_page}
                pages={paging?.last_page || 1} // must set to 1 if null else will infinite trigger page change
                onActivePageChange={onSelectPage}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default DeliveryPreparation;
