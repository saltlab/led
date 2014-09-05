/*---------------------------------loading jQuery------------------------------------*/
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://code.jquery.com/jquery-2.1.1.js';    
document.getElementsByTagName('head')[0].appendChild(script);
/*---------------------------------loading jQuery------------------------------------*/



/*---------------------------------adding drags()------------------------------------*/
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);
/*---------------------------------adding drags()------------------------------------*/


/*---------------------------------injecting css-------------------------------------*/
function injectStyles(rule) {
  var div = $("<div />", {
    html: '&shy;<style>' + rule + '</style>'
  }).appendTo("body");    
}
/*---------------------------------injecting css-------------------------------------*/


/*---------------------------------adding toolbox------------------------------------*/
var obj = [];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("Text", getCSSPath($(ev.target),''));
}

function selectorExists(selector){
	var ret = 0;
	for(var i in obj) {
		if(obj[i]["selector"] == selector) {
			ret = 1;
		}
	}
	return ret;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    console.log(data);
    
    if(selectorExists(data) == 1) {
    	alert("Element already selected");
    } else {
	    var rgb = [];
	    var id = '';
	
		for(var i = 0; i < 3; i++) {
    		var num = Math.floor(Math.random() * 255);
    		rgb.push(num);
    		id = id + num;
		}
	
		id = "id_" + id;
	
		var html = 	'<div id="' + id + '" class="circleBase" style="background-color:rgb('+ rgb.join(',') +')" onmouseover=\'showOutline("'+id+'")\' onmouseout=\'hideOutline()\'>';
			html += '<div class="info tooltip">';
			html += data.trim().substring(data.lastIndexOf(' ') + 1).substring(0,20) + ' ...';
			html += '<span>';
			html += data.trim().split(" ").join("<br /><br />");
			html += '</span></div>';
			html += '<div class="arrow-cover">';
			html += '<div class="arrow-up" onclick="up(\''+ id +'\')"></div>';
			html += '<div class="arrow-down" onclick="down(\''+ id +'\')"></div>';
			html += '</div>';
			html += '<div id="' + id + '_negative" class="box negative" onclick="update(\'-1\',\''+ id +'\')">-</div>';
			html += '<div id="' + id + '_neutral" class="box" onclick="update(\'0\',\''+ id +'\')">0</div>';
			html += '<div id="' + id + '_positive" class="box positive selected" onclick="update(\'1\',\''+ id +'\')">+</div>';
			html += '<div id="' + id + '_positive" class="box delete" onclick="del(\''+ id +'\')">x</div>';
			html +=	'</div>';
	
	
		$(data).addClass("positiveHighlight");
		var item = {}
    
    	item["rgb"] = rgb.join(',');
		item["selector"] = data;
		item["role"] = 1;
		
   		obj[id] = item;
   		
		$("#loader").html($("#loader").html() + html);
	
		$("#loader").scrollTop(100000);
	}
}

function del(id) {
	$('#'+id).remove();
	$(obj[id]["selector"]).removeClass('positiveHighlight').removeClass('negativeHighlight').removeClass('runtimeHover').removeClass('show');
	delete obj[id];
	console.log(obj);
}

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function change(id, newSelector) {

	var prevSelector = obj[id]["selector"];
	$(prevSelector).removeClass('positiveHighlight').removeClass('negativeHighlight').removeClass('runtimeHover').removeClass('show');
	
	obj[id]["selector"] = newSelector;
	
	var role = obj[id]["role"];
	
	$('#' + id + ' .info').html(newSelector.trim().substring(newSelector.lastIndexOf(' ') + 1).substring(0,20) + ' ...' + '<span>' + newSelector.trim().split(" ").join("<br /><br />") + '</span>');
	console.log(document.querySelector(newSelector));
	if(role == '-1'){
		$(newSelector).addClass("negativeHighlight");
	}
	if(role == '1'){
		$(newSelector).addClass("positiveHighlight");
	}
	hideMenu();
}

