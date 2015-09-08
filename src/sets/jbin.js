
jBin.sets.jbin = {};

/** List of mnemonic instruction names ***********
 * The comments at the end of each line show the *
 * markup of the instructions.                   *
 *************************************************/
jBin.sets.jbin.mnem = [];
jBin.sets.jbin.mnem[0x00] = ['nop',     '00', 'No Operation'];
jBin.sets.jbin.mnem[0x01] = ['section', '01', 'Head Section'];
jBin.sets.jbin.mnem[0x02] = ['section', '02', 'Expose Section'];

jBin.sets.jbin.mnem[0x0E] = ['section', '0E'];					//  section .[str4]
jBin.sets.jbin.mnem[0x0F] = ['', '0F'];							//  section .[str4]
jBin.sets.jbin.mnem[0x10] = ["add"];								//  add r, r			10				done
jBin.sets.jbin.mnem[0x11] = ["add"];								//  add r, m			11				done
jBin.sets.jbin.mnem[0x12] = ["add"];								//  add r, imm32		12				done
jBin.sets.jbin.mnem[0x13] = ["add"];								//  add r, dat32		13				done
jBin.sets.jbin.mnem[0x14] = ["sub"];								//  sub r, r			14
jBin.sets.jbin.mnem[0x15] = ["sub"];								//  sub r, m			15
jBin.sets.jbin.mnem[0x16] = ["sub"];								//  sub r, imm32		16
jBin.sets.jbin.mnem[0x17] = ["sub"];								//  sub r, dat32		17
jBin.sets.jbin.mnem[0x18] = ["adc"];								//  adc r, r			18
jBin.sets.jbin.mnem[0x19] = ["adc"];								//  adc r, m			19
jBin.sets.jbin.mnem[0x1A] = ["adc"];								//  adc r, imm32		1A
jBin.sets.jbin.mnem[0x1B] = ["adc"];								//  adc r, dat32		1B
jBin.sets.jbin.mnem[0x1C] = ["sbb"];								//  sbb r, r			1C
jBin.sets.jbin.mnem[0x1D] = ["sbb"];								//  sbb r, m			1D
jBin.sets.jbin.mnem[0x1E] = ["sbb"];								//  sbb r, imm32		1E
jBin.sets.jbin.mnem[0x1F] = ["sbb"];								//  sbb r, dat32		1F
jBin.sets.jbin.mnem[0x20] = ["or"];								//  or r8, r8			20
jBin.sets.jbin.mnem[0x21] = ["or"];								//  or r32, r32			21
jBin.sets.jbin.mnem[0x22] = ["or"];								//  or r8, imm8			22
jBin.sets.jbin.mnem[0x23] = ["or"];								//  or r32, imm32		23



jBin.sets.jbin.mnem[64]  = ["inc"];								//  inc r8				40
jBin.sets.jbin.mnem[65]  = ["inc"];								//  inc r32				41
jBin.sets.jbin.mnem[66]  = ["dec"];								//  dec r8				42
jBin.sets.jbin.mnem[67]  = ["dec"];								//  dec r32				43



jBin.sets.jbin.mnem[0x80] = ["mov"];								//  mov r, r			80
jBin.sets.jbin.mnem[0x81] = ["mov"];								//  mov r, m			81
jBin.sets.jbin.mnem[0x82] = ["mov"];								//  mov r, imm32		82
jBin.sets.jbin.mnem[0x83] = ["mov"];								//  mov r, dat			83
jBin.sets.jbin.mnem[0x84] = ["mov"];								//  mov m, r			84
jBin.sets.jbin.mnem[0x85] = ["mov"];								//  mov m, m			85
jBin.sets.jbin.mnem[0x86] = ["mov"];								//  mov m, imm32		86
jBin.sets.jbin.mnem[0x87] = ["mov"];								//  mov m, dat			87

jBin.sets.jbin.mnem[0xE0] = ["jmp"];
jBin.sets.jbin.mnem[0xF0] = ["int"];

/** nop ******************************************
 * No Operation                                  *
 *************************************************/
jBin.sets.jbin[0x00] = function(m){m.dbg(m.p++,0)};

/** head *****************************************
 * Switch to header instruction set.             *
 *************************************************/
jBin.sets.jbin[0x01] = function(m){m.dbg(m.p++,1,'head');m.set='head'};

/** expo *****************************************
 * Switch to expose instruction set.             *
 *************************************************/
jBin.sets.jbin[0x02] = function(m){m.dbg(m.p++,1,'expo');m.set='expo'};

/** add (r1+r2) **********************************
 * Add r2 to r1                                  *
 * - length:     2 bytes                         *
 * - byte 0:     r1                              *
 * - byte 1:     r2                              *
 *************************************************/
