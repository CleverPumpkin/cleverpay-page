import { closeModal, pageSendsMessage } from './bridge'

window.CleverPayManager = {
  _tracked: false,
  overlayElement: document.getElementById('cp-loaderOverlay'),

  subscriptions: [],

  init: function() {
    this.toggleInactiveOverlay()
    this.trackOpen()
  },

  subscribe: function(callback) {
    this.subscriptions.push(callback)
  },

  closeModal: function() {
    closeModal()
  },

  initializePurchase: function(productId) {
    pageSendsMessage({ type: 'purchase', productId: productId })
  },

  initialisePurchaseRestoration: function() {
    pageSendsMessage({ type: 'restorePurchases' })
  },

  toggleSemiActiveOverlay: function() {
    this.overlayElement.classList.add('is-semi-active')
  },

  toggleInactiveOverlay: function() {
    this.overlayElement.classList.remove('is-active')
    this.overlayElement.classList.remove('is-semi-active')
  },

  pageReceivesMessage: function(message) {
    if (message.type === 'config') {
      // TODO: transform data
      this.subscriptions.map(callback => callback(message.payload))
      this.toggleInactiveOverlay()
    } else if (message.type === 'close') {
      this.closeModal()
    } else if (message.type === 'hideOverlay') {
      this.toggleInactiveOverlay()
    }
  },

  trackOpen: function(screenId) {
    if(!this._tracked){
      pageSendsMessage({type: open, screenId: screenId})
      this._tracked = true
    }
  }
}

var el =  document.getElementById('root').style.display = 'block'