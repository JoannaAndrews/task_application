// assets/dummyStyles.js
export const profileStyles = {
  // Container styles
  container: "max-w-4xl mx-auto py-8 px-4",
  mainContainer: "bg-white -mx-7 rounded-2xl shadow-sm overflow-hidden",

  // Header styles
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-8 text-center",
  avatar: "w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  userName: "text-2xl font-bold text-white",
  userEmail: "text-teal-100 mt-2",

  // Content styles
  content: "p-8 -mx-6.5",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",

  // Card styles
  card: "bg-gray-50 rounded-xl p-6",
  cardTitle: "text-xl font-semibold pb-3 text-gray-800 flex items-center",
  icon: "w-5 h-5 mr-2 text-teal-600",

  // Form styles
  label: "text-sm text-gray-500  block mb-1",
  input: "w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  inputWithError: "w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500",

  // Button styles
  buttonPrimary: "flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-2.5 rounded-xl font-medium shadow-md",
  buttonSecondary: "flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100",
  editButton: "text-teal-600 hover:text-teal-700 font-medium text-sm",
  changeButton: "text-teal-600 hover:text-teal-700 font-medium lg:text-sm",

  // Security item
  securityItem: "flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200",
  securityText: "font-medium lg:text-sm text-gray-400",

  // Modal styles
  modalContent: "bg-white rounded-2xl p-6 lg:px-28 w-full max-w-md",
  modalHeader: "flex justify-between lg:whitespace-nowrap lg:space-x-20 mb-6",
  modalTitle: "text-xl font-bold lg:pl-10 text-gray-800",

  // Password input
  passwordLabel: "block text-sm font-medium text-gray-700 mb-1",
  passwordContainer: "relative",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",

  // Error text
  errorText: "mt-1 text-sm text-red-600"
};

// Add to existing dummyStyles.js
export const modalStyles = {
  // Modal container
  overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  modalContainer: "bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl",

  // Header
  modalHeader: "flex justify-between items-center mb-4",
  modalTitle: "text-xl font-bold text-gray-800",
  closeButton: "text-gray-500 hover:text-gray-800",

  // Form elements
  form: "space-y-4",
  label: "block text-sm font-medium text-gray-700 mb-1",
  input: (ringColor: string) => `w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${ringColor}`,

  // Type buttons
  typeButtonContainer: "flex gap-4",
  typeButton: (isSelected: boolean, color: string) =>
    `flex-1 py-2 rounded-lg font-medium ${isSelected
      ? `${color} text-white shadow-md`
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }`,

  // Submit button
  submitButton: (color: string) => `w-full text-white py-3 rounded-lg font-medium mt-4 shadow-md hover:shadow-lg transition-all ${color}`,

  // Color classes
  colorClasses: {
    teal: {
      button: "bg-teal-500 hover:bg-teal-600",
      ring: "focus:ring-teal-500",
      typeButtonSelected: "bg-teal-500",
    },
    orange: {
      button: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
      ring: "focus:ring-orange-500",
      typeButtonSelected: "bg-orange-500",
    },
  },
};



// In src/assets/dummyStyles.js - add these styles
export const loginStyles = {
  // Page container
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50",

  // Card container
  cardContainer: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",

  // Header styles
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-teal-100 mt-2",

  // Form container
  formContainer: "p-8",

  // Error message
  errorContainer: "mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center",
  errorIcon: "w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3",
  errorText: "break-words",

  // Form elements
  label: "block text-sm font-medium text-gray-700 mb-2",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
  input: "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",

  // Checkbox
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500",
  checkboxLabel: "ml-2 block text-sm text-gray-700",

  // Button
  button: "w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center",
  buttonDisabled: "opacity-80 cursor-not-allowed",

  // Sign up link
  signUpContainer: "mt-8 text-center",
  signUpText: "text-gray-600",
  signUpLink: "font-medium text-teal-600 hover:underline",

  // Spinner for loading state
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};

