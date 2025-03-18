import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const def = DefineFunction({
  callback_id: "test_im_function",
  title: "Test im function",
  source_file: "functions/test_im_function.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      channel_type: { type: Schema.types.string },
    },
    required: ["channel_id", "channel_type"],
  },
});

export default SlackFunction(def, async ({ inputs, client }) => {
  console.log(inputs.channel_type);

  const channelInfo = await client.conversations.info({
    channel: inputs.channel_id,
  });
  console.log(channelInfo.channel.is_im);

  return { outputs: {} };
});
