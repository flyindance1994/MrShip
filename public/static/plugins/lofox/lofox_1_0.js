/**
 * @author bh-lay
 * @github https://github.com/bh-lay/lofox
 * @version 1.0
 * @modified 2015-04-03 16:04
 *  location fox
 */

(function(global,doc,factoryFn){
	var factory = factoryFn();
	global.util = global.util || {};
	global.util.lofox = factory;
	
	//�ṩCommonJS�淶�Ľӿ�
	global.define && define(function(require,exports,module){
		//����ӿ�
		return factory;
	});
	
})(window,document,function(exports){
	/**
	 * ��ʽ��path 
	 */
	function pathParser(input){
		//ȥ����β�ġ�/��
		input = input.replace(/^\/*|\/*$/g,'');
		//�ָ�·��
		var output = input.split(/\//);
		
		if(output.length == 1 && output[0] == ''){
			output = [];
		}
		
		return output;
	}
	/**
	 * ��ʽ��search 
	 */
	function searchParser(search){
		var resultObj = {};
		if(search && search.length > 1){
			var items = search.split('&');
			for(var index = 0 ; index < items.length ; index++ ){
				if(! items[index]){
					continue;
				}
				var kv = items[index].split('=');
				resultObj[kv[0]] = typeof kv[1] === "undefined" ? "":kv[1];
			}
		}
		return resultObj;
	}
	/**
	 * �¼������� 
	 */
	function EMIT(eventName,args){
		//�¼����޸��¼�����������
		if(!this.events[eventName]){
			return
		}
		for(var i=0,total=this.events[eventName].length;i<total;i++){
			this.events[eventName][i].apply(this,args);
		}
	}
	function HTML5(){
		var this_fox = this;
		
		window.addEventListener('popstate',function(e){
			//console.log(e);
			var state = e.state || {};
			//console.log('from popstate event !',state);
			var url = state.url || null;
			//�����һ�β�ȷ���ԵĴ���
			if(url){
				this_fox.refresh(url);
			}
			return false;
		});
		this.push = function(url){
			window.history.pushState({
				url: url
			},'test',url);
			EMIT.call(this,'change');
		}
	}

	function HASH(){
		var this_fox = this;
		
		//����hash�������ԣ�ͨ����ֵ���ж��Ƿ���Ҫ����refresh����
		var private_need_refresh = true;
		//��¼hashֵ
		var private_oldHash = window.location.hash;
		
		if(typeof(window.onhashchange) != 'undefined'){
			window.onhashchange = function(e){
				var new_hash = window.location.hash || '#';
			//	console.log('event',new_hash);
				private_oldHash = new_hash;
				var url = new_hash.replace(/^#/,'');
				
				if(private_need_refresh){
					this_fox.refresh(url);
				}else{
					private_need_refresh = true;
				}
			}
		}else{
			setInterval(function(){
				var new_hash = window.location.hash || '#';
			//	console.log('interval',new_hash);
				//hash�����仯
				if(new_hash != private_oldHash){
					private_oldHash = new_hash;
					var url = new_hash.replace(/^#/,'');
					
					if(!private_need_refresh){
						this_fox.refresh(url);
					}else{
						private_need_refresh = true;
					}
				}
			},50);
		}
		
				
		//��ʼ������hash
		if(private_oldHash.length < 2){
			private_oldHash = window.location.pathname;
			window.location.hash = private_oldHash;
		}
		this.push = function(url){
			private_need_refresh = false;
			this.url = url;
			window.location.hash = url;
			EMIT.call(this,'change');
		}
	}
	/**
	 * ��mapsƥ��url�����ض�Ӧֵ
	 * @param {Object} url
	 * @param {Object} maps
	 */
	function findUrlInMaps(inputPath,maps){
	
		//�����url��ȡ����ֵ
		var matchValue = {};
		//��¼�ҵ���maps��
		var this_mapsItem = null;
		
		//����maps
		for(var i in maps){
			//��ȡmaps��ǰ��������ʽ��url�ڵ�
			var pathData = pathParser(i);
			//�ȶ�����url������maps��ǰ�ڵ㳤���Ƿ�һ��
			if(pathData.length != inputPath.length){
				continue
			}
			
			this_mapsItem = maps[i];
			//����maps��ǰurl�ڵ�
			for(var s=0,total=pathData.length;s<total;s++){
				//1.�ȶ�����url��maps��Ӧurl�Ƿ�һ��
				if(pathData[s] != inputPath[s]){
					//2.��⵱ǰ�ڵ��Ƿ�Ϊ����
					var tryMatch = pathData[s].match(/{(.+)}/);
					if(tryMatch){
						var key = tryMatch[1];
						matchValue[key] = inputPath[s];
					}else{
						//�Ȳ�һ�£��ֲ��Ǳ�������������maps��¼
						this_mapsItem = null;
						matchValue = {};
						break
					}
				}
			}
			//���Ѿ�ƥ������������ƥ��
			if(this_mapsItem){
				break
			}
		}
		if(this_mapsItem){
			return {
				'mapsItem' : this_mapsItem,
				'data' : matchValue
			};
		}else{
			return false;
		}
	}
	/**
	 *  lofox������
	 * 
	 */
	function LOFOX(param){
		var this_fox = this,
			param = param || {};
		this.events = {};
		this.push = null;
		this._maps = {};
		//δ����maps�б��url
		this._rest = null;
		if(param.use != 'hash' && window.history&&window.history.pushState){
			this._use = 'html5';
			HTML5.call(this);
		}else{
			this._use = 'hash';
			HASH.call(this);
		}
		//Ϊ�첽�ӿ�
		setTimeout(function(){
			this_fox.refresh();
		},10);
	}
	LOFOX.prototype = {
		rest : function(callback){
			if(typeof(callback) =='function'){
				this._rest = callback;
			}
		},
		on : function ON(eventName,callback){
			//�¼����޸��¼�������һ���¼���
			if(!this.events[eventName]){
				this.events[eventName] = [];
			}
			this.events[eventName].push(callback);
		},
		set : function(url,callback){
			var routerNames = [];
			var total;
			var type = Object.prototype.toString.call(url);
			if(type == '[object Array]'){
				routerNames = url;
				total = routerNames.length;
			}else if (type == '[object String]'){
				routerNames = [url];
				total = 1;
			}
			for (var i=0;i<total;i++) {
				var routerName = routerNames[i];
				var callback = typeof(callback) =='function' ? callback :null;
				this._maps[routerName] = {
					'renderFn' : callback
				};
			};
		},
		//����ҳ�����
		title : function(title){
			var type = typeof(title);
			if(type.match(/number|string/)){
				document.title = title
			}
		},
		refresh : function (url){
			var urlString;
			if(url){
				urlString = url ;
			}else if(this._use == 'html5'){
				urlString = window.location.pathname+window.location.search+window.location.hash;
			}else if(this._use == 'hash'){
				urlString = window.location.hash || '#';
				//ȥ��hash���{#}
				urlString = urlString.replace(/^#/,'');
			}
			
			var urlSplit = urlString.length>0 ? urlString.split(/\?/) : ['',''];
			
			var urlStr = urlSplit[0].split('#')[0];
			var searchStr = urlSplit[1];
			
			var pathData = pathParser(urlStr);
			var searchData = searchParser(searchStr);
			
			var result = findUrlInMaps(pathData,this._maps);
			
            //������ͼˢ���¼�
			EMIT.call(this,'beforeRefresh',[pathData,searchData]);
			if(result){
				var data = result.data;
				//ִ��set�������õĻص�
				result.mapsItem['renderFn'].call(this,data,pathData,searchData);
				//���ñ���
				result.mapsItem['title'] && this.title(result.mapsItem['title']);
			}else{
				this._rest && this._rest.call(this,pathData,searchData);
			}
            //������ͼˢ���¼�
			EMIT.call(this,'refresh',[pathData,searchData]);
		}
	};
	
	return function(param){
		return new LOFOX(param)
	};
});