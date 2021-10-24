export function Getdataconnection() {
  return {
    page: 1,
    perPage: 20,
    total: 1407,
    result: [
      {
        id: 3,
        fileInfoID: 10022,
        scanType: null,
        scanTypeCarrier: 'WEBSHIPPER',
        carrierID: 19,
        signature: null,
        countryCode: 'NP        ',
        city: 'Sundhara, Kathmandu',
        zip: '44600',
        carrierAccount: '1125',
        awb: '189',
        fileExtractedTime: '2020-04-21T09:31:30.04',
        scanLocation: null,
        scanMessage: null,
        scanDateTime: '2020-04-21T09:31:30.04',
        scanTransportIdType: null,
        sendToSite: null,
        lastScanDateTime: '2020-04-21T09:34:20.28',
        dataConnIsProcessed: true,
        dataConnStatus: 'Error     ',
        dataConnErrorMsg: 'No transport product data connection\r\n',
        siteName: 'SEKO',
        shipmentId: 1,
        accountNumber: '1125',
      },
    ],
  };
}

export function getShipment() {
  return {
    shipmentID: 1,
    awb: '189',
    shipDate: '2020-04-01T08:59:11',
    shipperAddress: {
      companyName: 'WallBee Demo',
      division: null,
      address1: 'Oliefabriksvej 61',
      address2: 'No Data',
      address3: 'No Data',
      houseNumber: null,
      province: null,
      city: 'Kastrup',
      stateCode: null,
      postalCode: '2770',
      contactPerson: {
        contactName: 'Jes',
        email: 'jkr@wallbee.dk',
        phone: 'No Data',
        mobil: 'No Data',
        fax: null,
      },
      vatNumber: null,
      country: 0,
      countryIsoCode: 'DK',
      accountNumber: null,
    },
    recieverAddress: {
      companyName: 'Codebee Nepal',
      division: null,
      address1: 'PO BOX : 4253',
      address2: 'Kathmandu',
      address3: 'No Data',
      houseNumber: null,
      province: null,
      city: 'Sundhara, Kathmandu',
      stateCode: null,
      postalCode: '44600',
      contactPerson: {
        contactName: 'No Data',
        email: 'binesh@codebee.dk',
        phone: '9841204790',
        mobil: '9841204790',
        fax: null,
      },
      vatNumber: null,
      country: 0,
      countryIsoCode: 'NP',
      accountNumber: null,
    },
    senderAddress: {
      companyName: 'WallBee Demo',
      division: null,
      address1: 'Oliefabriksvej 61',
      address2: 'No Data',
      address3: 'No Data',
      houseNumber: null,
      province: null,
      city: 'Kastrup',
      stateCode: null,
      postalCode: '2770',
      contactPerson: {
        contactName: 'Jes',
        email: 'jkr@wallbee.dk',
        phone: 'No Data',
        mobil: 'No Data',
        fax: null,
      },
      vatNumber: null,
      country: 0,
      countryIsoCode: 'DK',
      accountNumber: null,
    },
    billingAddress: {
      companyName: 'Codebee Nepal',
      division: null,
      address1: 'PO BOX : 4253',
      address2: 'Kathmandu',
      address3: 'No Data',
      houseNumber: null,
      province: null,
      city: 'Sundhara, Kathmandu',
      stateCode: null,
      postalCode: '44600',
      contactPerson: {
        contactName: 'No Data',
        email: 'binesh@codebee.dk',
        phone: '9841204790',
        mobil: '9841204790',
        fax: null,
      },
      vatNumber: null,
      country: 0,
      countryIsoCode: 'NP',
      accountNumber: null,
    },
    sendAsCOD: null,
    collies: [
      {
        weight: {
          unitType: 0,
          value: 1,
        },
        length: {
          unitType: 2,
          value: 15,
        },
        width: {
          unitType: 2,
          value: 15,
        },
        height: {
          unitType: 0,
          value: 15,
        },
        volume: null,
        packaging: {
          customeType: 0,
          transportDefinedType: 0,
        },
        dryice: {
          shipmentContainsDryIce: false,
          quatity: {
            unitType: 0,
            value: 0,
          },
          regulationset: 0,
        },
        codColliLevel: {
          enableCOD: false,
          codValue: null,
          payType: 0,
        },
        awb: '201',
        loadingMeters: {
          unitType: 2,
          value: 0,
        },
      },
    ],
    dg: null,
    shipmentDescription: {
      shipmentDescription: 'No Data',
      harmonizedCode: null,
    },
    handling: null,
    invoice: null,
    incoterms: 0,
    shipmentInsurance: null,
    labelformat: null,
    notificationService: null,
    testMode: false,
    paymentdirection: 0,
    pickupDetails: {
      bookPickup: false,
      readyTime: '0001-01-01T00:00:00',
      closeTime: '0001-01-01T00:00:00',
      pickupDate: '0001-01-01T00:00:00',
      comment: null,
      pickupAddress: {
        companyName: 'WallBee Demo',
        division: null,
        address1: 'Oliefabriksvej 61',
        address2: 'No Data',
        address3: 'No Data',
        houseNumber: null,
        province: null,
        city: 'Kastrup',
        stateCode: null,
        postalCode: '2770',
        contactPerson: {
          contactName: 'Jes',
          email: 'jkr@wallbee.dk',
          phone: 'No Data',
          mobil: 'No Data',
          fax: null,
        },
        vatNumber: null,
        country: 0,
        countryIsoCode: 'DK',
        accountNumber: null,
      },
      residentialIndicator: 0,
      pickupPoint: null,
    },
    deliveryDetails: null,
    references: [
      {
        type: 0,
        text: 'No Data',
      },
      {
        type: 1,
        text: 'No Data',
      },
    ],
    pls: null,
    typeOfShipment: 0,
    loginCredentialsToTrasnporter: null,
    loginToService: null,
    totalWeight: {
      unitType: 0,
      value: 1,
    },
    volumeWeight: null,
    numberOfCollies: 1,
    customsValue: null,
    createFDA: null,
    createFCC: null,
    createCOO: null,
    accountNumber: '1125',
    product: {
      product_Name: 124,
      productNumber: 124,
    },
    returnservice: null,
    shipmentDirection: {
      shipmentDirection: 1,
    },
    saturdayDelivery: false,
    saturdayPickup: false,
    createdDate: '2020-04-21T09:31:30.04',
    totalDryIceWeight: 0,
    shipmentSalePrice: 0,
    shipmentCostPrice: 0,
    signature: null,
    shipmentoptions: null,
  };
}