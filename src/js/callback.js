/**
 * Created by BRenat on 10.12.2016.
 */
;
const modal = `<div class="cb-bg"></div> \
                <div class="cb-wrap"> \
                  <div class="cb-container"> \
                    <div class="cb-content"> \
                      <div class="cb-logo"> \
                        <img src="img/logo.png" alt=""> \
                      </div> \
                      <div class="cb-text"> \
                        Закажите обратный звонок, <br/> \
                        мы перезвоним Вам в ближайшее время! \
                      </div> \
                      <div class="cb"> \
                        <form action="#" id="loginForm"> \
                          <div class="form-group"> \
                            <input type="text" placeholder="Ваше имя" title="Введите ваше имя" required="" value="" name="username" id="username" class="form-control"> \
                          </div> \
                          <div class="form-group"> \
                            <input type="phone" title="Введите ваш номер" required="" value="" name="phone" id="phone" class="form-control"> \
                          </div> \
                          <button class="btn">Жду звонка</button> \
                        </form> \
                      </div> \
                    </div> \
                  </div> \
               </div>`;
const btn = `<div class="cback"> \
              <a href="" id="open"> \
                <div class="cback-circle fn1"></div> \
                <div class="cback-circle fn2"></div> \
                <div class="cback-circle cback-circle--phone"> \
                  <i class='phone-icon'></i> \
                  <span style="display:none">КНОПКА<br>СВЯЗИ</span> \
                </div> \
              </a> \
            </div>`;
const modalClose = `<button id="close" class="cb-close"><img src="img/close.png" alt=""></button>`;

const CallBack = function() {
  this.mask = `+ 7 (___) ___ - __ - __`;
};

CallBack.prototype = {
  constructor: CallBack,
  init:function() {
    this.render();
    this.clickHandler();
    this.inputListener();
  },
  clickHandler: function() {
    this.cbOpen.addEventListener('click', (e) => {
      this.open();
      e.preventDefault()
    });
    this.cbClose.addEventListener('click', (e) => {
      this.close();
      e.preventDefault()
    });
  },
  render: function() {
    this.cbOpen = document.createElement('div');
    this.cbOpen.innerHTML = btn;
    document.body.insertBefore(this.cbOpen, document.body.firstChild);
    this.cbBody = document.createElement('div');
    this.cbBody.innerHTML = modal;
    this.cbClose = document.createElement('div');
    this.cbClose.innerHTML = modalClose;
    let content = this.cbBody.querySelector('.cb-content');
    content.appendChild(this.cbClose);
  },
  inputListener: function() {
    let inputPhone = this.cbBody.querySelector('#phone');
    inputPhone.setAttribute('placeholder',this.mask);
    this.applyDataMask(inputPhone, this.mask);
  },
  open: function() {
    document.body.insertBefore(this.cbBody, document.body.firstChild);
  },
  close: function() {
    this.cbBody.remove();
  },
  setCursor: function (elem, caretPos) {
    if(elem.createTextRange) {
      let range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    }
    else {
      if(elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      }
      else
        elem.focus();
    }
  },
  applyDataMask: function(field, mask) {

    var mask = mask.split('');

    // For now, this just strips everything that's not a number
    let stripMask = (maskedData) => {
      function isDigit(char) {
        return /\d/.test(char);
      }
      return maskedData.split('').filter(isDigit);
    }

    // `_` characters => characters from `data`
    let applyMask = (data) =>
      mask.map(function(char, index) {
        if (char != '_' && index != 2) return char;
        if (data.length == 0) return char;
        return data.shift();
      }).join('')

    let reapplyMask = (data) => applyMask(stripMask(data))

    let smartfocus = (flag) => {
      let oldStart = field.selectionStart;
      let oldEnd = field.selectionEnd;
      field.value = reapplyMask(field.value);
      if (field.value.indexOf('_') >= 0 && flag) {
                this.setCursor(field, field.value.indexOf('_'));
      } else if (!flag) {
        field.selectionStart = oldStart + 1;
        field.selectionEnd = oldStart;
      } else if (!(field.value.indexOf('_') < 0) && flag) {
        field.selectionStart = oldStart + 1;
        field.selectionEnd = oldStart + 1;
      }
    }
    field.addEventListener('click', (e) => {
      if ( /\d/.test(e.target.value.charAt(field.selectionStart - 1)) ||  /\d/.test(e.target.value.charAt(field.selectionStart))) {
        smartfocus(false)
      } else {
        smartfocus(true)
      }
      if (field.value.indexOf('_') < 0) {
          e.target.classList.add('success')
      } else {
          e.target.classList.remove('success')
      }
    });
    field.addEventListener('keydown', (e) => {
      if (!(e.keyCode >= 48 && e.keyCode <= 57) && e.keyCode !== 8 && e.keyCode !== 46 && !(e.keyCode >= 96 && e.keyCode <= 105) && !(e.keyCode >= 37 && e.keyCode <= 40)) {
        e.preventDefault()
      }
      if (field.value.indexOf('_') < 0) {
          e.target.classList.add('success')
      } else {
          e.target.classList.remove('success')
      }
    });
    field.addEventListener('keyup', (e) => {
      if (e.keyCode == 8 || (e.keyCode >= 37 && e.keyCode <= 40)) {
        smartfocus(false)
      } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        smartfocus(true)
      } else {
        e.preventDefault()
      }
      if (field.value.indexOf('_') < 0) {
          e.target.classList.add('success')
      } else {
          e.target.classList.remove('success')
      }
    })
  }
}