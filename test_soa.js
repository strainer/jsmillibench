
if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}
 
 
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



//8 21 38

_slow=0

function slow(){
  for(var i=0;i<1000000;i++){ _slow=(10+_slow+i)/i } 
}


  var soa=[[],[],[],[],[],[]]
  var aos=[]


function makeacc(e){
  
  
  var ff=Fdrandom.f48
  
  for(var c=0;c<e;c++){
    
    var d= { a:ff(),b:ff(),c:ff(),d:ff(),e:ff(),f:ff() }
    
    aos[c]=d
    
    soa[0][c]=d.a ,soa[1][c]=d.b ,soa[2][c]=d.c,
    soa[3][c]=d.d ,soa[4][c]=d.e ,soa[5][c]=d.f
  }	
  
  var eh=e>>1 , q, p
  for(var c=0;c<eh;c++){
    q=aos[c] , aos[c]=aos[c+eh],aos[c+eh]=q
    
    p=soa[0][c] , soa[0][c]=soa[0][c+eh],soa[0][c+eh]=p
    p=soa[1][c] , soa[1][c]=soa[1][c+eh],soa[1][c+eh]=p
    p=soa[2][c] , soa[2][c]=soa[2][c+eh],soa[2][c+eh]=p
    p=soa[3][c] , soa[3][c]=soa[3][c+eh],soa[3][c+eh]=p
    p=soa[4][c] , soa[4][c]=soa[4][c+eh],soa[4][c+eh]=p
    p=soa[5][c] , soa[5][c]=soa[5][c+eh],soa[5][c+eh]=p
  }
  
}


function access_soa(c){
  return soa[0][c]+soa[1][c]+soa[2][c]+soa[3][c]+soa[4][c]+soa[5][c]	
}

function access_aos(c){
  return aos[c].a+aos[c].b+aos[c].c+aos[c].d+aos[c].e+aos[c].f
}

function access1_soa(c){
  return soa[3][c]	
}

function access1_aos(c){
  return aos[c].d
}



var zztestres

var elen=10000
//~ var elen=10
makeacc(elen)



var cans= Fdrandom.bulk(50000 ,Fdrandom.irange ,0 ,elen-1) //
//~ var cans= Fdrandom.bulk(10 ,Fdrandom.irange ,0 ,elen-1) //

//~ console.log(aos)
//~ console.log(soa)
//~ console.log(cans)

//~ return

var soaaos = [

{
 desc:"soa "
,code:"soa"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length;i<n;i++){
      r+=access_soa(cans[i]) 
    }
    
    return r
    //~ slow()
    //~ console.log(r)
  }
}
,
{
 desc:"aos "
,code:"aos"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length;i<n;i++){
      r+=access_aos(cans[i]) 
    }
    return r
    //~ slow()
    //~ console.log(r) 
  }
}
,
{
 desc:"soa "
,code:"soa 1"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length;i<n;i++){
      r+=access1_soa(cans[i]) 
    }
    
    return r
    //~ slow()
    //~ console.log(r)
  }
}
,
{
 desc:"aos "
,code:"aos 1"
,func:function()
  { var r=0;
    for(var i=0,n=cans.length;i<n;i++){
      r+=access1_aos(cans[i]) 
    }
    return r
    //~ slow()
    //~ console.log(r) 
  }
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
      bench(trc.func, tim, "   "+trc.desc, 0)
    }
  }
}

var testlist=[

 {rc:warmup     ,ds:"warmup benchmarks"} ,
 {rc:soaaos   ,ds:"soaaos"} 
 //firefox 50 aos 80% faster than soa
 //v8 2015 aos 40% slower than soa
 //
 //firefox must arrange efficient small object unpacking
 //firefox aos 50% slower than soa when accessing only 1 out 6 feilds
 //basic array access speeds were same for ff and v8
 //it appears aos can benefit from reduced array lookups
 //if feild packing and unpacking is optimised by engine
]

var testlenseconds=1
dotests(testlist, testlenseconds )
