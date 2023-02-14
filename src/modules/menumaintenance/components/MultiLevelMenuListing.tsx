import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from 'src/redux/types';
import {
  deleteCategory,
  deleteItem,
  deleteVariant,
  getMenuList,
  setCreateMenuItemFormState,
  setMenuDetailFormState,
  upsertItem,
} from '../redux/menuMaintenanceSlice';
import { MenuItemType } from '../constants';
import { globalToast } from 'src/redux/slice';
import ItemForm from './ItemForm';

interface ItemOptionProps {
  onClickEdit: Function;
  onClickDelete: Function;
  onClickAdd: Function;
}

const ItemOptions = (props: ItemOptionProps) => {
  return (
    <>
      <CButton size="sm" variant="ghost" color="info" onClick={props.onClickEdit}>
        <CIcon name="cil-pencil" size="sm" />
      </CButton>
      <CButton size="sm" variant="ghost" color="danger" onClick={props.onClickDelete}>
        <CIcon name="cil-trash" size="sm" />
      </CButton>
      <CButton size="sm" variant="ghost" color="success" onClick={props.onClickAdd}>
        <CIcon name="cil-plus" size="sm" />
      </CButton>
    </>
  );
};

interface Props {
  containerClass?: string;
}

const MultiLevelMenuListing = (props: Props) => {
  const { containerClass } = props;
  const dispatch = useDispatch<RootDispatch>();
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] =
    React.useState<{ type: MenuItemType; id: number; name: string }>();
  const [authState, menuMaintState] = useSelector(
    (state: RootState) => [state.auth, state.menuMaintenance] as const,
  );

  const { selectedMenu, itemList, createMenuDetailFormState, editMenuDetailFormState } =
    menuMaintState;

  const addCategoryHandler = () => {
    dispatch(
      setCreateMenuItemFormState({
        type: MenuItemType.CATEGORY,
      }),
    );
    setShowAddModal(true);
  };

  const addItemHandler = () => {
    dispatch(
      setCreateMenuItemFormState({
        type: MenuItemType.ITEM,
      }),
    );
    setShowAddModal(true);
  };

  const addVariantHandler = () => {
    dispatch(
      setCreateMenuItemFormState({
        type: MenuItemType.VARIANT,
      }),
    );
    setShowAddModal(true);
  };

  const addHandler = async () => {
    try {
      switch (createMenuDetailFormState?.type) {
        case MenuItemType.CATEGORY:
          await upsertItem(authState, createMenuDetailFormState);
          break;
        case MenuItemType.ITEM:
          await upsertItem(authState, createMenuDetailFormState);
          break;
        case MenuItemType.VARIANT:
          await upsertItem(authState, createMenuDetailFormState);
          break;
        default:
          setShowAddModal(false);
          return;
      }

      dispatch(globalToast('success', `${createMenuDetailFormState?.type} Added`));
      setShowAddModal(false);
      // reload data
      dispatch(getMenuList(authState));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  const editCategoryHandler = (category: any) => {
    dispatch(
      setMenuDetailFormState({
        type: MenuItemType.CATEGORY,
        id: category.id,
        name: category.name,
      }),
    );
  };

  const editItemHandler = (item: any, isPlan: boolean) => {
    dispatch(
      setMenuDetailFormState({
        type: MenuItemType.ITEM,
        id: item.id,
        name: item.name,
        price: item.default_price,
        isPlan,
      }),
    );
  };

  const editVariantHandler = (variant: any, isPlan: boolean) => {
    dispatch(
      setMenuDetailFormState({
        type: MenuItemType.VARIANT,
        id: variant.id,
        name: variant.description,
        price: variant.price,
        isPlan,
        days: variant.day,
      }),
    );
  };

  const deleteHandler = async () => {
    try {
      switch (deleteTarget?.type) {
        case MenuItemType.CATEGORY:
          await deleteCategory(authState, deleteTarget.id);
          break;
        case MenuItemType.ITEM:
          await deleteItem(authState, deleteTarget.id);
          break;
        case MenuItemType.VARIANT:
          await deleteVariant(authState, deleteTarget.id);
          break;
        default:
          setDeleteTarget(undefined);
          return;
      }

      dispatch(globalToast('success', `${deleteTarget?.type} Deleted`));
      setDeleteTarget(undefined);
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  return (
    <React.Fragment>
      {!!deleteTarget && (
        <CModal show={!!deleteTarget} onClose={() => setDeleteTarget(undefined)}>
          <CModalHeader closeButton>Delete {deleteTarget.type.toUpperCase()}</CModalHeader>
          <CModalBody>Do you sure you want to delete `{deleteTarget.name}`?</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={deleteHandler}>
              Yes
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setDeleteTarget(undefined)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      {showAddModal && (
        <CModal show={showAddModal} onClose={() => setShowAddModal(false)}>
          <CModalHeader closeButton>
            Add {createMenuDetailFormState?.type?.toUpperCase()}
          </CModalHeader>
          <CModalBody>
            <ItemForm inputFormState={createMenuDetailFormState} />
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={addHandler}>
              Yes
            </CButton>{' '}
            <CButton color="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}

      <CCard className={containerClass}>
        <CCol style={{ paddingTop: '1.25rem' }}>
          <h5>Menu - {selectedMenu?.name}</h5>
        </CCol>

        <CCardBody style={{ overflow: 'auto' }}>
          <CListGroup accent flush={true}>
            {itemList.map((category: any) => {
              return (
                <div key={`category-${category.id}`}>
                  <CListGroupItem
                    className="text-uppercase justify-content-between font-weight-bold"
                    color="info"
                    accent={
                      editMenuDetailFormState?.type === MenuItemType.CATEGORY &&
                      editMenuDetailFormState.id === category.id
                        ? 'danger'
                        : ''
                    }>
                    <span className="align-middle">{category.name}</span>
                    <div className="float-right align-middle">
                      <ItemOptions
                        onClickAdd={addCategoryHandler}
                        onClickEdit={() => editCategoryHandler(category)}
                        onClickDelete={() =>
                          setDeleteTarget({
                            type: MenuItemType.CATEGORY,
                            id: category.id,
                            name: category.name,
                          })
                        }
                      />
                    </div>
                  </CListGroupItem>
                  {category.items.map((item: any) => (
                    <CListGroupItem
                      key={`item-${item.id}`}
                      className="justify-content-between border-bottom border-right"
                      accent={
                        editMenuDetailFormState?.type === MenuItemType.ITEM &&
                        editMenuDetailFormState.id === item.id
                          ? 'danger'
                          : ''
                      }>
                      <span className="align-middle">{item.name}</span>
                      <div className="float-right align-middle">
                        <ItemOptions
                          onClickAdd={addItemHandler}
                          onClickEdit={() => editItemHandler(item, Boolean(item.is_plan))}
                          onClickDelete={() =>
                            setDeleteTarget({
                              type: MenuItemType.ITEM,
                              id: item.id,
                              name: item.name,
                            })
                          }
                        />
                      </div>
                      {item.has_variant && (
                        <div className="pt-3">
                          <CListGroup flush accent>
                            {item.variants.map((variant: any) => (
                              <CListGroupItem
                                key={`item-variant-${variant.id}`}
                                className="justify-content-between p-0 pl-3 hover-bg-light"
                                accent={
                                  editMenuDetailFormState?.type === MenuItemType.VARIANT &&
                                  editMenuDetailFormState.id === variant.id
                                    ? 'danger'
                                    : 'secondary'
                                }>
                                <span className="align-middle">{variant.description}</span>
                                <div className="float-right align-middle">
                                  <ItemOptions
                                    onClickAdd={addVariantHandler}
                                    onClickEdit={() =>
                                      editVariantHandler(variant, Boolean(item.is_plan))
                                    }
                                    onClickDelete={() =>
                                      setDeleteTarget({
                                        type: MenuItemType.VARIANT,
                                        id: variant.id,
                                        name: variant.description,
                                      })
                                    }
                                  />
                                </div>
                              </CListGroupItem>
                            ))}
                          </CListGroup>
                        </div>
                      )}
                    </CListGroupItem>
                  ))}
                </div>
              );
            })}
          </CListGroup>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default React.memo(MultiLevelMenuListing);
