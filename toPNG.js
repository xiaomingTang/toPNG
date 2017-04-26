window.onload=function(){
 	
	function $(id){
		return document.getElementById(id);
	}
	
	var fileList = $("file");
	
	myjs.addHandler(fileList, "change", function(event){
		var e = myjs.getEvent(event);
		var t = myjs.getTarget(e);
		var files = t.files;
		var reader = new FileReader();
		
		if(/image/.test(files[0].type)){
			reader.readAsDataURL(files[0]);
		}
		
		reader.onerror = function(){
			console.log("FileReader initialize error");
		}
		reader.onprogress = function(event){
			if(event.lengthComputable){
				console.log(event.loaded + "/" + event.total);
			}
		}
		reader.onload = function(){
			$("img").src = reader.result;
			
			$("img").onload = function(){
				var width = this.width;
				var height = this.height;
				if(document.getElementsByTagName("canvas").length > 0){
					var oldCanvas = document.getElementsByTagName("canvas")[0];
					oldCanvas.parentNode.removeChild(oldCanvas);
				}
				
				var canvas = $("canvas").appendChild(document.createElement("canvas"));
				canvas.width = width;
				canvas.height = height;
				
				var config = {
					img: $("img"),
					context: canvas.getContext("2d"),
					width: canvas.width,
					height: canvas.height
				}
				
				var filter = new Filter(config);
				
				$("input").onchange = function(event){
					var e = myjs.getEvent(event);
					var t = myjs.getTarget(e);
					
					var n = parseInt($("input-value").innerHTML = t.value);
					
					filter.grayFilter.call(filter, n);
					
				}
			}
		}
		
	});
 	
	function Filter(config){
		this.img = config.img;
		this.context = config.context;
		this.width = config.width;
		this.height = config.height;
		
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.drawImage(this.img, 0, 0);
		this.imageData = this.context.getImageData(0, 0, this.width, this.height);
		//	作为图片初始值始终保存
		this.data = [];
		for(var i = 0, len = this.imageData.data.length; i < len; i += 4){
			this.data[i] = this.imageData.data[i];
			this.data[i+1] = this.imageData.data[i+1];
			this.data[i+2] = this.imageData.data[i+2];
			this.data[i+3] = this.imageData.data[i+3];
		}
		
	}
	Filter.prototype = {
		constructor: Filter,
		
		grayFilter: function(n){
			
			for(var i = 0, len = this.data.length; i < len; i += 4){
				var average = (this.data[i] + this.data[i+1] + this.data[i+2]) / 3;
				
				if(average > n){
					//this.imageData.data[4 * i] = this.imageData.data[4 * i + 1] = this.imageData.data[4 * i + 2] = 255;
					this.imageData.data[i + 3] = 0;
				} else {
					this.imageData.data[i] = this.data[i];
					this.imageData.data[i + 1] = this.data[i + 1];
					this.imageData.data[i + 2] = this.data[i + 2];
					this.imageData.data[i + 3] = this.data[i + 3];
				}
				
			}
			
			this.context.putImageData(this.imageData, 0, 0);
			
		},
		
	}
	
	
 	
}
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
