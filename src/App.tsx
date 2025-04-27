import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { callMongoDBAPI } from "./services/api";

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTestMongoDB = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await callMongoDBAPI();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error calling Lambda:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      {/* MongoDB接続テスト用ボタン */}
      <div className="card">
        <button
          onClick={handleTestMongoDB}
          disabled={loading}
          style={{ backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", padding: "10px 20px", borderRadius: "5px" }}
        >
          {loading ? "テスト中..." : "MongoDBにテストデータを登録"}
        </button>

        {result && (
          <div className="result-box" style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
            <h3>結果:</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
          </div>
        )}

        {error && (
          <div className="error-box" style={{ marginTop: "20px", padding: "15px", backgroundColor: "#ffebee", borderRadius: "5px" }}>
            <h3>エラー:</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{error}</pre>
          </div>
        )}
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
