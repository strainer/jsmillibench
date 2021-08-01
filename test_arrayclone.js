
if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}


/// for array cloning 
var testarlen=300
var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.range(-1000,1000) } )
//~ var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.mixof("abcdefghij","",Fdrandom.irange(0,9)) } )

function aclone(Ai){
  var Ao=new Array(Ai.length); //fg.length=TESTAR.length
  for(var i=0,e=Ai.length;i<e;i++){
    Ao[i]=Ai[i]
  }
  return Ao
}

var arrayclone =[
  //~ { desc:"clone array"
   //~ ,code:"array.slice()"
   //~ ,func:function (){
     //~ var r=2.5,fg=TESTAR.slice()
     //~ for(var i=0;i<100;i+=25)
     //~ { r+=fg[i] }
     //~ return r	
   //~ }
  //~ }
 //~ ,{ desc:"clone array"
   //~ ,code:"array.map(..)"
   //~ ,func:function (){
     //~ var r=2.5,fg=TESTAR.map(function(x){ return x })
     //~ for(var i=0;i<100;i+=25)
     //~ { r+=fg[i] }
     //~ return r	
   //~ }
  //~ }
 //~ ,
 { desc:"clone array pre-len"
   ,code:"fg[i]=TESTAR[i]"
   ,func:function (){
      var r=2.5,fg=new Array(TESTAR.length); //fg.length=TESTAR.length
      for(var i=0,e=TESTAR.length;i<e;i++){
        fg[i]=TESTAR[i]
      }
      
      //for(var i=0;i<100;i+=25)
      //{ r+=fg[i] }	
      return r
    }
  }
 ,
 { desc:"clone array fun() pre-len"
   ,code:"fg[i]=aclone(..)"
   ,func:function (){
      var r=2.5,fg=aclone(TESTAR) //fg.length=TESTAR.length
      return r
    }
  }

 ,{ desc:"clone array"
   ,code:"fg[i]=TESTAR[i]"
   ,func:function (){
      var r=2.5,fg=[]
      for(var i=0,e=TESTAR.length;i<e;i++){
        fg[i]=TESTAR[i]
      }
      
      //for(var i=0;i<100;i+=25)
      //{ r+=fg[i] }	
      return r
    }
  }
  
 ,{ desc:"clone array push"
   ,code:"fg.push(TESTAR[i])"
   ,func:function (){
      var r=2.5,fg=new Array(TESTAR.length)//; fg.length=0
      for(var i=0,e=TESTAR.length;i<e;i++){
        fg.push(TESTAR[i])
      }
      
      //for(var i=0;i<100;i+=25)
      //{ r+=fg[i] }	
      return r
    }
  }
 ,{ desc:"clone array push xx"
   ,code:"fg.push(TESTAR[i])"
   ,func:function (){
      var r=2.5,fg=new Array(TESTAR.length); fg.length=0
      for(var i=0,e=TESTAR.length;i<e;i++){
        fg.push(TESTAR[i])
      }
      
      //for(var i=0;i<100;i+=25)
      //{ r+=fg[i] }	
      return r
    }
  }
  
]


var testlist=[
  {rc:warmupset     ,ds:"warmup benchmarks"}
 ,{rc:arrayclone ,ds:"array clone"} 
]

var testlenseconds=1
dotests(testlist, testlenseconds )
