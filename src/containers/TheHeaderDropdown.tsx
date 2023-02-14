import { useDispatch } from 'react-redux';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { submitLogout } from 'src/modules/auth/redux/authSlice';
import { logo } from 'src/assets/images';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(submitLogout());
    // eslint-disable-next-line
    location.reload();
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={logo} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider /> */}
        <CDropdownItem onClick={logoutHandler}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
