
function waterFull(parent, child) {
    var allBox = $(parent).getElementsByClassName(child);
    var boxWidth = allBox[0].offsetWidth;
    var screenW = document.documentElement.clientWidth;
    var cols = parseInt(screenW / boxWidth);
    var xyMargin = 16;
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;

    for (var i = 0; i < allBox.length; i++) {
        boxHeight = allBox[i].offsetHeight + xyMargin;
        if (i < cols) { // 第一行
            heightArr.push(boxHeight);

            allBox[i].style.position = "absolute";
            allBox[i].style.left = i * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top =  xyMargin + 'px';
        } else {
            minBoxHeight = _.min(heightArr);
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * (boxWidth + xyMargin)+ 'px';
            allBox[i].style.top = minBoxHeight +  xyMargin + 'px';
            heightArr[minBoxIndex] += boxHeight;
        }
    }

    var parentHeight = allBox[allBox.length - 1].offsetTop + allBox[allBox.length - 1].offsetHeight;
    $(parent).style.height = parentHeight;
}

function getMinBoxIndex(arr, val) {
    for(var i=0; i<arr.length; i++){
        if(arr[i] === val){
            return i;
        }
    }
}
function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

function checkWillLoadImage() {
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;
    var scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;
}


