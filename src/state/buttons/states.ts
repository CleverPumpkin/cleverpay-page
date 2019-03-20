export function toggleButtonAvailability(): void {
  document
    .querySelectorAll('.cp-button')
    .forEach(element => element.classList.toggle('is-disabled'))
}
