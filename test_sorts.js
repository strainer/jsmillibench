/// example tests

if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js').hot()
}

function clonarr(Ai){
  var Ao=new Array(Ai.length); //fg.length=TESTAR.length
  for(var i=0,e=Ai.length;i<e;i++){
    Ao[i]=Ai[i]
  }
  return Ao
}


/// test control arrays 
var rghlen=300
var rgh=Fdrandom.bulk( rghlen,function(){ return Fdrandom.irange(0,1000) } )

var r30=new Array(20), ii=0 
var r100=new Array(100)
var r300=new Array(300)

rghlen-=1

var sort30 =[

  { desc:"sort 30n"
   ,code:"r30.sort"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      r30.sort( function(a,b){return a-b} )

      return r30[1]
    }
  }
  , 
  { desc:"isort 30n"
   ,code:"insertsort"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort(r30)

      return r30[1]
    }
  } 
  , 
  { desc:"isort0 30n"
   ,code:"insertsort0"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort0(r30)

      return r30[1]
    }
  }
  , 
  { desc:"isort0pre 30n"
   ,code:"insertsort0pre"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r30)
      insertsort0(r30)

      return r30[1]
    }
  }
  , 
  { desc:"isort0 30n"
   ,code:"insertsort3"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort3(r30)

      return r30[1]
    }
  }
  , 
  { desc:"isort0 30n"
   ,code:"insertsort4"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort4(r30)

      return r30[1]
    }
  } 
  , 
  { desc:"isort0 30n"
   ,code:"insertsort5"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort5(r30)

      return r30[1]
    }
  }
]


var sort100 =[

  { desc:"sort 100n"
   ,code:"r100.sort"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      r100.sort( function(a,b){return a-b} )

      return r100[1]
    }
  }
  /*
  , 
  { desc:"insort 100n"
   ,code:"insertsort 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort(r100)

      return r100[1]
    }
  } 
  , 
  { desc:"insort 100n"
   ,code:"insertsort pre 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r100)
      insertsort(r100)

      return r100[1]
    }
  } 
  */
  , 
  { desc:"isort0 100n"
   ,code:"insertsort0"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort0(r100)

      return r100[1]
    }
  }
  , 
  { desc:"isort0 pre 100n"
   ,code:"insertsort0 pre 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r100)
      insertsort0(r100)

      return r100[1]
    }
  }
  , 
  { desc:"isort0 pre2 100n"
   ,code:"insertsort0 pre2 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap2(r100)
      insertsort0(r100)

      return r100[1]
    }
  }
  , 
  { desc:"isort0 pre3 100n"
   ,code:"insertsort0 pre3 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r100)
      insertsort0(r100)

      return r100[1]
    }
  }
  , 
  { desc:"insertsort5 100n"
   ,code:"insertsort5 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort5(r100)

      return r100[1]
    }
  }
  , 
  { desc:"insertsort5 pre 100n"
   ,code:"insertsort5 pre 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r100)
      insertsort5(r100)

      return r100[1]
    }
  } 
  , 
  { desc:"insertsort5 pre2 100n"
   ,code:"insertsort5 pre2 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap2(r100)
      insertsort5(r100)

      return r100[1]
    }
  } 
  , 
  { desc:"insertsort5 pre3 100n"
   ,code:"insertsort5 pre3 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r100)
      insertsort5(r100)

      return r100[1]
    }
  }
  
]