function hideMenu() {
	 $("div.custom-menu").remove();
}
function up(id) {
	
	var prevSelector = obj[id]["selector"];
	var newSelector = prevSelector.trim().split(" ");
	
	if(newSelector.length > 1) {
		newSelector.pop();
		newSelector = newSelector.join(" ");
	
		change(id, newSelector);
	} else {
		alert("No more parent element exist. You are at the document root!");
	}	
}


function customMenu(elems, id) {

    $("div.custom-menu").remove();
    
    var html = '<div style="width:100%; overflow:auto; float:left; text-align:right"><a href="javascript: hideMenu()">X</a></div>';
    html += '<ul>';
    
    for(var i = 0; i < elems.length; i++) {
		var newSelector = elems[i].trim().substring(elems[i].lastIndexOf(' ') + 1)
    	html += '<li><a href="javascript:change(\''+id+'\',\''+elems[i]+'\')">';
    	html += newSelector;
    	html += '</a></li>';
    }
    
    html += '</ul>';
    
    $("<div class='custom-menu gradient'>" + html + "</div>")
        .appendTo("body")
        .css({top: event.pageY + "px", left: event.pageX + "px"});
	return false;
}


function down(id) {

	var prevSelector = obj[id]["selector"];
	
	var children = $(prevSelector).children();
	
	if(children.length == 0) {
		alert("No more child elements");
		return false;
	}
	var elems = [];
	
	children.each(function() {
		var newSelector = getCSSPath($(this),'');
		elems.push(newSelector);
	});
	
	customMenu(elems.getUnique(), id);
	
}

function update(role, id) {
	obj[id]["role"] = role;
	$('#' + id + '_negative').removeClass('selected');
	$('#' + id + '_neutral').removeClass('selected');
	$('#' + id + '_positive').removeClass('selected');
	$(obj[id]["selector"]).removeClass('positiveHighlight').removeClass('negativeHighlight');
	if(role == '-1'){
		$('#' + id + '_negative').addClass('selected');
		$(obj[id]["selector"]).addClass('negativeHighlight');
	} else if(role == '0'){
		$('#' + id + '_neutral').addClass('selected');
	} else if(role == '1'){
		$('#' + id + '_positive').addClass('selected');
		$(obj[id]["selector"]).addClass('positiveHighlight');
	}
}
function getCSSPath(element, prev){
	
	var id = element.attr('id');
	if(id == undefined || id == '')
		id = '';
	else
		id = '#' + id;
		
	var className = element.attr('class');
	if(className == undefined || className == '')
		className = '';
	else
		className = '.' + className.split(" ").join(".");
	className = className.replace(".runtimeHover","");
	className = className.replace(".positiveHighlight","");
	className = className.replace(".negativeHighlight","");
	className = className.replace(".show","");
		
	var tagName = element.prop('tagName');	
	if(tagName == undefined)
		return prev;
	
	if(prev != '')
		prev = tagName+id+className+' ' + prev;
	else
		prev = tagName+id+className;
	
	if(element.parent().length > 0) {
		return getCSSPath(element.parent(),prev);
	} else {
		return prev;
	}
}

function showOutline(id) {
	$(obj[id]["selector"]).each(function() {
		overlay($(this)[0]);
	});
}

function hideOutline() {
	removeOverlay();
}

var target = null;
$('*').attr("draggable","true");
$('*').attr("ondragstart","drag(event)");

$('*').each(function(){
	$(this).hover(
        function() { 
        	$('*').removeClass("runtimeHover"); 
        	
        	$(this).addClass("runtimeHover"); 
        	target = $(this);
        
        },
        function() { 
        	$(this).removeClass("runtimeHover");
        	
			
			if($(this).parent().length > 0) {
				$(this).parent().addClass("runtimeHover"); 
				target = $(this).parent();
			} else {
				target = null;
			}
		}
    );
    
});

injectStyles('.runtimeHover{outline:dashed 3px blue; outline-width: 3px}');

injectStyles('.positiveHighlight{outline:dashed 2px #4DDB94}');

