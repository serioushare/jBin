
/** jBin - JS Binary Handler ********
 *
 */
var jBin = new function(){
	var Me = this;
	Me.vms = new Array();
	Me.sets = {};
	Me.debug = true;
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
	var h = '0000000000000000';
	var h = h + i.toString(16);
	return h.slice(l*-1).toUpperCase();
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

jBin.sets.head = {};

jBin.sets.head[0] = function(me){			// NOP
	me.pointer++
	me.dbg(me.pointer-1, 0);
};

jBin.sets.head[10] = function(me){			// version [length:4]
	me.pointer++;
	var ma  = me.bin[me.pointer++];
	var mi  = me.bin[me.pointer++];
	var bld = me.bin[me.pointer++]*256;
		bld+= me.bin[me.pointer++];
	me.version = [ma,mi,bld];
	
	me.dbg(me.pointer-5, 10, ma+"."+mi+"."+bld);
	console.log("version:      "+ma+"."+mi+"."+bld);
}
jBin.sets.head[11] = function(me){			// name [length:1+strlen]
	me.pointer++;
	var l = me.bin[me.pointer++];
	var s = "";
	for(var i=0; i<l; i++){
		s += String.fromCharCode(me.bin[me.pointer++]);
	}
	me.dbg(me.pointer-(l+2), 11, s);
	console.log("name:         "+s);
}
jBin.sets.head[12] = function(me){			// name [length:1+strlen]
	me.pointer++;
	var l = me.bin[me.pointer++];
	var s = "";
	for(var i=0; i<l; i++){
		s += String.fromCharCode(me.bin[me.pointer++]);
	}
	me.dbg(me.pointer-(l+2), 12, s);
	console.log("author:       "+s);
}
jBin.sets.head[255] = function(me){			// NOP
	me.dbg(me.pointer, 255);
	me.set = "jbin";
	me.pointer++
};

jBin.sets.head.set = [];
jBin.sets.head.set[0]   = "nop";
jBin.sets.head.set[2]   = "debug";
jBin.sets.head.set[10]  = "version";
jBin.sets.head.set[11]  = "name";
jBin.sets.head.set[12]  = "author";
jBin.sets.head.set[255] = "close head";

jBin.sets.jbin = {};

// nop
jBin.sets.jbin[0] = function(me){
	me.pointer++;
	me.dbg(me.pointer-1, 0);
};

// header
jBin.sets.jbin[1] = function(me){
	me.pointer++;
	me.dbg(me.pointer-1, 2);
	me.set = "head";
};

// .def
jBin.sets.jbin[3] = function(me){
	me.pointer++;
	var l = me.bin[me.pointer++];
	var n = "";
	for(var i=0; i<l; i++){
		n += String.fromCharCode(me.bin[me.pointer++]);
	}
	var a = me.bin[me.pointer++]*16777216
	      + me.bin[me.pointer++]*65536
	      + me.bin[me.pointer++]*256
	      + me.bin[me.pointer++];
	window[n] = function(){me.pointer=a;me.run()};
	me.dbg(me.pointer-(l+2), 3, n, h(a, 8));
};

// mov r8 imm8
jBin.sets.jbin[48] = function(me){
	me.pointer++;
	me.reg[me.bin[me.pointer++]] = me.bin[me.pointer++];
	me.dbg(me.pointer-3, 48, h(me.bin[me.pointer-2], 2), h(me.reg[me.bin[me.pointer-2]], 2));
};

// mov r16 imm16
jBin.sets.jbin[49] = function(me){
	me.pointer++;
	me.reg[me.bin[me.pointer++]] = me.bin[me.pointer++]*256
	                             + me.bin[me.pointer++];
	me.dbg(me.pointer-4, 49, h(me.bin[me.pointer-3], 2), h(me.reg[me.bin[me.pointer-3]], 4));
};

// mov r32 imm32
jBin.sets.jbin[50] = function(me){
	me.pointer++;
	me.reg[me.bin[me.pointer++]] = me.bin[me.pointer++]*16777216
	                             + me.bin[me.pointer++]*65536
	                             + me.bin[me.pointer++]*256
	                             + me.bin[me.pointer++];
	me.dbg(me.pointer-6, 50, h(me.bin[me.pointer-5], 2), h(me.reg[me.bin[me.pointer-5]], 8));
};

// inc r8
jBin.sets.jbin[128] = function(me){
	
}

// inc r16
jBin.sets.jbin[129] = function(me){
	
}

// inc r32
jBin.sets.jbin[130] = function(me){
	
}

// dec r8
jBin.sets.jbin[131] = function(me){
	
}

// dec r16
jBin.sets.jbin[132] = function(me){
	
}

// dec r32
jBin.sets.jbin[133] = function(me){
	
}



// rjmp
jBin.sets.jbin[224] = function(me){
	me.pointer++;
	np = me.bin[me.pointer++]*(256*256*256)
	   + me.bin[me.pointer++]*(256*256)
	   + me.bin[me.pointer++]*256
	   + me.bin[me.pointer];
	me.dbg(me.pointer-4, 224, h(np, 8));
	me.pointer = np;
}

// int
jBin.sets.jbin[240] = function(me){
	me.pointer++;
	me.dbg(me.pointer-1, 240, h(me.bin[me.pointer], 2));
	jBin.Interrupt[me.bin[me.pointer++]](me);
}

jBin.sets.jbin.set = [];
jBin.sets.jbin.set[0]   = "nop";
jBin.sets.jbin.set[1]   = "header";
jBin.sets.jbin.set[3]   = ".def";
jBin.sets.jbin.set[48]  = "mov";
jBin.sets.jbin.set[49]  = "mov";
jBin.sets.jbin.set[50]  = "mov";
jBin.sets.jbin.set[128] = "inc";
jBin.sets.jbin.set[129] = "inc";
jBin.sets.jbin.set[130] = "inc";
jBin.sets.jbin.set[131] = "dec";
jBin.sets.jbin.set[132] = "dec";
jBin.sets.jbin.set[133] = "dec";
jBin.sets.jbin.set[224] = "jmp";
jBin.sets.jbin.set[240] = "int";

jBin.Registers = [];


jBin.Registers[234] = 0;			// eax
jBin.Registers[235] = 0;			// ebx
jBin.Registers[236] = 0;			// ecx
jBin.Registers[237] = 0;			// edx


jBin.Interrupt = {};

jBin.Interrupt[128] = function(me){
	jBin.System.Call[me.reg[234]](me);
}



jBin.System = {}
jBin.System.Call = {};

jBin.System.Call[1] = function(me){
	me.pointer = -1;
	console.log()
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

jBin.vm = function(element){
	var me      = this;
	me.header   = false;
	me.debug    = false;
	me.pointer  = 0;
	me.version  = [0,0,0];
	me.name     = "";
	me.set      = "jbin";
	me.reg      = jBin.Registers.slice();
	me.hld = [null,null,me.set];
	me.bin;
	
	me.run = function(){
		while((me.pointer>-1)&&(me.pointer<me.bin.length)){
			jBin.sets[me.set][me.bin[me.pointer]](me);
		}
	}
	
	me.load = function(src){
		var loader = new XMLHttpRequest();
		loader.open('GET', src);
		loader.responseType = "arraybuffer";
		loader.onload = function() {
			var buffer = loader.response;
			if(buffer){
				me.bin = new Uint8Array(buffer);
				me.run();
			}
		}
		loader.send();
	}
	
	me.dbg = function(p, i, v1, v2){
		var op = jBin.sets[me.set].set[i]+"                         ";
		op = op.substr(0, 15);
		if(jBin.debug){
			if(v1&&v2){
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op+" ["+v1+"]"+" ["+v2+"]");
			}else if(v1){
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op+" ["+v1+"]");
			}else{
				console.debug(h(p, 8)+" > "+h(i, 4)+": ["+me.set+"] "+op);
			}
		}
	}
	
	me.dbg_o = function(){
		var a3 = h(Math.floor(me.pointer/(256*256*256))%256).toUpperCase();
		var a2 = h(Math.floor(me.pointer/(256*256))%256).toUpperCase();
		var a1 = h(Math.floor(me.pointer/256)%256).toUpperCase();
		var a0 = h(me.pointer%256).toUpperCase();
			
		var ih = h(Math.floor(me.bin[me.pointer]/256)).toUpperCase();
		var il = h(me.bin[me.pointer]).toUpperCase();
		
		console.debug(a3+a2+a1+a0+" > "+ih+il+":  ["+me.set+"] "+jBin.sets[me.set].set[me.bin[me.pointer]]);
	}
	
	me.load(element.src);
}


