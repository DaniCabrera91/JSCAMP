// recupera solo el primer boton que encuentre
// const boton = document.querySelector('.button-apply-job')
// console.log(boton) // null si no lo encuentra

// if (boton !== null) {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// }

// const botones = document.querySelectorAll('.button-apply-job')


// botones.forEach(boton => {
//   boton.addEventListener('click', function() {
//     boton.textContent = '¡Aplicado!'
//     boton.classList.add('is-applied')
//     boton.disabled = true
//   })
// })

const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection.addEventListener('click', function(event) {
  const element = event.target

  if (element.classList.contains('button-apply-job')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

const filter = document.querySelector('#filter-location')
const mensaje = document.querySelector('#filter-selected-value')
const jobs = document.querySelectorAll('.job-listing-card')

filter.addEventListener('change', function () {
  const selectedValue = filter.value
  
  if (selectedValue) {
    mensaje.textContent = `Has seleccionado: ${selectedValue}`
  } else {
    mensaje.textContent = ''
  }

  jobs.forEach(job => {
    // const modalidad = job.dataset.modalidad
    const modalidad = job.getAttribute('data-modalidad')
    const isShown = selectedValue === '' || modalidad === selectedValue
    job.style.display = isShown ? 'block' : 'none' 
  })
})



// searchInput.addEventListener('input', function() {
//   console.log(value)
// })

// searchInput.addEventListener('input', function() {
//   console.log(searchInput.value)
// })

// const searchForm = document.querySelector('#empleos-search-form') 
// searchForm.addEventListener('submit', function() {
//   event.preventDefault()
//   console.log('submit')
// })