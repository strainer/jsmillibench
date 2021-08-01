

// distrib(Fdrandom.gaus, 10, -1,1, 1000)
distrib =function(f,rs, ai,ei, n, a,b,c) //func rs  st fn divs
{
  var dv=(ei-ai)/rs
  
  var dist=[]
  for(var i=0;i<rs;i++) { dist[i]=0; }
  
  for(var i=0; i<n; i++)
  {
    var p=f(a,b,c)-ai
    dist[Math.floor(p/dv)]++
  }

  var ot="",oh=""
  for(var i=0; i<rs; i++)
  { 
    oh+=fnl(((ai+dv*(i+0.5))*100/dv).toFixed(2),9)
    ot+=fnl((dist[i]*100/n).toFixed(4),9) }
  
  var lv=0,hv=0
  for(var i=0; i<((rs-1)/2); i++)
  {
    lv+=dist[i]; hv+=dist[rs-1-i]
  }
  console.log(oh)
  console.log(ot)
  console.log((lv*100/n).toFixed(7),(hv*100/n).toFixed(7),((lv-hv)*100/n).toFixed(7))

}

function fnl(num, length) {
  var r = "" + num;
  while (r.length < length) {
      r = " " + r;
  }
  return r;
}

var As,Ai
regurg= function(A)
{
  if(As==null||A!=null){ As=A; Ai=0; return NaN}
  if(As!=null&&Ai==As.length){ Ai=0; }
  return As[Ai++]
}

if (typeof require !=="undefined") var filestreams = require('fs'); //nodejs
savedata =function(fname,fn,n)
{
  var resu = new Uint32Array(n)
  var k,q=0

  for(i=0;i<n;i++) 
  { k=fn()
    resu[i]=k
    q+=k }

  var ws = filestreams.createWriteStream(fname);
  var b=new Buffer(resu)
  a=ws.write(b);
  ws.end();
  pr(fname+" saved",a/1024,"Kb")
  pr("Mean val was "+q/n)
}

savedata2 =function(fname,fn,fn2,n)
{
  var resu = new Uint32Array(n)
  var k,q=0

  for(i=0;i<n;) 
  { 
    k=(fn()-fn2())>>>0
    resu[i++]=k
    //~ k=fn2()
    //~ resu[i++]=k
    q+=k }

  var ws = filestreams.createWriteStream(fname);
  var b=new Buffer(resu)
  a=ws.write(b);
  ws.end();
  pr(fname+" saved",a/1024,"Kb")
  pr("Mean val was "+q/n)
}


function heredoc (f) {
    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};


cmd_exec= function(cmd, args, cb_stdout, cb_end) {
  var spawn = require('child_process').spawn,
    child = spawn(cmd, args),
    me = this;
  me.exit = 0;  // Send a cb to set 1 when cmd exits
  child.stdout.on('data', function (data) { cb_stdout(me, data) });
  child.stdout.on('end', function () { cb_end(me) });
}



//browsers sees all these from another file
function scopetest1(){
  console.log("scopetest seen")
}

var scopetest2 =function(){
  console.log("scopetest2 seen")
}

scopetest3 =function(){  //node sees only this 
  console.log("scopetest3 seen")
}