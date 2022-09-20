import './style.css'
const emailInput = document.getElementById('email')
const countryInput = document.getElementById('country')
const zipInput = document.getElementById('zip-code')
const passwordInput = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirm-password')

const checkValidityState = (inputElement, inputName) => {
  const validityState = inputElement.validity
  let alertMessage = false
  if (validityState.valueMissing) {
    alertMessage = 'This field is required'
  } else if (validityState.patternMismatch) {
    alertMessage = `Please provide a valid ${inputName}`
  }
  return alertMessage
}

const validateInput = (inputElement, elementName) => {
  const alertIcon = inputElement.nextElementSibling
  alertIcon.classList.remove('visible')
  const alertMessage = checkValidityState(inputElement, elementName)
  if (!alertMessage) { return }
  const alertContainer = alertIcon.nextElementSibling
  alertContainer.lastElementChild.textContent = alertMessage
  alertIcon.classList.add('visible')
  alertContainer.classList.toggle('visible')
  setTimeout(() => {
    alertContainer.classList.toggle('visible')
  }, 2250)
}
emailInput.onblur = () => {
  validateInput(emailInput, 'email')
}
countryInput.onblur = () => {
  validateInput(countryInput)
}
zipInput.onblur = () => {
  validateInput(zipInput, 'zip code')
}
