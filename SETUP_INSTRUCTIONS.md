# Version Bravo Landing Page Setup Instructions

## Environment Variables Setup

### 1. Resend Setup
1. Go to [Resend.com](https://resend.com) and create an account
2. Generate an API key from your dashboard
3. Create an audience for your email list
4. Copy the audience ID from your audience settings

### 2. Monday.com Setup
1. Go to [Monday.com](https://monday.com) and create an account
2. Create a new board for Version Bravo applications
3. Add the following columns to your board:
   - **Full Name** (Text column)
   - **Phone Number** (Text column) 
   - **Email** (Email column)
   - **Nation Served** (Dropdown column with options: "United States of America", "Israel")
   - **Unit** (Text column)
   - **How did you hear about us** (Long Text column)
   - **Entrepreneurship Status** (Dropdown column with the three options from the form)

4. Get your API token:
   - Go to your Monday.com profile
   - Navigate to Admin > API
   - Generate a new API token

5. Get your board ID:
   - Open your board
   - The board ID is in the URL: `https://yourorg.monday.com/boards/[BOARD_ID]`

### 3. Update the Monday.com Column IDs

**IMPORTANT**: You need to update the column IDs in the Netlify function:

1. Open your Monday.com board
2. For each column, get its unique ID:
   - Right-click on column header → "Column Settings"
   - The column ID will be visible in the developer tools or API documentation
3. Update the column IDs in `/netlify/functions/submit-application.js`:

```javascript
const columnValues = JSON.stringify({
  "text_column_id": formData.fullName,        // Replace with actual Full Name column ID
  "phone_column_id": formData.phoneNumber,    // Replace with actual Phone column ID
  "email_column_id": formData.email,          // Replace with actual Email column ID
  "dropdown_column_id": formData.nationServed, // Replace with actual Nation Served column ID
  "text_column_id_2": formData.unit,          // Replace with actual Unit column ID
  "long_text_column_id": formData.hearAbout,  // Replace with actual "How did you hear" column ID
  "dropdown_column_id_2": formData.entrepreneurshipStatus // Replace with actual Status column ID
});
```

### 4. Netlify Deployment

1. Install dependencies:
```bash
npm install
```

2. Connect your repository to Netlify:
   - Go to [Netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. Set environment variables in Netlify:
   - Go to Site Settings → Environment Variables
   - Add all four environment variables:
     - `RESEND_API_KEY`
     - `RESEND_AUDIENCE_ID`  
     - `MONDAY_API_TOKEN`
     - `MONDAY_BOARD_ID`

4. Deploy your site

### 5. Testing

1. Test the form submission on your live site
2. Verify that:
   - Emails are added to your Resend audience
   - New rows appear in your Monday.com board
   - Form validation works properly
   - Success/error messages display correctly

## Local Development

For local testing, create a `.env` file (copy from `.env.example`) and add your environment variables.

Run the development server:
```bash
npm run dev
```

Note: Netlify functions won't work locally without additional setup. Use the Netlify CLI for local function testing:

```bash
npm install -g netlify-cli
netlify dev
```

## Troubleshooting

### Common Issues:

1. **Monday.com column IDs**: Make sure you're using the correct column IDs from your actual Monday.com board
2. **CORS errors**: The function includes CORS headers, but make sure your Netlify deployment is working
3. **API rate limits**: Both Resend and Monday.com have rate limits
4. **Environment variables**: Double-check all environment variables are set correctly in Netlify

### Getting Monday.com Column IDs:

The easiest way to get column IDs is to use the Monday.com API Explorer:
1. Go to Monday.com API documentation
2. Use the `boards` query to get your board structure
3. The response will include all column IDs

Example query:
```graphql
{
  boards(ids: [YOUR_BOARD_ID]) {
    columns {
      id
      title
      type
    }
  }
}
```