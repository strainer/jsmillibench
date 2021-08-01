// tools
// =====


if(typeof performance!=='undefined')
{ curtime=perflast } 
else if(typeof process!=='undefined')	
{ curtime=proclast }
else
{ curtime=datelast }


function perflast(btime){ return performance.now()-(btime||0) }
function datelast(btime){ return Date.now()-(btime||0) }
function proclast(btime){
  if(!btime) return process.hrtime()
  var b=process.hrtime(btime)
  return ((b[0]*1000) + (b[1]/1000000))
}

conlog=console.log.bind( console )

pr = function() {
  var args = Array.prototype.slice.call(arguments);
  var result = args.join(" ");
  console.log(result);
}


bench = function (mthd, bentime, mthd_legend, mthd_arg) {
  
  function vfmt(o){
    if(o>1000){ return (o/1000).toFixed(4)+" M" }
    else if(o>1) { return o.toFixed(4)+" K" } 
    return (o*1000).toFixed(4)+"  "
  }
    
  if( typeof bentime ==='undefined' ){ bentime=1 }
  if( typeof mthd_legend ==='undefined' ){ mthd_legend=mthd.name }
  
  bentime=bentime*1000
  
  var mockres=0, rslt_sum=0, reps_sum2=0
  var rrets
  var qqtlen=1
  if(typeof mthd_arg !== 'undefined'){ qqtlen=1 }
  
  var maxret=-Infinity ,minret=Infinity
  
  var atime=curtime()
  var atm=ctime=dtm=curtime(atime)
    
  var duereps=0.5, reps_sum=0 //duereps is fudged ?
  
  while(ctime<50){
    reps_sum+=(duereps*=2)
    if(typeof mthd_arg !== 'undefined'){
      for(i=0;i<duereps;i++)	{ rslt_sum+=mthd(mthd_arg) } 
    }else{
      for(i=0;i<duereps;i++)	{ rslt_sum+=mthd() }
    }
    ctime=curtime(atime)
  }
    
  reps_sum2=reps_sum
  
  var reptime=ctime/reps_sum
  var duereps=Math.floor(bentime/reptime)
  if(duereps<2){ 
    console.log(mthd_legend+" "+vfmt(reps_sum/ctime)+"func/s "+
      "  avg : "+rslt_sum/reps_sum2)
    return reps_sum/ctime
  }
  
  var batches=Math.floor(Math.log(duereps)+0.5)
  if(batches>10){ batches=10 }
  
  var batchreps=Math.floor(duereps/batches)
  
  if(batches>10){ 

    if(typeof mthd_arg !== 'undefined')
    { for(var i=0; i<batchreps; i++)	
      { var r=mthd(mthd_arg)
        rslt_sum+=r
        if (r>maxret){ maxret=r}
        else{ if (r<minret){ minret=r } }
      }	
    }else{
      for(i=0;i<batchreps;i++)	
      { var r=mthd(mthd_arg) 
        rslt_sum+=r
        if (r>maxret){ maxret=r }
        else{ if (r<minret){ minret=r } }
      }
    }
    reps_sum2+=batchreps
    batches--
  }
  
  var mopsigma=0,mopsfrq=0, bults=[]
  while(curtime(atime)<bentime){
    var tstart=curtime()
    
    if(typeof mthd_arg !== 'undefined'){
      for(i=0;i<batchreps;i++)	{ rslt_sum+=mthd(mthd_arg) } 
    }else{
      for(i=0;i<batchreps;i++)	{ rslt_sum+=mthd() }
    }

    var mops=batchreps/curtime(tstart)
    bults.push(mops)
    mopsigma+=mops*mops
    mopsfrq++
    reps_sum2+=batchreps
  }
    
  var eb=bults.length
  if(eb>6){ 
    bults.sort( function(a,b){ return a-b } ) //ascending mops
    var edge=Math.floor(eb/8)+1, sume=0
    for(var i=edge+1;i<eb-edge;i++){
      sume+=bults[i]*bults[i]
    }
    rrets=Math.sqrt(sume/((eb-edge*2-1)))
    ops=vfmt(rrets)
  }else{
    var rms=Math.sqrt(mopsigma/mopsfrq);rrets=rms
    ops=vfmt(rms)
  }
  
  console.log(mthd_legend+" "+ops+"func/s "+
    "  avg : "+rslt_sum/reps_sum2)
  
  return rrets*1000
}

var firstrun=1

benchn = function(n,a,b,c,d){ 

  if(firstrun)
  { firstrun=false;
    var k=bench(Math.sqrt,b,c,d)	
  }
  
  for(var i=0;i<n;i++) { bench(a,b,c,d);} 
}


sstats = function(A,s,e){

  s=s||0; e=e||A.length
  
  var nn=0    ,delta=0, deltb=0 
     ,mean=0  ,mean2=0, qvl=0
     ,lw=A[s] ,hi=A[s]
  
  while(s<e){
    qvl=A[s++],nn++
    if(lw>qvl) lw=qvl	
    if(hi<qvl) hi=qvl	
    delta = qvl - mean
    mean += delta/nn
    deltb = qvl - mean
    mean2+= delta*deltb //welfords alg	
  }
  
  return { lw:lw ,hi:hi ,mean:mean ,sdev:Math.sqrt( mean2/(nn-1) ) }

}

dotests =function(testix,tim,reps){ 
  tim=tim||1
  var ttim=0,bens=0
  for(tt of testix){
    console.log()
    console.log("Testing:",tt.ds)
    
    for(trc of tt.rc){
      console.log("  Code:",trc.code," ( "+trc.desc+" )")
      for(i=0;i<(reps||1);i++){
        var res=bench(trc.func, tim, "   ", 0)
        if(isFinite(res)){ ttim+=res,bens++ }
      }
    }
    console.log("  Avg op/s",ttim/bens)
    ttim=bens=0
  }
  
}

warmupset = [

{
 desc:"squareroot" ,code:"Math.sqrt(i)"
,func:function sqrts(){
  var r=2
  for(var i=0.5;i<500;i++)
  { r+=Math.sqrt(i) }	
  return r
}
},{ desc:"fastest dummy test" ,code:"r+=i"
 ,func:function (){
    var r=2.5
    for(var i=0.5;i<500;i++)
    { r+=i }
    return r
  }
}
]

