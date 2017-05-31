// window.onload=function(){
	// 搜索框
	var search=document.getElementsByClassName	("search");
    var inputs=document.getElementById('so');
    // console.log(input)
inputs.onfocus=function (){
	this.place=this.value;
  	inputs.value="";
  }
  inputs.onblur=function (){
  	// inputs.value="搜索...";
  	inputs.value="搜索...";

  	
  }

// 轮播图
// (function ($) {
    $.fn.touchMove = function() {
        var windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            size = $(this).children().size(),
            startX ,
            startY,
            XX,
            YY,
            startLeft,
            moveX,
            swipeX,
            swipeY,
            bj,
            bjz,
            translateX;
        windowWidth = windowWidth >= 640 ? 640 : windowWidth;
        $(this).css('width', windowWidth * (size + 1) ).children('a').css('width' ,windowWidth );
        $(this).css('transform', 'translate3d('+-windowWidth+'px,0px,0px)');
        $(this).live('touchstart' ,function(event) {
            var date = new Date();
             time1 = date.getTime();
            startLeft = parseFloat($(this).css('transform').match(/\-?[0-9]+/g)[1]);
            startX = event.targetTouches[0].pageX;
            startY = event.targetTouches[0].pageY;
            swipeX = true;
            swipeY = true;
        });
        $(this).live('touchmove', function(event) {
            translateX = parseFloat($(this).css('transform').match(/\-?[0-9]+/g)[1]);
            XX = event.targetTouches[0].pageX;
            YY = event.targetTouches[0].pageY;
            if ( swipeX  && Math.abs(XX - startX) - Math.abs(YY - startY) > 0  ) {
                $(this).bind('touchmove' , function(event) {
                    event.preventDefault();
                });
                swipeY = false;
                moveX = parseFloat($(this).css('transform').match(/\-?[0-9]+/g)[1]) + event.targetTouches[0].pageX - startX;
                startX = event.targetTouches[0].pageX;
                $(this).css('transform', 'translate3d('+moveX+'px, 0px,0px)');
            } else if ( swipeY && Math.abs(XX - startX) - Math.abs(YY - startY) < 0 ) {
                swipeX = false;
            }
        });
        $(this).live('touchend', function(event) {
            var date = new Date();
            var time2 = date.getTime();
            $(this).unbind('touchmove');
            translateX = parseFloat($(this).css('transform').match(/\-?[0-9]+/g)[1]);
            bj = windowWidth + translateX % windowWidth;
            if ( time2 - time1 >= 300 ) {
                bjz = windowWidth/2;//滑过1/2翻页
                if ( bj <= bjz ) {
                    left = translateX - bj;
                } else {//复原
                    left = translateX + (windowWidth - bj);
                }
            } else {
                bj = Math.abs(translateX % windowWidth);
                bjz = windowWidth/4;//滑过1/4翻页(点滑效果)
                if ( translateX >= startLeft ) {//页面向右滑动
                    if ( bj >= bjz ) {
                        left = translateX + bj;
                    } else {
                        left = translateX -( windowWidth - bj );
                    }
                } else {//页面向左滑动
                    if ( bj >= bjz * 3 ) {
                        left = translateX + bj;
                    } else {
                        left = translateX -(windowWidth - bj);
                        
                    }
                }  
            }
            if ( startLeft < left ) {//向右滑动
                $(this).animate({transform:'translate3d(0px,0px,0px)'},200,"linear",function(){
                index--;
                if ( index === -1  ) {
                    index = size - 1;
                }
                $(this).next().children('a').eq(index).addClass('index-ad-fixed-on').siblings().removeClass('index-ad-fixed-on');
                $(this).css({transform : 'translate3d('+windowWidth/(-1)+'px,0px,0px)'});
                $(this).children('a').last().remove().clone(true).insertBefore($(this).children('a').first());
                }) ; 
            } else if ( startLeft > left ) {//向左滑动
                $(this).animate({transform:'translate3d('+windowWidth*(-2)+'px,0px,0px)'},200,"linear",function(){
                index++;
                if ( index === size  ) {
                    index = 0;
                }
                $(this).next().children('a').eq(index).addClass('index-ad-fixed-on').siblings().removeClass('index-ad-fixed-on');
                $(this).css({transform:'translate3d('+windowWidth/(-1)+'px,0px,0px)'});
                $(this).children('a').first().remove().clone(true).appendTo($(this)); 
                }) ; 
            } else { //复原
                $(this).css('transition' , 'transform 200ms ease-out');
                $(this).css('transform', 'translate3d('+left+'px,0px,0px)');
            }
        });
    };