var sort300 =[

  { desc:"sort 300n"
   ,code:"r300.sort"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      r300.sort( function(a,b){return a-b} )

      return r300[1]
    }
  }
  /*
  , 
  { desc:"insort 300n"
   ,code:"insertsort"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort(r300)

      return r300[1]
    }
  } 
  , 
  { desc:"insort 300n"
   ,code:"insertsort pre"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r300)
      insertsort(r300)

      return r300[1]
    }
  } 
  */
  , 
  { desc:"isort0 300n"
   ,code:"insertsort0 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort0(r300)

      return r300[1]
    }
  }
  , 
  { desc:"isort0 pre 300n"
   ,code:"insertsort0 pre 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r300)
      insertsort0(r300)

      return r300[1]
    }
  }
  , 
  { desc:"isort0 pre2 300n"
   ,code:"insertsort0 pre2 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap2(r300)
      insertsort0(r300)

      return r300[1]
    }
  }
  , 
  { desc:"isort0 pre3 300n"
   ,code:"insertsort0 pre3 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r300)
      insertsort0(r300)

      return r300[1]
    }
  }
  , 
  { desc:"insertsort5 300n"
   ,code:"insertsort5 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      insertsort5(r300)

      return r300[1]
    }
  }
  , 
  { desc:"insertsort5 pre 300n"
   ,code:"insertsort5 pre 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r300)
      insertsort5(r300)

      return r300[1]
    }
  } 
  , 
  { desc:"insertsort5 pre2 300n"
   ,code:"insertsort5 pre2 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap2(r300)
      insertsort5(r300)

      return r300[1]
    }
  } 
  , 
  { desc:"insertsort5 pre3 300n"
   ,code:"insertsort5 pre3 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r300)
      insertsort5(r300)

      return r300[1]
    }
  }
  
]


var tak =[

  { desc:"insertsort5 300n"
   ,code:"insertsort5 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap(r300)
      insertsort5(r300)

      return r300[1]
    }
  }
  ,
  { desc:"insertsort5 pre 300n"
   ,code:"insertsort5 pre 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r300)
      insertsort5(r300)

      return r300[1]
    }
  }
  ,
  { desc:"insertsort5 pre2 300n"
   ,code:"insertsort5 pre2 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap2(r300)
      insertsort5(r300)

      return r300[1]
    }
  } 
  ,
  { desc:"insertsort5 pre3 300n"
   ,code:"insertsort5 pre3 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r300)
      insertsort5(r300)

      return r300[1]
    }
  } 
  ,
  { desc:"insertsort5 30n"
   ,code:"insertsort5 30"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap(r100)
      insertsort5(r30)

      return r30[1]
    }
  }
  ,
  { desc:"insertsort5 pre 30n"
   ,code:"insertsort5 pre 30"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r30)
      insertsort5(r30)

      return r30[1]
    }
  }
  ,
  { desc:"insertsort5 100n"
   ,code:"insertsort5 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap(r100)
      insertsort5(r100)

      return r100[1]
    }
  }
  ,
  { desc:"insertsort5 pre 100n"
   ,code:"insertsort5 pre 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r100)
      insertsort5(r100)

      return r100[1]
    }
  }
  ,
  { desc:"insertsort5 pre2 100n"
   ,code:"insertsort5 pre2 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap2(r100)
      insertsort5(r100)

      return r100[1]
    }
  } 
  
  ,
  { desc:"insertsort5 pre3 100n"
   ,code:"insertsort5 pre3 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r100)
      insertsort5(r100)

      return r100[1]
    }
  } 
  
]

