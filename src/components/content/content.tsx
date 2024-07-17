import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function Content() {
  const uppercase = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const lowercase = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const symbols = [
    "!",
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
  ];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const [length, setLength] = useState<number>(0);
  const [checkUppercase, setCheckUppercase] = useState<boolean>(false);
  const [checkLowercase, setCheckLowercase] = useState<boolean>(false);
  const [checkSymbols, setCheckSymbols] = useState<boolean>(false);
  const [checkNumbers, setCheckNumbers] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] =
    useState<string>("P4$5W0rD!");

  const handleCheckboxClick = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  const randomPassword = () => {
    let characterPool: string[] = [];
    if (checkUppercase) characterPool = characterPool.concat(uppercase);
    if (checkLowercase) characterPool = characterPool.concat(lowercase);
    if (checkSymbols) characterPool = characterPool.concat(symbols);
    if (checkNumbers) characterPool = characterPool.concat(numbers);

    if (characterPool.length === 0) return;

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    setGeneratedPassword(password);
  };

  const activeCount = [
    checkUppercase,
    checkLowercase,
    checkSymbols,
    checkNumbers,
  ].filter(Boolean).length;

  const getBoxClass = (index: number) => {
    if (activeCount === 4) return "bg-red-500";
    if (activeCount >= 2)
      return index < activeCount ? "bg-orange-500" : "bg-white";
    if (activeCount === 1) return index === 0 ? "bg-green-500" : "bg-white";
    return "bg-white";
  };

  return (
    <>
      <div>
        <p className="text-[16px] text-[#817D92] pb-[14px] text-center">
          Password Generator
        </p>
        <div className="bg-[#24232C] w-[330px] flex items-center justify-between py-[12px] px-[15px]">
          <p className="text-white text-[24px]">{generatedPassword}</p>
          <FaRegCopy className="text-[#A4FFAF] w-[18px] h-[20px]" />
        </div>
        <div className="flex flex-col px-[15px] mt-[20px] bg-[#24232C]">
          <div className="flex items-center justify-between pt-[20px] pb-[15px]">
            <p className="text-[16px] text-white">Character Length</p>
            <p className="text-[#A4FFAF] text-[24px]">{length}</p>
          </div>
          <input
            type="range"
            min="0"
            max="16"
            step="4"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="custom-range w-[311px] h-[8px]"
          />
          <div className="flex flex-col pt-[25px]">
            <div className="flex items-center gap-[20px]">
              <input
                type="checkbox"
                className="bg-[#A4FFAF]"
                onChange={() => handleCheckboxClick(setCheckUppercase)}
              />
              <p className="text-white text-[16px]">
                Include Uppercase Letters
              </p>
            </div>
            <div className="flex items-center gap-[20px]">
              <input
                type="checkbox"
                onChange={() => handleCheckboxClick(setCheckLowercase)}
              />
              <p className="text-white text-[16px]">
                Include Lowercase Letters
              </p>
            </div>
            <div className="flex items-center gap-[20px]">
              <input
                type="checkbox"
                onChange={() => handleCheckboxClick(setCheckNumbers)}
              />
              <p className="text-white text-[16px]">Include Numbers</p>
            </div>
            <div className="flex items-center gap-[20px]">
              <input
                type="checkbox"
                onChange={() => handleCheckboxClick(setCheckSymbols)}
              />
              <p className="text-white text-[16px]">Include Symbols</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[20px]">
            <p className="text-white text-[20px]">STRENGTH</p>
            <div className="flex items-center gap-[4px]">
              {[0, 1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className={`w-[10px] h-[28px] border-white border-2 ${getBoxClass(
                    index
                  )}`}
                ></div>
              ))}
            </div>
          </div>
          <button
            className="mt-[20px] py-[10px] bg-[#A4FFAF] text-[#24232C] font-bold"
            onClick={randomPassword}
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}
