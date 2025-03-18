import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as testFunction } from "../functions/test_im_function.ts";

const workflow = DefineWorkflow({
  callback_id: "test_im_workflow",
  title: "Test im workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      channel_type: { type: Schema.types.string },
    },
    required: ["channel_id", "channel_type"],
  },
});

workflow.addStep(testFunction, {
  channel_id: workflow.inputs.channel_id,
  channel_type: workflow.inputs.channel_type,
});

export default workflow;
