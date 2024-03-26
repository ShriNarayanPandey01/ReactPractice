import React, { useEffect, useState } from 'react'

function UseCurrencyInfo(currency) {
   const [data ,setData]= useState({})
   let url = `https://open.er-api.com/v6/latest/${currency}`
   useEffect(()=>{
    fetch(url)
    .then((res) => {
      return res.json();
    }).
    then((res)=>setData(res["rates"]))
   },[currency])
   return data
}

export default UseCurrencyInfo