if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

var abs = Math.abs

function aequal_long(a,b,c){
  c=c||1
  return abs(a-b) <= c * Number.EPSILON * Math.pow( 2,
        Math.floor( Math.log2( Math.max(abs(a),abs(b)) ) ) )
}

function aequal_short(a,b,c){
  //conlog(abs(a-b),Number.EPSILON)
  //~ return abs(a-b) <= Number.EPSILON*2 
  c=c||1
  return abs(a-b) < c*Number.EPSILON* Math.max(abs(a),abs(b))
}


function aequal_fast(a,b,c){
  c=c||1
  return a<b?( (a-b) + (a+b)*c ) == (a+b)*c
            :( (b-a) + (a+b)*c ) == (a+b)*c
  //~ return ( (abs(a)-abs(b)) + (abs(a)+abs(b))*c ) == (abs(a)+abs(b))*c
}

function aequal_gaurd(a,b,c){
  c=c||1
  var threshold = Number.EPSILON
  var guard = threshold/Number.EPSILON
  return  a + guard == b + guard 
}

p=Fdrandom.pot()

var tries=10000000
var tries=1000,trange=3,tulps=4,tsu=2
 
var r_long=0 ,r_long_neg=0
var r_short=0,r_short_near=0,r_short_neg=0
var r_fast=0, r_fast_near=0, r_fast_neg =0
var r_gaurd=0,r_gaurd_near=0,r_gaurd_neg=0
var f_asym=0,l_asym=0

function pr_results(){
  
  conlog("Test ",tries,", rang",trange,", tulps",tulps,", dist",tsu )
  conlog("long aeq",cen(r_long)," noe",cen(tries-r_long))
  
  conlog("fast good", cen(r_fast), " near", cen(r_fast_near)," bad",cen(r_fast_neg))

  if(f_asym) conlog("fAsymetry:",f_asym )
  if(l_asym) conlog("lAsymetry:",l_asym )
  //~ conlog("short good", cen(r_short), " near", cen(r_short_near)," bad",cen(r_short_neg))
    
  //~ conlog("gaurd good", cen(r_gaurd), " near", cen(r_gaurd_near)," bad",cen(r_gaurd_neg))
 
  function cen(a){
    return (a*100/tries).toFixed(3)
    //~ return ""+(a*100/tries).toFixed(6)+""+(a<tries)?"!!":""
  }

}

for( var j=0; j<tries; j++){
    
  var u = p.range(-trange,trange)
  var v = u + Number.EPSILON * ( p.range(-tulps*tsu,tulps*tsu) )

  var t_long  = aequal_long(u,v,tsu)
  var t_short = aequal_short(u,v,tsu)
  var t_fast  = aequal_fast(u,v,tsu)
  var t_gaurd = aequal_gaurd(u,v,tsu)
  
  if( t_long ){ r_long++ }else { r_long_neg++ }
  
  if( t_long==t_short ){ r_short++ } 
  else { 
   var neg=0 
    if(!t_short){
      if(aequal_short(u,v,tsu+1)){
        r_short_near++
      }else neg=1
    }
    if(t_short&&tsu>1){
      if(!aequal_short(u,v,tsu-1)){
        r_short_near++
      }else neg=1
    }
    
    if(neg){
      var ul= tsu * Number.EPSILON * Math.pow( 2,
              Math.floor( Math.log2( Math.max(abs(u),abs(v)) ) ))
      r_short_neg++
      //conlog(u,tsu,ul,t_long?"?>":"?<",u-v)
    }
    
  }

  if(!(aequal_fast(u,v,tsu+1)
    &&aequal_fast(v,u,tsu+1)
    //~ &&aequal_fast(-v,-u,tsu+1)
    )
  ){ 
    conlog("asym:",u,v,u>v)
    f_asym++; 
  }

  if(!(aequal_long(u,v,tsu+1)
    &&aequal_long(v,u,tsu+1)
    //~ &&aequal_long(-v,-u,tsu+1)
    )
  ){ 
    //~ conlog("asym:",u,v,u>v)
    l_asym++; 
  }
  
  if( t_long==t_fast ){ r_fast++ } 
  else { 
   var neg=0 
    if(!t_fast){
      if(aequal_fast(u,v,tsu+1)){
        r_fast_near++
      }else r_fast_neg++
    }
    if(t_fast){
      if(tsu<2){ r_fast_neg++ }
      else{
        if(!aequal_fast(u,v,tsu-1)){
          r_fast_near++
        }else r_fast_neg++
      }
    }
    
    var ul= tsu * Number.EPSILON * Math.pow( 2,
            Math.floor( Math.log2( Math.max(abs(u),abs(v)) ) ))
      
    conlog("u"+tsu,u,u-v,t_long?"ye":"no",ul)
  }
  
  if( t_long==t_gaurd ){ r_gaurd++ } 
  else { 
    if(!t_gaurd){
      if(aequal_gaurd(u,v,tsu+1)){
        r_gaurd_near++
      }else r_gaurd_neg++
    }
    if(t_gaurd&&tsu>1){
      if(!aequal_gaurd(u,v,tsu-1)){
        r_gaurd_near++
      }else r_gaurd_neg++
    }
  }
}

pr_results()
  
return

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
      for(var i=0.5;i<1000;i++)
      { if(i==i+Number.EPSILON) r++ }
      return r
    }
  }
 ,{ desc:"aequal long"
   ,code:"aequal_long()"
   ,func:function (){
      for(var i=0.5;i<1000;i++)
      { if(aequal_long(0.2,i)) r++ }
      return r
    }
  }
 ,{ desc:"aequal short"
   ,code:"aequal_short()"
   ,func:function (){
      for(var i=0.5;i<1000;i++)
      { if(aequal_short(0.2,i)) r++ }
      return r
    }
  }
 ,{ desc:"aequal fast"
   ,code:"aequal_fast()"
   ,func:function (){
      for(var i=0.5;i<1000;i++)
      { if(aequal_fast(0.2,i)) r++ }
      return r
    }
  }
 ,{ desc:"aequal gaurd"
   ,code:"aequal_gaurd()"
   ,func:function (){
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
