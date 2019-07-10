const isIos = typeof webkit !== 'undefined'
const isAndroid = typeof android !== 'undefined'

export function pageSendsMessage(rawMessage) {
  var message = JSON.stringify(rawMessage)
  if (isIos) webkit.messageHandlers.pageSendsMessage.postMessage(message)
  else if (isAndroid) android.pageSendsMessage(message)
  else console.log(message)
}

export function closeModal() {
  if (isIos) webkit.messageHandlers.closeModal.postMessage('')
  else if (isAndroid) android.closeModal('')
  else console.log('Closing modal')
}
