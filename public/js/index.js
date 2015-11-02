prototypes.addPrototypes();
drags.addJqueryDrags();

renderer.loadCSS();
renderer.renderDivs();


var debug = 1;


var map         	= [];
map[0]          	= 0;

var input       	= [];
var output      	= [];
var avoid       	= [];
var prevCnf     	= '';
var variables   	= [];
var ignore      	= [];
var combinations	= [];

function getTag(node) {
    var tag = '';
    tag = node.split(".")[0].split("#")[0];
    if(ignore.indexOf(tag) == -1)
        return tag;
    else
        return '';
}

function getID(node) {
    var id = '';
    if(node.indexOf("#") != -1) {
        var indexHash = node.indexOf("#");
        id = node.substring(indexHash).split(".")[0];
    }
    if(ignore.indexOf(id) == -1)
        return id;
    else
        return '';
}

function getClasses(node) {
    var classes = new Array();
    if(node.indexOf(".") != -1) {
        var indexDot = node.indexOf(".");
        var temp = node.substring(indexDot);
        temp = temp.substring(1);
        classes = temp.split(".");
    }
    var ret = [];
    for(var i=0; i<classes.length; i++) {
        if(ignore.indexOf('.' + classes[i]) == -1)
            ret.push('.' + classes[i]);
    }
    return ret;
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

function getParentSelector(selector) {
    var temp = selector.split(' ');
    temp.pop();
    return temp.join(' ').trim();
}

function getNode(selector) {
    var temp = selector.split(" ");
    temp.reverse();
    return temp[0];
}

function getIDSequences(parentSelector, maxDepth, IDSequences) {

    if(parentSelector != '' && maxDepth > 0) {
        var counter     = IDSequences.length;

        for(var i=0; i<counter; i++) {

            var ret         = IDSequences[0];
            IDSequences.shift();

            var tempParentSelector  = parentSelector;
            var tempRet             = ret;
            var tempMaxDepth        = maxDepth;

            for( var j=0; j<parentSelector.split(' ').length; j++) {
                var node            = getNode(tempParentSelector);
                var id              = getID(node);
                tempParentSelector  = getParentSelector(tempParentSelector);

                var tempIDSequencesSkip = [];
                tempIDSequencesSkip.push(tempRet);
                IDSequences = IDSequences.concat(getIDSequences(tempParentSelector,tempMaxDepth,tempIDSequencesSkip));


                if(id != '') {
                    id = id + ' ';
                }
                var tempIDSequences = [];
                tempIDSequences.push(id + tempRet);
                var p = tempMaxDepth - j - 1;
                IDSequences = IDSequences.concat(getIDSequences(tempParentSelector,tempMaxDepth - j - 1,tempIDSequences));
            }

        }
    }
    return IDSequences;
}

function getTagSequences(parentSelector, maxDepth, tagSequences) {

    if(parentSelector != '' && maxDepth > 0) {
        var counter     = tagSequences.length;

        for(var i=0; i<counter; i++) {

            var ret         = tagSequences[0];
            tagSequences.shift();

            var tempParentSelector  = parentSelector;
            var tempRet             = ret;
            var tempMaxDepth        = maxDepth;

            for( var j=0; j<parentSelector.split(' ').length; j++) {
                var node            = getNode(tempParentSelector);
                var tag              = getTag(node);
                tempParentSelector  = getParentSelector(tempParentSelector);

                var tempTagSequencesSkip = [];
                tempTagSequencesSkip.push(tempRet);
                tagSequences = tagSequences.concat(getTagSequences(tempParentSelector,tempMaxDepth,tempTagSequencesSkip));


                if(tag != '') {
                    tag = tag + ' ';
                }
                var tempTagSequences = [];
                tempTagSequences.push(tag + tempRet);
                tagSequences = tagSequences.concat(getTagSequences(tempParentSelector,tempMaxDepth - j - 1,tempTagSequences));
            }
        }
    }
    return tagSequences;
}

function getClassSequences(parentSelector, maxDepth, classSequences) {

    if(parentSelector != '' && maxDepth > 0) {
        var counter     = classSequences.length;

        for(var i=0; i<counter; i++) {

            var ret         = classSequences[0];
            classSequences.shift();

            var tempParentSelector  = parentSelector;
            var tempRet             = ret;
            var tempMaxDepth        = maxDepth;

            for( var j=0; j<parentSelector.split(' ').length; j++) {
                var node            = getNode(tempParentSelector);
                var classes         = getClasses(node);
                tempParentSelector  = getParentSelector(tempParentSelector);

                var tempClassSequencesSkip = [];
                tempClassSequencesSkip.push(tempRet);
                classSequences = classSequences.concat(getClassSequences(tempParentSelector,tempMaxDepth,tempClassSequencesSkip));


                for(var k=0; k<classes.length; k++) {
                    var tempClassSequences = [];
                    tempClassSequences.push(classes[k] + ' ' + tempRet);
                    classSequences = classSequences.concat(getClassSequences(tempParentSelector,tempMaxDepth - j - 1,tempClassSequences));
                }
            }
        }
    }
    return classSequences;
}

function isMixed(mixSequence) {
    var tags 	= 0;
    var classes = 0;
    var ids 	= 0;


    var nodes 	= mixSequence.trim().split(' ');
    for(i=0; i<nodes.length; i++){

        var node = nodes[i];
        var id              = getID(node);
        var tag             = getTag(node);
        var css         = getClasses(node);

        if(id.trim() != '')
            ids 	= 1;

        if(tag.trim() != '')
            tags 	= 1;

        if(css.length > 0)
            classes 	= 1;

    }

    var ret = tags + classes + ids;
    if(mixSequence.trim() == "body div") {
        alert(mixSequence);
        alert(tags);
        alert(classes);
        alert(ids);

    }
    return (ret > 1);
}
function getMixSequences(parentSelector, maxDepth, mixSequences) {

    if(parentSelector != '' && maxDepth > 0) {
        var counter     = mixSequences.length;

        for(var i=0; i<counter; i++) {

            var ret         = mixSequences[0];
            mixSequences.shift();

            var tempParentSelector  = parentSelector;
            var tempRet             = ret;
            var tempMaxDepth        = maxDepth;

            for( var j=0; j<parentSelector.split(' ').length; j++) {
                var node            = getNode(tempParentSelector);
                var mix             = [];
                var id              = getID(node);
                var tag             = getTag(node);
                var classes         = getClasses(node);
                tempParentSelector  = getParentSelector(tempParentSelector);

                if(!options['id']['allowed'])
                    id = '';

                if(!options['tag']['allowed'])
                    tag = '';

                if(!options['classes']['allowed'])
                    classes = [];

                if(id != '')
                    mix.push(id);
                if(tag != '')
                    mix.push(tag);
                mix = mix.concat(classes);

                var tempMixSequencesSkip = [];
                tempMixSequencesSkip.push(tempRet);
                mixSequences = mixSequences.concat(getMixSequences(tempParentSelector,tempMaxDepth,tempMixSequencesSkip));


                for(var k=0; k<mix.length; k++) {
                    var tempMixSequences = [];
                    tempMixSequences.push(mix[k] + ' ' + tempRet);
                    mixSequences = mixSequences.concat(getMixSequences(tempParentSelector,tempMaxDepth - j - 1,tempMixSequences));
                }
            }
        }
    }
    return mixSequences;
}

function getDepth(data) {
    return data.split(" ").length;
}

function using(sequence, use) {
    if(use.length <= 0) {
        return true;
    } else {
        var temp = sequence.trim().split(' ');
        for(var i=0; i<temp.length; i++) {
            var id              = getID(temp[i]);
            var tag             = getTag(temp[i]);
            var classes         = getClasses(temp[i]);
            use.remove(id);
            use.remove(tag);
            for(var j=0; j<classes.length; j++) {
                use.remove(classes[j]);
            }
        }
        return (use.length == 0);
    }
}

function generateIDSequences(selector, options) {


    var temp 			= selector.split(',');
    selector 			= temp[0].trim();
    var ps 				= '';
    if(temp.length > 1)
        ps = temp[1];

    if(selector.length > 0) {
        var parentSelector  = getParentSelector(selector);
        var node            = getNode(selector);
        var id              = getID(node);
        var tag             = getTag(node);
        var classes         = getClasses(node);
        var minDepth        = 0;//options['depth'];



        if(options['id']['allowed'] == true && id != '') {

            var maxDepth = options['depth'];
            maxDepth--;
            if(ps != '')
                maxDepth--;

            var IDSequences = [];
            IDSequences.push(id);
            if(parentSelector != '') {
                IDSequences = getIDSequences(parentSelector, maxDepth, IDSequences).unique();
            }
            for(var j=0; j<IDSequences.length; j++) {
                var IDSequence = IDSequences[j];
                if(ps != '')
                    IDSequence = ps + ' ' + IDSequence;
                if(getDepth(IDSequence) >= minDepth && using(IDSequence,options['use'].slice(0))) {
                    var index = -1;
                    IDSequence = filterBeforeID(IDSequence);
                    index = map.indexOf(IDSequence);
                    if(index == -1) {
                        map.push(IDSequence);
                        index = map.indexOf(IDSequence);
                    }
                    variables.push(index);
                }
            }
        }
    } else {
        var index = -1;
        IDSequence = ps;
        index = map.indexOf(IDSequence);
        if(index == -1) {
            map.push(IDSequence);
            index = map.indexOf(IDSequence);
        }
        variables.push(index);
    }
}

function generateTagSequences(selector, options) {

    var temp 			= selector.split(',');
    selector 			= temp[0].trim();
    var ps 				= '';
    if(temp.length > 1)
        ps = temp[1];

    if(selector.length > 0) {
        var parentSelector  = getParentSelector(selector);
        var node            = getNode(selector);
        var id              = getID(node);
        var tag             = getTag(node);
        var classes         = getClasses(node);
        var minDepth        = 0;//options['depth'];

        if(options['tag']['allowed'] == true && tag != '') {

            var maxDepth = options['depth'];
            maxDepth--;
            if(ps != '')
                maxDepth--;

            var tagSequences = [];
            tagSequences.push(tag);

            if(parentSelector != '') {
                tagSequences = getTagSequences(parentSelector, maxDepth, tagSequences).unique();
            }

            for(var j=0; j<tagSequences.length; j++) {
                var tagSequence = tagSequences[j];
                if(ps != '')
                    tagSequence = ps + ' ' + tagSequence;

                if(getDepth(tagSequence) >= minDepth && using(tagSequence,options['use'].slice(0))) {
                    var index = -1;
                    index = map.indexOf(tagSequence);
                    if(index == -1) {
                        map.push(tagSequence);
                        index = map.indexOf(tagSequence);
                    }
                    variables.push(index);
                }
            }
        }
    } else {
        var index = -1;
        var tagSequence = ps;
        index = map.indexOf(tagSequence);
        if(index == -1) {
            map.push(tagSequence);
            index = map.indexOf(tagSequence);
        }
        variables.push(index);
    }
}

function generateClassSequences(selector, options) {

    var temp 			= selector.split(',');
    selector 			= temp[0].trim();
    var ps 				= '';
    if(temp.length > 1)
        ps = temp[1];

    if(selector.length > 0) {
        var parentSelector  = getParentSelector(selector);
        var node            = getNode(selector);
        var id              = getID(node);
        var tag             = getTag(node);
        var classes         = getClasses(node);
        var minDepth        = 0;//options['depth'];

        if(options['classes']['allowed'] == true && classes.length > 0) {

            var maxDepth = options['depth'];
            maxDepth--;
            if(ps != '')
                maxDepth--;
            if(ps != '')
                maxDepth--;

            var classSequences = [];
            classSequences = classSequences.concat(classes);

            if(parentSelector != '') {
                classSequences = getClassSequences(parentSelector, maxDepth, classSequences).unique();
            }

            for(var j=0; j<classSequences.length; j++) {
                var classSequence = classSequences[j];
                if(ps != '')
                    classSequence = ps + ' ' + classSequence;
                if(getDepth(classSequence) >= minDepth && using(classSequence,options['use'].slice(0))) {
                    var index = -1;
                    index = map.indexOf(classSequence);
                    if(index == -1) {
                        map.push(classSequence);
                        index = map.indexOf(classSequence);
                    }
                    variables.push(index);
                }
            }
        }
    } else {
        var index = -1;
        var classSequence = ps;
        index = map.indexOf(classSequence);
        if(index == -1) {
            map.push(classSequence);
            index = map.indexOf(classSequence);
        }
        variables.push(index);
    }
}

function generateMixSequences(selector, options) {

    var temp 			= selector.split(',');
    selector 			= temp[0].trim();
    var ps 				= '';
    if(temp.length > 1)
        ps = temp[1];

    if(selector.length > 0) {
        var parentSelector  = getParentSelector(selector);
        var node            = getNode(selector);
        var id              = getID(node);
        var tag             = getTag(node);
        var classes         = getClasses(node);
        var minDepth        = 0;//options['depth'];

        if(!options['id']['allowed']) {
            id = '';
        }

        if(!options['tag']['allowed']) {
            tag = '';
        }

        if(!options['classes']['allowed']) {
            classes = [];
        }

        if(options['mix']['allowed'] == true) {

            var mixSequences = [];
            if(id != '')
                mixSequences.push(id);
            if(tag != '')
                mixSequences.push(tag);
            mixSequences = mixSequences.concat(classes);

            var maxDepth = options['depth'];
            maxDepth--;
            if(ps != '')
                maxDepth--;

            if(parentSelector != '') {
                mixSequences = getMixSequences(parentSelector, maxDepth, mixSequences).unique();
            }

            for(var j=0; j<mixSequences.length; j++) {
                var mixSequence = mixSequences[j];
                if(ps != '') {
                    mixSequence = ps + ' ' + mixSequence;
                }
                if(getDepth(mixSequence) >= minDepth && using(mixSequence,options['use'].slice(0)) && isMixed(mixSequence)) {
                    var index = -1;
                    mixSequence = filterBeforeID(mixSequence);
                    index = map.indexOf(mixSequence);
                    if(index == -1) {
                        map.push(mixSequence);
                        index = map.indexOf(mixSequence);
                    }
                    variables.push(index);
                }
            }
        }
    } else {
        var index = -1;
        var mixSequence = ps;
        index = map.indexOf(mixSequence);
        if(index == -1) {
            map.push(mixSequence);
            index = map.indexOf(mixSequence);
        }
        variables.push(index);
    }
}

function getPriority(i, options){

    if(options['id']['priority'] == i)
        return 'id';

    if(options['tag']['priority'] == i)
        return 'tag';

    if(options['classes']['priority'] == i)
        return 'classes';

    if(options['mix']['priority'] == i)
        return 'mix';

}

function getNodes(tree,root) {

    if(tree[root] == '') {
        if(root == 'root')
            return [];
        else
            return [root];
    }

    var single = false;
    while(tree[root].split(',').length == 1){
        single = true;
        if(tree[root] == '')
            break;
        root = tree[root];
    }
    if(single == true)
        return [root];
    else {
        var temp = tree[root].split(',');
        var ret = [];
        for(var i=0; i<temp.length; i++){
            ret = ret.concat(getNodes(tree,temp[i]));
        }
        return ret;
    }
}
function mixAndMatch(array){


    var tree = [];
    tree['root']	= '';

    for(var i=0; i<array.length; i++){

        var root = 'root';
        var pointer = tree[root].split(',');

        var temp = array[i].trim().split(' ');
        for(var j=0; j<temp.length; j++){
            var id = getID(temp[j]);
            if(id != ''){
                if(pointer.indexOf(id) == -1) {
                    if(tree[root] != '')
                        tree[root] += ',';
                    tree[root] += id;
                }

                if(tree[id] == undefined)
                    tree[id] = '';
                root = id;
                pointer = tree[root].split(',');
            }
        }
    }


    return getNodes(tree,'root');

}

function minimize(selector, id){
    var selectors = selector.trim().split(' ').reverse();

    var ret = '';
    for(var i=0; i<selectors.length; i++){
        var node = selectors[i];
        var tid = getID(node);
        if(id.indexOf(tid) > -1)
            return ret.trim() + ',' + tid;
        ret = node + ' ' + ret;
    }
    ret = ret.trim();//.split(' ').reverse().join(' ');
    return ret;
}

function parse(selectors, nonSelectors, options) {


    var ps = [];
    var pns = [];

    if(options['selectLevel'] < 2) {
        var all = selectors.slice(0);
        all = all.concat(nonSelectors);

        if(all.length > 0) {
            ps = mixAndMatch(all);

            if(ps.length > 0){
                for(var i=0; i<all.length; i++){
                    all[i] = minimize(all[i],ps);
                    if(i<selectors.length)
                        selectors[i] = all[i];
                    else
                        nonSelectors[i-selectors.length] = all[i];
                }
            }
        }
    }

    var order           = [];

    for(var j=0; j<4; j++){
        order[j] = getPriority(j, options);
    }
    ignore = options['ignore'];

    for(var i=0; i<selectors.length; i++) {

        var selector        = selectors[i].trim();//.toLowerCase();
        variables           = [];
        for(var j=0; j<4; j++){
            switch (order[j]) {
                case "id"       : generateIDSequences(selector, options); break;
                case "tag"      : generateTagSequences(selector, options); break;
                case "classes"  : generateClassSequences(selector, options); break;
                case "mix"      : generateMixSequences(selector, options); break;
            }
        }
        if(debug) console.log(variables);
        input.push(variables.unique());
    }

    for(var i=0; i<nonSelectors.length; i++) {

        var nonSelector        = nonSelectors[i].trim();//.toLowerCase();
        variables           = [];

        for(var j=0; j<4; j++){

            switch (order[j]) {
                case "id"       : generateIDSequences(nonSelector, options); break;
                case "tag"      : generateTagSequences(nonSelector, options); break;
                case "classes"  : generateClassSequences(nonSelector, options); break;
                case "mix"      : generateMixSequences(nonSelector, options); break;
            }
        }

        var uniqueAvoids = variables.unique();
        for(var j=0; j<uniqueAvoids.length; j++) {
            avoid.push('-' + uniqueAvoids[j]);
        }
    }
    if(debug) console.log(input);
    if(debug) console.log(avoid);
}

function process() {
    var num = input.length + output.length + avoid.length;
    var ret = 'p cnf ' + map.length + ' ' + num + '\n';
    for(var i=0; i<input.length; i++) {
        ret += input[i].join(' ') + ' 0\n';
    }
    for(var i=0; i<avoid.length; i++) {
        ret += avoid[i] + ' 0\n';
    }
    for(var i=0; i<output.length; i++) {
        var temp = output[i].split(" ");
        var add = '';
        for(var j=0; j<temp.length; j++){
            var val = parseInt(temp[j]);
            if(val >= 0) {
                val = -1 * val;
                add += ' ' + val;
            }
        }
        add = add.substring(1);
        ret += add + '\n';
    }
    return ret;
}


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
    if(debug) console.log(data);

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

		var html = 	'<div id="' + id + '" class="circleBase" style="background-color:rgb('+ rgb.join(',') +') !important" onmouseover=\'showOutline("'+id+'")\' onmouseout=\'hideOutline()\'>';
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
	removeOverlay();
}


