import './style.css'
const emailInput = document.getElementById('email')
const countryInput = document.getElementById('country')
const zipInput = document.getElementById('zip-code')
const passwordInput = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirm-password')
const submitButton = document.getElementById('submit-button')
let formIncomplete = true

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
const checkPasswordValidity = (inputElement) => {
  const validityState = inputElement.validity
  if (validityState.valueMissing) {
    return 'This field is required'
  } else if (validityState.tooShort) {
    return 'Password must be at least 8 characters'
  } else if (validityState.patternMismatch) {
    return 'Password must contain at least one special character and one capital letter'
  } else {
    const password = inputElement.value
    confirmPasswordInput.setAttribute('pattern', password)
    return false
  }
}
const confirmPassword = (inputElement) => {
  const validityState = inputElement.validity
  if (validityState.patternMismatch) {
    return 'Password does not match'
  } else { return false }
}

const validateInput = (inputElement, elementName) => {
  const alertIcon = inputElement.nextElementSibling
  alertIcon.classList.remove('visible')
  let alertMessage
  if (elementName === 'password') {
    alertMessage = checkPasswordValidity(inputElement)
  } else if (elementName === 'confirm') {
    alertMessage = confirmPassword(inputElement)
  } else { alertMessage = checkValidityState(inputElement, elementName) }
  if (!alertMessage) { return }
  formIncomplete = true
  const alertContainer = alertIcon.nextElementSibling
  alertContainer.lastElementChild.textContent = alertMessage
  alertIcon.classList.add('visible')
  alertContainer.classList.toggle('visible')
  setTimeout(() => {
    alertContainer.classList.toggle('visible')
  }, 2750)
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
passwordInput.onblur = () => {
  validateInput(passwordInput, 'password')
}
confirmPasswordInput.onblur = () => {
  validateInput(confirmPasswordInput, 'confirm')
}
submitButton.onclick = (event) => {
  formIncomplete = false
  validateInput(emailInput, 'email')
  validateInput(countryInput)
  validateInput(zipInput, 'zip code')
  validateInput(passwordInput, 'password')
  validateInput(confirmPasswordInput, 'confirm')
  if (formIncomplete) {
    event.preventDefault()
  } else { alert('Form Submitted!') }
}
