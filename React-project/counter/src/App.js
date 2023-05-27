import { useState } from 'react';
import './App.css';

function App() {
  const [count,setCount] = useState(0);

  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-[#344151] flex gap-20 flex-col justify-center items-center">
        <div className="flex flex-col">
          <p className="text-[#0398d4] font-medium text-[25px] ">
            Increment And Decrement
          </p>
          <div className="flex text-[#344151] rounded-sm p-3 px-5 gap-12 text-[25px] bg-white justify-evenly mt-12">
            <button
              onClick={()=>setCount(count-1)}
              className=" border-r-2 pr-5 border-[#bfbfbf]"
            >
              <i className="fa fa-minus"></i>
            </button>
            <div className="font-bold" id="value">
              {count}
            </div>
            <button
              onClick={()=>setCount(count+1)}
              className=" border-l-2 pl-5 border-[#bfbfbf]"
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
