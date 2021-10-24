export function getAllSiteAccount() {
  const response = {
    page: 1,
    perPage: 20,
    total: 1,
    result: [
      {
        id: 1,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: false,
        deleted: false,
      },
      {
        id: 2,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 5,
        accountNumber: '456',
        isDataConnection: true,
        isScan: false,
        deleted: false,
      },
    ],
  };
  return response;
}

export function getSiteAccount() {
  const response = {
    id: 1,
    siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
    carrierID: 1,
    accountNumber: '12345',
    isDataConnection: false,
    isScan: false,
    deleted: false,
  };
  return response;
}
