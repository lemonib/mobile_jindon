window.onload=function(){
	// 顶部搜索
	search()
	//轮播图
	banner()
	//倒计时
	downTime()
}

var search = function(){
//页面滚动时，透明度变大
	var searchBox = document.querySelector(".jd_search_box")
	var banner = document.querySelector(".jd_banner")
	var height = banner.offsetHeight

	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop
		var opacity = 0
		if(scrollTop<height){
			opacity = scrollTop/height *0.85
		}else{
			opacity = 0.85
		}
		searchBox.style.background = 'rgba(201,21,35,'+opacity+')'
	}
}

var banner = function(){
	//自动轮播
	//点随着图片改变
	//滑动结束时 超过屏幕1/3 则下一张
	var banner = document.querySelector('.jd_banner')
	var width = banner.offsetWidth
	//图片盒子
	var imageBox = banner.querySelector('ul:first-child')
	//点盒子
	var pointBox = banner.querySelector('ul:last-child')
	//点集合
	var points = pointBox.querySelectorAll('li')
	var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
	var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

	var index = 1;
	var timer = setInterval(function(){
		index ++
		addTransition();
		//移动
		setTranslateX(-index*width)
	},3000)

	imageBox.addEventListener('transitionend',function(){
		if(index>=9){
			index=1;
			//清除过渡
			removeTransition()
			//移动
			setTranslateX(-index*width)
		}
		//滑动时候无缝
		else if(index<=0){
			index=8

			//清除过渡
			removeTransition()
			//移动
			setTranslateX(-index*width)
		}

		//根据索引设置点 现在index取值范围已经是1-8
		setpoint()
	})

	var setpoint = function(){
		for (var i=0;i<points.length;i++){
			var obj = points[i];
			obj.classList.remove('now')
		}
		points[index-1].classList.add('now')
	}

	//绑定三个触摸时间
	var startX = 0
	var distanceX = 0
	imageBox.addEventListener('touchstart',function(e){
		/*清除定时器*/
        clearInterval(timer);
		startX = e.touches[0].clientX
	})
	
	imageBox.addEventListener('touchmove',function(e){
		var moveX = e.touches[0].clientX
		distanceX = moveX - startX
		//元素将要定位=当前定位+手指移动距离
		var translateX = -index * width +distanceX
		removeTransition()
		setTranslateX(translateX)

	})
	
	imageBox.addEventListener('touchend',function(e){
		if(Math.abs(distanceX)<width/3){
			addTransition()
			setTranslateX(-index*width)
		}else{
			// 右滑动
				if(distanceX>0){
					index --;
				}
			// 左滑动
				else{
					index　++;
				}
				addTransition()
				setTranslateX(-index*width)
		}
		/*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }, 3000);
	})

}
	


var downTime = function(){
	var time = 4*60*60
	var spans = document.querySelectorAll('.time span');

	var timer = setInterval(function(){
		time--

		var h = Math.floor(time/3600)
		var m = Math.floor(time%3600/60)
		var s = time%60

		spans[0].innerHTML = Math.floor(h/10)
		spans[1].innerHTML = h%10

		spans[3].innerHTML = Math.floor(m/10)
		spans[4].innerHTML = m%10

		spans[6].innerHTML = Math.floor(s/10)
		spans[7].innerHTML = s%10

		if(time<=0){
			clearInterval(timer)
		}
	},1000)
}