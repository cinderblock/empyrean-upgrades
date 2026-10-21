import { INDEXABLE } from "../worker/headers";
import { SITE } from "./content/site";

/** The same few tags on every page. Unlisted pages say noindex. */
export function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    ...(INDEXABLE ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: `${SITE.name} ${SITE.version}` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary" },
  ];
}
