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
