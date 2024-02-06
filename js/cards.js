class Cards {
  productsData = JSON.parse(localStorage.getItem('goods'))
  element = ''
  catigary = localStorage.getItem('catigary') || 'coffee'
  more = 8

  switchTabs() {
    const tabsItems = document.querySelectorAll('.tabs__item')

    localStorage.setItem('catigary', this.catigary)

    tabsItems.forEach(item => {
      if (item.getAttribute('data-catigory') === this.catigary) {
        item.classList.add('tabs__item--active')
      }

      item.addEventListener('click', () => {
        tabsItems.forEach(item => {
          item.classList.remove('tabs__item--active')
        })
        item.classList.add('tabs__item--active')
        localStorage.setItem('catigary', item.getAttribute('data-catigory'))
        this.catigary = localStorage.getItem('catigary')
        this.drowCards()
      })
    })
  }

  drowCards() {
    const arr = this.productsData
      .filter(goods => goods.category === this.catigary)
      .filter((_, i) => i < this.more)
    document.querySelector('.goods').innerHTML = ''
    arr.forEach(card => {
      document.querySelector('.goods').insertAdjacentHTML(
        'beforeend',
        `
         <div class="goods__card" data-name='${card.name}'>
              <div class="goods__wrapper">
                <img src="${card.src}" alt="${card.name}" class="goods__img" />
              </div>
              <div class="goods__info">
                <h2 class="goods__title">${card.name}</h2>
                <p class="goods__description">
                  ${card.description}
                </p>
                <p class="goods__price">$${card.price}</p>
              </div>
            </div>

       `,
      )
    })
    if (
      this.more === 4 &&
      this.productsData.filter(goods => goods.category === this.catigary).length > 4
    ) {
      this.drowMore()
    } else {
      document.querySelector('.goods__more-wrapper').innerHTML = ''
    }
    document.querySelectorAll('.goods__card').forEach(item =>
      item.addEventListener('click', () => {
        window.location.hash = item.getAttribute('data-name').split(' ').join('-')
      }),
    )
  }
  drowMore() {
    document.querySelector('.goods__more-wrapper').innerHTML = ''
    document.querySelector('.goods__more-wrapper').insertAdjacentHTML(
      'beforeend',
      `<div class='goods__more'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>`,
    )
    document.querySelector('.goods__more').addEventListener('click', () => {
      this.more = 8
      document.querySelector('.goods__more-wrapper').innerHTML = ''
      this.drowCards()
    })
  }

  init() {
    this.switchTabs()
    this.drowCards()
    if (document.querySelector('body').offsetWidth <= 768) {
      this.more = 4
      this.drowCards()
    }
    window.addEventListener('resize', () => {
      if (document.querySelector('body').offsetWidth <= 768 && this.more === 8) {
        this.more = 4
        this.drowCards()
      }
    })
  }
}

let cards = new Cards()
cards.init()