function change(id, newSelector) {

	var prevSelector = obj[id]["selector"];
	$(prevSelector).removeClass('positiveHighlight').removeClass('negativeHighlight').removeClass('runtimeHover').removeClass('show');

	obj[id]["selector"] = newSelector;

	var role = obj[id]["role"];

	$('#' + id + ' .info').html(newSelector.trim().substring(newSelector.lastIndexOf(' ') + 1).substring(0,20) + ' ...' + '<span>' + newSelector.trim().split(" ").join("<br /><br />") + '</span>');
	if(debug) console.log(document.querySelector(newSelector));
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

    var html = '<div class="close"><a href="javascript: hideMenu()">X</a></div>';
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

function overlay(element) {
	var rect = element.getBoundingClientRect();
	var elem = document.createElement("div");
	document.body.appendChild(elem);

	var top = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0) + rect.top;
	var left = rect.left;

	elem.className = 'overlay';
	elem.style.left = left + 'px';
	elem.style.top = top + 'px';
	elem.style.height = rect.height + 'px';
	elem.style.width = rect.width + 'px';
}

function addOverlay(index){

	var ret = selector[index];

	var elem = $(ret.positive).not(ret.negative);

	var counter = 0;
	elem.each(function(){
		var e = $(this)[0];
		if(debug) console.log(ret.reject.indexOf(counter));
		if(ret.reject.indexOf(counter) == -1) {
			overlay(e);
		}
		counter ++;
	});
}

