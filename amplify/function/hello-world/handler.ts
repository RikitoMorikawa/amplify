// /Users/apple/Amplify/my_app/amplify/function/hello-world/handler.ts
import { Handler } from "aws-lambda";
import { MongoClient } from "mongodb";

export const handler: Handler = async () => {
  // 環境変数から接続情報を取得
  const uri = process.env.DATABASE_URL;
  const dbName = process.env.MONGODB_DB;

  if (!uri || !dbName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "データベース接続情報が設定されていません" }),
    };
  }

  let client;

  try {
    // MongoDB に接続
    client = new MongoClient(uri);
    await client.connect();

    // データベースとコレクションを選択
    const database = client.db(dbName);
    const collection = database.collection("Test");

    // ドキュメントを挿入
    const result = await collection.insertOne({
      message: "Hello, World!!",
      timestamp: new Date(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "データが正常に登録されました",
        insertedId: result.insertedId,
      }),
    };
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    // 接続を閉じる
    if (client) await client.close();
  }
};
