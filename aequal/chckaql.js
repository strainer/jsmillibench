if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

var abs = Math.abs, pow=Math.pow,log2=Math.log,floor=Math.floor,max=Math.max



function aequal_fast(a,b,c){
  var e = (a+b)*(c||10) //ulp diff is less than 7 not more than 16
  return e + (a-b) === e
}

//will be equal when ...

function aequal_fost(a,b,c,d){
  c=Math.abs((a+b)*(c||1))+0.125
  return  Math.abs(a-b) + c  === c 
  //~ return ( (a-b) + Math.max(abs(a),abs(b))*c*2 ) === Math.max(abs(a),abs(b))*c*2
}

function aequal_long(a,b,c){
  c=c||1
  return abs(a-b) <= c * Number.EPSILON * Math.pow( 2,
        Math.floor( Math.log2( Math.max(abs(a),abs(b)) ) ) )
}

function aequal_toast(a,b,c){
  //conlog(abs(a-b),Number.EPSILON)
  //~ return abs(a-b) <= Number.EPSILON*2 
  c=c||1
  return abs(a-b) < c*Number.EPSILON* (abs(a)+abs(b))
}

function aequal_gaurd(a,b,c){
  c=c||1
  var threshold = Number.EPSILON
  var guard = threshold/Number.EPSILON
  return  a + guard == b + guard 
}


//~ var a=1.4580724465356933 
//~ var b=1.458072446535694
//~ var c=2
//~ conlog(aequal_fast(a,b,c))
//~ conlog(aequal_fast(b,a,c))
//~ conlog(aequal_fast(-a,-b,c))
//~ return


p=Fdrandom.pot()


function feps(n){
  return Number.EPSILON * 
    Math.pow( 2,Math.floor( Math.log2( abs(n) ) ) ) 
}


console.log(1+feps(1))
console.log(feps(2))

//~ return

function aequal_test(a,b,c,d){ return aequal_fast(a,b,c,d) }

var tests =200000
var negs=0,poss=0, trange=1000

for(var n=0;n<tests;n++){
  
  var pl=p.rpole()
  var can=p.range(0,trange)*pl
  var ee=feps(can)*pl
  
  //~ conlog(ee,can,can+ee)
  
  var ts_high=3,ts_scale=2
  
  
  if(!aequal_test(can,can+ee,1))
    conlog("bad miss @1")
  
  if(aequal_test(can,can+ee*2,1))
    conlog("bad hit @1")
  
  if(!aequal_test(can,can+ee*2,4)) //should be equived
    conlog("bad miss @2")
  
  if(aequal_test(can,can+ee*4,1)) //shoudlnt
    conlog("bad hit @2")
  
  var h=317
  if(!aequal_test(can,can+ee*h*0.8,h))
    conlog("bad miss @hi")
  
  if(aequal_test(can,can+ee*h/0.6,h))
    conlog("bad hit @hi")
  
  
  if(ee<0){
    if(aequal_test(can,can+ee*2,2)) negs++
  }else{
    if(aequal_test(can,can+ee*2,2)) poss++
  }
}

conlog("negs",negs," poss",poss)

return











//~ var tries=10000000
var tries=10000
var trange=3,tulps=4, tsu=1
 
var r_long=0 ,r_long_neg=0
var r_short=0,r_short_near=0,r_short_neg=0
var r_fast=0, r_fast_near=0, r_fast_neg =0
var r_gaurd=0,r_gaurd_near=0,r_gaurd_neg=0
var f_asym=0,l_asym=0
var iseq=0

var hit_1_2=0,mis_1_2=0,hit_3_4=0,mis_3_4=0

var flr=0//.00000125

for( var uls=1; uls<65; uls*=2){

for( var scb=0; scb<8; scb++){

var hitb=0,misb=0

for( var j=0; j<tries; j++){
  
  //~ var ep = Number.EPSILON * Math.pow( 2,floor( log2( abs(1.5) ) ) )
  //~ var bp = Math.pow(2,scb)*ep
  //~ var kc = p.range(1+bp,2-bp)
  //~ var kd = kc + bp*p.rpole()
  
  var aa = Math.pow( 2, p.range(-30,30) ) 
  var ep = Number.EPSILON * Math.pow( 2,floor( log2( aa ) ) )
  var bp= Math.pow(2,scb)*ep
  var kc= p.range(1,2)
  var kd= kc + bp*p.rpole()

  kc*=aa,kd*=aa
  
  if(aequal_fast(kc,kd,uls,flr)){
    hitb++
    //~ if(false&&((uls==2&&scb==2)||(uls==1&&scb==1))){
      //~ conlog(" kc:",kc," kd:",kd," kc-kd:",kc-kd," eps:"
      //~ ,(kc-kd)/Number.EPSILON 
      //~ *Math.pow( 2,floor( log2( max(abs(kc),abs(kd) ) ) ))
      //~ )
    //~ }
  }else{
    misb++
  }
      
}

conlog(" Uf:",uls," tstb:",scb," hit:",cen(hitb))//," mis:",cen(misb)

}
conlog()
}


