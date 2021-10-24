import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import 'toastr/build/toastr.min.css';

import { HomePageContainer as HomePage } from 'containers/HomePage/Loadable';
import {
  LoginContainer as LoginPage,
  ActivateContainer as Activate,
  ForgotPasswordContainer as ForgotPassword,
} from 'containers/LoginPage/Loadable';
import {
  UsersContainer as Users,
  UserDetailContainer as UserDetail,
  UserSaveContainer as UserSave,
  UserProfileContainer as UserProfile,
} from 'containers/UserPage/Loadable';
import {
  SitesContainer as Sites,
  SiteDetailContainer as SiteDetail,
  SiteSaveContainer as SiteSave,
} from 'containers/SitePage/Loadable';
import {
  SiteAccountsContainer as SiteAccounts,
  SiteAccountDetailContainer as SiteAccountDetail,
  SiteAccountSaveContainer as SiteAccountSave,
} from 'containers/SiteAccountPage/Loadable';
import {
  ScansContainer as Scans,
  ScanDetailContainer as ScanDetail,
} from 'containers/ScanPage/Loadable';
import {
  DataConnectionsContainer as DataConnections,
  ShipmentDetailContainer as ShipmentDetail,
  DataConnectionDetailContainer as DataConnection,
} from 'containers/DataConnectionPage/Loadable';
import {
  ShipmentLogPagesContainer as ShipmentLogs,
  ShipmentLogDetailContainer as ShipmentLogDetail,
  ShipmentLogShipmentContainer as ShipmentLogShipment,
} from 'containers/ShipmentLogPage/Loadable';

import {
  InvoicesContainer as Invoices,
  InvoiceDetailContainer as InvoiceDetail,
} from 'containers/InvoicePage/Loadable';

import {
  EmailsContainer as Emails,
  EmailDetailContainer as EmailDetail,
} from 'containers/EmailPage/Loadable';

import {
  FTPFilePageContainer as FTPFiles,
  FTPFileDetailContainer as FTPFileDetail,
} from 'containers/FTPFilePage/Loadable';
import { NotMappedPageContainer as NotMapped } from 'containers/NotMappedPage/Loadable';
import {
  FileInformationPageContainer as FileInformation,
  FileInformationDetailContainer as FileInformationDetail,
} from 'containers/FileInformationPage/Loadable';

import {
  FileErrorLogPageContainer as FileErrorLog,
  FileErrorLogDetailContainer as FileErrorLogDetail,
} from 'containers/FileErrorLogPage/Loadable';

import Footer from 'components/Footer';
import AuthRoute from 'helpers/AuthRoute';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s - Wallbee" defaultTitle="Wallbee">
        <meta name="description" content="Wallbee" />
      </Helmet>
      <Switch>
        {/* Login Page */}
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/activate" component={Activate} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        {/* Landing Page on Authenticated Access */}
        <AuthRoute exact path="/" component={HomePage} />
        {/* Logs Route */}
        <AuthRoute exact path="/shipment-logs" component={ShipmentLogs} />
        <AuthRoute
          exact
          path="/shipment-logs/:id([0-9]+)"
          component={ShipmentLogDetail}
        />
        <AuthRoute
          exact
          path="/shipment-logs/shipment/:id([0-9]+)"
          component={ShipmentLogShipment}
        />
        {/* Users Route */}
        <AuthRoute exact path="/users" component={Users} />
        <AuthRoute exact path="/users/:id([0-9]+)" component={UserDetail} />
        <AuthRoute exact path="/users/new" component={UserSave} />
        <AuthRoute exact path="/users/edit/:id([0-9]+)" component={UserSave} />
        <AuthRoute exact path="/profile" component={UserProfile} />
        {/* Sites Route */}
        <AuthRoute exact path="/sites" component={Sites} />
        <AuthRoute exact path="/sites/new" component={SiteSave} />
        <AuthRoute exact path="/sites/edit/:siteId" component={SiteSave} />
        <AuthRoute exact path="/sites/:siteId" component={SiteDetail} />
        {/* Site Accounts Route */}
        <AuthRoute exact path="/site-accounts" component={SiteAccounts} />
        <AuthRoute
          exact
          path="/site-accounts/new"
          component={SiteAccountSave}
        />
        <AuthRoute
          exact
          path="/site-accounts/edit/:id([0-9]+)"
          component={SiteAccountSave}
        />
        <AuthRoute
          exact
          path="/site-accounts/:id([0-9]+)"
          component={SiteAccountDetail}
        />
        {/* File Information */}
        <AuthRoute exact path="/file-info" component={FileInformation} />
        <AuthRoute
          exact
          path="/file-info/:id([0-9]+)"
          component={FileInformationDetail}
        />
        {/* File Error Log */}
        <AuthRoute exact path="/file-errors" component={FileErrorLog} />
        <AuthRoute
          exact
          path="/file-errors/:id([0-9]+)"
          component={FileErrorLogDetail}
        />
        {/* Scan Route */}
        <AuthRoute exact path="/scans" component={Scans} />
        <AuthRoute exact path="/scans/:id([0-9]+)" component={ScanDetail} />
        {/* Data Connection Route */}
        <AuthRoute exact path="/data-connections" component={DataConnections} />
        <AuthRoute exact path="/not-mapped" component={NotMapped} />
        <AuthRoute
          exact
          path="/data-connections/shipment/:id([0-9]+)"
          component={ShipmentDetail}
        />
        <AuthRoute
          exact
          path="/data-connections/:id([0-9]+)"
          component={DataConnection}
        />
        {/* Invoice Route */}
        <AuthRoute exact path="/invoices" component={Invoices} />
        <AuthRoute
          exact
          path="/invoices/:id([0-9]+)"
          component={InvoiceDetail}
        />
        {/* Email */}
        <AuthRoute exact path="/emails" component={Emails} />
        <AuthRoute exact path="/emails/:id([0-9]+)" component={EmailDetail} />
        {/* FTP File */}
        <AuthRoute exact path="/ftp-files" component={FTPFiles} />
        <AuthRoute
          exact
          path="/ftp-files/:id([0-9]+)"
          component={FTPFileDetail}
        />
        <Footer />
        <GlobalStyle />
      </Switch>
    </React.Fragment>
  );
}
