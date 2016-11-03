/*!
 * bootnotify.js
 *
 * An easy way to show Bootstrap's notifications.
 *
 * Elf Sundae
 * http://0x123.com
 * 2015-06-07
 */

/**
 * Usage:
 *
 * $().bootnotify(message, type, options);
 *
 * message: pass string to show bootnotify, pass other types to hide bootnotify.
 * type: alert type, can be: info; warning; success; danger; or custom .class suffix.
 * options:
 *
 * // show
 * $(...).bootnotify('message');
 * $(...).bootnotify('message', 'info');
 * $(...).bootnotify('message', 'danger', 'top');
 * $(...).bootnotify({...}, 'my-alert-type');
 *
 * // hide
 * $(...).bootnotify(false);
 * $(...).bootnotify(false, 'info');
 *
 * // show message from JSON (i.e. API result)
 * $(...).bootnotifyJSON({code: 1, msg: 'message'}, {position: 'top'})
 */
;
(function($) {
  "use strict";

  var defaultOptions = {
    title: null, // title for alert
    close: true, // show close button
    message: '',
    position: 'bottom', // 'top', 'bottom', 'after', 'before'
    animation: 'fade', // null, fade, slide,
    duration: 300
  };

  $.fn.bootnotify = function(options, type, position) {

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
      return this;
    }

    if (options === false) {
      $(this).find('.alert' + (type !== undefined ? ('-' + type) : '')).remove();
      return this;
    }

    if (options === undefined) {
      options = {};
    } else if (typeof(options) == 'string') {
      options = {
        message: options
      };
    }

    if (type === undefined) {
      type = 'info';
    }

    if (typeof(position) == 'string') {
      options.position = position;
    }

    options = $.extend({}, defaultOptions, options);

    var html = '<div role="alert" class="alert alert-' + type + (options.close ? ' alert-dismissible' : '') + '">';
    if (options.close) {
      html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    }
    if (options.title) {
      html += '<h4>' + options.title + '</h4>';
    }
    html += options.message;
    html += '</div>';

    $(this).find('.alert-' + type).remove();

    var alert = $(html).hide();
    if (options.position === 'top') {
      alert.prependTo($(this));
    } else if (options.position === 'after') {
      alert.insertAfter($(this));
    } else if (options.position === 'before') {
      alert.insertBefore($(this));
    } else {
      alert.appendTo($(this));
    }
    if (options.animation == 'fade') {
      alert.fadeIn(options.duration);
    } else if (options.animation == 'slide') {
      alert.slideDown(options.duration);
    } else {
      alert.show();
    }

    return alert;
  };

  $.fn.bootnotifyJSON = function(json, options) {
    $(this).bootnotify(false);

    if (typeof(options) != 'object') {
      options = {};
    }

    var type = 'success';
    if (json === undefined || json.code === undefined) {
      type = 'danger';
      options.message = 'BootnotifyJSON exception: invalid JSON.';
    } else if (1 == json.code) {
      options.message = (json.msg !== undefined ? json.msg : 'Succeed!');
    } else {
      type = 'danger';
      var msg = (json.msg !== undefined ? json.msg : 'Failed!');
      if (msg.indexOf('\n') > -1) {
        msg = msg.replace(new RegExp('\n', 'g'), '<br>');
      }
      options.message = msg;
    }
    return $(this).bootnotify(options, type);
  };
})(jQuery);