injectStyles('.negativeHighlight{outline:dashed 2px #FF5C5C}');

injectStyles('.show{outline-width: 3px}');

injectStyles('#toolbox{position:fixed; top:20px; left:20px; min-height:100px; width:270px; z-index:99999; border:solid 3px #AAAAAA; background-color:#FFFFFF; opacity:0.9; overflow:auto}');

injectStyles('#handle{background-color: #CCCCCC; height:30px; width:100%; float:left}');

injectStyles('.circleBase { border-radius: 10px;overflow:auto; padding:20px; float:left; margin:5px;}');

injectStyles('#toolbox>.container{margin:0px auto; width:95%; overflow:auto; height:200px}');

injectStyles('.selected{outline: dotted 3px blue}');

injectStyles('.box{float: left; font-weight:bolder; overflow: visible; text-align: center; height: 30px; line-height: 30px; font-size:20px; width:30px; background-color: white; margin: 5px; cursor:pointer}');

injectStyles('.positive{background-color: #4DDB94}');

injectStyles('.negative{background-color: #FF5C5C}');

injectStyles('.delete{background-color: #666666; color:#ffffff}');

injectStyles('.arrow-cover{float:left; overflow: visible; height: 30px; width: 20px; margin:5px; cursor: pointer}');

injectStyles('.arrow-up {width: 0; height: 0; border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 10px solid black; margin-top: 2px}');

injectStyles('.arrow-down {width: 0; height: 0; border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid black; margin-top: 5px;}');

injectStyles('.clear{float: left; width:100%; height: 5px; overflow:auto}');

injectStyles('.info{width: 170px; background-color: #FFFFFF; color: #333333; margin:5px; overflow: auto; padding:5px}');

injectStyles('.custom-menu { z-index:999999; width: 150px; max-height: 300px; overflow:auto; position: absolute; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; padding: 5px;}');

injectStyles('.gradient{background: #cfe7fa; background: -moz-linear-gradient(top,  #cfe7fa 0%, #6393c1 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cfe7fa), color-stop(100%,#6393c1)); background: -webkit-linear-gradient(top,  #cfe7fa 0%,#6393c1 100%);  background: -o-linear-gradient(top,  #cfe7fa 0%,#6393c1 100%); background: -ms-linear-gradient(top,  #cfe7fa 0%,#6393c1 100%); background: linear-gradient(to bottom,  #cfe7fa 0%,#6393c1 100%);}');

injectStyles('.custom-menu ul{list-style-type: none; float: left; width: 110px}');

injectStyles('.custom-menu ul li{border-bottom: solid 1px white; margin-left: -30px; padding: 3px}');

injectStyles('.custom-menu ul li:hover{background-color: #AAAAAA;}');

injectStyles('.tooltip {outline:none; } .tooltip strong {line-height:30px;} .tooltip:hover {text-decoration:none;} .tooltip span {z-index:9999999;display:none; padding:14px 20px; margin-top:-30px; margin-left:28px; width:240px; line-height:16px;} .tooltip:hover span{display:inline; position:fixed; color:#111;border:1px solid #DCA; background:#fffAF0;} .callout {z-index:20;position:absolute;top:30px;border:0;left:-12px;} .tooltip span { border-radius:4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;-moz-box-shadow: 5px 5px 8px #CCC;-webkit-box-shadow: 5px 5px 8px #CCC;box-shadow: 5px 5px 8px #CCC;}');

var html = '<div id="toolbox"><div id="handle"><b>Step 1: </b>Drag and Drop DOM elements</div><div id="loader" class="container" ondrop="drop(event)" ondragover="allowDrop(event)"></div><input type="button" value="Generate Selector" onclick="generateSelector()" /></div>';
$("body").prepend(html);


var opts = {handle: "#handle"};
$("#toolbox").drags(opts);

/*---------------------------------adding toolbox------------------------------------*/


/*----------------------------adding selector generator------------------------------*/
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

