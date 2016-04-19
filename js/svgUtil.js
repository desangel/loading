
(function(){
/**
* LoadingBase
*/	
SvgUtil = (function(){
	"use strict";
	var SVG_NS = 'http://www.w3.org/2000/svg';
	var SVG_VERSION = '1.1';
	var VERSION = '0.1';
	if(!isSupport()){
		console.warn('this browser is not support svg');
	}
	
	return {
		isSupport: isSupport,
		setAttribute: setAttribute,
		attrToStyle: attrToStyle,
		elementToStr: elementToStr,
		createSvg: createSvg,
		createDefs: createDefs,
		createLinearGradient: createLinearGradient,
		createRadialGradient: createRadialGradient,
		createFilter: createFilter,
		createGroup: createGroup,
		createPath : createPath,
		
		SVG_NS: SVG_NS,  //name space
		SVG_VERSION: SVG_VERSION,  
		VERSION: VERSION  
	};
	
	function isSupport(){
		SVG_NS = 'http://www.w3.org/2000/svg';
		return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
	}
	
	function setAttribute(element, attr, value){
		if(value!==undefined)element.setAttribute(attr, value);
	}
	
	function attrToStyle(element, names){
		var style = element.getAttribute('style')||'';
		var attributes = element.attributes;
		for(var i in names){
			var name = names[i];
			var value = element.getAttribute(name);
			style += name + ':' + value +';'
		}
		setAttribute(element, 'style', style);
		return style;
	}
	
	function elementToStr(element){
		return element.outerHTML||(function(){
			var container = document.createElement('div');
			container.appendChild(element);
			return container.innerHTML||'';
		})();
	}
	
	function createSvg(options){
		options = options||{};
		var id = options.id;
		var className = options.className;
		var viewBox = options.viewBox;
		var element = document.createElementNS(SVG_NS, 'svg');
		setAttribute(element, 'id', id);
		setAttribute(element, 'class', className);
		setAttribute(element, 'viewBox', viewBox);
		setAttribute(element, 'version', SVG_VERSION);
		return element;
	}
	
	function createDefs(){
		var element = document.createElementNS(SVG_NS, 'defs');
		return element;
	}
	
	function createStop(options){
		options = options||{};
		var offset = options.offset||0;
		var color = options.color||'#000';
		var opacity = options.opacity||1;
		var element = document.createElementNS(SVG_NS, 'stop');
		setAttribute(element, 'offset', offset);
		setAttribute(element, 'stop-color', color);
		setAttribute(element, 'stop-opacity', opacity);
		attrToStyle(element, ['stop-color', 'stop-opacity']);
		return element;
		
	}
	
	function createLinearGradient(options){
		options = options||{};
		var id = options.id;
		var x1 = options.x1||0;
		var y1 = options.y1||0;
		var x2 = options.x2||1;
		var y2 = options.y2||0;
		var stops = options.stops;
		var element = document.createElementNS(SVG_NS, 'linearGradient');
		setAttribute(element, 'id', id);
		setAttribute(element, 'x1', x1);
		setAttribute(element, 'y1', y1);
		setAttribute(element, 'x2', x2);
		setAttribute(element, 'y2', y2);
		for(var i in stops){
			element.appendChild(createStop(stops[i]));
		}
		return element;
	}
	
	function createRadialGradient(options){
		options = options||{};
		var id = options.id;
		var r = options.r||0.5;
		var cx = options.cx||0.5;
		var cy = options.cy||0.5;
		var fx = options.x2||cx;   //focal point
		var fy = options.y2||cy;
		var spreadMethod = options.spreadMethod || "pad";
		var gradientTransform = options.gradientTransform;// "rotate(0,0,0) translate(0,0) scale(1,1)";
		var stops = options.stops;
		var element = document.createElementNS(SVG_NS, 'radialGradient');
		setAttribute(element, 'id', id);
		setAttribute(element, 'r', r);
		setAttribute(element, 'cx', cx);
		setAttribute(element, 'cy', cy);
		setAttribute(element, 'fx', fx);
		setAttribute(element, 'fy', fy);
		setAttribute(element, 'spreadMethod', spreadMethod);
		setAttribute(element, 'gradientTransform', gradientTransform);
		for(var i in stops){
			element.appendChild(createStop(stops[i]));
		}
		return element;
	}
	
	function createFilter(options){
		options = options||{};
		var id = options.id;
		//feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix
		//feDiffuseLighting feDisplacementMap feFlood feGaussianBlur feImage
		//feMerge feMorphology feOffset feSpecularLighting feTile
		//feTurbulence feDistantLight fePointLight feSpotLight
		var type = options.type;
		var scope = options.scope||'SourceGraphic';
		var stdDeviation = options.stdDeviation;  //模糊量
		var element = document.createElementNS(SVG_NS, 'filter');
		setAttribute(element, 'id', id);
		
		var fe = document.createElementNS(SVG_NS, type);
		setAttribute(fe, 'in', scope);
		setAttribute(fe, 'stdDeviation', stdDeviation);
		element.appendChild(fe);
		return element;
	}
	
	function createGroup(options){
		options = options||{};
		var title = options.title;
		var element = document.createElementNS(SVG_NS, 'g');
		if(title!==undefined){
			var titleElement = document.createElementNS(SVG_NS, 'title');
			element.appendChild(titleElement);
		}
		return element;
	}
	
	function createPath(options){
		options = options||{};
		var id = options.id;
		var className = options.className;
		var d = options.d;
		var filter = options.filter;
		var fill = options.fill||undefined;
		var fillOpacity = options.fillOpacity||null;
		var stroke = options.stroke||undefined;
		var strokeOpacity = options.strokeOpacity||null;
		var strokeWidth = options.strokeWidth||undefined;
		var element = document.createElementNS(SVG_NS, 'path');
		setAttribute(element, 'id', id);
		setAttribute(element, 'class', className);
		setAttribute(element, 'd', d);
		setAttribute(element, 'filter', filter);
		setAttribute(element, 'fill', fill);
		setAttribute(element, 'fill-opacity', fillOpacity);
		setAttribute(element, 'stroke', stroke);
		setAttribute(element, 'stroke-opacity', strokeOpacity);
		setAttribute(element, 'stroke-width', strokeWidth);
		return element;
	}
})();

/**
* Svg LoadingBase
*/
(function(){
	"use strict";
	
	SvgUtil.LoadingBase = function(options){
		var self = this;
		if(options)self.init(options);
	}
	SvgUtil.LoadingBase.prototype = {
		constructor : SvgUtil.LoadingBase,
		
		init : function(options){
			console.error('unimplement init');
		},
		show : function(){
			this.container.style.display = '';
		},
		hide : function(){
			this.container.style.display = 'none';
		},
		getProgress : function(){
			return Math.floor(this.current * 10000 / this.total) /10000;  //0.0000 - 1.0000
		},
		render : function(){
			var progress = this.getProgress();
			this.renderProgress(progress);
		},
		renderProgress : function(progress){
			console.error('unimplement renderProgress');
		},
		start : function(total){
			this.current = 0;
			this.total = total||1;
			this.render();
		},
		step : function(step){
			this.current+=step;
			if(this.current>=this.total)this.current=this.total;
			this.render();
		},
		process : function(progress){
			this.current=progress;
			if(this.current>=this.total)this.current=this.total;
			this.render();
		},
		isEnd : function(){
			return this.current==this.total;
		},
		html: function(){
			return SvgUtil.elementToStr(this.svgElement);
		},
		createSubDiv : function(){ //for vertical-middle
			var subDiv = document.createElement('div');
			subDiv.className = 'subDiv';
			subDiv.style.display = 'table-cell';
			subDiv.style.verticalAlign = 'middle';
			return subDiv;
		}
	};
})();

/**
* Svg ArcLoading
*/
(function(){
	"use strict";
	
	SvgUtil.ArcLoading = function(options){
		var self = this;
		SvgUtil.LoadingBase.call( this, options );
	}
	
	SvgUtil.ArcLoading.prototype = {
		constructor : SvgUtil.ArcLoading,
		init : function(options){
			var self = this;
			//init options
			var options = options||{};
			var id = options.id;
			var className = options.className||'svg_arc_loading';
			var stroke = options.stroke;
			var frontColor = options.frontColor || '#3B8BC4'; //3B8BC4 00BFFF 87CEFA
			var backColor = options.backColor || '#3A3A3A';
			var filter = options.filter;
			var strokeWidth = options.strokeWidth||2;
			
			var viewBox = options.viewBox || '0 0 400 400';
			var cx = options.cx!==undefined?options.cx:200;
			var cy = options.cy!==undefined?options.cy:cx;
			var rx1 = options.rx1!==undefined?options.rx1:190;
			var ry1 = options.ry1!==undefined?options.ry1:rx1;
			var rx2 = options.rx2!==undefined?options.rx2:150;
			var ry2 = options.ry2!==undefined?options.ry2:rx2;
			var deg1 = options.deg1!==undefined?options.deg1:225;  //225
			var deg2 = options.deg2!==undefined?options.deg2:-45;  //-45
			self.gParam = {
				cx: cx,
				cy: cy,
				rx1: rx1,
				ry1: ry1,
				rx2: rx2,
				ry2: ry2,
				deg1: deg1,
				deg2: deg2
			};
			
			var svg = SvgUtil.createSvg({ id: id, className: className, viewBox: viewBox });
			
			var container = options.container;
			if(container)container.appendChild(svg);
			
			var defs = options.defs;
			if(defs){
				var defsElement = SvgUtil.createDefs();
				svg.appendChild(defsElement);
				
				var linearGradients = defs['linearGradients'];
				if(linearGradients)for(var i in linearGradients)defsElement.appendChild(SvgUtil.createLinearGradient(linearGradients[i]));
				
				var radialGradients = defs['radialGradients'];
				if(radialGradients)for(var i in radialGradients)defsElement.appendChild(SvgUtil.createRadialGradient(radialGradients[i]));
				
				var filters = defs['filters'];
				if(filters)for(var i in filters)defsElement.appendChild(SvgUtil.createFilter(filters[i]));
			}
			
			
			var group = SvgUtil.createGroup( { title: 'title1' } );
			svg.appendChild(group);
			
			var backElement = SvgUtil.createPath({ 
				d: self.computePath(1),
				filter: filter,
				fill: backColor,
				stroke: stroke,
				strokeWidth: strokeWidth
			});
			group.appendChild(backElement);
			
			var frontElement = SvgUtil.createPath({ 
				d: self.computePath(0),
				filter: filter,
				fill: frontColor,
				stroke: stroke,
				strokeWidth: strokeWidth
			});
			group.appendChild(frontElement);
			
			defineProperties(self, {
				container: { value: container },
				svgElement: { value: svg },
				frontElement: { value: frontElement }
			});
		},
		
		renderProgress : function(progress){
			var path = this.computePath(progress);
			this.frontElement.setAttribute('d', path);
		},
		
		computeRadianParam: function(rx,ry,cx,cy,deg1,deg2){
			var result = {};
			var rad1 = deg1 * Math.PI/180;
			var rad2 = deg2 * Math.PI/180;
			result['x1'] = cx + rx*Math.cos(rad1);
			result['y1'] = cy - ry*Math.sin(rad1);
			result['x2'] = cx + rx*Math.cos(rad2);
			result['y2'] = cy - ry*Math.sin(rad2);
			result['xLength'] = result['x2'] - result['x1'];
			result['yLength'] = result['y2'] - result['y1'];
			result['xAxisRotation'] = deg1 - deg2;
			result['largeArcFlag'] = deg1 - deg2 > 180? 1:0;
			result['sweepFlag'] = deg1 - deg2 > 0? 1:0;
			return result;
		},
		
		computePath: function(progress, options){
			options = options||{};
			var cx = options.cx||this.gParam.cx;
			var cy = options.cy||this.gParam.cy;
			var rx1 = options.rx1||this.gParam.rx1;
			var ry1 = options.ry1||this.gParam.ry1;
			var rx2 = options.rx2||this.gParam.rx2;
			var ry2 = options.ry2||this.gParam.ry2;
			var deg1 = options.deg1||this.gParam.deg1;
			var deg2 = options.deg2||this.gParam.deg2;
			var deg = deg1 * (1-progress) + deg2 * (progress);
			var param1 = this.computeRadianParam(rx1, ry1, cx, cy, deg1, deg);
			var param2 = this.computeRadianParam(rx2, ry2, cx, cy, deg, deg1);
			var xAxisRotation = 0;
			var largeArcFlag = param1['largeArcFlag'];
			
			var path = 'm'+param1['x1']+','+param1['y1'];
			path += 'a'+rx1+','+ry1+','+xAxisRotation+','+largeArcFlag+','+param1['sweepFlag']+','+param1['xLength']+','+param1['yLength'];
			path += 'l'+( param2['x1']-param1['x2'] )+','+(param2['y1']-param1['y2']);
			path += 'a'+rx2+','+ry2+','+xAxisRotation+','+largeArcFlag+','+param2['sweepFlag']+','+param2['xLength']+','+param2['yLength'];
			path += 'z';
			return path;
		},
	};
	classExtend(SvgUtil.ArcLoading, SvgUtil.LoadingBase);
})();

	//ECMA SCRIPT 5
	function defineProperty(obj, name, prop){
		if(typeof Object.defineProperty ==='function'){
			Object.defineProperty(obj, name, prop);
		}
		else{
			obj[name] = prop['value'];
		}
	}
	
	function defineProperties(obj, props){
		if(typeof Object.defineProperties ==='function'){
			Object.defineProperties(obj, props);
		}
		else{
			for(var i in props){
				var prop = props[i]
				obj[i] = prop['value'];
			}
		}
	}
	
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
