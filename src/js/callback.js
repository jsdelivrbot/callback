/**
 * Created by BRenat on 10.12.2016.
 */
;
"use strict";
const modal = `<div class="cb-bg"></div> \
                <div class="cb-wrap"> \
                  <div class="cb-container"> \
                    <div class="cb-content"> \
                      <div class="cb"> \
                        It is callback!!! \
                      </div> \
                    </div> \
                  </div> \
               </div>`;
const modalClose = `<button id="close">Close callback</button>`;

const CallBack = function(name, target) {
  this.name = name;
  this.target = target;
};

CallBack.prototype = {
  constructor: CallBack,
  init:function() {
    this.render();
    this.clickHandler();
  },
  clickHandler: function() {
    $(this.target).off('click').on('click', () => {
      this.open()
    });
    $(this.cbClose).off('click').on('click', () => {
      this.close()
    });
  },
  render: function() {
    this.cbBody = $(modal);
    this.cbClose = $(modalClose);
    let content = this.cbBody.find('.cb-content');
    this.cbClose = this.cbClose.appendTo(content);
  },
  open: function() {
    $('body').prepend(this.cbBody);
    console.log(this.cbClose);
    console.log(this.cbBody);
  },
  close: function() {
    this.cbBody.remove();
  }
}
$.callBack = {
  proto: CallBack.prototype
}
$.fn.callBack = function() {
  let cb = new CallBack('callback-form',this);
  cb.init();
}







$('#open').callBack();