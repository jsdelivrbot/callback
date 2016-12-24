/**
 * Created by BRenat on 10.12.2016.
 */
;
const CallBack = function(option) {
  this.option = {};
  this.option.mask = `+ 7 (___) ___ - __ - __`;
  this.option.color = {
      first : '#f49a00',
      second : '#fab900',
      phone : '#3CB868'
  };
  this.option.modalClassNames = {
      bg : 'br-bg',
      wrap : 'br-wrap',
      container : 'br-container',
      content : 'br-content',
      form : 'br-form',
      open : 'cback'
  };
  this.option.imgClose = 'img/close.png';
  this.option.imgLogo = 'img/logo.png';
  this.option.modalClose = `<button class="br-close"><img src=${this.option.imgClose} alt=""></button>`;
  this.option.modalLogo = `<div class="br-logo"><img src=${this.option.imgLogo} alt=""></div>`;
  this.option.modalText = `<div class="br-text">Закажите обратный звонок, <br/> мы перезвоним Вам в ближайшее время!</div>`;
  this.option.modalForm = `<form action="#"> \
                     <div class="br-form__group"> \
                       <input type="text" placeholder="Ваше имя" title="Введите ваше имя" required="" value="" name="username" id="username" class="br-form__input"> \
                     </div> \
                     <div class="br-form__group"> \
                       <input type="phone" title="Введите ваш номер" required="" value="" name="phone" id="phone" class="br-form__input"> \
                     </div> \
                    </form>`;
  this.option.modalFormBtn = `<button class="br-form__btn">Жду звонка</button>`;
  this.option.modalOpen = `<div class="cback-circle fn1"></div> \
                    <div class="cback-circle fn2"></div> \
                    <div class="cback-circle cback-circle--phone"> \
                      <i class='phone-icon'></i> \
                    </div>`
;
  this.option = Object.assign({}, this.option, option);
  this.option.modalStyle = `.cback-circle {color: ${this.option.color.phone}; background: ${this.option.color.phone};} .br-form__btn {background: ${this.option.color.first}} .br-form__btn:hover {background: ${this.option.color.second}} `;
  console.log(this.option.color.phone)
}

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
    this.cbStyle = document.createElement('style');
    this.cbStyle.innerHTML = this.option.modalStyle;
    document.head.appendChild(this.cbStyle);

    this.cbOpen = document.createElement('div');
    this.cbOpen.classList.add(this.option.modalClassNames.open);
    this.cbOpen.innerHTML = this.option.modalOpen;
    document.body.appendChild(this.cbOpen);


    this.cbForm = document.createElement('div');
    this.cbForm.classList.add(this.option.modalClassNames.form);
    this.cbForm.innerHTML = this.option.modalForm;

    this.cbContent = document.createElement('div');
    this.cbContent.classList.add(this.option.modalClassNames.content);
    this.cbContent.innerHTML = this.option.modalLogo + this.option.modalText;
    this.cbSend = document.createElement('div');
    this.cbSend.innerHTML = this.option.modalFormBtn;
    this.cbClose = document.createElement('div');
    this.cbClose.innerHTML = this.option.modalClose;
    this.cbContent.appendChild(this.cbForm);
    this.cbContent.appendChild(this.cbSend);
    this.cbContent.appendChild(this.cbClose);

    this.cbContainer = document.createElement('div');
    this.cbContainer.classList.add(this.option.modalClassNames.container);
    this.cbContainer.appendChild(this.cbContent);

    this.cbBody = document.createElement('div');
    this.cbBody.classList.add(this.option.modalClassNames.wrap);
    this.cbBody.appendChild(this.cbContainer);

    this.cbOverlay = document.createElement('div');
    this.cbOverlay.classList.add(this.option.modalClassNames.bg);
  },
  inputListener: function() {
    let inputPhone = this.cbForm.querySelector('#phone');
    inputPhone.setAttribute('placeholder',this.option.mask);
    this.applyDataMask(inputPhone, this.option.mask);
  },
  open: function() {
    document.body.insertBefore(this.cbBody, document.body.firstChild);
    document.body.insertBefore(this.cbOverlay, document.body.firstChild);
  },
  close: function() {
    this.cbOverlay.remove();
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