jBin.VirtualMachine = function(jbin){
	var Me    = this;
	Me.bin    = null;
	Me.hex    = null;
	Me.node   = jbin;
	Me.debug  = true;
	Me.binv   = [0,1,1];
	Me.addr   = 0;
	Me.offset = 0;
	Me.regs   = jBin.Registers.slice();
	
	var pc = 0;
	
	Me.Run = function(){
		Me.addr = Me.addr + Me.offset
		while((Me.addr > -1)&&(Me.addr < Me.bin.length-1)){
			var instr = (Me.bin[Me.addr]*256)+Me.bin[Me.addr+1];
			jBin.Instr(Me, instr);
		}
	}
	
	Me.Exit = function(){
		Me.addr = -1;
	}
	
	Me.printBin = function(){
		var str = "";
		for(var i=0; i<Me.bin.length; i++){
			if(Me.bin[i]<16){
				str = str + "0" + Me.bin[i].toString(16) + " ";
			}else{
				str = str + Me.bin[i].toString(16) + " ";
			}
			if(i%16 == 15){
				console.info(str);
				str = "";
			}
		}
		if(str != ""){
			console.info(str);
			str = "";
		}
	}
	
	Me.binLoaded = function(data){
		Me.bin = data.bin;
		Me.hex = data.hex;
		Me.offset = Me.bin[0];
		Me.Run();
	}
	jBin.Loader.LoadBin(jbin.getAttribute("src"), Me.binLoaded);
}

