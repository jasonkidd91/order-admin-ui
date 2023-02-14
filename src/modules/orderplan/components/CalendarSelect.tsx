import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { CCard, CCardBody, CCol, CRow, CButton, CContainer, CCardFooter } from '@coreui/react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import {
  setCurrentStep,
  getOperationDayList,
  getDeliverableDayList,
  setOrderDetail,
  submitOrder,
} from '../redux/planSlice';
import { currentDate, formatDate } from 'src/helpers/DateHelpers';
import { globalToast } from 'src/redux/slice';
// import $operationDayList from '../mocks/operationDayList';
// import $blockOffDateList from '../mocks/blockOffDateList';

const CalendarSelect = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [delivery_date_list, setDeliveryDateListState] = useState([
    {
      day: '',
      date: formatDate(currentDate(), 'YYYY-MM-DD'),
    },
  ]);

  const [auth, planState] = useSelector((state: any) => [state.auth, state.plan] as const);
  const { currentStep, blockOffDateList } = planState;
  const [operationDayList = [] as any, setOperationDayList] = useState([]);
  // const operation_day = [1, 2, 3, 4, 5];
  // const operation_day_string = $operationDayList;
  // const block_off_date = blockOffDate;
  const { selectedPlan, selectedMenu, selectedStore, cartList, orderDetail } = planState;
  function dayOfWeekAsString(dayIndex: number) {
    return (
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex] || ''
    );
  }

  // setDeliveryDateListState(deliver_date_list);

  const onDateChange = (value: any, index: any) => {
    const exists = delivery_date_list.some(
      (v) => v.date === moment(value).format('YYYY-MM-DD').toString(),
    );
    if (!exists) {
      // 1. Make a shallow copy of the items
      let items = [...delivery_date_list];
      // 2. Make a shallow copy of the item you want to mutate
      let item = { ...items[index] };
      // 3. Replace the property you're intested in
      item.date = moment(value).format('YYYY-MM-DD').toString();
      item.day = dayOfWeekAsString(value.getDay());
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[index] = item;
      // 5. Set the state to our new copy
      setDeliveryDateListState(items);
    } else {
      // eslint-disable-next-line no-alert
      alert('date already selected!');
    }
  };

  const confirmDateHandler = () => {
    dispatch(setCurrentStep(currentStep + 1));
    // dispatch(
    //   setOrderDetail({
    //     deliver_date_list_state,
    //   }),
    // );
    submitOrder(auth, {
      selectPlan: selectedPlan,
      menu: selectedMenu,
      store: selectedStore,
      order_detail: orderDetail,
      items: cartList,
    })
      .then(() => {
        dispatch(globalToast('success', 'Order has been added'));
      })
      .catch((err: any) => dispatch(globalToast('error', err?.message)));
  };

  let highlight = delivery_date_list.length
    ? delivery_date_list.map((date) => new Date(date.date))
    : [];

  React.useEffect(() => {
    if (planState.orderDetail.slot_id) {
      getOperationDayList(auth, planState.orderDetail.slot_id)
        .then((data) => {
          setOperationDayList(data);
        })
        .catch(() => setOperationDayList([]));
    }
  }, [planState.orderDetail.slot_id]);

  React.useEffect(() => {
    dispatch(setOrderDetail({ ...orderDetail, delivery_date_list }));
  }, [delivery_date_list]);

  React.useEffect(() => {
    if (planState.selectedPlan.variant.id) {
      getDeliverableDayList(
        auth,
        planState.orderDetail.delivery_date,
        planState.orderDetail.slot_id,
        planState.selectedPlan.variant.id,
      )
        .then((data) => {
          setDeliveryDateListState(data);
        })
        .catch(() => setDeliveryDateListState([]));
    }
  }, [planState.selectedPlan.variant.id]);

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between pb-4">
      {/* <MenuSection > */}
      <div
        className="pr-2"
        style={{
          flex: '1',
          height: 'calc(100vh - 300px)',
          minHeight: '350px',
        }}>
        <CCard className="h-100" style={{ overflow: 'auto' }}>
          <CCardBody className="h-100">
            <CContainer className="pb-2">
              {delivery_date_list.length ? (
                delivery_date_list.map((deliver_date, index) => (
                  // console.log(deliver_date + " " + index)
                  <CRow className="align-items-center border py-3 mb-3">
                    <CCol>Day {index + 1}</CCol>
                    <CCol>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        readOnly={index === 0}
                        selected={new Date(deliver_date.date)}
                        onChange={(date) => {
                          onDateChange(date, index);
                        }}
                        dayClassName={(date) => {
                          if (!operationDayList.includes(dayOfWeekAsString(date.getDay()))) {
                            return 'highlight';
                          }
                          if (
                            // blockOffDateList.includes(moment(date).format('YYYY-MM-DD').toString())
                            blockOffDateList.find((blockoffdate: any) =>
                              moment(blockoffdate).isSame(date, 'date'),
                            )
                          ) {
                            return 'highlight';
                          }
                          return '';
                        }}
                      />
                    </CCol>
                    <CCol>{deliver_date.day}</CCol>
                  </CRow>
                ))
              ) : (
                <span>0 days selection</span>
              )}
            </CContainer>
          </CCardBody>
        </CCard>
      </div>
      <div
        className="pl-2"
        style={{
          flex: '1',
          height: 'calc(100vh - 300px)',
          minHeight: '350px',
        }}>
        <CCard className="h-100">
          <CCardBody className="h-100">
            <div className="centered">
              <DatePicker
                calendarClassName="disabled"
                selected={null}
                onChange={() => {}}
                highlightDates={highlight}
                dayClassName={(date) => {
                  if (!operationDayList.includes(dayOfWeekAsString(date.getDay()))) {
                    return 'highlight';
                  }
                  if (
                    // blockOffDateList.includes(moment(date).format('YYYY-MM-DD').toString())
                    blockOffDateList.find((blockoffdate: any) =>
                      moment(blockoffdate).isSame(date, 'date'),
                    )
                  ) {
                    return 'highlight';
                  }
                  return '';
                }}
                inline
              />
            </div>
          </CCardBody>
          <CCardFooter>
            <CContainer>
              <CRow>
                <CCol>
                  <CButton color="danger font-weight-bold" block onClick={confirmDateHandler}>
                    Confirm
                  </CButton>
                </CCol>
              </CRow>
            </CContainer>
          </CCardFooter>
        </CCard>
      </div>
    </div>
  );
};

export default React.memo(CalendarSelect);
