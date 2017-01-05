/**
 * Created by BRenat on 04.01.2017.
 */
const defaults = {
  imgClose : 'img/close.png',
  imgLogo : 'http://localhost:8080/img/logo.png',
  color : {
    first : '#f49a00',
    second : '#fab900',
    phone : '#3CB868'
  },
  mask : `+ 7 (___) ___ - __ - __`,
  position : 'bottom:20px; left:20px;'
}

const iframeStyle = 'body{font-family:PT Sans,sans-serif;margin:0;padding:0}.br-logo{text-align:center}.br-logo img{max-width:100%;max-height:100%}.br-text{text-align:center;padding-top:20px;padding-bottom:25px}.br-form__group{margin-bottom:15px}.br-form__group,.br-form__input{position:relative;text-align:center}.br-form__input{display:block;width:100%;max-width:370px;padding:9px 12px 7px;font-size:25px;line-height:1.42857143;color:#767676;margin:0 auto 20px;background:#fff;box-shadow:0 0 4.8px 0.3px rgba(0,0,0,.2);border:1px solid #ccc;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;z-index:2}.br-form__input.success{border-color:green}.br-form__input#phone{text-align:left;letter-spacing:2px}.br-form__btn{border-radius:5px;display:block;padding:14px 50px 13px;font-size:18px;font-weight:400;text-align:center;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:40px auto 10px;color:#fff;background:#3cb868;border:none;text-transform:uppercase;background-size:100% 100%;text-shadow:0 0 4.8px rgba(0,0,0,.2)}';

const iframeScript = `var inputPhone = document.querySelector('#phone');console.log(inputPhone)`;

