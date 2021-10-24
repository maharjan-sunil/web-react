import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.SiteAccountPage';

export default defineMessages({
  invoice: {
    id: `${scope}.invoice`,
    defaultMessage: 'Invoice',
  },
  detail: {
    id: `${scope}.InvoiceDetail`,
    defaultMessage: 'Invoice Detail',
  },
  site: {
    id: `${scope}.site`,
    defaultMessage: 'Site',
  },
  carrier: {
    id: `${scope}.carrier`,
    defaultMessage: 'Carrier',
  },
  fileName: {
    id: `${scope}.fileName`,
    defaultMessage: 'File Name',
  },
  pickUpDate: {
    id: `${scope}.pickUpDate`,
    defaultMessage: 'PickUp Date',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status',
  },
});
