
if(typeof window ==='undefined'){
  Fdrandom=require ('./dlib/Fdrandom.js')
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
}


/// // // // // // // // // // // ///
/// return value test functions:  ///
/// // // // // // // // // // // ///

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
 desc:"returned through const object"
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
 desc:"returned through const Array"
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


var testlist=[
 {rc:warmupset     ,ds:"warmupset benchmarks"}
,{rc:resreturn  ,ds:"result passing"}
]

var testlenseconds=1

dotests(testlist, testlenseconds )
