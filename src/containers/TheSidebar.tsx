import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';
// sidebar nav config
import navigation from './Navigator';
import { setSidebarVisible } from 'src/redux/slice';
import AppConfig from 'src/AppConfig';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.app.sidebarShow);

  return (
    <CSidebar show={show} onShowChange={(val: any) => dispatch(setSidebarVisible(val))}>
      <CSidebarBrand className="d-md-down-none h5 logo-link" to="/">
        <img alt="logo" src={AppConfig.logo} height={35} />
        <span className="c-sidebar-brand-full">&nbsp;&nbsp;{AppConfig.name}</span>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <div className="text-secondary text-center c-sidebar-brand-full">{AppConfig.version}</div>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
