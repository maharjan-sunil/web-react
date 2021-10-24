/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ChangePassword from 'components/Page/ChangePassword';
import {
  Img,
  DropdownToggle,
  DropdownItem,
  Collapse,
  NavbarToggler,
} from '@bootstrap-styled/v4';
import { Question, Cog } from '@styled-icons/fa-solid';
import { Bell } from '@styled-icons/fa-regular/Bell';

import { Link } from 'react-router-dom';
import auth from 'helpers/auth';
import {
  StyledNavbar,
  StyleNavbarBrand,
  MainNav,
  MainNavIcon,
  StyledNavItem,
  StyledNavDropdown,
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledNavDropdownIcon,
  StyledNavItemIcon,
} from './StyledNavbar';

import WallbeeLogo from './WallbeeLogo.png';
import messages from './messages';

function Navbar() {
  const [{ isExpand }, setState] = useState({ isExpand: false });
  const [{ isShowDialog }, setChangePasswordState] = useState({
    isShowDialog: false,
  });

  const onCloseHandler = () => {
    setChangePasswordState({
      isShowDialog: !isShowDialog,
    });
  };
  const onSubmitHandler = () => {
    setChangePasswordState({
      isShowDialog: !isShowDialog,
    });
  };
  return (
    <React.Fragment>
      <StyledNavbar toggleable="lg">
        <StyleNavbarBrand>
          <Img src={WallbeeLogo} alt="Wallbee Logo" />
        </StyleNavbarBrand>
        <NavbarToggler onClick={() => setState({ isExpand: !isExpand })} />
        <Collapse navbar isOpen={isExpand}>
          <MainNavBar />
        </Collapse>
        <MainIconNavBar
          changePasswordHandler={() =>
            setChangePasswordState({ isShowDialog: !isShowDialog })
          }
        />
      </StyledNavbar>
      <ChangePassword
        isShowDialog={isShowDialog}
        onCloseHandler={onCloseHandler}
        onSubmitHandler={onSubmitHandler}
      />
    </React.Fragment>
  );
}

function MainNavBar() {
  return (
    <MainNav navbar className="mr-auto">
      <NavBarLink to="/">
        <FormattedMessage {...messages.home} />
      </NavBarLink>
      <NavBarLink to="/shipment-logs">
        <FormattedMessage {...messages.shipmentlog} />
      </NavBarLink>

      <NavBarLink to="/sites">
        <FormattedMessage {...messages.site} />
      </NavBarLink>

      <NavBarLink to="/site-accounts">
        <FormattedMessage {...messages.siteaccount} />
      </NavBarLink>

      <NavBarLink to="/emails">
        <FormattedMessage {...messages.email} />
      </NavBarLink>

      <NavBarLink to="/invoices">
        <FormattedMessage {...messages.invoice} />
      </NavBarLink>

      <NavBarLink to="/ftp-files">
        <FormattedMessage {...messages.ftpfile} />
      </NavBarLink>
      <FPDropdownNav />
    </MainNav>
  );
}
function NavBarLink(props) {
  const url = window.location.pathname;
  const last = url.substring(url.lastIndexOf('/') + 1);
  const urlModels = window.location.pathname.split('/');
  let modelName = '';
  if (props.to === window.location.pathname) {
    modelName = props.to;
  } else if (props.to !== window.location.pathname) {
    if (urlModels.length > 2) {
      modelName = `${props.to}/${last}`;
    }
    if (urlModels.length > 3) {
      modelName = `${props.to}/${urlModels[2]}/${last}`;
    }
  }
  return (
    <StyledNavItem
      as={Link}
      {...props}
      className={window.location.pathname === modelName && 'active'}
    />
  );
}
function FPDropdownNav() {
  const [{ isShowDropdown }, setState] = useState({ isShowDropdown: false });
  const [{ isActive }, setOpen] = useState({ isActive: false });
  const url = window.location.pathname;
  const last = url.substring(url.lastIndexOf('/') + 1);
  const urlModels = window.location.pathname.split('/');
  React.useEffect(() => {
    if (window.location.pathname === '/scans') {
      setOpen({
        isActive: true,
      });
    } else if (window.location.pathname === '/data-connections') {
      setOpen({
        isActive: true,
      });
    } else if (urlModels.length > 2) {
      if (window.location.pathname === `${'/scans'}/${last}`) {
        setOpen({
          isActive: true,
        });
      }
      if (window.location.pathname === `${'/data-connections'}/${last}`) {
        setOpen({
          isActive: true,
        });
      }
      if (
        window.location.pathname ===
        `${'/data-connections'}/${urlModels[2]}/${last}`
      ) {
        setOpen({
          isActive: true,
        });
      }
    } else if (window.location.pathname === '/not-mapped') {
      setOpen({
        isActive: true,
      });
    } else if (window.location.pathname === '/file-info') {
      setOpen({
        isActive: true,
      });
    } else if (window.location.pathname === '/file-errors') {
      setOpen({
        isActive: true,
      });
    } else
      setOpen({
        isActive: false,
      });
  }, []);
  return (
    <StyledNavDropdown
      isOpen={isShowDropdown}
      toggle={() => setState({ isShowDropdown: !isShowDropdown })}
      className={`${isActive && 'active'}`}
    >
      <DropdownToggle nav caret>
        File Processor
      </DropdownToggle>
      <StyledDropdownMenu>
        <SubMenuLink to="/file-info">File Information</SubMenuLink>
        <SubMenuLink to="/file-errors">File Error Log</SubMenuLink>
        <SubMenuLink to="/scans">Scan</SubMenuLink>
        <SubMenuLink to="/data-connections">Data Connection</SubMenuLink>
        <SubMenuLink to="/not-mapped">Not Mapped</SubMenuLink>
      </StyledDropdownMenu>
    </StyledNavDropdown>
  );
}

