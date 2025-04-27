// APIリクエストを行うサービスファイル

// ローカル開発用のAPIエンドポイント
// 実際のデプロイ環境では環境変数などで管理することをお勧めします
const API_ENDPOINT = "/api/hello-world";

/**
 * MongoDB APIを呼び出す関数
 * @returns {Promise<any>} APIのレスポンス
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callMongoDBAPI = async (): Promise<any> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 必要に応じてリクエストボディを追加
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`APIエラー (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API呼び出しエラー:", error);
    throw error;
  }
};
