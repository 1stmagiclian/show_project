// 获取轮播图容器和按钮
var focus1 = document.querySelector('.focus');
var arrowl = document.querySelector('.arrow-l');
var arrowr = document.querySelector('.arrow-r');
var ul = focus1.querySelector('ul');
var ol = focus1.querySelector('.circle');

// 全局变量
var focus1width = focus1.offsetWidth; // 轮播图容器宽度
var num = 0; // 控制图片切换
var circle = 0; // 控制焦点播放
var flag = true; // 节流阀

// 鼠标进入轮播图容器时显示按钮并停止自动播放
focus1.addEventListener('mouseenter', function () {
    arrowl.style.display = 'inline-block';
    arrowr.style.display = 'inline-block';
    clearInterval(timer);
});

// 鼠标离开轮播图容器时隐藏按钮并重新启动自动播放
focus1.addEventListener('mouseleave', function () {
    arrowl.style.display = 'none';
    arrowr.style.display = 'none';
    timer = setInterval(function () {
        arrowr.click();
    }, 4000);
});

// 动态生成小圆圈
for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('index', i);
    ol.appendChild(li);
    li.addEventListener('click', function () {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        this.className = 'carrent';
        var index = this.getAttribute('index');
        num = circle = index;
        animate(ul, -index * focus1width);
    });
}

// 克隆第一张图片
var first = ul.children[0].cloneNode(true);
ul.appendChild(first);

// 右侧按钮点击事件
arrowr.addEventListener('click', function (event) {
    event.preventDefault();
    if (flag) {
        flag = false;
        if (num == ul.children.length - 1) {
            ul.style.left = 0 + 'px';
            num = 0;
        }
        num++;
        animate(ul, -num * focus1width, function () {
            flag = true;
        });
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        setCurrentCircle();
    }
});

// 左侧按钮点击事件
arrowl.addEventListener('click', function (event) {
    event.preventDefault();
    if (flag) {
        flag = false;
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -(num * focus1width) + 'px';
        }
        num--;
        animate(ul, -num * focus1width, function () {
            flag = true;
        });
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        setCurrentCircle();
    }
});

// 自动播放频率设置
var timer = setInterval(function () {
    arrowr.click();
}, 4000);

// 动画函数
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 20);
}

// 设置当前圆圈样式
function setCurrentCircle() {
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
    }
    ol.children[circle].className = 'carrent';
}
