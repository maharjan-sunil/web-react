import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectInvoice = state => state.invoicePage || initialState;

const makeSelectInvoices = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.invoices,
  );

const makeSelectInvoice = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.invoice,
  );

const makeSelectResult = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.result,
  );

const makeSelectError = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.error,
  );

const makeSelectLoader = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.loading,
  );

const makeSelectActionLoader = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.actionLoading,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.statusCode,
  );

const makeSelectPage = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.page,
  );

const makeSelectPerPage = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.perPage,
  );

const makeSelectTotal = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.total,
  );

const makeSelectFileContent = () =>
  createSelector(
    selectInvoice,
    invoiceState => invoiceState.fileContent,
  );

export {
  selectInvoice,
  makeSelectInvoices,
  makeSelectInvoice,
  makeSelectResult,
  makeSelectError,
  makeSelectLoader,
  makeSelectActionLoader,
  makeSelectStatusCode,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectFileContent,
};
