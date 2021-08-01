
if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

var rbulk= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls


Number.prototype.ntain = function(b,c){
  var n=this.valueOf()
  if(n<b) return b
  if(c<n) return c
  return n
}

function ntain(a,b,c){ //contain a by b and c
  if(a<b) return b
  if(c<a) return c
  return a
}

function ntainb(a,b,c){ return a<b?b:c<a?c:a } //contain a by b and c
  
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
 ,{ desc:"div by 2 and round uint"
   ,code:"i>>>1"
   ,func:function(){
      var r=2.5
      for(var i=0.5;i<500;i++)
      { r+=i>>>1 }	
      return r
    }
  }
  ,{ desc:"div by 2 and round sint"
   ,code:"i>>1"
   ,func:function(){
      var r=2.5
      for(var i=0.5;i<500;i++)
      { r+=i>>1 }	
      return r
    }
  }
  ]


/// rounding

var rounding =[
  { desc:"add and round by floor"
   ,code:"r+=Math.floor(i+1.32784624)"
   ,func:function (){
      var r=2
      for(var i=0.5;i<500;i++)
      { r+=Math.floor(i+1.32784624) }
      return r
    }
  }
 ,
  { desc:"add and round by uint"
   ,code:"r+=(i+1.32784624)>>>0"
   ,func:function (){
      var r=2
      for(var i=0.5;i<500;i++)
      { r+=(i+1.32784624)>>>0 }
      return r
    }
  }
 ,

  { desc:"round by floor"
   ,code:"Math.floor(i*0.5)"
   ,func:function (){
      var r=2
      for(var i=0.5;i<500;i++)
      { r+=Math.floor(i) }
      return r
    }
  }
 ,{ desc:"round by uint"
   ,code:"i>>>0"
   ,func:function(){
      var r=2
      for(var i=0.5;i<500;i++)
      { r+=i>>>0 }	
      return r
    }
  }
  ,{ desc:"round by sint"
   ,code:"i>>0"
   ,func:function(){
      var r=2
      for(var i=0.5;i<500;i++)
      { r+=i>>0 }	
      return r
    }
  }
  ]


function castulp(c,u){ //powers 2 most stable for ratios
  return c*(u+1)-c*u
}

function isNeara(a,b,c){
  return ((c+0.5)*a/b)>>0 ==c
}

function isNearb(a,b,c){
  return Math.abs(a-b) < a*c
}

/// Modulus :

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

function modsi(a,b){
  return a-((a/b )>>0)*b //..mirror neg
}

function modnn(a,b){
  return a-Math.round(a/b)*b //creates neg (math.round is slow)
}

//~ console.log(-0.6>>0)
//~ console.log(Math.floor(-0.6))
//~ console.log(modsi(-9,10))
//~ return

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
},{
 desc:"spec. modulus from sint cast"
,code:"a-((a/b)>>0)*b"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=modsi(i,7) }	
  return r
}
}
]

var contains= [
{
 desc:"Warmup"
,code:"Math.floor(i)"
,func:function floors(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=Math.floor(i) }
  return r
}
},{
 desc:"proto ntain"
,code:"a.ntain(-1,1)"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=i.ntain(100,300) }	
  return r
}
},{
 desc:"func ntain"
,code:"ntain(a,-1,1)"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=ntain(i,100,300) }	
  return r
}
},{
 desc:"func ntainb"
,code:"ntainb(a,-1,1)"
,func:function(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=ntain(i,100,300) }	
  return r
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



/// test control arrays 
var testarlen=300
var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.range(-1000,1000) } )
//~ var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.mixof("abcdefghij","",Fdrandom.irange(0,9)) } )

var mathabs =[
 { desc:"math.abs"
   ,code:"r+=Math.abs(TESTAR[i])"
   ,func:function (){
      var r=0; //fg.length=TESTAR.length
      for(var i=0,e=TESTAR.length;i<e;i++){
        r+=Math.abs(i)
      }
      
      return r
    }
  } 
  ,
  { desc:"fabs"
   ,code:"r+=ffabs(TESTAR[i])"
   ,func:function (){
      var r=0; //fg.length=TESTAR.length
      for(var i=0,e=TESTAR.length;i<e;i++){
        r+=fabs(i)
      }
      
      return r
    }
  } 
  ,
  { desc:"simp"
   ,code:"r+=TESTAR[i]"
   ,func:function (){
      var r=1; //fg.length=TESTAR.length
      for(var i=0,e=TESTAR.length;i<e;i++){
        r+=i
      }
      
      return r
    }
  }
]


///test for in

var a4= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls
var a5= a4.slice()

var forinfor= [
//~ {
 //~ desc:"for in"
//~ ,code:"for(in "
//~ ,func:function()
  //~ { a4[0]=0; for(var i in a4){ a4[0]+=a4[i] } return a4[0] }
//~ }
//~ ,
{
 desc:"for(;;"
,code:"for(;;"
,func:function()
 { a5[0]=0; for(var i=1,e=a5.length;i<e;i++){ a5[0]+=a5[i] } return a5[0] }
} 
,
{desc:"for in"
,code:"for(in "
,func:function()
  { a4[0]=0; for(var i in a4){ a4[0]+=a4[i] } return a4[0] }
}
,
{
 desc:"/nwhile(;;"
,code:"while(;;"
,func:function()
 { a5[0]=0; var i=a5.length; while(i!==0){ a5[0]+=a5[--i] } return a5[0] }
}
,
{
 desc:"/nwhile(let;;"
,code:"while(let;;"
,func:function()
 { a5[0]=0; let i=a5.length; while(i!==0){ a5[0]+=a5[--i] } return a5[0] }
}
,
{
 desc:"for(let;;"
,code:"for(let;;"
,func:function()
 { a5[0]=0; for(let i=a5.length-1;i>0;i--){ a5[0]+=a5[i] } return a5[0] }
} 

]


///test for in


var testlist=[

 {rc:warmupset     ,ds:"warmup benchmarks"}
 //~ ,{rc:boolclause ,ds:"bool or 01 clause"}
 //~ ,{rc:moduluses  ,ds:"modulus functions"}
 //~ ,{rc:contains        ,ds:"ntain"}
 //~ ,{rc:divideby2  ,ds:"divide by two"}
 //~ ,{rc:rounding   ,ds:"rounding"}
 //~ ,{rc:mathabs ,ds:"mathabs"}
 ,{rc:forinfor   ,ds:"for in ;;;"}
 
]

var testlenseconds=5
dotests(testlist, testlenseconds )
