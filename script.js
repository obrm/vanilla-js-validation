const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

function showError(input, msg) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = msg
}

function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(String(input.value).trim().toLowerCase())) {
    showSuccess(input)
  } else {
    showError(input, 'Invalid email')
  }
}

function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength) {
    showError(input, `${input.id} must be at least ${minLength} characters`)
  } else if (input.value.length > maxLength) {
    showError(input, `${input.id} must be less than ${maxLength} characters`)
  } else {
    showSuccess(input)
  }
}

function checkPasswordsMatch(pwd1, pwd2) {
  if (pwd1.value !== pwd2.value) {
    showError(pwd2, "password don't match")
  } else {
    showSuccess(pwd2)
  }
}

function checkInputs(inputArr, pwd1, pwd2) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.id} is required`)
    } else if (input.id === 'password') {
      checkLength(input, 6, 25)
    } else if (input.id === 'password2') {
      checkPasswordsMatch(pwd1, pwd2)
    } else if (input.id === 'username') {
      checkLength(input, 3, 15)
    } else if (input.id === 'email') {
      checkEmail(input)
    } else {
      showSuccess(input)
    }
  })
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault()
  checkInputs([username, email, password, password2], password, password2)
})
