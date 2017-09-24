// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
//~ if (!Array.prototype.map) {
if (true) {

  Array.prototype.map = function(callback/*, thisArg*/) {

    var T, A, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    //~ var O = Object(this);
    var O = this

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if ( O[k]!==undefined || k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}




if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

 

//~ a=[1,2,3,4,5,6]

//~ delete a[0]
//~ console.log((a[0]===undefined))
 
//~ return
 
 
 
var warmup = [

{
 desc:"squareroot"
,code:"Math.sqrt(i)"
,func:function sqrts(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=Math.sqrt(i) }	
  return r
}
},{ desc:"fastest dummy test"
 ,code:"r+=i"
 ,func:function (){
    var r=2.5
    for(var i=0.5;i<500;i++)
    { r+=i }
    return r
  }
}
]

/// divide by 2

var divideby2 =[
  { desc:"div by 2 and round"
   ,code:"Math.floor(i*0.5)"
   ,func:function (){
      var r=2.5
      for(var i=0.5;i<500;i++)
      { r+=Math.floor(i*0.5) }
      return r
    }
  }
 ,{ desc:"div by 2 and round"
   ,code:"i>>>1"
   ,func:function(){
      var r=2.5
      for(var i=0.5;i<500;i++)
      { r+=i>>>1 }	
      return r
    }
  }
  ]



/// Modulus testfuns:

function cmod(a,b){
  a/=b ; a=a-Math.floor(a)
  return castulp(a*b,256*256)
}

function omod(a,b){
  return a%b //preserves neg
}

function modp(a,b){
  return a-Math.floor(a/b)*b //removes neg
}

function modn(a,b){
  return a-Math.floor(a/b + 0.5 )*b //creates neg (math.round is slow)
}

function modnn(a,b){
  return a-Math.round(a/b)*b //creates neg (math.round is slow)
}

function castulp(c,u){ //powers 2 most stable for ratios
  return c*(u+1)-c*u
}


var moduluses= [
{
 desc:"Math.floor"
,code:"Math.floor(i)"
,func:function floors(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=Math.floor(i) }
  return r
}
},{
 desc:"std modulus"
,code:"a % b"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=omod(i,7) }	
  return r
}
},{
 desc:"spec. modulus"
,code:"castulp ~ a/=b ; a=a-Math.floor(a)"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=cmod(i,7) }	
  return r
}
},{
 desc:"spec. modulus creates neg"
,code:"a-Math.round(a/b)*b"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=modnn(i,7) }	
  return r
}
},{
 desc:"spec. modulus creates neg"
,code:"a-Math.floor(a/b + 0.5 )*b"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=modn(i,7) }	
  return r
}
}
]


/// // // // // // //
/// return value test funs:

//for result returning tests
var _r=[-0,-0,-0]
var _rb={x:-0,y:-0,z:-0}
var rbulk= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls

function getasTransObj(rbulk,i){
  return {x:rbulk[i],y:rbulk[0]+rbulk[i],z:rbulk[i]*5.5}
}

function getasPermObj(rbulk,i){
  _rb.x=rbulk[i] ,_rb.y=rbulk[0]+rbulk[i] ,_rb.z=rbulk[i]*5.5
}

function getasTransAry(rbulk,i){
  return [rbulk[i],rbulk[0]+rbulk[i],rbulk[i]*5.5]
}

function getasPermAry(rbulk,i){
  _r[0]=rbulk[i],_r[1]=rbulk[0]+rbulk[i],_r[2]=rbulk[i]*5.5
}

function getasPassAry(rbulk,i,r){
  r[0]=rbulk[i],r[1]=rbulk[0]+rbulk[i],r[2]=rbulk[i]*5.5
}

function getasPassObj(rbulk,i,r){
  r.x=rbulk[i] ,r.y=rbulk[0]+rbulk[i] ,r.z=rbulk[i]*5.5
}



