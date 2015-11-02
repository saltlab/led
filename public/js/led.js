ledConfig = {

    host             : 'http://localhost:3000/',
    internalJsFiles  : {
        libDrags     : 'js/lib/drags.js',
        libMinisat   : 'js/lib/minisat.js',
        libPrototypes: 'js/lib/prototypes.js',
        renderer     : 'js/renderer.js',
        index        : 'js/index.js'
    },
    jquery       : 'https://code.jquery.com/jquery-2.1.4.min.js',

    ledCssUrl        : 'css/led.css',
    ledCheckId       : 'ledAddedInDom'
}

var initializeLED = function () {

    if (typeof jQuery == 'undefined') {
        var jqueryJsScript = document.createElement('script');
        jqueryJsScript.setAttribute('src', ledConfig.jquery);
        document.body.appendChild(jqueryJsScript);
    }

    if ($('#' + ledConfig.ledCheckId).length == 0) {
        var $ledCheckDiv = $('<div>').attr('id', ledConfig.ledCheckId).appendTo('body');

        var internalJsFiles = ledConfig.internalJsFiles;

        for (var key in internalJsFiles) {
            if (internalJsFiles.hasOwnProperty(key)) {
                var jsScript = document.createElement('script');
                jsScript.setAttribute('src', ledConfig.host + internalJsFiles[key]);
                document.body.appendChild(jsScript);
            }
         }

    }



}

initializeLED();