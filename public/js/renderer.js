var renderer = {};

renderer.loadCSS = function () {
    var cssId = 'ledCSS';

    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = ledConfig.host + ledConfig.ledCssUrl;
        link.media = 'all';
        head.appendChild(link);
    }
}

renderer.renderDivs = function () {

    var html = '<div class="cleanslate"><div id="toolbox"><div id="handle"><b>Step 1: </b>Drag and Drop DOM elements</div><div id="loader" class="container" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div></div>';
    $("body").prepend(html);

    var opts = {handle: "#handle"};
    $("#toolbox").drags(opts);

    var html = '<div class="cleanslate"><div id="selectorBox"><div id="selectHandle"><b>Step 2: </b> Configure Options</div><div id="loader2" class="container""></div><input type="button" value="Generate Selector" onclick="generateSelector()" /><div id="cssSelector"></div></div></div>';
    $("body").prepend(html);

    var opts = {handle: "#selectHandle"};
    $("#selectorBox").drags(opts);

}