function SubMenuLink(props) {
  let modelName = '';
  const url = window.location.pathname;
  const last = url.substring(url.lastIndexOf('/') + 1);
  const urlModels = window.location.pathname.split('/');
  if (props.to === window.location.pathname) {
    modelName = props.to;
  } else if (
    window.location.pathname === `${props.to}/${urlModels[2]}/${last}`
  ) {
    modelName = `${props.to}/${urlModels[2]}/${last}`;
  } else if (props.to === '/scans') {
    modelName = `${props.to}/${last}`;
  } else if (props.to === '/data-connections') {
    modelName = `${props.to}/${last}`;
  }
  return (
    <StyledDropdownItem
      as={Link}
      {...props}
      className={`${window.location.pathname === modelName && 'active'}`}
    />
  );
}
function MainIconNavBar(props) {
  return (
    <MainNavIcon>
      <StyledNavItemIcon title="Help">
        <Question size="12" />
      </StyledNavItemIcon>
      <StyledNavItemIcon title="Notifications">
        <Bell size="12" />
      </StyledNavItemIcon>
      <SettingIconNavBar />
      <UserIconNavBar changePasswordHandler={props.changePasswordHandler} />
    </MainNavIcon>
  );
}

function SettingIconNavBar() {
  const [{ isShowDropdown }, setState] = useState({ isShowDropdown: false });
  return (
    <StyledNavDropdownIcon
      isOpen={isShowDropdown}
      toggle={() => setState({ isShowDropdown: !isShowDropdown })}
    >
      <DropdownToggle nav title="Setting">
        <Cog size="12" />
      </DropdownToggle>
      <StyledDropdownMenu className="dropdown-menu-right">
        <StyledDropdownItem as={Link} to="/users">
          User
        </StyledDropdownItem>
      </StyledDropdownMenu>
    </StyledNavDropdownIcon>
  );
}
function UserIconNavBar(props) {
  const [{ isShowDropdown }, setState] = useState({ isShowDropdown: false });
  return (
    <StyledNavDropdownIcon
      isOpen={isShowDropdown}
      toggle={() => setState({ isShowDropdown: !isShowDropdown })}
    >
      <DropdownToggle nav title={localStorage.getItem('userName')}>
        <Img
          alt={localStorage.getItem('userName')}
          src={`data:image/jpeg;base64,${localStorage.getItem('userImage')}`}
        />
        {/* <User size="12" /> */}
      </DropdownToggle>
      <StyledDropdownMenu className="dropdown-menu-right">
        <StyledDropdownItem as={Link} to="/profile">
          My Profile
        </StyledDropdownItem>
        <StyledDropdownItem
          as={Link}
          to="#"
          onClick={props.changePasswordHandler}
        >
          Change Password
        </StyledDropdownItem>
        <DropdownItem divider />
        <StyledDropdownItem as={Link} to="/login" onClick={() => auth.logout()}>
          Logout
        </StyledDropdownItem>
      </StyledDropdownMenu>
    </StyledNavDropdownIcon>
  );
}

export default Navbar;