function removeOverlay() {
	$('.overlay').remove();
}


var selectors       			= [];
var nonSelectors    			= [];
var options 					= [];

options['id']                   = [];
options['tag']                  = [];
options['classes']              = [];
options['mix']                  = [];


options['id']['allowed']        = true;
options['tag']['allowed']       = true;
options['classes']['allowed']   = true;
options['mix']['allowed']       = true;
options['id']['priority']       = 0;
options['tag']['priority']      = 2;
options['classes']['priority']  = 1;
options['mix']['priority']      = 3;
options['depth']                = 4;
options['maxTime']			    = 10;
options['start']				= 0;

options['ignore']               = [];
options['ignore'].push('html');
options['ignore'].push('body');
options['ignore'].push('#container');
options['ignore'].push('.js');

options['use']                  = [];

options['selectLevel']			= 0;

var filteredCombinations 		= [];

var numElems					= [];


function getAtPriority(i, options){

    if(options['id']['priority'] == i)
        return 'id';

    if(options['tag']['priority'] == i)
        return 'tag';

    if(options['classes']['priority'] == i)
        return 'classes';

    if(options['mix']['priority'] == i)
        return 'mix';

}



function createDiv(val, allowed, j){
	var temp = '';

	temp += '<div class="label">';

	temp += '<input type="checkbox"  id="'+val+'_opt" onchange="flip(\''+val+'\')" ';
	if(allowed)
		temp += 'checked=checked';
	temp += ' />';

	temp += ' <label for="'+val+'_opt">' + val + '</label>';

	temp += '<div class="up-down">';
	if(j < 3){
		temp += ' <a href="javascript:void(0)" onclick="orderDown(\''+val+'\','+j+')">down</a>';
	}
	temp += '</div>';

	temp += '<div class="up-down">';
	if(j > 0){
		temp += ' <a href="javascript:void(0)" onclick="orderUp(\''+val+'\','+j+')">up</a>';
	}
	temp += '</div>';

	temp += '</div>';

	return temp;
}

