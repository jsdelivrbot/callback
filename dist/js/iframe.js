'use strict';

/**
 * Created by BRenat on 06.01.2017.
 */
HTMLElement.simpleMask = function (mask) {
  var _this = this;

  mask = mask.split('');
  var field = this;
  field.setAttribute('placeholder', mask);
  var stripMask = function stripMask(maskedData) {
    function isDigit(char) {
      return (/\d/.test(char)
      );
    }
    return maskedData.split('').filter(isDigit);
  };
  var applyMask = function applyMask(data) {
    return mask.map(function (char, index) {
      if (char != '_' && index != 2) return char;
      if (data.length == 0) return char;
      return data.shift();
    }).join('');
  };
  var reapplyMask = function reapplyMask(data) {
    return applyMask(stripMask(data));
  };
  var smartfocus = function smartfocus(flag) {
    var oldStart = field.selectionStart;
    var oldEnd = field.selectionEnd;
    field.value = reapplyMask(field.value);
    if (field.value.indexOf('_') >= 0 && flag) {
      _this.setCursor(field, field.value.indexOf('_'));
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
  field.addEventListener('keydown', function (e) {
    if (!(e.keyCode >= 48 && e.keyCode <= 57) && e.keyCode !== 8 && e.keyCode !== 46 && !(e.keyCode >= 96 && e.keyCode <= 105) && !(e.keyCode >= 37 && e.keyCode <= 40)) {
      e.preventDefault();
    }
    if (field.value.indexOf('_') < 0) {
      e.target.classList.add('success');
    } else {
      e.target.classList.remove('success');
    }
  });
  field.addEventListener('keyup', function (e) {
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
};