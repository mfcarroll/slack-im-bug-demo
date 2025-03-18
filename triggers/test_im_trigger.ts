import { Trigger } from "deno-slack-sdk/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import workflowDef from "../workflows/test_im_workflow.ts";

const triggerDef: Trigger<typeof workflowDef.definition> = {
  type: TriggerTypes.Event,
  name: "Test im trigger",
  workflow: `#/workflows/${workflowDef.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    all_resources: true,
    filter: {
      version: 1,
      root: {
        operator: "AND",
        inputs: [
          {
            statement: "{{data.text}} CONTAINS 'test1'",
          },
          {
            statement: "{{data.channel_type}} == 'private'",
            // statement: "{{data.channel_type}} == 'im'",
          },
        ],
      },
    },
  },
  inputs: {
    channel_id: { value: TriggerContextData.Event.MessagePosted.channel_id },
    channel_type: {
      value: TriggerContextData.Event.MessagePosted.channel_type,
    },
  },
};

export default triggerDef;
