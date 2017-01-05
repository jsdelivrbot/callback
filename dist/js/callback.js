'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by BRenat on 04.01.2017.
 */
var defaults = {
  imgClose: 'img/close.png',
  imgLogo: 'http://localhost:8080/img/logo.png',
  color: {
    first: '#f49a00',
    second: '#fab900',
    phone: '#3CB868'
  },
  mask: '+ 7 (___) ___ - __ - __',
  position: 'bottom:20px; left:20px;'
};

var loadStyle = '<link href="https://cdn.rawgit.com/BrRenat/callback/master/dist/css/ifame.min.css" rel="stylesheet">';
var LoadScript = '<script src="https://cdn.rawgit.com/BrRenat/callback/master/dist/js/iframe.js"></script>';

var iframeScript = 'window.addEventListener("load", function(event) { \ndocument.querySelector(\'#phone\').simpleMask(\'+ 7 (___) ___ - __ - __\');\n});';

var CallMe = function () {
  function CallMe(options) {
    _classCallCheck(this, CallMe);

    this.options = Object.assign({}, defaults, options);
    this.elements = {
      modalClassNames: {
        bg: 'br-bg',
        wrap: 'br-wrap',
        container: 'br-container',
        content: 'br-content',
        form: 'br-form',
        open: 'cback'
      },
      modalBody: '<div class="br-container"><div class="br-content"><iframe class="br-iframe" name="frameForm" id="frameForm" src="" allowfullscreen></iframe></div></div>',
      modalClose: '<button class="br-close"><img src=' + this.options.imgClose + ' alt=""></button>',
      modalOpen: '<div class="cback-circle fn1"></div><div class="cback-circle fn2"></div><div class="cback-circle cback-circle--phone"><i class=\'phone-icon\'></i></div>',
      modalStyle: '.cback-circle {color: ' + this.options.color.phone + '; background: ' + this.options.color.phone + ';} .br-form__btn {background: ' + this.options.color.first + '} .br-form__btn:hover {background: ' + this.options.color.second + '}',
      modalIframe: '<div class="br-logo">\n\t\t\t\t\t\t<img src=' + this.options.imgLogo + ' alt="">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="br-text">\u0417\u0430\u043A\u0430\u0436\u0438\u0442\u0435 \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0437\u0432\u043E\u043D\u043E\u043A, <br> \u043C\u044B \u043F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u043C \u0412\u0430\u043C \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F!</div>\n\t\t\t\t\t<div class="br-form">\n\t\t\t\t\t\t<form action="#">\n\t\t\t\t\t\t\t<div class="br-form__group">\n\t\t\t\t\t\t\t\t<input type="text" placeholder="\u0412\u0430\u0448\u0435 \u0438\u043C\u044F" title="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F" required="" value="" name="username" id="username" class="br-form__input">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="br-form__group">\n\t\t\t\t\t\t\t\t<input type="phone" title="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043D\u043E\u043C\u0435\u0440" required="" value="" name="phone" id="phone" class="br-form__input">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class="br-form__btn">\u0416\u0434\u0443 \u0437\u0432\u043E\u043D\u043A\u0430</button>'
    };
    this.init();
  }

  _createClass(CallMe, [{
    key: 'init',
    value: function init() {
      this.render();
      this.clickHandler();
      // this.inputListener();
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      var _this = this;

      this.cbOpen.addEventListener('click', function (e) {
        _this.open();
        e.preventDefault();
      });
      this.cbClose.addEventListener('click', function (e) {
        _this.close();
        e.preventDefault();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      this.cbStyle = document.createElement('style');
      this.cbStyle.innerHTML = this.elements.modalStyle;
      document.head.appendChild(this.cbStyle);
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

      this.cbBody.querySelector('#frameForm').src = 'data:text/html;charset=utf-8,' + encodeURI('<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">' + loadStyle + LoadScript + this.elements.modalIframe + ('<script>' + iframeScript + '</script>'));
      this.cbBody = document.body.insertBefore(this.cbBody, document.body.firstChild);
      this.cbOverlay = document.body.insertBefore(this.cbOverlay, document.body.firstChild);
    }
  }, {
    key: 'open',
    value: function open() {
      this.cbBody.style.display = 'block';
      this.cbOverlay.style.display = 'block';
    }
  }, {
    key: 'close',
    value: function close() {
      this.cbBody.style.display = 'none';
      this.cbOverlay.style.display = 'none';
    }
  }]);

  return CallMe;
}();