// In src/assets/dummyStyles.js - add these styles
export const signupStyles = {
  // Page container (reusing from login)
  pageContainer: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50",

  // Card container (reusing from login)
  cardContainer: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden",

  // Header styles (reusing from login with additions)
  header: "bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-center relative",
  avatar: "w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-teal-100 mt-2",
  backButton: "absolute top-4 left-4 p-2 text-white rounded-full hover:bg-white/10 transition-colors",

  // Form container (reusing from login)
  formContainer: "p-8",

  // Error messages
  apiError: "mb-4 text-center text-sm text-red-600",
  fieldError: "mt-1 text-sm text-red-600",

  // Form elements (reusing from login with additions)
  label: "block text-sm font-medium text-gray-700 mb-2",
  inputContainer: "relative",
  inputIcon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400",
  input: "w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordInput: "w-full pl-10 pr-10 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-teal-300 focus:border-teal-500",
  passwordToggle: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",

  // Checkbox (reusing from login)
  checkboxContainer: "mb-6 flex items-center",
  checkbox: "w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500",
  checkboxLabel: "ml-2 block text-sm text-gray-700",

  // Button (reusing from login)
  button: "w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center",
  buttonDisabled: "opacity-80 cursor-not-allowed",

  // Sign in link (reusing from login with modifications)
  signInContainer: "mt-8 text-center",
  signInText: "text-gray-600",
  signInLink: "font-medium text-teal-600 hover:underline",

  // Spinner for loading state (reusing from login)
  spinner: "animate-spin -ml-1 mr-3 h-5 w-5 text-white"
};


// Centralized styles for the application
export const sidebarStyles = {
  // Layout and container styles
  sidebarContainer: {
    base: "hidden lg:flex flex-col pt-3 fixed top-16 bottom-0 z-30"
  },

  sidebarInner: {
    base: "bg-white border-r  border-gray-200 shadow-md h-full flex flex-col"
  },

  // User profile section
  userProfileContainer: {
    base: "p-4 border-b pt-20 md:pt-5 lg:pt-5 xl:pt-5 border-gray-100",
    collapsed: "px-3",
    expanded: "px-6"
  },

  userInitials: {
    base: "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl"
  },

  // Menu items
  menuList: {
    base: "space-y-1 px-2"
  },

  menuItem: {
    base: "relative flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200",
    active: "text-teal-600 bg-teal-50",
    inactive: "text-gray-600 hover:text-teal-700 hover:bg-gray-50",
    collapsed: "justify-center px-0 mx-2",
    expanded: "px-4"
  },

  menuIcon: {
    active: "text-teal-600",
    inactive: "text-gray-500"
  },

  activeIndicator: "absolute right-4 w-2 h-2 bg-teal-400 rounded-full animate-ping",

  // Toggle button
  toggleButton: {
    base: "absolute -right-3 top-12 z-20 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all"
  },

  // Footer section
  footerContainer: {
    base: "border-t border-gray-100 p-4",
    collapsed: "px-3",
    expanded: "px-6"
  },

  footerLink: {
    base: "flex items-center gap-3 py-2 rounded-xl font-medium text-gray-600 hover:text-teal-700 hover:bg-gray-50",
    collapsed: "justify-center"
  },

  logoutButton: {
    base: "flex items-center gap-3 py-2 rounded-xl font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 w-full mt-1",
    collapsed: "justify-center"
  },

  // Mobile sidebar
  mobileOverlay: "fixed inset-0 z-40 lg:hidden",
  mobileBackdrop: "absolute inset-0 bg-black/30 backdrop-blur-sm",

  mobileSidebar: {
    base: "absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl rounded-r-2xl overflow-hidden"
  },

  mobileHeader: "p-6 flex justify-between items-center border-b border-gray-100",
  mobileUserContainer: "flex pt-28 items-center gap-3",
  mobileCloseButton: "p-2 rounded-lg hover:bg-gray-100",

  mobileMenuList: "space-y-1",
  mobileMenuItem: {
    base: "flex items-center gap-4 px-6 py-4 font-medium",
    active: "text-teal-600 bg-teal-50",
    inactive: "text-gray-600 hover:bg-gray-50"
  },

  mobileFooter: "border-t border-gray-100 p-6",
  mobileFooterLink: "flex items-center gap-4 py-2 font-medium text-gray-600 hover:text-teal-700",
  mobileLogoutButton: "flex items-center gap-4 py-2 font-medium text-gray-600 hover:text-red-600 w-full",

  // Mobile menu button
  mobileMenuButton: "lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-full flex items-center justify-center shadow-xl"
};

// assets/dummyStyles.js
