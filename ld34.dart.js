(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isc=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isi)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="c"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cR"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cR"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cR(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.c0=function(){}
var dart=[["","",,H,{
"^":"",
lF:{
"^":"c;a"}}],["","",,J,{
"^":"",
m:function(a){return void 0},
c3:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
c1:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.cV==null){H.kk()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.eh("Return interceptor for "+H.e(y(a,z))))}w=H.ks(a)
if(w==null){if(typeof a=="function")return C.S
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.V
else return C.ae}return w},
i:{
"^":"c;",
w:function(a,b){return a===b},
gJ:function(a){return H.ao(a)},
j:["eb",function(a){return H.bR(a)}],
gL:function(a){return new H.ak(H.aC(a),null)},
"%":"Blob|CanvasRenderingContext2D|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLProgram|WebGLUniformLocation"},
hL:{
"^":"i;",
j:function(a){return String(a)},
gJ:function(a){return a?519018:218159},
gL:function(a){return C.aa},
$isbq:1},
hM:{
"^":"i;",
w:function(a,b){return null==b},
j:function(a){return"null"},
gJ:function(a){return 0},
gL:function(a){return C.a4}},
cm:{
"^":"i;",
gJ:function(a){return 0},
gL:function(a){return C.a3},
j:["ec",function(a){return String(a)}],
$isdK:1},
i4:{
"^":"cm;"},
bm:{
"^":"cm;"},
bi:{
"^":"cm;",
j:function(a){var z=a[$.$get$dl()]
return z==null?this.ec(a):J.aF(z)}},
bh:{
"^":"i;",
da:function(a,b){if(!!a.immutable$list)throw H.f(new P.W(b))},
bg:function(a,b){if(!!a.fixed$length)throw H.f(new P.W(b))},
B:function(a,b){this.bg(a,"add")
a.push(b)},
ah:function(a){this.bg(a,"removeLast")
if(a.length===0)throw H.f(H.J(a,-1))
return a.pop()},
P:function(a,b){var z
this.bg(a,"remove")
for(z=0;z<a.length;++z)if(J.F(a[z],b)){a.splice(z,1)
return!0}return!1},
N:function(a){this.sm(a,0)},
C:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(new P.a3(a))}},
ar:function(a,b){return H.b(new H.bK(a,b),[null,null])},
ap:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
cu:function(a,b,c){if(b>a.length)throw H.f(P.ap(b,0,a.length,"start",null))
if(c==null)c=a.length
else{if(typeof c!=="number"||Math.floor(c)!==c)throw H.f(H.S(c))
if(c<b||c>a.length)throw H.f(P.ap(c,b,a.length,"end",null))}if(b===c)return H.b([],[H.A(a,0)])
return H.b(a.slice(b,c),[H.A(a,0)])},
gfH:function(a){if(a.length>0)return a[0]
throw H.f(H.bF())},
ai:function(a,b,c,d,e){var z,y,x
this.da(a,"set range")
P.bT(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.f(H.dI())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
e2:function(a,b,c,d){return this.ai(a,b,c,d,0)},
j:function(a){return P.bE(a,"[","]")},
gO:function(a){return H.b(new J.c9(a,a.length,0,null),[H.A(a,0)])},
gJ:function(a){return H.ao(a)},
gm:function(a){return a.length},
sm:function(a,b){this.bg(a,"set length")
if(b<0)throw H.f(P.ap(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.J(a,b))
if(b>=a.length||b<0)throw H.f(H.J(a,b))
return a[b]},
u:function(a,b,c){this.da(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.J(a,b))
if(b>=a.length||b<0)throw H.f(H.J(a,b))
a[b]=c},
$isbH:1,
$isr:1,
$asr:null,
$isE:1},
lE:{
"^":"bh;"},
c9:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
E:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(H.d2(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b0:{
"^":"i;",
gdm:function(a){return a===0?1/a<0:a<0},
ce:function(a,b){return a%b},
d4:function(a){return Math.abs(a)},
aT:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.W(""+a))},
aR:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(new P.W(""+a))},
h9:function(a){return a},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gJ:function(a){return a&0x1FFFFFFF},
bl:function(a){return-a},
p:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a+b},
F:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a-b},
a0:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a/b},
A:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a*b},
b_:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
aH:function(a,b){if((a|0)===a&&(b|0)===b&&0!==b&&-1!==b)return a/b|0
else return this.aT(a/b)},
an:function(a,b){return(a|0)===a?a/b|0:this.aT(a/b)},
aw:function(a,b){return b>31?0:a<<b>>>0},
d0:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ab:function(a,b){return(a&b)>>>0},
bq:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return(a^b)>>>0},
aZ:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a<b},
a1:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a>b},
cr:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a<=b},
at:function(a,b){if(typeof b!=="number")throw H.f(H.S(b))
return a>=b},
gL:function(a){return C.ad},
$isb9:1},
ck:{
"^":"b0;",
gL:function(a){return C.ac},
dT:function(a){return~a>>>0},
$isau:1,
$isb9:1,
$isu:1},
dJ:{
"^":"b0;",
gL:function(a){return C.ab},
$isau:1,
$isb9:1},
bI:{
"^":"i;",
p:function(a,b){if(typeof b!=="string")throw H.f(P.fn(b,null,null))
return a+b},
cv:function(a,b,c){H.eH(b)
if(c==null)c=a.length
H.eH(c)
if(b<0)throw H.f(P.bS(b,null,null))
if(typeof c!=="number")return H.j(c)
if(b>c)throw H.f(P.bS(b,null,null))
if(c>a.length)throw H.f(P.bS(c,null,null))
return a.substring(b,c)},
e6:function(a,b){return this.cv(a,b,null)},
A:function(a,b){var z,y
if(typeof b!=="number")return H.j(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.f(C.F)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fp:function(a,b,c){if(c>a.length)throw H.f(P.ap(c,0,a.length,null,null))
return H.kK(a,b,c)},
j:function(a){return a},
gJ:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gL:function(a){return C.a5},
gm:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.J(a,b))
if(b>=a.length||b<0)throw H.f(H.J(a,b))
return a[b]},
$isbH:1,
$isH:1}}],["","",,H,{
"^":"",
bp:function(a,b){var z=a.aM(b)
if(!init.globalState.d.cy)init.globalState.f.aS()
return z},
eU:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isr)throw H.f(P.a7("Arguments to main must be a List: "+H.e(y)))
init.globalState=new H.jG(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dF()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.jh(P.cp(null,H.bo),0)
y.z=H.b(new H.P(0,null,null,null,null,null,0),[P.u,H.cK])
y.ch=H.b(new H.P(0,null,null,null,null,null,0),[P.u,null])
if(y.x===!0){x=new H.jF()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hF,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jH)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.b(new H.P(0,null,null,null,null,null,0),[P.u,H.bU])
w=P.aK(null,null,null,P.u)
v=new H.bU(0,null,!1)
u=new H.cK(y,x,w,init.createNewIsolate(),v,new H.aH(H.c4()),new H.aH(H.c4()),!1,!1,[],P.aK(null,null,null,null),null,null,!1,!0,P.aK(null,null,null,null))
w.B(0,0)
u.cF(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.br()
x=H.aS(y,[y]).al(a)
if(x)u.aM(new H.kI(z,a))
else{y=H.aS(y,[y,y]).al(a)
if(y)u.aM(new H.kJ(z,a))
else u.aM(a)}init.globalState.f.aS()},
hJ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hK()
return},
hK:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.W("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.W("Cannot extract URI from \""+H.e(z)+"\""))},
hF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bX(!0,[]).ao(b.data)
y=J.a_(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bX(!0,[]).ao(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bX(!0,[]).ao(y.h(z,"replyTo"))
y=init.globalState.a++
q=H.b(new H.P(0,null,null,null,null,null,0),[P.u,H.bU])
p=P.aK(null,null,null,P.u)
o=new H.bU(0,null,!1)
n=new H.cK(y,q,p,init.createNewIsolate(),o,new H.aH(H.c4()),new H.aH(H.c4()),!1,!1,[],P.aK(null,null,null,null),null,null,!1,!0,P.aK(null,null,null,null))
p.B(0,0)
n.cF(0,o)
init.globalState.f.a.a7(new H.bo(n,new H.hG(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aS()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.aX(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aS()
break
case"close":init.globalState.ch.P(0,$.$get$dG().h(0,a))
a.terminate()
init.globalState.f.aS()
break
case"log":H.hE(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.af(["command","print","msg",z])
q=new H.aO(!0,P.b4(null,P.u)).a2(q)
y.toString
self.postMessage(q)}else P.bu(y.h(z,"msg"))
break
case"error":throw H.f(y.h(z,"msg"))}},
hE:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.af(["command","log","msg",a])
x=new H.aO(!0,P.b4(null,P.u)).a2(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.a0(w)
z=H.Y(w)
throw H.f(P.bC(z))}},
hH:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dW=$.dW+("_"+y)
$.dX=$.dX+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aX(f,["spawned",new H.bZ(y,x),w,z.r])
x=new H.hI(a,b,c,d,z)
if(e===!0){z.d6(w,w)
init.globalState.f.a.a7(new H.bo(z,x,"start isolate"))}else x.$0()},
jZ:function(a){return new H.bX(!0,[]).ao(new H.aO(!1,P.b4(null,P.u)).a2(a))},
kI:{
"^":"d:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
kJ:{
"^":"d:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jG:{
"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{jH:function(a){var z=P.af(["command","print","msg",a])
return new H.aO(!0,P.b4(null,P.u)).a2(z)}}},
cK:{
"^":"c;n:a>,b,c,fU:d<,fq:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
d6:function(a,b){if(!this.f.w(0,a))return
if(this.Q.B(0,b)&&!this.y)this.y=!0
this.bS()},
h5:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.P(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.cQ();++y.d}this.y=!1}this.bS()},
f6:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
h3:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.L(new P.W("removeRange"))
P.bT(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
e0:function(a,b){if(!this.r.w(0,a))return
this.db=b},
fL:function(a,b,c){var z=J.m(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){J.aX(a,c)
return}z=this.cx
if(z==null){z=P.cp(null,null)
this.cx=z}z.a7(new H.jA(a,c))},
fI:function(a,b){var z
if(!this.r.w(0,a))return
z=J.m(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.c7()
return}z=this.cx
if(z==null){z=P.cp(null,null)
this.cx=z}z.a7(this.gfW())},
fM:function(a,b){var z,y
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bu(a)
if(b!=null)P.bu(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aF(a)
y[1]=b==null?null:J.aF(b)
for(z=H.b(new P.bY(z,z.r,null,null),[null]),z.c=z.a.e;z.E();)J.aX(z.d,y)},
aM:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.a0(u)
w=t
v=H.Y(u)
this.fM(w,v)
if(this.db===!0){this.c7()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfU()
if(this.cx!=null)for(;t=this.cx,!t.gae(t);)this.cx.dD().$0()}return y},
dr:function(a){return this.b.h(0,a)},
cF:function(a,b){var z=this.b
if(z.c1(a))throw H.f(P.bC("Registry: ports must be registered only once."))
z.u(0,a,b)},
bS:function(){var z=this.b
if(z.gm(z)-this.c.a>0||this.y||!this.x)init.globalState.z.u(0,this.a,this)
else this.c7()},
c7:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.N(0)
for(z=this.b,y=z.gdM(z),y=y.gO(y);y.E();)y.gG().ev()
z.N(0)
this.c.N(0)
init.globalState.z.P(0,this.a)
this.dx.N(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.aX(w,z[v])}this.ch=null}},"$0","gfW",0,0,2]},
jA:{
"^":"d:2;a,b",
$0:function(){J.aX(this.a,this.b)}},
jh:{
"^":"c;a,b",
fz:function(){var z=this.a
if(z.b===z.c)return
return z.dD()},
dG:function(){var z,y,x
z=this.fz()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.c1(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gae(y)}else y=!1
else y=!1
else y=!1
if(y)H.L(P.bC("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gae(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.af(["command","close"])
x=new H.aO(!0,H.b(new P.et(0,null,null,null,null,null,0),[null,P.u])).a2(x)
y.toString
self.postMessage(x)}return!1}z.aC()
return!0},
cW:function(){if(self.window!=null)new H.ji(this).$0()
else for(;this.dG(););},
aS:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cW()
else try{this.cW()}catch(x){w=H.a0(x)
z=w
y=H.Y(x)
w=init.globalState.Q
v=P.af(["command","error","msg",H.e(z)+"\n"+H.e(y)])
v=new H.aO(!0,P.b4(null,P.u)).a2(v)
w.toString
self.postMessage(v)}}},
ji:{
"^":"d:2;a",
$0:function(){if(!this.a.dG())return
P.e4(C.y,this)}},
bo:{
"^":"c;a,b,c",
aC:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aM(this.b)}},
jF:{
"^":"c;"},
hG:{
"^":"d:1;a,b,c,d,e,f",
$0:function(){H.hH(this.a,this.b,this.c,this.d,this.e,this.f)}},
hI:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.br()
w=H.aS(x,[x,x]).al(y)
if(w)y.$2(this.b,this.c)
else{x=H.aS(x,[x]).al(y)
if(x)y.$1(this.b)
else y.$0()}}z.bS()}},
em:{
"^":"c;"},
bZ:{
"^":"em;b,a",
bn:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcT())return
x=H.jZ(b)
if(z.gfq()===y){y=J.a_(x)
switch(y.h(x,0)){case"pause":z.d6(y.h(x,1),y.h(x,2))
break
case"resume":z.h5(y.h(x,1))
break
case"add-ondone":z.f6(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.h3(y.h(x,1))
break
case"set-errors-fatal":z.e0(y.h(x,1),y.h(x,2))
break
case"ping":z.fL(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fI(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.B(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.P(0,y)
break}return}y=init.globalState.f
w="receive "+H.e(b)
y.a.a7(new H.bo(z,new H.jJ(this,x),w))},
w:function(a,b){if(b==null)return!1
return b instanceof H.bZ&&J.F(this.b,b.b)},
gJ:function(a){return this.b.gbF()}},
jJ:{
"^":"d:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcT())z.em(this.b)}},
cN:{
"^":"em;b,c,a",
bn:function(a,b){var z,y,x
z=P.af(["command","message","port",this,"msg",b])
y=new H.aO(!0,P.b4(null,P.u)).a2(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.cN&&J.F(this.b,b.b)&&J.F(this.a,b.a)&&J.F(this.c,b.c)},
gJ:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.e3()
y=this.a
if(typeof y!=="number")return y.e3()
x=this.c
if(typeof x!=="number")return H.j(x)
return(z<<16^y<<8^x)>>>0}},
bU:{
"^":"c;bF:a<,b,cT:c<",
ev:function(){this.c=!0
this.b=null},
em:function(a){if(this.c)return
this.eI(a)},
eI:function(a){return this.b.$1(a)},
$isi6:1},
iz:{
"^":"c;a,b,c",
ek:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a7(new H.bo(y,new H.iB(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aT(new H.iC(this,b),0),a)}else throw H.f(new P.W("Timer greater than 0."))},
static:{iA:function(a,b){var z=new H.iz(!0,!1,null)
z.ek(a,b)
return z}}},
iB:{
"^":"d:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iC:{
"^":"d:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aH:{
"^":"c;bF:a<",
gJ:function(a){var z=this.a
if(typeof z!=="number")return z.hd()
z=C.a.d0(z,0)^C.a.an(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aH){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aO:{
"^":"c;a,b",
a2:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.u(0,a,z.gm(z))
z=J.m(a)
if(!!z.$isdO)return["buffer",a]
if(!!z.$isbM)return["typed",a]
if(!!z.$isbH)return this.dX(a)
if(!!z.$ishD){x=this.gdU()
w=a.gdn()
w=H.bj(w,x,H.K(w,"O",0),null)
w=P.cq(w,!0,H.K(w,"O",0))
z=z.gdM(a)
z=H.bj(z,x,H.K(z,"O",0),null)
return["map",w,P.cq(z,!0,H.K(z,"O",0))]}if(!!z.$isdK)return this.dY(a)
if(!!z.$isi)this.dI(a)
if(!!z.$isi6)this.aW(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbZ)return this.dZ(a)
if(!!z.$iscN)return this.e_(a)
if(!!z.$isd){v=a.$static_name
if(v==null)this.aW(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaH)return["capability",a.a]
if(!(a instanceof P.c))this.dI(a)
return["dart",init.classIdExtractor(a),this.dW(init.classFieldsExtractor(a))]},"$1","gdU",2,0,0],
aW:function(a,b){throw H.f(new P.W(H.e(b==null?"Can't transmit:":b)+" "+H.e(a)))},
dI:function(a){return this.aW(a,null)},
dX:function(a){var z=this.dV(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aW(a,"Can't serialize indexable: ")},
dV:function(a){var z,y,x
z=[]
C.f.sm(z,a.length)
for(y=0;y<a.length;++y){x=this.a2(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
dW:function(a){var z
for(z=0;z<a.length;++z)C.f.u(a,z,this.a2(a[z]))
return a},
dY:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aW(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.f.sm(y,z.length)
for(x=0;x<z.length;++x){w=this.a2(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
e_:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dZ:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbF()]
return["raw sendport",a]}},
bX:{
"^":"c;a,b",
ao:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.a7("Bad serialized message: "+H.e(a)))
switch(C.f.gfH(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.b(this.aK(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.b(this.aK(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.aK(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.b(this.aK(x),[null])
y.fixed$length=Array
return y
case"map":return this.fC(a)
case"sendport":return this.fD(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fB(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.aH(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aK(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.f("couldn't deserialize: "+H.e(a))}},"$1","gfA",2,0,0],
aK:function(a){var z,y,x
z=J.a_(a)
y=0
while(!0){x=z.gm(a)
if(typeof x!=="number")return H.j(x)
if(!(y<x))break
z.u(a,y,this.ao(z.h(a,y)));++y}return a},
fC:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.hS()
this.b.push(w)
y=J.fi(y,this.gfA()).aE(0)
for(z=J.a_(y),v=J.a_(x),u=0;u<z.gm(y);++u){if(u>=y.length)return H.a(y,u)
w.u(0,y[u],this.ao(v.h(x,u)))}return w},
fD:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.F(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dr(w)
if(u==null)return
t=new H.bZ(u,x)}else t=new H.cN(y,w,x)
this.b.push(t)
return t},
fB:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.a_(y)
v=J.a_(x)
u=0
while(!0){t=z.gm(y)
if(typeof t!=="number")return H.j(t)
if(!(u<t))break
w[z.h(y,u)]=this.ao(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
kf:function(a){return init.types[a]},
eM:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$iscl},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aF(a)
if(typeof z!=="string")throw H.f(H.S(a))
return z},
ao:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cw:function(a){var z,y,x,w,v,u,t,s,r
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.J||!!J.m(a).$isbm){v=C.B(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.K.e6(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cW(H.cT(a),0,null),init.mangledGlobalNames)},
bR:function(a){return"Instance of '"+H.cw(a)+"'"},
bQ:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.S(a))
return a[b]},
cx:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.S(a))
a[b]=c},
j:function(a){throw H.f(H.S(a))},
a:function(a,b){if(a==null)J.av(a)
throw H.f(H.J(a,b))},
J:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aG(!0,b,"index",null)
z=J.av(a)
if(!(b<0)){if(typeof z!=="number")return H.j(z)
y=b>=z}else y=!0
if(y)return P.dE(b,a,"index",null,z)
return P.bS(b,"index",null)},
S:function(a){return new P.aG(!0,a,null,null)},
n:function(a){if(typeof a!=="number")throw H.f(H.S(a))
return a},
eH:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(H.S(a))
return a},
f:function(a){var z
if(a==null)a=new P.ct()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eW})
z.name=""}else z.toString=H.eW
return z},
eW:function(){return J.aF(this.dartException)},
L:function(a){throw H.f(a)},
d2:function(a){throw H.f(new P.a3(a))},
a0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kM(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.d0(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cn(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.e(y)+" (Error "+w+")"
return z.$1(new H.dT(v,null))}}if(a instanceof TypeError){u=$.$get$e5()
t=$.$get$e6()
s=$.$get$e7()
r=$.$get$e8()
q=$.$get$ec()
p=$.$get$ed()
o=$.$get$ea()
$.$get$e9()
n=$.$get$ef()
m=$.$get$ee()
l=u.a3(y)
if(l!=null)return z.$1(H.cn(y,l))
else{l=t.a3(y)
if(l!=null){l.method="call"
return z.$1(H.cn(y,l))}else{l=s.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=q.a3(y)
if(l==null){l=p.a3(y)
if(l==null){l=o.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=n.a3(y)
if(l==null){l=m.a3(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dT(y,l==null?null:l.method))}}return z.$1(new H.iE(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e0()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aG(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e0()
return a},
Y:function(a){var z
if(a==null)return new H.eu(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eu(a,null)},
kw:function(a){if(a==null||typeof a!='object')return J.M(a)
else return H.ao(a)},
kd:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.u(0,a[y],a[x])}return b},
km:function(a,b,c,d,e,f,g){var z=J.m(c)
if(z.w(c,0))return H.bp(b,new H.kn(a))
else if(z.w(c,1))return H.bp(b,new H.ko(a,d))
else if(z.w(c,2))return H.bp(b,new H.kp(a,d,e))
else if(z.w(c,3))return H.bp(b,new H.kq(a,d,e,f))
else if(z.w(c,4))return H.bp(b,new H.kr(a,d,e,f,g))
else throw H.f(P.bC("Unsupported number of arguments for wrapped closure"))},
aT:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.km)
a.$identity=z
return z},
fw:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isr){z.$reflectionInfo=c
x=H.i9(z).r}else x=c
w=d?Object.create(new H.ih().constructor.prototype):Object.create(new H.cc(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ab
$.ab=J.l(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.df(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.kf,x)
else if(u&&typeof x=="function"){q=t?H.de:H.cd
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.df(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ft:function(a,b,c,d){var z=H.cd
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
df:function(a,b,c){var z,y,x,w,v,u
if(c)return H.fv(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ft(y,!w,z,b)
if(y===0){w=$.aY
if(w==null){w=H.bz("self")
$.aY=w}w="return function(){return this."+H.e(w)+"."+H.e(z)+"();"
v=$.ab
$.ab=J.l(v,1)
return new Function(w+H.e(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.aY
if(v==null){v=H.bz("self")
$.aY=v}v=w+H.e(v)+"."+H.e(z)+"("+u+");"
w=$.ab
$.ab=J.l(w,1)
return new Function(v+H.e(w)+"}")()},
fu:function(a,b,c,d){var z,y
z=H.cd
y=H.de
switch(b?-1:a){case 0:throw H.f(new H.ia("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fv:function(a,b){var z,y,x,w,v,u,t,s
z=H.fq()
y=$.dd
if(y==null){y=H.bz("receiver")
$.dd=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fu(w,!u,x,b)
if(w===1){y="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
u=$.ab
$.ab=J.l(u,1)
return new Function(y+H.e(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
u=$.ab
$.ab=J.l(u,1)
return new Function(y+H.e(u)+"}")()},
cR:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isr){c.fixed$length=Array
z=c}else z=c
return H.fw(a,b,z,!!d,e,f)},
ky:function(a,b){var z=J.a_(b)
throw H.f(H.fs(H.cw(a),z.cv(b,3,z.gm(b))))},
bs:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.ky(a,b)},
kL:function(a){throw H.f(new P.fE("Cyclic initialization for static "+H.e(a)))},
aS:function(a,b,c){return new H.ib(a,b,c,null)},
br:function(){return C.E},
c4:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
q:function(a){return new H.ak(a,null)},
b:function(a,b){a.$builtinTypeInfo=b
return a},
cT:function(a){if(a==null)return
return a.$builtinTypeInfo},
eJ:function(a,b){return H.eV(a["$as"+H.e(b)],H.cT(a))},
K:function(a,b,c){var z=H.eJ(a,b)
return z==null?null:z[c]},
A:function(a,b){var z=H.cT(a)
return z==null?null:z[b]},
d0:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cW(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.j(a)
else return},
cW:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cA("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.e(H.d0(u,c))}return w?"":"<"+H.e(z)+">"},
aC:function(a){var z=J.m(a).constructor.builtin$cls
if(a==null)return z
return z+H.cW(a.$builtinTypeInfo,0,null)},
eV:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
k7:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a2(a[y],b[y]))return!1
return!0},
cS:function(a,b,c){return a.apply(b,H.eJ(b,c))},
a2:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eL(a,b)
if('func' in a)return b.builtin$cls==="h2"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.d0(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.e(H.d0(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.k7(H.eV(v,z),x)},
eF:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a2(z,v)||H.a2(v,z)))return!1}return!0},
k6:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a2(v,u)||H.a2(u,v)))return!1}return!0},
eL:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a2(z,y)||H.a2(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eF(x,w,!1))return!1
if(!H.eF(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a2(o,n)||H.a2(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a2(o,n)||H.a2(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a2(o,n)||H.a2(n,o)))return!1}}return H.k6(a.named,b.named)},
mR:function(a){var z=$.cU
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
mP:function(a){return H.ao(a)},
mO:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ks:function(a){var z,y,x,w,v,u
z=$.cU.$1(a)
y=$.c_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c2[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eE.$2(a,z)
if(z!=null){y=$.c_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c2[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cY(x)
$.c_[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.c2[z]=x
return x}if(v==="-"){u=H.cY(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eO(a,x)
if(v==="*")throw H.f(new P.eh(z))
if(init.leafTags[z]===true){u=H.cY(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eO(a,x)},
eO:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.c3(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cY:function(a){return J.c3(a,!1,null,!!a.$iscl)},
kv:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.c3(z,!1,null,!!z.$iscl)
else return J.c3(z,c,null,null)},
kk:function(){if(!0===$.cV)return
$.cV=!0
H.kl()},
kl:function(){var z,y,x,w,v,u,t,s
$.c_=Object.create(null)
$.c2=Object.create(null)
H.kg()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eP.$1(v)
if(u!=null){t=H.kv(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kg:function(){var z,y,x,w,v,u,t
z=C.L()
z=H.aR(C.M,H.aR(C.N,H.aR(C.A,H.aR(C.A,H.aR(C.P,H.aR(C.O,H.aR(C.Q(C.B),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cU=new H.kh(v)
$.eE=new H.ki(u)
$.eP=new H.kj(t)},
aR:function(a,b){return a(b)||b},
kK:function(a,b,c){return a.indexOf(b,c)>=0},
i8:{
"^":"c;a,b,c,d,e,f,r,x",
static:{i9:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.i8(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iD:{
"^":"c;a,b,c,d,e,f",
a3:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
static:{aj:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iD(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},bW:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},eb:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dT:{
"^":"R;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.e(this.a)
return"NullError: method not found: '"+H.e(z)+"' on null"}},
hO:{
"^":"R;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.e(z)+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.e(z)+"' on '"+H.e(y)+"' ("+H.e(this.a)+")"},
static:{cn:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hO(a,y,z?null:b.receiver)}}},
iE:{
"^":"R;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
kM:{
"^":"d:0;a",
$1:function(a){if(!!J.m(a).$isR)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eu:{
"^":"c;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
kn:{
"^":"d:1;a",
$0:function(){return this.a.$0()}},
ko:{
"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
kp:{
"^":"d:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kq:{
"^":"d:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
kr:{
"^":"d:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
d:{
"^":"c;",
j:function(a){return"Closure '"+H.cw(this)+"'"},
gdP:function(){return this},
gdP:function(){return this}},
e2:{
"^":"d;"},
ih:{
"^":"e2;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cc:{
"^":"e2;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cc))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gJ:function(a){var z,y
z=this.c
if(z==null)y=H.ao(this.a)
else y=typeof z!=="object"?J.M(z):H.ao(z)
return J.f_(y,H.ao(this.b))},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+H.bR(z)},
static:{cd:function(a){return a.a},de:function(a){return a.c},fq:function(){var z=$.aY
if(z==null){z=H.bz("self")
$.aY=z}return z},bz:function(a){var z,y,x,w,v
z=new H.cc("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fr:{
"^":"R;a",
j:function(a){return this.a},
static:{fs:function(a,b){return new H.fr("CastError: Casting value of type "+H.e(a)+" to incompatible type "+H.e(b))}}},
ia:{
"^":"R;a",
j:function(a){return"RuntimeError: "+H.e(this.a)}},
e_:{
"^":"c;"},
ib:{
"^":"e_;a,b,c,d",
al:function(a){var z=this.eA(a)
return z==null?!1:H.eL(z,this.aF())},
eA:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
aF:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$ismz)z.v=true
else if(!x.$isdt)z.ret=y.aF()
y=this.b
if(y!=null&&y.length!==0)z.args=H.dZ(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.dZ(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eI(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].aF()}z.named=w}return z},
j:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.e(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.e(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eI(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.e(z[s].aF())+" "+s}x+="}"}}return x+(") -> "+H.e(this.a))},
static:{dZ:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].aF())
return z}}},
dt:{
"^":"e_;",
j:function(a){return"dynamic"},
aF:function(){return}},
ak:{
"^":"c;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gJ:function(a){return J.M(this.a)},
w:function(a,b){if(b==null)return!1
return b instanceof H.ak&&J.F(this.a,b.a)}},
P:{
"^":"c;a,b,c,d,e,f,r",
gm:function(a){return this.a},
gae:function(a){return this.a===0},
gdn:function(){return H.b(new H.hQ(this),[H.A(this,0)])},
gdM:function(a){return H.bj(this.gdn(),new H.hN(this),H.A(this,0),H.A(this,1))},
c1:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cK(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cK(y,a)}else return this.fR(a)},
fR:function(a){var z=this.d
if(z==null)return!1
return this.aO(this.a9(z,this.aN(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a9(z,b)
return y==null?null:y.gaq()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.a9(x,b)
return y==null?null:y.gaq()}else return this.fS(b)},
fS:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a9(z,this.aN(a))
x=this.aO(y,a)
if(x<0)return
return y[x].gaq()},
u:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bH()
this.b=z}this.cE(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bH()
this.c=y}this.cE(y,b,c)}else{x=this.d
if(x==null){x=this.bH()
this.d=x}w=this.aN(b)
v=this.a9(x,w)
if(v==null)this.bQ(x,w,[this.bI(b,c)])
else{u=this.aO(v,b)
if(u>=0)v[u].saq(c)
else v.push(this.bI(b,c))}}},
dC:function(a,b){var z
if(this.c1(a))return this.h(0,a)
z=b.$0()
this.u(0,a,z)
return z},
P:function(a,b){if(typeof b==="string")return this.cB(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cB(this.c,b)
else return this.fT(b)},
fT:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a9(z,this.aN(a))
x=this.aO(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cC(w)
return w.gaq()},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
C:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.a3(this))
z=z.c}},
cE:function(a,b,c){var z=this.a9(a,b)
if(z==null)this.bQ(a,b,this.bI(b,c))
else z.saq(c)},
cB:function(a,b){var z
if(a==null)return
z=this.a9(a,b)
if(z==null)return
this.cC(z)
this.cM(a,b)
return z.gaq()},
bI:function(a,b){var z,y
z=new H.hP(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cC:function(a){var z,y
z=a.gen()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aN:function(a){return J.M(a)&0x3ffffff},
aO:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.F(a[y].gdl(),b))return y
return-1},
j:function(a){return P.hW(this)},
a9:function(a,b){return a[b]},
bQ:function(a,b,c){a[b]=c},
cM:function(a,b){delete a[b]},
cK:function(a,b){return this.a9(a,b)!=null},
bH:function(){var z=Object.create(null)
this.bQ(z,"<non-identifier-key>",z)
this.cM(z,"<non-identifier-key>")
return z},
$ishD:1,
static:{dL:function(a,b){return H.b(new H.P(0,null,null,null,null,null,0),[a,b])}}},
hN:{
"^":"d:0;a",
$1:function(a){return this.a.h(0,a)}},
hP:{
"^":"c;dl:a<,aq:b@,c,en:d<"},
hQ:{
"^":"O;a",
gm:function(a){return this.a.a},
gO:function(a){var z,y
z=this.a
y=new H.hR(z,z.r,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.c=z.e
return y},
C:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.f(new P.a3(z))
y=y.c}},
$isE:1},
hR:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
E:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.a3(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
kh:{
"^":"d:0;a",
$1:function(a){return this.a(a)}},
ki:{
"^":"d:14;a",
$2:function(a,b){return this.a(a,b)}},
kj:{
"^":"d:12;a",
$1:function(a){return this.a(a)}}}],["","",,D,{
"^":"",
fp:{
"^":"c;a,b,c,d,e,f,r,x",
gm:function(a){return this.c},
gfg:function(){var z=this.x
return H.b(new P.j5(z),[H.A(z,0)])},
fs:function(a,b,c){var z,y,x
if(typeof c!=="number")return H.j(c)
z=b.length
y=0
for(;y<c;++y){if(y>=a.length)return H.a(a,y)
x=a[y]
if(y>=z)return H.a(b,y)
b[y]=x}},
aG:function(a){var z,y,x,w,v,u
z=J.C(a)
if(!z.at(a,0))H.L(P.a7("should be > 0"))
if(z.w(a,this.c))return
y=J.aE(z.p(a,31),32)
x=J.C(y)
if(x.a1(y,this.b.length)||J.bv(x.p(y,this.a),this.b.length)){w=new Uint32Array(H.v(y))
v=this.b
this.fs(v,w,x.a1(y,v.length)?this.b.length:y)
this.b=w}if(z.a1(a,this.c)){z=this.c
if(typeof z!=="number")return z.b_()
if(C.a.b_(z,32)>0){x=this.b
z=C.a.an(z+31,32)-1
if(z>>>0!==z||z>=x.length)return H.a(x,z)
v=x[z]
u=this.c
if(typeof u!=="number")return u.b_()
x[z]=(v&C.c.aw(1,C.a.b_(u,32)&31)-1)>>>0
z=u}x=this.b;(x&&C.U).fG(x,J.aE(J.l(z,31),32),y,0)}this.c=a
this.scn(this.d+1)},
scn:function(a){this.d=a},
dc:function(a){var z=D.y(0,!1)
z.b=new Uint32Array(H.ex(this.b))
z.c=this.c
z.d=this.d
return z},
j:function(a){return H.e(this.c)+" bits, "+H.e(this.de(!0))+" set"},
f9:function(a){var z,y,x
if(!J.F(this.c,a.geM()))H.L(P.a7("Array lengths differ."))
z=J.aE(J.l(this.c,31),32)
if(typeof z!=="number")return H.j(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.c.ab(x[y],a.gez().h(0,y))}this.scn(this.d+1)
return this},
hc:function(a){var z,y,x
if(!J.F(this.c,a.geM()))H.L(P.a7("Array lengths differ."))
z=J.aE(J.l(this.c,31),32)
if(typeof z!=="number")return H.j(z)
y=0
for(;y<z;++y){x=this.b
if(y>=x.length)return H.a(x,y)
x[y]=C.c.bq(x[y],a.gez().h(0,y))}this.scn(this.d+1)
return this},
ab:function(a,b){return this.dc(0).f9(b)},
bq:function(a,b){return this.dc(0).hc(b)},
h:function(a,b){var z,y
z=this.b
y=J.aE(b,32)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
y=z[y]
if(typeof b!=="number")return b.ab()
return(y&C.c.aw(1,b&31))>>>0!==0},
u:function(a,b,c){var z,y,x
z=J.C(b)
y=this.b
if(c===!0){z=z.aH(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ab()
y[z]=(x|C.c.aw(1,b&31))>>>0}else{z=z.aH(b,32)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
x=y[z]
if(typeof b!=="number")return b.ab()
y[z]=(x&~C.c.aw(1,b&31))>>>0}++this.d},
de:function(a){var z,y,x,w,v,u,t,s
if(J.F(this.c,0))return 0
if(this.r!==this.d){this.f=0
z=J.aE(J.l(this.c,31),32)
y=J.C(z)
x=0
while(!0){w=y.F(z,1)
if(typeof w!=="number")return H.j(w)
if(!(x<w))break
w=this.b
if(x>=w.length)return H.a(w,x)
v=w[x]
for(;v!==0;v=v>>>8){w=this.f
u=$.$get$cb()
t=v&255
if(t>=u.length)return H.a(u,t)
t=u[t]
if(typeof w!=="number")return w.p()
this.f=w+t}++x}y=this.b
if(x>=y.length)return H.a(y,x)
v=y[x]
y=this.c
if(typeof y!=="number")return y.ab()
s=y&31
if(s!==0)v=(v&~C.c.aw(4294967295,s))>>>0
for(;v!==0;v=v>>>8){y=this.f
w=$.$get$cb()
u=v&255
if(u>=w.length)return H.a(w,u)
u=w[u]
if(typeof y!=="number")return y.p()
this.f=y+u}}return this.f},
N:function(a){return this.aG(0)},
eg:function(a,b){this.b=new Uint32Array(H.v((a+31)/32|0))
this.c=a
this.d=0},
bZ:function(a){return this.gfg().$1(a)},
static:{y:function(a,b){var z=H.b(new P.iZ(null,null,0,null,null,null,null),[null])
z.e=z
z.d=z
z=new D.fp(256,null,null,null,null,null,-1,z)
z.eg(a,!1)
return z}}}}],["","",,F,{
"^":"",
h5:{
"^":"h7;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
fu:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=H.bs(this.y.z.h(0,C.l),"$iscB")
y=F.cv(0,0)
x=F.cz(20)
w=$.$get$ba()
v=F.be(w.K(),0.9,0.6,0.4)
u=S.az(C.n,F.kH())
t=F.cu(0)
s=F.cD(0,0,0)
r=S.az(C.v,F.kE())
q=this.y
p=q.az([y,x,v,u,t,s,r])
q.c.B(0,p)
z.b.u(0,"player",p)
z.c.u(0,p,"player")
for(o=0;o<1000;++o){y=this.y
x=w.K()
v=w.K()
n=J.U(S.V(C.b))
if(null==n)n=F.c5().$0()
t=J.h(n)
t.sk(n,-1000+x*2000)
t.sl(n,-1000+v*2000)
m=J.U(S.V(C.o))
if(null==m)m=F.d1().$0()
p=y.az([n,m,F.be(w.K(),1,1,1)])
y.c.B(0,p)}},
c5:function(a,b){var z,y,x
a=P.bt(800,a)
b=P.bt(600,b)
z=this.a
y=J.h(z)
y.st(z,a)
y.sq(z,b)
y=z.style
x=H.e(a)+"px"
y.width=x
z=z.style
y=H.e(b)+"px"
z.height=y
H.bs(this.b,"$iscy").viewport(0,0,a,b)
z=H.bs(this.y.z.h(0,C.q),"$isci")
z.b=a
z.c=b},
eh:function(){var z,y
this.y.ax(new F.ci(null,null,null))
this.y.ax(new F.ek(null,null,null,null))
z=this.y
y=H.b(new H.P(0,null,null,null,null,null,0),[P.H,S.a4])
z.ax(new S.cB(y,H.b(new H.P(0,null,null,null,null,null,0),[S.a4,P.H]),null))
z=this.y
y=H.b(new H.P(0,null,null,null,null,null,0),[P.H,[S.I,S.a4]])
z.ax(new S.dB(y,H.b(new H.P(0,null,null,null,null,null,0),[S.a4,[S.I,P.H]]),null))
this.c5(window.innerWidth,window.innerHeight)
z=H.b(new W.b2(window,"resize",!1),[null])
H.b(new W.a6(0,z.a,z.b,W.X(new F.ho(this)),!1),[H.A(z,0)]).V()},
static:{h6:function(){var z,y,x,w
z=document.querySelector("#game")
y=H.bs(document.querySelector("#game"),"$isce")
y.toString
x=P.af(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
w=(y&&C.w).cp(y,"webgl",x)
if(w==null)w=C.w.cp(y,"experimental-webgl",x)
y=w
y=new F.h5(z,y,new L.hn("ld34",null),null,null,800,600,!0,null,null,null,null,null,!1)
y.ei("ld34","#game",800,600,null,null,!0)
y.eh()
return y}}},
ho:{
"^":"d:0;a",
$1:function(a){return this.a.c5(window.innerWidth,window.innerHeight)}},
hz:{
"^":"hp;cx,cy,db,dx,z,Q,ch,a,b,c,d,e,f,r,x,y",
D:function(){var z,y,x
z=this.b
y=H.b(new S.o(null,null),[F.ai])
y.v(C.n,z,F.ai)
this.cy=y
this.ea()
y=this.cx
z=J.h(y)
x=z.gdv(y)
H.b(new W.a6(0,x.a,x.b,W.X(this.gfJ()),!1),[H.A(x,0)]).V()
x=z.gdw(y)
H.b(new W.a6(0,x.a,x.b,W.X(this.gfK()),!1),[H.A(x,0)]).V()
y=z.gdu(y)
H.b(new W.a6(0,y.a,y.b,W.X(new F.hA()),!1),[H.A(y,0)]).V()},
Z:function(a){var z,y,x,w
z=J.k(this.cy.b,J.D(a))
y=this.Q
x=y.h(0,70)===!0||this.db===!0
w=J.h(z)
w.sS(z,x)
w.sa_(z,y.h(0,74)===!0||this.dx===!0)},
hk:[function(a){if(J.d6(a)===0)this.db=!0
if(a.button===2)this.dx=!0},"$1","gfJ",2,0,5],
hl:[function(a){if(J.d6(a)===0)this.db=!1
if(a.button===2)this.dx=!1},"$1","gfK",2,0,5]},
hA:{
"^":"d:0;",
$1:function(a){return J.fj(a)}},
i5:{
"^":"cf;ch,cx,cy,db,dx,dy,fr,fx,fy,go,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y"},
fm:{
"^":"cf;ch,cx,cy,db,dx,dy,fr,fx,fy,go,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y"},
h1:{
"^":"cf;ch,cx,cy,db,dx,dy,fr,fx,fy,go,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cd:function(a,b){var z,y,x,w
this.e9(a,b)
z=J.k(this.cy.b,J.D(b))
y=this.dy
x=a*(this.fy+1)*this.go+5
w=J.fa(z)
if(x>=y.length)return H.a(y,x)
y[x]=w}},
cf:{
"^":"ej;",
cd:["e9",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=J.h(b)
y=J.k(this.ch.b,z.gn(b))
x=J.k(this.cx.b,z.gn(b))
w=J.k(this.cy.b,z.gn(b))
v=J.k(this.db.b,z.gn(b))
z=this.fy
u=a*(z+1)
t=this.go
s=u*t
r=a*z*3
q=this.dy
p=J.h(y)
o=p.gk(y)
if(s>=q.length)return H.a(q,s)
q[s]=o
o=this.dy
q=s+1
n=p.gl(y)
if(q>=o.length)return H.a(o,q)
o[q]=n
n=this.dy
q=s+2
o=J.h(w)
m=o.gT(w)
if(q>=n.length)return H.a(n,q)
n[q]=m
m=this.dy
q=s+3
n=w.gX()
if(q>=m.length)return H.a(m,q)
m[q]=n
n=this.dy
q=s+4
m=w.gY()
if(q>=n.length)return H.a(n,q)
n[q]=m
m=this.dy
q=s+5
n=o.gad(w)
if(typeof n!=="number")return n.a0()
if(q>=m.length)return H.a(m,q)
m[q]=n/2
for(q=s+t,n=z/2|0,m=u+1,l=u+2,k=0;k<z;++k){j=this.dy
i=q+t*k
h=p.gk(y)
g=x.gag()
f=v.gH()
e=6.283185307179586*k/z
if(typeof f!=="number")return f.p()
f=Math.cos(f+e)
if(typeof g!=="number")return g.A()
f=J.l(h,g*f)
if(i>=j.length)return H.a(j,i)
j[i]=f
f=this.dy
j=i+1
g=p.gl(y)
h=x.a
d=v.gH()
if(typeof d!=="number")return d.p()
e=Math.sin(d+e)
if(typeof h!=="number")return h.A()
e=J.l(g,h*e)
if(j>=f.length)return H.a(f,j)
f[j]=e
e=this.dy
j=i+2
f=o.gT(w)
if(j>=e.length)return H.a(e,j)
e[j]=f
f=this.dy
j=i+3
e=w.gX()
if(j>=f.length)return H.a(f,j)
f[j]=e
e=this.dy
j=i+4
f=w.gY()
if(j>=e.length)return H.a(e,j)
e[j]=f
c=Math.abs(k-n)/16
f=this.dy
i+=5
j=o.gad(w)
if(typeof j!=="number")return j.p()
if(i>=f.length)return H.a(f,i)
f[i]=j+0.5*c*c
j=this.fr
i=r+k*3
f=j.length
if(i>=f)return H.a(j,i)
j[i]=u
e=i+1
if(e>=f)return H.a(j,e)
j[e]=m+k
i+=2
if(i>=f)return H.a(j,i)
j[i]=l+k}k=C.z.aT(0.375*z)
o=this.dy
n=q+t*k
l=p.gk(y)
j=x.gag()
if(typeof j!=="number")return j.A()
i=v.gH()
h=6.283185307179586*k/z
if(typeof i!=="number")return i.p()
i=J.l(l,j*1.1*Math.cos(H.n(i+h)))
if(n<0||n>=o.length)return H.a(o,n)
o[n]=i
i=this.dy;++n
o=p.gl(y)
j=x.a
if(typeof j!=="number")return j.A()
l=v.gH()
if(typeof l!=="number")return l.p()
h=J.l(o,j*1.1*Math.sin(H.n(l+h)))
if(n>=i.length)return H.a(i,n)
i[n]=h
k=C.z.aT(0.625*z)
h=this.dy
t=q+t*k
q=p.gk(y)
n=x.a
if(typeof n!=="number")return n.A()
i=v.gH()
l=6.283185307179586*k/z
if(typeof i!=="number")return i.p()
i=J.l(q,n*1.1*Math.cos(H.n(i+l)))
if(t<0||t>=h.length)return H.a(h,t)
h[t]=i
i=this.dy;++t
p=p.gl(y)
h=x.a
if(typeof h!=="number")return h.A()
n=v.gH()
if(typeof n!=="number")return n.p()
l=J.l(p,h*1.1*Math.sin(H.n(n+l)))
if(t>=i.length)return H.a(i,t)
i[t]=l
l=this.fr
z=r+z*3-1
if(z<0||z>=l.length)return H.a(l,z)
l[z]=m}],
dE:function(a){var z=this.z
z.uniformMatrix4fv(J.d9(z,this.gW(),"uViewProjection"),!1,this.dx.df().a)
this.fd(this.fx,this.dy,this.fr)
z.drawElements(4,this.fr.length,5123,0)},
dK:function(a){var z,y
z=this.fy
y=J.aU(a)
this.dy=new Float32Array(H.v(J.x(y.A(a,z+1),this.go)))
this.fr=new Uint16Array(H.v(J.x(y.A(a,z),3)))},
gdL:function(){return"PositionRenderingSystem"},
gdh:function(){return"PositionRenderingSystem"},
D:function(){var z,y
this.cz()
z=this.b
y=H.b(new S.o(null,null),[F.ag])
y.v(C.k,z,F.ag)
this.db=y
y=this.b
z=H.b(new S.o(null,null),[F.Q])
z.v(C.e,y,F.Q)
this.cy=z
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.cx=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.ch=z
this.dx=this.b.z.h(0,C.C)},
br:function(a,b){this.fx=[new L.dc("aPosition",2),new L.dc("aColor",4)]}},
i3:{
"^":"ej;ch,cx,cy,db,dx,dy,z,Q,a$,b$,c$,d$,e$,f$,r$,a,b,c,d,e,f,r,x,y",
cd:function(a,b){var z,y,x,w,v,u,t,s
z=J.h(b)
y=J.k(this.ch.b,z.gn(b))
x=J.k(this.cx.b,z.gn(b))
w=a*2
v=a*4
z=this.dx
u=J.h(y)
t=u.gk(y)
if(w>=z.length)return H.a(z,w)
z[w]=t
t=this.dx
z=w+1
u=u.gl(y)
if(z>=t.length)return H.a(t,z)
t[z]=u
u=this.dy
z=J.h(x)
t=z.gT(x)
if(v>=u.length)return H.a(u,v)
u[v]=t
t=this.dy
u=v+1
s=x.gX()
if(u>=t.length)return H.a(t,u)
t[u]=s
s=this.dy
u=v+2
t=x.gY()
if(u>=s.length)return H.a(s,u)
s[u]=t
t=this.dy
u=v+3
z=z.gad(x)
if(u>=t.length)return H.a(t,u)
t[u]=z},
dE:function(a){var z,y,x,w
z=this.z
z.uniformMatrix4fv(J.d9(z,this.gW(),"uViewProjection"),!1,this.cy.df().a)
y=this.ch
x=this.db.a5("player")
w=J.k(y.b,J.D(x))
x=J.h(w)
z.uniform2f(z.getUniformLocation(this.gW(),"uPlayerPos"),x.gk(w),x.gl(w))
this.d8(0,"aPosition",this.dx,2)
this.d8(0,"aColor",this.dy,4)
z.drawArrays(0,0,a)},
dK:function(a){var z=J.aU(a)
this.dx=new Float32Array(H.v(z.A(a,2)))
this.dy=new Float32Array(H.v(z.A(a,4)))},
gdL:function(){return"ParticleRenderingSystem"},
gdh:function(){return"ParticleRenderingSystem"},
D:function(){var z,y
this.cz()
z=this.b
y=H.b(new S.o(null,null),[F.Q])
y.v(C.e,z,F.Q)
this.cx=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.ch=z
this.db=this.b.z.h(0,C.l)
this.cy=this.b.z.h(0,C.C)}}}],["","",,H,{
"^":"",
bF:function(){return new P.ar("No element")},
dI:function(){return new P.ar("Too few elements")},
bJ:{
"^":"O;",
gO:function(a){return H.b(new H.dM(this,this.gm(this),0,null),[H.K(this,"bJ",0)])},
C:function(a,b){var z,y
z=this.gm(this)
for(y=0;y<z;++y){b.$1(this.ap(0,y))
if(z!==this.gm(this))throw H.f(new P.a3(this))}},
ar:function(a,b){return H.b(new H.bK(this,b),[null,null])},
aU:function(a,b){var z,y,x
z=H.b([],[H.K(this,"bJ",0)])
C.f.sm(z,this.gm(this))
for(y=0;y<this.gm(this);++y){x=this.ap(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
aE:function(a){return this.aU(a,!0)},
$isE:1},
dM:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
E:function(){var z,y,x,w
z=this.a
y=J.a_(z)
x=y.gm(z)
if(this.b!==x)throw H.f(new P.a3(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.ap(z,w);++this.c
return!0}},
dN:{
"^":"O;a,b",
gO:function(a){var z=new H.hV(null,J.aW(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gm:function(a){return J.av(this.a)},
$asO:function(a,b){return[b]},
static:{bj:function(a,b,c,d){if(!!J.m(a).$isE)return H.b(new H.du(a,b),[c,d])
return H.b(new H.dN(a,b),[c,d])}}},
du:{
"^":"dN;a,b",
$isE:1},
hV:{
"^":"bG;a,b,c",
E:function(){var z=this.b
if(z.E()){this.a=this.ak(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a},
ak:function(a){return this.c.$1(a)},
$asbG:function(a,b){return[b]}},
bK:{
"^":"bJ;a,b",
gm:function(a){return J.av(this.a)},
ap:function(a,b){return this.ak(J.f9(this.a,b))},
ak:function(a){return this.b.$1(a)},
$asbJ:function(a,b){return[b]},
$asO:function(a,b){return[b]},
$isE:1},
cF:{
"^":"O;a,b",
gO:function(a){var z=new H.iH(J.aW(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
iH:{
"^":"bG;a,b",
E:function(){for(var z=this.a;z.E();)if(this.ak(z.gG())===!0)return!0
return!1},
gG:function(){return this.a.gG()},
ak:function(a){return this.b.$1(a)}},
it:{
"^":"O;a,b",
gO:function(a){var z=new H.iu(J.aW(this.a),this.b,!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
iu:{
"^":"bG;a,b,c",
E:function(){if(this.c)return!1
var z=this.a
if(!z.E()||this.ak(z.gG())!==!0){this.c=!0
return!1}return!0},
gG:function(){if(this.c)return
return this.a.gG()},
ak:function(a){return this.b.$1(a)}},
dy:{
"^":"c;",
sm:function(a,b){throw H.f(new P.W("Cannot change the length of a fixed-length list"))},
B:function(a,b){throw H.f(new P.W("Cannot add to a fixed-length list"))},
P:function(a,b){throw H.f(new P.W("Cannot remove from a fixed-length list"))},
N:function(a){throw H.f(new P.W("Cannot clear a fixed-length list"))},
ah:function(a){throw H.f(new P.W("Cannot remove from a fixed-length list"))}}}],["","",,H,{
"^":"",
eI:function(a){var z=H.b(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
j0:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.k8()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aT(new P.j2(z),1)).observe(y,{childList:true})
return new P.j1(z,y,x)}else if(self.setImmediate!=null)return P.k9()
return P.ka()},
mA:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aT(new P.j3(a),0))},"$1","k8",2,0,4],
mB:[function(a){++init.globalState.f.b
self.setImmediate(H.aT(new P.j4(a),0))},"$1","k9",2,0,4],
mC:[function(a){P.cC(C.y,a)},"$1","ka",2,0,4],
ey:function(a,b){var z=H.br()
z=H.aS(z,[z,z]).al(a)
if(z){b.toString
return a}else{b.toString
return a}},
ch:function(a,b,c){var z,y,x,w,v,u
z={}
y=H.b(new P.al(0,$.p,null),[P.r])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.h4(z,!1,b,y)
for(w=a.length,v=0;v<a.length;a.length===w||(0,H.d2)(a),++v)a[v].cl(new P.h3(z,!1,b,y,z.b++),x)
x=z.b
if(x===0){z=H.b(new P.al(0,$.p,null),[null])
z.bt(C.T)
return z}u=new Array(x)
u.fixed$length=Array
z.a=u
return y},
k2:function(){var z,y
for(;z=$.aP,z!=null;){$.b6=null
y=z.gaB()
$.aP=y
if(y==null)$.b5=null
z.gff().$0()}},
mN:[function(){$.cP=!0
try{P.k2()}finally{$.b6=null
$.cP=!1
if($.aP!=null)$.$get$cG().$1(P.eG())}},"$0","eG",0,0,2],
eD:function(a){var z=new P.el(a,null)
if($.aP==null){$.b5=z
$.aP=z
if(!$.cP)$.$get$cG().$1(P.eG())}else{$.b5.b=z
$.b5=z}},
k5:function(a){var z,y,x
z=$.aP
if(z==null){P.eD(a)
$.b6=$.b5
return}y=new P.el(a,null)
x=$.b6
if(x==null){y.b=z
$.b6=y
$.aP=y}else{y.b=x.b
x.b=y
$.b6=y
if(y.b==null)$.b5=y}},
eQ:function(a){var z=$.p
if(C.h===z){P.aQ(null,null,C.h,a)
return}z.toString
P.aQ(null,null,z,z.bV(a,!0))},
eC:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.m(z).$isae)return z
return}catch(w){v=H.a0(w)
y=v
x=H.Y(w)
v=$.p
v.toString
P.b7(null,null,v,y,x)}},
k4:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.a0(u)
z=t
y=H.Y(u)
$.p.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.am(x)
w=t
v=x.gac()
c.$2(w,v)}}},
jV:function(a,b,c,d){var z=a.bf()
if(!!J.m(z).$isae)z.co(new P.jY(b,c,d))
else b.a8(c,d)},
jW:function(a,b){return new P.jX(a,b)},
jU:function(a,b,c){$.p.toString
a.bs(b,c)},
e4:function(a,b){var z=$.p
if(z===C.h){z.toString
return P.cC(a,b)}return P.cC(a,z.bV(b,!0))},
cC:function(a,b){var z=C.c.an(a.a,1000)
return H.iA(z<0?0:z,b)},
b7:function(a,b,c,d,e){var z={}
z.a=d
P.k5(new P.k3(z,e))},
ez:function(a,b,c,d){var z,y
y=$.p
if(y===c)return d.$0()
$.p=c
z=y
try{y=d.$0()
return y}finally{$.p=z}},
eB:function(a,b,c,d,e){var z,y
y=$.p
if(y===c)return d.$1(e)
$.p=c
z=y
try{y=d.$1(e)
return y}finally{$.p=z}},
eA:function(a,b,c,d,e,f){var z,y
y=$.p
if(y===c)return d.$2(e,f)
$.p=c
z=y
try{y=d.$2(e,f)
return y}finally{$.p=z}},
aQ:function(a,b,c,d){var z=C.h!==c
if(z)d=c.bV(d,!(!z||!1))
P.eD(d)},
j2:{
"^":"d:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
j1:{
"^":"d:15;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
j3:{
"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
j4:{
"^":"d:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
j5:{
"^":"en;a"},
j7:{
"^":"jb;y,b9:z@,cG:Q?,x,a,b,c,d,e,f,r",
gb7:function(){return this.x},
bb:[function(){},"$0","gba",0,0,2],
bd:[function(){},"$0","gbc",0,0,2]},
j6:{
"^":"c;am:c@,b9:d?,cG:e?",
geO:function(){return this.c<4},
eX:function(a){var z,y
z=a.Q
y=a.z
z.sb9(y)
y.scG(z)
a.Q=a
a.z=a},
f0:function(a,b,c,d){var z,y
if((this.c&4)!==0){z=new P.jg($.p,0,c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.cX()
return z}z=$.p
y=new P.j7(null,null,null,this,null,null,null,z,d?1:0,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.cA(a,b,c,d,H.A(this,0))
y.Q=y
y.z=y
z=this.e
y.Q=z
y.z=this
z.sb9(y)
this.e=y
y.y=this.c&1
if(this.d===y)P.eC(this.a)
return y},
eS:function(a){var z
if(a.gb9()===a)return
z=a.y
if(typeof z!=="number")return z.ab()
if((z&2)!==0)a.y=z|4
else{this.eX(a)
if((this.c&2)===0&&this.d===this)this.eu()}return},
eT:function(a){},
eU:function(a){},
eo:function(){if((this.c&4)!==0)return new P.ar("Cannot add new events after calling close")
return new P.ar("Cannot add new events while doing an addStream")},
B:function(a,b){if(!this.geO())throw H.f(this.eo())
this.aJ(b)},
b5:function(a){this.aJ(a)},
eu:function(){if((this.c&4)!==0&&this.r.a===0)this.r.bt(null)
P.eC(this.b)}},
iZ:{
"^":"j6;a,b,c,d,e,f,r",
aJ:function(a){var z
for(z=this.d;z!==this;z=z.z)z.b4(H.b(new P.eo(a,null),[null]))}},
ae:{
"^":"c;"},
h4:{
"^":"d:20;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.a8(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.a8(z.c,z.d)}},
h3:{
"^":"d:8;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.bA(x)}else if(z.b===0&&!this.b)this.d.a8(z.c,z.d)}},
ja:{
"^":"c;",
fo:[function(a,b){var z
a=a!=null?a:new P.ct()
z=this.a
if(z.a!==0)throw H.f(new P.ar("Future already completed"))
$.p.toString
z.es(a,b)},function(a){return this.fo(a,null)},"fn","$2","$1","gfm",2,2,9,0]},
j_:{
"^":"ja;a",
fl:function(a,b){var z=this.a
if(z.a!==0)throw H.f(new P.ar("Future already completed"))
z.bt(b)}},
bn:{
"^":"c;cU:a<,b,c,d,e",
gf4:function(){return this.b.b},
gdk:function(){return(this.c&1)!==0},
gfN:function(){return(this.c&2)!==0},
gfO:function(){return this.c===6},
gdj:function(){return this.c===8},
geP:function(){return this.d},
gf3:function(){return this.d}},
al:{
"^":"c;am:a@,b,eZ:c<",
cl:function(a,b){var z,y
z=$.p
if(z!==C.h){z.toString
if(b!=null)b=P.ey(b,z)}y=H.b(new P.al(0,z,null),[null])
this.b3(new P.bn(null,y,b==null?1:3,a,b))
return y},
a4:function(a){return this.cl(a,null)},
co:function(a){var z,y
z=$.p
y=new P.al(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.h)z.toString
this.b3(new P.bn(null,y,8,a,null))
return y},
bG:function(){if(this.a!==0)throw H.f(new P.ar("Future already completed"))
this.a=1},
b3:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.aQ(null,null,z,new P.jl(this,a))}else{a.a=this.c
this.c=a}},
be:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.gcU()
z.a=y}return y},
by:function(a){var z
if(!!J.m(a).$isae)P.cJ(a,this)
else{z=this.be()
this.a=4
this.c=a
P.aN(this,z)}},
bA:function(a){var z=this.be()
this.a=4
this.c=a
P.aN(this,z)},
a8:[function(a,b){var z=this.be()
this.a=8
this.c=new P.bd(a,b)
P.aN(this,z)},function(a){return this.a8(a,null)},"he","$2","$1","gbz",2,2,10,0],
bt:function(a){var z
if(a==null);else if(!!J.m(a).$isae){if(a.a===8){this.bG()
z=this.b
z.toString
P.aQ(null,null,z,new P.jn(this,a))}else P.cJ(a,this)
return}this.bG()
z=this.b
z.toString
P.aQ(null,null,z,new P.jo(this,a))},
es:function(a,b){var z
this.bG()
z=this.b
z.toString
P.aQ(null,null,z,new P.jm(this,a,b))},
$isae:1,
static:{jp:function(a,b){var z,y,x,w
b.sam(2)
try{a.cl(new P.jq(b),new P.jr(b))}catch(x){w=H.a0(x)
z=w
y=H.Y(x)
P.eQ(new P.js(b,z,y))}},cJ:function(a,b){var z
b.a=2
z=new P.bn(null,b,0,null,null)
if(a.a>=4)P.aN(a,z)
else a.b3(z)},aN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.am(v)
x=v.gac()
z.toString
P.b7(null,null,z,y,x)}return}for(;b.gcU()!=null;b=u){u=b.a
b.a=null
P.aN(z.a,b)}x.a=w
t=z.a.c
x.b=t
y=!w
if(!y||b.gdk()||b.gdj()){s=b.gf4()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.am(v)
r=v.gac()
y.toString
P.b7(null,null,y,x,r)
return}q=$.p
if(q==null?s!=null:q!==s)$.p=s
else q=null
if(b.gdj())new P.jv(z,x,w,b,s).$0()
else if(y){if(b.gdk())new P.ju(x,w,b,t,s).$0()}else if(b.gfN())new P.jt(z,x,b,s).$0()
if(q!=null)$.p=q
y=x.b
r=J.m(y)
if(!!r.$isae){p=b.b
if(!!r.$isal)if(y.a>=4){p.a=2
z.a=y
b=new P.bn(null,p,0,null,null)
continue}else{p.a=2
o=new P.bn(null,p,0,null,null)
if(y.a>=4)P.aN(y,o)
else y.b3(o)}else P.jp(y,p)
return}}p=b.b
b=p.be()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
jl:{
"^":"d:1;a,b",
$0:function(){P.aN(this.a,this.b)}},
jq:{
"^":"d:0;a",
$1:function(a){this.a.bA(a)}},
jr:{
"^":"d:11;a",
$2:function(a,b){this.a.a8(a,b)},
$1:function(a){return this.$2(a,null)}},
js:{
"^":"d:1;a,b,c",
$0:function(){this.a.a8(this.b,this.c)}},
jn:{
"^":"d:1;a,b",
$0:function(){P.cJ(this.b,this.a)}},
jo:{
"^":"d:1;a,b",
$0:function(){this.a.bA(this.b)}},
jm:{
"^":"d:1;a,b,c",
$0:function(){this.a.a8(this.b,this.c)}},
ju:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w
try{x=this.a
x.b=this.e.cj(this.c.geP(),this.d)
x.a=!1}catch(w){x=H.a0(w)
z=x
y=H.Y(w)
x=this.a
x.b=new P.bd(z,y)
x.a=!0}}},
jt:{
"^":"d:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.c
y=!0
r=this.c
if(r.gfO()){x=r.d
try{y=this.d.cj(x,J.am(z))}catch(q){r=H.a0(q)
w=r
v=H.Y(q)
r=J.am(z)
p=w
o=(r==null?p==null:r===p)?z:new P.bd(w,v)
r=this.b
r.b=o
r.a=!0
return}}u=r.e
if(y===!0&&u!=null)try{r=u
p=H.br()
p=H.aS(p,[p,p]).al(r)
n=this.d
m=this.b
if(p)m.b=n.h7(u,J.am(z),z.gac())
else m.b=n.cj(u,J.am(z))
m.a=!1}catch(q){r=H.a0(q)
t=r
s=H.Y(q)
r=J.am(z)
p=t
o=(r==null?p==null:r===p)?z:new P.bd(t,s)
r=this.b
r.b=o
r.a=!0}}},
jv:{
"^":"d:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u
z=null
try{z=this.e.dF(this.d.gf3())}catch(w){v=H.a0(w)
y=v
x=H.Y(w)
if(this.c){v=J.am(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bd(y,x)
u.a=!0
return}if(!!J.m(z).$isae){if(z instanceof P.al&&z.gam()>=4){if(z.gam()===8){v=this.b
v.b=z.geZ()
v.a=!0}return}v=this.b
v.b=z.a4(new P.jw(this.a.a))
v.a=!1}}},
jw:{
"^":"d:0;a",
$1:function(a){return this.a}},
el:{
"^":"c;ff:a<,aB:b@"},
as:{
"^":"c;",
ar:function(a,b){return H.b(new P.jI(b,this),[H.K(this,"as",0),null])},
C:function(a,b){var z,y
z={}
y=H.b(new P.al(0,$.p,null),[null])
z.a=null
z.a=this.af(new P.im(z,this,b,y),!0,new P.io(y),y.gbz())
return y},
gm:function(a){var z,y
z={}
y=H.b(new P.al(0,$.p,null),[P.u])
z.a=0
this.af(new P.ip(z),!0,new P.iq(z,y),y.gbz())
return y},
aE:function(a){var z,y
z=H.b([],[H.K(this,"as",0)])
y=H.b(new P.al(0,$.p,null),[[P.r,H.K(this,"as",0)]])
this.af(new P.ir(this,z),!0,new P.is(z,y),y.gbz())
return y}},
im:{
"^":"d;a,b,c,d",
$1:function(a){P.k4(new P.ik(this.c,a),new P.il(),P.jW(this.a.a,this.d))},
$signature:function(){return H.cS(function(a){return{func:1,args:[a]}},this.b,"as")}},
ik:{
"^":"d:1;a,b",
$0:function(){return this.a.$1(this.b)}},
il:{
"^":"d:0;",
$1:function(a){}},
io:{
"^":"d:1;a",
$0:function(){this.a.by(null)}},
ip:{
"^":"d:0;a",
$1:function(a){++this.a.a}},
iq:{
"^":"d:1;a,b",
$0:function(){this.b.by(this.a.a)}},
ir:{
"^":"d;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.cS(function(a){return{func:1,args:[a]}},this.a,"as")}},
is:{
"^":"d:1;a,b",
$0:function(){this.b.by(this.a)}},
ij:{
"^":"c;"},
en:{
"^":"jR;a",
gJ:function(a){return(H.ao(this.a)^892482866)>>>0},
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.en))return!1
return b.a===this.a}},
jb:{
"^":"cH;b7:x<",
bJ:function(){return this.gb7().eS(this)},
bb:[function(){this.gb7().eT(this)},"$0","gba",0,0,2],
bd:[function(){this.gb7().eU(this)},"$0","gbc",0,0,2]},
mH:{
"^":"c;"},
cH:{
"^":"c;am:e@",
aP:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.d9()
if((z&4)===0&&(this.e&32)===0)this.cR(this.gba())},
cb:function(a){return this.aP(a,null)},
cg:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gae(z)}else z=!1
if(z)this.r.bm(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cR(this.gbc())}}}},
bf:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.bu()
return this.f},
bu:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.d9()
if((this.e&32)===0)this.r=null
this.f=this.bJ()},
b5:["ee",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.aJ(a)
else this.b4(H.b(new P.eo(a,null),[null]))}],
bs:["ef",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cY(a,b)
else this.b4(new P.jf(a,b,null))}],
er:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.bP()
else this.b4(C.G)},
bb:[function(){},"$0","gba",0,0,2],
bd:[function(){},"$0","gbc",0,0,2],
bJ:function(){return},
b4:function(a){var z,y
z=this.r
if(z==null){z=new P.jS(null,null,0)
this.r=z}z.B(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bm(this)}},
aJ:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.ck(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bw((z&4)!==0)},
cY:function(a,b){var z,y
z=this.e
y=new P.j9(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bu()
z=this.f
if(!!J.m(z).$isae)z.co(y)
else y.$0()}else{y.$0()
this.bw((z&4)!==0)}},
bP:function(){var z,y
z=new P.j8(this)
this.bu()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.m(y).$isae)y.co(z)
else z.$0()},
cR:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bw((z&4)!==0)},
bw:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gae(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gae(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bb()
else this.bd()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bm(this)},
cA:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ey(b,z)
this.c=c}},
j9:{
"^":"d:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.br()
x=H.aS(x,[x,x]).al(y)
w=z.d
v=this.b
u=z.b
if(x)w.h8(u,v,this.c)
else w.ck(u,v)
z.e=(z.e&4294967263)>>>0}},
j8:{
"^":"d:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ci(z.c)
z.e=(z.e&4294967263)>>>0}},
jR:{
"^":"as;",
af:function(a,b,c,d){return this.a.f0(a,d,c,!0===b)},
c8:function(a,b,c){return this.af(a,null,b,c)}},
ep:{
"^":"c;aB:a@"},
eo:{
"^":"ep;I:b>,a",
cc:function(a){a.aJ(this.b)}},
jf:{
"^":"ep;aL:b>,ac:c<,a",
cc:function(a){a.cY(this.b,this.c)}},
je:{
"^":"c;",
cc:function(a){a.bP()},
gaB:function(){return},
saB:function(a){throw H.f(new P.ar("No events after a done."))}},
jK:{
"^":"c;am:a@",
bm:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.eQ(new P.jL(this,a))
this.a=1},
d9:function(){if(this.a===1)this.a=3}},
jL:{
"^":"d:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaB()
z.b=w
if(w==null)z.c=null
x.cc(this.b)}},
jS:{
"^":"jK;b,c,a",
gae:function(a){return this.c==null},
B:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saB(b)
this.c=b}},
N:function(a){if(this.a===1)this.a=3
this.c=null
this.b=null}},
jg:{
"^":"c;a,am:b@,c",
cX:function(){var z,y
if((this.b&2)!==0)return
z=this.a
y=this.gf_()
z.toString
P.aQ(null,null,z,y)
this.b=(this.b|2)>>>0},
aP:function(a,b){this.b+=4},
cb:function(a){return this.aP(a,null)},
cg:function(){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.cX()}},
bf:function(){return},
bP:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.ci(this.c)},"$0","gf_",0,0,2]},
jY:{
"^":"d:1;a,b,c",
$0:function(){return this.a.a8(this.b,this.c)}},
jX:{
"^":"d:7;a,b",
$2:function(a,b){return P.jV(this.a,this.b,a,b)}},
cI:{
"^":"as;",
af:function(a,b,c,d){return this.ey(a,d,c,!0===b)},
c8:function(a,b,c){return this.af(a,null,b,c)},
ey:function(a,b,c,d){return P.jk(this,a,b,c,d,H.K(this,"cI",0),H.K(this,"cI",1))},
cS:function(a,b){b.b5(a)},
$asas:function(a,b){return[b]}},
eq:{
"^":"cH;x,y,a,b,c,d,e,f,r",
b5:function(a){if((this.e&2)!==0)return
this.ee(a)},
bs:function(a,b){if((this.e&2)!==0)return
this.ef(a,b)},
bb:[function(){var z=this.y
if(z==null)return
z.cb(0)},"$0","gba",0,0,2],
bd:[function(){var z=this.y
if(z==null)return
z.cg()},"$0","gbc",0,0,2],
bJ:function(){var z=this.y
if(z!=null){this.y=null
return z.bf()}return},
hg:[function(a){this.x.cS(a,this)},"$1","geE",2,0,function(){return H.cS(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"eq")}],
hi:[function(a,b){this.bs(a,b)},"$2","geG",4,0,13],
hh:[function(){this.er()},"$0","geF",0,0,2],
el:function(a,b,c,d,e,f,g){var z,y
z=this.geE()
y=this.geG()
this.y=this.x.a.c8(z,this.geF(),y)},
$ascH:function(a,b){return[b]},
static:{jk:function(a,b,c,d,e,f,g){var z=$.p
z=H.b(new P.eq(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.cA(b,c,d,e,g)
z.el(a,b,c,d,e,f,g)
return z}}},
jI:{
"^":"cI;b,a",
cS:function(a,b){var z,y,x,w,v
z=null
try{z=this.f1(a)}catch(w){v=H.a0(w)
y=v
x=H.Y(w)
P.jU(b,y,x)
return}b.b5(z)},
f1:function(a){return this.b.$1(a)}},
bd:{
"^":"c;aL:a>,ac:b<",
j:function(a){return H.e(this.a)},
$isR:1},
jT:{
"^":"c;"},
k3:{
"^":"d:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.ct()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.f(z)
x=H.f(z)
x.stack=J.aF(y)
throw x}},
jN:{
"^":"jT;",
ci:function(a){var z,y,x,w
try{if(C.h===$.p){x=a.$0()
return x}x=P.ez(null,null,this,a)
return x}catch(w){x=H.a0(w)
z=x
y=H.Y(w)
return P.b7(null,null,this,z,y)}},
ck:function(a,b){var z,y,x,w
try{if(C.h===$.p){x=a.$1(b)
return x}x=P.eB(null,null,this,a,b)
return x}catch(w){x=H.a0(w)
z=x
y=H.Y(w)
return P.b7(null,null,this,z,y)}},
h8:function(a,b,c){var z,y,x,w
try{if(C.h===$.p){x=a.$2(b,c)
return x}x=P.eA(null,null,this,a,b,c)
return x}catch(w){x=H.a0(w)
z=x
y=H.Y(w)
return P.b7(null,null,this,z,y)}},
bV:function(a,b){if(b)return new P.jO(this,a)
else return new P.jP(this,a)},
fb:function(a,b){return new P.jQ(this,a)},
h:function(a,b){return},
dF:function(a){if($.p===C.h)return a.$0()
return P.ez(null,null,this,a)},
cj:function(a,b){if($.p===C.h)return a.$1(b)
return P.eB(null,null,this,a,b)},
h7:function(a,b,c){if($.p===C.h)return a.$2(b,c)
return P.eA(null,null,this,a,b,c)}},
jO:{
"^":"d:1;a,b",
$0:function(){return this.a.ci(this.b)}},
jP:{
"^":"d:1;a,b",
$0:function(){return this.a.dF(this.b)}},
jQ:{
"^":"d:0;a,b",
$1:function(a){return this.a.ck(this.b,a)}}}],["","",,P,{
"^":"",
b1:function(a,b){return H.b(new H.P(0,null,null,null,null,null,0),[a,b])},
hS:function(){return H.b(new H.P(0,null,null,null,null,null,0),[null,null])},
af:function(a){return H.kd(a,H.b(new H.P(0,null,null,null,null,null,0),[null,null]))},
dH:function(a,b,c){var z,y
if(P.cQ(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$b8()
y.push(a)
try{P.k_(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.e1(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bE:function(a,b,c){var z,y,x
if(P.cQ(a))return b+"..."+c
z=new P.cA(b)
y=$.$get$b8()
y.push(a)
try{x=z
x.a=P.e1(x.gau(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.gau()+c
y=z.gau()
return y.charCodeAt(0)==0?y:y},
cQ:function(a){var z,y
for(z=0;y=$.$get$b8(),z<y.length;++z)if(a===y[z])return!0
return!1},
k_:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.aW(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.E())return
w=H.e(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.E()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gG();++x
if(!z.E()){if(x<=4){b.push(H.e(t))
return}v=H.e(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.E();t=s,s=r){r=z.gG();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.e(t)
v=H.e(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aK:function(a,b,c,d){return H.b(new P.jC(0,null,null,null,null,null,0),[d])},
hT:function(a,b){var z,y
z=P.aK(null,null,null,b)
for(y=0;y<5;++y)z.B(0,a[y])
return z},
hW:function(a){var z,y,x
z={}
if(P.cQ(a))return"{...}"
y=new P.cA("")
try{$.$get$b8().push(a)
x=y
x.a=x.gau()+"{"
z.a=!0
J.bw(a,new P.hX(z,y))
z=y
z.a=z.gau()+"}"}finally{z=$.$get$b8()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gau()
return z.charCodeAt(0)==0?z:z},
et:{
"^":"P;a,b,c,d,e,f,r",
aN:function(a){return H.kw(a)&0x3ffffff},
aO:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdl()
if(x==null?b==null:x===b)return y}return-1},
static:{b4:function(a,b){return H.b(new P.et(0,null,null,null,null,null,0),[a,b])}}},
jC:{
"^":"jy;a,b,c,d,e,f,r",
gO:function(a){var z=H.b(new P.bY(this,this.r,null,null),[null])
z.c=z.a.e
return z},
gm:function(a){return this.a},
dd:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ew(b)},
ew:function(a){var z=this.d
if(z==null)return!1
return this.b8(z[this.b6(a)],a)>=0},
dr:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.dd(0,a)?a:null
else return this.eN(a)},
eN:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.b6(a)]
x=this.b8(y,a)
if(x<0)return
return J.k(y,x).gcN()},
C:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.f(new P.a3(this))
z=z.b}},
B:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cL()
this.b=z}return this.cJ(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cL()
this.c=y}return this.cJ(y,b)}else return this.a7(b)},
a7:function(a){var z,y,x
z=this.d
if(z==null){z=P.cL()
this.d=z}y=this.b6(a)
x=z[y]
if(x==null)z[y]=[this.bx(a)]
else{if(this.b8(x,a)>=0)return!1
x.push(this.bx(a))}return!0},
P:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cV(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cV(this.c,b)
else return this.bL(b)},
bL:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.b6(a)]
x=this.b8(y,a)
if(x<0)return!1
this.d2(y.splice(x,1)[0])
return!0},
N:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cJ:function(a,b){if(a[b]!=null)return!1
a[b]=this.bx(b)
return!0},
cV:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.d2(z)
delete a[b]
return!0},
bx:function(a){var z,y
z=new P.jD(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d2:function(a){var z,y
z=a.geR()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
b6:function(a){return J.M(a)&0x3ffffff},
b8:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.F(a[y].gcN(),b))return y
return-1},
$isE:1,
static:{cL:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jD:{
"^":"c;cN:a<,b,eR:c<"},
bY:{
"^":"c;a,b,c,d",
gG:function(){return this.d},
E:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.a3(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jy:{
"^":"ic;"},
cj:{
"^":"c;",
ar:function(a,b){return H.bj(this,b,H.K(this,"cj",0),null)},
dN:function(a,b){return H.b(new H.cF(this,b),[H.K(this,"cj",0)])},
C:function(a,b){var z
for(z=this.gO(this);z.E();)b.$1(z.gG())},
gm:function(a){var z,y
z=this.gO(this)
for(y=0;z.E();)++y
return y},
j:function(a){return P.dH(this,"(",")")}},
co:{
"^":"c;",
gO:function(a){return H.b(new H.dM(a,this.gm(a),0,null),[H.K(a,"co",0)])},
ap:function(a,b){return this.h(a,b)},
C:function(a,b){var z,y,x,w
z=this.gm(a)
for(y=a.length,x=z!==y,w=0;w<z;++w){if(w>=y)return H.a(a,w)
b.$1(a[w])
if(x)throw H.f(new P.a3(a))}},
ar:function(a,b){return H.b(new H.bK(a,b),[null,null])},
B:function(a,b){var z=this.gm(a)
this.sm(a,z+1)
if(z>=a.length)return H.a(a,z)
a[z]=b},
P:function(a,b){var z,y
for(z=0;z<this.gm(a);++z){y=a.length
if(z>=y)return H.a(a,z)
if(a[z]===b){--y
this.ai(a,z,y,a,z+1)
this.sm(a,y)
return!0}}return!1},
N:function(a){this.sm(a,0)},
ah:function(a){var z,y,x
if(this.gm(a)===0)throw H.f(H.bF())
z=a.length
y=z-1
if(y<0)return H.a(a,y)
x=a[y]
this.sm(a,y)
return x},
fG:function(a,b,c,d){var z,y
P.bT(b,c,this.gm(a),null,null,null)
for(z=a.length,y=b;J.bv(y,c);++y){if(y>>>0!==y||y>=z)return H.a(a,y)
a[y]=d}},
ai:["cw",function(a,b,c,d,e){var z,y,x,w,v,u
P.bT(b,c,this.gm(a),null,null,null)
z=c-b
if(z===0)return
if(e+z>J.av(d))throw H.f(H.dI())
if(e<b)for(y=z-1,x=d.length,w=a.length;y>=0;--y){v=b+y
u=e+y
if(u>=x)return H.a(d,u)
u=d[u]
if(v>=w)return H.a(a,v)
a[v]=u}else for(x=d.length,w=a.length,y=0;y<z;++y){v=b+y
u=e+y
if(u>=x)return H.a(d,u)
u=d[u]
if(v>=w)return H.a(a,v)
a[v]=u}}],
j:function(a){return P.bE(a,"[","]")},
$isr:1,
$asr:null,
$isE:1},
hX:{
"^":"d:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
hU:{
"^":"O;a,b,c,d",
gO:function(a){var z=new P.jE(this,this.c,this.d,this.b,null)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
C:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.L(new P.a3(this))}},
gae:function(a){return this.b===this.c},
gm:function(a){return(this.c-this.b&this.a.length-1)>>>0},
B:function(a,b){this.a7(b)},
P:function(a,b){var z,y
for(z=this.b;z!==this.c;z=(z+1&this.a.length-1)>>>0){y=this.a
if(z<0||z>=y.length)return H.a(y,z)
if(J.F(y[z],b)){this.bL(z);++this.d
return!0}}return!1},
N:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.bE(this,"{","}")},
dD:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.f(H.bF());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ah:function(a){var z,y,x,w
z=this.b
y=this.c
if(z===y)throw H.f(H.bF());++this.d
z=this.a
x=z.length
y=(y-1&x-1)>>>0
this.c=y
if(y<0||y>=x)return H.a(z,y)
w=z[y]
z[y]=null
return w},
a7:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cQ();++this.d},
bL:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z.length
x=y-1
w=this.b
v=this.c
if((a-w&x)>>>0<(v-a&x)>>>0){for(u=a;u!==w;u=t){t=(u-1&x)>>>0
if(t<0||t>=y)return H.a(z,t)
v=z[t]
if(u<0||u>=y)return H.a(z,u)
z[u]=v}if(w>=y)return H.a(z,w)
z[w]=null
this.b=(w+1&x)>>>0
return(a+1&x)>>>0}else{w=(v-1&x)>>>0
this.c=w
for(u=a;u!==w;u=s){s=(u+1&x)>>>0
if(s<0||s>=y)return H.a(z,s)
v=z[s]
if(u<0||u>=y)return H.a(z,u)
z[u]=v}if(w<0||w>=y)return H.a(z,w)
z[w]=null
return a}},
cQ:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.b(z,[H.A(this,0)])
z=this.a
x=this.b
w=z.length-x
C.f.ai(y,0,w,z,x)
C.f.ai(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ej:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.b(z,[b])},
$isE:1,
static:{cp:function(a,b){var z=H.b(new P.hU(null,0,0,0),[b])
z.ej(a,b)
return z}}},
jE:{
"^":"c;a,b,c,d,e",
gG:function(){return this.e},
E:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.L(new P.a3(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
id:{
"^":"c;",
N:function(a){this.h2(this.aE(0))},
h2:function(a){var z,y
for(z=a.length,y=0;y<a.length;a.length===z||(0,H.d2)(a),++y)this.P(0,a[y])},
aU:function(a,b){var z,y,x,w,v
z=H.b([],[H.A(this,0)])
C.f.sm(z,this.a)
for(y=H.b(new P.bY(this,this.r,null,null),[null]),y.c=y.a.e,x=0;y.E();x=v){w=y.d
v=x+1
if(x>=z.length)return H.a(z,x)
z[x]=w}return z},
aE:function(a){return this.aU(a,!0)},
ar:function(a,b){return H.b(new H.du(this,b),[H.A(this,0),null])},
j:function(a){return P.bE(this,"{","}")},
C:function(a,b){var z
for(z=H.b(new P.bY(this,this.r,null,null),[null]),z.c=z.a.e;z.E();)b.$1(z.d)},
$isE:1},
ic:{
"^":"id;"}}],["","",,P,{
"^":"",
dw:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aF(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fS(a)},
fS:function(a){var z=J.m(a)
if(!!z.$isd)return z.j(a)
return H.bR(a)},
bC:function(a){return new P.jj(a)},
cq:function(a,b,c){var z,y
z=H.b([],[c])
for(y=J.aW(a);y.E();)z.push(y.gG())
return z},
bu:function(a){var z=H.e(a)
H.kx(z)},
bq:{
"^":"c;"},
"+bool":0,
l0:{
"^":"c;"},
au:{
"^":"b9;"},
"+double":0,
ac:{
"^":"c;av:a<",
p:function(a,b){return new P.ac(this.a+b.gav())},
F:function(a,b){return new P.ac(this.a-b.gav())},
A:function(a,b){if(typeof b!=="number")return H.j(b)
return new P.ac(C.a.aR(this.a*b))},
aH:function(a,b){if(b===0)throw H.f(new P.hB())
return new P.ac(C.c.aH(this.a,b))},
aZ:function(a,b){return this.a<b.gav()},
a1:function(a,b){return this.a>b.gav()},
cr:function(a,b){return this.a<=b.gav()},
at:function(a,b){return this.a>=b.gav()},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.ac))return!1
return this.a===b.a},
gJ:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.fK()
y=this.a
if(y<0)return"-"+new P.ac(-y).j(0)
x=z.$1(C.c.ce(C.c.an(y,6e7),60))
w=z.$1(C.c.ce(C.c.an(y,1e6),60))
v=new P.fJ().$1(C.c.ce(y,1e6))
return""+C.c.an(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
d4:function(a){return new P.ac(Math.abs(this.a))},
bl:function(a){return new P.ac(-this.a)},
static:{fI:function(a,b,c,d,e,f){return new P.ac(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fJ:{
"^":"d:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fK:{
"^":"d:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
R:{
"^":"c;",
gac:function(){return H.Y(this.$thrownJsError)}},
ct:{
"^":"R;",
j:function(a){return"Throw of null."}},
aG:{
"^":"R;a,b,c,d",
gbD:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbC:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.e(z)+")":""
z=this.d
x=z==null?"":": "+H.e(z)
w=this.gbD()+y+x
if(!this.a)return w
v=this.gbC()
u=P.dw(this.b)
return w+v+": "+H.e(u)},
static:{a7:function(a){return new P.aG(!1,null,null,a)},fn:function(a,b,c){return new P.aG(!0,a,b,c)}}},
dY:{
"^":"aG;e,f,a,b,c,d",
gbD:function(){return"RangeError"},
gbC:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else{if(typeof x!=="number")return x.a1()
if(typeof z!=="number")return H.j(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{bS:function(a,b,c){return new P.dY(null,null,!0,a,b,"Value not in range")},ap:function(a,b,c,d,e){return new P.dY(b,c,!0,a,d,"Invalid value")},bT:function(a,b,c,d,e,f){if(typeof a!=="number")return H.j(a)
if(0>a||a>c)throw H.f(P.ap(a,0,c,"start",f))
if(typeof b!=="number")return H.j(b)
if(a>b||b>c)throw H.f(P.ap(b,a,c,"end",f))
return b}}},
hy:{
"^":"aG;e,m:f>,a,b,c,d",
gbD:function(){return"RangeError"},
gbC:function(){if(J.bv(this.b,0))return": index must not be negative"
var z=this.f
if(J.F(z,0))return": no indices are valid"
return": index should be less than "+H.e(z)},
static:{dE:function(a,b,c,d,e){var z=e!=null?e:J.av(b)
return new P.hy(b,z,!0,a,c,"Index out of range")}}},
W:{
"^":"R;a",
j:function(a){return"Unsupported operation: "+this.a}},
eh:{
"^":"R;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.e(z):"UnimplementedError"}},
ar:{
"^":"R;a",
j:function(a){return"Bad state: "+this.a}},
a3:{
"^":"R;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.dw(z))+"."}},
i2:{
"^":"c;",
j:function(a){return"Out of Memory"},
gac:function(){return},
$isR:1},
e0:{
"^":"c;",
j:function(a){return"Stack Overflow"},
gac:function(){return},
$isR:1},
fE:{
"^":"R;a",
j:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
jj:{
"^":"c;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.e(z)}},
hB:{
"^":"c;",
j:function(a){return"IntegerDivisionByZeroException"}},
fT:{
"^":"c;a",
j:function(a){return"Expando:"+H.e(this.a)},
h:function(a,b){var z=H.bQ(b,"expando$values")
return z==null?null:H.bQ(z,this.cP())},
u:function(a,b,c){var z=H.bQ(b,"expando$values")
if(z==null){z=new P.c()
H.cx(b,"expando$values",z)}H.cx(z,this.cP(),c)},
cP:function(){var z,y
z=H.bQ(this,"expando$key")
if(z==null){y=$.dx
$.dx=y+1
z="expando$key$"+y
H.cx(this,"expando$key",z)}return z}},
h2:{
"^":"c;"},
u:{
"^":"b9;"},
"+int":0,
O:{
"^":"c;",
ar:function(a,b){return H.bj(this,b,H.K(this,"O",0),null)},
C:function(a,b){var z
for(z=this.gO(this);z.E();)b.$1(z.gG())},
aU:function(a,b){return P.cq(this,!0,H.K(this,"O",0))},
aE:function(a){return this.aU(a,!0)},
gm:function(a){var z,y
z=this.gO(this)
for(y=0;z.E();)++y
return y},
ap:function(a,b){var z,y,x
if(b<0)H.L(P.ap(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.E();){x=z.gG()
if(b===y)return x;++y}throw H.f(P.dE(b,this,"index",null,y))},
j:function(a){return P.dH(this,"(",")")}},
bG:{
"^":"c;"},
r:{
"^":"c;",
$asr:null,
$isO:1,
$isE:1},
"+List":0,
i1:{
"^":"c;",
j:function(a){return"null"}},
"+Null":0,
b9:{
"^":"c;"},
"+num":0,
c:{
"^":";",
w:function(a,b){return this===b},
gJ:function(a){return H.ao(this)},
j:function(a){return H.bR(this)},
gL:function(a){return new H.ak(H.aC(this),null)},
toString:function(){return this.j(this)}},
aA:{
"^":"c;"},
H:{
"^":"c;"},
"+String":0,
cA:{
"^":"c;au:a<",
gm:function(a){return this.a.length},
N:function(a){this.a=""},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{e1:function(a,b,c){var z=J.aW(b)
if(!z.E())return a
if(c.length===0){do a+=H.e(z.gG())
while(z.E())}else{a+=H.e(z.gG())
for(;z.E();)a=a+c+H.e(z.gG())}return a}}},
bl:{
"^":"c;"}}],["","",,W,{
"^":"",
dj:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.R)},
dD:function(a,b,c){return W.hw(a,null,null,b,null,null,null,c).a4(new W.hv())},
hw:function(a,b,c,d,e,f,g,h){var z,y,x
z=H.b(new P.j_(H.b(new P.al(0,$.p,null),[W.b_])),[W.b_])
y=new XMLHttpRequest()
C.I.fY(y,"GET",a,!0)
x=H.b(new W.b2(y,"load",!1),[null])
H.b(new W.a6(0,x.a,x.b,W.X(new W.hx(z,y)),!1),[H.A(x,0)]).V()
x=H.b(new W.b2(y,"error",!1),[null])
H.b(new W.a6(0,x.a,x.b,W.X(z.gfm()),!1),[H.A(x,0)]).V()
y.send()
return z.a},
aB:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
er:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
ew:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.jd(a)
if(!!J.m(z).$isa1)return z
return}else return a},
X:function(a){var z=$.p
if(z===C.h)return a
return z.fb(a,!0)},
w:{
"^":"bg;",
$isw:1,
$isc:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLModElement|HTMLOListElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kQ:{
"^":"w;",
j:function(a){return String(a)},
$isi:1,
"%":"HTMLAnchorElement"},
kS:{
"^":"w;",
j:function(a){return String(a)},
$isi:1,
"%":"HTMLAreaElement"},
kT:{
"^":"w;",
$isa1:1,
$isi:1,
"%":"HTMLBodyElement"},
kU:{
"^":"w;I:value%",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLButtonElement"},
ce:{
"^":"w;q:height%,t:width%",
cp:function(a,b,c){return a.getContext(b,P.kb(c,null))},
$isce:1,
"%":"HTMLCanvasElement"},
kY:{
"^":"bk;m:length=",
$isi:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fC:{
"^":"hC;m:length=",
aX:function(a,b){var z=this.eD(a,b)
return z!=null?z:""},
eD:function(a,b){if(W.dj(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.dr()+b)},
cH:function(a,b){var z,y
z=$.$get$dk()
y=z[b]
if(typeof y==="string")return y
y=W.dj(b) in a?b:P.dr()+b
z[b]=y
return y},
cZ:function(a,b,c,d){a.setProperty(b,c,d)},
gc0:function(a){return a.clear},
gq:function(a){return a.height},
gS:function(a){return a.left},
sS:function(a,b){a.left=b},
ga_:function(a){return a.right},
sa_:function(a,b){a.right=b},
gt:function(a){return a.width},
N:function(a){return this.gc0(a).$0()},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hC:{
"^":"i+fD;"},
fD:{
"^":"c;",
gc0:function(a){return this.aX(a,"clear")},
gq:function(a){return this.aX(a,"height")},
gS:function(a){return this.aX(a,"left")},
sS:function(a,b){this.cZ(a,this.cH(a,"left"),b,"")},
sdz:function(a,b){this.cZ(a,this.cH(a,"opacity"),b,"")},
gt:function(a){return this.aX(a,"width")},
N:function(a){return this.gc0(a).$0()}},
l1:{
"^":"aw;I:value=",
"%":"DeviceLightEvent"},
l2:{
"^":"bk;",
$isi:1,
"%":"DocumentFragment|ShadowRoot"},
l3:{
"^":"i;",
j:function(a){return String(a)},
"%":"DOMException"},
fH:{
"^":"i;bX:bottom=,q:height=,S:left=,a_:right=,aV:top=,t:width=,k:x=,l:y=",
j:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gt(a))+" x "+H.e(this.gq(a))},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isaq)return!1
y=a.left
x=z.gS(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaV(b)
if(y==null?x==null:y===x){y=this.gt(a)
x=z.gt(b)
if(y==null?x==null:y===x){y=this.gq(a)
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gJ:function(a){var z,y,x,w
z=J.M(a.left)
y=J.M(a.top)
x=J.M(this.gt(a))
w=J.M(this.gq(a))
return W.er(W.aB(W.aB(W.aB(W.aB(0,z),y),x),w))},
gcm:function(a){return H.b(new P.ah(a.left,a.top),[null])},
$isaq:1,
$asaq:I.c0,
"%":";DOMRectReadOnly"},
bg:{
"^":"bk;n:id=",
gds:function(a){return P.i7(C.a.aR(a.offsetLeft),C.a.aR(a.offsetTop),C.a.aR(a.offsetWidth),C.a.aR(a.offsetHeight),null)},
j:function(a){return a.localName},
dR:function(a){return a.getBoundingClientRect()},
gdt:function(a){return H.b(new W.at(a,"click",!1),[null])},
gdu:function(a){return H.b(new W.at(a,"contextmenu",!1),[null])},
gdv:function(a){return H.b(new W.at(a,"mousedown",!1),[null])},
gdw:function(a){return H.b(new W.at(a,"mouseup",!1),[null])},
$isbg:1,
$isi:1,
$isa1:1,
"%":";Element"},
l5:{
"^":"w;q:height%,t:width%",
"%":"HTMLEmbedElement"},
l6:{
"^":"aw;aL:error=",
"%":"ErrorEvent"},
aw:{
"^":"i;",
h_:function(a){return a.preventDefault()},
$isaw:1,
$isc:1,
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
a1:{
"^":"i;",
ep:function(a,b,c,d){return a.addEventListener(b,H.aT(c,1),!1)},
eW:function(a,b,c,d){return a.removeEventListener(b,H.aT(c,1),!1)},
$isa1:1,
"%":"Performance;EventTarget"},
lp:{
"^":"w;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLFieldSetElement"},
lv:{
"^":"w;m:length=",
"%":"HTMLFormElement"},
b_:{
"^":"hu;h6:responseText=",
hm:function(a,b,c,d,e,f){return a.open(b,c,!0,f,e)},
fY:function(a,b,c,d){return a.open(b,c,d)},
bn:function(a,b){return a.send(b)},
$isb_:1,
$isc:1,
"%":"XMLHttpRequest"},
hv:{
"^":"d:16;",
$1:function(a){return J.fe(a)}},
hx:{
"^":"d:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.b
y=z.status
if(typeof y!=="number")return y.at()
x=y>=200&&y<300
w=y>307&&y<400
y=x||y===0||y===304||w
v=this.a
if(y)v.fl(0,z)
else v.fn(a)}},
hu:{
"^":"a1;",
"%":";XMLHttpRequestEventTarget"},
lx:{
"^":"w;q:height%,t:width%",
"%":"HTMLIFrameElement"},
ly:{
"^":"w;q:height%,t:width%",
"%":"HTMLImageElement"},
lA:{
"^":"w;q:height%,I:value%,t:width%",
R:function(a,b){return a.disabled.$1(b)},
$isbg:1,
$isi:1,
$isa1:1,
"%":"HTMLInputElement"},
lG:{
"^":"eg;",
gfV:function(a){return a.keyCode},
"%":"KeyboardEvent"},
lH:{
"^":"w;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLKeygenElement"},
lI:{
"^":"w;I:value%",
"%":"HTMLLIElement"},
lK:{
"^":"w;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLLinkElement"},
hY:{
"^":"w;aL:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
lN:{
"^":"a1;n:id=",
"%":"MediaStream"},
lO:{
"^":"w;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLMenuItemElement"},
lP:{
"^":"w;I:value%",
"%":"HTMLMeterElement"},
cr:{
"^":"eg;fe:button=",
gds:function(a){var z,y,x
if(!!a.offsetX)return H.b(new P.ah(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.m(W.ew(z)).$isbg)throw H.f(new P.W("offsetX is only supported on elements"))
y=W.ew(z)
x=H.b(new P.ah(a.clientX,a.clientY),[null]).F(0,J.ff(J.fh(y)))
return H.b(new P.ah(J.db(x.a),J.db(x.b)),[null])}},
$iscr:1,
$isaw:1,
$isc:1,
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
lZ:{
"^":"i;",
$isi:1,
"%":"Navigator"},
bk:{
"^":"a1;",
j:function(a){var z=a.nodeValue
return z==null?this.eb(a):z},
"%":"Document|HTMLDocument|XMLDocument;Node"},
m_:{
"^":"w;q:height%,t:width%",
"%":"HTMLObjectElement"},
m0:{
"^":"w;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptGroupElement"},
m1:{
"^":"w;I:value%",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLOptionElement"},
m3:{
"^":"w;I:value%",
"%":"HTMLOutputElement"},
m4:{
"^":"w;I:value%",
"%":"HTMLParamElement"},
m9:{
"^":"w;I:value%",
"%":"HTMLProgressElement"},
md:{
"^":"i;q:height=,t:width=",
"%":"Screen"},
mf:{
"^":"w;m:length=,I:value%",
d5:function(a,b,c){return a.add(b,c)},
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLSelectElement"},
mh:{
"^":"aw;aL:error=",
"%":"SpeechRecognitionError"},
mi:{
"^":"w;",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLStyleElement"},
mm:{
"^":"w;I:value%",
R:function(a,b){return a.disabled.$1(b)},
"%":"HTMLTextAreaElement"},
eg:{
"^":"aw;",
"%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
mx:{
"^":"hY;q:height%,t:width%",
"%":"HTMLVideoElement"},
iI:{
"^":"a1;",
bO:function(a,b){return a.requestAnimationFrame(H.aT(b,1))},
bB:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isi:1,
$isa1:1,
"%":"DOMWindow|Window"},
mD:{
"^":"bk;I:value%",
"%":"Attr"},
mE:{
"^":"i;bX:bottom=,q:height=,S:left=,a_:right=,aV:top=,t:width=",
j:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.m(b)
if(!z.$isaq)return!1
y=a.left
x=z.gS(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaV(b)
if(y==null?x==null:y===x){y=a.width
x=z.gt(b)
if(y==null?x==null:y===x){y=a.height
z=z.gq(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gJ:function(a){var z,y,x,w
z=J.M(a.left)
y=J.M(a.top)
x=J.M(a.width)
w=J.M(a.height)
return W.er(W.aB(W.aB(W.aB(W.aB(0,z),y),x),w))},
gcm:function(a){return H.b(new P.ah(a.left,a.top),[null])},
$isaq:1,
$asaq:I.c0,
"%":"ClientRect"},
mF:{
"^":"bk;",
$isi:1,
"%":"DocumentType"},
mG:{
"^":"fH;",
gq:function(a){return a.height},
gt:function(a){return a.width},
gk:function(a){return a.x},
sk:function(a,b){a.x=b},
gl:function(a){return a.y},
sl:function(a,b){a.y=b},
"%":"DOMRect"},
mI:{
"^":"w;",
$isa1:1,
$isi:1,
"%":"HTMLFrameSetElement"},
b2:{
"^":"as;a,b,c",
af:function(a,b,c,d){var z=new W.a6(0,this.a,this.b,W.X(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.V()
return z},
c8:function(a,b,c){return this.af(a,null,b,c)}},
at:{
"^":"b2;a,b,c"},
a6:{
"^":"ij;a,b,c,d,e",
bf:function(){if(this.b==null)return
this.d3()
this.b=null
this.d=null
return},
aP:function(a,b){if(this.b==null)return;++this.a
this.d3()},
cb:function(a){return this.aP(a,null)},
cg:function(){if(this.b==null||this.a<=0)return;--this.a
this.V()},
V:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.f0(x,this.c,z,!1)}},
d3:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.f1(x,this.c,z,!1)}}},
jc:{
"^":"c;a",
$isa1:1,
$isi:1,
static:{jd:function(a){if(a===window)return a
else return new W.jc(a)}}}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kN:{
"^":"aJ;",
$isi:1,
"%":"SVGAElement"},
kP:{
"^":"iv;",
$isi:1,
"%":"SVGAltGlyphElement"},
kR:{
"^":"t;",
$isi:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
kZ:{
"^":"dA;T:r=",
"%":"SVGCircleElement"},
l7:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEBlendElement"},
l8:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEColorMatrixElement"},
l9:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEComponentTransferElement"},
la:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFECompositeElement"},
lb:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEConvolveMatrixElement"},
lc:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEDiffuseLightingElement"},
ld:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEDisplacementMapElement"},
le:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEFloodElement"},
lf:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEGaussianBlurElement"},
lg:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEImageElement"},
lh:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEMergeElement"},
li:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEMorphologyElement"},
lj:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFEOffsetElement"},
lk:{
"^":"t;k:x=,l:y=",
"%":"SVGFEPointLightElement"},
ll:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFESpecularLightingElement"},
lm:{
"^":"t;k:x=,l:y=",
"%":"SVGFESpotLightElement"},
ln:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFETileElement"},
lo:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFETurbulenceElement"},
lq:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGFilterElement"},
lu:{
"^":"aJ;q:height=,t:width=,k:x=,l:y=",
"%":"SVGForeignObjectElement"},
dA:{
"^":"aJ;",
"%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
aJ:{
"^":"t;",
$isi:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
lz:{
"^":"aJ;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGImageElement"},
lL:{
"^":"t;",
$isi:1,
"%":"SVGMarkerElement"},
lM:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGMaskElement"},
m6:{
"^":"t;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGPatternElement"},
ma:{
"^":"jx;T:r=",
"%":"SVGRadialGradientElement"},
mb:{
"^":"i;q:height=,t:width=,k:x%,l:y%",
"%":"SVGRect"},
mc:{
"^":"dA;q:height=,t:width=,k:x=,l:y=",
"%":"SVGRectElement"},
me:{
"^":"t;",
$isi:1,
"%":"SVGScriptElement"},
mj:{
"^":"t;",
R:function(a,b){return a.disabled.$1(b)},
"%":"SVGStyleElement"},
t:{
"^":"bg;",
gdt:function(a){return H.b(new W.at(a,"click",!1),[null])},
gdu:function(a){return H.b(new W.at(a,"contextmenu",!1),[null])},
gdv:function(a){return H.b(new W.at(a,"mousedown",!1),[null])},
gdw:function(a){return H.b(new W.at(a,"mouseup",!1),[null])},
$isa1:1,
$isi:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
mk:{
"^":"aJ;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGSVGElement"},
ml:{
"^":"t;",
$isi:1,
"%":"SVGSymbolElement"},
e3:{
"^":"aJ;",
"%":";SVGTextContentElement"},
mn:{
"^":"e3;",
$isi:1,
"%":"SVGTextPathElement"},
iv:{
"^":"e3;k:x=,l:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
mu:{
"^":"aJ;q:height=,t:width=,k:x=,l:y=",
$isi:1,
"%":"SVGUseElement"},
my:{
"^":"t;",
$isi:1,
"%":"SVGViewElement"},
jx:{
"^":"t;",
$isi:1,
"%":"SVGLinearGradientElement;SVGGradientElement"},
mJ:{
"^":"t;",
$isi:1,
"%":"SVGCursorElement"},
mK:{
"^":"t;",
$isi:1,
"%":"SVGFEDropShadowElement"},
mL:{
"^":"t;",
$isi:1,
"%":"SVGGlyphRefElement"},
mM:{
"^":"t;",
$isi:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
bA:{
"^":"i;",
$isc:1,
"%":"WebGLBuffer"},
cy:{
"^":"i;",
fa:function(a,b,c){return a.bindBuffer(b,c)},
fj:function(a,b){return a.clear(b)},
fk:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
ft:function(a){return a.createBuffer()},
fv:function(a){return a.createProgram()},
fw:function(a,b){return a.createShader(b)},
dQ:function(a,b,c){return a.getAttribLocation(b,c)},
dS:function(a,b,c){return a.getUniformLocation(b,c)},
ha:function(a,b){return a.useProgram(b)},
$iscy:1,
"%":"WebGLRenderingContext"},
ie:{
"^":"i;",
$isie:1,
$isc:1,
"%":"WebGLShader"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
kX:{
"^":"c;"}}],["","",,P,{
"^":"",
b3:function(a,b){if(typeof b!=="number")return H.j(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
es:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
cZ:function(a,b){if(typeof a!=="number")throw H.f(P.a7(a))
if(typeof b!=="number")throw H.f(P.a7(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.a.gdm(b)||isNaN(b))return b
return a}return a},
bt:function(a,b){if(typeof a!=="number")throw H.f(P.a7(a))
if(typeof b!=="number")throw H.f(P.a7(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.a.gdm(a))return b
return a},
jB:{
"^":"c;",
K:function(){return Math.random()},
c9:function(){return Math.random()<0.5}},
ah:{
"^":"c;k:a>,l:b>",
j:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.ah))return!1
return J.F(this.a,b.a)&&J.F(this.b,b.b)},
gJ:function(a){var z,y
z=J.M(this.a)
y=J.M(this.b)
return P.es(P.b3(P.b3(0,z),y))},
p:function(a,b){var z=J.h(b)
z=new P.ah(J.l(this.a,z.gk(b)),J.l(this.b,z.gl(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
F:function(a,b){var z=J.h(b)
z=new P.ah(J.T(this.a,z.gk(b)),J.T(this.b,z.gl(b)))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
A:function(a,b){var z=new P.ah(J.x(this.a,b),J.x(this.b,b))
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
jM:{
"^":"c;",
ga_:function(a){return J.l(this.a,this.c)},
gbX:function(a){return J.l(this.b,this.d)},
j:function(a){return"Rectangle ("+H.e(this.a)+", "+H.e(this.b)+") "+H.e(this.c)+" x "+H.e(this.d)},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
z=J.m(b)
if(!z.$isaq)return!1
y=this.a
x=J.m(y)
if(x.w(y,z.gS(b))){w=this.b
v=J.m(w)
z=v.w(w,z.gaV(b))&&J.F(x.p(y,this.c),z.ga_(b))&&J.F(v.p(w,this.d),z.gbX(b))}else z=!1
return z},
gJ:function(a){var z,y,x,w,v,u
z=this.a
y=J.m(z)
x=y.gJ(z)
w=this.b
v=J.m(w)
u=v.gJ(w)
z=J.M(y.p(z,this.c))
w=J.M(v.p(w,this.d))
return P.es(P.b3(P.b3(P.b3(P.b3(0,x),u),z),w))},
gcm:function(a){var z=new P.ah(this.a,this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
aq:{
"^":"jM;S:a>,aV:b>,t:c>,q:d>",
$asaq:null,
static:{i7:function(a,b,c,d,e){var z,y
z=J.C(c)
z=z.aZ(c,0)?J.x(z.bl(c),0):c
y=J.C(d)
return H.b(new P.aq(a,b,z,y.aZ(d,0)?J.x(y.bl(d),0):d),[e])}}}}],["","",,H,{
"^":"",
v:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(P.a7("Invalid length "+H.e(a)))
return a},
ex:function(a){var z,y,x
if(!!J.m(a).$isbH)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
i_:function(a){return new Int8Array(a)},
dO:{
"^":"i;",
gL:function(a){return C.W},
$isdO:1,
"%":"ArrayBuffer"},
bM:{
"^":"i;",
eL:function(a,b,c,d){throw H.f(P.ap(b,0,c,d,null))},
cI:function(a,b,c,d){if(b>>>0!==b||b>c)this.eL(a,b,c,d)},
$isbM:1,
"%":";ArrayBufferView;cs|dP|dR|bL|dQ|dS|an"},
lQ:{
"^":"bM;",
gL:function(a){return C.X},
"%":"DataView"},
cs:{
"^":"bM;",
gm:function(a){return a.length},
d_:function(a,b,c,d,e){var z,y,x
z=a.length
this.cI(a,b,z,"start")
this.cI(a,c,z,"end")
if(b>c)throw H.f(P.ap(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.f(new P.ar("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$iscl:1,
$isbH:1},
bL:{
"^":"dR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
a[b]=c},
ai:function(a,b,c,d,e){if(!!J.m(d).$isbL){this.d_(a,b,c,d,e)
return}this.cw(a,b,c,d,e)}},
dP:{
"^":"cs+co;",
$isr:1,
$asr:function(){return[P.au]},
$isE:1},
dR:{
"^":"dP+dy;"},
an:{
"^":"dS;",
u:function(a,b,c){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
a[b]=c},
ai:function(a,b,c,d,e){if(!!J.m(d).$isan){this.d_(a,b,c,d,e)
return}this.cw(a,b,c,d,e)},
$isr:1,
$asr:function(){return[P.u]},
$isE:1},
dQ:{
"^":"cs+co;",
$isr:1,
$asr:function(){return[P.u]},
$isE:1},
dS:{
"^":"dQ+dy;"},
lR:{
"^":"bL;",
gL:function(a){return C.Y},
$isr:1,
$asr:function(){return[P.au]},
$isE:1,
"%":"Float32Array"},
lS:{
"^":"bL;",
gL:function(a){return C.Z},
$isr:1,
$asr:function(){return[P.au]},
$isE:1,
"%":"Float64Array"},
lT:{
"^":"an;",
gL:function(a){return C.a0},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":"Int16Array"},
lU:{
"^":"an;",
gL:function(a){return C.a1},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":"Int32Array"},
lV:{
"^":"an;",
gL:function(a){return C.a2},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":"Int8Array"},
lW:{
"^":"an;",
gL:function(a){return C.a6},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":"Uint16Array"},
i0:{
"^":"an;",
gL:function(a){return C.a7},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":"Uint32Array"},
lX:{
"^":"an;",
gL:function(a){return C.a8},
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
lY:{
"^":"an;",
gL:function(a){return C.a9},
gm:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.J(a,b))
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isE:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
kx:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,S,{
"^":"",
bf:function(a){var z,y
z=$.$get$cg().h(0,a)
if(z==null){z=new S.dg(0,0)
y=$.dh
z.a=y
$.dh=y<<1>>>0
y=$.di
$.di=y+1
z.b=y
$.$get$cg().u(0,a,z)}return z},
az:function(a,b){var z=J.U(S.V(a))
return null==z?b.$0():z},
V:function(a){var z,y
z=$.$get$bN().h(0,a)
if(null==z){y=new Array(16)
y.fixed$length=Array
z=H.b(new S.I(y,0),[null])
$.$get$bN().u(0,a,z)}return z},
ca:{
"^":"c;a,b,c",
aa:function(a,b){var z={}
z.a=a
C.f.C(b,new S.fo(z))
return z.a},
static:{N:function(a){var z=new S.ca(0,0,0)
z.a=z.aa(0,a)
return z}}},
fo:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.a=(z.a|S.bf(a).gbW())>>>0}},
bB:{
"^":"c;",
bN:function(){}},
Z:{
"^":"fB;",
bN:function(){this.fX()}},
fB:{
"^":"bB+dV;"},
fx:{
"^":"ay;b,c,a",
D:function(){},
eV:function(a){this.eC(a,new S.fy(a))
a.sd1(0)},
cD:function(a,b,c){var z,y,x,w
z=J.D(b)
y=this.b
y.cO(z)
x=y.a
if(z>>>0!==z||z>=x.length)return H.a(x,z)
w=x[z]
if(w==null){x=new Array(16)
x.fixed$length=Array
w=H.b(new S.I(x,0),[S.bB])
y.u(0,z,w)}J.d3(w,a.a,c)
y=b.gbW()
a.c=(a.c|y)>>>0},
eC:function(a,b){var z,y,x,w
z=a.gd1()
for(y=this.b,x=0;z>0;){if((z&1)===1){w=y.a
if(x>=w.length)return H.a(w,x)
b.$2(w[x],x)}++x
z=z>>>1}},
aA:function(a){return this.c.B(0,a)},
fi:function(){this.c.C(0,new S.fz(this))
var z=this.c
z.c.aG(0)
z.d=!0}},
fy:{
"^":"d:3;a",
$2:function(a,b){var z,y,x
z=this.a
y=J.h(z)
x=J.a_(a)
x.h(a,y.gn(z)).bN()
x.u(a,y.gn(z),null)}},
fz:{
"^":"d:0;a",
$1:function(a){return this.a.eV(a)}},
dg:{
"^":"c;a,b",
gbW:function(){return this.a},
gn:function(a){return this.b}},
a4:{
"^":"c;n:a>,f2:b?,d1:c@,bR:d<,bT:e?,f,r",
eY:function(a){this.d=(this.d&J.eZ(a))>>>0},
j:function(a){return"Entity["+H.e(this.a)+"]"},
f5:function(a){this.r.cD(this,S.bf(J.d8(a)),a)},
cf:function(a){var z,y,x,w,v
z=this.r
y=S.bf(a)
if((this.c&y.gbW())>>>0!==0){x=y.b
z=z.b
w=z.a
if(x>=w.length)return H.a(w,x)
v=this.a
J.k(w[x],v).bN()
z=z.a
if(x>=z.length)return H.a(z,x)
J.d3(z[x],v,null)
y=y.a
this.c=(this.c&~y)>>>0}},
c2:function(){this.e.e.B(0,this)
return},
c_:function(){return this.e.d.B(0,this)}},
fP:{
"^":"ay;b,c,d,e,f,r,x,y,a",
D:function(){},
bU:function(a){++this.e;++this.f
this.b.u(0,J.D(a),a)},
c3:function(a){this.d.u(0,J.D(a),!1)},
R:function(a,b){this.d.u(0,J.D(b),!0)},
aA:function(a){var z=J.h(a)
this.b.u(0,z.gn(a),null)
this.d.u(0,z.gn(a),!1)
this.c.B(0,a);--this.e;++this.x}},
jz:{
"^":"c;a,b",
fh:function(){var z=this.a
if(J.aV(z.b,0))return z.ah(0)
return this.b++}},
aI:{
"^":"c;bT:b?,eQ:x?",
gfZ:function(){return this.x},
d7:function(){},
aC:function(){if(this.ay()){this.d7()
this.aQ(this.c)
this.c4()}},
c4:function(){},
D:["U",function(){}],
bv:function(a){var z,y,x,w
if(this.r)return
z=J.c6(this.a,a.gbR())===this.a
y=this.d
x=a.c
w=(y&x)>>>0===y
y=this.f
if(typeof y!=="number")return y.a1()
if(y>0&&w)w=(y&x)>0
y=this.e
if(y>0&&w)w=(y&x)>>>0===0
if(w&&!z){this.c.B(0,a)
y=this.a
x=a.d
if(typeof y!=="number")return H.j(y)
a.d=(x|y)>>>0}else if(!w&&z)this.bM(a)},
bM:function(a){this.c.P(0,a)
a.eY(this.a)},
bU:function(a){return this.bv(a)},
bZ:function(a){return this.bv(a)},
c3:function(a){return this.bv(a)},
aA:function(a){if(J.c6(this.a,a.gbR())===this.a)this.bM(a)},
R:function(a,b){if(J.c6(this.a,b.gbR())===this.a)this.bM(b)},
M:function(a){var z,y,x
this.r=this.d===0&&this.f===0
z=new H.ak(H.aC(this),null)
y=$.cM
if(null==y){y=H.b(new H.P(0,null,null,null,null,null,0),[P.bl,P.u])
$.cM=y}x=y.h(0,z)
if(x==null){y=$.ev
x=C.c.aw(1,y)
$.ev=y+1
$.cM.u(0,z,x)}this.a=x}},
ay:{
"^":"c;bT:a?",
D:["ed",function(){}],
bU:function(a){},
bZ:function(a){},
aA:function(a){},
R:function(a,b){},
c3:function(a){}},
dB:{
"^":"ay;b,c,a",
d5:function(a,b,c){var z,y,x,w
z=this.b
y=z.h(0,c)
if(y==null){x=new Array(16)
x.fixed$length=Array
y=H.b(new S.I(x,0),[S.a4])
z.u(0,c,y)}J.c7(y,b)
z=this.c
w=z.h(0,b)
if(w==null){x=new Array(16)
x.fixed$length=Array
w=H.b(new S.I(x,0),[P.H])
z.u(0,b,w)}J.c7(w,c)},
h4:function(a){var z,y
z=this.c.h(0,a)
if(z!=null){y=J.aa(z)
y.C(z,new S.hs(this,a))
y.N(z)}},
cq:function(a){var z,y,x
z=this.b
y=z.h(0,a)
if(y==null){x=new Array(16)
x.fixed$length=Array
y=H.b(new S.I(x,0),[S.a4])
z.u(0,a,y)}return y},
aA:function(a){return this.h4(a)}},
hs:{
"^":"d:0;a,b",
$1:function(a){var z=this.a.b.h(0,a)
if(z!=null)J.fk(z,this.b)}},
cB:{
"^":"ay;b,c,a",
a5:function(a){return this.b.h(0,a)},
aA:function(a){var z=this.c.P(0,a)
if(z!=null)this.b.P(0,z)}},
o:{
"^":"fA;a,b"},
fA:{
"^":"c;",
h:function(a,b){return J.k(this.b,J.D(b))},
v:function(a,b,c){var z,y,x,w
z=S.bf(a)
this.a=z
y=b.b
x=J.D(z)
y=y.b
y.cO(x)
z=y.a
if(x>>>0!==x||x>=z.length)return H.a(z,x)
w=z[x]
if(w==null){z=new Array(16)
z.fixed$length=Array
w=H.b(new S.I(z,0),[S.bB])
y.u(0,x,w)}this.b=w}},
a8:{
"^":"aI;",
aQ:function(a){return a.C(0,new S.fQ(this))},
ay:function(){return!0}},
fQ:{
"^":"d:0;a",
$1:function(a){return this.a.Z(a)}},
ei:{
"^":"aI;",
aQ:function(a){return this.dB()},
ay:function(){return!0}},
I:{
"^":"dU;a,b",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
gaj:function(a){return this.b},
ah:["e8",function(a){var z,y,x
if(J.aV(this.b,0)){z=this.a
y=J.T(this.b,1)
this.b=y
if(y>>>0!==y||y>=z.length)return H.a(z,y)
x=z[y]
y=this.a
z=this.gaj(this)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=null
return x}return}],
P:function(a,b){var z,y,x,w
z=J.m(b)
y=0
while(!0){x=this.gaj(this)
if(typeof x!=="number")return H.j(x)
if(!(y<x))break
x=this.a
if(y>=x.length)return H.a(x,y)
if(z.w(b,x[y])){z=this.a
x=J.T(this.b,1)
this.b=x
w=z.length
if(x>>>0!==x||x>=w)return H.a(z,x)
x=z[x]
if(y>=w)return H.a(z,y)
z[y]=x
x=this.a
z=this.gaj(this)
if(z>>>0!==z||z>=x.length)return H.a(x,z)
x[z]=null
return!0}++y}return!1},
B:["e7",function(a,b){var z,y
if(J.F(this.b,this.a.length))this.bE(C.c.an(this.a.length*3,2)+1)
z=this.a
y=this.b
this.b=J.l(y,1)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b}],
u:function(a,b,c){var z=J.C(b)
if(z.at(b,this.a.length))this.bE(z.A(b,2))
if(J.eY(this.b,b))this.b=z.p(b,1)
z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bE:function(a){var z,y
z=this.a
if(typeof a!=="number")return H.j(a)
y=new Array(a)
y.fixed$length=Array
y=H.b(y,[H.K(this,"I",0)])
this.a=y
C.f.e2(y,0,z.length,z)},
cO:function(a){var z=J.C(a)
if(z.at(a,this.a.length))this.bE(z.A(a,2))},
N:function(a){var z,y,x,w
z=this.b
if(typeof z!=="number")return H.j(z)
y=this.a
x=y.length
w=0
for(;w<z;++w){if(w>=x)return H.a(y,w)
y[w]=null}this.b=0},
gO:function(a){var z=C.f.cu(this.a,0,this.gaj(this))
return H.b(new J.c9(z,z.length,0,null),[H.A(z,0)])},
gm:function(a){return this.gaj(this)},
$isO:1},
dU:{
"^":"c+cj;"},
B:{
"^":"I;c,d,a,b",
B:function(a,b){var z,y
z=J.h(b)
y=this.c
if(J.eX(z.gn(b),y.c))y.aG(J.l(J.aE(J.x(z.gn(b),3),2),1))
if(y.h(0,z.gn(b)))return
y.u(0,z.gn(b),!0)
this.e7(this,b)},
P:function(a,b){var z,y,x
z=this.c
y=J.h(b)
x=z.h(0,y.gn(b))
z.u(0,y.gn(b),!1)
this.d=!0
return x},
ah:function(a){var z=this.e8(this)
this.c.u(0,J.D(z),!1)
this.d=!0
return z},
gaj:function(a){if(this.d)this.bK()
return this.b},
N:function(a){this.c.aG(0)
this.d=!0},
gO:function(a){var z
if(this.d)this.bK()
z=this.a
if(this.d)this.bK()
z=C.f.cu(z,0,this.b)
return H.b(new J.c9(z,z.length,0,null),[H.A(z,0)])},
bK:function(){var z,y,x
z={}
y=this.c.de(!0)
this.b=y
if(typeof y!=="number")return H.j(y)
y=new Array(y)
y.fixed$length=Array
x=H.b(y,[S.a4])
if(J.aV(this.b,0)){z.a=0
y=this.a
y=H.b(new H.it(y,new S.fM(z,this)),[H.A(y,0)])
H.b(new H.cF(y,new S.fN(this)),[H.K(y,"O",0)]).C(0,new S.fO(z,x))
this.a=x
this.d=!1}},
$asI:function(){return[S.a4]},
$asdU:function(){return[S.a4]}},
fM:{
"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a.a
y=this.b.b
if(typeof y!=="number")return H.j(y)
return z<y}},
fN:{
"^":"d:0;a",
$1:function(a){var z,y
z=this.a.c
y=J.h(a)
return J.aV(z.c,y.gn(a))&&z.h(0,y.gn(a))}},
fO:{
"^":"d:0;a,b",
$1:function(a){var z,y
z=this.b
y=this.a.a++
if(y>=z.length)return H.a(z,y)
z[y]=a
return a}},
dV:{
"^":"c;",
fX:function(){J.c7($.$get$bN().h(0,new H.ak(H.aC(this),null)),this)}},
iJ:{
"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
D:function(){this.Q.C(0,new S.iQ(this))
C.f.C(this.y,new S.iR(this))},
ax:function(a){this.z.u(0,new H.ak(H.aC(a),null),a)
this.Q.B(0,a)
a.a=this},
az:function(a){var z,y,x
z=this.a
y=z.c.ah(0)
if(null==y){x=z.a
y=new S.a4(z.y.fh(),0,0,0,x,null,null)
y.f=x.a
y.r=x.b}++z.r
z=$.dv
$.dv=z+1
y.sf2(z)
C.f.C(a,new S.iP(y))
return y},
a5:function(a){var z=this.a.b.a
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return z[a]},
f8:function(a,b,c){a.sbT(this)
a.seQ(!1)
a.y=b
this.x.u(0,new H.ak(H.aC(a),null),a)
this.y.push(a)
this.cy.dC(b,new S.iN())
this.cx.dC(b,new S.iO())
return a},
f7:function(a,b){return this.f8(a,b,!1)},
aI:function(a,b){a.C(0,new S.iM(this,b))
a.c.aG(0)
a.d=!0},
h0:function(a){var z=this.cx
z.u(0,a,J.l(z.h(0,a),1))
z=this.cy
z.u(0,a,J.l(z.h(0,a),this.ch))
this.dA()
z=this.y
H.b(new H.cF(z,new S.iX(a)),[H.A(z,0)]).C(0,new S.iY())},
aC:function(){return this.h0(0)},
dA:function(){this.aI(this.c,new S.iS())
this.aI(this.d,new S.iT())
this.aI(this.r,new S.iU())
this.aI(this.f,new S.iV())
this.aI(this.e,new S.iW())
this.b.fi()},
h:function(a,b){return this.db.h(0,b)},
u:function(a,b,c){this.db.u(0,b,c)}},
iQ:{
"^":"d:0;a",
$1:function(a){return a.D()}},
iR:{
"^":"d:0;a",
$1:function(a){return a.D()}},
iP:{
"^":"d:0;a",
$1:function(a){var z=this.a
z.r.cD(z,S.bf(J.d8(a)),a)
return}},
iN:{
"^":"d:1;",
$0:function(){return 0}},
iO:{
"^":"d:1;",
$0:function(){return 0}},
iM:{
"^":"d:0;a,b",
$1:function(a){var z,y
z=this.a
y=this.b
z.Q.C(0,new S.iK(y,a))
C.f.C(z.y,new S.iL(y,a))}},
iK:{
"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
iL:{
"^":"d:0;a,b",
$1:function(a){return this.a.$2(a,this.b)}},
iX:{
"^":"d:0;a",
$1:function(a){return a.gfZ()!==!0&&J.F(a.y,this.a)}},
iY:{
"^":"d:0;",
$1:function(a){a.aC()}},
iS:{
"^":"d:3;",
$2:function(a,b){return a.bU(b)}},
iT:{
"^":"d:3;",
$2:function(a,b){return a.bZ(b)}},
iU:{
"^":"d:3;",
$2:function(a,b){return J.f8(a,b)}},
iV:{
"^":"d:3;",
$2:function(a,b){return a.c3(b)}},
iW:{
"^":"d:3;",
$2:function(a,b){return a.aA(b)}}}],["","",,L,{
"^":"",
k0:function(a,b,c){var z=new Array(2)
z[0]=W.dD("packages/"+a+"/assets/shader/"+b+".vert",null,null)
z[1]=W.dD("packages/"+a+"/assets/shader/"+c+".frag",null,null)
return P.ch(z,null,!1).a4(new L.k1())},
hn:{
"^":"c;a,b"},
k1:{
"^":"d:0;",
$1:function(a){var z=J.a_(a)
return new L.ig(z.h(a,0),z.h(a,1))}},
ig:{
"^":"c;hb:a<,fF:b<"},
hp:{
"^":"a8;",
D:["ea",function(){var z=H.b(new W.b2(window,"keydown",!1),[null])
H.b(new W.a6(0,z.a,z.b,W.X(new L.hq(this)),!1),[H.A(z,0)]).V()
z=H.b(new W.b2(window,"keyup",!1),[null])
H.b(new W.a6(0,z.a,z.b,W.X(new L.hr(this)),!1),[H.A(z,0)]).V()}],
di:function(a,b){this.Q.u(0,J.fb(a),b)
if(!b&&this.ch.h(0,a.keyCode)===!0)this.ch.u(0,a.keyCode,!1)
if(this.z.dd(0,a.keyCode))a.preventDefault()},
gS:function(a){return this.bj(65)||this.bj(37)},
ga_:function(a){return this.bj(68)||this.bj(39)},
bj:function(a){return this.Q.h(0,a)===!0&&this.ch.h(0,a)!==!0}},
hq:{
"^":"d:0;a",
$1:function(a){return this.a.di(a,!0)}},
hr:{
"^":"d:0;a",
$1:function(a){return this.a.di(a,!1)}},
iF:{
"^":"ei;z,a,b,c,d,e,f,r,x,y",
D:function(){J.f5(this.z,0,0,0,1)},
dB:function(){J.f4(this.z,16640)}},
cE:{
"^":"c;W:b$@,b1:c$*,bi:d$@,c6:e$@,bY:f$<,b2:r$@",
fP:function(){this.ex(this.cL(35633,this.gb1(this).ghb()),this.cL(35632,this.gb1(this).gfF()))},
ex:function(a,b){var z=this.z
this.sW(J.f6(z))
z.attachShader(this.gW(),a)
z.attachShader(this.gW(),b)
z.linkProgram(this.gW())
if(z.getProgramParameter(this.gW(),35714)!==!0){P.bu(H.e(new H.ak(H.aC(this),null))+" - Error linking program: "+H.e(z.getProgramInfoLog(this.gW())))
this.sb2(!1)}},
cL:function(a,b){var z,y
z=this.z
y=J.f7(z,a)
z.shaderSource(y,b)
z.compileShader(y)
if(z.getShaderParameter(y,35713)!==!0){P.bu(H.e(new H.ak(H.aC(this),null))+" - Error compiling shader: "+H.e(z.getShaderInfoLog(y)))
this.sb2(!1)}return y},
fc:function(a,b,c,d,e){var z,y,x
z=this.gbY().h(0,b)
if(null==z){z=J.d5(this.z)
this.gbY().u(0,b,z)}y=this.z
x=J.fg(y,this.gW(),b)
y.bindBuffer(34962,z)
y.bufferData(34962,c,e)
y.vertexAttribPointer(x,d,5126,!1,0,0)
y.enableVertexAttribArray(x)},
d8:function(a,b,c,d){return this.fc(a,b,c,d,35048)},
fd:function(a,b,c){var z,y,x,w,v,u,t,s
if(null==this.gbi()){z=this.z
this.sbi(J.d5(z))
this.sc6(z.createBuffer())}z=this.z
J.f3(z,34962,this.gbi())
z.bufferData(34962,b,35048)
for(y=0,x=0;x<2;++x)y+=a[x].b
for(w=4*y,v=0,x=0;x<2;++x){u=a[x]
t=z.getAttribLocation(this.gW(),u.a)
s=u.b
z.vertexAttribPointer(t,s,5126,!1,w,4*v)
z.enableVertexAttribArray(t)
v+=s}z.bindBuffer(34963,this.gc6())
z.bufferData(34963,c,35048)}},
dc:{
"^":"c;a,b"},
ej:{
"^":"fR;",
D:["cz",function(){this.fP()}],
aQ:function(a){var z,y,x
z={}
y=a.gaj(a)
x=J.C(y)
if(x.a1(y,0)){J.fl(this.z,this.gW())
if(x.a1(y,this.Q)){this.dK(y)
this.Q=y}z.a=0
a.C(0,new L.iG(z,this))
this.dE(y)}},
ay:function(){return this.gb2()}},
fR:{
"^":"aI+cE;W:b$@,b1:c$*,bi:d$@,c6:e$@,bY:f$<,b2:r$@",
$iscE:1},
iG:{
"^":"d:0;a,b",
$1:function(a){this.b.cd(this.a.a++,a)}},
h7:{
"^":"c;",
eJ:function(){return this.eq().a4(new L.he(this)).a4(new L.hf(this)).a4(new L.hg(this))},
eq:function(){var z=H.b([],[P.ae])
return P.ch(z,null,!1).a4(new L.hb(this))},
eK:function(){this.fu()
return this.fQ().a4(new L.hd(this))},
e5:function(a){this.eJ().a4(new L.hl(this))},
hf:[function(a){var z
this.ch=J.aD(a,1000)
z=this.y
z.ch=0.016666666666666666
z.aC()
z=window
C.p.bB(z)
C.p.bO(z,W.X(new L.hc(this)))},"$1","geB",2,0,17],
dJ:function(a){var z,y
z=P.cZ(0.05,J.T(a,this.ch))
y=this.y
y.ch=z
this.ch=a
y.aC()
y=window
C.p.bB(y)
C.p.bO(y,W.X(new L.hm(this)))},
hj:[function(a){var z,y
z=!this.cy
this.cy=z
y=this.a
if(z){z=J.h(y)
z.st(y,window.screen.width)
z.sq(y,window.screen.height)}else{z=J.h(y)
z.st(y,this.f)
z.sq(y,this.r)}z=J.h(y)
this.c5(z.gt(y),z.gq(y))},"$1","geH",2,0,18],
fQ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=[]
y=S.N([C.b,C.j])
x=D.y(16,!1)
w=new Array(16)
w.fixed$length=Array
w=new F.hZ(null,null,0,null,new S.B(x,!1,w,0),y.a,y.b,y.c,null,null,null)
w.M(y)
y=S.N([C.e,C.d])
y.b=y.aa(y.b,[C.o])
x=D.y(16,!1)
v=new Array(16)
v.fixed$length=Array
v=new F.ht(null,null,null,null,0,null,new S.B(x,!1,v,0),y.a,y.b,y.c,null,null,null)
v.M(y)
y=this.b
x=D.y(16,!1)
u=new Array(16)
u.fixed$length=Array
u=new L.iF(y,0,null,new S.B(x,!1,u,0),0,0,0,null,null,null)
u.M(new S.ca(0,0,0))
x=S.N([C.D,C.e,C.m])
t=D.y(16,!1)
s=new Array(16)
s.fixed$length=Array
s=new F.ix(null,null,0,null,new S.B(t,!1,s,0),x.a,x.b,x.c,null,null,null)
s.M(x)
x=S.N([C.t])
x.b=x.aa(x.b,[C.u])
x.a=x.aa(x.a,[C.b,C.d,C.e,C.k])
t=D.y(16,!1)
r=new Array(16)
r.fixed$length=Array
r=new F.h1(null,null,null,null,null,null,null,null,32,6,y,0,null,null,null,null,null,P.b1(P.H,P.bA),!0,0,null,new S.B(t,!1,r,0),x.a,x.b,x.c,null,null,null)
r.M(x)
r.br(y,x)
x=S.N([C.b,C.o,C.e])
t=D.y(16,!1)
q=new Array(16)
q.fixed$length=Array
q=new F.i3(null,null,null,null,null,null,y,0,null,null,null,null,null,P.b1(P.H,P.bA),!0,0,null,new S.B(t,!1,q,0),x.a,x.b,x.c,null,null,null)
q.M(x)
x=S.N([C.u])
x.a=x.aa(x.a,[C.b,C.d,C.e,C.k])
t=D.y(16,!1)
p=new Array(16)
p.fixed$length=Array
p=new F.fm(null,null,null,null,null,null,null,null,32,6,y,0,null,null,null,null,null,P.b1(P.H,P.bA),!0,0,null,new S.B(t,!1,p,0),x.a,x.b,x.c,null,null,null)
p.M(x)
p.br(y,x)
x=S.N([C.v])
x.a=x.aa(x.a,[C.b,C.d,C.e,C.k])
t=D.y(16,!1)
o=new Array(16)
o.fixed$length=Array
o=new F.i5(null,null,null,null,null,null,null,null,32,6,y,0,null,null,null,null,null,P.b1(P.H,P.bA),!0,0,null,new S.B(t,!1,o,0),x.a,x.b,x.c,null,null,null)
o.M(x)
o.br(y,x)
x=S.N([C.n,C.v])
y=P.hT([38,40,37,39,32],null)
t=D.y(16,!1)
n=new Array(16)
n.fixed$length=Array
n=new F.hz(this.a,null,null,null,y,P.b1(P.u,P.bq),P.b1(P.u,P.bq),0,null,new S.B(t,!1,n,0),x.a,x.b,x.c,null,null,null)
n.M(x)
x=S.N([C.j,C.n,C.k])
t=D.y(16,!1)
y=new Array(16)
y.fixed$length=Array
y=new F.iw(null,null,null,20,0,null,new S.B(t,!1,y,0),x.a,x.b,x.c,null,null,null)
y.M(x)
x=S.N([C.i,C.j])
t=D.y(16,!1)
m=new Array(16)
m.fixed$length=Array
m=new F.fL(null,null,0,null,new S.B(t,!1,m,0),x.a,x.b,x.c,null,null,null)
m.M(x)
x=S.N([C.t,C.d,C.r])
x.b=x.aa(x.b,[C.i])
t=D.y(16,!1)
l=new Array(16)
l.fixed$length=Array
l=new F.h0(null,null,null,null,null,0,0,null,new S.B(t,!1,l,0),x.a,x.b,x.c,null,null,null)
l.M(x)
x=S.N([C.t,C.b,C.d])
x.b=x.aa(x.b,[C.i])
t=D.y(16,!1)
k=new Array(16)
k.fixed$length=Array
k=new F.fY(null,null,null,0,null,new S.B(t,!1,k,0),x.a,x.b,x.c,null,null,null)
k.M(x)
x=S.N([C.i,C.b,C.d])
t=D.y(16,!1)
j=new Array(16)
j.fixed$length=Array
j=new F.ii(null,null,null,!1,0,null,new S.B(t,!1,j,0),x.a,x.b,x.c,null,null,null)
j.M(x)
x=S.N([C.i,C.d,C.e,C.b])
t=D.y(16,!1)
i=new Array(16)
i.fixed$length=Array
i=new F.fG(null,null,null,null,0,null,new S.B(t,!1,i,0),x.a,x.b,x.c,null,null,null)
i.M(x)
x=S.N([C.m])
t=D.y(16,!1)
h=new Array(16)
h.fixed$length=Array
h=new F.fU(null,0,null,new S.B(t,!1,h,0),x.a,x.b,x.c,null,null,null)
h.M(x)
x=S.N([C.b,C.k,C.n,C.j,C.d,C.e])
t=D.y(16,!1)
g=new Array(16)
g.fixed$length=Array
g=new F.iy(null,null,null,null,null,null,0,null,new S.B(t,!1,g,0),x.a,x.b,x.c,null,null,null)
g.M(x)
x=S.N([C.b])
x.b=x.aa(x.b,[C.o,C.m])
t=D.y(16,!1)
f=new Array(16)
f.fixed$length=Array
f=new F.fV(null,null,null,0,null,new S.B(t,!1,f,0),x.a,x.b,x.c,null,null,null)
f.M(x)
x=D.y(16,!1)
t=new Array(16)
t.fixed$length=Array
t=new F.fF(null,null,null,null,null,0,null,new S.B(x,!1,t,0),0,0,0,null,null,null)
t.M(new S.ca(0,0,0))
P.af([0,[w,v,u,s,r,q,p,o,n,y,m,l,k,j,i,h,g,f,t],1,[]]).C(0,new L.hk(this,z))
return P.ch(z,null,!1)},
ei:function(a,b,c,d,e,f,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.a
y=J.h(z)
y.st(z,c)
y.sq(z,d)
y=H.bs(this.b,"$iscy")
y.enable(3042)
y.blendFunc(770,771)
z=H.b(new W.at(z,"webkitfullscreenchange",!1),[null])
H.b(new W.a6(0,z.a,z.b,W.X(this.geH()),!1),[H.A(z,0)]).V()
z=new Array(16)
z.fixed$length=Array
z=H.b(new S.I(z,0),[S.a4])
y=new Array(16)
y.fixed$length=Array
y=H.b(new S.I(y,0),[S.a4])
x=new Array(16)
x.fixed$length=Array
x=H.b(new S.I(x,0),[P.bq])
w=new Array(16)
w.fixed$length=Array
w=new S.fP(z,y,x,0,0,0,0,new S.jz(H.b(new S.I(w,0),[P.u]),0),null)
x=new Array(16)
x.fixed$length=Array
x=H.b(new S.I(x,0),[[S.I,S.bB]])
y=D.y(16,!1)
z=new Array(16)
z.fixed$length=Array
z=new S.fx(x,new S.B(y,!1,z,0),null)
y=D.y(16,!1)
x=new Array(16)
x.fixed$length=Array
v=D.y(16,!1)
u=new Array(16)
u.fixed$length=Array
t=D.y(16,!1)
s=new Array(16)
s.fixed$length=Array
r=D.y(16,!1)
q=new Array(16)
q.fixed$length=Array
p=D.y(16,!1)
o=new Array(16)
o.fixed$length=Array
n=H.b(new H.P(0,null,null,null,null,null,0),[P.bl,S.aI])
m=H.b([],[S.aI])
l=H.b(new H.P(0,null,null,null,null,null,0),[P.bl,S.ay])
k=new Array(16)
k.fixed$length=Array
k=H.b(new S.I(k,0),[S.ay])
j=P.af([0,0])
i=P.af([0,0])
h=H.b(new H.P(0,null,null,null,null,null,0),[P.H,null])
h=new S.iJ(w,z,new S.B(y,!1,x,0),new S.B(v,!1,u,0),new S.B(t,!1,s,0),new S.B(r,!1,q,0),new S.B(p,!1,o,0),n,m,l,k,0,j,i,h)
h.ax(w)
h.ax(z)
this.y=h
g=document.querySelector("button#fullscreen")
if(null!=g){z=J.d7(g)
H.b(new W.a6(0,z.a,z.b,W.X(new L.hh()),!1),[H.A(z,0)]).V()}}},
hh:{
"^":"d:0;",
$1:function(a){return document.querySelector("canvas").requestFullscreen()}},
he:{
"^":"d:0;a",
$1:function(a){return}},
hf:{
"^":"d:0;a",
$1:function(a){return this.a.eK()}},
hg:{
"^":"d:0;a",
$1:function(a){return}},
hb:{
"^":"d:0;a",
$1:function(a){var z,y
z=this.a
y=z.z
if(null!=y)J.bw(y,new L.ha(z))}},
ha:{
"^":"d:3;a",
$2:function(a,b){var z=this.a
J.bw(b,new L.h9(J.fc(z.Q.ge4().h(0,H.e(a)+".png")).F(0,z.Q.ge4().h(0,H.e(a)+".png").ghn())))}},
h9:{
"^":"d:0;a",
$1:function(a){var z=a.gho()
z.toString
a.a=H.b(new H.bK(z,new L.h8(this.a)),[null,null]).aE(0)}},
h8:{
"^":"d:0;a",
$1:function(a){return J.l(a,this.a)}},
hd:{
"^":"d:0;a",
$1:function(a){this.a.y.D()}},
hl:{
"^":"d:0;a",
$1:function(a){var z,y
z=this.a
z.cx=window.performance.now()
y=window
z=z.geB()
C.p.bB(y)
C.p.bO(y,W.X(z))}},
hc:{
"^":"d:0;a",
$1:function(a){return this.a.dJ(J.aD(a,1000))}},
hm:{
"^":"d:0;a",
$1:function(a){return this.a.dJ(J.aD(a,1000))}},
hk:{
"^":"d:3;a,b",
$2:function(a,b){J.bw(b,new L.hj(this.a,this.b,a))}},
hj:{
"^":"d:0;a,b,c",
$1:function(a){var z=this.a
z.y.f7(a,this.c)
if(!!J.m(a).$iscE)this.b.push(L.k0(z.c.a,a.gdL(),a.gdh()).a4(new L.hi(a)))}},
hi:{
"^":"d:0;a",
$1:function(a){this.a.sb1(0,a)}}}],["","",,F,{
"^":"",
eK:function(a,b,c){var z,y,x,w,v
if(b===0){z=c
y=z
x=y}else{w=c<0.5?c*(1+b):c+b-c*b
v=2*c-w
x=F.cO(v,w,a+0.3333333333333333)
y=F.cO(v,w,a)
z=F.cO(v,w,a-0.3333333333333333)}return[x,y,z]},
cO:function(a,b,c){if(c<0)++c
if(c>1)--c
if(c<0.16666666666666666)return a+(b-a)*6*c
if(c<0.5)return b
if(c<0.6666666666666666)return a+(b-a)*(0.6666666666666666-c)*6
return a},
d_:function(a,b,c){var z,y,x,w,v,u,t
z=P.bt(P.bt(a,b),c)
y=P.cZ(P.cZ(a,b),c)
x=z+y
w=x/2
if(z===y){v=0
u=0}else{t=z-y
u=w>0.5?t/(2-z-y):t/x
if(z===a){if(typeof b!=="number")return b.F()
if(typeof c!=="number")return H.j(c)
x=b<c?6:0
v=(b-c)/t+x}else if(z===b){if(typeof c!=="number")return c.F()
if(typeof a!=="number")return H.j(a)
v=(c-a)/t+2}else if(z===c){if(typeof a!=="number")return a.F()
if(typeof b!=="number")return H.j(b)
v=(a-b)/t+4}else v=null
if(typeof v!=="number")return v.a0()
v/=6}return[v,u,w]}}],["","",,P,{
"^":"",
kb:function(a,b){var z={}
a.C(0,new P.kc(z))
return z},
ds:function(){var z=$.dq
if(z==null){z=J.c8(window.navigator.userAgent,"Opera",0)
$.dq=z}return z},
dr:function(){var z,y
z=$.dm
if(z!=null)return z
y=$.dn
if(y==null){y=J.c8(window.navigator.userAgent,"Firefox",0)
$.dn=y}if(y===!0)z="-moz-"
else{y=$.dp
if(y==null){y=P.ds()!==!0&&J.c8(window.navigator.userAgent,"Trident/",0)
$.dp=y}if(y===!0)z="-ms-"
else z=P.ds()===!0?"-o-":"-webkit-"}$.dm=z
return z},
kc:{
"^":"d:19;a",
$2:function(a,b){this.a[a]=b}}}],["","",,A,{
"^":"",
mQ:[function(){var z=J.d7(document.querySelector("#startGame"))
H.b(new W.a6(0,z.a,z.b,W.X(new A.ku()),!1),[H.A(z,0)]).V()},"$0","eN",0,0,2],
ku:{
"^":"d:0;",
$1:function(a){var z=document.querySelector("#story").style;(z&&C.x).sdz(z,"0.0")
z=document.querySelector("#game").style;(z&&C.x).sdz(z,"1.0")
P.e4(P.fI(0,0,0,0,0,1),new A.kt())
F.h6().e5(0)}},
kt:{
"^":"d:1;",
$0:function(){var z=document.querySelector("#story").style
z.display="none"
return"none"}}},1],["","",,F,{
"^":"",
z:{
"^":"Z;k:a*,l:b*",
static:{cv:function(a,b){var z,y
z=J.U(S.V(C.b))
if(null==z)z=F.c5().$0()
y=J.h(z)
y.sk(z,a)
y.sl(z,b)
return z},m8:[function(){return new F.z(null,null)},"$0","c5",0,0,21]}},
ag:{
"^":"Z;H:a@",
static:{cu:function(a){var z=S.az(C.k,F.kD())
z.sH(a)
return z},m2:[function(){return new F.ag(null)},"$0","kD",0,0,34]}},
G:{
"^":"Z;ag:a@,as:b<",
static:{cz:function(a){var z=S.az(C.d,F.kF())
z.sag(a)
z.b=a
return z},mg:[function(){return new F.G(null,null)},"$0","kF",0,0,23]}},
Q:{
"^":"Z;T:a*,X:b@,Y:c@,ad:d*,dq:e@,h1:f?",
e1:function(a){var z,y
z=F.d_(this.a,this.b,this.c)
z[2]=a
y=F.eK(z[0],z[1],a)
this.a=y[0]
this.b=y[1]
this.c=y[2]},
static:{be:function(a,b,c,d){var z,y
z=J.U(S.V(C.e))
if(null==z)z=F.eR().$0()
z.sdq(c)
z.d=d
y=F.eK(a,b,c)
z.a=y[0]
z.b=y[1]
z.c=y[2]
z.f=d
return z},l_:[function(){return new F.Q(null,null,null,null,null,null)},"$0","eR",0,0,24]}},
ai:{
"^":"Z;S:a*,a_:b*",
static:{mp:[function(){return new F.ai(null,null)},"$0","kH",0,0,25]}},
a5:{
"^":"Z;H:a@,I:b*,aD:c@",
static:{cD:function(a,b,c){var z=J.U(S.V(C.j))
if(null==z)z=F.eT().$0()
J.da(z,a)
z.sH(b)
z.saD(c)
return z},mw:[function(){return new F.a5(null,null,null)},"$0","eT",0,0,26]}},
bO:{
"^":"Z;",
static:{m5:[function(){return new F.bO()},"$0","d1",0,0,27]}},
bV:{
"^":"Z;",
static:{mo:[function(){return new F.bV()},"$0","kG",0,0,28]}},
bP:{
"^":"Z;",
static:{m7:[function(){return new F.bP()},"$0","kE",0,0,29]}},
by:{
"^":"Z;",
static:{kO:[function(){return new F.by()},"$0","kz",0,0,30]}},
bD:{
"^":"Z;",
static:{dz:function(){return S.az(C.t,F.kB())},lt:[function(){return new F.bD()},"$0","kB",0,0,31]}},
aZ:{
"^":"Z;dH:a@,ct:b<",
static:{dC:function(a,b){var z=S.az(C.r,F.kC())
z.sdH(a)
z.b=b
return z},lw:[function(){return new F.aZ(null,null)},"$0","kC",0,0,32]}},
ax:{
"^":"Z;bk:a@,b",
static:{lJ:[function(){return new F.ax(null,null)},"$0","eS",0,0,33]}},
ad:{
"^":"Z;bh:a@",
static:{l4:[function(){return new F.ad(null)},"$0","kA",0,0,22]}},
ci:{
"^":"ay;t:b>,q:c>,a"},
ek:{
"^":"ay;b,c,d,a",
df:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.d.a5("player")
y=J.k(this.b.b,J.D(z))
x=new Float32Array(H.v(16))
w=new T.aL(x)
w.bo()
v=new T.aL(new Float32Array(H.v(16)))
v.bo()
u=Math.sin(H.n(0))
t=new Float32Array(H.v(3))
s=new T.a9(t)
s.a6(400+100*u,550,-150)
u=new T.a9(new Float32Array(H.v(3)))
u.a6(400,200,150)
r=new T.a9(new Float32Array(H.v(3)))
r.a6(0,-1,0)
q=s.F(0,u)
q.ca()
p=r.dg(q)
p.ca()
o=q.dg(p)
o.ca()
w.bp()
x[15]=1
r=p.a
x[0]=r[0]
x[1]=r[1]
x[2]=r[2]
r=o.a
x[4]=r[0]
x[5]=r[1]
x[6]=r[2]
r=q.a
x[8]=r[0]
x[9]=r[1]
x[10]=r[2]
n=x[4]
x[4]=x[1]
x[1]=n
n=x[8]
x[8]=x[2]
x[2]=n
n=x[12]
x[12]=x[3]
x[3]=n
n=x[9]
x[9]=x[6]
x[6]=n
n=x[13]
x[13]=x[7]
x[7]=n
n=x[14]
x[14]=x[11]
x[11]=n
r=t[0]
u=t[1]
t=t[2]
s=new T.a9(new Float32Array(H.v(3)))
s.a6(-r,-u,-t)
m=w.A(0,s)
x[12]=m.gk(m)
x[13]=m.gl(m)
x[14]=m.gdO(m)
l=Math.tan(H.n(0.7853981633974483))
k=l*1.3333333333333333
j=-k
i=-l
h=k-j
g=l-i
x=v.bp().a
x[0]=2/h
x[5]=2/g
x[8]=(k+j)/h
x[9]=(l+i)/g
x[10]=-1.002002002002002
x[11]=-1
x[14]=-2.002002002002002
v.A(0,w)
f=new T.aL(new Float32Array(H.v(16)))
f.bo()
x=J.bc(this.c)
s=J.bb(this.c)
if(typeof x!=="number")return x.a0()
if(typeof s!=="number")return H.j(s)
e=x/s
if(e>1.3333333333333333){k=600*e
l=600}else{l=800/e
k=800}x=J.h(y)
u=k/2
t=J.T(x.gk(y),u)
u=J.l(x.gk(y),u)
s=l/2
r=J.T(x.gl(y),s)
s=J.l(x.gl(y),s)
j=J.bx(t)
d=J.bx(u)
i=J.bx(r)
c=J.bx(s)
b=d-j
a=c-i
s=f.bp().a
s[0]=2/b
s[5]=2/a
s[10]=0.004
s[12]=-(d+j)/b
s[13]=-(c+i)/a
s[14]=0
s[15]=1
return f},
D:function(){var z,y
this.ed()
z=this.a
y=H.b(new S.o(null,null),[F.z])
y.v(C.b,z,F.z)
this.b=y
this.d=this.a.z.h(0,C.l)
this.c=this.a.z.h(0,C.q)}},
iw:{
"^":"a8;z,Q,ch,ct:cx<,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=J.h(a)
y=J.k(this.z.b,z.gn(a))
x=J.k(this.Q.b,z.gn(a))
w=J.k(this.ch.b,z.gn(a))
z=J.h(x)
if(z.gS(x)===!0&&z.ga_(x)===!0){z=J.h(y)
v=J.x(z.gI(y),Math.cos(H.n(y.gH())))
u=J.x(z.gI(y),Math.sin(H.n(y.a)))
z=Math.cos(H.n(w.gH()))
t=this.b.ch
s=this.cx
r=Math.sin(H.n(w.gH()))
q=this.b.ch
p=J.l(v,z*t*s)
s=Math.atan2(H.n(J.l(u,r*q*s)),H.n(p))
y.a=s
y.b=J.aD(p,Math.cos(H.n(s)))}else if(z.gS(x)===!0){z=y.gaD()
t=this.b.ch
if(typeof z!=="number")return z.F()
y.c=z-t*5}else if(z.ga_(x)===!0){z=y.gaD()
t=this.b.ch
if(typeof z!=="number")return z.p()
y.c=z+t*5}z=w.gH()
t=y.gaD()
s=this.b.ch
if(typeof t!=="number")return t.A()
if(typeof z!=="number")return z.p()
w.sH(z+t*s)},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.ag])
y.v(C.k,z,F.ag)
this.ch=y
y=this.b
z=H.b(new S.o(null,null),[F.ai])
z.v(C.n,y,F.ai)
this.Q=z
z=this.b
y=H.b(new S.o(null,null),[F.a5])
y.v(C.j,z,F.a5)
this.z=y}},
fL:{
"^":"a8;z,Q,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=J.h(a)
y=J.k(this.z.b,z.gn(a))
x=J.k(this.Q.b,z.gn(a))
z=this.z
w=x.gbh()
v=J.k(z.b,J.D(w))
w=J.h(y)
u=J.x(w.gI(y),Math.cos(H.n(y.gH())))
t=J.x(w.gI(y),Math.sin(H.n(y.a)))
w=J.h(v)
s=J.x(w.gI(v),Math.cos(H.n(v.gH())))
r=J.x(w.gI(v),Math.sin(H.n(v.a)))
q=this.b.ch*0.8
w=1-q
if(typeof u!=="number")return H.j(u)
if(typeof s!=="number")return H.j(s)
p=w*u+q*s
if(typeof t!=="number")return H.j(t)
if(typeof r!=="number")return H.j(r)
w=Math.atan2(H.n(w*t+q*r),H.n(p))
y.a=w
y.b=p/Math.cos(H.n(w))},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.ad])
y.v(C.i,z,F.ad)
this.Q=y
y=this.b
z=H.b(new S.o(null,null),[F.a5])
z.v(C.j,y,F.a5)
this.z=z}},
hZ:{
"^":"a8;z,Q,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w
z=J.h(a)
y=J.k(this.z.b,z.gn(a))
x=J.k(this.Q.b,z.gn(a))
z=J.h(y)
w=J.h(x)
z.sk(y,J.l(z.gk(y),J.x(J.x(w.gI(x),Math.cos(H.n(x.gH()))),this.b.ch)))
z.sl(y,J.l(z.gl(y),J.x(J.x(w.gI(x),Math.sin(H.n(x.a))),this.b.ch)))},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.a5])
y.v(C.j,z,F.a5)
this.Q=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.z=z}},
iy:{
"^":"a8;z,Q,ch,cx,cy,db,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u,t,s,r
z=J.h(a)
y=J.k(this.z.b,z.gn(a))
x=J.k(this.Q.b,z.gn(a))
w=J.k(this.ch.b,z.gn(a))
v=J.k(this.cx.b,z.gn(a))
u=J.k(this.cy.b,z.gn(a))
t=J.k(this.db.b,z.gn(a))
z=x.gH()
if(typeof z!=="number")return z.p()
s=x.gH()
if(typeof s!=="number")return s.F()
r=J.h(w)
if(r.gS(w)===!0)this.cs(y,u,v,t,z+2.356194490192345,x,1)
if(r.ga_(w)===!0)this.cs(y,u,v,t,s-2.356194490192345,x,-1)},
cs:function(a4,a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=J.h(a4)
y=z.gk(a4)
x=a5.gag()
if(typeof x!=="number")return x.A()
w=J.l(y,x*1.1*Math.cos(H.n(a8)))
x=z.gl(a4)
y=a5.a
if(typeof y!=="number")return y.A()
v=J.l(x,y*1.1*Math.sin(H.n(a8)))
y=z.gk(a4)
x=a5.a
if(typeof x!=="number")return x.A()
u=a8+b0/16*3.141592653589793
t=J.l(y,x*Math.cos(H.n(u)))
z=z.gl(a4)
x=a5.a
if(typeof x!=="number")return x.A()
s=J.l(z,x*Math.sin(H.n(u)))
u=a6.gaD()
if(typeof u!=="number")return H.j(u)
x=a5.a
if(typeof x!=="number")return H.j(x)
r=1.1*u*x
x=J.x(a6.b,Math.cos(H.n(a6.a)))
u=a9.gH()
if(typeof u!=="number")return u.F()
z=a8+1.5707963267948966
q=J.l(J.l(x,50*Math.cos(H.n(u-3.141592653589793))),r*Math.cos(H.n(z)))
u=J.x(a6.b,Math.sin(H.n(a6.a)))
x=a9.gH()
if(typeof x!=="number")return x.F()
p=Math.atan2(H.n(J.l(J.l(u,50*Math.sin(H.n(x-3.141592653589793))),r*Math.sin(H.n(z)))),H.n(q))
o=J.aD(q,Math.cos(H.n(p)))
z=J.aU(o)
y=p-0.04908738521234052
x=J.h(a7)
u=J.C(t)
n=J.aU(w)
m=J.C(s)
l=J.aU(v)
k=0
while(!0){j=a5.a
if(typeof j!=="number")return j.a0()
if(!(k<j/10))break
j=$.$get$ba()
i=j.K()
h=this.b
g=u.F(t,w)
if(typeof g!=="number")return H.j(g)
g=n.p(w,i*g)
f=m.F(s,v)
if(typeof f!=="number")return H.j(f)
f=l.p(v,i*f)
e=J.U(S.V(C.b))
if(null==e)e=F.c5().$0()
d=J.h(e)
d.sk(e,g)
d.sl(e,f)
c=J.U(S.V(C.o))
if(null==c)c=F.d1().$0()
b=J.U(S.V(C.D))
if(null==b)b=F.kG().$0()
g=x.gT(a7)
f=a7.gX()
d=a7.gY()
a=J.U(S.V(C.e))
if(null==a)a=F.eR().$0()
a0=J.h(a)
a0.sT(a,g)
a.sX(f)
a.sY(d)
a0.sad(a,1)
a.sh1(1)
a.e=F.d_(g,f,d)[2]
d=1+2*j.K()
a1=J.U(S.V(C.m))
if(null==a1)a1=F.eS().$0()
a1.sbk(d)
a1.b=d
g=J.l(z.A(o,0.9),j.K()*0.2)
j=j.K()
a2=J.U(S.V(C.j))
if(null==a2)a2=F.eT().$0()
J.da(a2,g)
a2.sH(y+j*3.141592653589793/32)
a2.saD(0)
a3=h.az([e,c,b,a,a1,a2])
h.c.B(0,a3);++k}},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.Q])
y.v(C.e,z,F.Q)
this.db=y
y=this.b
z=H.b(new S.o(null,null),[F.G])
z.v(C.d,y,F.G)
this.cy=z
z=this.b
y=H.b(new S.o(null,null),[F.a5])
y.v(C.j,z,F.a5)
this.cx=y
y=this.b
z=H.b(new S.o(null,null),[F.ai])
z.v(C.n,y,F.ai)
this.ch=z
z=this.b
y=H.b(new S.o(null,null),[F.ag])
y.v(C.k,z,F.ag)
this.Q=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.z=z}},
ix:{
"^":"a8;z,Q,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u
z=J.h(a)
y=J.k(this.z.b,z.gn(a))
x=J.k(this.Q.b,z.gn(a))
z=J.h(y)
w=z.gT(y)
if(typeof w!=="number")return H.j(w)
v=x.gbk()
if(typeof v!=="number")return H.j(v)
u=x.b
if(typeof u!=="number")return H.j(u)
z.sT(y,0.99*w+0.01*v/u)
u=y.gX()
if(typeof u!=="number")return H.j(u)
v=x.a
if(typeof v!=="number")return H.j(v)
w=x.b
if(typeof w!=="number")return H.j(w)
y.sX(0.99*u+0.01*v/w)
w=y.gY()
if(typeof w!=="number")return H.j(w)
v=x.a
if(typeof v!=="number")return H.j(v)
u=x.b
if(typeof u!=="number")return H.j(u)
y.sY(0.99*w+0.01*v/u)
u=x.a
v=x.b
if(typeof u!=="number")return u.a0()
if(typeof v!=="number")return H.j(v)
z.sad(y,u/v)},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.ax])
y.v(C.m,z,F.ax)
this.Q=y
y=this.b
z=H.b(new S.o(null,null),[F.Q])
z.v(C.e,y,F.Q)
this.z=z}},
fU:{
"^":"a8;z,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x
z=J.k(this.z.b,J.D(a))
y=z.gbk()
x=this.b.ch
if(typeof y!=="number")return y.F()
x=y-x
z.a=x
if(x<=0)a.c2()},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.ax])
y.v(C.m,z,F.ax)
this.z=y}},
ht:{
"^":"a8;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
d7:function(){var z=this.z.a5("player")
this.cx=J.k(this.ch.b,J.D(z)).gas()},
Z:function(a){var z,y,x,w
z=J.h(a)
y=J.k(this.Q.b,z.gn(a))
x=J.k(this.ch.b,z.gn(a))
w=Math.sin(H.n(J.aD(J.x(J.x(this.b.cy.h(0,this.y),5),this.cx),x.gas())))
w=1+0.025*P.bt(-0.2,w*w*w)
z=y.gdq()
if(typeof z!=="number")return z.A()
y.e1(z*w*1.05)
z=y.f
if(typeof z!=="number")return z.F()
y.d=z-0.1*w
z=x.b
if(typeof z!=="number")return z.A()
x.a=z*w},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.ch=y
y=this.b
z=H.b(new S.o(null,null),[F.Q])
z.v(C.e,y,F.Q)
this.Q=z
this.z=this.b.z.h(0,C.l)}},
fY:{
"^":"aI;z,Q,ch,a,b,c,d,e,f,r,x,y",
aQ:function(a){var z,y
z=this.z.a5("player")
y=J.h(z)
a.dN(0,new F.fZ(this,J.k(this.Q.b,y.gn(z)),J.k(this.ch.b,y.gn(z)))).C(0,new F.h_(z))},
ay:function(){return!0},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.ch=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.Q=z
this.z=this.b.z.h(0,C.l)}},
fZ:{
"^":"d:0;a,b,c",
$1:function(a){var z,y,x,w,v,u,t
z=this.a
y=J.h(a)
x=J.k(z.Q.b,y.gn(a))
w=J.k(z.ch.b,y.gn(a))
y=this.b
z=J.h(y)
v=J.h(x)
u=J.T(z.gk(y),v.gk(x))
t=J.T(z.gl(y),v.gl(x))
v=Math.sqrt(H.n(J.l(J.x(u,u),J.x(t,t))))
y=this.c.gag()
z=w.gag()
if(typeof y!=="number")return y.F()
if(typeof z!=="number")return H.j(z)
return v<y-z}},
h_:{
"^":"d:0;a",
$1:function(a){var z=S.az(C.i,F.kA())
z.sbh(this.a)
a.f5(z)
a.cf(C.r)
a.c_()}},
ii:{
"^":"a8;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u,t,s,r,q
z=J.h(a)
y=J.k(this.Q.b,z.gn(a))
x=J.k(this.ch.b,z.gn(a))
w=J.k(this.z.b,z.gn(a))
z=this.Q
v=w.gbh()
u=J.k(z.b,J.D(v))
v=this.ch
z=w.a
t=J.k(v.b,J.D(z))
z=J.h(u)
v=J.h(y)
s=J.T(z.gk(u),v.gk(y))
r=J.T(z.gl(u),v.gl(y))
z=Math.sqrt(H.n(J.l(J.x(s,s),J.x(r,r))))
v=t.gag()
q=x.gag()
if(typeof v!=="number")return v.F()
if(typeof q!=="number")return H.j(q)
if(z>v-q){a.cf(C.i)
a.c_()
this.cx=!0}},
c4:function(){if(this.cx){this.b.dA()
this.cx=!1}},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.ch=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.Q=z
z=this.b
y=H.b(new S.o(null,null),[F.ad])
y.v(C.i,z,F.ad)
this.z=y}},
fG:{
"^":"a8;z,Q,ch,cx,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=J.h(a)
y=J.k(this.Q.b,z.gn(a))
x=J.k(this.z.b,z.gn(a))
w=this.Q
v=x.gbh()
u=J.k(w.b,J.D(v))
v=y.gas()
w=this.b.ch
t=u.gas()
if(typeof t!=="number")return H.j(t)
if(typeof v!=="number")return v.F()
s=v-w*t/20
t=y.b
if(typeof t!=="number")return H.j(t)
r=3.141592653589793*t*t
if(s>0){r-=3.141592653589793*s*s
y.b=s
q=J.k(this.ch.b,z.gn(a))
z=this.cx
w=x.a
p=J.k(z.b,J.D(w))
o=F.d_(J.fd(p),p.gX(),p.gY())
z=J.h(q)
n=0
while(!0){w=y.b
if(typeof w!=="number")return H.j(w)
if(!(n<w))break
m=$.$get$ba().K()*2*3.141592653589793
w=this.b
l=J.U(S.V(C.o))
if(null==l)l=F.d1().$0()
v=z.gk(q)
t=y.b
k=Math.cos(m)
if(typeof t!=="number")return t.A()
k=J.l(v,t*k)
t=z.gl(q)
v=y.b
j=Math.sin(m)
if(typeof v!=="number")return v.A()
j=J.l(t,v*j)
i=J.U(S.V(C.b))
if(null==i)i=F.c5().$0()
v=J.h(i)
v.sk(i,k)
v.sl(i,j)
j=F.be(o[0],o[1]+0.1,o[2]+0.1,1)
h=J.U(S.V(C.m))
if(null==h)h=F.eS().$0()
h.sbk(0.1)
h.b=0.1
g=w.az([l,i,j,h])
w.c.B(0,g);++n}}else a.c2()
z=u.b
if(typeof z!=="number")return H.j(z)
u.b=Math.sqrt(H.n((3.141592653589793*z*z+r)/3.141592653589793))},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.Q])
y.v(C.e,z,F.Q)
this.cx=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.ch=z
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.Q=y
y=this.b
z=H.b(new S.o(null,null),[F.ad])
z.v(C.i,y,F.ad)
this.z=z}},
h0:{
"^":"a8;z,Q,ch,cx,cy,db,a,b,c,d,e,f,r,x,y",
Z:function(a){var z,y,x,w,v,u,t
z=J.h(a)
y=J.k(this.z.b,z.gn(a))
x=J.k(this.Q.b,z.gn(a))
z=y.gas()
if(typeof z!=="number")return H.j(z)
w=y.b
if(typeof w!=="number")return H.j(w)
v=this.b.ch
u=x.gct()
if(typeof u!=="number")return H.j(u)
t=3.141592653589793*z*w+v*u
this.db+=t
u=Math.sqrt(H.n(t/3.141592653589793))
y.b=u
z=x.gdH()
if(typeof z!=="number")return H.j(z)
if(u>=z){a.cf(C.r)
a.c_()}},
c4:function(){var z,y,x,w,v,u,t,s
if(this.db<500){z=this.cx
y=this.ch.a5("player")
x=J.k(z.b,J.D(y))
y=this.b
z=J.h(x)
w=J.T(z.gk(x),J.bc(this.cy))
v=$.$get$ba()
u=v.K()
t=J.bc(this.cy)
if(typeof t!=="number")return H.j(t)
t=J.l(w,u*t*2)
z=J.T(z.gl(x),J.bb(this.cy))
u=v.K()
w=J.bb(this.cy)
if(typeof w!=="number")return H.j(w)
s=y.az([F.cv(t,J.l(z,u*w*2)),F.cz(0.1),F.be(0.35,0.4,0.4,1),F.dz(),F.dC(1+v.K()*10,1+v.K()*4),F.cu(0),F.cD(0,0,0)])
y.c.B(0,s)}this.db=0},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.z])
y.v(C.b,z,F.z)
this.cx=y
y=this.b
z=H.b(new S.o(null,null),[F.aZ])
z.v(C.r,y,F.aZ)
this.Q=z
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.z=y
this.cy=this.b.z.h(0,C.q)
this.ch=this.b.z.h(0,C.l)}},
fF:{
"^":"ei;z,Q,ch,cx,cy,a,b,c,d,e,f,r,x,y",
dB:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=J.av(this.Q.cq("damareats"))
y=this.z.a5("player")
x=J.h(y)
w=J.k(this.ch.b,x.gn(y))
v=J.k(this.cx.b,x.gn(y))
x=J.bc(this.cy)
if(typeof x!=="number")return x.a0()
u=$.$get$ba()
t=u.K()
s=u.c9()?1:-1
r=J.bb(this.cy)
if(typeof r!=="number")return r.a0()
q=u.K()
p=u.c9()?1:-1
o=this.b
n=J.h(w)
p=F.cv(J.l(n.gk(w),x/2*(2.5*t)*s),J.l(n.gl(w),r/2*(2.5*q)*p))
q=F.cz(0.1)
r=F.be(u.K(),0.8,0.5,0.2)
n=F.dz()
m=S.az(C.u,F.kz())
s=v.gas()
t=u.K()
if(typeof s!=="number")return s.A()
x=v.b
if(typeof x!=="number")return x.p()
l=J.aD(z,11)
if(typeof l!=="number")return H.j(l)
l=F.dC(s*(0.8+0.8*t),x+50-l)
x=F.cu(0)
t=u.K()
s=u.K()
u=u.c9()?u.K()*0.1:0
k=o.az([p,q,r,n,m,l,x,F.cD(t*25,6.283185307179586*s,u)])
o.c.B(0,k)
J.f2(this.Q,k,"damareats")},
ay:function(){var z,y
z=this.cx
y=this.z.a5("player")
y=J.k(z.b,J.D(y)).gas()
if(typeof y!=="number")return y.a1()
return y>21&&J.bv(J.av(this.Q.cq("damareats")),500)},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.G])
y.v(C.d,z,F.G)
this.cx=y
y=this.b
z=H.b(new S.o(null,null),[F.z])
z.v(C.b,y,F.z)
this.ch=z
this.cy=this.b.z.h(0,C.q)
this.Q=this.b.z.h(0,C.a_)
this.z=this.b.z.h(0,C.l)}},
fV:{
"^":"aI;z,Q,ch,a,b,c,d,e,f,r,x,y",
aQ:function(a){var z,y
z=this.Q
y=this.z.a5("player")
a.dN(0,new F.fW(this,J.k(z.b,J.D(y)))).C(0,new F.fX())},
ay:function(){return!0},
D:function(){var z,y
this.U()
z=this.b
y=H.b(new S.o(null,null),[F.z])
y.v(C.b,z,F.z)
this.Q=y
this.ch=this.b.z.h(0,C.q)
this.z=this.b.z.h(0,C.l)}},
fW:{
"^":"d:0;a,b",
$1:function(a){var z,y,x,w,v
z=this.a
y=J.k(z.Q.b,J.D(a))
x=this.b
w=J.h(x)
v=J.h(y)
return J.aV(J.d4(J.T(w.gk(x),v.gk(y))),J.x(J.bc(z.ch),4))||J.aV(J.d4(J.T(w.gl(x),v.gl(y))),J.x(J.bb(z.ch),4))}},
fX:{
"^":"d:0;",
$1:function(a){return a.c2()}}}],["","",,T,{
"^":"",
aL:{
"^":"c;i:a<",
j:function(a){return"[0] "+this.aY(0).j(0)+"\n[1] "+this.aY(1).j(0)+"\n[2] "+this.aY(2).j(0)+"\n[3] "+this.aY(3).j(0)+"\n"},
gfE:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=c},
aY:function(a){var z,y,x
z=new Float32Array(H.v(4))
y=this.a
if(a>=16)return H.a(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.a(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.a(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.a(y,x)
z[3]=y[x]
return new T.aM(z)},
A:function(a,b){var z,y,x,w
if(typeof b==="number"){z=new Float32Array(H.v(16))
y=this.a
z[15]=y[15]*b
z[14]=y[14]*b
z[13]=y[13]*b
z[12]=y[12]*b
z[11]=y[11]*b
z[10]=y[10]*b
z[9]=y[9]*b
z[8]=y[8]*b
z[7]=y[7]*b
z[6]=y[6]*b
z[5]=y[5]*b
z[4]=y[4]*b
z[3]=y[3]*b
z[2]=y[2]*b
z[1]=y[1]*b
z[0]=y[0]*b
return new T.aL(z)}z=J.m(b)
if(!!z.$isaM){z=new Float32Array(H.v(4))
y=this.a
x=y[3]
w=b.a
z[3]=x*w[0]+y[7]*w[1]+y[11]*w[2]+y[15]*w[3]
z[2]=y[2]*w[0]+y[6]*w[1]+y[10]*w[2]+y[14]*w[3]
z[1]=y[1]*w[0]+y[5]*w[1]+y[9]*w[2]+y[13]*w[3]
z[0]=y[0]*w[0]+y[4]*w[1]+y[8]*w[2]+y[12]*w[3]
return new T.aM(z)}if(!!z.$isa9){z=new Float32Array(H.v(3))
y=this.a
x=y[0]
w=b.a
z[0]=x*w[0]+y[4]*w[1]+y[8]*w[2]+y[12]
z[1]=y[1]*w[0]+y[5]*w[1]+y[9]*w[2]+y[13]
z[2]=y[2]*w[0]+y[6]*w[1]+y[10]*w[2]+y[14]
return new T.a9(z)}if(4===b.gfE()){z=new Float32Array(H.v(16))
y=this.a
x=y[0]
w=b.a
z[0]=x*w[0]+y[4]*w[1]+y[8]*w[2]+y[12]*w[3]
z[4]=y[0]*w[4]+y[4]*w[5]+y[8]*w[6]+y[12]*w[7]
z[8]=y[0]*w[8]+y[4]*w[9]+y[8]*w[10]+y[12]*w[11]
z[12]=y[0]*w[12]+y[4]*w[13]+y[8]*w[14]+y[12]*w[15]
z[1]=y[1]*w[0]+y[5]*w[1]+y[9]*w[2]+y[13]*w[3]
z[5]=y[1]*w[4]+y[5]*w[5]+y[9]*w[6]+y[13]*w[7]
z[9]=y[1]*w[8]+y[5]*w[9]+y[9]*w[10]+y[13]*w[11]
z[13]=y[1]*w[12]+y[5]*w[13]+y[9]*w[14]+y[13]*w[15]
z[2]=y[2]*w[0]+y[6]*w[1]+y[10]*w[2]+y[14]*w[3]
z[6]=y[2]*w[4]+y[6]*w[5]+y[10]*w[6]+y[14]*w[7]
z[10]=y[2]*w[8]+y[6]*w[9]+y[10]*w[10]+y[14]*w[11]
z[14]=y[2]*w[12]+y[6]*w[13]+y[10]*w[14]+y[14]*w[15]
z[3]=y[3]*w[0]+y[7]*w[1]+y[11]*w[2]+y[15]*w[3]
z[7]=y[3]*w[4]+y[7]*w[5]+y[11]*w[6]+y[15]*w[7]
z[11]=y[3]*w[8]+y[7]*w[9]+y[11]*w[10]+y[15]*w[11]
z[15]=y[3]*w[12]+y[7]*w[13]+y[11]*w[14]+y[15]*w[15]
return new T.aL(z)}throw H.f(P.a7(b))},
p:function(a,b){var z,y,x,w
z=new Float32Array(H.v(16))
y=this.a
x=y[0]
w=b.gi()
if(0>=w.length)return H.a(w,0)
z[0]=x+w[0]
w=y[1]
x=b.gi()
if(1>=x.length)return H.a(x,1)
z[1]=w+x[1]
x=y[2]
w=b.gi()
if(2>=w.length)return H.a(w,2)
z[2]=x+w[2]
w=y[3]
x=b.gi()
if(3>=x.length)return H.a(x,3)
z[3]=w+x[3]
x=y[4]
w=b.gi()
if(4>=w.length)return H.a(w,4)
z[4]=x+w[4]
w=y[5]
x=b.gi()
if(5>=x.length)return H.a(x,5)
z[5]=w+x[5]
x=y[6]
w=b.gi()
if(6>=w.length)return H.a(w,6)
z[6]=x+w[6]
w=y[7]
x=b.gi()
if(7>=x.length)return H.a(x,7)
z[7]=w+x[7]
x=y[8]
w=b.gi()
if(8>=w.length)return H.a(w,8)
z[8]=x+w[8]
w=y[9]
x=b.gi()
if(9>=x.length)return H.a(x,9)
z[9]=w+x[9]
x=y[10]
w=b.gi()
if(10>=w.length)return H.a(w,10)
z[10]=x+w[10]
w=y[11]
x=b.gi()
if(11>=x.length)return H.a(x,11)
z[11]=w+x[11]
x=y[12]
w=b.gi()
if(12>=w.length)return H.a(w,12)
z[12]=x+w[12]
w=y[13]
x=b.gi()
if(13>=x.length)return H.a(x,13)
z[13]=w+x[13]
x=y[14]
w=b.gi()
if(14>=w.length)return H.a(w,14)
z[14]=x+w[14]
y=y[15]
w=b.gi()
if(15>=w.length)return H.a(w,15)
z[15]=y+w[15]
return new T.aL(z)},
F:function(a,b){var z,y,x,w
z=new Float32Array(H.v(16))
y=this.a
x=y[0]
w=b.gi()
if(0>=w.length)return H.a(w,0)
z[0]=x-w[0]
w=y[1]
x=b.gi()
if(1>=x.length)return H.a(x,1)
z[1]=w-x[1]
x=y[2]
w=b.gi()
if(2>=w.length)return H.a(w,2)
z[2]=x-w[2]
w=y[3]
x=b.gi()
if(3>=x.length)return H.a(x,3)
z[3]=w-x[3]
x=y[4]
w=b.gi()
if(4>=w.length)return H.a(w,4)
z[4]=x-w[4]
w=y[5]
x=b.gi()
if(5>=x.length)return H.a(x,5)
z[5]=w-x[5]
x=y[6]
w=b.gi()
if(6>=w.length)return H.a(w,6)
z[6]=x-w[6]
w=y[7]
x=b.gi()
if(7>=x.length)return H.a(x,7)
z[7]=w-x[7]
x=y[8]
w=b.gi()
if(8>=w.length)return H.a(w,8)
z[8]=x-w[8]
w=y[9]
x=b.gi()
if(9>=x.length)return H.a(x,9)
z[9]=w-x[9]
x=y[10]
w=b.gi()
if(10>=w.length)return H.a(w,10)
z[10]=x-w[10]
w=y[11]
x=b.gi()
if(11>=x.length)return H.a(x,11)
z[11]=w-x[11]
x=y[12]
w=b.gi()
if(12>=w.length)return H.a(w,12)
z[12]=x-w[12]
w=y[13]
x=b.gi()
if(13>=x.length)return H.a(x,13)
z[13]=w-x[13]
x=y[14]
w=b.gi()
if(14>=w.length)return H.a(w,14)
z[14]=x-w[14]
y=y[15]
w=b.gi()
if(15>=w.length)return H.a(w,15)
z[15]=y-w[15]
return new T.aL(z)},
bp:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=0
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=0
return this},
bo:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1
return this},
B:function(a,b){var z=this.a
z[0]=C.a.p(z[0],b.gi().h(0,0))
z[1]=C.a.p(z[1],b.gi().h(0,1))
z[2]=C.a.p(z[2],b.gi().h(0,2))
z[3]=C.a.p(z[3],b.gi().h(0,3))
z[4]=C.a.p(z[4],b.gi().h(0,4))
z[5]=C.a.p(z[5],b.gi().h(0,5))
z[6]=C.a.p(z[6],b.gi().h(0,6))
z[7]=C.a.p(z[7],b.gi().h(0,7))
z[8]=C.a.p(z[8],b.gi().h(0,8))
z[9]=C.a.p(z[9],b.gi().h(0,9))
z[10]=C.a.p(z[10],b.gi().h(0,10))
z[11]=C.a.p(z[11],b.gi().h(0,11))
z[12]=C.a.p(z[12],b.gi().h(0,12))
z[13]=C.a.p(z[13],b.gi().h(0,13))
z[14]=C.a.p(z[14],b.gi().h(0,14))
z[15]=C.a.p(z[15],b.gi().h(0,15))
return this}},
mv:{
"^":"c;"},
a9:{
"^":"c;i:a<",
a6:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
j:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
F:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gi()
if(0>=x.length)return H.a(x,0)
x=x[0]
w=z[1]
v=b.gi()
if(1>=v.length)return H.a(v,1)
v=v[1]
z=z[2]
u=b.gi()
if(2>=u.length)return H.a(u,2)
u=u[2]
t=new T.a9(new Float32Array(H.v(3)))
t.a6(y-x,w-v,z-u)
return t},
p:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.gi()
if(0>=x.length)return H.a(x,0)
x=x[0]
w=z[1]
v=b.gi()
if(1>=v.length)return H.a(v,1)
v=v[1]
z=z[2]
u=b.gi()
if(2>=u.length)return H.a(u,2)
u=u[2]
t=new T.a9(new Float32Array(H.v(3)))
t.a6(y+x,w+v,z+u)
return t},
a0:function(a,b){var z,y,x,w,v
if(typeof b!=="number")return H.j(b)
z=1/b
y=this.a
x=y[0]
w=y[1]
y=y[2]
v=new T.a9(new Float32Array(H.v(3)))
v.a6(x*z,w*z,y*z)
return v},
A:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.j(b)
x=z[1]
z=z[2]
w=new T.a9(new Float32Array(H.v(3)))
w.a6(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
z[b]=c},
gm:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.n(y*y+x*x+z*z))},
ca:function(){var z,y
z=this.gm(this)
if(z===0)return this
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
y[2]=y[2]*z
return this},
dg:function(a){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=a.a
v=z[0]
u=z[1]
t=z[2]
z=new T.a9(new Float32Array(H.v(3)))
z.a6(x*t-w*u,w*v-y*t,y*u-x*v)
return z},
B:function(a,b){var z=this.a
z[0]=C.a.p(z[0],b.gi().h(0,0))
z[1]=C.a.p(z[1],b.gi().h(0,1))
z[2]=C.a.p(z[2],b.gi().h(0,2))
return this},
sT:function(a,b){this.a[0]=b
return b},
sX:function(a){this.a[1]=a
return a},
sY:function(a){this.a[2]=a
return a},
sk:function(a,b){this.a[0]=b
return b},
sl:function(a,b){this.a[1]=b
return b},
gT:function(a){return this.a[0]},
gX:function(){return this.a[1]},
gY:function(){return this.a[2]},
gk:function(a){return this.a[0]},
gl:function(a){return this.a[1]},
gdO:function(a){return this.a[2]}},
aM:{
"^":"c;i:a<",
b0:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
j:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
F:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.a
y=z[0]
x=b.gi()
if(0>=x.length)return H.a(x,0)
x=x[0]
w=z[1]
v=b.gi()
if(1>=v.length)return H.a(v,1)
v=v[1]
u=z[2]
t=b.gi()
if(2>=t.length)return H.a(t,2)
t=t[2]
z=z[3]
s=b.gi()
if(3>=s.length)return H.a(s,3)
s=s[3]
r=new T.aM(new Float32Array(H.v(4)))
r.b0(y-x,w-v,u-t,z-s)
return r},
p:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.a
y=z[0]
x=b.gi()
if(0>=x.length)return H.a(x,0)
x=x[0]
w=z[1]
v=b.gi()
if(1>=v.length)return H.a(v,1)
v=v[1]
u=z[2]
t=b.gi()
if(2>=t.length)return H.a(t,2)
t=t[2]
z=z[3]
s=b.gi()
if(3>=s.length)return H.a(s,3)
s=s[3]
r=new T.aM(new Float32Array(H.v(4)))
r.b0(y+x,w+v,u+t,z+s)
return r},
a0:function(a,b){var z,y,x,w,v,u
if(typeof b!=="number")return H.j(b)
z=1/b
y=this.a
x=y[0]
w=y[1]
v=y[2]
y=y[3]
u=new T.aM(new Float32Array(H.v(4)))
u.b0(x*z,w*z,v*z,y*z)
return u},
A:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.j(b)
x=z[1]
w=z[2]
z=z[3]
v=new T.aM(new Float32Array(H.v(4)))
v.b0(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
u:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
z[b]=c},
gm:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.n(y*y+x*x+w*w+z*z))},
B:function(a,b){var z=this.a
z[0]=C.a.p(z[0],b.gi().h(0,0))
z[1]=C.a.p(z[1],b.gi().h(0,1))
z[2]=C.a.p(z[2],b.gi().h(0,2))
z[3]=C.a.p(z[3],b.gi().h(0,3))
return this},
sT:function(a,b){this.a[0]=b
return b},
sX:function(a){this.a[1]=a
return a},
sY:function(a){this.a[2]=a
return a},
sad:function(a,b){this.a[3]=b
return b},
sk:function(a,b){this.a[0]=b
return b},
sl:function(a,b){this.a[1]=b
return b},
gT:function(a){return this.a[0]},
gX:function(){return this.a[1]},
gY:function(){return this.a[2]},
gad:function(a){return this.a[3]},
gk:function(a){return this.a[0]},
gl:function(a){return this.a[1]},
gdO:function(a){return this.a[2]}}}]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ck.prototype
return J.dJ.prototype}if(typeof a=="string")return J.bI.prototype
if(a==null)return J.hM.prototype
if(typeof a=="boolean")return J.hL.prototype
if(a.constructor==Array)return J.bh.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
return a}if(a instanceof P.c)return a
return J.c1(a)}
J.a_=function(a){if(typeof a=="string")return J.bI.prototype
if(a==null)return a
if(a.constructor==Array)return J.bh.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
return a}if(a instanceof P.c)return a
return J.c1(a)}
J.aa=function(a){if(a==null)return a
if(a.constructor==Array)return J.bh.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
return a}if(a instanceof P.c)return a
return J.c1(a)}
J.ke=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ck.prototype
return J.b0.prototype}if(a==null)return a
if(!(a instanceof P.c))return J.bm.prototype
return a}
J.C=function(a){if(typeof a=="number")return J.b0.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bm.prototype
return a}
J.aU=function(a){if(typeof a=="number")return J.b0.prototype
if(typeof a=="string")return J.bI.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bm.prototype
return a}
J.h=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bi.prototype
return a}if(a instanceof P.c)return a
return J.c1(a)}
J.l=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.aU(a).p(a,b)}
J.c6=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a&b)>>>0
return J.C(a).ab(a,b)}
J.aD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.C(a).a0(a,b)}
J.F=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).w(a,b)}
J.eX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.C(a).at(a,b)}
J.aV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.C(a).a1(a,b)}
J.eY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.C(a).cr(a,b)}
J.bv=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.C(a).aZ(a,b)}
J.x=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.aU(a).A(a,b)}
J.eZ=function(a){if(typeof a=="number"&&Math.floor(a)==a)return~a>>>0
return J.ke(a).dT(a)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.C(a).F(a,b)}
J.aE=function(a,b){return J.C(a).aH(a,b)}
J.f_=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.C(a).bq(a,b)}
J.k=function(a,b){if(a.constructor==Array||typeof a=="string"||H.eM(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.a_(a).h(a,b)}
J.d3=function(a,b,c){if((a.constructor==Array||H.eM(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aa(a).u(a,b,c)}
J.f0=function(a,b,c,d){return J.h(a).ep(a,b,c,d)}
J.f1=function(a,b,c,d){return J.h(a).eW(a,b,c,d)}
J.d4=function(a){return J.C(a).d4(a)}
J.c7=function(a,b){return J.aa(a).B(a,b)}
J.f2=function(a,b,c){return J.aa(a).d5(a,b,c)}
J.f3=function(a,b,c){return J.h(a).fa(a,b,c)}
J.f4=function(a,b){return J.aa(a).fj(a,b)}
J.f5=function(a,b,c,d,e){return J.h(a).fk(a,b,c,d,e)}
J.c8=function(a,b,c){return J.a_(a).fp(a,b,c)}
J.d5=function(a){return J.h(a).ft(a)}
J.f6=function(a){return J.h(a).fv(a)}
J.f7=function(a,b){return J.h(a).fw(a,b)}
J.f8=function(a,b){return J.h(a).R(a,b)}
J.f9=function(a,b){return J.aa(a).ap(a,b)}
J.bw=function(a,b){return J.aa(a).C(a,b)}
J.fa=function(a){return J.h(a).gad(a)}
J.d6=function(a){return J.h(a).gfe(a)}
J.am=function(a){return J.h(a).gaL(a)}
J.M=function(a){return J.m(a).gJ(a)}
J.bb=function(a){return J.h(a).gq(a)}
J.D=function(a){return J.h(a).gn(a)}
J.aW=function(a){return J.aa(a).gO(a)}
J.fb=function(a){return J.h(a).gfV(a)}
J.av=function(a){return J.a_(a).gm(a)}
J.fc=function(a){return J.h(a).gds(a)}
J.d7=function(a){return J.h(a).gdt(a)}
J.fd=function(a){return J.h(a).gT(a)}
J.fe=function(a){return J.h(a).gh6(a)}
J.d8=function(a){return J.m(a).gL(a)}
J.ff=function(a){return J.h(a).gcm(a)}
J.bc=function(a){return J.h(a).gt(a)}
J.fg=function(a,b,c){return J.h(a).dQ(a,b,c)}
J.fh=function(a){return J.h(a).dR(a)}
J.d9=function(a,b,c){return J.h(a).dS(a,b,c)}
J.fi=function(a,b){return J.aa(a).ar(a,b)}
J.fj=function(a){return J.h(a).h_(a)}
J.fk=function(a,b){return J.aa(a).P(a,b)}
J.U=function(a){return J.aa(a).ah(a)}
J.aX=function(a,b){return J.h(a).bn(a,b)}
J.da=function(a,b){return J.h(a).sI(a,b)}
J.bx=function(a){return J.C(a).h9(a)}
J.db=function(a){return J.C(a).aT(a)}
J.aF=function(a){return J.m(a).j(a)}
J.fl=function(a,b){return J.h(a).ha(a,b)}
I.cX=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.w=W.ce.prototype
C.x=W.fC.prototype
C.I=W.b_.prototype
C.J=J.i.prototype
C.f=J.bh.prototype
C.z=J.dJ.prototype
C.c=J.ck.prototype
C.a=J.b0.prototype
C.K=J.bI.prototype
C.S=J.bi.prototype
C.U=H.i0.prototype
C.V=J.i4.prototype
C.ae=J.bm.prototype
C.p=W.iI.prototype
C.E=new H.dt()
C.F=new P.i2()
C.G=new P.je()
C.H=new P.jB()
C.h=new P.jN()
C.y=new P.ac(0)
C.L=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.A=function(hooks) { return hooks; }
C.M=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.N=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.O=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.P=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.B=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.Q=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.R=function(_, letter) { return letter.toUpperCase(); }
C.T=I.cX([])
C.u=H.q("by")
C.W=H.q("kV")
C.X=H.q("kW")
C.e=H.q("Q")
C.i=H.q("ad")
C.C=H.q("ek")
C.Y=H.q("lr")
C.Z=H.q("ls")
C.t=H.q("bD")
C.q=H.q("ci")
C.a_=H.q("dB")
C.r=H.q("aZ")
C.a0=H.q("lB")
C.a1=H.q("lC")
C.a2=H.q("lD")
C.a3=H.q("dK")
C.m=H.q("ax")
C.a4=H.q("i1")
C.k=H.q("ag")
C.o=H.q("bO")
C.v=H.q("bP")
C.b=H.q("z")
C.d=H.q("G")
C.a5=H.q("H")
C.l=H.q("cB")
C.D=H.q("bV")
C.n=H.q("ai")
C.a6=H.q("mq")
C.a7=H.q("mr")
C.a8=H.q("ms")
C.a9=H.q("mt")
C.j=H.q("a5")
C.aa=H.q("bq")
C.ab=H.q("au")
C.ac=H.q("u")
C.ad=H.q("b9")
$.dW="$cachedFunction"
$.dX="$cachedInvocation"
$.ab=0
$.aY=null
$.dd=null
$.cU=null
$.eE=null
$.eP=null
$.c_=null
$.c2=null
$.cV=null
$.aP=null
$.b5=null
$.b6=null
$.cP=!1
$.p=C.h
$.dx=0
$.dh=1
$.di=0
$.dv=0
$.ev=0
$.cM=null
$.dq=null
$.dp=null
$.dn=null
$.dm=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["dl","$get$dl",function(){return init.getIsolateTag("_$dart_dartClosure")},"dF","$get$dF",function(){return H.hJ()},"dG","$get$dG",function(){return H.b(new P.fT(null),[P.u])},"e5","$get$e5",function(){return H.aj(H.bW({toString:function(){return"$receiver$"}}))},"e6","$get$e6",function(){return H.aj(H.bW({$method$:null,toString:function(){return"$receiver$"}}))},"e7","$get$e7",function(){return H.aj(H.bW(null))},"e8","$get$e8",function(){return H.aj(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ec","$get$ec",function(){return H.aj(H.bW(void 0))},"ed","$get$ed",function(){return H.aj(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ea","$get$ea",function(){return H.aj(H.eb(null))},"e9","$get$e9",function(){return H.aj(function(){try{null.$method$}catch(z){return z.message}}())},"ef","$get$ef",function(){return H.aj(H.eb(void 0))},"ee","$get$ee",function(){return H.aj(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cb","$get$cb",function(){return H.i_(H.ex([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8]))},"cG","$get$cG",function(){return P.j0()},"b8","$get$b8",function(){return[]},"dk","$get$dk",function(){return{}},"cg","$get$cg",function(){return H.dL(P.bl,S.dg)},"bN","$get$bN",function(){return H.dL(P.bl,[S.I,S.dV])},"ba","$get$ba",function(){return C.H}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[,,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[W.cr]},{func:1,ret:P.H,args:[P.u]},{func:1,args:[,P.aA]},{func:1,args:[P.c]},{func:1,v:true,args:[P.c],opt:[P.aA]},{func:1,v:true,args:[,],opt:[P.aA]},{func:1,args:[,],opt:[,]},{func:1,args:[P.H]},{func:1,v:true,args:[,P.aA]},{func:1,args:[,P.H]},{func:1,args:[{func:1,v:true}]},{func:1,args:[W.b_]},{func:1,v:true,args:[P.au]},{func:1,v:true,args:[W.aw]},{func:1,args:[P.H,,]},{func:1,v:true,args:[,,]},{func:1,ret:F.z},{func:1,ret:F.ad},{func:1,ret:F.G},{func:1,ret:F.Q},{func:1,ret:F.ai},{func:1,ret:F.a5},{func:1,ret:F.bO},{func:1,ret:F.bV},{func:1,ret:F.bP},{func:1,ret:F.by},{func:1,ret:F.bD},{func:1,ret:F.aZ},{func:1,ret:F.ax},{func:1,ret:F.ag}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.kL(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cX=a.cX
Isolate.c0=a.c0
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eU(A.eN(),b)},[])
else (function(b){H.eU(A.eN(),b)})([])})})()