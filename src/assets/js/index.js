/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * @fileoverview This file supports the codelab for Google Pay: 
 * Build a Fast Checkout Experience on the Web with Google Pay, representing
 * a sample t-shirt store that suggests a new t-shirt on every load and uses
 * Google Pay as a means of payment.
 *
 * Note: This example uses minimal external resources (no jquery, react,
 * polymer, etc).
 */

/**
 * Google Pay API Configuration
 */
const allowedNetworks = ['VISA','MASTERCARD'];
const allowedAuthMethods = ['PAN_ONLY','CRYPTOGRAM_3DS'] ;

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedCardNetworks: allowedNetworks,
    allowedAuthMethods: allowedAuthMethods 
  }
};

const googlePayBaseConfiguration = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [baseCardPaymentMethod]
};

/**
 * Holds the Google Pay client used to call the different methods available
 * through the API.
 * @type {PaymentsClient}
 * @private
 */
let googlePayClient;
console.log("e");
function onGooglePayLoaded() {
  googlePayClient = new google.payments.api.PaymentsClient({
    environment: 'TEST'
  });
  
  googlePayClient.isReadyToPay(googlePayBaseConfiguration)
  .then(function(response) {
    if(response.result) {
      createAndAddButton();
    } else {
      alert("Unable to pay using Google Pay");
    }
  }).catch(function(err) {
    console.error("Error determining readiness to use Google Pay: ", err);
  });
}

/**
 * Handles the creation of the button to pay with Google Pay.
 * Once created, this button is appended to the DOM, under the element 
 * 'buy-now'.
 */
function createAndAddButton() {

  const googlePayButton = googlePayClient.createButton({

    // currently defaults to black if default or omitted
    buttonColor: 'default',

    // defaults to long if omitted
    buttonType: 'long',

    onClick: onGooglePaymentsButtonClicked
  });

  document.getElementById('buy-now').appendChild(googlePayButton);
}

function onGooglePaymentsButtonClicked() {
  const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'example',
    gatewayMerchantId: 'gatewayMerchantId'
  }
};
  const cardPaymentMethod = {
  type: 'CARD',
  tokenizationSpecification: tokenizationSpecification,
  parameters: {
    allowedCardNetworks: ['VISA','MASTERCARD'],
    allowedAuthMethods: ['PAN_ONLY','CRYPTOGRAM_3DS'],
    billingAddressRequired: true,
    billingAddressParameters: {
      format: 'FULL',
      phoneNumberRequired: true
    }
  }
};
  const transactionInfo = {
  totalPriceStatus: 'FINAL',
  totalPrice: '123.45',
  currencyCode: 'USD'
};
  const merchantInfo = {
  // merchantId: '01234567890123456789', Only in PRODUCTION
  merchantName: 'Example Merchant Name'
};
  const paymentDataRequest = Object.assign({}, googlePayBaseConfiguration, {
  allowedPaymentMethods: [cardPaymentMethod],
  transactionInfo: transactionInfo,
  merchantInfo: merchantInfo   
});
  
  googlePayClient
  .loadPaymentData(paymentDataRequest)
  .then(function(paymentData) {
    processPayment(paymentData);
  }).catch(function(err) {
    // Log error: { statusCode: CANCELED || DEVELOPER_ERROR }
  });
  
  function processPayment(paymentData) {
  // TODO: Send a POST request to your processor with the payload
  // https://us-central1-devrel-payments.cloudfunctions.net/google-pay-server 
  // Sorry, this is out-of-scope for this codelab.
  return new Promise(function(resolve, reject) {
    // @todo pass payment token to your gateway to process payment
    const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    console.log('mock send token ' + paymentToken + ' to payment processor');
    setTimeout(function() {
      console.log('mock response from processor');
      alert('done');
      resolve({});
    }, 800);
  });
}
  paymentDataRequest.shippingAddressRequired = true;
paymentDataRequest.shippingOptionRequired = true;
paymentDataRequest.callbackIntents = ['SHIPPING_OPTION'];
paymentDataRequest.shippingOptionParameters =  shippingOptionParameters;
}

const shippingOptionParameters = {
  shippingOptions: [
    {
      id: 'shipping-001',
      label: '$1.99: Standard shipping',
      description: 'Delivered on May 15.'
    },
    {
      id: 'shipping-002',
      label: '$3.99: Expedited shipping',
      description: 'Delivered on May 12.'
    },
    {
      id: 'shipping-003',
      label: '$10: Express shipping',
      description: 'Delivered tomorrow.'
    }
  ]
};

// Shipping surcharges mapped to the IDs above.
const shippingSurcharges = {
  'shipping-001': 1.99,
  'shipping-002': 3.99,
  'shipping-003': 10
};

/**
 * Handles the click of the button to pay with Google Pay. Takes
 * care of defining the payment data request to be used in order to load
 * the payments methods available to the user.
 */


function sendPayloadToProcessor(googlePayPayload) {
  // Send a POST request to your processor with the payload
  // https://us-central1-devrel-payments.cloudfunctions.net/google-pay-server 
}
