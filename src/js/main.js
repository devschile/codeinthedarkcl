(function () {
  const win = window
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.hero-title, .hero-paragraph, .hero-cta', {
      duration: 1000,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 150
    })
  }

  // Moving objects
  const movingObjects = document.querySelectorAll('.is-moving-object')

  // Throttling
  function throttle (func, milliseconds) {
    let lastEventTimestamp = null
    let limit = milliseconds

    return (...args) => {
      let now = Date.now()

      if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
        lastEventTimestamp = now
        func.apply(this, args)
      }
    }
  }

  // Init vars
  let mouseX = 0
  let mouseY = 0
  let scrollY = 0
  let coordinateX = 0
  let coordinateY = 0
  let winW = doc.clientWidth
  let winH = doc.clientHeight

  // Move Objects
  function moveObjects (e, object) {
    mouseX = e.pageX
    mouseY = e.pageY
    scrollY = win.scrollY
    coordinateX = (winW / 2) - mouseX
    coordinateY = (winH / 2) - (mouseY - scrollY)

    for (let i = 0; i < object.length; i++) {
      const translatingFactor = object[i].getAttribute('data-translating-factor') || 20
      const rotatingFactor = object[i].getAttribute('data-rotating-factor') || 20
      const perspective = object[i].getAttribute('data-perspective') || 500
      let tranformProperty = []

      if (object[i].classList.contains('is-translating')) {
        tranformProperty.push('translate(' + coordinateX / translatingFactor + 'px, ' + coordinateY / translatingFactor + 'px)')
      }

      if (object[i].classList.contains('is-rotating')) {
        tranformProperty.push('perspective(' + perspective + 'px) rotateY(' + -coordinateX / rotatingFactor + 'deg) rotateX(' + coordinateY / rotatingFactor + 'deg)')
      }

      if (object[i].classList.contains('is-translating') || object[i].classList.contains('is-rotating')) {
        tranformProperty = tranformProperty.join(' ')

        object[i].style.transform = tranformProperty
        object[i].style.transition = 'transform 1s ease-out'
        object[i].style.transformStyle = 'preserve-3d'
        object[i].style.backfaceVisibility = 'hidden'
      }
    }
  }

  // Call function with throttling
  if (movingObjects) {
    win.addEventListener('mousemove', throttle(
      function (e) {
        moveObjects(e, movingObjects)
      },
      150
    ))
  }

  function sendData() {
    var button = document.querySelector('#submitFormButton')
    var input = document.querySelector('#email')
    var success = document.querySelector('#formSent')
    var error = document.querySelector('#formError')

    var XHR = new XMLHttpRequest()
    var FD = new FormData(form)

    XHR.open('POST', '#')

    XHR.onloadstart = function () {
      button.setAttribute('disabled', 'disabled')
      input.setAttribute('disabled', 'disabled')
    }

    XHR.onreadystatechange = function () {
      if (XHR.readyState < 4) {
      } else if (XHR.readyState === 4) {
        if (XHR.status === 200) {
          success.setAttribute('style', 'display:block')
        } else if (XHR.status !== 200) {
          error.setAttribute('style', 'display:block')
          button.removeAttribute('disabled')
          input.removeAttribute('disabled')
        }
      }
    }

    XHR.send(FD)
  }

  var form = document.querySelectorAll('.info-form')[0];
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    sendData()
  })

}())

function fullSlide () {

  var counter = 0
  var items = document.querySelectorAll('.diy-slideshow figure')
  var numItems = items.length

  var showCurrent = function (){
    var itemToShow = Math.abs(counter%numItems)

    // [].forEach.call( items, function(el){
    for (var i = 0;  i < items.length; i++) {
      items[i].classList.remove('show')
    }
    // })

    items[itemToShow].classList.add('show')
  }

  // add click events to prev & next buttons
  document.querySelector('.next').addEventListener('click', function () {
     counter++
     showCurrent()
  }, false)

  document.querySelector('.prev').addEventListener('click', function () {
     counter--
     showCurrent()
  }, false)

}

fullSlide()