// })($);
// (function ($) {
    $.autoPlay = function(obj) {
        var windowWidth = $(window).width(),
        left = parseFloat(obj.css('transform').match(/\-?[0-9]+/g)[1]),
        len = obj.children().size(),
        flag = true;
        windowWidth = windowWidth >= 640 ? 640 : windowWidth;
        function showImg() {
           obj.animate({transform:'translate3d('+windowWidth*(-2)+'px,0px,0px)'},300,"linear",function(){
            index++;
            if ( index === len  ) {
                index = 0;
            }
            obj.next().children('a').eq(index).addClass('index-ad-fixed-on').siblings().removeClass('index-ad-fixed-on');
            obj.css({transform:'translate3d('+windowWidth/(-1)+'px,0px,0px)'});
            obj.children('a').first().remove().clone(true).appendTo(obj); 
            }) ; 
        }
         adTimer = setInterval( function() {
            showImg();
        } , 4000);
    }
// })($);
var index = 0;
$('.index-ad-slide').touchMove();
$.autoPlay($('.index-ad-slide'));
$('.index-ad-slide').on('touchstart' , function() {
	clearInterval(adTimer);
}).on('touchend' , function() {
	$.autoPlay($('.index-ad-slide'));
});

//  var carousel=document.getElementsByClassName("carousel");
//  var ul=document.getElementsByTagName("ul")[0];
//  var lis=ul.getElementsByTagName("li");
// // console.log(lis)
//  var ol=document.getElementsByTagName("ol")[0];
//  var ols=ol.getElementsByTagName("li");
//  var w=lis.offsetWidth;
// var timer=null;
// var num=0;
// var W=$(window).width();
// console.log(W)
// for (var i=0;i<ols.length;i++) {
// 	ols[i].index=i;
// 	ols[i].onclick=function(){
// 		 clearInterval(timer);  
// 		for(j=0;j<ols.length;j++){
// 			ols[j].className="";
// 		}
// 		this.className="star";
// 		ul.style.left=-W*+this.index+"px";
		
// 		num=this.index;
// 		autoPlay();
// 	}
// }
// function autoPlay(){
// 	timer=setInterval(function(){
// 		if(num>4){
// 			num=0;
// 		}
// 		  for(var j=0;j<ols.length;j++){  
//                     ols[j].className='';
//                 }  
//                 ols[num].className='star';  
//                 ul.style.left=-W*+num+"px";
//                 num++;  
//             },2000)  
// }
// autoPlay();
// 大图
// var show=document.getElementById("show");
// // var bb=document.getElementById("bb");
// var nn=document.getElementById("nn");
// var Imgs=document.getElementsByClassName("Imgs")[0];
// var Imglis=Imgs.getElementsByTagName("li");
// var maximg=document.getElementById("bb");
// var kk=document.getElementById("kk");
// var ee=document.getElementById("ee");
// // var maxlis=maximg.getElementsByTagName("li");
// var btna=document.getElementById("btna");
// var btn1=document.getElementsByClassName("btn1")[0];
// // console.log(btna);
// for(var i=0;i<Imglis.length;i++){
//    Imglis[i].index=i
// 	Imglis[i].onclick=function(){
// 		for(var j=0;j<maxlis.length;j++){
// 			 index= maxlis[j].index=j
// 			 if(this.index==index){
	     	
// 			 	maxlis[index].style.display="block";
// 			 	     //  btna.onclick=function (inde){
// 			 	     // 	console.log("aa")
//           //               // var   inde++;
                        
