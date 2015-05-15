(function(win){
	/*加载行内样式*/
	function loadCss(css){
		var style = document.createElement("style");
		style.type = "text/css";
		try{
			style.appendChild(document.createTextNode(css));
		}catch(e){
			style.styleSheet.cssText = css;
		}
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(style);
	}

	/*加载外部css文件*/
	function loadCssFile(url){
		var link = document.createElement("link");
		link.rel = "styleSheet";
		link.href = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
	}
	//加载外部js文件
	function loadJSFile(url, callback){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = function(){
			callback && callback();
		}
		var body = document.getElementsByTagName("body")[0];
		//or document.body.appendChild(script);
		body.insertBefore(script,body.firstChild.nextSibling);
	}

	//构造dom结构, conElem为内容容器
	function createDom(conElem){
		var scrollWrapper = document.createElement("div");
		scrollWrapper.id = "scrollbar-wrapper";
		scrollWrapper.innerHTML = '<div class="scrollbar">\
                <div class="track">\
                    <div class="scroll-bg">\
                        <div class="i4"></div>\
                        <div class="i6"></div>\
                        <div class="i8"></div>\
                        <div class="i8"></div>\
                        <div class="scroll-bg-hd"></div>\
                        <div class="i8"></div>\
                        <div class="i8"></div>\
                        <div class="i6"></div>\
                        <div class="i4"></div>\
                    </div>\
                    <div class="thumb">\
                        <div class="thumb-hd">\
                            <div class="i4"></div>\
                            <div class="i6"></div>\
                            <div class="i8"></div>\
                            <div class="i8"></div>\
                        </div>\
                        <div class="thumb-bd"></div>\
                        <div class="thumb-ft">\
                            <div class="i8"></div>\
                            <div class="i8"></div>\
                            <div class="i6"></div>\
                            <div class="i4"></div>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        var viewport = document.createElement("div");
        viewport.className = "viewport";
        var overview = document.createElement("overview");
        overview.className = "overview";

        overview.appendChild(conElem);
        viewport.appendChild(overview);
        scrollWrapper.appendChild(viewport);

        return scrollWrapper;
	}

	function scrollFn(){
		var scrollBox = $("#scrollbar-wrapper");
        function resize(){
            var width = $(window).width();
            var height = $(window).height();
            scrollBox.css({                
                width: (width -8)+"px"
            });
            $("#scrollbar-wrapper .viewport").css({
                height: (height-51) + "px"
            });
            var $scrollbar = $("#scrollbar-wrapper");
            $scrollbar.tinyscrollbar();
        }
        resize();
        $(window).on("resize", function(){
            resize();
        });
	}

	function scrollInit(conId){
		var conElem = document.getElementById(conId);
		//创建文本片段
		var fragment = document.createDocumentFragment();
		fragment.appendChild(createDom(conElem));
		
		var firstChild = document.body.firstChild;
		document.body.insertBefore( fragment, firstChild);

		loadCssFile("http://s3.qhimg.com/!35901b2d/jquery.tinyscrollbar.css");
		loadJSFile("http://s2.qhimg.com/!35901b2d/jquery.tinyscrollbar.js", scrollFn);
	}
	window.scrollInit = scrollInit;
})(window);
