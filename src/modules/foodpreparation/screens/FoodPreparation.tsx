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
  downloadFoodPreparationDataList,
  resetFoodPreparationListPayload,
  getFoodPreparationDataDetailsList,
} from '../redux/foodPreparationSlice';
import CIcon from '@coreui/icons-react';

const FoodPreparation = () => {
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
      key: 'delivery_date',
      label: 'Delivery Date',
    },
    {
      key: 'item_name',
      label: 'Item Name',
    },
    {
      key: 'quantity',
      label: 'Quantity',
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
      key: 'order_id',
      label: 'Order Id',
    },
    {
      key: 'customer_name',
      label: 'Customer Name',
    },
    {
      key: 'item_description',
      label: 'Item Description',
    },
    {
      key: 'item_quantity',
      label: 'Item Quantity',
    },
    {
      key: 'address',
      label: 'Delivery Address',
    },
  ];

  const {
    reduxData = [],
    auth,
    menus,
    itemDetail = [],
  } = useSelector((state: any) => {
    return {
      reduxData: state.foodpreparation.foodPreparationListPayload?.data,
      auth: state.auth,
      menus: state.foodpreparation.menuListPayload?.data,
      itemDetail: state.foodpreparation.foodPreparationDetailsPayload?.data,
    };
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDateSearchState({ ...dateSearchState, [name]: value });
  };

  const search = () => {
    dispatch(getReduxDataList(auth, dateSearchState, menuSelectState));
  };

  const download = () => {
    downloadFoodPreparationDataList(auth, dateSearchState, menuSelectState);
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

  const viewOrderPreparationDetail = (
    item_id: any,
    variant_id: any,
    slot_id: any,
    delivery_date: any,
  ) => {
    dispatch(getFoodPreparationDataDetailsList(auth, item_id, variant_id, slot_id, delivery_date));
    setDetailVisible(true);
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <div className="d-flex pb-3 align-items-center">
                <h5>Food Preparation</h5>
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
                // itemsPerPage={10}
                // pagination
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
                            item.item_id,
                            item.variant_id === undefined ? '' : item.variant_id,
                            item.slot_id,
                            item.delivery_date,
                          );
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
                    List of Item Result : {reduxData?.length}
                  </CLabel>
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CModal size="lg" show={detailVisible} onClose={() => setDetailVisible(false)}>
        <CModalHeader>
          <CModalTitle>Detail</CModalTitle>
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
            />
          </CFormGroup>
        </CModalBody>
      </CModal>
    </>
  );
};

export default FoodPreparation;
