/** jBin - JS Binary Handler ********
 *
 */
var jBin = new function(){
	var Me = this;
	Me.vms = new Array();
	Me.sets = {};
	Me.debug = true;
	Me.binlist = [];
	Me.pids = {};
};

function __d(i, e){
	if(e==1){
		var j = "", l = i.length;
		for(var c=0; c<l; c++){j=j+i[l-(c+2)]+i[l-(c+1)];c++};
		return parseInt(j, 16);
	}else{
		return parseInt(i, 16);
	}
}



function d(i, e){
	if(e==1){
		var j = "", l = i.length;
		for(var c=0; c<l; c++){j=j+i[l-(c+2)]+i[l-(c+1)];c++};
		return parseInt(j, 16);
	}else{
		return parseInt(i, 16);
	}
}
function h(i, l){
	var l = l||2;
	if(l==1){
		var h = i.toString(16);
		if(h.length%2==1){
			return '0'+h.toUpperCase()
		}else{
			return h.toUpperCase()
		}
	}else{
		var h = '0000000000000000';
		var h = h + i.toString(16);
		return h.slice(l*-1).toUpperCase();
	}
}

function r(s){
	for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
	return o;
}

Uint8Array.prototype.toString = function(){
	var s = '';
	for(var i=0; i<this.length; i++){
		if(this[i]<16)s=s+'0'
		s = s+h(this[i]);
	}
	return s;
}

Array.prototype.get = function(a,l){
	var r = 0;
	for(var i=0; i<l; i++){
		r=(r+=this[a+i])*256
	}
	return r/256;
}

Uint8Array.prototype.get = function(a,l){
	var r = 0;
	for(var i=0; i<l; i++){
		r=(r+=this[a+i])*256
	}
	return r/256;
}

Array.prototype.set = function(a,v,l){
	v*=256;var b=[]
	for(var i=0; i=l; i++){
		b[i]=(v/=256)%256;
	}
	this.set(b,a)
}
