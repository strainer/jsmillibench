//testing and checking binary search to nearest floor value 
//'floorix' (sic) floor index of array value that is floor of input

if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

//src was complicated..
//seems floorix was selected and stress tested
//used in helpers.js fancy
 
function floorixdef(A,v){  //small arrays floorex
                          //faster until around n>30
  var c=A.length-1
  while( !( v>=A[c] || c===-1) ){ c-- }
  return c
}
 
function floorix(A,v,b){  //small arrays floorex
                          //faster until around n>30
  var c=A.length-1

  if( b!==undefined && ( b==-1 || v>=A[b] ) && b<c && v<A[b+1] ){ return b }

  if( !(v>=A[0]) ){
    if(v<A[0]){ return -1 }
    //A[0] is nan
    if(c>30){ return floorex(A,v,b) }
    while( !( v>=A[c]||c===-1 ) ){ c-- } //slow nan
    return c	
  }
  
  if(c>7){
    if( v<A[5]){ c=4 }
    else{
      if(c>27){
        if(c>58){ return floorex(A,v,b) } 
        if( v<A[19]){ c=18 }
      }
    }
  }
  
  while( !(v>=A[c]) ){ c-- }
  //~ while( (v<A[c]) ){ c-- }
  return c

}



function smfloorixo(A,v){
    
  if( v<A[0] ){ 
    //~ console.log("x",-1,v,A[0])
    return -1
  }
  
  var c=A.length-1

  while( !(v>=A[c]) ){ c-- }
  
  //~ if(v<A[c]||v>A[c+1]){
    //~ console.log("!!!!!!! x",c,v,A[c-1],A[c],A[c+1])
  //~ }
  return c
}

function floorex(A,v,b){ 
  
  //return elem in A with value less than or equal v
  //returns -1 if A[0] is more than v
  //skips undefs and nans, param b is optional hint
   
  var an=0, en=A.length-1, c=0 //anchor , end 
  
  if(b!==undefined){
    c=(en>>5)+1 
    var d = b-c
    if(d> 0){ if(A[d]<=v){ an=d }else{ if(A[d]>v){en=d-1} } }
    d=b+c
    if(d<en){ if(A[d]<=v){ an=d }else{ if(A[d]>v){en=d-1} } }
  }
    
  while( en-an>10 ){
    c=((an+en)>>1) 
    if(v<=A[c]){ en=c-1 }
    else{ 
      if(v>A[c]){ an=c }else{ break } //aborts for nan
    }
  }

  if( an===0 && !(A[0]<0||A[0]>=0) ){ //check for a non nan terminator
    while( !(v>=A[en] || en==-1) ){ en-- }
  }else{ 
    while( !(v>=A[en]) ){ en-- }
  }
  
  //~ if(en!==floorixdef(A,v)){
    //~ console.log("::::",en,floorixdef(A,v),v,A[en-1],A[en],A[en+1])
  //~ }
  
  return en 
}


//8 21 38

var aa=8,bb=9  ,cc=21

var Ara= Fdrandom.bulk(4 ,Fdrandom.range ,0 ,1000/4) //
var Arb= Fdrandom.bulk(8 ,Fdrandom.range ,0 ,1000/8) //
var Arc= Fdrandom.bulk(13 ,Fdrandom.range ,0 ,1000/13) //

var Ara= Fdrandom.bulk(aa ,Fdrandom.range ,0 ,1000/aa) //
var Arb= Fdrandom.bulk(bb ,Fdrandom.range ,0 ,1000/bb) //
var Arc= Fdrandom.bulk(cc ,Fdrandom.range ,0 ,1000/cc) //

for(var n=Ara.length,c=1;c<n;c++){ Ara[c]=Ara[c]+Ara[c-1] }
for(var n=Arb.length,c=1;c<n;c++){ Arb[c]=Arb[c]+Arb[c-1] }
for(var n=Arc.length,c=1;c<n;c++){ Arc[c]=Arc[c]+Arc[c-1] }


if(false){ //put undefineds in array
  for(var n=Arb.length,c=0;c<4;c++){ 
     Arb[n]=undefined
  }

  for(var n=Arb.length,c=0;c<n;c++){ 
    if(Fdrandom.f48()<0.2){ Arb[n]=undefined }
  }
}


var vmax = Arb[ Arb.length-1 ]
var cans = Fdrandom.bulk(400 ,Fdrandom.range ,0 ,vmax*1.1)

var zztestres=0

