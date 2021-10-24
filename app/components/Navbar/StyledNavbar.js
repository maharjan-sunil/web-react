import styled from 'styled-components';
import { Img, Nav, DropdownMenu, NavbarBrand } from '@bootstrap-styled/v4';
import Navbar from '@bootstrap-styled/v4/lib/Navbar';
import NavItem from '@bootstrap-styled/v4/lib/Nav/NavItem';
import NavDropdown from '@bootstrap-styled/v4/lib/Navbar/NavDropdown';
import DropdownItem from '@bootstrap-styled/v4/lib/Dropdown/DropdownItem';

const props = {
  logoheight: 40,
  navbarpadding: 10,
  navbg: '#fff',
  basecolor: '#1b5192',
  darkcolor: '#343a40',
};

export const StyledNavbar = styled(Navbar)`
  background: ${props.navbg};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0 !important;
  z-index: 99;
  a.nav-link {
    padding: 0 !important;
  }
`;

export const StyleNavbarBrand = styled(NavbarBrand)`
  padding: 0 15px !important;
  ${Img} {
    height: ${props.logoheight}px;
    margin-top: ${props.navbarpadding}px;
    margin-bottom: ${props.navbarpadding}px;
  }
`;

export const MainNav = styled(Nav)`
  list-style: none;
  margin: 0 0 0 30px;
  padding: 0;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const StyledNavItem = styled(NavItem)`
  display: inline-block;
  float: left;
  position: relative;
  height: ${props.logoheight + props.navbarpadding * 2}px;
  line-height: ${props.logoheight + props.navbarpadding * 2}px;
  padding: 0 20px;
  text-decoration: none;
  &:hover {
    position: relative;
    &:after {
      content: '';
      height: 4px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: ${props.basecolor};
    }
  }
  &.active {
    position: relative;
    &:after {
      content: '';
      height: 4px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: ${props.basecolor};
    }
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  display: inline-block;
  float: left;
  position: relative;
  height: ${props.logoheight + props.navbarpadding * 2}px;
  line-height: ${props.logoheight + props.navbarpadding * 2}px;
  padding: 0 20px;
  text-decoration: none;
  a.nav-link {
    color: ${props.basecolor} !important;
  }
  &:hover {
    position: relative;
    &:after {
      content: '';
      height: 4px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: ${props.basecolor};
    }
  }
  &.active {
    position: relative;
    &:after {
      content: '';
      height: 4px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: ${props.basecolor};
    }
  }
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
  width: 150px !important;
  background: ${props.navbg} !important;
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StyledDropdownItem = styled(DropdownItem)`
  font-size: 1rem;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 0px 15px;
  text-decoration: none;
  color: ${props.basecolor};
  &:hover {
    background: ${props.basecolor};
    color: #fff;
  }
  &.active {
    background: ${props.basecolor};
    color: #fff;
    }
  }
`;

export const StyledNavDropdownIcon = styled(NavDropdown)`
  display: inline-block;
  text-align: center;
  background: ${props.basecolor};
  border-radius: 30px;
  margin-right: 6px;
  cursor: pointer;
  a.nav-link {
    display: inline-block;
    height: 30px;
    width: 30px;
    line-height: 27px;
    padding: 0px !important;
    color: #fff !important;
  }
  &:hover {
    background: ${props.darkcolor};
    color: #fff;
  }
  img {
    border-radius: 30px;
    height: 32px;
    width: 32px;
  }
`;

export const StyledNavItemIcon = styled(NavItem)`
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 29px;
  text-align: center;
  background: ${props.basecolor};
  color: #fff;
  border-radius: 30px;
  margin-right: 6px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background: ${props.darkcolor};
    color: #fff;
  }
`;

export const MainNavIcon = styled(Nav)`
  margin-top: 5px !important;
  a.nav-link {
    //line-height: 29px !important;
  }
`;
