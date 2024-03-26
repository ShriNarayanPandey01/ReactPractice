import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UseCurrencyInfo from './hooks/UseCurrencyInfo'
import InputBox from './components/InputBox'

function App() {
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [converted, setConverted] = useState(0)
  const [amount,setAmount] = useState(0)
  const currency = UseCurrencyInfo(from)
  const currencyOption = currency && Object.keys(currency)
  useEffect(()=>{
    console.log(currencyOption)
  },[currencyOption])
  const convert = ()=>{
    setConverted(amount*currency[to])
  }
  const swap =()=>{
    setFrom(to)
    setTo(from)
  }
  return (
    <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: `url('https://images.pexels.com/photos/20001214/pexels-photo-20001214/free-photo-of-buyukada-2023-yaz.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
    }}
>
    <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    convert()
                }}
            >
                <div className="w-full mb-1">
                    <InputBox
                        label="From"
                        amount={amount}
                        currencyOption={currencyOption}
                        onCurrencyChng={(currency)=>setFrom(currency)}
                        onAmountChange={(amount)=>setAmount(amount)}
                        selectCurrency={from}
                    />
                </div>
                <div className="relative w-full h-0.5">
                    <button
                        type="button"
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                        onClick={swap}
                    >
                        swap
                    </button>
                </div>
                <div className="w-full mt-1 mb-4">
                    <InputBox
                        label="To"
                        amount={converted}
                        currencyOption={currencyOption}
                        onAmountChange={(amount)=>setAmount(amount)}
                        onCurrencyChng={(currency)=>{
                         setTo(currency)
                        }}
                        selectCurrency={to} 
                        amountDisable
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                    Convert 
                </button>
            </form>
        </div>
    </div>
</div>
  )
}

export default App
