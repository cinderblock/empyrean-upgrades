/**
 * The Worker's entry point. Only the handler is exported: workerd treats
 * every named export of the main module as an entrypoint and refuses to start
 * on a constant. The lock itself, and what its tests import, is lock.ts.
 */

import { handle } from "./lock";

export default { fetch: handle };