var resreturn=[
{
 desc:"transient return Object"
,code:"r.x + r.y + r.z"
,func:function(){
  var r,rr=-1
  for(var i=0; i<rbulk.length ;i++){ 
    r=getasTransObj(rbulk,i)
    rr+=r.x + r.y + r.z
  } 
  return rr 
}
},{
 desc:"dedicated return Object"
,code:"_rb.x + _rb.y + _rb.z"
,func:function(){
  var r,rr=-1
  for(var i=0; i<rbulk.length ;i++){ 
    r=getasPermObj(rbulk,i)
    rr+=_rb.x + _rb.y + _rb.z
  } 
  return rr 
}
},{
 desc:"transient return Array"
,code:"r[0] + r[1] + r[2]"
,func:function testasTransAry(){
  var r,rr=-1
  for(var i=0; i<rbulk.length ;i++){ 
    r=getasTransAry(rbulk,i)
    rr+=r[0] + r[1] + r[2]
  } 
  return rr 
}
},{
 desc:"dedicated return Array"
,code:"_r[0] + _r[1] + _r[2]"
,func:function(){
  var r,rr=-1
  for(var i=0; i<rbulk.length ;i++){ 
    getasPermAry(rbulk,i)
    rr+=_r[0] + _r[1] + _r[2]
  } 
  return rr 
}
},{
 desc:"hot passed return Array"
,code:"ret= func(params,ret)"
,func:function testasPassAry(){
  var rr=-1,r=[]
  for(var i=0; i<rbulk.length ;i++){ 
    getasPassAry(rbulk,i,r)
    rr+=r[0] + r[1] + r[2]
  } 
  return rr 
}
},{
 desc:"hot passed return Object"
,code:"ret= func(params,ret)"
,func:function testasPassObj(){
  var rr=-1,r={}
  for(var i=0; i<rbulk.length ;i++){ 
    getasPassObj(rbulk,i,r)
    rr+=r.x + r.y + r.z
  } 
  return rr 
}
}
]



///test bool or 01 clause

function getasNumb(a,i){
  if(a[i]>30){ return 1 } else {return 0 }
}

function getasBool(a,i){
  if(a[i]>30){ return true }else{return false}
}

var boolclause= [
{
 desc:"clause on bool"
,code:"if(getasBool(rbulk,i))"
,func:function testReturnBool(){
  var rr=-1,r={}
  for(var i=0; i<rbulk.length ;i++){ 
    if(getasBool(rbulk,i)) rr++
  } 
  return rr 
}
},{
 desc:"clause on 0 or 1"
,code:"if(getasNumb(rbulk,i))"
,func:function testReturnNumb(){
  var rr=-1,r={}
  for(var i=0; i<rbulk.length ;i++){ 
    if(getasNumb(rbulk,i)) rr++
  } 
  return rr 
}
}
]



/// for array cloning 
var testarlen=1500
var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.f48()*1000 } )

var arrayclone =[
  { desc:"clone array"
   ,code:"array.slice()"
   ,func:function (){
     var r=2.5,fg=TESTAR.slice()
     for(var i=0;i<100;i+=5)
     { r+=fg[i] }
     return r	
   }
  }
 ,{ desc:"clone array"
   ,code:"array.map(..)"
   ,func:function (){
     var r=2.5,fg=TESTAR.map(function(x){ return x })
     for(var i=0;i<100;i+=5)
     { r+=fg[i] }
     return r	
   }
  }
 ,{ desc:"clone array"
   ,code:"for(i... (copy)"
   ,func:function (){
      var r=2.5,fg=[]
      for(var i=0,e=TESTAR.length;i<e;i++){
        fg[i]=TESTAR[i]
      }
      
      for(var i=0;i<100;i+=5)
      { r+=fg[i] }	
      return r
    }
  }
]


///test for in

var a4= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls
var a5= a4.slice()

var forinfor= [
{
 desc:"for in"
,code:"for(in "
,func:function()
  { a4[0]=0; for(var i in a4){ a4[0]+=a4[i] } return a4[0] }
},{
 desc:"for(;;"
,code:"for(;;"
,func:function()
 { a5[0]=0; for(var i=1,e=a5.length;i<e;i++){ a5[0]+=a5[i] } return a5[0] }
}
]





function dotests(testix,tim){
  
  tim=tim||1
  
  for(tt of testix){
    console.log()
    console.log("Testing:",tt.ds)
    
    for(trc of tt.rc){
      console.log("  Code:",trc.code)
      bench(trc.func, tim, "   "+trc.desc, 0)
      bench(trc.func, tim, "   "+trc.desc, 0)
    }
  }
}

var testlist=[

  {rc:warmup     ,ds:"warmup benchmarks"}
 //~ ,{rc:boolclause ,ds:"bool or 01 clause"}
 //~ ,{rc:resreturn  ,ds:"result passing"}
 //~ ,{rc:moduluses  ,ds:"modulus functions"}
 //~ ,{rc:divideby2  ,ds:"divide by two"}
 ,{rc:arrayclone ,ds:"array clone"}
 ,{rc:forinfor   ,ds:"for in ;;;"}

]

var testlenseconds=0.75
dotests(testlist, testlenseconds )
