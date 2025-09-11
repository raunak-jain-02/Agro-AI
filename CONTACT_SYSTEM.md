# Contact System Documentation

## Overview
The AgroAI project now includes a fully functional contact system that allows users to send messages and administrators to view and respond to them.

## Features

### For Users (Contact Us Page)
- **Location**: `/contact`
- **Form Fields**:
  - Name (required)
  - Email (required)
  - Subject (dropdown with categories)
  - Message (required)
- **Functionality**:
  - Form validation with error messages
  - Messages are saved to browser localStorage
  - Success notification after submission
  - Form resets after successful submission

### For Administrators (Admin Messages Page)
- **Location**: `/admin/messages`
- **Features**:
  - View all contact messages with status tracking
  - Search messages by name, email, or content
  - Filter messages by status (New, Read, Responded, All)
  - Mark messages as read
  - Reply to messages with a dialog interface
  - Delete messages
  - Statistics dashboard showing message counts
  - Responsive design for mobile and desktop

## Message Status System
- **New**: Freshly submitted messages (blue badge)
- **Read**: Messages that have been viewed (gray badge)  
- **Responded**: Messages that have received a response (green badge)

## Data Storage
- Messages are stored in browser's localStorage
- Data persists across browser sessions
- No backend required for this demo implementation

## Demo Data
- 5 sample messages are automatically added when accessing the admin panel for the first time
- Includes various message types and statuses for testing
- Demo messages have realistic timestamps and content

## How to Use

### Sending a Message
1. Navigate to `/contact` or click "Contact" in the navigation
2. Fill out the form with required information
3. Select a subject category
4. Submit the form
5. Receive confirmation message

### Managing Messages (Admin)
1. Go to `/admin/messages` or click the admin link at the bottom of the contact page
2. View message statistics in the dashboard cards
3. Use search and filter options to find specific messages
4. Click the eye icon to mark messages as read
5. Click the reply icon to respond to messages
6. Click the trash icon to delete messages
7. View responses in the green response boxes

## Access Points
- **Contact Form**: Available in main navigation on all pages
- **Admin Panel**: Link available at bottom of contact page (for development)
- **Direct URL**: `/admin/messages`

## Technical Details
- Built with React and TypeScript
- Uses localStorage for persistence
- Responsive design with Tailwind CSS
- Form validation with toast notifications
- Modal dialogs for responses
- Real-time search and filtering

## Future Enhancements
In a production environment, you could enhance this system by:
- Adding email notifications via EmailJS or similar service
- Implementing user authentication for admin access
- Adding a backend API for proper data storage
- Including file attachment support
- Adding message priority levels
- Implementing automated responses
- Adding message analytics and reporting

## Notes
- This is a client-side only implementation suitable for demos and small-scale use
- Admin access is currently open (no authentication)
- Messages are stored locally in each browser
- For production use, implement proper authentication and backend storage
