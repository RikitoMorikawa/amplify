import { Handler } from "aws-lambda";
import { MongoClient } from "mongodb";

export const handler: Handler = async (event) => {
  console.log("Lambda function invoked with event:", JSON.stringify(event));

  // 環境変数から接続情報を取得
  const uri = process.env.DATABASE_URL || "mongodb+srv://rikitomorikawaunity:IJMDSJq1wXb2iPvU@amplify.ycsnjaf.mongodb.net/";
  const dbName = process.env.MONGODB_DB || "Amplify";

  console.log("Attempting to connect to MongoDB");

  let client;

  try {
    // MongoDB に接続
    client = new MongoClient(uri);
    console.log("MongoDB client created");

    // 接続タイムアウトを30秒に設定（Lambda関数のタイムアウト以内にする）
    await client.connect();
    console.log("Connected to MongoDB");

    // データベースとコレクションを選択
    const database = client.db(dbName);
    const collection = database.collection("Test");

    // リクエストボディがある場合はパース
    let requestBody = {};
    if (event.body) {
      requestBody = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    }

    // ドキュメントを挿入
    const document = {
      message: "Hello, MongoDB!",
      timestamp: new Date(),
      createdAt: new Date(),
      requestData: requestBody,
    };

    console.log("Inserting document:", document);
    const result = await collection.insertOne(document);
    console.log("Document inserted with ID:", result.insertedId);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        success: true,
        message: "データが正常に登録されました",
        insertedId: result.insertedId.toString(),
        document: {
          ...document,
          timestamp: document.timestamp.toISOString(),
          createdAt: document.createdAt.toISOString(),
        },
      }),
    };
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
    };
  } finally {
    // 接続を閉じる
    if (client) {
      console.log("Closing MongoDB connection");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
};