var table = new Array();
var lookup = new Array();
Array.prototype.addRange = function(start,stop) {
  for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
    this.push(String.fromCharCode(idx));
  }
  return this;
};
lookup[0] = '0';
lookup.addRange('A','Z').join();
lookup.addRange('a','z').join();

table[0] = ' ';

function getTag(node) {
    var tag = '';
    tag = node.split(".")[0].split("#")[0];
    return tag;
}

function getID(node) {
    var id = '';
    if(node.indexOf("#") != -1) {
    	var indexHash = node.indexOf("#");
    	id = node.substring(indexHash).split(".")[0];
    }
    return id;
}
    
function getClasses(node) {
    var classes = new Array();
    if(node.indexOf(".") != -1) {
    	var indexDot = node.indexOf(".");
    	var temp = node.substring(indexDot);
    	console.log(temp);
    	temp = temp.substring(1);
    	classes = temp.split(".");
    }
	return classes;
}

function convert(sel) {
	for(var i=0; i < sel.length; i++) {
		var selector = sel[i].split(" ");
		for(j=0; j < selector.length; j++) {
			var id = getID(selector[j]);
			var tag = getTag(selector[j]);
			var css =  getClasses(selector[j]).sort();
			console.log(id);
			console.log(tag);
			console.log(css);
			
			var temp = "";
			if(tag != '') {
				if(table.indexOf(tag) > -1)
					temp += lookup[table.indexOf(tag)];
				else{
					table.push(tag);
					temp += lookup[table.indexOf(tag)];
				}
			}
			if(id != '') {
				if(table.indexOf(id) > -1)
					temp += lookup[table.indexOf(id)];
				else{
					table.push(id);
					temp += lookup[table.indexOf(id)];
				}
			}
			for(var k=0; k < css.length; k++) {
				if(table.indexOf('.'+css[k]) > -1)
					temp += lookup[table.indexOf('.'+css[k])];
				else{
					table.push('.'+css[k]);
					temp += lookup[table.indexOf('.'+css[k])];
				}
			}
			selector[j] = temp;
		}
		sel[i] = selector.join('0');
	}
	console.log(sel);
	console.log(table);
	return sel;
}

/*function lcs(a, b) {
  console.log("in lcs");
  var aSub = a.substr(0, a.length-1);
  var bSub = b.substr(0, b.length-1);
 
  if (a.length == 0 || b.length == 0) {
    return "";
  } else if (a.charAt(a.length-1) == b.charAt(b.length-1)) {
    return lcs(aSub, bSub) + a.charAt(a.length-1);
  } else {
    var x = lcs(a, bSub);
    var y = lcs(aSub, b);
    return (x.length > y.length) ? x : y;
  }
}*/

function lcs(x,y){
	var symbols = {},
		r=0,p=0,p1,L=0,idx,
		m=x.length,n=y.length,
		S = new Array(m<n?n:m);
	p1 = popsym(0);
	for(i=0;i < m;i++){
		p = (r===p)?p1:popsym(i);
		p1 = popsym(i+1);
		idx=(p > p1)?(i++,p1):p;
		if(idx===n){p=popsym(i);}
		else{
			r=idx;
			S[L++]=x.charCodeAt(i);
		}
	}
	var temp = S.toString('utf8',0,L).trim().split(",");
 	var ret = new Array();
 	
 	for(var i=0; i < temp.length; i++) {
 		ret.push(String.fromCharCode(temp[i]));
 	}
 	return ret.join("").trim();
 
	function popsym(index){
		var s = x[index],
			pos = symbols[s]+1;
		pos = y.indexOf(s,pos>r?pos:r);
		if(pos===-1){pos=n;}
		symbols[s]=pos;
		return pos;
	}
}

function getSelector(pos) {
	var positive = '';
	console.log("'" + pos + "'");
	var temp = pos.trim().split('');
	console.log(temp);
	var prev = '0';
	for(var i=0; i < temp.length; i++) {
		if(temp[i] == prev && prev == '0'){
		
		} else {
			var t = table[lookup.indexOf(temp[i])];
			if(t != undefined)
				positive += t;
			prev = temp[i];
		}
	}
	console.log("'" + positive + "'");
	return positive;
}

