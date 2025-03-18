import { Manifest } from "deno-slack-sdk/mod.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */

import test_im_workflow from "./workflows/test_im_workflow.ts";
import { def as test_im_function } from "./functions/test_im_function.ts";

export default Manifest({
  name: "im-bug-demo",
  description: "A blank template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  functions: [test_im_function],
  workflows: [test_im_workflow],
  outgoingDomains: [],
  botScopes: [
    "channels:history",
    "im:history",
    "mpim:history",
    "groups:history",
  ],
  features: {
    appHome: {
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: false,
    },
  },
});
