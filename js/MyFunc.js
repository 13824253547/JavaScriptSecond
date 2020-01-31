
function scroll() {
    if(window.pageYOffset){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === 'CSS1Compat'){
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }

}


function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}


function show(obj) {
    return obj.style.display = 'block';
}


function hide(obj) {
    return obj.style.display = 'none';
}

function client() {
    if(window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === 'CSS1Compat'){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

function animate(obj, target, step) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var dir = obj.offsetLeft <= target ? step : -step;

        obj.style.left = obj.offsetLeft + dir + 'px';
        if(Math.abs(obj.offsetLeft - target) < step){
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
        }
    }, 10);
}

function buffer(obj, json, fn) {
    clearInterval(obj.timer);
    var begin = 0, end = 0;

    obj.timer = setInterval(function () {
        var flag = true;
        for(var k in json){
            if(k === 'opacity'){
                begin = parseInt( parseFloat(getCssAttr(obj, k)) * 100);
                end = parseInt(parseFloat(json[k]) * 100);
            }else if(k === 'scrollTop'){
                begin = obj.scrollTop;
                end = parseInt(json[k]);
            }else {
                begin = parseInt(getCssAttr(obj, k));
                end = parseInt(json[k]);
            }
            var step = (end - begin) * 0.2;
            step = step >=0 ? Math.ceil(step) : Math.floor(step);
            if(k === 'opacity'){
                obj.style.opacity = (begin + step) / 100;
                obj.style.filter = 'alpha(opacity=' + (begin + end)+')';
            }else if(k === 'scrollTop'){
                obj.scrollTop = begin + step;
            }else if(k === 'zIndex'){
                obj.style[k] = json[k];
            }else {
                obj.style[k] = begin + step + 'px';
            }

            if(begin !== end){
                flag = false;
            }
        }

        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    }, 60);
}

function getCssAttr(obj, attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj, null)[attr];
    }
}


/*
 * 判断浏览器
 */
function getOs() {
    var OsObject = "";
    if (isIE = navigator.userAgent.indexOf("MSIE") != -1) {
        return "MSIE";
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    }
    if (isChrome = navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    }
    if (isOpera = navigator.userAgent.indexOf("Opera") != -1) {
        return "Opera";
    }
}