//           //               console.log(maxlis[inde])
// 			 	     // 	maxlis[inde].style.display="block";
// 			 	     // }(index)
			 	   
// 			 }else{
// 			 	maxlis[index].style.display="none";
// 			 }	

// 		}
	
// 		show.style.display="block";
// 		bb.style.display="block";
// 		btn1.style.display="block";
// 		show.onclick=function(){
// 	        show.style.display="none";
// 	         bb.style.display="none";
// 	}
// 	}
	
// 			 	     for(var a=0;a<maxlis.length;a++){
//                     console.log( maxlis[a].index)
// 			 	     	   btna.onclick=function (id){
//                        // console.log(maxlis[a])
// 			 	     	maxlis[id].style.display="block";
// 			 	     }
// 			 	     }
// }
//小图动态添加
var total=30;
var zWin=$(window);
var render=function(){
	var padding=2;
	var winwidth=zWin.width();
	var picWidth=Math.floor((winwidth-padding*3)/4);
	var tmpl='';
	for(var i=1;i<total;i++){
    var p=padding;
    var imgSrc="image/img"+i+".jpg";
    if(i%4==1){
    	p=0;
    }else{
    	tmpl+='<li class="animated bounceIn" data-id="'+i+'"><a href="javascript:;"><canvas id="cvs_'+i+'"></canvas</li>';
    	var imageObj=new Image();
    	imageObj.index=i;
    	var maxw=zWin.width()
    	
    	imageObj.onload=function(){
    		var cvs=$('#cvs_'+this.index)[0].getContext('2d');
    		cvs.width=this.width;
    		cvs.height=this.height;
    		if(zWin.width>600+'px'){
    			cvs.drawImage(this,0,0,150,100);
    		}else{
    			cvs.drawImage(this,0,0,1500,100);
    		}
    		
    	}
    	imageObj.src=imgSrc;
    }
    $("#container").html(tmpl);
	}
}
render();
var wImage=$('#large_img');
var domImg=wImage[0];
var loadImg=function(id,callback){
$('#large_container').css({
	width:zWin.width(),
	height:zWin.height()
}).show();
var imgsrc='image/img'+id+'.jpg';
  var imgobj=new Image();
imgobj.onload=function(){
	var w=this.width;
	var h=this.height;
	var winwidth=zWin.width();
	var winheight=zWin.height();
	var realw=winheight*w/h;
	var paddingLeft=parseInt((winwidth-realw)/2);
	var realh=winwidth*h/w;
		var paddingTop=parseInt((winheight-realh)/2);
		wImage.css('width','auto').css('height','auto');
		wImage.css('padding-left','0px').css('padding-top','0px')
	if(h/w>1.2){
		wImage.attr('src',imgsrc).css('height', winheight).css('padding-left',paddingLeft);
	}else{
   wImage.attr('src',imgsrc).css('width', winwidth).css('padding-top',paddingTop);
}
 callback&&callback();
}
 imgobj.src=imgsrc;
// $('#large_img').html(imgobj.src).show();
}
var cid;
$("#container").delegate('li','tap',function(){
	var _id=cid=$(this).attr('data-id');
      loadImg(_id);
});

$('#large_container').tap(function(){
	$(this).hide();
}).swipeLeft(function(){
cid++;
if(cid>total){
	cid=total;
}else{
loadImg(cid,function(){
	domImg.addEventListener('webkitAnimationEnd',function(){
		wImage.removeClass('animated bounceInRight');
		domImg.removeEventListener("webkitAnimationEnd");
	},false)
	wImage.addClass('animated bounceInRight');
});
}
}).swipeRight(function(){
cid--;
if(cid<1){
	cid=1;
}else{
	loadImg(cid,function(){
		domImg.addEventListener('webkitAnimationEnd',function(){
		wImage.removeClass('animated bounceInLeft');
		domImg.removeEventListener("webkitAnimationEnd");
	},false)
	wImage.addClass('animated bounceInLeft');
},false);
}
});

