import { useState } from "react";
import { explainExpression } from "./lib/ai";

function App() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");
  const [aiMsg, setAiMsg] = useState("Type an expression and press =");
  const [loading, setLoading] = useState(false);

  const handleClick = (value) => {
    setExpr((prev) => prev + value);
  };

  const handleClear = () => {
    setExpr("");
    setResult("");
    setAiMsg("Now click Ask AI to get an explanation...");
    setLoading(false);
  };

  const handleBackspace = () => {
    setExpr((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      const res = eval(expr); // ⚠️ Consider math.js in future
      setResult(res);
      setAiMsg("Now click Ask AI to get an explanation...");
    } catch (e) {
      setAiMsg("Invalid expression. Please check your input.");
    }
  };

  const handleAskAI = async () => {
    if (!expr || !result) {
      setAiMsg("Please enter a number, press =, then click Ask AI.");
      return;
    }

    setLoading(true);
    setAiMsg("Thinking...");
    const text = await explainExpression(expr, result);
    setAiMsg(text);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-300">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-black text-4xl font-bold ">AI CALCULATOR</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 py-10">
          {/* LEFT PANEL - CALCULATOR */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6">
            {/* Display */}
            <div className="mb-4">
              <div className="text-black text-base uppercase font-bold">Expression</div>
              <div className="text-black text-xl min-h-[40px]">{expr || "0"}</div>

              <div className="h-px bg-black/30 my-3"></div>

              <div className="text-black/60 text-base uppercase font-bold">Result</div>
              <div className="text-black text-xl min-h-[40px]">{result || "0"}</div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {/* Row 1 */}
              <button className="btn btn-danger" onClick={handleClear}>CLR</button>
              <button className="btn btn-danger" onClick={handleBackspace}>DEL</button>
              <button className="btn btn-danger" onClick={() => handleClick("%")}>%</button>
              <button className="btn btn-danger" onClick={() => handleClick("/")}>÷</button>

              {/* Row 2 */}
              <button className="btn" onClick={() => handleClick("7")}>7</button>
              <button className="btn" onClick={() => handleClick("8")}>8</button>
              <button className="btn" onClick={() => handleClick("9")}>9</button>
              <button className="btn btn-danger" onClick={() => handleClick("*")}>*</button>

              {/* Row 3 */}
              <button className="btn" onClick={() => handleClick("4")}>4</button>
              <button className="btn" onClick={() => handleClick("5")}>5</button>
              <button className="btn" onClick={() => handleClick("6")}>6</button>
              <button className="btn btn-danger" onClick={() => handleClick("-")}>-</button>

              {/* Row 4 */}
              <button className="btn" onClick={() => handleClick("1")}>1</button>
              <button className="btn" onClick={() => handleClick("2")}>2</button>
              <button className="btn" onClick={() => handleClick("3")}>3</button>
              <button className="btn btn-danger" onClick={() => handleClick("+")}>+</button>

              {/* Row 5 */}
              <button className="btn col-span-2" onClick={() => handleClick("0")}>0</button>
              <button className="btn" onClick={() => handleClick(".")}>.</button>
              <button className="btn btn-equals" onClick={handleEqual}>=</button>
            </div>
          </div>

          {/* RIGHT PANEL - AI Explanation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 relative">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">AI Explain</h2>
              <button
                className="btn-Ai"
                onClick={handleAskAI}
                disabled={loading}
              >
                {loading ? "Thinking..." : "Ask AI"}
              </button>
            </div>

            <p className="text-black/50 font-bold text-base min-h-[180px] whitespace-pre-line">
              {aiMsg}
            </p>

            {/* Privacy Note */}
            <div className="w-full text-center text-black/30 font-bold text-sm absolute right-0 bottom-5 left-1/2 -translate-x-1/2 ">
              Privacy: We only send the final expression and result when you click "Ask AI".
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
