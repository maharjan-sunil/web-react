export function getAllScan() {
  const response = {
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
  };
  return response;
}

export function getScanDetail() {
  const response = {
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
    scanTransportIdType: '21',
    changeDeliveryStatus: true,
    updateShipmentScan: true,
    scanCount: 1,
    sendToSite: true,
    lastScanDateTime: '2020-07-31T12:36:10.91',
    siteName: null,
    accountNumber: null,
  };
  return response;
}

export function resetScan() {
  const response = 1;
  const mockResponse = {
    index: undefined,
    count: '0',
    response,
  };
  return mockResponse;
}

export function setScanCount() {
  const response = 1;
  const mockResponse = {
    index: undefined,
    count: undefined,
    response,
  };
  return mockResponse;
}
