if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

var abs = Math.abs, pow=Math.pow,log2=Math.log,floor=Math.floor,max=Math.max

/*
 (a-b) + (a+b)  === (a+b)

  0 0| 0     0 0| 0     0 0| 0      0 = 0
  0-1|-1     0 1| 1     0 1| 1      0 = 1
  0-2|-2     0 2| 2     0 2| 2      0 = 2 
  0-3|-3     0 3| 3     0 3| 3      0 = 3
  1-3|-2     1 3| 4     1 3| 4      2 = 4
  2-3|-1     2 3| 5     2 3| 5      4 = 5
  3-3| 0     3 3| 6     3 3| 6      6 = 6
  4-3| 1     4 3| 7     4 3| 7      8 = 7
  5-3| 2     5 3| 8     5 3| 8     10 = 8
*/

function saequal_fast(a,b,c){ return aequal_fast(a,b,c)?"TRUE":"FALS" }
function aequal_fast(a,b,c){
  c=c||1
  return ( ( (a-b) + (a+b)*c ) === (b-a) + (a+b)*c )
  
  //~ return ( (a-b) + Math.max(abs(a),abs(b))*c*2 ) === Math.max(abs(a),abs(b))*c*2
}

function saequal_fast2(a,b,c){ return aequal_fast2(a,b,c)?"TRUE":"FALS" }
function aequal_fast2(a,b,c){
  c=c||1
  return ( ( (a-b)*c+ a+b ) === (b-a)*c + a+b )
  
  //~ return ( (a-b) + Math.max(abs(a),abs(b))*c*2 ) === Math.max(abs(a),abs(b))*c*2
}

/*
when a b are same sign
if a+b is big enough to mask a-b it will be equal to a+b

when a b are different sign
they cannot be ulp apart
because

*/

function saequal_long(a,b,c){ return aequal_long(a,b,c)?"TRUE":"FALS" }
function aequal_long(a,b,c){
  c=c||1
  return ( abs(a-b) <= c * Number.EPSILON * Math.pow( 2,
        Math.floor( Math.log2( Math.max(abs(a),abs(b)) ) ) )
        )
}

var EP=Number.EPSILON

var b =1+ EP


function toqual(a,b,c){	
  var w=1-Number.EPSILON
  return a*w==b*w	
}

function tequal(a,b,c){
  c=c||1
  return  abs(a-b) + abs(a+b)  === abs(a-b) + abs(a+b) 
  
  //~ return ( (a-b) + Math.max(abs(a),abs(b))*c*2 ) === Math.max(abs(a),abs(b))*c*2
}

conlog( toqual( 1,-1,1    ) )
conlog( toqual( 1,1+EP,1    ) )
conlog( toqual( 1-EP,1 ) )

return

for(var b=1;b<4;b++){
  for(var c=1;c<4;c++){
    for(var a=0;a<2;a++){
      for(var d=1;d<3;d+=0.25){
    
        var A = d + a*EP 
        var B = A + b*EP 
        
        conlog("@"+d.toFixed(1),"( n."+a+"EP =#= "+"n."+(a+b)+"EP ) by",c,"  lng",saequal_long(A,B,c)," fst",saequal_fast(A,B,c)," fst2",saequal_fast(B,A,c))
      
        if(aequal_long(A,B,c)&&aequal_fast(A,B,c)&&aequal_fast(B,A,c)){
           conlog();d=30; 
        }
      }
    }
  }
  conlog()
}

/*

significand :: mantissa :: value 
     detail :: scale 
          1     1           1 
          1     2           2
          1     4           4
          1     8           8
          1    16          16
          1    32          32
          1    64          64
          1   128         128

xo : a number which is immediately after scale boundary, before
xe : x plus epsilon at xo * 2

xo - xe + xo+xe == xe - xo +xo+xe
-e      + 2x+e  == 


fast floating point equality testing

testing equality point floating fast
*/