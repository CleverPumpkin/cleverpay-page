const el = document.getElementById('cp-loaderOverlay')

export function hideInitialOverlay(): void {
  if (el) {
    setTimeout(() => el.classList.remove('is-active'))
  }
}

export function toggleSemiActiveOverlay(): void {
  if (el) {
    el.classList.toggle('is-semi-active')
  }
}
