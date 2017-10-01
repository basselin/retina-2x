(function() {
  var $, isRetina, load2x, win;

  win = window;

  $ = win.jQuery;

  isRetina = function() {
    var mediaQuery;
    if (win.devicePixelRatio > 1) {
      return true;
    }
    mediaQuery = '(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)';
    if (win.matchMedia && win.matchMedia(mediaQuery).matches) {
      return true;
    }
    return false;
  };

  load2x = function() {
    var data2x, regexMatch, suffix, suffixReplace;
    suffix = '-2x';
    regexMatch = /\.\w+$/;
    data2x = 'r2x';
    suffixReplace = function(str) {
      return suffix + str;
    };
    return $('img:not([data-no-retina])').each(function() {
      var $img, $tmpImg, parts, src2;
      $img = $(this);
      if ($img.data(data2x)) {
        src2 = $img.data(data2x);
      } else {
        parts = $img.attr('src').split('?');
        parts[0] = parts[0].replace(regexMatch, suffixReplace);
        src2 = parts.join('?');
      }
      $tmpImg = $('<img>');
      $tmpImg.on('load', function() {
        setTimeout(function() {
          var attr;
          attr = {
            'src': src2
          };
          if ($img.width()) {
            attr['width'] = $img.width();
          }
          if ($img.height()) {
            attr['height'] = $img.height();
          }
          $img.attr(attr);
        }, 10);
      });
      $tmpImg.attr('src', src2);
    });
  };

  if (isRetina()) {
    $(win).on('load', load2x);
  }

}).call(this);

//# sourceMappingURL=retina-2x.js.map
