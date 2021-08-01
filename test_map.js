
if(typeof window ==='undefined'){
  require ('./dlib/mutil.js')
  //~ require ('O:/hub/lead/trigfills/dlib/mutil.js')
  Fdrandom=require ('./dlib/Fdrandom.js')
}

var rbulk= Fdrandom.bulk(40 ,Fdrandom.range ,1 ,60) //array of 100 dicerolls


///test for in

var tarray = []
var tmap = new Map()
var tobj = {}
var tmapi = new Map()
var tobji = {}

var tln=5000

for(var i=0;i<tln;i++){
  var si=""+i
  tobj[si]=i
  tmap.set(si,i)
  tobji[i]=tln-i
  tmapi.set(i,tln-i)
  tarray[i]=i
}


var objmap= [
{
 desc:"for of map"
,code:"for of map "
,func:function()
  { var tot=0;
    for (var v of tmap.values()) tot+=v
    return tot 
  }
},{
 desc:"for imap"
,code:"for imap "
,func:function()
  { var tot=0;
    for(var i=0;i<tln;i++)
    { tot+=tmapi.get(i) } 
    return tot 
  }
},{
 desc:"for iarray"
,code:"for iarray "
,func:function()
  { var tot=0;
    for(var i=0;i<tln;i++)
    { tot+=tarray[i] } 
    return tot 
  }
},{
 desc:"for map"
,code:"for map "
,func:function()
  { var tot=0;
    for(var i=0;i<tln;i++)
    { tot+=tmap.get(""+i) } 
    return tot 
  }
},{
   desc:"for obj"
  ,code:"for obj "
  ,func:function()
    { var tot=0;
      for(var i=0;i<tln;i++)
      { tot+=tobj[""+i] } 
      return tot 
    }
},{
   desc:"rnd map"
  ,code:"rnd map "
  ,func:function()
    { var tot=0;
      for(var i=0;i<tln;i++)
      { var j=Fdrandom.irange(0,tln-1)
        tot+=tmap.get(""+j) } 
      return tot 
    }
},{
     desc:"rnd obj"
    ,code:"rnd obj"
    ,func:function()
      { var tot=0;
        for(var i=0;i<tln;i++)
        { var j=Fdrandom.irange(0,tln-1)
          tot+=tobj[""+j] } 
        return tot 
      }
  },{
   desc:"rnd mapi"
  ,code:"rnd mapi "
  ,func:function()
    { var tot=0;
      for(var i=0;i<tln;i++)
      { var j=Fdrandom.irange(0,tln-1)
        tot+=tmapi.get(j) } 
      return tot 
    }
},{
     desc:"rnd obji"
    ,code:"rnd obji"
    ,func:function()
      { var tot=0;
        for(var i=0;i<tln;i++)
        { var j=Fdrandom.irange(0,tln-1)
          tot+=tobji[j] } 
        return tot 
      }
  }

]


///test for in


var testlist=[

 {rc:warmupset     ,ds:"warmup benchmarks"}
 ,{rc:objmap   ,ds:"objmap"}
 
]

var testlenseconds=5
dotests(testlist, testlenseconds )
