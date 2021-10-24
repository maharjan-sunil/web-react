import { Factory } from 'miragejs';

const ScanFactory = Factory.extend({
  page: 1,
  perPage: 20,
  total: 1,
  result: [
    {
      id: 1,
      fileInfoID: 10021,
      scanType: null,
      scanTypeCarrier: 'POSTNORDSE',
      carrierID: 11,
      signature: null,
      countryCode: 'SE',
      city: null,
      zip: null,
      carrierAccount: '0123456782',
      awb: '92151510600',
      fileExtractedTime: '2020-04-21T08:06:29.967',
      scanLocation: 'VÃ¤xjÃ¶-1',
      scanMessage: 'The shipment item has been delivered',
      scanDateTime: '2013-08-06T13:40:00',
      scanTransportIdType: null,
      changeDeliveryStatus: true,
      updateShipmentScan: true,
      scanCount: 1,
      sendToSite: true,
      lastScanDateTime: '2020-07-31T12:36:10.91',
      siteName: 'SEKO',
      accountNumber: '0123456782',
    },
  ],
});

export default ScanFactory;
