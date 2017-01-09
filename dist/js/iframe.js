'use strict';

/**
 * Created by BRenat on 06.01.2017.
 */
HTMLInputElement.prototype.simpleMask = function (mask) {
  var field = this;
  field.setAttribute('placeholder', mask);
  mask = mask.split('');
  var stripMask = function stripMask(maskedData) {
    function isDigit(char, index) {
      return (/\d/.test(char) && mask[index] == '_'
      );
    }
    return maskedData.split('').filter(isDigit);
  };
  var applyMask = function applyMask(data) {
    return mask.map(function (char, index) {
      if (char != '_') return char;
      if (data.length == 0) return char;
      return data.shift();
    }).join('');
  };

  var smartfocus = function smartfocus(flag) {
    var oldStart = field.selectionStart;
    field.value = applyMask(stripMask(field.value));
    if (field.value.indexOf('_') >= 0 && flag) {
      setCursor(field, field.value.indexOf('_'));
    } else if (!flag) {
      field.selectionStart = oldStart + 1;
      field.selectionEnd = oldStart;
    } else if (!(field.value.indexOf('_') < 0) && flag) {
      field.selectionStart = oldStart + 1;
      field.selectionEnd = oldStart + 1;
    }
  };
  field.addEventListener('click', function (e) {
    if (/\d/.test(e.target.value.charAt(field.selectionStart - 1)) || /\d/.test(e.target.value.charAt(field.selectionStart))) {
      smartfocus(false);
    } else {
      smartfocus(true);
    }
    if (field.value.indexOf('_') < 0) {
      e.target.classList.add('success');
    } else {
      e.target.classList.remove('success');
    }
  });
  field.addEventListenerMulti('keydown keyup', function (e) {
    if (e.keyCode == 8 || e.keyCode >= 37 && e.keyCode <= 40) {
      smartfocus(false);
    } else if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
      smartfocus(true);
    } else {
      e.preventDefault();
    }
    if (field.value.indexOf('_') < 0) {
      e.target.classList.add('success');
    } else {
      e.target.classList.remove('success');
    }
  });
  var setCursor = function setCursor(elem, caretPos) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else elem.focus();
    }
  };
};
Object.prototype.addEventListenerMulti = function (s, fn) {
  var _this = this;

  s.split(' ').forEach(function (e) {
    return _this.addEventListener(e, fn);
  });
};

function sendForm() {
  var btn = document.querySelector('#send');
  var phone = document.querySelector('#phone');
  var name = document.querySelector('#username');
  btn.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://calc.kontidom.qx2.ru/index.php');
    xhr.send({
      "data": 1,
      "type": "BOOK_VIEWED"
    });
  });
}