class CallMe {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
    this.elements = {
      modalClassNames : {
        bg : 'br-bg',
        wrap : 'br-wrap',
        container : 'br-container',
        content : 'br-content',
        form : 'br-form',
        open : 'cback'
      },
      modalBody: '<div class="br-container"><div class="br-content"><iframe class="br-iframe" name="frameForm" id="frameForm" src="" allowfullscreen></iframe></div></div>',
      modalClose : `<button class="br-close"><img src=${this.options.imgClose} alt=""></button>`,
      modalOpen : `<div class="cback-circle fn1"></div><div class="cback-circle fn2"></div><div class="cback-circle cback-circle--phone"><i class='phone-icon'></i></div>`,
      modalStyle : `.cback-circle {color: ${this.options.color.phone}; background: ${this.options.color.phone};} .br-form__btn {background: ${this.options.color.first}} .br-form__btn:hover {background: ${this.options.color.second}}`,
      modalIframe : `<div class="br-logo">
						<img src=${this.options.imgLogo} alt="">
					</div>
					<div class="br-text">Закажите обратный звонок, <br> мы перезвоним Вам в ближайшее время!</div>
					<div class="br-form">
						<form action="#">
							<div class="br-form__group">
								<input type="text" placeholder="Ваше имя" title="Введите ваше имя" required="" value="" name="username" id="username" class="br-form__input">
							</div>
							<div class="br-form__group">
								<input type="phone" title="Введите ваш номер" required="" value="" name="phone" id="phone" class="br-form__input">
							</div>
						</form>
					</div>
					<button class="br-form__btn">Жду звонка</button>`
    }
    this.init()
  }
  init() {
    this.render();
    this.clickHandler();
    // this.inputListener();
  }
  clickHandler() {
    this.cbOpen.addEventListener('click', (e) => {
      this.open();
      e.preventDefault()
    });
    this.cbClose.addEventListener('click', (e) => {
      this.close();
      e.preventDefault()
    });
  }
  render() {
    this.cbStyle = document.createElement('style');
    this.cbStyle.innerHTML = this.elements.modalStyle;
    document.head.appendChild(this.cbStyle);

    this.cbIframeStyle = document.createElement('style');
    this.cbIframeStyle.innerHTML = iframeStyle;
    document.head.appendChild(this.cbIframeStyle);


    this.cbOpen = document.createElement('div');
    this.cbOpen.classList.add(this.elements.modalClassNames.open);
    this.cbOpen.innerHTML = this.elements.modalOpen;
    document.body.appendChild(this.cbOpen);

    this.cbOverlay = document.createElement('div');
    this.cbOverlay.classList.add(this.elements.modalClassNames.bg);

    this.cbBody = document.createElement('div');
    this.cbBody.classList.add(this.elements.modalClassNames.wrap);
    this.cbBody.innerHTML = this.elements.modalBody;

    this.cbClose = document.createElement('div');
    this.cbClose.innerHTML = this.elements.modalClose;
    this.cbBody.querySelector('.br-content').appendChild(this.cbClose);

    this.cbBody.querySelector('#frameForm').src = 'data:text/html;charset=utf-8,' + encodeURI('<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">'+`<style>${iframeStyle}</style>` + this.elements.modalIframe + `<script>${iframeScript}</script>`);
    this.cbBody = document.body.insertBefore(this.cbBody, document.body.firstChild);
    this.cbOverlay = document.body.insertBefore(this.cbOverlay, document.body.firstChild);
  }
  inputListener() {
    // let inputPhone = this.cbBody.querySelector('#frameForm').contentWindow.document.querySelector('#phone');
    // inputPhone.setAttribute('placeholder',this.options.mask);
    // this.applyDataMask(inputPhone, this.options.mask);
  }
  open() {
    this.cbBody.style.display = 'block';
    this.cbOverlay.style.display = 'block';
  }
  close() {
    this.cbBody.style.display = 'none';
    this.cbOverlay.style.display = 'none';
  }
  setCursor(elem, caretPos) {
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
  }
  // applyDataMask(field, mask) {
  //
  //   var mask = mask.split('');
  //
  //   // For now, this just strips everything that's not a number
  //   let stripMask = (maskedData) => {
  //     function isDigit(char) {
  //       return /\d/.test(char);
  //     }
  //     return maskedData.split('').filter(isDigit);
  //   }
  //
  //   // `_` characters => characters from `data`
  //   let applyMask = (data) =>
  //     mask.map(function(char, index) {
  //       if (char != '_' && index != 2) return char;
  //       if (data.length == 0) return char;
  //       return data.shift();
  //     }).join('')
  //
  //   let reapplyMask = (data) => applyMask(stripMask(data))
  //
  //   let smartfocus = (flag) => {
  //     let oldStart = field.selectionStart;
  //     let oldEnd = field.selectionEnd;
  //     field.value = reapplyMask(field.value);
  //     if (field.value.indexOf('_') >= 0 && flag) {
  //       this.setCursor(field, field.value.indexOf('_'));
  //     } else if (!flag) {
  //       field.selectionStart = oldStart + 1;
  //       field.selectionEnd = oldStart;
  //     } else if (!(field.value.indexOf('_') < 0) && flag) {
  //       field.selectionStart = oldStart + 1;
  //       field.selectionEnd = oldStart + 1;
  //     }
  //   }
  //   field.addEventListener('click', (e) => {
  //     if ( /\d/.test(e.target.value.charAt(field.selectionStart - 1)) ||  /\d/.test(e.target.value.charAt(field.selectionStart))) {
  //       smartfocus(false)
  //     } else {
  //       smartfocus(true)
  //     }
  //     if (field.value.indexOf('_') < 0) {
  //       e.target.classList.add('success')
  //     } else {
  //       e.target.classList.remove('success')
  //     }
  //   });
  //   field.addEventListener('keydown', (e) => {
  //     if (!(e.keyCode >= 48 && e.keyCode <= 57) && e.keyCode !== 8 && e.keyCode !== 46 && !(e.keyCode >= 96 && e.keyCode <= 105) && !(e.keyCode >= 37 && e.keyCode <= 40)) {
  //       e.preventDefault()
  //     }
  //     if (field.value.indexOf('_') < 0) {
  //       e.target.classList.add('success')
  //     } else {
  //       e.target.classList.remove('success')
  //     }
  //   });
  //   field.addEventListener('keyup', (e) => {
  //     if (e.keyCode == 8 || (e.keyCode >= 37 && e.keyCode <= 40)) {
  //       smartfocus(false)
  //     } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
  //       smartfocus(true)
  //     } else {
  //       e.preventDefault()
  //     }
  //     if (field.value.indexOf('_') < 0) {
  //       e.target.classList.add('success')
  //     } else {
  //       e.target.classList.remove('success')
  //     }
  //   })
  // }
}