var binsearch = [

{
 desc:"floorixdef "+Ara.length+" rnd"
,code:"floorixdef rnd"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length;i<n;i++){
      r+=floorixdef(Ara,cans[i]) 
    }
    zztestres=r
  }
}
,
{
 desc:"floorex "+Ara.length+" check"
,code:"floorex check"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length;i<n;i++){
      r+=floorix(Ara,cans[i]) 
    }
    if(r!==zztestres){ console.log("Fell down",zztestres,r);zztestres=r }
  }
}
,
{
 desc:"floorex "+Ara.length+" seq"
,code:"floorex seq+"
,func:function()
  { var r=0;
    //r=floorix(Ara,cans[3])
    //console.log(cans[3],r,Ara[r],Ara[r+1])
    for(var i=0,n=cans.length>>2;i<n;i++){
      r=floorix(Ara,cans[i]*0.99) 
      r=floorix(Ara,cans[i],r) 
      r=floorix(Ara,cans[i],r) 
      r+=floorix(Ara,cans[i]*1.01,r) 
    }
    //~ if(r!==zztestres){ console.log("Fell down");zztestres=r }
  }
}
,
{
 desc:"floorex "+Ara.length+" rnd"
,code:"floorex rnd"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length>>2;i<n;i++){
      r=floorix(Ara,cans[i]*0.99) 
      r=floorix(Ara,cans[i]) 
      r=floorix(Ara,cans[i]) 
      r+=floorix(Ara,cans[i]*1.01) 
    }
    //~ if(r!==zztestres){ console.log("Fell down");zztestres=r }
  }
}
,
//~ {
 //~ desc:"floorixdef "+Arb.length+" rnd"
//~ ,code:"floorixdef rnd"
//~ ,func:function()
  //~ { var r=0;
    //~ for(var i=0,n=cans.length;i<n;i++){
      //~ r+=floorixdef(Arb,cans[i]) 
    //~ }
    //~ zztestres=r
  //~ }
//~ }
//~ ,
//~ {
 //~ desc:"floorex "+Arb.length+" check"
//~ ,code:"floorex check"
//~ ,func:function()
  //~ { var r=0;
    //~ for(var i=0,n=cans.length;i<n;i++){
      //~ r+=floorix(Arb,cans[i]) 
    //~ }
    //~ if(r!==zztestres){ console.log("Fell down");zztestres=r }
  //~ }
//~ }
//~ ,
{
 desc:"floorex "+Arb.length+" seq"
,code:"floorex seq"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length>>2;i<n;i++){
      r=floorix(Arb,cans[i]*0.99) 
      r=floorix(Arb,cans[i],r) 
      // console.log(r)
      r=floorix(Arb,cans[i],r) 
      r+=floorix(Arb,cans[i]*1.01,r) 
    }
    //~ if(r!==zztestres){ console.log("Fell down") }
  }
}
,
{
 desc:"floorex "+Arb.length+" rnd"
,code:"floorex rnd"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length>>2;i<n;i++){
      r=floorix(Arb,cans[i]*0.99) 
      r=floorix(Arb,cans[i]) 
      r=floorix(Arb,cans[i]) 
      r+=floorix(Arb,cans[i]*1.01) 
    }
    //~ if(r!==zztestres){ console.log("Fell down") }
  }
}
,
//~ {
 //~ desc:"floorixdef "+Arc.length+" rnd"
//~ ,code:"floorixdef rnd"
//~ ,func:function()
  //~ { var r=0;
    //~ for(var i=0,n=cans.length;i<n;i++){
      //~ r+=floorixdef(Arc,cans[i]) 
    //~ }
    //~ zztestres=r
  //~ }
//~ }
//~ ,



//~ {
 //~ desc:"floorex "+Arc.length+" seq"
//~ ,code:"floorex seq"
//~ ,func:function()
  //~ { var r=0;
    //~ for(var i=0,n=cans.length>>2;i<n;i++){
      //~ r=floorix(Arc,cans[i]*0.99) 
      //~ r=floorix(Arc,cans[i],r) 
      //~ r=floorix(Arc,cans[i],r) 
      //~ r+=floorix(Arc,cans[i]*1.01,r) 
    //~ }
    //~ // if(r!==zztestres){ console.log("Fell down") }
  //~ }
//~ }
//~ ,
//~ {
 //~ desc:"floorex "+Arc.length+" rnd"
//~ ,code:"floorex rnd"
//~ ,func:function()
  //~ { var r=0;
    //~ for(var i=0,n=cans.length>>2;i<n;i++){
      //~ r=floorix(Arc,cans[i]*0.99) 
      //~ r=floorix(Arc,cans[i]) 
      //~ r=floorix(Arc,cans[i]) 
      //~ r+=floorix(Arc,cans[i]*1.01) 
    //~ }
    //~ // if(r!==zztestres){ console.log("Fell down") }
  //~ }
//~ }

]


var testlist=[
 {rc:warmupset   ,ds:"warmup benchmarks"} ,
 {rc:binsearch   ,ds:"binsearch"}
]

var testlenseconds=1
dotests(testlist, testlenseconds )
