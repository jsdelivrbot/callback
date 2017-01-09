/**
 * Created by BRenat on 06.01.2017.
 */
HTMLInputElement.prototype.simpleMask = function(mask){
  let field = this;
  field.setAttribute('placeholder',mask);
  mask = mask.split('');
  let stripMask = (maskedData) => {
    function isDigit(char,index) {
      return /\d/.test(char) && mask[index] == '_';
    }
    return maskedData.split('').filter(isDigit);
  }
  let applyMask = (data) =>
    mask.map(function(char, index) {
      if (char != '_') return char;
      if (data.length == 0) return char;
      return data.shift();
    }).join('')

  let smartfocus = (flag) => {
    let oldStart = field.selectionStart;
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
  field.addEventListenerMulti('keydown keyup', (e) => {
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
  });
  let setCursor = (elem, caretPos) => {
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
}
Object.prototype.addEventListenerMulti = function(s, fn) {
  s.split(' ').forEach(e => this.addEventListener(e, fn));
}


function sendForm() {
  let btn = document.querySelector('#send');
  let phone = document.querySelector('#phone');
  let name = document.querySelector('#username');
  btn.addEventListener('click',()=>{
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://calc.kontidom.qx2.ru/index.php');
    xhr.send({
      "data": 1,
      "type": "BOOK_VIEWED"
    });
  })
}