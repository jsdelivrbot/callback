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

    let reapplyMask = (data) => {
      return applyMask(stripMask(data))
    }

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
    });
    field.addEventListener('keydown', (e) => {
      if (!(e.keyCode >= 48 && e.keyCode <= 57) && e.keyCode !== 8 && e.keyCode !== 46) {
        e.preventDefault()
      }
    });
    field.addEventListener('keyup', (e) => {
      if (e.keyCode == 8) {
        smartfocus(false)
      } else if (e.keyCode >= 48 && e.keyCode <= 57){
        smartfocus(true)
      } else {
        e.preventDefault()
      }
    })
  }
}