
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
			if(jbins[i].getAttribute("type")=="binary/jbin"){
				jBin.vms.push(new jBin.vm(jbins[i]))
			}
		}
	}
},1);














