
(function(){
/**
* LoadingBase
*/	
LoadingBase = (function(){
	"use strict";
	
	function LoadingBase(options){
		var self = this;
		self.init(options);
	}
	LoadingBase.TextType = {
		percentage: 1,
		natural: 2
	};
	LoadingBase.prototype.init = function(options){
		console.error('unimplement init');
	};
	LoadingBase.prototype.show = function(){
		this.container.style.display = '';
	};
	LoadingBase.prototype.hide = function(){
		this.container.style.display = 'none';
	};
	LoadingBase.prototype.getProgress = function(){
		return Math.floor(this.current * 10000 / this.total)/100;  //100.00%
	};
	LoadingBase.prototype.render = function(){
		var progress = this.getProgress();
		this.renderProgress(progress);
		var text = '';
		if(this.textType==LoadingBase.TextType.natural){
			text = this.textTitle+this.current+'/'+this.total;
		}else if(this.textType==LoadingBase.TextType.percentage){
			text = this.textTitle+progress+'%';
		}
		this.textContainer.innerHTML = text;
	};
	LoadingBase.prototype.renderProgress = function(progress){
		console.error('unimplement renderProgress');
	};
	LoadingBase.prototype.start = function(total){
		this.current = 0;
		this.total = total;
		this.render();
	};
	LoadingBase.prototype.step = function(step){
		this.current+=step;
		if(this.current>=this.total)this.current=this.total;
		this.render();
	};
	LoadingBase.prototype.process = function(progress){
		this.current=progress;
		if(this.current>=this.total)this.current=this.total;
		this.render();
	};
	LoadingBase.prototype.isEnd = function(){
		return this.current==this.total;
	};
	LoadingBase.prototype.createSubDiv = function(){ //for vertical-middle
		var subDiv = document.createElement('div');
		subDiv.className = 'subDiv';
		subDiv.style.display = 'table-cell';
		subDiv.style.verticalAlign = 'middle';
		return subDiv;
	}
	
	return LoadingBase;
})();

/**
* LoadingBar
*/
LoadingBar = (function(){
	"use strict";
	
	function LoadingBar(options){
		var self = this;
		LoadingBase.call( this, options );
	}
	LoadingBar.prototype = Object.create( LoadingBase.prototype );
	LoadingBar.prototype.constructor = LoadingBar;
	LoadingBar.prototype.init = function(options){
		var self = this;
		
		//init options
		var options = options||{};
		var useInlineStyle = options.useInlineStyle||true;
		var textType = options.textType || LoadingBase.TextType.natural;
		var textTitle = options.textTitle|| '';
		var color = options.frontColor || '#666';
		var frontColor = options.frontColor || '#3B8BC4'; //3B8BC4 00BFFF 87CEFA
		var backColor = options.backColor || '#3A3A3A';
		var container = options.container;
		var textContainer = options.textContainer;
		if(!container){
			container = document.createElement('div');
			container.id = 'loading_bar_container';
			container.className = 'loading_bar_container';
			if(useInlineStyle){
				container.style.position = 'fixed';
				container.style.zIndex = '10000';
				container.style.top = '0';
				container.style.left = '0';
				container.style.width = '100%';
				container.style.height = '100%';
			}
			container.style.display = 'none';
			document.body.appendChild(container);
		}
		
		//init container
		//init overlay
		var overlayer = document.createElement('div');
		overlayer.id = 'loading_bar_overlay';
		overlayer.className = 'loading_bar_overlay';
		if(useInlineStyle){
			overlayer.style.position = 'absolute';
			overlayer.style.top = '0';
			overlayer.style.left = '0';
			overlayer.style.width = '100%';
			overlayer.style.height = '100%';
			overlayer.style.backgroundColor = 'rgba(0,0,0,0.3)';
		}
		container.appendChild(overlayer);
		
		//init main
		var mainDiv = document.createElement('div');
		mainDiv.id = 'loading_bar_main';
		mainDiv.className = 'loading_bar_main';
		if(useInlineStyle){
			mainDiv.style.display = 'table';
			mainDiv.style.width = '100%';
			mainDiv.style.height = '100%';
		}
		container.appendChild(mainDiv);
		
		var subDiv = self.createSubDiv();
		mainDiv.appendChild(subDiv);
		
		var barDiv = document.createElement('div');
		barDiv.className = 'loading_bar_div';
		if(useInlineStyle){
			barDiv.style.position = 'relative';
			barDiv.style.margin = '0 auto';
			barDiv.style.width = '80%';
			barDiv.style.height = '10px';
			barDiv.style.borderRadius = '7px';
			//barDiv.style.overflow = 'hidden';
		}
		barDiv.style.background = backColor;
		subDiv.appendChild(barDiv);
		
		var progressDiv = document.createElement('div');
		progressDiv.className = 'loading_progress_div';
		if(useInlineStyle){
			progressDiv.style.width = '0';
			progressDiv.style.height = '100%';
			progressDiv.style.borderRadius = '7px';
		}
		progressDiv.style.background = frontColor;
		barDiv.appendChild(progressDiv);
		
		if(!textContainer){
			textContainer = document.createElement('div');
			textContainer.className = 'loading_text_container';
			if(useInlineStyle){
				textContainer.style.position = 'absolute';
				textContainer.style.bottom = '10px';
				textContainer.style.left = '0';
				textContainer.style.width = '100%';
				textContainer.style.lineHeight = '20px';
				textContainer.style.textAlign = 'center';
			}
		}
		barDiv.appendChild(textContainer);
		
		//set public
		Object.defineProperty( this, 'progressDiv', { value: progressDiv } );
		Object.defineProperties( this, {
			container : { value: container},
			textContainer : { get: function(){return textContainer;} },
			textType : { value: textType, writable: true, enumerable: false, configurable: false},
			textTitle : { value: textTitle, writable: true},
		});
	};
	LoadingBar.prototype.renderProgress = function(progress){
		this.progressDiv.style.width = progress+'%';
	};
	return LoadingBar;
})();

/**
* LoadingCircle
*/
LoadingCircle = (function(){
	"use strict";
	
	function LoadingCircle(options){
		var self = this;
		LoadingBase.call( this, options );
	}
	//LoadingCircle.prototype = Object.create( LoadingBase.prototype );
	//LoadingCircle.prototype._super = Object.create( LoadingBase.prototype );
	//LoadingCircle.prototype.constructor = LoadingCircle;
	LoadingCircle.prototype.init = function(options){
		var self = this;
		
		//init options
		var options = options||{};
		var useInlineStyle = options.useInlineStyle||true;
		var textType = options.textType || LoadingBase.TextType.percentage;
		var textTitle = options.textTitle|| '';
		var color = options.frontColor || '#666';
		var frontColor = options.frontColor || '#3B8BC4'; //3B8BC4 00BFFF 87CEFA
		var backColor = options.backColor || '#3A3A3A';
		var width = options.width || '100';  //px
		var height = options.height || '100';  //px
		var borderWidth = options.borderWidth || '10px';  //px
		var unit = options.unit || 'px';
		var container = options.container;
		var textContainer = options.textContainer;
		if(!container){
			container = document.createElement('div');
			container.id = 'loading_circle_container';
			container.className = 'loading_circle_container';
			if(useInlineStyle){
				container.style.position = 'fixed';
				container.style.zIndex = '10000';
				container.style.top = '0';
				container.style.left = '0';
				container.style.width = '100%';
				container.style.height = '100%';
			}
			container.style.display = 'none';
			document.body.appendChild(container);
		}
		
		//init container
		//init overlay
		var overlayer = document.createElement('div');
		overlayer.id = 'loading_circle_overlay';
		overlayer.className = 'loading_circle_overlay';
		if(useInlineStyle){
			overlayer.style.position = 'absolute';
			overlayer.style.top = '0';
			overlayer.style.left = '0';
			overlayer.style.width = '100%';
			overlayer.style.height = '100%';
			overlayer.style.backgroundColor = 'rgba(0,0,0,0.3)';
		}
		container.appendChild(overlayer);
		
		//init main
		var mainDiv = document.createElement('div');
		mainDiv.id = 'loading_circle_main';
		mainDiv.className = 'loading_circle_main';
		if(useInlineStyle){
			mainDiv.style.display = 'table';
			mainDiv.style.width = '100%';
			mainDiv.style.height = '100%';
		}
		container.appendChild(mainDiv);
		
		var subDiv = self.createSubDiv();
		mainDiv.appendChild(subDiv);
		
		var barDiv = document.createElement('div');
		barDiv.className = 'loading_circle_div';
		if(useInlineStyle){
			barDiv.style.position = 'relative';
			barDiv.style.margin = '0 auto';
			barDiv.style.width = width+unit;
			barDiv.style.height = '0';
			barDiv.style.paddingTop = height+unit;
			//barDiv.style.borderRadius = '50%';
			//barDiv.style.overflow = 'hidden';
			//barDiv.style.boxSizing = 'border-box';
			//barDiv.style.borderWidth = '10px';
			//barDiv.style.borderStyle = 'solid';
		}
		//barDiv.style.background = frontColor;  //background borderColor
		subDiv.appendChild(barDiv);
		
		var barBgDiv = document.createElement('div');
		barBgDiv.className = 'loading_circle_bg_div';
		if(useInlineStyle){
			barBgDiv.style.position = 'absolute';
			barBgDiv.style.top = '0';
			barBgDiv.style.width = '100%';
			barBgDiv.style.height = '100%';
			barBgDiv.style.borderRadius = '50%';
			barBgDiv.style.boxSizing = 'border-box';
			barBgDiv.style.borderWidth = borderWidth;
			barBgDiv.style.borderStyle = 'solid';
		}
		barBgDiv.style.borderColor = frontColor;  //background borderColor
		barDiv.appendChild(barBgDiv);
		
		var leftProgressContainer = document.createElement('div');
		leftProgressContainer.className = 'loading_progress_container_left';
		if(useInlineStyle){
			leftProgressContainer.style.position = 'absolute';
			leftProgressContainer.style.top = '0';
			leftProgressContainer.style.left = '0';
			leftProgressContainer.style.width = '50%';
			leftProgressContainer.style.height = '100%';
			leftProgressContainer.style.overflow = 'hidden';
		}
		barDiv.appendChild(leftProgressContainer);
		
		var rightProgressContainer = document.createElement('div');
		rightProgressContainer.className = 'loading_progress_container_right';
		if(useInlineStyle){
			rightProgressContainer.style.position = 'absolute';
			rightProgressContainer.style.top = '0';
			rightProgressContainer.style.left = '50%';
			rightProgressContainer.style.width = '50%';
			rightProgressContainer.style.height = '100%';
			rightProgressContainer.style.overflow = 'hidden';
		}
		barDiv.appendChild(rightProgressContainer);
		
		var leftProgressDiv = document.createElement('div');
		leftProgressDiv.className = 'loading_progress_div_left';
		if(useInlineStyle){
			leftProgressDiv.style.position = 'absolute';
			leftProgressDiv.style.top = '0';
			leftProgressDiv.style.left = '0';
			leftProgressDiv.style.width = '200%';
			leftProgressDiv.style.height = '100%';
			leftProgressDiv.style.borderRadius = '50%';
			leftProgressDiv.style.clip = 'rect(0, '+(width/2)+'px, auto, 0)';
			leftProgressDiv.style.boxSizing = 'border-box';
			leftProgressDiv.style.borderWidth = borderWidth;
			leftProgressDiv.style.borderStyle = 'solid';
		}
		leftProgressDiv.style.borderColor = backColor;
		leftProgressContainer.appendChild(leftProgressDiv);
		
		var rightProgressDiv = document.createElement('div');
		rightProgressDiv.className = 'loading_progress_div_right';
		if(useInlineStyle){
			rightProgressDiv.style.position = 'absolute';
			rightProgressDiv.style.top = '0';
			rightProgressDiv.style.right = '0';
			rightProgressDiv.style.width = '200%';
			rightProgressDiv.style.height = '100%';
			rightProgressDiv.style.borderRadius = '50%';
			rightProgressDiv.style.clip = 'rect(0, auto, auto, '+(width/2)+'px)';
			rightProgressDiv.style.boxSizing = 'border-box';
			rightProgressDiv.style.borderWidth = borderWidth;
			rightProgressDiv.style.borderStyle = 'solid';
		}
		rightProgressDiv.style.borderColor = backColor;
		rightProgressContainer.appendChild(rightProgressDiv);
		
		var maskDiv = document.createElement('div');
		maskDiv.className = 'loading_mask_div';
		if(useInlineStyle){
			maskDiv.style.display = 'table';
			maskDiv.style.position = 'absolute';
			maskDiv.style.top = '10%';
			maskDiv.style.left = '10%';
			maskDiv.style.width = '80%';
			maskDiv.style.height = '80%';
			maskDiv.style.borderRadius = '50%';
		}
		//maskDiv.style.background = backColor;
		barDiv.appendChild(maskDiv);
		
		var maskSubDiv = self.createSubDiv();
		maskDiv.appendChild(maskSubDiv);
		if(!textContainer){
			textContainer = document.createElement('div');
			textContainer.className = 'loading_text_container';
			if(useInlineStyle){
				textContainer.style.width = '100%';
				textContainer.style.lineHeight = '20px';
				textContainer.style.textAlign = 'center';
			}
		}
		maskSubDiv.appendChild(textContainer);
		
		//set public
		Object.defineProperty( this, 'leftProgressDiv', { value: leftProgressDiv } );
		Object.defineProperty( this, 'rightProgressDiv', { value: rightProgressDiv } );
		Object.defineProperties( this, {
			container : { value: container},
			textContainer : { get: function(){return textContainer;} },
			textType : { value: textType, writable: true, enumerable: false, configurable: false},
			textTitle : { value: textTitle, writable: true},
		});
	};
	LoadingCircle.prototype.renderProgress = function(progress){
		var value = progress * 360 / 100;
		//this.progressDiv.style.transform = 'rotate('+value+'deg)';
		//this.progressDiv.style.webkitTransform = 'rotate('+value+'deg)';
		//return;
		if(progress<=50){
			this.rightProgressDiv.style.transform = 'rotate('+value+'deg)';
			this.leftProgressDiv.style.transform = 'rotate(0deg)';
		}else{
			this.rightProgressDiv.style.transform = 'rotate(180deg)';
			this.leftProgressDiv.style.transform = 'rotate('+(value-180)+'deg)';
		}
	};
	classExtend(LoadingCircle, LoadingBase);
	return LoadingCircle;
})();	
	
	//inheritance
	function classExtend(childClass, parentClass){
		var initializing = false, fnTest = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;
		var _super = parentClass.prototype;
		var prop = childClass.prototype;
		var prototype = typeof Object.create == "function" ? Object.create(parentClass.prototype):new parentClass();
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;
			
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
			
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;
			
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		childClass.prototype = prototype;
		childClass.prototype.constructor = childClass;
	}
})();


