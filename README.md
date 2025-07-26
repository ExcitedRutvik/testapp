# 🏃‍♂️ Iron Express - Premium Doorstep Ironing App

A delightful and modern mobile app experience for Iron Express, a premium home ironing service in India. The goal is to make ironing pickups and deliveries as convenient and fast as ordering food online.

## 🎯 Features

### ✨ Core Functionality
- **Splash Screen** - Beautiful animated logo with tagline
- **OTP Authentication** - Secure mobile number + OTP login
- **Home Dashboard** - Personalized welcome with service highlights
- **Delivery Options** - Quick (4 hours), Same Day, or Scheduled delivery
- **Cloth Selection** - Easy quantity selection with live pricing
- **Smart Checkout** - Address confirmation, coupon codes, order summary
- **Live Order Tracking** - Real-time status updates from pickup to delivery
- **User Profile** - Manage addresses, view order history, access support

### 🎨 Design Features
- **Premium Branding** - Bold red (#DC2626) and black (#1F1F1F) color scheme
- **Modern UI** - Clean typography, friendly icons, smooth animations
- **Mobile-First** - Optimized for Android devices (375x812px)
- **Microinteractions** - Button animations, loading spinners, status updates
- **Bottom Navigation** - Easy access to Home, Orders, and Profile

### 💰 Pricing Structure
- **Shirt**: ₹10 per piece
- **Pants**: ₹10 per piece  
- **Jacket**: ₹20 per piece
- **Special Coupon**: Use "YOURSPECIAL" for 10% discount

### 📱 User Experience
- **Quick Onboarding** - Mobile OTP verification
- **Address Management** - Save multiple pickup/delivery addresses
- **Service Highlights** - Quick service, premium quality, doorstep convenience
- **Order History** - Track all previous orders
- **24/7 Support** - WhatsApp, phone, live chat, and FAQ support

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone and Setup**
   ```bash
   cd iron-express-app
   npm install
   # or
   yarn install
   ```

2. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start Metro Server**
   ```bash
   npx react-native start
   ```

4. **Run on Android**
   ```bash
   npx react-native run-android
   ```

5. **Run on iOS**
   ```bash
   npx react-native run-ios
   ```

## 📱 App Flow

### 1. Splash Screen
- Animated Iron Express logo
- "Premium Cloth Ironing. At your Doorstep." tagline
- "Get Started" CTA button

### 2. Authentication
- Mobile number input (+91 prefix)
- OTP verification (4-digit code)
- Automatic login after verification

### 3. Home Screen
- Personalized welcome message
- Current pickup address display
- Service highlights (Quick, Premium, Doorstep)
- "Schedule a Pickup" main CTA

### 4. Delivery Options
- **🚀 Quick**: Within 4 hours (Express charges)
- **📅 Same Day**: By end of day (Standard pricing)
- **📆 Schedule**: Choose date & time (Standard pricing)

### 5. Cloth Selection
- Interactive quantity selectors
- Live price calculation
- Order summary card
- Proceed to checkout when items selected

### 6. Checkout
- Order summary with item breakdown
- Pickup & delivery timing
- Address confirmation
- Coupon code input (try: "YOURSPECIAL")
- Final amount with discount calculation

### 7. Order Tracking
- Live status updates: Picked → Ironing → Out for Delivery → Delivered
- Order details and timing
- Call support option

### 8. Profile Management
- User information display
- Saved addresses management
- Order history
- Help & support options

## 🎨 Design System

### Colors
```javascript
const Colors = {
  primary: '#DC2626',      // Bold red
  secondary: '#1F1F1F',    // Black
  background: '#FFFFFF',   // White
  lightGray: '#F5F5F5',   // Light gray
  darkGray: '#6B7280',    // Dark gray
  success: '#10B981',     // Green
  warning: '#F59E0B',     // Orange
};
```

### Typography
- **Logo**: 36px, Bold
- **Screen Titles**: 24px, Bold
- **Section Titles**: 18px, Bold
- **Body Text**: 14-16px, Regular
- **Captions**: 12px, Regular

### Icons & Emojis
- 🏃‍♂️ Iron Express logo
- ⚡ Quick service
- 🎯 Premium quality
- 🚚 Doorstep service
- 📦 Order tracking
- 👤 User profile
- 📱 WhatsApp support

## 👥 Target Users

1. **Busy Working Professionals** - Need quick, reliable ironing service
2. **Young Couples & Families** - Convenience for household chores
3. **Retired Individuals** - Easy-to-use interface for seniors
4. **Students** - Affordable service for living away from home

## 🔧 Technical Features

### State Management
- React Hooks (useState, useEffect)
- Component-level state management
- Navigation state handling

### Animations
- Splash screen fade-in animation
- Loading spinners
- Button press feedback
- Status update transitions

### Mock Data
- User profiles with addresses
- Order history
- Real-time order tracking
- Pricing information

### Responsive Design
- Mobile-first approach
- Flexible layouts
- Touch-friendly interface
- Bottom navigation

## 🎯 Future Enhancements

### ✨ Bonus Features (Ready to Implement)
- **Rating System** - Rate service after delivery
- **Loyalty Program** - Badges and free orders after X uses
- **Push Notifications** - Order updates and promotions
- **Dark Mode** - Light/dark theme toggle
- **Multi-language** - Hindi and regional language support
- **Payment Integration** - UPI, cards, wallets
- **GPS Tracking** - Real-time delivery tracking
- **Fabric Care Tips** - Educational content

### 📊 Analytics Ready
- User engagement tracking
- Order completion rates
- Service area optimization
- Pricing strategy insights

## 🛠️ Development

### Project Structure
```
/
├── App.js                 # Main app component with all screens
├── package.json          # Dependencies and scripts
├── android/              # Android native code
├── ios/                  # iOS native code
└── README.md            # This file
```

### Key Components
- `SplashScreen` - Animated welcome screen
- `LoginScreen` - OTP authentication
- `HomeScreen` - Main dashboard
- `DeliveryOptionsScreen` - Service selection
- `ClothSelectionScreen` - Item quantity picker
- `CheckoutScreen` - Order confirmation
- `OrderTrackingScreen` - Live status updates
- `ProfileScreen` - User management
- `BottomNavigation` - Tab navigation

### Styling
- Comprehensive StyleSheet with organized sections
- Responsive design patterns
- Consistent color scheme
- Modern card-based layouts

## 📞 Support

For any issues or questions:
- **WhatsApp**: Quick customer support
- **Phone**: Direct call support
- **Live Chat**: In-app messaging
- **FAQ**: Common questions and answers

---

**Iron Express** - Making laundry as easy as ordering food! 🧺✨