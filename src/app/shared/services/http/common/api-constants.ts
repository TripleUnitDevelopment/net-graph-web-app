export const API_CONSTANTS = {
  Auth: {
    Signin: '/customers/signin',
    Signup: '/customers/signup'
  },

  packages: {
    getAvailablePackages: '/packages',
    validateOfferCode: '/offers/',
    getPackageByID: '/packages/',
    calculateCost: '/cost',
  },

  payment: {
    createCheckoutSession: '/checkout',
    postOrder: '',
    putOrder: '',
  },

  languages: {
    getAvailableLanguages: '/languages'
  },

  currencies: {
    getAvailableCurrencies: '/currencies'
  }
}