jBin.sets.jbin[0x10] = function(m){;m.dbg(m.p++,16,h(m.bin[m.p++]),h(m.bin[m.p],2,m.p--),m.reg[m.bin[m.p++]]+=m.reg[m.bin[m.p++]]);}

/** add (r1+m1) **********************************
 * Set the binary version                        *
 * - length:     5 bytes                         *
 * - byte 0:     r1                              *
 * - byte 1-4:   m1                              *
 *************************************************/
jBin.sets.jbin[0x11] = function(m){var b=m.bin,p=m.p;m.dbg(p++,17,h(b[p++]),'m:'+h(b[p++])+h(b[p++])+h(b[p++])+h(b[p],2,p-=4),m.reg[b[p++]]+=m.mem[__d(h(b[p++])+h(b[p++])+h(b[p++])+h(b[p++]))]||0);m.p=p};

/** add (r1+i1) **********************************
 * Set the binary version                        *
 * - length:     5 bytes                         *
 * - byte 0:     r1                              *
 * - byte 1-4:   i1                              *
 *************************************************/
jBin.sets.jbin[0x12] = function(m){m.dbg(m.p++,18,h(m.bin[m.p]),'##',m.reg[m.bin[m.p++]]+=__d(h(m.bin[m.p++])+h(m.bin[m.p++])+h(m.bin[m.p++])+h(m.bin[m.p++])))}

/** add (r1+d1) **********************************
 * Set the binary version                        *
 * - length:     5 bytes                         *
 * - byte 0:     r1                              *
 * - byte 1-4:   d1                              *
 *************************************************/
jBin.sets.jbin[0x13] = function(m){m.dbg(m.p++,19,h(m.bin[m.p++]),'d:'+h(m.bin[m.p++])+h(m.bin[m.p++])+h(m.bin[m.p++])+h(m.bin[m.p],2,m.p-=4),m.reg[m.bin[m.p++]]+=m.bin.get(__d(h(m.bin[m.p++])+h(m.bin[m.p++])+h(m.bin[m.p++])+h(m.bin[m.p++])),4))}









// mov r8 r/m8
jBin.sets.jbin[0x80] = function(m){
	var t=m.bin[m.p++];
	m.reg[m.bin[m.p++]] = m.bin[m.p++];
	m.dbg(m.p-4, 130, h(m.bin[m.p-2]), h(m.reg[m.bin[m.p-2]]));
};

// mov r8 r8
jBin.sets.jbin[0x81] = function(m){
	m.p++
	m.reg[m.bin[m.p++]] = m.bin[m.p++];
	m.dbg(m.p-4, 130, h(m.bin[m.p-2]), h(m.reg[m.bin[m.p-2]]));
};

// mov r imm8
jBin.sets.jbin[0x82] = function(m){
	m.p++;m.p++;
	m.reg[m.bin[m.p++]] = m.bin[m.p++];
	m.dbg(m.p-4, 130, h(m.bin[m.p-2]), '##', m.reg[m.bin[m.p-2]]);
};















// mov r16 imm16
jBin.sets.jbin[49] = function(me){
	me.p++;
	me.reg[me.bin[me.p++]] = me.bin[me.p++]*256
	                             + me.bin[me.p++];
	me.dbg(me.p-4, 49, h(me.bin[me.p-3], 2), h(me.reg[me.bin[me.p-3]], 4));
};

// mov r32 imm32
jBin.sets.jbin[50] = function(me){
	me.p++;
	me.reg[me.bin[me.p++]] = me.bin[me.p++]*16777216
	                             + me.bin[me.p++]*65536
	                             + me.bin[me.p++]*256
	                             + me.bin[me.p++];
	me.dbg(me.p-6, 50, h(me.bin[me.p-5], 2), h(me.reg[me.bin[me.p-5]], 8));
};


/** mov ******************************************
 * 
 *************************************************/
jBin.sets.jbin[48] = function(me){
	me.p++;
	me.reg[me.bin[me.p++]] = me.bin[me.p++];
	me.dbg(me.p-3, 48, h(me.bin[me.p-2], 2), h(me.reg[me.bin[me.p-2]], 2));
};



// rjmp
jBin.sets.jbin[0xE0] = function(me){
	me.p++;
	np = me.bin[me.p++]*(256*256*256)
	   + me.bin[me.p++]*(256*256)
	   + me.bin[me.p++]*256
	   + me.bin[me.p];
	me.dbg(me.p-4, 224, h(np, 8));
	me.p = np;
}

// int
jBin.sets.jbin[0xF0] = function(me){
	me.p++;
	me.dbg(me.p-1, 240, h(me.bin[me.p], 2));
	jBin.Interrupt[me.bin[me.p++]](me);
}

