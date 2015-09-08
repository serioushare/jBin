
jBin.sets.expo = {};

/** List of mnemonic instruction names ***********
 * The comments at the end of each line show the *
 * markup of the instructions.                   *
 *************************************************/
jBin.sets.expo.mnem = [];
jBin.sets.expo.mnem[0x00] = ['nop',  '00', 'No Operation'];				//  nop
jBin.sets.expo.mnem[0x0A] = ['.def', '0A', 'Define var or function'];	//  .def e_name, i_name
jBin.sets.expo.mnem[0x0B] = ['.def', '0B', 'Define var or function'];	//  .def e_name, i_name, imm8
jBin.sets.expo.mnem[0x0C] = ['.def', '0C', 'Define var or function'];	//  .def e_name, i_name, r/m8
jBin.sets.expo.mnem[0xFF] = ['end',  'FF', 'End expo section'];			//

/** nop ******************************************
 * No Operation                                  *
 *************************************************/
jBin.sets.expo[0x00]=function(m){m.dbg(m.p++, 0)};

// .def
/** .def *****************************************
 * make a routine publicly accessable            *
 *************************************************/
jBin.sets.expo[0x0A] = function(m){
	m.p++;
	var l = m.bin[m.p++];
	var n = "";
	for(var i=0; i<l; i++){
		n += String.fromCharCode(m.bin[m.p++]);
	}
	var a = m.bin[m.p++]*16777216
	      + m.bin[m.p++]*65536
	      + m.bin[m.p++]*256
	      + m.bin[m.p++];
	window[n] = function(){m.p=a;m.run()};
	m.dbg(m.p-(l+2), 10, n, h(a, 8));
};




/** end ******************************************
 * Set the instruction set back to jbin          *
 *************************************************/
jBin.sets.expo[0xFF]=function(m){m.dbg(m.p++,255);m.set="jbin"};
