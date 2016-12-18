/**
 * Created by BRenat on 10.12.2016.
 */
;
const modal = `<div class="cb-bg"></div> \
                <div class="cb-wrap"> \
                  <div class="cb-container"> \
                    <div class="cb-content"> \
                      <div class="cb"> \
                        <form action="#" id="loginForm"> \
                          <div class="form-group"> \
                            <label class="control-label" for="username">Ваше имя</label> \
                            <input type="text" placeholder="Ваше имя" title="Введите ваше имя" required="" value="" name="username" id="username" class="form-control"> \
                          </div> \
                          <div class="form-group"> \
                            <label class="control-label" for="phone">Телефон</label> \
                            <input type="phone" title="Введите ваш номер" required="" value="" name="phone" id="phone" class="form-control"> \
                            <span id="phoneMask" class="mask">+7 (___) ___ - __ - __</span> \
                          </div> \
                          <button class="btn btn--green">Отправить</button> \
                        </form> \
                      </div> \
                    </div> \
                  </div> \
               </div>`;
const modalClose = `<button id="close" class="btn btn--red">Close callback</button>`;

const CallBack = function(target) {
  this.target = document.querySelector(target);
};

CallBack.prototype = {
  constructor: CallBack,
  init:function() {
    this.render();
    this.clickHandler();
    this.inputListener();
  },
  clickHandler: function() {
    this.target.addEventListener('click', (e) => {
      this.open();
      e.preventDefault()
    });
    this.cbClose.addEventListener('click', (e) => {
      this.close();
      e.preventDefault()
    });
  },
  render: function() {
    this.cbBody = document.createElement('div');
    this.cbBody.innerHTML = modal;
    this.cbClose = document.createElement('div');
    this.cbClose.innerHTML = modalClose;
    let content = this.cbBody.querySelector('.cb-content');
    content.appendChild(this.cbClose);
  },
  inputListener: function() {
    let inputPhone = this.cbBody.querySelector('#phone');
    inputPhone.addEventListener('keypress',(e) => {
      let val = e.target.value.length;
      if (val <= 17) {
        if (e.keyCode >= 48 && e.keyCode <= 57) {
          e.target.classList.contains('error') ? e.target.classList.remove('error') : null;
          if (val === 3) {
            e.target.value += String.fromCharCode(160) + String.fromCharCode(160)
          }
          if (val === 8 || val === 13) {
            e.target.value += String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160)
          }
          if (val === 17) {
            e.target.classList.add('success')
          }
        } else {
          e.target.classList.contains('error') ? null :  e.target.classList.add('error');
          e.preventDefault()
        }
      } else {
        e.preventDefault()
      }
    })
  },
  open: function() {
    document.body.insertBefore(this.cbBody, document.body.firstChild);
  },
  close: function() {
    this.cbBody.remove();
  }
}