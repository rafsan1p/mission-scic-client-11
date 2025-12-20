# 🩸 BloodBank - Blood Donation Platform

A modern, fully responsive blood donation management system built with React, Node.js, and MongoDB. Connect blood donors with those in need and save lives.

## ✨ Key Features

### 🏥 For Everyone
- **Homepage** with hero section and features overview
- **Search Donors** by blood group, district, and upazila
- **Browse Requests** for pending blood donations
- **View Request Details** with donor contact information
- **Responsive Design** on all devices (mobile, tablet, desktop)
- **Dark Mode Support** with theme toggle

### 👥 For Donors
- **User Registration** with email verification
- **Complete Profile Management** (name, blood group, location)
- **Create Donation Requests** for urgent blood needs
- **Track My Requests** with pagination and filtering
- **View Request Status** (pending, in-progress, done, canceled)
- **Edit/Delete Requests** before they're fulfilled
- **Make Donations** via secure Stripe payment

### 👨‍💼 For Admin
- **User Management** - block/unblock users
- **Role Assignment** - promote donors to volunteers/admins
- **Dashboard Stats** - view total users, requests, funds
- **Manage All Requests** - control all blood requests
- **View Funding** - track all donations received
- **System Overview** with analytics

### 🤝 For Volunteers
- **Dashboard Access** with quick stats
- **View All Requests** across the system
- **Update Request Status** (pending → in-progress → done/canceled)
- **Manage Donations** efficiently

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router v7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS
- **DaisyUI** - Tailwind component library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Firebase Auth** - Authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Firebase Admin SDK** - JWT authentication
- **Stripe** - Payment processing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📋 Requirements

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- Firebase project
- Stripe account (for payments)
- ImgBB account (for image uploads)

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/bloodbank.git
cd bloodbank
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with:
# PORT=5000
# DB_USER=your_mongodb_user
# DB_PASS=your_mongodb_password
# STRIPE_SECRET=your_stripe_secret_key
# FB_SERVICE_KEY=your_firebase_service_key_base64

npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file with values from .env.example
npm run dev
```

## 📁 Project Structure

```
bloodbank/
├── frontend/
│   ├── src/
│   │   ├── component/      # Reusable components
│   │   ├── Pages/          # Page components
│   │   ├── Routes/         # Route definitions
│   │   ├── Provider/       # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── firebase/       # Firebase config
│   │   ├── DashboardLayout/# Dashboard layout
│   │   ├── RootLayout/     # Root layout
│   │   └── App.jsx
│   ├── public/             # Static files
│   ├── .env                # Environment variables
│   └── package.json
│
├── backend/
│   ├── index.js            # Server entry point
│   ├── .env                # Environment variables
│   └── package.json
│
└── README.md
```

## 🔐 Authentication

### User Roles
- **Donor** (default) - Can request blood and donate
- **Volunteer** - Can manage donation requests
- **Admin** - Full system control

### Login Credentials (Development)
Create test accounts through the registration page.

## 💳 Payment Integration

### Stripe Setup
1. Create Stripe account
2. Get API keys from dashboard
3. Add to backend `.env`
4. Test with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

## 🎨 Color Scheme

- **Primary**: Red (#DC2626) & Pink (#EC4899)
- **Success**: Green (#16A34A)
- **Warning**: Yellow (#EAB308)
- **Info**: Blue (#0EA5E9)
- **Gray**: Slate variants

## 🔑 Key Endpoints

### Public
- `GET /` - Home page
- `GET /all-requests` - All pending requests
- `GET /request-details/:id` - Request details
- `GET /search` - Search donors
- `GET /donate` - Donation page

### Protected (Auth Required)
- `GET /dashboard` - Dashboard home
- `GET /dashboard/profile` - User profile
- `POST /dashboard/create-donation-request` - Create request
- `GET /dashboard/my-donation-requests` - My requests
- `GET /dashboard/all-users` - All users (admin)
- `GET /dashboard/all-blood-donation-request` - All requests (admin/volunteer)
- `GET /dashboard/funding` - Funding page

## 📊 Database Schema

### Users Collection
```javascript
{
  email: String,
  name: String,
  mainPhotoUrl: String,
  blood: String,
  district: String,
  upazila: String,
  role: String,     // donor, volunteer, admin
  status: String,   // active, blocked
  createdAt: Date
}
```

### Requests Collection
```javascript
{
  requester_name: String,
  requester_email: String,
  recipient_name: String,
  recipient_district: String,
  recipient_upazila: String,
  hospital_name: String,
  full_address: String,
  blood_group: String,
  donation_status: String,  // pending, inprogress, done, canceled
  requestMessage: String,
  createdAt: Date
}
```

### Payments Collection
```javascript
{
  amount: Number,
  currency: String,
  donorEmail: String,
  transactionId: String,
  payment_status: String,
  paidAt: Date
}
```

## 🧪 Testing

### Test User Accounts
- Create via registration page with email verification
- Use test Firebase authentication

### Test Payments
Use Stripe test card: `4242 4242 4242 4242` with any future expiry

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Push to GitHub
2. Connect to Netlify/Vercel
3. Add environment variables
4. Deploy

### Backend (Heroku/Railway)
1. Create `.env` with production values
2. Push to platform
3. Set environment variables
4. Deploy

