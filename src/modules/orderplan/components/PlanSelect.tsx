import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { setCurrentStep, setSelectedPlan } from '../redux/planSlice';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { globalToast } from 'src/redux/slice';
import { formatPrice, getItemDescription, getItemUnitPrice } from 'src/helpers';

const PlanSelect = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [accordion, setAccordion] = React.useState(null);
  const [planState] = useSelector((state: any) => [state.plan] as const);
  const { currentStep, planList } = planState;

  const planSelectHandler = (plan: any) => {
    try {
      dispatch(setSelectedPlan(plan));
      dispatch(setCurrentStep(currentStep + 1));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  const PlanActionButton = (props: any) => {
    const { item, idx = 0 } = props;
    return (
      <CListGroupItem
        href="#"
        onClick={() => planSelectHandler(item)}
        color={idx % 2 !== 0 ? 'success' : ''}>
        <div className="d-flex">
          <span className="font-weight-bold">{getItemDescription(item)}</span>
          <div className="ml-auto align-self-center">
            <div className="d-flex align-items-center">
              <small className="pr-2 font-weight-bold">{formatPrice(getItemUnitPrice(item))}</small>
              <CIcon name="cil-chevron-right"></CIcon>
            </div>
          </div>
        </div>
      </CListGroupItem>
    );
  };

  return (
    <CCard>
      <CCardHeader>
        <strong>Choose a Plan</strong>
      </CCardHeader>
      <CCardBody>
        {planList && planList.length ? (
          <CListGroup>
            {planList.map((category: any) => (
              <div key={category.id} className="mb-3 shadow-sm">
                <CListGroupItem
                  className="p-0 shadow-sm text-uppercase justify-content-between font-weight-bold"
                  color="info">
                  <CButton
                    block
                    className="text-left m-0 p-3"
                    onClick={() => setAccordion(category.id === accordion ? null : category.id)}>
                    <div className="d-flex align-self-center">
                      <h5 className="m-0">
                        <CIcon name="cil-layers"></CIcon> {category.name}
                      </h5>
                      <div className="ml-auto">
                        <CIcon
                          name={`cil-chevron-${category.id === accordion ? 'bottom' : 'top'}`}
                          size="lg"
                        />
                      </div>
                    </div>
                  </CButton>
                </CListGroupItem>
                <CCollapse show={category.id === accordion}>
                  {category.items.map((item: any, idx: number) => (
                    <React.Fragment key={item.id}>
                      {item.variants.length <= 0 ? (
                        <PlanActionButton item={item} idx={idx} />
                      ) : (
                        item.variants.map((variant: any) => (
                          <PlanActionButton
                            key={variant.id}
                            item={{ ...item, variant }}
                            idx={idx}
                          />
                        ))
                      )}
                    </React.Fragment>
                  ))}
                </CCollapse>
              </div>
            ))}
          </CListGroup>
        ) : (
          <div>Plan has not been configured yet.</div>
        )}
      </CCardBody>
    </CCard>
  );
};

export default React.memo(PlanSelect);
