import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { globalToast } from 'src/redux/slice';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CLabel,
  CListGroup,
  CListGroupItem,
  CRow,
  CDataTable,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFooter,
  CSelect,
  CModal,
  CSpinner,
} from '@coreui/react';
import { useHistory, useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import Chip from 'src/components/Chip';
import IconBadge from 'src/components/IconBadge';
import { formatDate, parseDate } from 'src/helpers';
import {
  assignDriver,
  getDeliveryDriverList,
  getDeliveryPlanDetail,
  downloadDeliveryPlan,
  refreshDeliveryPlanDetail,
  setDeliveryDetail,
} from '../redux/deliveryPreparationSlice';
import DeliveryPreparationRoute from '../navigation/DeliveryPreparationRoute';

const DeliveryPreparationDetail = () => {
  const { id } = useParams<any>();
  const history = useHistory();
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [active, setActive] = React.useState(0);
  const [driverAssignedCache, setDriverAssignedCache] = React.useState({
    delivery_preparation_id: null,
    driver_id: null,
    driver_name: null,
  });
  const [viewOrderAssignedByDriver, setViewOrderAssignedByDriver] = React.useState(false);
  const [viewDriverId, setViewDriverId] = React.useState();
  // const [loader, setLoader] = React.useState(false);
  const [auth, deliveryPrepState] = useSelector(
    (state: any) => [state.auth, state.deliverypreparation] as const,
  );
  const { deliveryDriverList, deliveryDetail } = deliveryPrepState;
  const orders = deliveryDetail?.orders || [];
  const [loader, setLoader] = React.useState(false);
  const fields = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'delivery_time',
      label: 'Delivery Time',
    },
    {
      key: 'customer_name',
      label: 'Customer',
    },
    {
      key: 'customer_phone_number',
      label: 'Contact',
    },
    {
      key: 'delivery_address',
      label: 'Address',
    },
    {
      key: 'items',
      label: 'Item(s)',
    },
    {
      key: 'remarks',
      label: 'Remarks',
    },
    {
      key: 'store_name',
      label: 'Store',
    },
    {
      key: 'driver',
      label: 'Driver',
      _style: { width: '20%' },
    },
  ];

  const init = () => {
    // initialize effect
    try {
      dispatch(getDeliveryDriverList(auth, id));
      dispatch(getDeliveryPlanDetail(auth, id));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  const handleAssignDriver = async (ev: any, order: any) => {
    const driverId = ev.target.value;

    const driverName = ev.target.options[ev.target.selectedIndex].text;
    if (driverId && order) {
      try {
        await assignDriver(auth, {
          delivery_preparation_id: id,
          order_id: order.id,
          driver_id: driverId,
        });
        setDriverAssignedCache({
          delivery_preparation_id: id,
          driver_id: driverId,
          driver_name: driverName,
        });
        dispatch(globalToast('success', 'Driver Updated'));
      } catch (err: any) {
        dispatch(globalToast('error', err?.message));
      }
      // reload
      dispatch(getDeliveryPlanDetail(auth, id));
    }
  };

  const handleRepeatAssignDriver = async (order: any) => {
    const driverId = driverAssignedCache.driver_id;

    if (driverId && order) {
      try {
        await assignDriver(auth, {
          delivery_preparation_id: id,
          order_id: order.id,
          driver_id: driverId,
        });
        dispatch(globalToast('success', 'Driver Updated'));
      } catch (err: any) {
        dispatch(globalToast('error', err?.message));
      }
      // reload
      dispatch(getDeliveryPlanDetail(auth, id));
    }
  };

  const validateForm = () => {
    // validate
    // if (orders.filter((o: any) => !o.driver_id).length > 0) {
    //   dispatch(globalToast('error', 'All order must assign to a driver'));
    //   return false;
    // }

    return true;
  };

  const generateList = () => {
    if (validateForm()) {
      // proceed to generate
      downloadDeliveryPlan(auth, id);
    }
  };

  const updateOrder = () => {
    history.push(DeliveryPreparationRoute.UPDATE.path.replace(':id', id));
  };

  const refreshDeliveryPlan = async () => {
    // dispatch(refreshDeliveryPlanDetail(auth, id));
    try {
      setLoader(true);
      const resp = await refreshDeliveryPlanDetail(auth, id);
      dispatch(setDeliveryDetail(resp));
      setLoader(false);
      dispatch(globalToast('success', 'Delivery Plan Data Refreshed!'));
      // history.replace(DeliveryPreparationRoute.DETAIL.path.replace(':id', res.id));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  const countDriverOrders = (driver: any) =>
    orders.filter((o: any) => o.driver_id === driver.id).length;

  const viewDriverOrders = (driver: any) => {
    setViewDriverId(driver.id);
    setViewOrderAssignedByDriver(true);
  };

  return (
    <>
      <CCard accentColor="success">
        <CCardBody>
          <CRow className="py-2">
            <CCol>
              <div className="d-flex align-items-center">
                <h5>Delivery Preparation Detail</h5>
                <div className="ml-auto"></div>
              </div>
            </CCol>
          </CRow>

          {/* <Detail Section> */}
          <CRow>
            <CCol xs="12" md="3">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  For Date:
                </CLabel>
                <br />
                {deliveryDetail?.delivery_date
                  ? formatDate(parseDate(deliveryDetail.delivery_date))
                  : '-'}
              </CFormGroup>
            </CCol>
            <CCol xs="12" md="9">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  Remark:
                </CLabel>
                <br />
                {deliveryDetail?.remark}
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  For Stores - Slots:
                </CLabel>
                <br />
                <div className="d-flex flex-column">
                  {!!deliveryDetail?.stores &&
                    deliveryDetail.stores.map((store: any) => (
                      <div className="d-flex my-1" key={store.id}>
                        <div className="align-self-center pr-2">
                          <CIcon name="cil-restaurant" /> {store.name}
                        </div>
                        <div className="d-flex flex-wrap">
                          {!!store?.slots &&
                            store.slots
                              .filter((slot: any) => slot.store_id === store.id)
                              .map((slot: any) => (
                                <Chip
                                  key={slot.id}
                                  label={`${slot.slot_start} - ${slot.slot_end}`}
                                  color="danger"
                                  shape="rounded"
                                  className="m-1"
                                />
                              ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CFormGroup>
            </CCol>
          </CRow>
          {/* </Detail Section> */}

          <hr />

          {/* <Tab Section> */}
          <CRow>
            <CCol xs="12">
              <CTabs activeTab={active} onActiveTabChange={(idx: number) => setActive(idx)}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink className="c-header-nav-link">
                      <IconBadge
                        name="cil-list"
                        badgeLabel={orders.filter((o: any) => !o.driver_id).length}
                        badgeColor="danger"
                      />
                      {active === 0 && ' Table Listing'}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <IconBadge name="cil-people" />
                      {active === 1 && ' Driver Info'}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent fade={false}>
                  <CTabPane>
                    <CDataTable
                      items={[
                        ...orders.filter((o: any) => !o.driver_id),
                        ...orders.filter((o: any) => o.driver_id),
                      ]}
                      fields={fields}
                      hover
                      striped
                      border
                      responsive
                      size="sm"
                      tableFilter={true}
                      scopedSlots={{
                        items: (order: any) => (
                          <td>
                            <ul>
                              {order?.order_details?.map((item: any, idx: number) => (
                                <li key={idx}>
                                  {item.item_description} x {item.item_quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ),
                        driver: (order: any) => (
                          <td>
                            {deliveryDriverList
                              .filter((driver: any) => driver.id === order.driver_id)
                              .map((driver: any) => (
                                // eslint-disable-next-line
                                <label>Assignee - {driver.full_name}</label>
                              ))}
                            <CSelect
                              name={`driver[${order.id}]`}
                              id={`driver[${order.id}]`}
                              key={`driver[${order.id}]`}
                              size="sm"
                              value={order.driver_id}
                              onChange={(ev) => handleAssignDriver(ev, order)}>
                              <option value="" disabled={order.driver_id}>
                                Please Select Driver
                              </option>
                              {deliveryDriverList?.map((driver: any) => (
                                <option key={driver.full_name} value={driver.id}>
                                  {driver.full_name}
                                </option>
                              ))}
                            </CSelect>
                            <br />
                            {driverAssignedCache.delivery_preparation_id != null && (
                              <CButton
                                color="success"
                                className="px-4"
                                onClick={() => handleRepeatAssignDriver(order)}>
                                Assign to {driverAssignedCache.driver_name}
                              </CButton>
                            )}
                          </td>
                        ),
                      }}
                    />
                    {/* </Table Listing> */}
                  </CTabPane>
                  <CTabPane>
                    {/* <Driver Info> */}
                    <CListGroup>
                      {deliveryDriverList
                        // eslint-disable-next-line
                        .filter((driver: any) => countDriverOrders(driver) != 0)
                        .map((driver: any) => (
                          <CListGroupItem
                            href="#"
                            key={driver.id}
                            onClick={() => viewDriverOrders(driver)}>
                            <div className="d-flex">
                              <div>
                                <div className="font-weight-bold">
                                  {driver.full_name} <small>- {driver.phone}</small>
                                </div>
                                <div>Zones: {driver.zones.join(', ')}</div>
                              </div>
                              <div
                                className={`ml-auto align-self-center ${
                                  countDriverOrders(driver) >= driver.max_slot
                                    ? 'text-danger font-weight-bold'
                                    : ''
                                }`}>
                                Capacity: {countDriverOrders(driver)} / {driver.max_slot}
                              </div>
                            </div>
                          </CListGroupItem>
                        ))}
                    </CListGroup>
                    {/* </Driver Info> */}
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCol>
          </CRow>
          {/* </Tab Section> */}
        </CCardBody>
      </CCard>
      <CModal
        size="xl"
        show={viewOrderAssignedByDriver}
        onClose={() => setViewOrderAssignedByDriver(false)}>
        <CCardBody>
          <CDataTable
            items={orders.filter((o: any) => o.driver_id === viewDriverId)}
            fields={fields}
            hover
            striped
            border
            responsive
            size="sm"
            scopedSlots={{
              items: (order: any) => (
                <td>
                  <ul>
                    {order?.order_details?.map((item: any, idx: number) => (
                      <li key={idx}>
                        {item.item_description} x {item.item_quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              ),
              driver: (order: any) => (
                <td>
                  <CSelect
                    name={`driver[${order.id}]`}
                    id={`driver[${order.id}]`}
                    key={`driver[${order.id}]`}
                    size="sm"
                    value={order.driver_id}
                    onChange={(ev) => handleAssignDriver(ev, order)}>
                    <option value="" disabled={order.driver_id}>
                      Please Select Driver
                    </option>
                    {deliveryDriverList?.map((driver: any) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.full_name}
                      </option>
                    ))}
                  </CSelect>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CModal>
      <CFooter fixed color="light" className="px-0">
        <div className="w-100 text-right">
          <CLabel
            style={{ float: 'left' }}
            className={'font-weight-bold pointer'}
            htmlFor="selectAll">
            Total Orders: {orders.length}
          </CLabel>
          {loader && <CSpinner color="primary" />}
          <CButton color="success" className="px-4 mr-4" onClick={refreshDeliveryPlan}>
            Refresh
          </CButton>
          <CButton
            color="danger"
            className="px-4 mr-4"
            onClick={updateOrder}
            disabled={!orders || !orders.length}>
            Update
          </CButton>
          <CButton
            color="danger"
            className="px-4 mr-4"
            onClick={generateList}
            disabled={!orders || !orders.length}>
            Export
          </CButton>

          <CButton color="secondary" className="px-4" onClick={() => history.goBack()}>
            Back
          </CButton>
        </div>
      </CFooter>
    </>
  );
};

export default DeliveryPreparationDetail;
