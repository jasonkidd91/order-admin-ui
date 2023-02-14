import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalToast } from 'src/redux/slice';
import { useParams } from 'react-router-dom';
import {
  clearMenuDetailState,
  getMenuDetail,
  getMenuItemList,
} from '../redux/menuMaintenanceSlice';
import MultiLevelMenuListing from '../components/MultiLevelMenuListing';
import MultiLevelMenuDetail from '../components/MultiLevelMenuDetail';
import { RootDispatch, RootState } from 'src/redux/types';

const MenuMaintenanceDetail = () => {
  const { id } = useParams<any>();
  const dispatch = useDispatch<RootDispatch>();

  const [authState, menuMaintState] = useSelector(
    (state: RootState) => [state.auth, state.menuMaintenance] as const,
  );

  const { editMenuDetailFormState } = menuMaintState;

  const init = () => {
    // initialize effect
    try {
      [getMenuDetail(authState, id), getMenuItemList(authState, id)].flatMap((action) =>
        dispatch(action),
      );
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();

    return () => {
      dispatch(clearMenuDetailState());
    };
  }, []);

  return (
    <>
      <div
        className="d-flex flex-sm-row justify-content-between"
        style={{ height: 'calc(100vh - 160px)', minHeight: '350px' }}>
        <MultiLevelMenuListing containerClass="h-100 w-100 mr-2" />
        {!!editMenuDetailFormState && <MultiLevelMenuDetail containerClass="h-100 w-100 ml-2" />}
      </div>
    </>
  );
};

export default MenuMaintenanceDetail;
