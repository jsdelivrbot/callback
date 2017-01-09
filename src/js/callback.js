/**
 * Created by BRenat on 04.01.2017.
 */
const defaults = {
  imgClose : 'img/close.png',
  imgLogo : 'img/logo.png',
  color : {
    first : '#f49a00',
    second : '#fab900',
    phone : '#3CB868'
  },
  mask : `+ 7 (___) ___ - __ - __`,
  position : 'bottom:20px; left:20px;',
  baseURL : 'https://cdn.rawgit.com/BrRenat/callback/master/dist/'
}

const iframeScript = `window.addEventListener("load", function(event) { 
                        document.querySelector('#phone').simpleMask(mask);
                        sendForm();
                      });`

class CallMe {
  constructor(options) {
    this.name = 'br_' +  Math.random().toString(36).substring(7);
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
      loadStyle : `<link href="${this.options.baseURL}css/ifame.min.css" rel="stylesheet">`,
      loadScript : `<script src="${this.options.baseURL}js/iframe.js"></script>`,
      modalBody: '<div class="br-container"><div class="br-content"><iframe class="br-iframe" name="frameForm" id="frameForm" src="" allowfullscreen></iframe></div></div>',
      modalClose : `<button class="br-close"><img src=${this.options.imgClose} alt=""></button>`,
      modalOpen : `<div class="cback-circle fn1"></div><div class="cback-circle fn2"></div><div class="cback-circle cback-circle--phone"><i class='phone-icon'></i></div>`,
      modalStyle : `#${this.name}.cback {${this.options.position}} #${this.name} .cback-circle {color: ${this.options.color.phone}; background: ${this.options.color.phone};}`,
      formStyle : `.br-form__btn {background: ${this.options.color.first}} .br-form__btn:hover {background: ${this.options.color.second}}`,
      modalIframe : `<div class="br-logo">
						<img src=${this.options.imgLogo} alt="">
					</div>
					<div class="br-text">Закажите обратный звонок, <br> мы перезвоним Вам в ближайшее время!</div>
					<div class="br-form">
						<form action="#" method="POST">
							<div class="br-form__group">
								<input type="text" placeholder="Ваше имя" title="Введите ваше имя" required value="" name="username" id="username" class="br-form__input">
							</div>
							<div class="br-form__group">
								<input type="phone" title="Введите ваш номер" required value="" name="phone" id="phone" class="br-form__input">
							</div>
							<input type="submit" id="send" class="br-form__btn" value="Жду звонка">
						</form>
					</div>`
    }
    this.init();
  }
  init() {
    this.render();
    this.clickHandler();
    this.open();
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
    this.cbOpen = document.createElement('div');
    this.cbOpen.classList.add(this.elements.modalClassNames.open);
    this.cbOpen.id = this.name;
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

    this.cbBody.querySelector('#frameForm').src = 'data:text/html;charset=utf-8,' +
      encodeURI('<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">'+
        this.elements.loadStyle + `<style>${this.elements.formStyle}</style>` +
        this.elements.loadScript + this.elements.modalIframe +
        `<script>var mask = "${this.options.mask}"; ${iframeScript}</script>`);
  }
  open() {
    this.cbBody = document.body.insertBefore(this.cbBody, document.body.firstChild);
    this.cbOverlay = document.body.insertBefore(this.cbOverlay, document.body.firstChild);
  }
  close() {
    this.cbBody.remove();
    this.cbOverlay.remove();
  }
}

if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}