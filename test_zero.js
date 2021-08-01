/// example tests

if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

/// test control arrays 
var testarlen=1000

var onef=-0//0.99999999999999
var one=0//1

var rbulk=Fdrandom.mixof([0,-0,1,1.1,undefined,false],[],testarlen)
var rbulk1=Fdrandom.mixof([one,one,one],[],testarlen)
var rbulk09=Fdrandom.mixof([onef,onef,onef],[],testarlen)

//~ console.log(rbulk); return

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

var undefo =[

  { desc:"!x"
   ,code:"if(!x)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(!rbulk[i]) rr++
      } 
      return rr 
    }
  }
, { desc:"x!==undefined"
   ,code:"if(x!==undefined)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(rbulk[i]!==undefined) rr++
      } 
      return rr 
    }
  }
, { desc:"x===undefined"
   ,code:"if(x===undefined)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(rbulk[i]===undefined) rr++
      } 
      return rr 
    }
  }
, { desc:"x==0"
   ,code:"if(x==0)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(rbulk[i]==0) rr++
      } 
      return rr 
    }
  }

 ,{ desc:"x===0"
   ,code:"if(x===0)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(rbulk[i]===0) rr++
      } 
      return rr 
    }
  }

 ,{ desc:"!x"
   ,code:"if(!x)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(!rbulk[i]) rr++
      } 
      return rr 
    }
  }

 ,  { desc:"x==undefined"
   ,code:"if(x==undefined)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(rbulk[i]==undefined) rr++
      } 
      return rr 
    }
  }
 ,{ desc:"x===undefined"
   ,code:"if(x===undefined)"
   ,func:function testReturnBool(){
      var rr=0
      for(var i=0; i<rbulk.length ;i++){ 
        if(rbulk[i]===undefined) rr++
      } 
      return rr 
    }
  }

 ,{ desc:"*1"
   ,code:"*1"
   ,func:function testReturnBool(){
      var r=1.1
      for(var i=0; i<rbulk.length ;i++){ 
        r*=rbulk1[i]
      } 
      return r 
    }
  }
   ,{ desc:"*onef"
   ,code:"*onef"
   ,func:function testReturnBool(){
      var r=1.1
      for(var i=0; i<rbulk.length ;i++){ 
        r*=rbulk09[i]
      } 
      return r 
    }
  }
 ,{ desc:"+1"
   ,code:"+1"
   ,func:function testReturnBool(){
      var r=1.1
      for(var i=0; i<rbulk.length ;i++){ 
        r+=rbulk1[i]
      } 
      return r 
    }
  }
   ,{ desc:"+onef"
   ,code:"+onef"
   ,func:function testReturnBool(){
      var r=1.1
      for(var i=0; i<rbulk.length ;i++){ 
        r+=rbulk09[i]
      } 
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


var testlist=[
 {rc:warmupset     ,ds:"warmup benchmarks"}
,{rc:undefo        ,ds:"undefo"}
,{rc:forinfor   ,ds:"for in ;;;"}

]

var testlenseconds=1
dotests(testlist, testlenseconds )
