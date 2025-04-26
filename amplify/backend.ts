import { defineBackend } from "@aws-amplify/backend";
import { helloWorld } from "./function/hello-world/resource";

const backend = defineBackend({
  helloWorld,
});

backend.addOutput({
  custom: {
    helloWorldFunctionName: backend.helloWorld.resources.lambda.functionName,
  },
});
