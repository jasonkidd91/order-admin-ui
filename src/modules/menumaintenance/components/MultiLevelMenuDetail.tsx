import { CButton, CCard, CCardBody, CCardFooter } from '@coreui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalToast } from 'src/redux/slice';
import { RootDispatch, RootState } from 'src/redux/types';
import { MenuItemType } from '../constants';
import { upsertCategory, upsertItem, upsertVariant } from '../redux/menuMaintenanceSlice';
import ItemForm from './ItemForm';

interface Props {
  containerClass?: string;
}

const MultiLevelMenuDetail = (props: Props) => {
  const { containerClass } = props;
  const dispatch = useDispatch<RootDispatch>();
  const [authState, menuMaintState] = useSelector(
    (state: RootState) => [state.auth, state.menuMaintenance] as const,
  );

  const { editMenuDetailFormState } = menuMaintState;

  const saveDetailHandler = async () => {
    try {
      switch (editMenuDetailFormState?.type) {
        case MenuItemType.CATEGORY:
          await upsertCategory(authState, editMenuDetailFormState);
          break;
        case MenuItemType.ITEM:
          await upsertItem(authState, editMenuDetailFormState);
          break;
        case MenuItemType.VARIANT:
          await upsertVariant(authState, editMenuDetailFormState);
          break;
        default:
          return;
      }

      dispatch(globalToast('success', `${editMenuDetailFormState?.type} Updated`));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  return (
    <React.Fragment>
      <CCard className={containerClass}>
        <CCardBody style={{ overflow: 'auto' }}>
          <ItemForm inputFormState={editMenuDetailFormState} />
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" color="danger" block onClick={saveDetailHandler}>
            Save
          </CButton>
        </CCardFooter>
      </CCard>
    </React.Fragment>
  );
};

export default React.memo(MultiLevelMenuDetail);
