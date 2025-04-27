// /Users/apple/Amplify/my_app/amplify/function/hello-world/handler.ts
import { Handler } from "aws-lambda";

export const handler: Handler = async () => {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("MONGODB_DB:", process.env.MONGODB_DB);

  // 接続を試みずに終了
  return { message: "環境変数をログに出力しました" };
};