function filterBeforeID(positive) {
	var pos = positive.split(' ').reverse();

	var ret = new Array();
	
	for(var i=0; i < pos.length; i++) {
		
		
		var id = getID(pos[i]);
		var tag = getTag(pos[i]);
		var css =  getClasses(pos[i]).sort();
		
		if(id != '') {
			ret.push(id);
			break;
		} else {
			ret.push(pos[i]);
		}
	}
	return ret.reverse().join(' ');
}

function merge(pos) {
	if(pos.length == 0)
		return false;
		
	pos = convert(pos);
	var len = pos.length;
	for(var i=0; i < len - 1; i++) {
		var temp1 = pos.shift();
		var temp2 = pos[0];
		console.log("calling lcs");
		console.log(pos[0]);
		pos[0] = lcs(temp1, temp2);
		console.log(pos[0]);
	}
	var positive = getSelector(pos[0]);
	console.log("'" + positive + "'");
	
	if(positive != '') {
		positive = filterBeforeID(positive);
		console.log(positive);
		return positive;
	} else {
		return false;
	}
	
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}

function childElementsOverlap(pos) {
	
	var sameTag = true;
	var sameClass = true;
	
	var tags = new Array();
	var classes = new Array();
	
	for(var i=0; i < pos.length; i++) {
		var temp = pos[i].substr(pos[i].lastIndexOf(" ") + 1);
		var tag = getTag(temp);
		var css = getClasses(temp);
		tags.push(tag);
		classes.push(css);	
	}
	
	var t = tags[0];
	for(var i=0; i < tags.length; i++) {
		if(tags[i] != t)
			sameTag = false;
	}
	
	var common = classes[0];
	
	for(var i=1; i < classes.length; i++) {
		common = intersect(common,classes[i]);
	}
	if(common.length == 0)
		sameClass = false;
	
	return (sameTag || sameClass);
}

function process(posSelector) {

	var numElements = document.querySelectorAll(posSelector).length;
	
	var sequence = posSelector.split(' ');
	
	var parentID = getID(sequence[0]);
	var counter = sequence.length;
	
	if(parentID != '') {
		parentID = parentID + " ";
		counter--;
	} 
	sequence.reverse();
	var final = "";
	
	for(var i=0; i < counter; i++) {
		
		console.log(sequence[i]);
		var tag = getTag(sequence[i]);
		var css = getClasses(sequence[i]);
			
		var c = "";
		
		if(css.length > 0) {
			c = "." + css.join(".");

			for(var j=0; j < css.length; j++) {
				
				if(numElements == document.querySelectorAll("." + css[j] + " " + final).length) {
					return "." + css[j] + " " + final;
			
				} else if(numElements == document.querySelectorAll(tag + "." + css[j] + " " + final).length) {
					return tag + "." + css[j] + " " + final;
			
				} else if(numElements == document.querySelectorAll(parentID + "." + css[j] + " " + final).length) {
					return parentID + "." + css[j] + " " + final;
			
				} else if(numElements == document.querySelectorAll(parentID + tag + "." + css[j] + " " + final).length) {
					return parentID + tag + "." + css[j] + " " + final;
		
				}
			}
		}
		
		
		if(tag != '') {
			if(numElements == document.querySelectorAll(tag + " " + final).length) {
				return tag + " " + final;
			
			}
		} 
		if(parentID != '') {
		 	if(numElements == document.querySelectorAll(parentID + tag + " " + final).length) {
				return parentID + tag + " " + final;
			
			}
		}	
		final =  tag + c + " " + final;
		console.log(final);	
	}
	return posSelector;
	
}

function getISequence(sequence, i) {
	
	var ret = new Array();
	for(var j=0; j < sequence.length; j++) {
		if(i != j)
			ret.push(sequence[j]);
	}
	return ret.join(" ");
}

