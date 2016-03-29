# Copyright (c) 2015-2016 Benoit Asselin, http://161.io
#'use strict'

# Alternative Retina.js : loading issues

win = window
$ = win.jQuery

# @return {Boolean}
isRetina = ->
    return true if win.devicePixelRatio > 1
    mediaQuery = '(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)';
    return true if win.matchMedia && win.matchMedia(mediaQuery).matches
    false

# Load images -2x
load2x = ->
    suffix = '-2x'
    regexMatch = /\.\w+$/

    # @param {String} str
    # @return {String}
    suffixReplace = (str) ->
        suffix + str

    $('img:not([data-no-retina])').each ->
        $img = $(@)
        parts = $img.attr('src').split '?'
        parts[0] = parts[0].replace regexMatch, suffixReplace
        src2 = parts.join '?'

        $tmpImg = $('<img>')
        $tmpImg.on 'load', ->
            setTimeout( ->
                attr = {
                    'src': src2
                }
                attr['width'] if $img.width()
                attr['height'] if $img.height()
                $img.attr attr
                return
            , 10)
            return

        $tmpImg.attr 'src', src2
        return

# Start
if isRetina()
    $(win).on 'load', load2x
