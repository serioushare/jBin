
jBin.System = {}
jBin.System.Call = {};

jBin.System.Call[1] = function(me){
	me.p = -1;
}

jBin.System.Call[4] = function(me){
	var s = me.reg[236];
	var l = me.reg[237]*2;
	var c = me.reg[235];
	var str = "";
	for(var i=s; i<(s+l); i++){
		str = str + String.fromCharCode((me.bin[i]*256)+me.bin[i+1]);
		i++;
	}
	if(c==0){
		console.log(str);
	}else if(c==1){
		console.warn(str);
	}else if(c==2){
		console.error(str);
	}else if(c==3){
		console.info(str);
	}
}
