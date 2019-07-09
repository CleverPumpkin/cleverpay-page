export function pageSendsMessage(rawMessage) {
  var message = JSON.stringify(rawMessage)

  typeof webkit !== 'undefined'
    ? webkit.messageHandlers.pageSendsMessage.postMessage(message)
    : android.pageSendsMessage(message)
}

export function closeModal() {
  typeof webkit !== 'undefined'
    ? webkit.messageHandlers.closeModal.postMessage('')
    : android.closeModal('')
}
