import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function Home() {

  function Convert (amount: number, from: string, to: string) 
  {
    
    try{
      fetch('https://api.exchangerate.host/latest?places=3&base=' + from + '&amount=' + amount)
        .then((res) => res.json())
        .then( res=> res["rates"])
        .then((res)=>res[to])
        .then((Converted) => {
          if (mainAmount == "amount-1")
          {
            (document.getElementById("amount-2") as HTMLInputElement).value = Converted;
          }
          else if (mainAmount == "amount-2"){
           (document.getElementById("amount-1") as HTMLInputElement).value = Converted;
          }
          (document.getElementById("i_to") as HTMLInputElement).innerText = Converted;
          (document.getElementById("i_from") as HTMLInputElement).innerText = amount.toString();
          (document.getElementById("c_from") as HTMLInputElement).innerText = from;
           (document.getElementById("c_to") as HTMLInputElement).innerText = to;
        })
    }
    catch{
      console.log("failed")
    }
  }

  function ChangedCurrency(){

  var amount = (document.getElementById(mainAmount) as HTMLInputElement).value;
if(mainAmount == "amount-1")
{
  var from = (document.getElementById("from") as HTMLInputElement).value;
  var to = (document.getElementById("to") as HTMLInputElement).value;
  console.log(1)
  Convert(Number(amount), from, to)
}

else if(mainAmount == "amount-2")
{
  var from = (document.getElementById("to") as HTMLInputElement).value;
  console.log("from = " + from)
  var to = (document.getElementById("from") as HTMLInputElement).value;
  console.log("to = " + to)
  Convert(Number(amount), from, to)
}
    
  }

function OnInput(tag: string){
  mainAmount = tag;
  ChangedCurrency();

}

  var mainAmount:string = "amount-1";

  const [USDrate, setUSDRate] = useState(null);
  const [EURrate, setEURRate] = useState(null);

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?places=3&base=UAH')
      .then((res) => res.json())
      .then( res=> res["rates"])
      .then((res)=>res["USD"])
      .then((USDrate) => {
        setUSDRate(USDrate)
      })

      fetch('https://api.exchangerate.host/latest?places=3&base=UAH')
      .then((res) => res.json())
      .then( res=> res["rates"])
      .then((res)=>res["EUR"])
      .then((EURrate) => {
        setEURRate(EURrate)
      })
  }, [])


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/dist/output.css" rel="stylesheet"/>

      </Head>

<header className="sticky top-0 z-30 w-full bg-transparent p-3">
        <div className="grid text-center place-items-center">
            <h1 className="block py-10 pr-4 pl-3 text-3xl font-bold">1 UAH = {USDrate} USD = {EURrate} EUR</h1>
            
        </div>
</header>

      <main>
        <div className="grid columns-1 bg-[#FBF7F4] w-[800px] rounded-2xl mx-auto mt-10  shadow-md">
        <div className="flex mx-auto mt-8 mb-4 text-xl font-medium">
            <h1 id="i_from" className="mx-1 font-bold">N</h1>
            <h1 id="c_from" className="mx-1 font-bold">tomatoes</h1>
            <h1 id="i_from" className="mx-1">is equal to</h1>
            <h1 id="i_to" className="mx-1 font-bold">SS</h1>
            <h1 id="c_to" className="mx-1 font-bold">cobs of corn</h1></div>
            <div className="flex mx-auto mt-4">
        <input min={0} onChange={()=>OnInput("amount-1")}  placeholder ="0.00"
        className="bg-gray-200 appearance-none text-lg font-bold mx-2 border-2 border-gray-200 rounded w-[150px] py-2 pl-4 pr-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6C9A8B]" id="amount-1" type="number"/>

        <select id="from" onChange={()=>ChangedCurrency()} 
        className="bg-gray-200 appearance-none font-bold mx-2 border-2 border-gray-200 rounded w-[300px] py-2 pl-4  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6C9A8B]">
  <option className="" value="USD">US Dollar (USD)</option>
  <option className="" value="EUR">Euro (EUR)</option>
  <option className="" value="VES">Venezuelan bolivar (VES)</option>
  <option className="" value="UAH">Hryvna (UAH)</option>
</select>




       </div>
       <div className="flex mx-auto mt-4  mb-12">

       <input min={0} onChange={()=>OnInput("amount-2")}  placeholder ="0.00"
className="bg-gray-200 appearance-none text-lg font-bold mx-2 border-2 border-gray-200 rounded w-[150px] py-2 pl-4 pr-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6C9A8B]" id="amount-2" type="number"/>

<select id="to" onChange={() =>ChangedCurrency()} 
   className="bg-gray-200 appearance-none font-bold mx-2 border-2 border-gray-200 rounded w-[300px] py-2 pl-4  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6C9A8B]">
  <option className="" value="USD">US Dollar (USD)</option>
<option className="" value="EUR">Euro (EUR)</option>
<option className="" value="VES">Venezuelan bolivar (VES)</option>
<option className="" value="UAH">Hryvna (UAH)</option>
</select>

  </div>
       </div>
     
      </main>

    </div>
  )
}
