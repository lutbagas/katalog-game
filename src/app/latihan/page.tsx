"use client";

import { useEffect, useState } from "react";

export default function LatihanPage(){
  const [input, setInput] = useState("")
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = () => {
    if (input. trim() !== "") {
      setItems([...items, input]);
      setInput("");
    }
  }

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  }

  useEffect(() => {
    console.log("daftar item terbaru", items);
  }, [items])

  return(
    <main className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-300
     to-teal-200 flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          <p className="text-gray-600">
            Tambahkan item ke daftar di bawah
          </p>
          <div className="flex gap-2">
            <input 
              type="text"
              value={input}
              placeholder="isilah halaman"
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2
               focus:outline-none focus:ring-2 focus:ring-teal-400"
             />
             <button onClick={handleAdd}
             className="bg-teal-500 hove:bg-teal-600 to-green-400 text-white px-4
              py-2 rounded-md font-semibold"> Tambah
             </button>
          </div>
          <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 rounded-md px-3 py-2">
                    <span className="text-gray-800">{item}</span>
                    <button onClick={() => handleDelete(index)}
                      className="text-sm text-red-500 hover:text-red-700 font-medium">
                        Hapus
                      </button>
                  </li>
              ))}
          </ul>
          {items.length === 0 && (
            <p className="text-gray-500 italic">Belum ada item</p>
          )}
        </h1>
      </div>
     </main>
  )
}