const burger = document.querySelector('.burger')
const headerMobile = document.querySelector('.header__mobile')
const body = document.querySelector('body')
const mobileItem = document.querySelectorAll('.mobile__item')

const openMenu = () => {
  burger.classList.add('burger--open')
  headerMobile.classList.add('header__mobile--open')
  body.style.overflow = 'hidden'
}
const clouseMenu = () => {
  burger.classList.remove('burger--open')
  headerMobile.classList.remove('header__mobile--open')
  body.style.overflow = 'scroll'
}

burger.addEventListener('click', () => {
  if (burger.classList.contains('burger--open')) {
    clouseMenu()
  } else {
    openMenu()
  }
})

mobileItem.forEach(item => {
  item.addEventListener('click', clouseMenu)
})
window.addEventListener('resize', () => {
  if (document.querySelector('body').offsetWidth > 768) {
    clouseMenu()
  }
})
