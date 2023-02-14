import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { globalToast } from 'src/redux/slice';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CLabel,
  CListGroupItem,
  CRow,
  CDataTable,
  CSelect,
  CModalHeader,
  CModal,
  CModalBody,
  CContainer,
} from '@coreui/react';
import { useHistory, useParams } from 'react-router-dom';
import {
  assignDriver,
  getDriverZoneList,
  getZoneOrderDetails,
  getZoneOrderList,
  assignDriverOrderList,
  assignDriverOrderIndividual,
} from '../redux/deliveryPreparationSlice';
import GMapLocationView from 'src/components/GoogleMap/GoogleMapOrderLocationView';
import GMapLocationDetailView from 'src/components/GoogleMap/GoogleMapOrderLocationDetailView';

const DeliveryPreparationDetail = () => {
  const { id } = useParams<any>();
  const history = useHistory();
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [driverAssignedCache, setDriverAssignedCache] = React.useState({
    delivery_preparation_id: null,
    driver_id: null,
    driver_name: null,
  });
  const [viewDriverVisible, setViewDriverVisible] = React.useState(false);
  const [viewOrderUnassigned, setViewOrderUnassigned] = React.useState(false);
  const [auth, deliveryPrepState] = useSelector(
    (state: any) => [state.auth, state.deliverypreparation] as const,
  );
  const {
    deliveryDriverList,
    deliveryDetail,
    driverZoneListPayload,
    zoneOrderListPayload,
    zoneOrderDetailsPayload,
  } = deliveryPrepState;
  const orders = deliveryDetail?.orders || [];
  // const driverZoneList = JSON.parse(JSON.stringify(driverZoneListPayload?.data));
  // data = JSON.parse(JSON.stringify(data)));
  // const [zoneState, setZoneState] = React.useState({
  //   zone_id_list: [] as any,
  // });
  const [zoneObjectState, setZoneObjectState] = React.useState({
    zone_object_list: [] as any,
  });

  const [orderObjectState, setOrderObjectState] = React.useState({
    order_object_list: [] as any,
  });

  const [oldOrderObjectState, setOldOrderObjectState] = React.useState({
    order_object_list: [] as any,
  });

  const fields = [
    {
      key: 'index',
      label: 'No.',
    },
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
    // {
    //   key: 'longitude',
    //   label: 'Longitude',
    // },
    // {
    //   key: 'latitude',
    //   label: 'Latitude',
    // },
    // {
    //   key: 'items',
    //   label: 'Item(s)',
    // },
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
      // dispatch(getDeliveryDriverList(auth));
      // dispatch(getDeliveryPlanDetail(auth, id));
      dispatch(getDriverZoneList(auth, id));
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
      dispatch(
        getZoneOrderDetails(auth, {
          zone_object_list: zoneObjectState.zone_object_list,
          delivery_preparation_id: id,
        }),
      );
      dispatch(
        getZoneOrderList(auth, {
          zone_object_list: zoneObjectState.zone_object_list,
          delivery_preparation_id: id,
        }),
      );
    }
  };

  const handleAssignDriverOrderList = async (ev: any, order_list: any) => {
    const driverId = ev.target.value;
    const driverName = ev.target.options[ev.target.selectedIndex].text;
    if (orderObjectState.order_object_list.length === 0) {
      // eslint-disable-next-line
      alert('Please select order from map');
      ev.target.value = '';
      return;
    }
    setOldOrderObjectState({
      ...oldOrderObjectState,
      order_object_list: orderObjectState.order_object_list,
    });
    try {
      await assignDriverOrderList(auth, {
        delivery_preparation_id: id,
        order_list,
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
    dispatch(
      getZoneOrderDetails(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );
    dispatch(
      getZoneOrderList(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );
    setOldOrderObjectState({
      ...oldOrderObjectState,
      order_object_list: orderObjectState.order_object_list,
    });
    setOrderObjectState({ ...orderObjectState, order_object_list: [] });
    ev.target.value = '';
  };

  const handleRepeatAssignDriverOrderList = async (order_list: any) => {
    const driverId = driverAssignedCache.driver_id;
    if (orderObjectState.order_object_list.length === 0) {
      // eslint-disable-next-line
      alert('Please select order from map');
      return;
    }

    try {
      await assignDriverOrderList(auth, {
        delivery_preparation_id: id,
        order_list,
        driver_id: driverId,
      });
      dispatch(globalToast('success', 'Driver Updated'));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
    // reload
    dispatch(
      getZoneOrderDetails(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );
    dispatch(
      getZoneOrderList(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );

    // setOldOrderObjectState({ ...oldOrderObjectState, order_object_list: [] });
    setOldOrderObjectState({
      ...oldOrderObjectState,
      order_object_list: orderObjectState.order_object_list,
    });
    setOrderObjectState({ ...orderObjectState, order_object_list: [] });
  };

  const handleUndoAssignDriverOrderList = async (order_list: any) => {
    try {
      await assignDriverOrderIndividual(auth, {
        delivery_preparation_id: id,
        order_list,
      });
      dispatch(globalToast('success', 'Driver Undo Updated'));
      setOrderObjectState({ ...orderObjectState, order_object_list: [] });
      setOrderObjectState({
        ...orderObjectState,
        order_object_list: oldOrderObjectState.order_object_list,
      });
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
    // reload
    dispatch(
      getZoneOrderDetails(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );
    dispatch(
      getZoneOrderList(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );

    setOldOrderObjectState({ ...orderObjectState, order_object_list: [] });
    // setOldOrderObjectState({ ...orderObjectState, order_object_list: orderObjectState.order_object_list });
    // setOrderObjectState({ ...orderObjectState, order_object_list: [] });
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
      dispatch(
        getZoneOrderDetails(auth, {
          zone_object_list: zoneObjectState.zone_object_list,
          delivery_preparation_id: id,
        }),
      );
      dispatch(
        getZoneOrderList(auth, {
          zone_object_list: zoneObjectState.zone_object_list,
          delivery_preparation_id: id,
        }),
      );
    }
  };

  // const validateForm = () => {
  //   // validate
  //   if (orders.filter((o: any) => !o.driver_id).length > 0) {
  //     dispatch(globalToast('error', 'All order must assign to a driver'));
  //     return false;
  //   }

  //   return true;
  // };

  // const generateList = () => {
  //   if (validateForm()) {
  //     // proceed to generate
  //     downloadDeliveryPlan(auth, id);
  //   }
  // };

  const addZoneList = (driver_zone_object: any) => {
    // console.log("check id in")
    // console.log(ids)
    // const zone_local_id_list = zoneState.zone_id_list
    const zone_local_object_list = zoneObjectState.zone_object_list;
    // if (!zone_object_list.includes(driver_zone_object.id)) {
    //   // zone_local_id_list.push(driver_zone_object.id)
    //   zone_object_list.push(driver_zone_object)
    // } else {
    let found = false;
    // eslint-disable-next-line
    for (let i = 0; i < zone_local_object_list.length; i++) {
      // console.log(zone_local_id_list[i])
      if (zone_local_object_list[i].id === driver_zone_object.id) {
        zone_local_object_list.splice(i, 1);
        found = true;
      }
      // }
    }
    if (!found) {
      zone_local_object_list.push(driver_zone_object);
    }
    setZoneObjectState({ ...zoneObjectState, zone_object_list: zone_local_object_list });
    // const x = JSON.parse(JSON.stringify(driverZoneListPayload);
    // for (var i = 0; i < x.length; i++) {
    //   if (x[i].id === id) {
    //     x[i].polygonOption.fillColor =  "#FFFF00"
    //   }
    // }
    // setDriverZoneListPayload(x)
    // console.log(zone_local_id_list)
  };

  const addOrderList = (order: any) => {
    // alert("test" + order)
    const order_local_object_list = orderObjectState.order_object_list;

    let found = false;
    for (let i = 0; i < order_local_object_list.length; i += 1) {
      if (order_local_object_list[i].id === order.id) {
        order_local_object_list.splice(i, 1);
        found = true;
      }
      // else if (order_local_object_list[i].longitude === order.longitude && order_local_object_list[i].latitude === order.latitude) {
      //   order_local_object_list.splice(i, 1);
      // }
    }
    if (found) {
      for (let i = 0; i < order_local_object_list.length; i += 1) {
        if (
          order_local_object_list[i].longitude === order.longitude &&
          order_local_object_list[i].latitude === order.latitude
        ) {
          order_local_object_list.splice(i, 1);
        }
      }
    }
    if (!found) {
      order_local_object_list.push(order);

      const order_list = zoneOrderListPayload?.data?.order_list;

      for (let i = 0; i < order_list.length; i += 1) {
        if (
          order_list[i].id !== order.id &&
          order_list[i].longitude === order.longitude &&
          order_list[i].latitude === order.latitude
        ) {
          order_local_object_list.push(order_list[i]);
        }
      }
    }

    setOrderObjectState({ ...orderObjectState, order_object_list: order_local_object_list });
    // alert(orderObjectState.order_object_list)
  };

  // eslint-disable-next-line
  const deleteZoneList = (id: any) => {};

  const handleGetZoneOrder = async () => {
    // const driverId = ev.target.value;
    dispatch(
      getZoneOrderDetails(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );
    dispatch(
      getZoneOrderList(auth, {
        zone_object_list: zoneObjectState.zone_object_list,
        delivery_preparation_id: id,
      }),
    );

    setViewDriverVisible(true);
  };

  const handleOrderUnassigned = async () => {
    setViewOrderUnassigned(true);
  };

  return (
    <>
      <CCard accentColor="success">
        <CCardBody>
          <CRow className="py-2">
            <CCol>
              <div className="d-flex align-items-center">
                <h5>Delivery Preparation Update</h5>
                <div className="ml-auto"></div>
              </div>
            </CCol>
          </CRow>
          <CCardBody>
            <div className="pb-3">
              <GMapLocationView
                driverZoneList={driverZoneListPayload?.data}
                orderList={orders}
                action1={addZoneList}
                action2={deleteZoneList}
              />
            </div>
          </CCardBody>
          <CButton
            color="success"
            className="px-4 mr-4"
            onClick={handleGetZoneOrder}
            disabled={
              !zoneObjectState.zone_object_list || !zoneObjectState.zone_object_list.length
            }>
            View Orders in Zones Selected
          </CButton>
          <CButton
            color="danger"
            className="px-4 mr-4"
            onClick={handleOrderUnassigned}
            // disabled={!zoneObjectState.zone_object_list || !zoneObjectState.zone_object_list.length}
          >
            View Orders Out of the Zones
          </CButton>
          <CButton color="secondary" className="px-4" onClick={() => history.goBack()}>
            Back
          </CButton>
          {zoneObjectState.zone_object_list.length > 0 && <h4>Zone area choosen</h4>}

          {zoneObjectState.zone_object_list.map((zone_object: any, idx: number) => (
            <CListGroupItem
              href="#"
              color={idx % 2 === 0 ? 'light' : 'dark'}
              onClick={() => addZoneList(zone_object)}>
              <div className="text-left">
                <CLabel>Zone ID : {zone_object.id} </CLabel>
                <br />
                <CLabel>Zone Name : {zone_object.name} </CLabel>
                <br />
                <CLabel>Driver Assigned (Order Number) : {zone_object.drivers} </CLabel>
              </div>
            </CListGroupItem>
          ))}
        </CCardBody>
      </CCard>
      <CModal size="xl" show={viewOrderUnassigned} onClose={() => setViewOrderUnassigned(false)}>
        <CCardBody>
          <CDataTable
            items={orders.filter(
              (o: any) =>
                o.driver_zone_maintenance_id === 0 || o.driver_zone_maintenance_id === null,
            )}
            fields={fields}
            hover
            striped
            border
            responsive
            size="sm"
            scopedSlots={{
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
        </CCardBody>
      </CModal>
      <CModal size="xl" show={viewDriverVisible} onClose={() => setViewDriverVisible(false)}>
        <CModalHeader>
          {/* <CModalTitle>Driver List</CModalTitle> */}
          <GMapLocationDetailView
            driverZoneList={zoneOrderDetailsPayload?.data?.zone_order_list}
            orderList={zoneOrderListPayload?.data?.order_list}
            action1={addOrderList}
          />
        </CModalHeader>
        <CModalBody>
          <CCard>
            <br />
            <CContainer>
              <CRow>
                <CCol xs={8}>
                  {driverAssignedCache.delivery_preparation_id != null && (
                    <CButton
                      color="success"
                      // className="px-4"
                      onClick={() =>
                        handleRepeatAssignDriverOrderList(orderObjectState.order_object_list)
                      }>
                      Assign to {driverAssignedCache.driver_name}
                    </CButton>
                  )}
                </CCol>
                <CCol xs={4}>
                  <div className="float-right align-middle">
                    {oldOrderObjectState.order_object_list.length !== 0 && (
                      // && oldOrderObjectState.order_object_list.length != 0
                      <CButton
                        color="warning"
                        // className="px-4"
                        onClick={() =>
                          handleUndoAssignDriverOrderList(oldOrderObjectState.order_object_list)
                        }>
                        Revert to previous driver assigned
                      </CButton>
                    )}
                  </div>
                </CCol>
              </CRow>
            </CContainer>
            <br />
            <CContainer>
              <CRow>
                <CCol xs={6}>
                  <CSelect
                    // name={`driver[${order.id}]`}
                    // id={`driver[${order.id}]`}
                    // key={`driver[${order.id}]`}
                    // size="sm"
                    // value={order.driver_id}
                    onChange={(ev) =>
                      handleAssignDriverOrderList(ev, orderObjectState.order_object_list)
                    }>
                    <option value="">Please Select Driver Assign to Order ticked</option>
                    <option value="0">**Unassign Driver**</option>
                    {deliveryDriverList?.map((driver: any) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.full_name}
                      </option>
                    ))}
                    <br />
                    <br />
                    <br />
                  </CSelect>
                </CCol>
                <CCol xs={6}>
                  {orderObjectState.order_object_list.map((order_object: any, idx: number) => (
                    <CListGroupItem
                      href="#"
                      color={idx % 2 === 0 ? 'light' : 'dark'}
                      onClick={() => addOrderList(order_object)}>
                      <div className="text-left">
                        <CLabel>
                          {idx + 1} - Order ID : {order_object.id}{' '}
                        </CLabel>
                        <br />
                        <CLabel>
                          Driver Name : {order_object.driver_name ? order_object.driver_name : '-'}{' '}
                        </CLabel>
                        <br />
                        <CLabel>Delivery Address : {order_object.delivery_address} </CLabel>
                        <br />
                        <CLabel>Item Detail : {order_object.details} </CLabel>
                        <br />
                        <CLabel>Delivery Remark : {order_object.delivery_remark} </CLabel>
                        <br />
                      </div>
                    </CListGroupItem>
                  ))}
                </CCol>
              </CRow>
            </CContainer>
          </CCard>
          {zoneOrderDetailsPayload?.data?.zone_order_list.map((zone_order_object: any) => (
            <CCard>
              <h5>Zone Name : {zone_order_object.zone.name}</h5>
              {zone_order_object?.drivers
                .filter((driver: any) => driver.order_list.length > 0)
                .map((driver: any) => (
                  <CCardBody>
                    <h5>
                      {driver.flag_colour ? 'Driver Name :' : 'No Driver Assigned'}{' '}
                      {driver.first_name}
                      <img
                        alt="logo"
                        style={{ paddingLeft: '20px' }}
                        src={
                          driver.flag_colour
                            ? process.env.REACT_APP_BASE_URL + '/images/' + driver.flag_colour
                            : 'https://maps.google.com/mapfiles/ms/icons/red.png'
                        }
                      />
                    </h5>
                    <CDataTable
                      items={[
                        ...driver.order_list.filter((o: any) => !o.driver_id),
                        ...driver.order_list.filter((o: any) => o.driver_id),
                      ]}
                      fields={fields}
                      hover
                      striped
                      border
                      responsive
                      size="sm"
                      sorter={true}
                      scopedSlots={{
                        index: (order: any, index: number) => <td>{index + 1}</td>,
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
                              {deliveryDriverList?.map((_driver: any) => (
                                <option key={_driver.id} value={_driver.id}>
                                  {_driver.full_name}
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
                  </CCardBody>
                ))}
            </CCard>
          ))}
        </CModalBody>
      </CModal>
    </>
  );
};

export default DeliveryPreparationDetail;