function contract(posSelector) {
	
	console.log("in contract");
	console.log(posSelector);
	console.log(document.querySelectorAll(posSelector));
	
	var numElements = document.querySelectorAll(posSelector).length;
	
	var sequence = posSelector.trim().split(" ");
	
	if(sequence.length > 1) {
		for(var i=0; i < sequence.length - 1; i++) {
			var s = getISequence(sequence, i);
			console.log(sequence);
			console.log(i);
			console.log("'" + s + "'");
			if(numElements == document.querySelectorAll(s)) {
				return contract(posSelector);
			}
		}
	}
	return posSelector;
}

function generateSelector() {

	var pos = new Array();
	var neg = new Array();
	var posElems = new Array();
	var negElems = new Array();
	
	for(var i in obj) {
		if(obj[i]["role"] == "-1") {
			neg.push(obj[i]["selector"]);
			$(obj[i]["selector"]).each(function() {
				negElems.push($(this));
			});
		}
		if(obj[i]["role"] == "1") {
			pos.push(obj[i]["selector"]);
			$(obj[i]["selector"]).each(function() {
				posElems.push($(this));
			});
		}
	}
	
	if(pos.length == 0) {
		alert("Please provide some positive examples");
		return false;
	} 
	if(!childElementsOverlap(pos)) {
		alert("Selected positive examples do not match. Please provide different examples");
		return false;
	}
	console.log(neg);
	posSelector = merge(pos.slice());
	negSelector = merge(neg.slice());
	console.log(neg);
	
	if(posSelector != false) {
		console.log("Selector found");
		
		var compactPos = contract(process(posSelector));
		var selectedElems = $(compactPos);
		var rejectedElems = new Array();
		
		var compactNeg = '';
		
		if(negSelector != false) {
			compactNeg = contract(process(negSelector));	
			selectedElems = $(compactPos).not(compactNeg);
		}
		
		
		if (neg.length > 0) {
			console.log(neg);
			rejectedElems = $(neg.join(","));
		}
		console.log(selectedElems);
		console.log(rejectedElems);
		
		var selectedElemsJS = new Array();
		var rejectedElemsJS = new Array();
		
		for(var i=0; i < selectedElems.length; i++) {
			selectedElemsJS.push(selectedElems[i]);
		}
		for(var i=0; i < rejectedElems.length; i++) {
			rejectedElemsJS.push(rejectedElems[i]);
		}
		console.log(selectedElemsJS)
		
		var reject = [];
		var accept = [];

		for(var i=0; i < rejectedElemsJS.length; i++) {
			if(selectedElemsJS.indexOf(rejectedElemsJS[i]) > -1) {
				reject.push(i);
			} else {
				accept.push(i);
			}
		}
		
		var ret = {
			"positive"	: compactPos,
			"negative"	: compactNeg,
			"accept"	: accept,
			"reject"	: reject 
		
		};		
		console.log(ret);
		addToSelectors(ret);
		return true;
	} else {
		alert("Unable to find a common selector. Please try with different examples");
		return false;
	}
}
/*----------------------------adding selector generator------------------------------*/


injectStyles('#selectorBox{position:fixed; top:300px; left:20px; min-height:100px; width:270px; z-index:99999; border:solid 3px #AAAAAA; background-color:#FFFFFF; opacity:0.9; overflow:auto}');

injectStyles('#selectHandle{background-color: #CCCCCC; height:30px; width:100%; float:left}');

injectStyles('#selectorBox>.container{margin:0px auto; width:95%; overflow:auto; height:200px}');

injectStyles('.overlay{position: absolute; background-color: #58ACFA; opacity: 0.8; border: solid 1px #08298A; z-index: 123456}');

var html = '<div id="selectorBox"><div id="selectHandle"><b>Step 2: </b> Generate DOM element selector</div><div id="loader2" class="container""></div></div>';
$("body").prepend(html);


var opts = {handle: "#selectHandle"};
$("#selectorBox").drags(opts);



