(function(){
	
	window.log = window.log || function(){
		console.log.apply(this,arguments);
	}
	
	function isType(type){
		return function(obj){
			return {}.toString.call(obj) == "[object " + type + "]"
		}
	}
	
	isObject = isType("Object");
	isArray = isType("Array");
	isFunction = isType("Function");
	
	/*绑定函数*/
	Function.prototype.bind = Function.prototype.bind || function(target){

		var _default_args = Array.prototype.slice.call(arguments,1);
		var self = this;
		var F = function(){};
		
		var result = function(){
			var _add_args = Array.prototype.slice.call(arguments);
			var _args = _default_args.concat(_add_args);
			
			return self.apply(this instanceof F ? this : target , _args);
		}
		
		F.prototype = self.prototype;
		result.prototype = new F();
		return result;
		
	}
	
	/*循环数组*/
	Object.prototype.each = Object.prototype.each || function(func){
		
		if(typeof func !== "function"){
			return false;
		}
		
		var self = this;
		var i = 0;
		for(var i in self){
			if(self.hasOwnProperty(i)){
				func.bind(self[i])(i,self[i]);
			}
			i++;
		}
	}
	
	/*去除两端空白*/
	Object.prototype.trim = Object.prototype.trim || function(){
		return {}.toString.call(this).replace(/^(\s*)|(\s*)$/g,"");
	}
	
	Function.prototype.addEventListener = function(type,callback,tag){
		
	}
	
	var selects = document.querySelectorAll(".lz-select");
	
	/**
	 * 获取元素样式值
	 * @param {Object} ele dom元素
	 * @param {Object} key 样式名称，不传返回样式列表
	 */
	function getCss(ele,key) {
	    var style = null;
	    var value = "";
	    
	    if(window.getComputedStyle) {
	        style = window.getComputedStyle(ele, null);
	        key && (value = style.getPropertyValue(key));
	    }else{
	        style = ele.currentStyle;
	        key && (value = style[key]);
	    }
	    
	    if(key) return value.trim();
	    return style;
	}
	
	/**
	 * 获取元素第一层子元素内纯文本
	 * @param {Object} elem
	 */
	function findElemText(elem){
		var children = elem.childNodes;
		var result = "";
		for(var len = children.length , i = 0; i< len ; ++i ){
			if(children[i].nodeType == 3){
				result += children[i].textContent;
			}
		}
		return result;
	}
	
	selects.each(function(){
		var pop = this.querySelectorAll(".draw-pop");
		var self = this;
		this.addEventListener("click",function(e){
			var targ = e.target;
			
			if(Array.prototype.slice.call(targ.classList).indexOf("icon-iconfontshequyijujue") != -1){
				
				var old = self.getAttribute("data-select") || "";
				var del = targ.getAttribute("data-value") || "";
				del = "," + del;
				old = old.replace(del,"");
				self.setAttribute("data-select", old);
				
				targ.parentNode.remove();
				return;
			}
			
			var rtop = self.getBoundingClientRect().height;
			var ntop = getCss(pop[0],"top");

			if((rtop + "px") != ntop){
				pop[0].style.top = rtop + "px";
			}

			if(getCss(pop[0],"display") == "block"){
				pop[0].style.display = "none";
			}else{
				pop[0].style.display = "block";
			}
		});
		
		/*下拉列表点击事件*/
		var show_elem = this.querySelectorAll(".selected");
		var pop_li = this.querySelectorAll(".draw-pop li");
		pop_li.each(function(i){
			this.addEventListener("click",function(){
				var txt = findElemText(this);
				var elem = document.createElement("div");
				elem.classList = "item";
				elem.innerHTML = txt + '<span data-value="'+ i +'" class="iconfont icon-iconfontshequyijujue"></span>';
				
				show_elem[0].appendChild(elem);
				
				var old = self.getAttribute("data-select") || "";
				self.setAttribute("data-select", old + "," +i);
			})
		})
		
	});
	
	var lzMutilSelect = {
		getValue: function(elem){
			if(Array.prototype.slice.call(elem.classList).indexOf("lz-select") == -1){
				return;
			}
			var old = elem.getAttribute("data-select") || "";
			if(old[0] == ","){
				old = old.substr(1);
			}
			
			return old.split(".");
		}
	}
	
	window.lzMutilSelect = window.lzMutilSelect || lzMutilSelect;
	
	
})();
