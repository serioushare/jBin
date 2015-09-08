
jBin.sets.head = {};

/** List of mnemonic instruction names ***********
 * The comments at the end of each line show the *
 * markup of the instructions.                   *
 *************************************************/
jBin.sets.head.mnem = [];
jBin.sets.head.mnem[0x00] = ['nop',     '00', 'No Operation'];
jBin.sets.head.mnem[0x0A] = ['version', '0A', 'Set binary version', 'imm8', 'imm8', 'imm16'];
jBin.sets.head.mnem[0x0B] = ['name',    '0B', 'Set binary name',    'imm8', 'string'];
jBin.sets.head.mnem[0x0C] = ['author',  '0C', 'Set binary author',  'imm8', 'string'];
jBin.sets.head.mnem[0xFF] = ['end',     'FF', 'End expo section'];

/** nop ******************************************
 * No Operation                                  *
 *************************************************/
jBin.sets.head[0x00]=function(m){m.dbg(m.p++, 0)};

/** version **************************************
 * Set the binary version                        *
 * - length:     4 bytes                         *
 * - byte 0:     major                           *
 * - byte 1:     minor                           *
 * - byte 2-3:   build                           *
 *************************************************/
jBin.sets.head[0x0A]=function(m){var p=m.p+1,b=m.bin,a=b[p++],c=b[p++],d=b[p++]*256+b[p++];m.version=[a,c,d];m.dbg(m.p,10,a+"."+c+"."+d);m.p=p};

/** name *****************************************
 * Set the binary name                           *
 * - length:     1 + string length               *
 * - byte 0:     length of name                  *
 * - byte 1-x:   name                            *
 *************************************************/
jBin.sets.head[0x0B]=function(m){var p=m.p+1,b=m.bin,l=b[p++],s='',i;for(i=0;i<l;i++){s+=String.fromCharCode(b[p++])};m.name=s;m.dbg(m.p,11,s);m.p=p};

/** author ***************************************
 * Set the binary author name                    *
 * - length:     1 + string length               *
 * - byte 0:     length of name                  *
 * - byte 1-x:   name                            *
 *************************************************/
jBin.sets.head[0x0C]=function(m){var p=m.p+1,b=m.bin,l=b[p++],s='',i;for(i=0;i<l;i++){s+=String.fromCharCode(b[p++])};m.author=s;m.dbg(m.p++,12,s);m.p=p};

/** end ******************************************
 * Set the instruction set back to jbin          *
 *************************************************/
jBin.sets.head[0xFF]=function(m){m.dbg(m.p++,255);m.set="jbin"};

