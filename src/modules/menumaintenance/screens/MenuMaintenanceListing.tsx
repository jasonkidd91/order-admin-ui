import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalToast } from 'src/redux/slice';
import {
  CBadge,
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
import MenuMaintenanceRoute from '../navigation/MenuMaintenanceRoute';
import {
  deleteMenu,
  getMenuList,
  setProfileDetailFormState,
  updateMenuStatus,
  upsertMenu,
} from '../redux/menuMaintenanceSlice';
import { MenuStatus } from '../constants';
import OptionButton from 'src/components/OptionButton';
import { RootDispatch, RootState } from 'src/redux/types';
import ProfileForm from '../components/ProfileForm';

const MenuMaintenance = () => {
  const dispatch = useDispatch<RootDispatch>();
  const history = useHistory();
  const { page = 1, limit } = useSearchParams<any>();
  const [showProfileModal, setShowProfileModal] = React.useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = React.useState<any>();
  const [updateStatusTarget, setUpdateStatusTarget] = React.useState<any>();
  const [authState, menuMaintState] = useSelector(
    (state: RootState) => [state.auth, state.menuMaintenance] as const,
  );

  const { menuList, profileDetailFormState } = menuMaintState;
  const { paging, records = [] } = menuList;

  const fields = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'remarks',
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
      key: 'status',
      label: 'Status',
    },
    {
      key: 'action',
      label: '',
    },
  ];

  const init = async () => {
    // initialize effect
    try {
      await dispatch(getMenuList(authState));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, [page]);

  const onSelectPage = (i: string | number) => {
    history.push(`${MenuMaintenanceRoute.LANDING.path}?page=${i}${limit ? `&limit=${limit}` : ''}`);
  };

  const editMenuHandler = (item: any) => {
    dispatch(
      setProfileDetailFormState({
        id: item.id,
        name: item.name,
        email: item.email,
        remarks: item.remarks,
        logoUrl: item.logo_url,
        tnc: item.terms_conditions,
        privacyPolicy: item.privacy_policy,
        minimumAmount: item.minimum_amount,
      }),
    );
    setShowProfileModal(true);
  };

  const saveMenuHandler = async () => {
    if (profileDetailFormState) {
      try {
        await upsertMenu(authState, profileDetailFormState);
        dispatch(
          globalToast('success', `Menu ${profileDetailFormState.id ? 'Updated' : 'Created'}`),
        );
        setShowProfileModal(false);
        // reload data
        init();
      } catch (err: any) {
        dispatch(globalToast('error', err?.message));
      }
    }
  };

  const editItemHandler = (item: any) =>
    history.push(MenuMaintenanceRoute.DETAIL.path.replace(':id', item.id));

  const deleteMenuHandler = async () => {
    try {
      await deleteMenu(authState, deleteTarget.id);
      dispatch(globalToast('success', 'Menu Deleted'));
      setDeleteTarget(undefined);
      // reload data
      init();
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  const toggleMenuStatusHandler = async () => {
    try {
      await updateMenuStatus(authState, updateStatusTarget.id, !updateStatusTarget.status);
      dispatch(globalToast('success', 'Status Updated'));
      setUpdateStatusTarget(undefined);
      // reload data
      init();
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  return (
    <>
      {!!deleteTarget && (
        <CModal show={!!deleteTarget} onClose={() => setDeleteTarget(undefined)}>
          <CModalHeader closeButton>Delete Menu</CModalHeader>
          <CModalBody>Do you sure you want to delete `{deleteTarget.name}`?</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={deleteMenuHandler}>
              Yes
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setDeleteTarget(undefined)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {!!updateStatusTarget && (
        <CModal show={!!updateStatusTarget} onClose={() => setUpdateStatusTarget(undefined)}>
          <CModalHeader closeButton>Update Menu Status</CModalHeader>
          <CModalBody>
            Do you sure you want to set `{updateStatusTarget.name}` to{' '}
            {updateStatusTarget.status ? 'Inactive' : 'Active'}?
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={toggleMenuStatusHandler}>
              Yes
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setUpdateStatusTarget(undefined)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {showProfileModal && (
        <CModal
          size="lg"
          show={showProfileModal}
          closeOnBackdrop={false}
          onClose={() => setShowProfileModal(false)}>
          <CModalHeader closeButton>
            {profileDetailFormState && profileDetailFormState.id ? 'Edit' : 'Create'} Menu
          </CModalHeader>
          <CModalBody>
            <ProfileForm />
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={saveMenuHandler}>
              Save
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setShowProfileModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      <CCard accentColor="danger">
        <CCardBody>
          <CRow className="py-3">
            <CCol>
              <div className="d-flex align-items-center">
                <h5>Menu Maintenance</h5>
                <div className="ml-auto">
                  <CButton
                    color="danger"
                    onClick={() => {
                      dispatch(setProfileDetailFormState({}));
                      setShowProfileModal(true);
                    }}>
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
                  status: (item: any) => (
                    <td className="text-center">
                      <CBadge color={item.status === 1 ? 'success' : ''}>
                        {MenuStatus[item.status]}
                      </CBadge>
                    </td>
                  ),
                  action: (item: any) => (
                    <td className="text-center">
                      <OptionButton
                        title={item.name}
                        menu={[
                          {
                            icon: 'cil-pencil',
                            iconColor: 'text-success',
                            label: 'Edit Menu',
                            clickHandler: () => editMenuHandler(item),
                          },
                          {
                            icon: 'cil-book',
                            iconColor: 'text-primary',
                            label: 'Edit Item',
                            clickHandler: () => editItemHandler(item),
                          },
                          {
                            icon: 'cil-trash',
                            iconColor: 'text-danger',
                            label: 'Delete',
                            clickHandler: () => setDeleteTarget(item),
                          },
                          {
                            icon: 'cil-user-follow',
                            iconColor: 'text-info',
                            label: `Set to ${item.status === 0 ? 'Active' : 'Inactive'}`,
                            clickHandler: () => setUpdateStatusTarget(item),
                          },
                        ]}
                      />
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

export default MenuMaintenance;
