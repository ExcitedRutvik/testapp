/**
 * Iron Express - Premium Doorstep Ironing App
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native';

// Colors based on the red and black branding
const Colors = {
  primary: '#DC2626', // Bold red
  secondary: '#1F1F1F', // Black
  background: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
};

// Mock data for the app
const mockUserData = {
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  addresses: [
    'A-101, Sunshine Apartments, Sector 15, Gurgaon, 122001',
    'B-205, Green Valley, Phase 2, Noida, 201301'
  ]
};

const mockOrderData = {
  orderId: 'IE240101001',
  items: [
    {type: 'Shirt', quantity: 3, price: 10},
    {type: 'Pants', quantity: 2, price: 10},
    {type: 'Jacket', quantity: 1, price: 20}
  ],
  status: 'Picked',
  pickupTime: '10:30 AM',
  deliveryTime: '2:30 PM'
};

// Splash Screen Component
const SplashScreen = ({onComplete}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      onComplete();
    }, 3000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Animated.View style={[styles.splashContent, {opacity: fadeAnim}]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🏃‍♂️ Iron Express</Text>
        </View>
        <Text style={styles.tagline}>Premium Cloth Ironing. At your Doorstep.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onComplete}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// Login Screen Component
const LoginScreen = ({onLogin}) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = () => {
    if (phone.length === 10) {
      setLoading(true);
      setTimeout(() => {
        setShowOTP(true);
        setLoading(false);
        Alert.alert('OTP Sent', 'Please check your SMS for the verification code.');
      }, 1500);
    } else {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
    }
  };

  const verifyOTP = () => {
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 1000);
    } else {
      Alert.alert('Error', 'Please enter the 4-digit OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.loginContainer}>
        <Text style={styles.logoText}>🏃‍♂️ Iron Express</Text>
        <Text style={styles.loginTitle}>Welcome Back!</Text>
        <Text style={styles.loginSubtitle}>Enter your mobile number to continue</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="98765 43210"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {showOTP && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter OTP</Text>
            <TextInput
              style={styles.textInput}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter 4-digit OTP"
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.primaryButton, (!phone || loading) && styles.disabledButton]}
          onPress={showOTP ? verifyOTP : sendOTP}
          disabled={!phone || loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.background} />
          ) : (
            <Text style={styles.buttonText}>
              {showOTP ? 'Verify OTP' : 'Send OTP'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Home Screen Component
const HomeScreen = ({onSchedulePickup, user}) => {
  const [address, setAddress] = useState(user.addresses[0]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <ScrollView style={styles.homeContainer}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hello, {user.name.split(' ')[0]}! 👋</Text>
          <Text style={styles.subHeaderText}>Ready for fresh, crisp clothes?</Text>
        </View>

        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Pickup Address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressIcon}>📍</Text>
            <Text style={styles.addressText}>{address}</Text>
          </View>
          <TouchableOpacity style={styles.changeAddressButton}>
            <Text style={styles.changeAddressText}>Change Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceHighlights}>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>⚡</Text>
            <Text style={styles.highlightTitle}>Quick Service</Text>
            <Text style={styles.highlightDesc}>As fast as 4 hours</Text>
          </View>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>🎯</Text>
            <Text style={styles.highlightTitle}>Premium Quality</Text>
            <Text style={styles.highlightDesc}>Professional ironing</Text>
          </View>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightIcon}>🚚</Text>
            <Text style={styles.highlightTitle}>Doorstep Service</Text>
            <Text style={styles.highlightDesc}>Pickup & delivery</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onSchedulePickup}>
          <Text style={styles.buttonText}>Schedule a Pickup</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Delivery Options Screen
const DeliveryOptionsScreen = ({onSelectOption}) => {
  const deliveryOptions = [
    {
      id: 'quick',
      icon: '🚀',
      title: 'Quick',
      subtitle: 'Within 4 hours',
      price: 'Express charges apply',
      color: Colors.primary
    },
    {
      id: 'sameday',
      icon: '📅',
      title: 'Same Day',
      subtitle: 'By end of day',
      price: 'Standard pricing',
      color: Colors.success
    },
    {
      id: 'scheduled',
      icon: '📆',
      title: 'Schedule',
      subtitle: 'Choose date & time',
      price: 'Standard pricing',
      color: Colors.warning
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Choose Delivery Option</Text>
        <Text style={styles.screenSubtitle}>When would you like your clothes back?</Text>
      </View>
      
      <ScrollView style={styles.optionsContainer}>
        {deliveryOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionCard, {borderColor: option.color}]}
            onPress={() => onSelectOption(option)}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <View style={styles.optionDetails}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                <Text style={[styles.optionPrice, {color: option.color}]}>{option.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Cloth Selection Screen
const ClothSelectionScreen = ({onProceedToCheckout}) => {
  const [items, setItems] = useState([
    {type: 'Shirt', price: 10, quantity: 0, icon: '👔'},
    {type: 'Pants', price: 10, quantity: 0, icon: '👖'},
    {type: 'Jacket', price: 20, quantity: 0, icon: '🧥'},
  ]);

  const updateQuantity = (index, change) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(0, newItems[index].quantity + change);
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Select Your Clothes</Text>
        <Text style={styles.screenSubtitle}>What needs ironing today?</Text>
      </View>

      <ScrollView style={styles.clothContainer}>
        {items.map((item, index) => (
          <View key={item.type} style={styles.clothItem}>
            <View style={styles.clothInfo}>
              <Text style={styles.clothIcon}>{item.icon}</Text>
              <View style={styles.clothDetails}>
                <Text style={styles.clothType}>{item.type}</Text>
                <Text style={styles.clothPrice}>₹{item.price} per piece</Text>
              </View>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(index, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(index, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.estimateCard}>
          <Text style={styles.estimateTitle}>Order Summary</Text>
          <Text style={styles.estimateDetails}>Total Items: {totalItems}</Text>
          <Text style={styles.estimateTotal}>Total Amount: ₹{totalAmount}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.primaryButton, totalItems === 0 && styles.disabledButton]}
          onPress={() => onProceedToCheckout(items.filter(item => item.quantity > 0), totalAmount)}
          disabled={totalItems === 0}
        >
          <Text style={styles.buttonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Checkout Screen
const CheckoutScreen = ({selectedItems, totalAmount, onPlaceOrder}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'YOURSPECIAL') {
      setDiscount(totalAmount * 0.1); // 10% discount
      Alert.alert('Coupon Applied!', '10% discount applied successfully');
    } else {
      Alert.alert('Invalid Coupon', 'Please enter a valid coupon code');
    }
  };

  const finalAmount = totalAmount - discount;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <ScrollView style={styles.checkoutContainer}>
        <Text style={styles.screenTitle}>Checkout</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderItemText}>
                {item.quantity}x {item.type}
              </Text>
              <Text style={styles.orderItemPrice}>₹{item.quantity * item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup & Delivery</Text>
          <Text style={styles.timingText}>📅 Today, 10:30 AM - 2:30 PM</Text>
          <Text style={styles.addressText}>📍 A-101, Sunshine Apartments, Sector 15, Gurgaon</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apply Coupon</Text>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="Enter coupon code (try: YOURSPECIAL)"
            />
            <TouchableOpacity style={styles.couponButton} onPress={applyCoupon}>
              <Text style={styles.couponButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.billSection}>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Subtotal</Text>
            <Text style={styles.billText}>₹{totalAmount}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.billRow}>
              <Text style={[styles.billText, {color: Colors.success}]}>Discount</Text>
              <Text style={[styles.billText, {color: Colors.success}]}>-₹{discount}</Text>
            </View>
          )}
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>₹{finalAmount}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => onPlaceOrder(finalAmount)}>
          <Text style={styles.buttonText}>Place Order - ₹{finalAmount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Order Tracking Screen
const OrderTrackingScreen = ({orderData}) => {
  const statusSteps = [
    {key: 'Picked', icon: '📦', completed: true},
    {key: 'Ironing', icon: '🔥', completed: false},
    {key: 'Out for Delivery', icon: '🚚', completed: false},
    {key: 'Delivered', icon: '✅', completed: false}
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <ScrollView style={styles.trackingContainer}>
        <Text style={styles.screenTitle}>Order Tracking</Text>
        
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{orderData.orderId}</Text>
          <Text style={styles.orderDetails}>
            {orderData.items.reduce((sum, item) => sum + item.quantity, 0)} items • {orderData.status}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          {statusSteps.map((step, index) => (
            <View key={step.key} style={styles.statusStep}>
              <View style={[
                styles.statusIcon,
                step.completed && styles.completedStatus,
                orderData.status === step.key && styles.currentStatus
              ]}>
                <Text style={styles.statusIconText}>{step.icon}</Text>
              </View>
              <Text style={[
                styles.statusText,
                step.completed && styles.completedText,
                orderData.status === step.key && styles.currentText
              ]}>
                {step.key}
              </Text>
              {index < statusSteps.length - 1 && (
                <View style={[styles.statusLine, step.completed && styles.completedLine]} />
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup & Delivery Time</Text>
          <Text style={styles.timingText}>
            📅 Pickup: Today, {orderData.pickupTime}
          </Text>
          <Text style={styles.timingText}>
            📅 Delivery: Today, {orderData.deliveryTime}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {orderData.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderItemText}>
                {item.quantity}x {item.type}
              </Text>
              <Text style={styles.orderItemPrice}>₹{item.quantity * item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.supportButton}>
          <Text style={styles.supportButtonText}>📞 Call Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Profile Screen
const ProfileScreen = ({user}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.background} barStyle="dark-content" />
      <ScrollView style={styles.profileContainer}>
        <Text style={styles.screenTitle}>Profile</Text>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          {user.addresses.map((address, index) => (
            <View key={index} style={styles.addressItem}>
              <Text style={styles.addressText}>📍 {address}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order History</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>Order #IE240101001 • ₹80</Text>
            <Text style={styles.historyDate}>Jan 1, 2024</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>Order #IE231230002 • ₹60</Text>
            <Text style={styles.historyDate}>Dec 30, 2023</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📱 WhatsApp Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📞 Call Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>❓ FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>💬 Live Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleSchedulePickup = () => {
    setCurrentScreen('delivery-options');
  };

  const handleSelectDeliveryOption = (option) => {
    setCurrentScreen('cloth-selection');
  };

  const handleProceedToCheckout = (items, amount) => {
    setSelectedItems(items);
    setTotalAmount(amount);
    setCurrentScreen('checkout');
  };

  const handlePlaceOrder = (finalAmount) => {
    Alert.alert(
      'Order Placed!',
      `Your order has been placed successfully. Order ID: ${mockOrderData.orderId}`,
      [
        {text: 'Track Order', onPress: () => setCurrentScreen('tracking')},
        {text: 'Go Home', onPress: () => setCurrentScreen('home')}
      ]
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return <HomeScreen onSchedulePickup={handleSchedulePickup} user={mockUserData} />;
      case 'delivery-options':
        return <DeliveryOptionsScreen onSelectOption={handleSelectDeliveryOption} />;
      case 'cloth-selection':
        return <ClothSelectionScreen onProceedToCheckout={handleProceedToCheckout} />;
      case 'checkout':
        return (
          <CheckoutScreen
            selectedItems={selectedItems}
            totalAmount={totalAmount}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      case 'tracking':
        return <OrderTrackingScreen orderData={mockOrderData} />;
      case 'profile':
        return <ProfileScreen user={mockUserData} />;
      default:
        return <HomeScreen onSchedulePickup={handleSchedulePickup} user={mockUserData} />;
    }
  };

  // Bottom Navigation
  const BottomNavigation = () => {
    if (!isLoggedIn || currentScreen === 'splash' || currentScreen === 'login') {
      return null;
    }

    return (
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'home' && styles.activeNavItem]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, currentScreen === 'home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'tracking' && styles.activeNavItem]}
          onPress={() => setCurrentScreen('tracking')}
        >
          <Text style={styles.navIcon}>📦</Text>
          <Text style={[styles.navText, currentScreen === 'tracking' && styles.activeNavText]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'profile' && styles.activeNavItem]}
          onPress={() => setCurrentScreen('profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={[styles.navText, currentScreen === 'profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.app}>
      {renderScreen()}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.background,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: Colors.background,
    textAlign: 'center',
    marginBottom: 50,
    opacity: 0.9,
  },

  // Login Screen Styles
  loginContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  countryCode: {
    padding: 16,
    fontSize: 16,
    color: Colors.darkGray,
    borderRightWidth: 1,
    borderRightColor: Colors.lightGray,
  },
  phoneInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: Colors.secondary,
  },
  textInput: {
    borderWidth: 2,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.secondary,
    backgroundColor: Colors.background,
  },

  // Home Screen Styles
  homeContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  addressSection: {
    marginBottom: 30,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  addressIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
  },
  changeAddressButton: {
    alignSelf: 'flex-start',
  },
  changeAddressText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  serviceHighlights: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  highlightCard: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  highlightIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  highlightTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  highlightDesc: {
    fontSize: 10,
    color: Colors.darkGray,
    textAlign: 'center',
  },

  // Common Button Styles
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: Colors.darkGray,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  supportButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Screen Header Styles
  screenHeader: {
    padding: 24,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 16,
    color: Colors.darkGray,
  },

  // Delivery Options Styles
  optionsContainer: {
    padding: 24,
  },
  optionCard: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: Colors.background,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  optionPrice: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Cloth Selection Styles
  clothContainer: {
    padding: 24,
  },
  clothItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  clothInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clothIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  clothDetails: {
    flex: 1,
  },
  clothType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 2,
  },
  clothPrice: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  estimateCard: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  estimateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.background,
    marginBottom: 8,
  },
  estimateDetails: {
    fontSize: 14,
    color: Colors.background,
    marginBottom: 4,
    opacity: 0.9,
  },
  estimateTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background,
  },

  // Checkout Styles
  checkoutContainer: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  timingText: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  couponContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  couponButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  couponButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  billSection: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  billText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.darkGray,
    marginTop: 8,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },

  // Order Tracking Styles
  trackingContainer: {
    padding: 24,
  },
  orderHeader: {
    marginBottom: 30,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 4,
  },
  orderDetails: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  statusContainer: {
    marginBottom: 30,
  },
  statusStep: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedStatus: {
    backgroundColor: Colors.success,
  },
  currentStatus: {
    backgroundColor: Colors.primary,
  },
  statusIconText: {
    fontSize: 20,
  },
  statusText: {
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  completedText: {
    color: Colors.success,
    fontWeight: '600',
  },
  currentText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  statusLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.lightGray,
    marginTop: 8,
  },
  completedLine: {
    backgroundColor: Colors.success,
  },

  // Profile Styles
  profileContainer: {
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.background,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  addressItem: {
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  historyText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  historyDate: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuText: {
    fontSize: 16,
    color: Colors.secondary,
  },

  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    color: Colors.darkGray,
  },
  activeNavText: {
    color: Colors.primary,
    fontWeight: '600',
  },

  // Bottom Section Styles
  bottomSection: {
    padding: 24,
    paddingBottom: 8,
  },
});

export default App;