var tak2 =[

  //~ { desc:"insertsort5 300n"
   //~ ,code:"insertsort5 300"
   //~ ,func:function (){
      //~ for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ insertsort5(r300)

      //~ return r300[1]
    //~ }
  //~ }
  //~ ,
  //~ { desc:"insertsort5 pre 300n"
   //~ ,code:"insertsort5 pre 300"
   //~ ,func:function (){
      //~ for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap(r300)
      //~ insertsort5(r300)

      //~ return r300[1]
    //~ }
  //~ }
  //~ ,
  //~ { desc:"insertsort5 pre2 300n"
   //~ ,code:"insertsort5 pre2 300"
   //~ ,func:function (){
      //~ for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap2(r300)
      //~ insertsort5(r300)

      //~ return r300[1]
    //~ }
  //~ } 
  //~ ,
  { desc:"insertsort5 pre3 300n"
   ,code:"insertsort5 pre3 300"
   ,func:function (){
      for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r300)
      insertsort5(r300)

      return r300[1]
    }
  } 
  //~ ,
  //~ { desc:"insertsort5 30n"
   //~ ,code:"insertsort5 30"
   //~ ,func:function (){
      //~ for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ insertsort5(r30)

      //~ return r30[1]
    //~ }
  //~ }
  ,
  { desc:"insertsort5 pre3 30n"
   ,code:"insertsort5 pre3 30"
   ,func:function (){
      for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap(r30)
      insertsort5(r30)

      return r30[1]
    }
  }
  //~ ,
  //~ { desc:"insertsort5 100n"
   //~ ,code:"insertsort5 100"
   //~ ,func:function (){
      //~ for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap(r100)
      //~ insertsort5(r100)

      //~ return r100[1]
    //~ }
  //~ }
  //~ ,
  //~ { desc:"insertsort5 pre 100n"
   //~ ,code:"insertsort5 pre 100"
   //~ ,func:function (){
      //~ for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap(r100)
      //~ insertsort5(r100)

      //~ return r100[1]
    //~ }
  //~ }
  //~ ,
  //~ { desc:"insertsort5 pre2 100n"
   //~ ,code:"insertsort5 pre2 100"
   //~ ,func:function (){
      //~ for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      //~ preswap2(r100)
      //~ insertsort5(r100)

      //~ return r100[1]
    //~ }
  //~ } 
  
  ,
  { desc:"insertsort5 pre3 100n"
   ,code:"insertsort5 pre3 100"
   ,func:function (){
      for(var i=0;i<100;i++){ r100[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
      
      preswap3(r100)
      insertsort5(r100)

      return r100[1]
    }
  } 
  
]

/// Sorts :

var testlist=[
 {rc:warmupset       ,ds:"warmup benchmarks"}
//~ ,{rc:sort30          ,ds:"sort 30"}
//~ ,{rc:sort100         ,ds:"sort 100"}
,{rc:tak         ,ds:"tak"}
//~ ,{rc:tak2         ,ds:"tak2"}
//~ ,{rc:sort300         ,ds:"sort 300"}
]

var testlenseconds=2
dotests(testlist, testlenseconds )
return

var swtot=0

function zow(){
  for(var i=0;i<300;i++){ r300[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
  
  preswap(r300)
  insertsort5(r300)

  return r300[1]
}

for(var i=0;i<10;i++) zow()

conlog(swtot)
return

// 452 swaps in 7
// expect avg 64 per 


for(var i=0;i<30;i++){ r30[i]= rgh[ ii=(ii<rghlen)?ii+1:0 ] }
//~ for(var i=0;i<30;i++){ r30[i]= 30-i }

conlog(r30.join(" "))

preswap(r30)
conlog(r30.join(" "))
/*
var testlen=50000

var rough=Fdrandom.mixof(Fdrandom.bulk( 500,function(){return Fdrandom.irange(0,1000)} ),Math.floor(testlen))

insertsort0( rough )

return
*/


function preswap(A){
  //flip
  var ce=A.length, sw=0, q=A[0]
  var cd=ce-1
  var flush=true
  
  if(A[0]>A[cd]){
    sw++
    A[0]=A[cd]
    A[cd]=q
  }
  
  cd--
  for(var ca=1 ;cd>ca; cd--,ca++){
    if( A[cd]<A[ca] ) { 
      q=A[cd]; A[cd]=A[ca] ; A[ca]=q
      sw++
    }
    if( flush && A[ca-1]>A[ca] ) flush=false
  }
  
  if(flush) { conlog("flush"); return true } //exiting sequence is sorted
  //~ if(sw*4<ce) {return false}
  //~ conlog(sw)
  //scan2

  var steps = [ 3.3,3.9,4.9,5 ]
  sw=-0
  
  //~ best for 300 is 5.5  norm sw *1.5  is 1.5
  //~ best for 100 is 3.0  norm sw *1.5  is 0.9
  
  //~ 300/x +y = 4
  //~ 100/x +y = 2.1
  //~ 200/x    = 1.9
  //~ 100/(100) + 1.7 = 2.3
  //~ 100/(90) + 2 = 3.1
  
  var sfin = ce/115 + 1
  var bsw=0.9, stp=3.4
  var fce = 1.5/ce
  
  while(bsw<sfin){
    stp=stp*1.3
    for(var cc=0, cd=Math.floor(1+ce/stp) ;cd<ce; cc++,cd++){
      if( A[cd]<A[cc] ) { 
        q=A[cd]; A[cd]=A[cc] ; A[cc]=q
        sw++
      }
    }
    bsw=bsw+1-sw*fce
    //~ swtot+=sw, approx 64 per 300n sweep
    sw=0
  }
}
// 64 /300   sw/ce for equal dist is about 0.2
//if sfin is 0.8 less, 6 * 0.2 is 1.2
//if sfin is 0.8 less, 6 * 0.2 * is 1.2



function preswap3(A){
  //flip
  var ce=A.length, sw=0, q=A[0]
  var cd=ce-1
  var flush=true
  
  if(A[0]>A[cd]){
    sw++
    A[0]=A[cd]
    A[cd]=q
  }
  
  cd--
  for(var ca=1 ;cd>ca; cd--,ca++){
    if( A[cd]<A[ca] ) { 
      q=A[cd]; A[cd]=A[ca] ; A[ca]=q
      sw++
    }
    if( flush && A[ca-1]>A[ca] ) flush=false
  }
  
  if(flush) { conlog("flush"); return true } //exiting sequence is sorted
  //~ if(sw*4<ce) {return false}
  //~ conlog(sw)
  //scan2

  sw=-0
  
  //~ best for 300 is 5.5  norm sw *1.5  is 1.5
  //~ best for 100 is 3.0  norm sw *1.5  is 0.9
  
  //~ 300/x +y = 4
  //~ 100/x +y = 2.1
  //~ 200/x    = 1.9
  //~ 100/(100) + 1.7 = 2.3
  //~ 100/(90) + 2 = 3.1
 
  var bsw=1.2 
  var stp=2.5+Math.sqrt(ce)/12
  
  var trsw=0.55 //trigger swaps per n
  var fce = 1/(ce*trsw)
  if (ce<50) bws=1
  
  while(bsw>1.1){
    stp=stp*1.3
    for(var cc=0, cd=Math.floor(1+ce/stp) ;cd<ce; cc++,cd++){
      if( A[cd]<A[cc] ) { 
        q=A[cd]; A[cd]=A[cc] ; A[cc]=q
        sw++
      }
    }
    bsw=(bsw*1.5 + sw*fce)/2.01
    //~ swtot+=sw, approx 64 per 300n sweep
    sw=0
  }
}


// 64 /300   sw/ce for equal dist is about 0.2
// 0.2 swaps per n is approx ideal average over all sweeps
// less than 0.1 swaps per n recent average may be ideal exit


function preswap2(A){
  //flip
  var ce=A.length, sw=0, q=A[0]
  var cd=ce-1
  var flush=true
  
  if(A[0]>A[cd]){
    sw++
    A[0]=A[cd]
    A[cd]=q
  }
  
  cd--
  for(var ca=1 ;cd>ca; cd--,ca++){
    if( A[cd]<A[ca] ) { 
      q=A[cd]; A[cd]=A[ca] ; A[ca]=q
      sw++
    }
    if( flush && A[ca-1]>A[ca] ) flush=false
  }
  
  if(flush) { conlog("flush"); return true } //exiting sequence is sorted
  //~ if(sw*4<ce) {return false}
  //~ conlog(sw)
  //scan2

  var steps = [ 3.3,3.9,4.9,5 ]
  sw=-0
  
  //~ var sfin = ce/152 + 0.3
  //~ var sfin = ce/50+0.5    //best for 300/50 = 6 + 0.5
  //~ var sfin = ce/50 + 1.5      //best for 100/50 = 2 + 1.5
  var sfin = ce/66 + 0.9      //tuned at 100 and 300n
  var bsw=-0, stp=3.4
  while(true){
    stp=stp*1.3
    for(var cc=0, cd=Math.floor(1+ce/stp) ;cd<ce; cc++,cd++){
      if( A[cd]<A[cc] ) { 
        q=A[cd]; A[cd]=A[cc] ; A[cc]=q
        sw++
      }
    }
    bsw=bsw+1-(sw/ce)*0.1
    if(bsw>sfin) {return false}
    sw=0
  }

}

function preswapx(A){
  //flip
  var ce=A.length, sw=0, q=A[0]
  var cd=ce-1
  var flush=true
  
  if(A[0]>A[cd]){
    sw++
    A[0]=A[cd]
    A[cd]=q
  }
  
  cd--
  for(var ca=1 ;cd>ca; cd--,ca++){
    if( A[cd]<A[ca] ) { 
      q=A[cd]; A[cd]=A[ca] ; A[ca]=q
      sw++
    }
    if( flush && A[ca-1]>A[ca] ) flush=false
  }
  
  if(flush) { conlog("flush"); return true } //exiting sequence is sorted
  //~ if(sw*4<ce) {return false}
  //~ conlog(sw)
  //scan2

  var steps = [ 7,6,5,7,4,6,5,3,5,6,4,5,3,4,3,2,3,2,3,2,3,2,3,2,3,2,3 ]
  sw=0
  
  var sfin = ce/150 + 1.3
  var bsw=sfin*0.5
  for(var stp=0; stp<steps.length; stp++){
    
    for(var cc=0, cd=Math.floor(ce/steps[stp]+1) ;cd<ce; cc++,cd++){
      if( A[cd]<A[cc] ) { 
        q=A[cd]; A[cd]=A[cc] ; A[cc]=q
        sw++
      }
    }
    bsw=(bsw+2*sw)/3
    if(bsw<sfin) {return false}
    sw=0
  }

}


function insertsort(A){ // best for 8 to 20 elements iirc
  
  for(var e=A.length ,dueway=1 ;dueway<e; dueway++){
    var pick = A[dueway]
    var bacway =dueway-1
    while( bacway>=0 && A[bacway] > pick){ //if pre is smaller
      A[bacway+1] = A[bacway]              //
      bacway = bacway - 1
    }
    A[bacway+1] = pick                     //put pick down
  }

}


//relative performance on mixed distribution
//len  sort  insert  insert2
//10   100   800     850
//30   100   230     300
//60   100   130     180
//120  100   115     145
//200  100    70     100
//350  100    50      70
//1000 100    20      30

//on equal distribution:
//len  sort  insert  insert2
//50   100   100     120
//100  100   55      80
//200  100   25      40
//350  100   15      25
//
//insert2 is 50-80% faster than insert1 on equal distributions
//insert2 is 60% faster than insert1 on hard distributions
//insert2 is 10% slower than insert1 on easiest distributions
// 
function insertsort2(A){ // best for 8 to 20 elements iirc
  
  var ej=A.length, ek=Math.floor(ej/2)-1
  
  for(var e=ek ,dueway=1 ;dueway<e; dueway++){
    var pick = A[dueway] //if pick is small it will move back
    if( pick > A[dueway+ek] ){ pick=A[dueway+ek];A[dueway+ek]=A[dueway] }
    var bacway =dueway-1 //while all shift up
    while( bacway>=0 && A[bacway] > pick){ //if pick is smaller
      A[bacway+1] = A[bacway--]              //move move them up
    }
    A[bacway+1] = pick        //put pick down its larger
  }
  
  for(var e=ej ,dueway=ek ;dueway<e; dueway++){
    var pick = A[dueway] //if pick is small it will move back
    var bacway =dueway-1 //while all shift up
    while( bacway>=0 && A[bacway] > pick){ //if pick is smaller
      A[bacway+1] = A[bacway--]              //move move them up
    }
    A[bacway+1] = pick        //put pick down its larger
  }
  
}
 
 
function insertsort3(A){ // best for 8 to 20 elements iirc
  
  //~ var ej=A.length, ek=Math.floor(ej/2)-1
  var ej=A.length, ek=Math.floor(3*(ej+2)/8)
  
  for(var dueway=1 ;dueway<ek; dueway++){
    var pick = A[dueway] //if pick is small it will move back
    if( pick > A[ej-dueway] ){ pick=A[ej-dueway];A[ej-dueway]=A[dueway] }
    var bacway =dueway-1 //while all shift up
    while( bacway>=0 && A[bacway] > pick){ //if pick is smaller
      A[bacway+1] = A[bacway--]              //move move them up
    }
    A[bacway+1] = pick        //put pick down its larger
  }
  
  for(var dueway=ek ;dueway<ej; dueway++){
    var pick = A[dueway] //if pick is small it will move back
    var bacway =dueway-1 //while all shift up
    while( bacway>=0 && A[bacway] > pick){ //if pick is smaller
      A[bacway+1] = A[bacway--]              //move move them up
    }
    A[bacway+1] = pick        //put pick down its larger
  }
  
}


//its 0 to 5% slower than insert3, 30 to 40% faster than insert0
//half the code length of insert0
function insertsort4(A){ 
  
  var ej=A.length, ek=Math.floor(ej*0.375)
  
  for(var bacwd=0,duewd=1 ;duewd<ej; bacwd=duewd++){
    var pick = A[duewd] //if pick is small it will move back
    if( duewd<ek && pick > A[ej-duewd] ) //this tweak <5% slower on easy cases
    { pick=A[duewd];A[ej-duewd]=A[duewd] } //upto 60% faster on hard cases
    while( bacwd>=0 && A[bacwd] > pick){ //if pick is smaller
      A[bacwd+1] = A[bacwd--]            //move them up till 
    }
    A[bacwd+1] = pick                    //pick is larger
  }
}


//its 0 to 5% slower than insert3, 30 to 40% faster than insert0
//half the code length of insert0
function insertsort0(A){ 
  
  var ej=A.length, ek=Math.floor(ej*0.375)
  
  for(var bacway=0,dueway=1 ;dueway<ej; bacway=dueway++){
    var pick = A[dueway] 
    if( dueway<ek && pick > A[ej-dueway] )
    { pick=A[ej-dueway];A[ej-dueway]=A[dueway] 
      if( pick > A[ek+dueway] ) 
      { A[dueway]=pick  //dueway is  free/overwritten by pick
        pick=A[ek+dueway]
        A[ek+dueway]=A[dueway]
      }
    }
    while( bacway>=0 && A[bacway] > pick){ //if pick is smaller
      A[bacway+1] = A[bacway--]              //move move them up
    }
    A[bacway+1] = pick        //put pick down its larger
  }
}


function insertsort5(Ai,st,ov){ 
  
  st=st||0
  //~ if(ov===undefined){ ov=Ai.length }
  ov=ov||Ai.length
  var hf=st+Math.floor((ov-st)*0.375)
  
  for(var bacwd=st,duewd=st+1 ;duewd<ov; bacwd=duewd++){
    var pick = Ai[duewd] //if pick is small it will move back
    if( duewd<hf && pick > Ai[ov-duewd] )
    { pick=Ai[ov-duewd];Ai[ov-duewd]=Ai[duewd] }
    while( bacwd>=st && Ai[bacwd] > pick){ //if pick is smaller
      Ai[bacwd+1] = Ai[bacwd--]              //move move them up
    }
    Ai[bacwd+1] = pick        //put pick down its larger
  }
}


function inpairsort(Av,Ax,s,e,a){ 
  
  var bacway=0, xdua=0, xdub=0, baced=0
     ,f=s+((e-s)>>>1)*2
  
  var duewa=s,duewb=s+1
  while( duewb<f ){
          
    bacway= duewa-1
    xdua = Ax[duewa] 
    
    if(compar(Av[xdua],Av[Ax[duewb]])){
      Ax[duewa]=Ax[duewb] ,Ax[duewb]=xdua ,xdua=Ax[duewa] 
    }
    xdub = Ax[duewb] 
          
    while( bacway>=a && compar(Av[Ax[bacway]] , Av[xdub])){ //if pre is smaller
      Ax[bacway+2] = Ax[bacway]              //
      bacway--
      //~ //moved++
    }	
    if(bacway<a){ baced++ }
    Ax[bacway+2] = xdub
    
    while( bacway>=a && compar(Av[Ax[bacway]] , Av[xdua])){ //if pre is smaller
      Ax[bacway+1] = Ax[bacway]              //
      bacway--
    }
    if(bacway<a){ baced++ }
    Ax[bacway+1] = xdua
    
    duewa+=2,duewb+=2
  }
   
  if(f!==e){
    xdua=Ax[e-1]
    bacway=e-2
      
    while( bacway>=a && compar(Av[Ax[bacway]], Av[xdua])){ //if pre is smaller
      Ax[bacway+1] = Ax[bacway]              //
      bacway--
    }	
    if(bacway<a){ baced++ }
    Ax[bacway+1] = xdua 
  }
  
  return baced 
}
