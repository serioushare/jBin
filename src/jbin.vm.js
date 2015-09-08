
jBin.vm = function(src){
	var me      = this;
	me.p		= 0;
	me.set      = "jbin";
	me.reg      = new Array();
	me.mem      = new Array();
	me.mem[0]   = 3
	me.bin      = null;
	me.src      = src;
	
	me.pid      = jBin.pids.length;
	
	me.version  = [0,0,0];
	me.name     = "";
	me.author   = "";
	
	me.run = function(){
		while((me.p>-1)&&(me.p<me.bin.length)){
			jBin.sets[me.set][me.bin[me.p]](me);
		}
	}
	
	me.load = function(src){
		me.src = src;
		var loader = new XMLHttpRequest();
		loader.open('GET', src);
		loader.responseType = "arraybuffer";
		loader.onload = function() {
			var buffer = loader.response;
			if(buffer){
				me.bin = new Uint8Array(buffer);
				me.run()
			}
		}
		loader.send();
	}
	
	me.dbg = function(p, i, v1, v2, v3){
		var op = jBin.sets[me.set].mnem[i][0]+"                         ";
		op = op.substr(0, 15);
		if(jBin.debug){
			if(v1&&v2&&v3){
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op+" ["+v1+"]"+" ["+v2+"] "+v3);
			}else if(v1&&v2){
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op+" ["+v1+"]"+" ["+v2+"]");
			}else if(v1){
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op+" ["+v1+"]");
			}else{
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op);
			}
		}
	}
	
	me.load(src);
}