/*--------------------------------Selector Handler-----------------------------------*/

var selector = [];
var led = [];


function overlay(element) {
	console.log(element);
	var rect = element.getBoundingClientRect();
	console.log(rect);
	var elem = document.createElement("div");
	document.body.appendChild(elem);
	elem.className = 'overlay';
	elem.style.left = rect.left + 'px';
	elem.style.top = rect.top + 'px';
	elem.style.height = rect.height + 'px';
	elem.style.width = rect.width + 'px';
	console.log(elem);
}

function addOverlay(index){

	var ret = selector[index];
	
	var elem = $(ret.positive).not(ret.negative);
	
	var counter = 0;
	elem.each(function(){
		var e = $(this)[0];
		console.log(ret.reject.indexOf(counter));
		if(ret.reject.indexOf(counter) == -1) {
			overlay(e);
		}
		counter ++;
	});
}

function removeOverlay() {
	$('.overlay').remove();
}

function createLED(val, index) {
	if(val != '') {
		var item = [];
		item['val'] = val;
		item['index'] = index;
		led.push(item);
	}	
}

function retExist(ret) {
	for (var i=0; i<selector.length; i++) {
		if (JSON.stringify(selector[i]) === JSON.stringify(ret) ) {
			return i;
		}
    }
    return -1;
}

function addToSelectors(ret){
	
	if(retExist(ret) != -1) {
		var index = retExist(ret);
		var id = "Selector_" + index;
		alert("Selector already exists with id " + id);
		return false;	
	}
	
	selector.push(ret);
	
	var index = selector.indexOf(ret);
	var id = "Selector_" + index;
	
	var html = '';
	html += '<div class="selectBox" id="' + id + '">';
	html += '<center><span class="tooltip"><b onclick="createLED('+index+')" onmouseover="addOverlay('+index+')" onmouseout="removeOverlay()">' + id + '</b><span><b>Positive Selector: </b>' + ret.positive + ' <br /><br /><b>Negative Selector: </b>' + ret.negative + ' <br /><br /><b>Accepted Index: </b>' + ret.accept.join(',') + ' <br /><br /><b>Rejected Index: </b>' + ret.reject.join(',') + ' </span></span><center>';
//	html += '<select onchange="createLED(this.value,'+index+')">';
//		html += '<option value="">Select..</a>';
//		html += '<option value="all">Select all elements</a>';
//		html += '<option value="positive">Select only positive elements</a>';
//		html += '<option value="negative">Select all except negative elements</a>';
//		html += '<option value="first">Select first element</a>';
//		html += '<option value="last">Select last element</a>';
//		html += '<option value="byIndex">Select elements by index</a>';
//	html += '</select>';
	html += '<hr style="margin:0px">';
	html += '</div>';
	
	$('#selectorBox .container').append(html);

}

/*--------------------------------Selector Handler-----------------------------------*/


/*---------------------------------Code Generator------------------------------------*/

/*injectStyles('#selectorBox{position:fixed; top:300px; left:20px; min-height:100px; width:270px; z-index:99999; border:solid 3px #AAAAAA; background-color:#FFFFFF; opacity:0.9; overflow:auto}');

injectStyles('#selectHandle{background-color: #CCCCCC; height:30px; width:100%; float:left}');

injectStyles('#selectorBox>.container{margin:0px auto; width:95%; overflow:auto; height:200px}');

injectStyles('.overlay{position: absolute; background-color: #58ACFA; opacity: 0.8; border: solid 1px #08298A; z-index: 123456}');

var html = '<div id="selectorBox"><div id="selectHandle"><b>Step 2: </b> Pick CSS Selector</div><div id="loader2" class="container""></div></div>';
$("body").prepend(html);


var opts = {handle: "#selectHandle"};
$("#selectorBox").drags(opts);


*/
/*---------------------------------Code Generator------------------------------------*/


/*
One might think the merging is easy based on hierqarchy
but this is not true
because of class name
attach smae class names that might be completely unre;lated
Merging is challenging
*/
