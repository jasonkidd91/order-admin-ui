import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { globalToast } from 'src/redux/slice';
import {
  resetPlanState,
  setCurrentStep,
  setSelectedMenu,
  getBlockOffDateList,
  getMenuList,
  setOrderDetail,
  initialState,
  setCartList,
  getMenuPlans,
  getMenuStores,
  setSelectedStore,
  setSelectedPlan,
  getPlanItemList,
  getStoreSlots,
} from '../redux/planSlice';
import { Stepper, Step } from 'react-form-stepper';
import OrderContainer from 'src/components/OrderContainer';
import PlanSelect from '../components/PlanSelect';
import ItemSelect from '../components/ItemSelect';
import CheckoutDetail from '../components/CheckoutDetail';
import CalendarSelect from '../components/CalendarSelect';

const AddPlan = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [auth, planState] = useSelector((state: any) => [state.auth, state.plan] as const);
  const { currentStep, selectedMenu, availableMenus } = planState;

  const init = () => {
    // initialize effect
    // - reset state
    // - get menu list
    // - get blockoff date list
    try {
      dispatch(resetPlanState());
      dispatch(getMenuList(auth));
      dispatch(getBlockOffDateList(auth));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  const switchMenuHandler = (ev: any) => {
    const { value } = ev.target;
    const menu = availableMenus.find((m: any) => m.id === Number(value));

    if (!menu) {
      dispatch(globalToast('error', 'Not a valid menu'));
      return;
    }

    if (menu !== selectedMenu) {
      try {
        dispatch(setSelectedMenu(menu));
        dispatch(getMenuPlans(auth, menu.id));
        dispatch(getPlanItemList(auth, menu.id));
        dispatch(getMenuStores(auth, menu.id)).then((res: any) => {
          if (res && res.length > 0) {
            dispatch(setSelectedStore(res[0])); // default select first store
            dispatch(getStoreSlots(auth, res[0].id)); // get store's slot
          }
        });
        // reset
        dispatch(setSelectedPlan(null));
        dispatch(setCartList([]));
        dispatch(setOrderDetail({ ...initialState.orderDetail }));
        dispatch(setCurrentStep(0));
      } catch (err: any) {
        dispatch(globalToast('error', err?.message));
      }
    }
  };

  const renderStepScreen = (): JSX.Element => {
    if (currentStep === 1) return <ItemSelect />;
    if (currentStep === 2) return <CheckoutDetail />;
    if (currentStep === 3) return <CalendarSelect />;
    if (currentStep === 4) return <>Complete Order</>;
    return <PlanSelect />;
  };

  return (
    <>
      <OrderContainer
        type="radio"
        menus={availableMenus}
        selectedMenu={selectedMenu?.id}
        handleMenuChange={switchMenuHandler}
        resetHandler={() => init()}>
        {!!selectedMenu && (
          <div>
            <Stepper connectorStateColors activeStep={currentStep}>
              <Step label="Select Plan" onClick={() => dispatch(setCurrentStep(0))} />
              <Step label="Select Item" onClick={() => dispatch(setCurrentStep(1))} />
              <Step label="Order Details" onClick={() => dispatch(setCurrentStep(2))} />
              <Step label="Choose Date" onClick={() => dispatch(setCurrentStep(3))} />
              <Step label="Completed" onClick={() => dispatch(setCurrentStep(4))} />
            </Stepper>

            {renderStepScreen()}
          </div>
        )}
      </OrderContainer>
    </>
  );
};

export default AddPlan;
