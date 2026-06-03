import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// PayPal environment setup
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';

  if (process.env.NODE_ENV === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  }
}

// PayPal client
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export interface PayPalOrderData {
  bookingReference: string;
  tourName: string;
  totalPrice: number;
  participants: number;
  tourDate: string;
  tourTime: string;
}

// Create PayPal order
export async function createPayPalOrder(orderData: PayPalOrderData) {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: orderData.bookingReference,
        description: `${orderData.tourName} - ${orderData.participants} participant(s) - ${orderData.tourDate} at ${orderData.tourTime}`,
        amount: {
          currency_code: 'USD',
          value: orderData.totalPrice.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: orderData.totalPrice.toFixed(2),
            },
          },
        },
        items: [
          {
            name: orderData.tourName,
            description: `Tour on ${orderData.tourDate} at ${orderData.tourTime}`,
            unit_amount: {
              currency_code: 'USD',
              value: orderData.totalPrice.toFixed(2),
            },
            quantity: '1',
          },
        ],
      },
    ],
    application_context: {
      brand_name: 'Eco Green Nosara',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancelled`,
    },
  });

  try {
    const response = await client().execute(request);
    return {
      success: true,
      orderId: response.result.id,
      data: response.result,
    };
  } catch (error) {
    console.error('PayPal order creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create PayPal order',
    };
  }
}

// Capture PayPal payment
export async function capturePayPalPayment(orderId: string) {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const response = await client().execute(request);
    return {
      success: true,
      captureId: response.result.purchase_units[0].payments.captures[0].id,
      data: response.result,
    };
  } catch (error) {
    console.error('PayPal payment capture error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to capture PayPal payment',
    };
  }
}

// Get order details
export async function getPayPalOrderDetails(orderId: string) {
  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

  try {
    const response = await client().execute(request);
    return {
      success: true,
      data: response.result,
    };
  } catch (error) {
    console.error('PayPal get order error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get PayPal order details',
    };
  }
}