/////////////
///


var invstgt=10

if(invstgt)
for( var j=0; j<invstgt; j++){
    
  var u = p.range(-trange,trange)
  var e = Number.EPSILON * ( p.range(-tulps*tsu,tulps*tsu) )
  var v = u + e

  //------------
  
  
  kc=p.range(1+Number.EPSILON*4,2-Number.EPSILON*4)
  kd=kc + Number.EPSILON * p.irange(3,4)*p.rpole()

  if(aequal_fast(kc,kd,uls)){
    hit_3_4++
  }else{
    mis_3_4++
  }
  
  
  //------------
  
  if(u===v) iseq++
  
  if(
    (aequal_fast(u,v,tsu)!=aequal_fast(v,u,tsu))
   ||(aequal_fast(-u,-v,tsu)!=aequal_fast(-v,-u,tsu))
   ||(aequal_fast(u,v,tsu)!=aequal_fast(-v,-u,tsu))
  ){ 
    conlog("f_asym:",u,v,u>v)
    f_asym++; 
  }

  if(
    (aequal_long(u,v,tsu)!=aequal_long(v,u,tsu))
   ||(aequal_long(-u,-v,tsu)!=aequal_long(-v,-u,tsu))
   ||(aequal_long(u,v,tsu)!=aequal_long(-v,-u,tsu))
  ){ 
    conlog("l_asym:",u,v,u>v)
    l_asym++; 
  }

  var t_long  = aequal_long(u,v,tsu)
  var t_fast  = aequal_fast(u,v,tsu)

  var t_short = aequal_short(u,v,tsu)
  var t_gaurd = aequal_gaurd(u,v,tsu)
  
  if( t_long ){ r_long++ }else { r_long_neg++ }
  
  if( t_long==t_fast ){ r_fast++ } 
  else { 
   var neg=0 
    if(!t_fast){
      if(aequal_fast(u,v,tsu+1)){
        r_fast_near++
      }else{ r_fast_neg++; conlog("noto") }
    }
    if(t_fast){
      if(tsu<2){ r_fast_neg++ }
      else{
        if(!aequal_fast(u,v,tsu-1)){
          r_fast_near++
        }else { r_fast_neg++; conlog("notu") }
      }
    }
    
    var ef= Number.EPSILON * Math.pow( 2,
            Math.floor( Math.log2( Math.max(abs(u),abs(v)) ) ))
    var ul= tsu * ef 
      
    //~ conlog("u"+tsu,u,u-v,t_long?"ye":"no",ul)
    conlog("long: diff <",tsu,"*",ef,t_long,"  diff=",abs(u-v))
    conlog("fast: diff <",tsu,"*",ef,t_fast)
    conlog("thresh:",ul," ,eps:",ef," ,fep",tsu)
    conlog(" u:", u, " ,v:", v)
    conlog(" u-v:", u-v, ",(u+v)*c:", (u+v)*tsu)
    conlog(":=",(u+v)*tsu+(u-v))
    
    var ug = pow( 2,floor( log2( abs(u)) ) ) 
    var vg = pow( 2,floor( log2( abs(v)) ) ) 
    var uvg = pow( 2,floor( log2( abs(u+v) ) ) ) 
    var mxg = pow( 2,floor( log2( 2*max(abs(u),abs(v)) ) ) ) 
    conlog("ug:",ug,"vg:",vg,"uvg:",uvg,"mxg:",mxg)
    conlog()
  }


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

if(invstgt)pr_results()

///

function pr_results(){
  
  conlog("\n\n") 
  conlog("Test ",tries,", rang",trange,", tulps",tulps,", dist",tsu )
  conlog("long aeq",cen(r_long)," noe",cen(tries-r_long), " (iseq",cen(iseq)+")")
  
  conlog("fast good", cen(r_fast), " near", cen(r_fast_near)," bad",cen(r_fast_neg))

  conlog("hit_1_2", hit_1_2, "mis_1_2", mis_1_2 )
  conlog("hit_3_4", hit_3_4, "mis_3_4", mis_3_4 )
  
  if(f_asym) conlog("fAsymetry:",f_asym )
  if(l_asym) conlog("lAsymetry:",l_asym )
  //~ conlog("short good", cen(r_short), " near", cen(r_short_near)," bad",cen(r_short_neg))
    
  //~ conlog("gaurd good", cen(r_gaurd), " near", cen(r_gaurd_near)," bad",cen(r_gaurd_neg))
 
}

function cen(a){
  var r=(a*100/tries).toFixed(1)
  if(r==="100.0"&&a<tries) r=r+"-"
  if(r==="0.0"&&a>0) r=r+"+"
  return r
  //~ return ""+(a*100/tries).toFixed(6)+""+(a<tries)?"!!":""
}
