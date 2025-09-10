const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Monday.com API configuration
const MONDAY_API_URL = 'https://api.monday.com/v2';

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    // Parse the request body
    const formData = JSON.parse(event.body);
    console.log('📝 Form data received:', formData);
    
    // Validate required fields
    const requiredFields = [
      'fullName', 'phoneNumber', 'email', 'nationServed', 
      'unit', 'hearAbout', 'entrepreneurshipStatus'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        console.log(`❌ Missing field: ${field}`);
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            error: `Missing required field: ${field}` 
          }),
        };
      }
    }

    // 1. Add email to Resend audience
    try {
      console.log('🚀 Attempting to add to Resend audience...');
      await addToResendAudience(formData.email, formData.fullName);
      console.log('✅ Successfully added to Resend audience');
    } catch (resendError) {
      console.error('❌ Resend error:', resendError);
      // Continue even if Resend fails
    }

    // 2. Add to Monday.com
    try {
      console.log('🚀 Attempting to add to Monday.com...');
      await addToMondayCom(formData);
      console.log('✅ Successfully added to Monday.com');
    } catch (mondayError) {
      console.error('❌ Monday.com error:', mondayError);
      // Continue even if Monday.com fails
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully!' 
      }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Internal server error. Please try again.' 
      }),
    };
  }
};

// Function to add email to Resend audience
async function addToResendAudience(email, fullName) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    throw new Error('Resend API key or audience ID not configured');
  }

  try {
    const response = await resend.contacts.create({
      email: email,
      firstName: fullName.split(' ')[0] || fullName,
      lastName: fullName.split(' ').slice(1).join(' ') || '',
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    return response;
  } catch (error) {
    console.error('Resend API error:', error);
    throw error;
  }
}

// Function to add to Monday.com
async function addToMondayCom(formData) {
  if (!process.env.MONDAY_API_TOKEN || !process.env.MONDAY_BOARD_ID) {
    throw new Error('Monday.com API token or board ID not configured');
  }

  console.log('🔧 Monday.com Board ID:', process.env.MONDAY_BOARD_ID);

  const mutation = `
    mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId
        item_name: $itemName
        column_values: $columnValues
      ) {
        id
      }
    }
  `;

  // Monday.com column mapping based on your actual board structure
  // Different column types require different formats
  const columnValues = JSON.stringify({
    "name": formData.fullName,
    "date4": new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
    "phone_mkvnhsmr": { "phone": formData.phoneNumber, "countryShortName": "US" },
    "email_mkvned8h": { "email": formData.email, "text": formData.email },
    "text_mkvn179r": formData.nationServed,
    "text_mkvn87rh": formData.unit,
    "text_mkvnmm57": formData.hearAbout,
    "text_mkvnvzw1": formData.entrepreneurshipStatus
  });

  const variables = {
    boardId: process.env.MONDAY_BOARD_ID,
    itemName: `${formData.fullName} - ${new Date().toLocaleDateString()}`,
    columnValues: columnValues
  };

  console.log('📊 Monday.com Variables:', JSON.stringify(variables, null, 2));

  try {
    const response = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': process.env.MONDAY_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    });

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(`Monday.com API error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error('Monday.com API error:', error);
    throw error;
  }
}