function renderOptions(options, target) {

	var html		= '';

	var order           = [];

    for(var j=0; j<4; j++){
        order[j] = getAtPriority(j, options);
    }

    for(var j=0; j<4; j++){

        switch (order[j]) {
            case "id"       : html += createDiv('id',options['id']['allowed'], j); break;
            case "tag"      : html += createDiv('tag',options['tag']['allowed'], j); break;
            case "classes"  : html += createDiv('classes',options['classes']['allowed'], j); break;
            case "mix"      : html += createDiv('mix',options['mix']['allowed'], j); break;
        }
    }

    html += '<br /><br />Depth: ';
    html += '<select id="depth" onchange="changeDepth(this.value)">';
   	for(j=1; j<=100; j++) {
   		html += '<option value="'+j+'"';
   		if(j == options['depth'])
   			html += " selected"
   		html += '>' + j + '</option>';
   	}
    html += '</select>';
    $('#' + target).html(html);

    html += ' Max time: ';
    html += '<select id="maxTime" onchange="changeMaxTime(this.value)">';
   	for(j=1; j<=1000; j++) {
   		html += '<option value="'+j+'"';
   		if(j == options['maxTime'])
   			html += " selected"
   		html += '>' + j + '</option>';
   	}
    html += '</select>';
    html += '<br/><select id="selectLevel" onchange="changeSelectLevel(this.value)">';
    html += '<option value="0"';
    if(options['selectLevel'] == 0)
    	html += ' selected';
    html += '>Select only selected elements</option>';
    html += '<option value="1"';
    if(options['selectLevel'] == 1)
    	html += ' selected';
    html += '>Select similar elements locally</option>';
    html += '<option value="2"';
    if(options['selectLevel'] == 2)
    	html += ' selected';
    html += '>Select similar elements globally</option>';
    html += '</select>';
    html += '<br /><br/>Must use (one per line):<br />';
    html += '<textarea id="use" style="height:50px !important; width:80% !important" onkeyup="updateUse()">';
    for(var j=0; j<options['use'].length; j++){
    	html += options['use'][j];
    	if(j < options['use'].length-1)
    		html += "\n";
    }
    html += '</textarea>';
    html += '<br /><br/>Ignore (one per line):<br />';
    html += '<textarea id="ignore" style="height:50px !important; width:80% !important" onkeyup="updateIgnore()">';
    for(var j=0; j<options['ignore'].length; j++){
    	html += options['ignore'][j];
    	if(j < options['ignore'].length-1)
    		html += "\n";
    }
    html += '</textarea>';
    $('#' + target).html(html);
}
renderOptions(options,'loader2');

