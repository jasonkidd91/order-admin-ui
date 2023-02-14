import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CToggler, CHeaderBrand, CHeaderNav, CHeaderNavItem } from '@coreui/react';
import { setSidebarVisible } from 'src/redux/slice';
import { TheHeaderDropdown } from './index';
import { logo } from '../assets/images';

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state: any) => state.app.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch(setSidebarVisible(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch(setSidebarVisible(val));
  };

  return (
    <>
      <CHeader>
        <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
        <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
        <CHeaderBrand className="mr-auto d-lg-none" to="/">
          <img alt="logo" src={logo} height={50} />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            {/* <CHeaderNavLink to="/">Menu</CHeaderNavLink> */}
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          {/* <TheHeaderDropdownNotif /> */}
          <TheHeaderDropdown />
        </CHeaderNav>
      </CHeader>
    </>
  );
};

export default TheHeader;
