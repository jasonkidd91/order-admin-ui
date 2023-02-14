/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CModalFooter,
  CInputCheckbox,
  CPagination,
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
  CFooter,
} from '@coreui/react';
import {
  downloadOrderDataList,
  getOrderDetail,
  resetOrderGeneralList,
  updateStatusToServer,
  getMenuList,
  getOrderGeneralList,
  printReceipt,
  copyOrder,
  downloadOrderDataListBasedOnIds,
  getSlotList,
  sendEditRemarksRequest,
} from '../redux/orderMaintenanceSlice';
import CIcon from '@coreui/icons-react';
import { useHistory, useParams } from 'react-router-dom';
import Divider from 'src/components/Divider';

const OrderGeneral = () => {
  let { status = '' } = useParams<any>();

  function getTodayDateISOFormat() {
    let curr = new Date();
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  const history = useHistory();

  const dispatch = useDispatch();
  const idList: number[] = [];
  // const dateList: any[] = [];
  const [dateListState, setDateListState] = React.useState({
    dateList: [getTodayDateISOFormat()] as any,
  });

  const [editRemarksState, setEditRemarksState] = useState({
    id: 0,
    remarks: '',
  });

  const [detailVisible, setDetailVisible] = useState(false);
  const [copyPasteModelVisible, setCopyPasteModelVisible] = useState(false);
  const [editRemarksModelVisible, setEditRemarksModelVisible] = useState(false);
  const [updateState, setUpdateState] = useState({
    status: '',
    payment_status: '',
    ids: idList,
    delivery_date: '',
    slot_id: '',
    copy_paste_date_list: [] as any,
  });

  const [page] = useState({
    number: 1,
  });

  const [datePickerDisable, setDatePickerDisable] = useState(true);

  const [dateSearchState, setDateSearchState] = useState({
    from: '',
    to: '',
  });

  const [orderSearchState, setOrderSearchState] = useState({
    item_name: '',
    search_value: '',
    payment_status: '',
    slot_id: '',
    sort_by: 'delivery_date',
  });

  const [menuSelectState, setMenuState] = useState({
    menu_id: '',
  });

  const fields = [
    {
      key: 'id',
      label: 'Order ID',
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
      key: 'customer_name',
      label: 'Customer Name',
    },
    {
      key: 'customer_phone_number',
      label: 'Contact',
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
      key: 'total_amount',
      label: 'Total Amount',
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
      key: 'payment_status_description',
      label: 'Pay',
    },
    {
      key: 'checkbox',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false,
    },
    {
      key: 'printed_count',
      label: 'R.P.',
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
      key: 'item_description',
      label: 'Item',
    },
    {
      key: 'item_quantity',
      label: 'Qty',
    },
    {
      key: 'item_price',
      label: 'Price',
    },
    {
      key: 'amount',
      label: 'Amount',
    },
  ];

  const {
    reduxData = [],
    auth,
    menus,
    pagingPayload,
    orderDetail,
    slots,
  } = useSelector((state: any) => {
    return {
      reduxData: state.ordermaintenance.orderGeneralListPayload?.data?.orders,
      auth: state.auth,
      menus: state.ordermaintenance.menuListPayload?.data,
      pagingPayload: state.ordermaintenance.orderGeneralListPayload?.data?.paging,
      orderDetail: state.ordermaintenance.orderDetailPayload?.data,
      slots: state.ordermaintenance.slotListPayload?.data,
    };
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDateSearchState({ ...dateSearchState, [name]: value });
  };

  function unCheck() {
    let checkboxes = document.getElementsByName('checkbox2') as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    let selectAllcheckboxes = document.getElementById('selectAll') as HTMLInputElement;
    selectAllcheckboxes.checked = false;
    setUpdateState({ ...updateState, ids: [] });
  }

  const search = () => {
    dispatch(
      getOrderGeneralList(
        status,
        auth,
        dateSearchState,
        menuSelectState,
        page.number,
        orderSearchState,
      ),
    );
    unCheck();
  };

  const setActivePage = (input: any) => {
    page.number = input;
    dispatch(
      getOrderGeneralList(
        status,
        auth,
        dateSearchState,
        menuSelectState,
        page.number,
        orderSearchState,
      ),
    );
    unCheck();
  };

  const download = () => {
    downloadOrderDataList(auth, dateSearchState, menuSelectState, orderSearchState, status);
  };

  function getTodayDate() {
    let today = new Date();
    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    return date;
  }

  const onAllClick = () => {
    setDatePickerDisable(true);
    setDateSearchState({
      from: '',
      to: '',
    });
  };
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

  const handleSlotChange = (event: any) => {
    const { value } = event.target;
    orderSearchState.slot_id = value;
  };

  React.useEffect(() => {
    // on menu state change
    if (menuSelectState) {
      dispatch(getSlotList(auth, menuSelectState.menu_id));
    }
  }, [menuSelectState]);

  useEffect(() => {
    dispatch(resetOrderGeneralList());
    dispatch(getMenuList(auth));
    dispatch(getSlotList(auth, (menuSelectState.menu_id = '')));
    setDateSearchState({
      from: '',
      to: '',
    });
    setUpdateState({
      ...updateState,
      delivery_date: getTodayDate(),
    });
    dispatch(
      getOrderGeneralList(
        status,
        auth,
        dateSearchState,
        menuSelectState,
        page.number,
        orderSearchState,
      ),
    );
  }, [status]);

  const onCheckBoxClick = (id: any, event: any) => {
    let isChecked = event.target.checked;
    let array = updateState.ids;
    // alert(id + " " + value);
    if (isChecked) {
      array.push(id);
      setUpdateState({ ...updateState, ids: array });
    } else {
      const index = array.indexOf(id);
      if (index > -1) {
        array.splice(index, 1);
        setUpdateState({ ...updateState, ids: array });
      }
    }
  };

  const updateStatus = async (input: any) => {
    if (updateState.ids.length === 0) {
      alert('Please select the order'); // eslint-disable-line no-alert
      return;
    }

    updateState.payment_status = '';
    updateState.status = input;
    dispatch(
      updateStatusToServer(
        auth,
        updateState,
        getOrderGeneralList(
          status,
          auth,
          dateSearchState,
          menuSelectState,
          page.number,
          orderSearchState,
        ),
      ),
    );
    unCheck();
  };

  const updatePaymentStatus = async (input: any) => {
    if (updateState.ids.length === 0) {
      alert('Please select the order'); // eslint-disable-line no-alert
      return;
    }
    updateState.status = '';
    updateState.payment_status = input;
    dispatch(
      updateStatusToServer(
        auth,
        updateState,
        getOrderGeneralList(
          status,
          auth,
          dateSearchState,
          menuSelectState,
          page.number,
          orderSearchState,
        ),
      ),
    );
    unCheck();
  };

  const downloadItemBasedOnId = () => {
    if (updateState.ids.length === 0) {
      alert('Please select the order'); // eslint-disable-line no-alert
      return;
    }
    if (updateState.ids === []) {
      alert('Please select the order'); // eslint-disable-line no-alert
    } else {
      downloadOrderDataListBasedOnIds(auth, updateState);
    }
    unCheck();
  };

  function getIdInArrayList() {
    let dataInList = reduxData;
    let result = [];
    for (let i = 0; i < dataInList.length; i++) {
      result.push(dataInList[i].id);
    }
    return result;
  }

  const onCheckBoxSelectAllClick = (event: any) => {
    let isChecked = event.target.checked;
    let checkboxes = document.getElementsByName('checkbox2') as NodeListOf<HTMLInputElement>;
    if (checkboxes != null) {
      if (isChecked) {
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = true;
        }
        if (checkboxes.length > 0) {
          setUpdateState({ ...updateState, ids: getIdInArrayList() });
        }
      } else {
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
        }
        setUpdateState({ ...updateState, ids: [] });
      }
    }
  };

  const popUpDetails = (item: any) => {
    setDetailVisible(true);
    dispatch(getOrderDetail(auth, item));
  };

  const editRemarks = (item: any) => {
    setEditRemarksModelVisible(true);
    const remarks = { id: item.id, remarks: item.remarks };
    // setEditRemarksState({ id: item.id, remarks: item.remarks });
    setEditRemarksState(remarks);
    // alert(editRemarksState.remarks);
    // dispatch(getOrderDetail(auth, item));
  };

  const handleSearchChange = (event: any) => {
    const { name, value } = event.target;
    setOrderSearchState({ ...orderSearchState, [name]: value });
  };

  const clickPrintReceipt = async () => {
    if (updateState.ids.length === 0) {
      alert('Please select the order'); // eslint-disable-line no-alert
      return;
    }
    dispatch(
      printReceipt(
        auth,
        updateState,
        getOrderGeneralList(
          status,
          auth,
          dateSearchState,
          menuSelectState,
          page.number,
          orderSearchState,
        ),
      ),
    );
    unCheck();
  };

  const handleUpdateRemarksChange = (event: any) => {
    const { name, value } = event.target;
    setEditRemarksState({ ...editRemarksState, [name]: value });
  };

  const handleDateArrayUpdateChange = (index: number) => (event: any) => {
    // alert(index)
    // eslint-disable-next-line
    const { name, value } = event.target;
    let dateList = dateListState.dateList;
    dateList[index] = value;
    setDateListState({ ...dateListState, dateList });
    // setUpdateState({ ...updateState, [name]: value });
  };

  const clickConfirmCopyPaste = async () => {
    if (updateState.ids.length === 0) {
      alert('Please select the order'); // eslint-disable-line no-alert
      return;
    }
    dispatch(
      copyOrder(
        auth,
        updateState,
        dateListState.dateList,
        getOrderGeneralList(
          status,
          auth,
          dateSearchState,
          menuSelectState,
          page.number,
          orderSearchState,
        ),
      ),
    );
    setCopyPasteModelVisible(false);
    unCheck();
  };

  const getTitle = () => {
    switch (status) {
      case '0':
        return 'Pending';
      case '1':
        return 'Confirmed';
      case '2':
        return 'Void';
      default:
        return 'General';
    }
  };

  const onSortByChange = (event: any) => {
    const { name, value } = event.target;
    // alert("JS test " + value);
    setOrderSearchState({ ...orderSearchState, [name]: value });
  };

  const addDateArray = async () => {
    let dateList = dateListState.dateList;
    let newDate;
    if (dateList.length === 0) {
      newDate = new Date();
    } else {
      // alert();
      newDate = new Date(dateList[dateList.length - 1]);
    }
    newDate.setDate(newDate.getDate() + 1);
    let date = newDate.toISOString().substr(0, 10);
    dateList.push(date);
    setDateListState({ ...dateListState, dateList });
    // alert(dateListState.dateList)
  };

  const reduceDateArray = async () => {
    let dateList = dateListState.dateList;
    dateList.splice(dateList.length - 1, 1);
    setDateListState({ ...dateListState, dateList });
    // alert(dateListState.dateList)
  };

  const clickConfirmEditRemarks = async () => {
    // if (updateState.ids.length === 0) {
    //   alert('Please select the order'); // eslint-disable-line no-alert
    //   return;
    // }
    dispatch(
      sendEditRemarksRequest(
        auth,
        editRemarksState,
        editRemarksState.id,
        getOrderGeneralList(
          status,
          auth,
          dateSearchState,
          menuSelectState,
          page.number,
          orderSearchState,
        ),
      ),
    );
    setEditRemarksModelVisible(false);
    // unCheck();
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex pb-3 align-items-center">
                <h5>{getTitle()}</h5>
                <div className="ml-auto">
                  <CButton
                    color="danger"
                    onClick={() => {
                      download();
                    }}>
                    Export Document
                  </CButton>
                </div>
              </div>
              <CCard accentColor="warning">
                <CCardBody>
                  {/* <Filter First Section> */}
                  <CFormGroup row>
                    <CCol xs="12" className="d-flex flex-wrap">
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          defaultChecked
                          value="all"
                          onChange={onAllClick}
                          id="cradio-all"
                        />
                        <CLabel htmlFor="cradio-all">All</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="pr-4">
                        <CInputRadio
                          className="form-check-input"
                          name="radios"
                          value="yesterday"
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
                  {/* <Filter First Section /> */}

                  <hr />

                  {/* <Filter Second Section /> */}
                  <CFormGroup row>
                    <CCol xs="12" sm="4" md="2">
                      <CFormGroup variant="checkbox">
                        <CInputRadio
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
                    <CCol xs="12" sm="4">
                      <CLabel htmlFor="menu">Payment Status</CLabel>
                      <CSelect
                        name="payment_status"
                        id="payment_status"
                        onChange={handleSearchChange}>
                        <option value="">All</option>
                        <option value="1">Paid</option>
                        <option value="0">Unpaid</option>
                      </CSelect>
                    </CCol>
                    <CCol xs="12" sm="4">
                      <CLabel htmlFor="slot">Slot</CLabel>
                      <CSelect name="slot_id" id="slot_id" onChange={handleSlotChange}>
                        <option value="">All</option>
                        {slots?.map((slot: any) => {
                          return (
                            <option key={slot.id} value={slot.id}>
                              {slot.name} : {slot.slot_start} - {slot.slot_end}
                            </option>
                          );
                        })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol xs="12" sm="6">
                      <CFormGroup>
                        <CLabel htmlFor="first-name">Search Query</CLabel>
                        <CInput
                          id="first-name"
                          type="text"
                          name="search_value"
                          value={orderSearchState?.search_value}
                          onChange={handleSearchChange}
                          placeholder="Enter Order Id or Customer Name or Address or Remarks"
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CFormGroup>
                        <CLabel htmlFor="item_name">Search Item</CLabel>
                        <CInput
                          id="item_name"
                          type="text"
                          name="item_name"
                          value={orderSearchState?.item_name}
                          onChange={handleSearchChange}
                          placeholder="Enter Item Name(avoid use special symbol)"
                        />
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <div className="d-flex pb-3 align-items-center">
                    <CLabel htmlFor="sort_by">Sorting By: </CLabel>
                    <div>
                      <CCol xs="12" className="d-flex flex-wrap">
                        <CFormGroup variant="checkbox" className="pr-4">
                          <CInputRadio
                            className="form-check-input"
                            name="sort_by"
                            defaultChecked
                            value="delivery_date"
                            onChange={onSortByChange}
                            id="cradio-delivery-date"
                          />
                          <CLabel htmlFor="cradio-all">Delivery Date</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="pr-4">
                          <CInputRadio
                            className="form-check-input"
                            name="sort_by"
                            value="id"
                            onChange={onSortByChange}
                            id="cradio-id"
                          />
                          <CLabel htmlFor="cradio-yesterday">Order Id</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" className="pr-4">
                          <CInputRadio
                            className="form-check-input"
                            name="sort_by"
                            value="remarks"
                            onChange={onSortByChange}
                            id="cradio-remarks"
                          />
                          <CLabel htmlFor="cradio-today">Remarks</CLabel>
                        </CFormGroup>
                      </CCol>
                    </div>
                    <div className="ml-auto">
                      <CButton
                        color="success"
                        className="px-4"
                        onClick={() => {
                          search();
                        }}>
                        Search
                      </CButton>
                    </div>
                  </div>
                </CCardBody>
                {/* <CCardFooter>
                  <CRow className="text-justify">
                    <CCol sm="12">{JSON.stringify(pagingPayload)}</CCol>
                  </CRow>
                </CCardFooter> */}
              </CCard>
            </CCol>
          </CRow>

          <CDataTable
            items={reduxData}
            fields={fields}
            hover
            striped
            border
            size="sm"
            // itemsPerPage={20}
            // pagination
            scopedSlots={{
              checkbox: (item: any) => (
                <td style={{ position: 'relative' }}>
                  <CLabel
                    className="pointer"
                    htmlFor={`item-${item.id}`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                    }}
                  />
                  <CFormGroup variant="checkbox" className="checkbox">
                    <CInputCheckbox
                      id={`item-${item.id}`}
                      name="checkbox2"
                      value="option2"
                      className="checkbox-lg"
                      onChange={(e) => {
                        onCheckBoxClick(item.id, e);
                      }}
                    />
                  </CFormGroup>
                </td>
              ),
              detail: (item: any) => {
                return (
                  <td>
                    <CButton
                      color="success"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => popUpDetails(item.id)}>
                      <CIcon name="cil-file" />
                    </CButton>
                  </td>
                );
              },
              item: (item: any) => {
                return (
                  <td>
                    <ul>
                      {item.order_details.map((item_detail: any, idx: number) => {
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
              remarks: (item: any) => {
                return (
                  <td>
                    {item.remarks}
                    <CButton
                      color="success"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => editRemarks(item)}>
                      <CIcon name="cil-file" />
                    </CButton>
                  </td>
                );
              },
            }}
          />
          <CPagination
            activePage={pagingPayload?.current_page}
            pages={pagingPayload?.last_page}
            onActivePageChange={(i: any) => setActivePage(i)}
          />
        </CCardBody>
      </CCard>
      <CModal show={detailVisible} onClose={() => setDetailVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="city" className={'font-weight-bold'}>
                  Order Id
                </CLabel>
                <br />
                {orderDetail?.id}
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="state" className={'font-weight-bold'}>
                  Store
                </CLabel>
                <br />
                {orderDetail?.store_name}
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="city" className={'font-weight-bold'}>
                  Delivery Date
                </CLabel>
                <br />
                {orderDetail?.delivery_date}
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="state" className={'font-weight-bold'}>
                  Submitted Date
                </CLabel>
                <br />
                {orderDetail?.order_date}
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="city" className={'font-weight-bold'}>
                  Customer
                </CLabel>
                <br />
                {orderDetail?.customer_name}
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="state" className={'font-weight-bold'}>
                  Recipient
                </CLabel>
                <br />
                {orderDetail?.recipient_name}
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="address-1" className={'font-weight-bold'}>
              Customer Address
            </CLabel>
            <br />
            {[
              orderDetail?.delivery_address_1,
              orderDetail?.delivery_postal,
              orderDetail?.delivery_state,
              orderDetail?.delivery_city,
              orderDetail?.delivery_country,
            ]
              .filter(Boolean)
              .join(', ')}
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="address-remark" className={'font-weight-bold'}>
              Customer Address Remark
            </CLabel>
            <br />
            {orderDetail?.delivery_remark || '-'}
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="customer-remarks" className={'font-weight-bold'}>
              Customer Remarks
            </CLabel>
            <br />
            {orderDetail?.order_remarks}
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="customer-contact" className={'font-weight-bold'}>
              Customer Contact
            </CLabel>
            <br />
            {orderDetail?.customer_phone_number}
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="recipeint-contact" className={'font-weight-bold'}>
              Recipient Contact
            </CLabel>
            <br />
            {orderDetail?.recipient_phone_number}
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="payment" className={'font-weight-bold'}>
              Payment
            </CLabel>
            <br />-
          </CFormGroup>
          <CFormGroup>
            <CDataTable
              items={orderDetail?.order_details}
              fields={detailfields}
              hover
              striped
              border
              size="sm"
              itemsPerPage={20}
              // pagination
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel htmlFor="delivery-charge" className={'font-weight-bold'}>
              Delivery Charge
            </CLabel>
            -{orderDetail?.delivery_charge} <br />
            <CLabel htmlFor="discount-amount" className={'font-weight-bold'}>
              Discount Amount
            </CLabel>
            -{orderDetail?.discount_amount} <br />
            <CLabel htmlFor="total-amount" className={'font-weight-bold'}>
              Total Amount
            </CLabel>
            -{orderDetail?.total_amount} <br />
            <CLabel htmlFor="receipt" className={'font-weight-bold'}>
              Printed Receipt Id
            </CLabel>
            <br />
            {orderDetail?.printed_receipt_id} <br />
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() =>
              history.push({
                pathname: '/order/add',
                search: '?id=' + orderDetail.id + '&update_ids=' + updateState.ids,
              })
            }>
            Edit
          </CButton>
          <CButton color="secondary" onClick={() => setDetailVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={copyPasteModelVisible} onClose={() => setCopyPasteModelVisible(false)}>
        <CModalHeader>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to copy this order?</CModalBody>
        <CCol>
          <CFormGroup row>
            <CCol xs="12" md="9">
              <CLabel htmlFor="date-input">Delivery Date</CLabel>
              {/* <CInput
                type="date"
                id="delivery_date"
                name="delivery_date"
                placeholder="delivery_date"
                defaultValue={getTodayDateISOFormat()}
                onChange={handleUpdateChange}
                disabled={false}
              /> */}
              {dateListState.dateList.map((dateObject: any, index: number) => (
                // <CLabel>{idx}</CLabel>
                <CInput
                  type="date"
                  id="delivery_date"
                  name="delivery_date"
                  placeholder="delivery_date"
                  defaultValue={dateObject}
                  onChange={handleDateArrayUpdateChange(index)}
                  // onChange={handleDogFoodChange(index)}
                  disabled={false}
                  style={{ margin: 10 }}
                />
              ))}
            </CCol>
          </CFormGroup>
        </CCol>
        <CModalFooter>
          <CButton color="success" onClick={() => addDateArray()}>
            +
          </CButton>
          <CButton color="warning" onClick={() => reduceDateArray()}>
            -
          </CButton>
          <CButton color="secondary" onClick={() => clickConfirmCopyPaste()}>
            Confirm
          </CButton>
          <CButton color="secondary" onClick={() => setCopyPasteModelVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal show={editRemarksModelVisible} onClose={() => setEditRemarksModelVisible(false)}>
        <CModalHeader>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>Edit the remarks</CModalBody>
        <CCol>
          <CFormGroup row>
            <CCol xs="12" md="9">
              {/* <CLabel htmlFor="date-input">Delivery Date</CLabel> */}
              <CInput
                type="text"
                id="remarks"
                name="remarks"
                placeholder="remarks"
                value={editRemarksState?.remarks}
                onChange={handleUpdateRemarksChange}
                disabled={false}
              />
            </CCol>
          </CFormGroup>
        </CCol>
        <CModalFooter>
          <CButton color="secondary" onClick={() => clickConfirmEditRemarks()}>
            Confirm
          </CButton>
          <CButton color="secondary" onClick={() => setEditRemarksModelVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* <CButton onClick={() => setVisible(!visible)}>
        Launch demo modal
      </CButton> */}
      <CFooter
        style={{ zIndex: 4, height: 'auto', overflowX: 'auto' }}
        fixed
        color="light"
        className="d-flex flex-row px-0 py-1">
        <div>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id="selectAll"
              name="selectAll"
              value="selectAll"
              onChange={(e) => {
                onCheckBoxSelectAllClick(e);
              }}
            />
            <CLabel className={'font-weight-bold pointer'} htmlFor="selectAll">
              Total Results: {!!updateState?.ids.length && `${updateState?.ids.length}/`}
              {pagingPayload?.records_total}
            </CLabel>
          </CFormGroup>
        </div>

        <div
          className="d-flex flex-row w-100 justify-content-between"
          style={{ overflowX: 'auto' }}>
          <CButton
            className="mx-1 p-sm-2 p-md-3"
            color="info"
            size="sm"
            onClick={() => {
              updateStatus('0');
            }}>
            Pending
          </CButton>
          <CButton
            className="mx-1 p-sm-2 p-md-3"
            color="primary"
            size="sm"
            onClick={() => {
              updateStatus('1');
            }}>
            Confirm
          </CButton>
          <CButton
            className="mx-1 p-sm-2 p-md-3"
            color="danger"
            size="sm"
            onClick={() => {
              updateStatus('2');
            }}>
            Void
          </CButton>
          <CButton
            className="mx-1 p-sm-2 p-md-3"
            color="success"
            size="sm"
            onClick={() => {
              updatePaymentStatus('1');
            }}>
            Paid
          </CButton>
          <CButton
            className="mx-1 p-sm-2 p-md-3"
            color="dark"
            size="sm"
            onClick={() => {
              updatePaymentStatus('0');
            }}>
            Unpaid
          </CButton>

          <Divider vertical />

          <CButton
            className="mx-1 p-sm-2 p-md-3 btn-facebook"
            color="dark"
            size="sm"
            onClick={() => {
              setCopyPasteModelVisible(true);
            }}>
            Copy Order
          </CButton>
          <CButton
            className="mx-1 p-sm-2 p-md-3 btn-facebook"
            color="dark"
            size="sm"
            onClick={() => {
              clickPrintReceipt();
            }}>
            Print Receipt
          </CButton>
          <CButton
            className="mx-1 p-sm-2 p-md-3 btn-facebook"
            color="dark"
            size="sm"
            onClick={() => {
              downloadItemBasedOnId();
            }}>
            Export Selected Items
          </CButton>
        </div>
      </CFooter>
    </>
  );
};

export default OrderGeneral;
