class Modal {
  productsData = JSON.parse(localStorage.getItem('goods'))
  hash = window.location.hash.split('-').join(' ')
  total = 0
  tabs = { size: 0, additives: [0] }

  drowModal(arr) {
    let obj = arr[0]
    document.querySelector('.modal').innerHTML = ''
    document.querySelector('.modal').insertAdjacentHTML(
      'beforeend',
      ` <div class="popup">
          <div class="popup__wrapper">
            <div class="popup__inner">
              <div class="popup__content content">
                <div class="content__img">
                  <img src="${obj.src}" alt="${obj.name}" />
                </div>
                <div class="content__info">
                  <h3 class="content__title">${obj.name}</h3>
                  <p class="content__description">${obj.description}</p>
                  <div class="content__tabs">
                    <h4 class="content__tabs-title">Size</h4>
                    <ul class="content__tabs-size">
                      <li class="content__tab " data-add =' ${obj.sizes.s['add-price']}'><span>S</span>${obj.sizes.s.size}</li>
                      <li class="content__tab" data-add =' ${obj.sizes.m['add-price']}'><span>M</span>${obj.sizes.m.size}</li>
                      <li class="content__tab" data-add =' ${obj.sizes.l['add-price']}'><span>L</span>${obj.sizes.l.size}</li>
                    </ul>
                    <h4 class="content__tabs-title">Additives</h4>
                    <ul class="content__tabs-additives">
                      <li class="content__tab " data-add =' ${obj.additives[0]['add-price']}'><span>1</span>${obj.additives[0].name}</li>
                      <li class="content__tab" data-add =' ${obj.additives[1]['add-price']}'><span>2</span>${obj.additives[1].name}</li>
                      <li class="content__tab"data-add =' ${obj.additives[2]['add-price']}' ><span>3</span>${obj.additives[2].name}</li>
                    </ul>
                  </div>
                  <div class="content__total">
                    <span class="content__total-title">Total:</span>
                    <span class="content__total-dal">$${this.total}</span>
                  </div>
                  <p class="conrents__worning">
                    The cost is not final. Download our mobile app to see the final price and place
                    your order. Earn loyalty points and enjoy your favorite coffee with up to 20%
                    discount.
                  </p>
                  <button class="content__btn">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>`,
    )
    document.querySelector('.content__btn').addEventListener('click', () => {
      this.deleteModal()
    })
    document.querySelector('.popup').addEventListener('click', e => {
      if (e.target.classList.contains('popup__inner')) this.deleteModal()
    })
    document.querySelectorAll('.content__tabs-size .content__tab').forEach((item, id) => {
      if (id === this.tabs.size) {
        item.classList.add('content__tab--active')
      }
      item.addEventListener('click', () => {
        this.tabs.size = id
        this.init()
      })
    })
    document.querySelectorAll('.content__tabs-additives .content__tab').forEach((item, id) => {
      if (this.tabs.additives.indexOf(id) !== -1) {
        item.classList.add('content__tab--active')
      }
      item.addEventListener('click', () => {
        if (this.tabs.additives.indexOf(id) !== -1) {
          this.tabs.additives.splice(this.tabs.additives.indexOf(id), 1)
          this.init()
          return
        }
        if (this.tabs.additives.indexOf(id) === -1) {
          this.tabs.additives.push(id)
          this.init()
          return
        }
      })
    })
  }

  deleteModal() {
    this.total = 0
    window.location.hash = ''
    this.tabs = { size: 0, additives: [0] }
    document.querySelector('.modal').innerHTML = ''
  }

  getPrice() {
    this.hash = window.location.hash.split('-').join(' ')
    let arr = this.productsData.filter(item => item.name === this.hash.slice(1))
    const tabsActive = document.querySelectorAll('.content__tab--active')
    this.total = Number(arr[0].price)
    tabsActive.forEach(item => {
      let pr = item.getAttribute('data-add')
      this.total += Number(pr)
    })
    this.total = this.total.toFixed(2)
  }

  init() {
    this.hash = window.location.hash.split('-').join(' ')
    let arr = this.productsData.filter(item => item.name === this.hash.slice(1))
    console.log(this.hash)
    if (this.hash && this.hash !== '#contact us') {
      this.drowModal(arr)
      this.getPrice()
      this.drowModal(arr)
    }
  }
}

let modal = new Modal()
modal.init()
window.addEventListener('hashchange', () => {
  modal.init()
})
