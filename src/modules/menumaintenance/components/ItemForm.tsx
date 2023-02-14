import { CCol, CContainer, CFormGroup, CInput, CInputCheckbox, CLabel } from '@coreui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from 'src/redux/types';
import { MenuItemType } from '../constants';
import { setMenuDetailFormState } from '../redux/menuMaintenanceSlice';
import { MenuDetailFormState } from '../redux/types';

interface Props {
  inputFormState?: Partial<MenuDetailFormState>;
}

enum ScreenState {
  NEW,
  EDIT,
}

const ItemForm = (props: Props) => {
  const { inputFormState } = props;
  const dispatch = useDispatch<RootDispatch>();

  const [formState, setFormState] = React.useState<Partial<MenuDetailFormState>>();

  React.useEffect(() => {
    if (inputFormState) {
      setFormState({ ...inputFormState });
    }
  }, [inputFormState]);

  const screenState = formState?.id ? ScreenState.EDIT : ScreenState.NEW;

  const isItem = formState?.type === MenuItemType.ITEM;
  const isVariant = formState?.type === MenuItemType.VARIANT;
  const isItemOrVariant = isItem || isVariant;

  const onFormStateChange = (event: any) => {
    const { name, value } = event.target;

    dispatch(
      setMenuDetailFormState({
        ...formState,
        [name]: value,
      } as MenuDetailFormState),
    );
  };

  const onCheckboxChange = (event: any) => {
    const { name, checked } = event.target;

    dispatch(
      setMenuDetailFormState({
        ...formState,
        [name]: checked,
      } as MenuDetailFormState),
    );
  };

  return (
    <CContainer className="px-0" style={{ textTransform: 'capitalize' }}>
      {screenState === ScreenState.EDIT && <h5>Edit {formState?.type} Info</h5>}
      <CFormGroup row>
        <CCol xs="12" className="py-2">
          <CLabel htmlFor="name">Name</CLabel>
          <CInput id="name" name="name" value={formState?.name} onChange={onFormStateChange} />
        </CCol>
        {isItemOrVariant && (
          <CCol xs="12" className="py-2">
            <CLabel htmlFor="price">Price (RM)</CLabel>
            <CInput
              id="price"
              name="price"
              type="number"
              value={formState?.price}
              onChange={onFormStateChange}
            />
          </CCol>
        )}
        {isVariant && (
          <CCol xs="12" className="py-2">
            <CLabel htmlFor="days">Plan Day(s)</CLabel>
            <CInput
              id="days"
              type="number"
              name="days"
              value={formState.days}
              onChange={onFormStateChange}
            />
          </CCol>
        )}
      </CFormGroup>

      {isItem && (
        <>
          <hr />
          <h5>Attributes</h5>
          <CFormGroup row>
            <CCol xs="12" className="py-2">
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="isPlan"
                  name="isPlan"
                  checked={formState.isPlan}
                  onChange={onCheckboxChange}
                />
                <CLabel variant="checkbox" className={`form-check-label`} htmlFor={`isPlan`}>
                  Is_Plan
                </CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>
        </>
      )}
    </CContainer>
  );
};

export default React.memo(ItemForm);
