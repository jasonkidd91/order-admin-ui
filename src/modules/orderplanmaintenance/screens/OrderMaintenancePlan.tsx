import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CSelect,
  CInputRadio,
  CInput,
  CLabel,
  CFormGroup,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import {
  getMenuList,
  getReduxDataList,
  resetFoodPreparationListPayload,
  getOrderPlanDetailList,
} from '../redux/planEndInfoListSlice';
import CIcon from '@coreui/icons-react';

const OrderMaintenancePlan = () => {
  const dispatch = useDispatch();
  const [datePickerDisable, setDatePickerDisable] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [dateSearchState, setDateSearchState] = useState({
    from: '',
    to: '',
  });

  const [menuSelectState, setMenuState] = useState({
    menu_id: '',
  });

  const fields = [
    {
      key: 'id',
      label: 'Order Id',
    },
    {
      key: 'order_ref',
      label: 'Order ref Id',
    },
    {
      key: 'customer_name',
      label: 'Customer Name',
    },
    {
      key: 'customer_phone_number',
      label: 'Customer Phone Number',
    },
    {
      key: 'delivery_date',
      label: 'Delivery Date',
    },
    {
      key: 'delivery_time',
      label: 'Delivery Time',
    },
    {
      key: 'store_name',
      label: 'Store Name',
    },
    {
      key: 'address',
      label: 'Address',
    },
    {
      key: 'item',
      label: 'Item',
    },
    {
      key: 'remarks',
      label: 'Remarks',
    },
    {
      key: 'detail',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
  ];

  const detailfields = [
    {
      key: 'id',
      label: 'Order Id',
    },
    {
      key: 'order_ref',
      label: 'Order ref Id',
    },
    {
      key: 'customer_name',
      label: 'Customer Name',
    },
    {
      key: 'customer_phone_number',
      label: 'Customer Phone Number',
    },
    {
      key: 'delivery_date',
      label: 'Delivery Date',
    },
    {
      key: 'delivery_time',
      label: 'Delivery Time',
    },
    {
      key: 'store_name',
      label: 'Store Name',
    },
    {
      key: 'address',
      label: 'Address',
    },
    {
      key: 'item',
      label: 'Item',
    },
    {
      key: 'remarks',
      label: 'Remarks',
    },
  ];

  const {
    reduxData = [],
    auth,
    menus,
    itemDetail = [],
  } = useSelector((state: any) => {
    return {
      reduxData: state.planEndInfoList.planEndInfoListPayload?.data?.orders,
      auth: state.auth,
      menus: state.planEndInfoList.menuListPayload?.data,
      itemDetail: state.planEndInfoList.planEndInfoDetailPayload?.data,
    };
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDateSearchState({ ...dateSearchState, [name]: value });
  };

  const search = () => {
    dispatch(getReduxDataList(auth, dateSearchState, menuSelectState));
  };

  function getTodayDate() {
    let today = new Date();
    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    return date;
  }

  function getTodayDateISOFormat() {
    let curr = new Date();
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  const onTodayClick = () => {
    setDatePickerDisable(true);
    setDateSearchState({
      from: getTodayDate(),
      to: getTodayDate(),
    });
  };
  const onYesterdayClick = () => {
    setDatePickerDisable(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    let date = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    setDateSearchState({
      from: date,
      to: date,
    });
  };
  const onTomorrowClick = () => {
    setDatePickerDisable(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    let date = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    setDateSearchState({
      from: date,
      to: date,
    });
  };

  const onLast7DaysClick = () => {
    setDatePickerDisable(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 7);
    let date = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    setDateSearchState({
      from: date,
      to: getTodayDate(),
    });
  };

  const onNext7DaysClick = () => {
    setDatePickerDisable(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 7);
    let date = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    setDateSearchState({
      from: getTodayDate(),
      to: date,
    });
  };

  const onCustomDateClick = () => {
    setDatePickerDisable(false);
    document.getElementById('from');
    let from = (document.getElementById('from') as HTMLInputElement).value;
    let to = (document.getElementById('to') as HTMLInputElement).value;
    setDateSearchState({
      from,
      to,
    });
  };

  const handleMenuChange = (event: any) => {
    const { name, value } = event.target;
    setMenuState({ ...menuSelectState, [name]: value });
  };

  useEffect(() => {
    dispatch(resetFoodPreparationListPayload());
    dispatch(getMenuList(auth));
    setDateSearchState({
      from: getTodayDate(),
      to: getTodayDate(),
    });
  }, []);

  const viewOrderPreparationDetail = (order_id: any) => {
    dispatch(getOrderPlanDetailList(auth, order_id));
    setDetailVisible(true);
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex pb-3 align-items-center">
                <h5>Check Last Day Plan</h5>
              </div>
              <CCard accentColor="primary">
                <CCardBody>
                  {/* <Filter First Section> */}
                  <CFormGroup row>
                    <CCol xs="12" className="d-flex flex-wrap">
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          value="all"
                          onChange={onYesterdayClick}
                          id="cradio-yesterday"
                        />
                        <CLabel htmlFor="cradio-yesterday">Yesterday</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          value="today"
                          onChange={onTodayClick}
                          id="cradio-today"
                        />
                        <CLabel htmlFor="cradio-today">Today</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          value="tomorrow"
                          onChange={onTomorrowClick}
                          id="cradio-tomorrow"
                        />
                        <CLabel htmlFor="cradio-tomorrow">Tomorrow</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          value="last7days"
                          onChange={onLast7DaysClick}
                          id="cradio-last7days"
                        />
                        <CLabel htmlFor="cradio-last7days">Last 7 Days</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          value="next7days"
                          onChange={onNext7DaysClick}
                          id="cradio-next7days"
                        />
                        <CLabel htmlFor="cradio-next7days">Next 7 Days</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  {/* <Filter First Section/> */}

                  <hr />

                  {/* <Filter Second Section> */}
                  <CFormGroup row>
                    <CCol xs="12" sm="4" md="2">
                      <CFormGroup variant="checkbox">
                        <CInputRadio
                          defaultChecked
                          className="form-check-input"
                          name="radios"
                          value="customerPick"
                          onChange={onCustomDateClick}
                          id="cradio-daterange"
                        />
                        <CLabel htmlFor="cradio-daterange">By Date Range</CLabel>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6" sm="4">
                      <CFormGroup>
                        <CLabel htmlFor="date-input">Delivery Start Date:</CLabel>
                        <CInput
                          type="date"
                          id="from"
                          name="from"
                          placeholder="date"
                          defaultValue={getTodayDateISOFormat()}
                          onChange={handleChange}
                          disabled={datePickerDisable}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="6" sm="4">
                      <CFormGroup>
                        <CLabel htmlFor="date-input">Delivery End Date:</CLabel>
                        <CInput
                          type="date"
                          id="to"
                          name="to"
                          placeholder="date"
                          defaultValue={getTodayDateISOFormat()}
                          onChange={handleChange}
                          disabled={datePickerDisable}
                        />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  {/* <Filter Second Section /> */}

                  <hr />

                  {/* <Filter Third Section> */}
                  <CFormGroup row>
                    <CCol xs="12" sm="4">
                      <CLabel htmlFor="menu">Menu</CLabel>
                      <CSelect name="menu_id" id="menu_id" onChange={handleMenuChange}>
                        <option value="">All</option>
                        {menus?.map((menu: any) => {
                          return (
                            <option key={menu.id} value={menu.id}>
                              {menu.remarks}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  {/* <Filter Third Section /> */}

                  <div className="d-flex flex-row-reverse">
                    <CButton
                      color="success"
                      className="px-4"
                      onClick={() => {
                        search();
                      }}>
                      Search
                    </CButton>
                  </div>
                </CCardBody>
                {/* <CCardFooter>
                  <CRow className="text-justify">
                    <CCol sm="12">{JSON.stringify(pagingPayload)}</CCol>
                  </CRow>
                </CCardFooter> */}
              </CCard>

              <CDataTable
                items={reduxData}
                fields={fields}
                hover
                striped
                border
                size="sm"
                itemsPerPage={100}
                pagination
                scopedSlots={{
                  detail: (item: any) => (
                    <td>
                      <CButton
                        color="success"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          viewOrderPreparationDetail(
                            item.order_ref === 'N/A' ? item.id : item.order_ref,
                          );
                        }}>
                        <CIcon name="cil-file" />
                      </CButton>
                    </td>
                  ),
                  item: (item: any) => {
                    return (
                      <td>
                        <ul>
                          {item?.order_details?.map((item_detail: any, idx: number) => {
                            return (
                              <li key={idx}>
                                {item_detail.item_description} x {item_detail.item_quantity}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    );
                  },
                }}
              />
              <CFormGroup row className="my-0">
                <CCol xs="12">
                  <CLabel className={'font-weight-bold'}>
                    List of Item Result : {reduxData?.length}
                  </CLabel>
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal size="xl" show={detailVisible} onClose={() => setDetailVisible(false)}>
        <CModalHeader>
          <CModalTitle>Plan Order List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup>
            <CDataTable
              items={itemDetail}
              fields={detailfields}
              hover
              striped
              border
              size="sm"
              itemsPerPage={50}
              pagination
              scopedSlots={{
                item: (item: any) => {
                  return (
                    <td>
                      <ul>
                        {item?.order_details?.map((item_detail: any, idx: number) => {
                          return (
                            <li key={idx}>
                              {item_detail.item_description} x {item_detail.item_quantity}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  );
                },
              }}
            />
          </CFormGroup>
        </CModalBody>
      </CModal>
    </>
  );
};

export default OrderMaintenancePlan;
