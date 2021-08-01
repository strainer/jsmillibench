/// example tests

if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

/// test control arrays 
var testarlen=300
var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.range(-1000,1000) } )
//~ var TESTAR=Fdrandom.bulk( testarlen,function(){ return Fdrandom.mixof("abcdefghij","",Fdrandom.irange(0,9)) } )

var rbulk= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls

///test for in
var a4= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls
var a5= a4.slice()

/*
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
*/
  
/// divide by 2

var examps =[

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

 ,{ desc:"std modulus"
   ,code:"a % b"
   ,func:function(){
      var r=2
      for(var i=0.5;i<500;i++)
      { r+=omod(i,7) }	
      return r
    }
  }
 
 ,{ desc:"clause on bool"
   ,code:"if(getasBool(rbulk,i))"
   ,func:function testReturnBool(){
      var rr=-1,r={}
      for(var i=0; i<rbulk.length ;i++){ 
        if(getasBool(rbulk,i)) rr++
      } 
      return rr 
    }
  }

 ,{ desc:"math.abs"
   ,code:"r+=Math.abs(TESTAR[i])"
   ,func:function (){
      var r=0; //fg.length=TESTAR.length
      for(var i=0,e=TESTAR.length;i<e;i++){
        r+=Math.abs(i)
      }
      
      return r
    }
  } 
  
 ,{ desc:"no abs"
   ,code:"r+=TESTAR[i]"
   ,func:function (){
      var r=1; //fg.length=TESTAR.length
      for(var i=0,e=TESTAR.length;i<e;i++){
        r+=i
      }
      
      return r
    }
  }
    
 ,{ desc:"for in"
   ,code:"for(in "
   ,func:function()
    { a4[0]=0; for(var i in a4){ a4[0]+=a4[i] } return a4[0] }
  }
  
 ,{ desc:"for(;;"
   ,code:"for(;;"
   ,func:function()
    { a5[0]=0; for(var i=1,e=a5.length;i<e;i++){ a5[0]+=a5[i] } return a5[0] }
  }
  
 ,{ desc:"transient return Object"
   ,code:"r.x + r.y + r.z"
   ,func:function(){
      var r,rr=-1
      for(var i=0; i<rbulk.length ;i++){ 
        r=getasTransObj(rbulk,i)
        rr+=r.x + r.y + r.z
      } 
      return rr 
    }
  }
]

/// Modulus :
function omod(a,b){
  return a%b //preserves neg
}

function getasBool(a,i){
  if(a[i]>30){ return true }else{return false}
}

function getasTransObj(rbulk,i){
  return {x:rbulk[i],y:rbulk[0]+rbulk[i],z:rbulk[i]*5.5}
}


var testlist=[
 {rc:warmupset     ,ds:"warmup benchmarks"}
,{rc:examps        ,ds:"ntain"}
]

var testlenseconds=1
dotests(testlist, testlenseconds )
