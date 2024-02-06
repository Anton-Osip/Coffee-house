const sliderItems = document.querySelectorAll('.slider__item')
const sliderLine = document.querySelector('.slider__line')
const sliderButtonPrev = document.querySelector('.slider__button--prev')
const sliderButtonNext = document.querySelector('.slider__button--next')
const slider = document.querySelector('.slider')
const sliderPagination = document.querySelectorAll('.slider__pagination')
const slideWrrapper = document.querySelector('.slider__wrapper')

let count = 0
let timeCount = 0
let width
let x1 = null
let y1 = null

let interval = setInterval(autoPlay, 500)

function init() {
  width = document.querySelector('.slider__wrapper').offsetWidth
  sliderLine.style.width = width * sliderItems.length + 'px'
  sliderLine.style.height = 'auto'
  sliderItems.forEach(item => (item.style.width = width + 'px'))
  switchPagination()
}

function autoPlay() {
  timeCount++
  document
    .querySelector('.slider__pagination--active')
    .querySelector('.slider__pagination--bg').style.width = timeCount * 5 + '%'
  if (timeCount === 20) {
    timeCount = 0
    nextSlider()
  }
}
function nextSlider() {
  timeCount = 0

  count++
  if (count > sliderItems.length - 1) {
    count = 0
  }
  rollSlider()
  switchPagination()
}
function prevSlider() {
  timeCount = 0
  count--
  if (count < 0) {
    count = sliderItems.length - 1
  }
  rollSlider()
  switchPagination()
}

function rollSlider() {
  sliderLine.style.transform = `translate(-${+count * width}px)`
}

function handleTouchStart(event) {
  const firstTouch = event.touches[0]
  x1 = firstTouch.clientX
  y1 = firstTouch.clientY
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false
  }
  let x2 = event.touches[0].clientX
  let y2 = event.touches[0].clientY
  let xDif = x2 - x1
  let yDif = y2 - y1

  if (Math.abs(xDif) > Math.abs(yDif)) {
    if (xDif > 0) {
      prevSlider()
    } else {
      nextSlider()
    }
  }

  x1 = null
  y1 = null
}
function handleMouseDown(event) {
  x1 = event.clientX
  y1 = event.clientY
}

function handleMouseUp(event) {
  if (!x1 || !y1) {
    return false
  }
  let x2 = event.clientX
  let y2 = event.clientY
  let xDif = x2 - x1
  let yDif = y2 - y1

  if (Math.abs(xDif) > Math.abs(yDif)) {
    if (xDif > 0) {
      prevSlider()
    }
    if (xDif < 0) {
      nextSlider()
    }
  }

  x1 = null
  y1 = null
}

function switchPagination() {
  sliderPagination.forEach(item => {
    item.classList.remove('slider__pagination--active')
  })
  sliderPagination[count].classList.add('slider__pagination--active')
  document
    .querySelector('.slider__pagination--active')
    .querySelector('.slider__pagination--bg').style.width = '0%'
}

init()

window.addEventListener('resize', () => {
  init()
})
sliderButtonPrev.addEventListener('click', () => {
  prevSlider()
})
sliderButtonNext.addEventListener('click', () => {
  nextSlider()
})

slider.addEventListener('touchstart', handleTouchStart, false)
slider.addEventListener('touchmove', handleTouchMove, false)

slider.addEventListener('mousedown', handleMouseDown, false)
slider.addEventListener('mouseup', handleMouseUp, false)

slideWrrapper.addEventListener('mouseover', () => {
  clearInterval(interval)
})
slideWrrapper.addEventListener('mouseout', () => {
  interval = setInterval(autoPlay, 500)
})
slideWrrapper.addEventListener('touchstart', () => {
  clearInterval(interval)
})
slideWrrapper.addEventListener('touchend', () => {
  interval = setInterval(autoPlay, 500)
})