function flip(val) {
	if(options[val]['allowed'] == true) {
		options[val]['allowed'] = false;
	} else {
		options[val]['allowed'] = true;
	}
	if(debug) console.log(options);
}

function orderUp(val, j){

	var temp = getAtPriority(j-1, options);
	options[val]['priority'] = j-1;
	options[temp]['priority'] = j;
	renderOptions(options,'loader2');

}

function orderDown(val, j) {

	var temp = getAtPriority(j+1, options);
	options[val]['priority'] = j+1;
	options[temp]['priority'] = j;
	renderOptions(options,'loader2');

}

function changeDepth(value) {
	options['depth'] = parseInt(value);
}

function changeMaxTime(value) {
	options['maxTime'] = parseInt(value);
}
function changeSelectLevel(value) {
	options['selectLevel'] = parseInt(value);
}

function updateUse() {
	var use = document.getElementById("use").value.split("\n");
	var update = [];
	for(var i=0; i<use.length; i++) {
		if(use[i].trim()){
			update.push(use[i].trim());
		}
	}
	options['use'] = update.slice(0);
}

function updateIgnore() {
	var ignore = document.getElementById("ignore").value.split("\n");
	var update = [];
	for(var i=0; i<ignore.length; i++) {
		if(ignore[i].trim()){
			update.push(ignore[i].trim());
		}
	}
	options['ignore'] = update.slice(0);
}

