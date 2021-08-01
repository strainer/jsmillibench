//floating point almost equal comparisons
//see also chckaql.js

if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

var abs = Math.abs, pow=Math.pow,log2=Math.log,floor=Math.floor,max=Math.max

function aequal_long(a,b,c){
  c=c||1
  return abs(a-b) <= c * Number.EPSILON * Math.pow( 2,
        Math.floor( Math.log2( Math.max(abs(a),abs(b)) ) ) )
}

function aequal_fost(a,b,c,d){
  c=Math.abs((a+b)*(c||1))+0.125
  return  Math.abs(a-b) + c  === c
  
  //~ return ( (a-b) + Math.max(abs(a),abs(b))*c*2 ) === Math.max(abs(a),abs(b))*c*2
}

function aequal_fast(a,b,c,d){
  var e = (a+b)*(c||1)+d
  return  a-b + e  === e
  //~ return ( (a-b) + Math.max(abs(a),abs(b))*c*2 ) === Math.max(abs(a),abs(b))*c*2
}



//~ var a=1.4580724465356933 
//~ var b=1.458072446535694
//~ var c=2
//~ conlog(aequal_fast(a,b,c))
//~ conlog(aequal_fast(b,a,c))
//~ conlog(aequal_fast(-a,-b,c))
//~ return


function aequal_short(a,b,c){
  //conlog(abs(a-b),Number.EPSILON)
  //~ return abs(a-b) <= Number.EPSILON*2 
  c=c||1
  return abs(a-b) < c*Number.EPSILON* Math.max(abs(a),abs(b))
}

function aequal_gaurd(a,b,c){
  c=c||1
  var threshold = Number.EPSILON
  var guard = threshold/Number.EPSILON
  return  a + guard == b + guard 
}



  
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

var almosteas =[
  { desc:"minim loop"
   ,code:"if(i=i+Eps) r++"
   ,func:function (){
      var r=0
      for(var i=0.5;i<1000;i++)
      { if(i==i+Number.EPSILON) r++ }
      return r
    }
  }
 ,{ desc:"aequal long"
   ,code:"aequal_long()"
   ,func:function (){
      var r=0
      for(var i=0.5;i<1000;i++)
      { if(aequal_long(0.2,i)) r++ }
      return r
    }
  }
 ,{ desc:"aequal short"
   ,code:"aequal_short()"
   ,func:function (){
      var r=0
      for(var i=0.5;i<1000;i++)
      { if(aequal_short(0.2,i)) r++ }
      return r
    }
  }
 ,{ desc:"aequal fast"
   ,code:"aequal_fast()"
   ,func:function (){
      var r=0
      for(var i=0.5;i<1000;i++)
      { if(aequal_fast(0.2,i)) r++ }
      return r
    }
  }
 ,{ desc:"aequal gaurd"
   ,code:"aequal_gaurd()"
   ,func:function (){
      var r=0
      for(var i=0.5;i<1000;i++)
      { if(aequal_gaurd(0.2,i))r++ }
      return r
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

 {rc:warmup     ,ds:"warmup benchmarks"}
,{rc:almosteas ,ds:"almostequal"}
 
]

var testlenseconds=2
dotests(testlist, testlenseconds )
