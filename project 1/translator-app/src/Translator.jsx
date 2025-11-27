import { useState, useCallback } from "react";

const API_KEY = "b8a87ba77amsh9f782d2628b17afp170870jsn7b91675e1fc7"; // your RapidAPI key

function Translator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi"); // default Hindi

  const translateText = useCallback(async () => {
    if (!text) return;

    try {
      const response = await fetch("https://google-translator9.p.rapidapi.com/v2", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
        },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: language,
        }),
      });

      const result = await response.json();
      setTranslated(result?.data?.translations[0]?.translatedText || "⚠ Translation failed");
    } catch (error) {
      console.error("Translation error:", error);
      setTranslated("⚠ Something went wrong — API limit or error");
    }
  }, [text, language]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-center text-blue-600">🌐 Text Translator</h1>

      <textarea
        className="w-full p-3 border rounded-md focus:outline-none"
        placeholder="Enter text in English..."
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded-md"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="gu">Gujarati</option>
        <option value="ta">Tamil</option>
        <option value="ar">Arabic</option>
        <option value="ja">Japanese</option>
      </select>

      <button
        onClick={translateText}
        className="bg-blue-600 text-white px-4 py-2 rounded-md w-full font-semibold hover:bg-blue-700"
      >
        Translate
      </button>

      <div className="p-3 bg-gray-100 rounded-md min-h-[80px]">
        {translated || "Translated text will appear here..."}
      </div>
    </div>
  );
}

export default Translator;