function generateSelector(){

	var html = '<div class="loader"><img src="http://enviroshutters.co/wp-content/themes/FSC/images/loading_bar.gif" height="100" /></div>';
	$('#cssSelector').html(html);
	selectors 		= [];
	nonSelectors	= [];

	map         	= [];
    map[0]          	= 0;

    input       	= [];
    output      	= [];
    avoid       	= [];
    prevCnf     	= '';
    variables   	= [];
    ignore      	= [];
    combinations	= [];

	for(var i in obj) {
		if(obj[i]['role'] == 1)
			selectors.push(obj[i]['selector'].trim());

		else if (obj[i]['role'] == -1)
			nonSelectors.push(obj[i]['selector'].trim())
	}

	parse(selectors, nonSelectors, options);

	if(debug) console.log(map);
    if(debug) console.log(input);
    if(debug) console.log(avoid);

    options['start'] = Date.now() / 1000;

   	setTimeout('solve()',20);
}

function solve(){
    var cnf = process();

    if(debug) console.log(cnf);
    var a = htmlstuff(cnf);
    if(debug) console.log(a);
    if(a != '' && a != undefined) {
        output.push(a);

        if((Date.now()/1000 - options['start']) < options['maxTime'])
            solve();
        else{
        	postProcess();
        }
    } else {
        postProcess();
    }

}


