/**
 * The Worker's entry point. Only the handler and the Durable Object class are
 * exported: workerd treats every named export of the main module as an
 * entrypoint and refuses to start on a constant. The lock itself, and what
 * its tests import, is lock.ts.
 */

import { handle } from "./lock";

export { FeedbackStore } from "./feedback-store";

export default {
  fetch: (request: Request, env: Parameters<typeof handle>[1]) =>
    handle(request, env),
};
