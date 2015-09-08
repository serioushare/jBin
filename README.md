# jBin - a javascript binary interpreter

jBin aims to offer web developers a way to compress there code even further by replacing the entire code with binary instructions. This gives a number of advantages (and some cons of course).

##### - IMPORTANT NOTE -
Still puzzling with the hex codes. No hex-file will thus be stable!
Examples use a fixed jbin.js file to keep them working ;)


### Example "Hello World 1"
live @ http://jbin.serioushare.com/examples/hello%20world%201/

##### javascript
```javascript
console.log("Hello World");
```

##### jbin asm
```asm
main:
  mov edx, 11
  mov ecx, text
  mov ebx, 0
  mov eax, 4
  int 0x80

end:
  mov eax, 1
  int 0x80

section .data
  text db 'Hello World'
```

##### jbin binary
```
         00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
00000000 30 ED 0B 32 EC 00 00 00 16 30 EB 00 30 EA 04 F0  0í.2ì....0ë.0ê.ð
00000010 80 30 EA 01 F0 80 00 48 00 65 00 6C 00 6C 00 6F  €0ê.ð€.H.e.l.l.o
00000020 00 20 00 57 00 6F 00 72 00 6C 00 64              . .W.o.r.l.d
```

### Example "Hello World 2"
live @ http://jbin.serioushare.com/examples/hello%20world%202/

##### javascript
```javascript
function print(){
    console.log("Hello World");
}
```

##### jbin asm
```asm
section .func
  .def print print

main:
  mov eax, 1
  int 0x80

print:
  mov edx, 11
  mov ecx, text
  mov ebx, 0
  mov eax, 4
  int 0x80
  jmp main

section .data
  text db 'Hello World'
```

##### jbin binary
```
         00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
00000000 03 05 70 72 69 6E 74 00 00 00 11 30 EA 01 F0 80  ..print....0ê.ð€
00000010 30 ED 0B 32 EC 00 00 00 27 30 EB 00 30 EA 04 F0  0í.2ì...&0ë.0ê.ð
00000020 80 E0 00 00 00 0C 00 48 00 65 00 6C 00 6C 00 6F  €à.....H.e.l.l.o
00000030 00 20 00 57 00 6F 00 72 00 6C 00 64              . .W.o.r.l.d
```