jBin.TestMachine = function(jbin){
	var Me    = this;
	Me.bin    = null;
	Me.asm    = "";
	Me.node   = jbin;
	Me.debug  = true;
	Me.binv   = [0,1,1];
	Me.addr   = 0;
	Me.offset = 0;
	Me.regs   = jBin.Registers.slice();
	
	
	var pc = 0;
	
	Me.Run = function(){
		
	}
	
	Me.Exit = function(){
		Me.addr = -1;
	}
	
	Me.printAsm = function(){
		var lines = Me.asm.split("\r\n")
		for(var i=0; i<lines.length; i++){
			console.info(lines[i]);
		}
	}
	
	Me.binLoaded = function(data){
		Me.asm = data;
		Me.Run();
	}
	jBin.Loader.LoadAsm(jbin.getAttribute("src"), Me.binLoaded);
}

jBin.Loader = {};

jBin.Loader.LoadBin = function(src, callback){
	var client = new XMLHttpRequest();
	client.open('GET', src);
	client.responseType = "arraybuffer";
	
	client.onload = function() {
		var arrayBuffer = client.response;
		if (arrayBuffer) {
			var data = {};
			data.bin = new Uint8Array(arrayBuffer);
			data.hex = data.bin.toString(16);
			console.info(data)
			callback(data);
		}
	}
	client.send();
}

jBin.Loader.LoadAsm = function(src, callback){
	var client = new XMLHttpRequest();
	client.open('GET', src);
	
	client.onreadystatechange = function() {
		if(client.readyState==4){
			callback(client.responseText);
		}
	}
	client.send();
}

jBin.Loader.Loop=window.setInterval(function(){
	if(document.readyState=="complete"){
		window.clearInterval(jBin.Loader.Loop)
		var jbins = document.getElementsByTagName("script");
		for(var i=0; i<jbins.length; i++){
			if(jbins[i].getAttribute("type")=="asm/jbin"){
				//jBin.TestMachines[jBin.TestMachines.length] = new jBin.TestMachine(jbins[i]);
			}else if(jbins[i].getAttribute("type")=="binary/jbin"){
				//jBin.VirtualMachines[jBin.VirtualMachines.length] = new jBin.VirtualMachine(jbins[i]);
				jBin.vms.push(new jBin.vm(jbins[i]))
			}
		}
	}
},1);


