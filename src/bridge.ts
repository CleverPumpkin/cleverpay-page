export function closeModalNative(): void {
  if (process.env.NODE_ENV === 'development') {
    return console.log('Closing modal')
  }

  typeof closeModal === 'undefined' ? webkit.messageHandlers.closeModal.postMessage() : closeModal()
}

export function pageSendsMessageNative(message: string): void {
  if (process.env.NODE_ENV === 'development') {
    return console.log(message)
  }

  typeof pageSendsMessage === 'undefined'
    ? webkit.messageHandlers.pageSendsMessage.postMessage(message)
    : pageSendsMessage(message)
}