function getPositives(answer){
    var ret = [];

    var all = answer.trim().split(' ');
    for(var i=0; i<all.length; i++){
        var val = parseInt(all[i]);
        if(val > 0){
            ret.push(val);
        }
    }

    return ret;
}

function mapBack(positives){
    var ret = [];

    for(var i=0; i<positives.length; i++){
        ret.push(map[positives[i]]);
    }

    return ret;
}


function getUniversality(selector){
	if(!options['tag']['allowed'])
		return 2;

	var ret = 0;
	var temp = selector.trim().split(' ');
	for(var i=0; i<temp.length; i++){
		var node = temp[i];
		var tag = getTag(node);
		if(tag != '')
			ret++;
	}
	return ret/temp.length;
}


function countDescendants(selector) {

	if(numElems[selector] === undefined){
		numElems[selector] = $(selector).find("*").length;
	}
	return numElems[selector];
}
function getAbstractness(selector){

	var ret = 0;
	var total = countDescendants("html");

	var temp = selector.trim().split(' ');
	var n = temp.length;

	var total = n * total;

	var prev = "";
	for(var i=0; i<temp.length; i++){
		prev += temp[i];
		ret += countDescendants(prev);
		prev += ' ';
	}

	return (ret/total);
}

function postProcess() {

    for(var i=0; i<selectors.length; i++){
        var temp = selectors[i].split(",");
        if(temp.length > 1)
        	selectors[i] = temp[1] + ' ' + temp[0];
        else
        	selectors[i] = temp[0];
    }

    for(var i=0; i<output.length; i++) {
        var answer          = output[i];
        var combination     = mapBack(getPositives(answer));

        if(options['selectLevel'] < 1) {
        	if($(combination.join(',')).length == $(selectors.join(',')).length) {
        		combinations.push(combination);
        	}
        }else{
	        combinations.push(combination);
    	}
    }
    if(combinations.length == 0) {
    	alert("No matching selector found. Please change the search crieteria or provide more examples.")
    	var html = '';
    	$('#cssSelector').html(html);
    	if(debug) console.log("here");
    	return 0;
    }
    if(debug) console.log(combinations);

    var orderedCombinations = [];
    var avg	= [];
    var num = [];
    var maxLen = 1;

	for(var i=0; i<combinations.length; i++){
    	var combination = combinations[i];
    	var len = combination.length;


    	var universality = 0;
    	var abstractness = 0;

    	var universalityCheck = 0;

    	for(var j=0; j<combination.length; j++) {
    		var selector = combination[j];

    		universality += getUniversality(selector);
    		if(universality > 0 && universality <= 1)
    			universalityCheck = 1;

    		abstractness += getAbstractness(selector);
    	}

    	universality = universality/len;
    	abstractness = abstractness/len;


    	var score = abstractness;

    	if(universalityCheck)
    		score = Math.min(universality,abstractness);
    	else
    		score = score / 2;

    	score = 100 - len + score;

    	if(avg[len] == undefined) {
    		avg[len] = 0;
    		num[len] = 0;
    	}

    	if(maxLen < len)
    		maxLen = len;

    	avg[len] += score;
    	num[len]++;

    	orderedCombinations[orderedCombinations.length] = {"score" : score, "combination":combination};

    }

    for(var i=1; i<=maxLen; i++) {
    	avg[i] = avg[i] / num[i];
    }

    if(debug) console.log(orderedCombinations);

    filteredCombinations = [];

    for(var i=0; i<orderedCombinations.length; i++){

    	var temp = orderedCombinations[i];
    	if(temp.score >= avg[temp.combination.length] || orderedCombinations.length < 10)
    		filteredCombinations[filteredCombinations.length] = temp;
    }

    function compare(a,b) {
	  	if (a.score < b.score)
	     	return 1;
	  	if (a.score > b.score)
	    	return -1;
	  	return 0;
	}
	filteredCombinations.sort(compare);


    if(debug) console.log(filteredCombinations);

    createSelector(0);

}

function showResult(selector){

	$(selector).addClass("transparentOutline");
}

function hideResult(){
	$("*").removeClass("transparentOutline");
}

function createSelector(i){

	var html = '';

	if(debug) console.log(filteredCombinations);

	html += '<b>Total CSS Selectors: ' + filteredCombinations.length + '</b><br />';
    html += '<p onmouseover="showResult(\''+filteredCombinations[i].combination.join(',')+'\')" onmouseout="hideResult()">';
    html += filteredCombinations[i].combination.join('<br />');
    html += '</p><br /><br />';
    var prev = i-1;
    var next = i+1;

    if(prev >= 0)
    	html += '<a style="float:left !important" href="javascript:void(0)" onclick="createSelector('+prev+')">Prev</a>';

    if(next < filteredCombinations.length)
    	html += '<a style="float:right !important" href="javascript:void(0)" onclick="createSelector('+next+')">Next</a>';

    $('#cssSelector').html(html);


}
/*---------------------------------adding toolbox------------------------------------*/