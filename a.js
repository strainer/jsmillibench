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
