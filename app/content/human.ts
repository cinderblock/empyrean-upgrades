/**
 * Everything a human has said that shaped these plans, from the chat
 * transcripts (2026-10-19 to 2026-10-23), one entry per thing said. The rest
 * of the plans is AI-drafted: content that isn't credited to one of these
 * ids is an AI guess or design choice until someone reviews it.
 *
 * Quotes are short and trimmed (… for a cut), never a password or anything
 * private: the repo is public. Times are US Pacific. `docs/human-input.md` is
 * generated from this file by `bun run ledger`.
 *
 * Adding to it: when the user states a fact or makes a decision, add the next
 * id here, credit it where it lands, and run `bun run ledger`.
 */

export type HumanKind =
  /** Said it unprompted: a fact, a requirement, an idea. */
  | "said"
  /** The AI proposed it and they said yes. */
  | "approved"
  /** Answered a question the AI asked. */
  | "answered";

export interface Said {
  at: string;
  who: string;
  kind: HumanKind;
  /** Their words, trimmed. */
  said: string;
  /** What it settled, in plain words. */
  meaning: string;
  /** Where the AI has read more into it than was said. Review these. */
  aiReading?: string;
  /** A later entry that replaces this one. */
  supersededBy?: string;
  /** Which chat: the Empyrean repo, or this one. */
  thread: "empyrean" | "upgrades";
}

const C = "Cameron";

export const HUMAN = {
  H01: {
    at: "2026-10-19 2:59 PM PDT",
    who: C,
    kind: "said",
    said: "Right now it's one big switch. I want to daisy chain switches around the run, and let [R]STP drop a link to maintain a tree.",
    meaning:
      "V1 has one central switch. V2 is a ring of switches with spanning tree.",
    thread: "empyrean",
  },
  H02: {
    at: "2026-10-19 3:43 PM PDT",
    who: C,
    kind: "said",
    said: "WAN is… arbitrary. might be starlink. might be burningman uplink. might be lan to a local ethernet cabinet… it would be nice if we could plug the WAN connection into an arbitrary port around the ring",
    meaning: "Internet can plug in anywhere around the ring.",
    aiReading:
      "The mechanism (a WAN-transport VLAN on the ring, one labelled port per switch) is the AI's.",
    thread: "empyrean",
  },
  H03: {
    at: "2026-10-19 3:48 PM PDT",
    who: C,
    kind: "said",
    said: 'each pixlite is in a "node" box. Boxes get switches.',
    meaning: "One switch per node box.",
    thread: "empyrean",
  },
  H04: {
    at: "2026-10-19 8:55 PM PDT",
    who: C,
    kind: "answered",
    said: "It's a UCG. Not a UXG. It runs the network app on prem",
    meaning: "The gateway is a UniFi Cloud Gateway running Network on-prem.",
    thread: "empyrean",
  },
  H05: {
    at: "2026-10-19 8:55 PM PDT",
    who: C,
    kind: "answered",
    said: "PixLite E4-S Mk3",
    meaning: "The light controllers' model.",
    thread: "empyrean",
  },
  H06: {
    at: "2026-10-19 8:55 PM PDT",
    who: C,
    kind: "answered",
    said: 'PoE is injected at each "node" box, probably in the managed switch',
    meaning: "PoE comes from the node box's switch.",
    thread: "empyrean",
  },
  H07: {
    at: "2026-10-19 8:55 PM PDT",
    who: C,
    kind: "answered",
    said: "It has a 12V supply now. I'll add a 48V supply too.",
    meaning: "Node boxes have a 12 V supply; V2 adds a 48 V class supply.",
    aiReading:
      "The AI set it to 54 V and picked the Mean Well SDR-240-48 for it.",
    thread: "empyrean",
  },
  H08: {
    at: "2026-10-19 8:55 PM PDT",
    who: C,
    kind: "answered",
    said: "Both should be supported",
    meaning:
      "Unicast sACN by fixed IP and by MAC-keyed auto-discovery, both. (The user had asked whether fixed IPs allow unicast.)",
    thread: "empyrean",
  },
  H09: {
    at: "2026-10-20 12:48 AM PDT",
    who: C,
    kind: "said",
    said: "how about this switch: …usw-ultra maybe with the 210W adapter… or an aftermarket one. they'll be on and an outer waterproof box is in the sun. but we don't run the lights during the day. the industrial din is a stretch goal, but it like doubles the cost…",
    meaning:
      "The USW-Ultra is the user's pick; the Industrial DIN is a stretch goal. Boxes are powered all day in a sealed box in the sun; the lights only run at night.",
    aiReading:
      "Powering it from the box's own supply rather than the 210 W adapter was the AI's call; the user left both open.",
    thread: "empyrean",
  },
  H10: {
    at: "2026-10-21 1:48 PM PDT",
    who: C,
    kind: "said",
    said: "power - replace existing non-weatherproof 110VAC power cables/plugs with watertight daisy chained segments permanently installed in each of the 16 truss segments",
    meaning: "The power category's goal.",
    thread: "empyrean",
  },
  H11: {
    at: "2026-10-21 1:48 PM PDT",
    who: C,
    kind: "said",
    said: "networking - switch in each node for daisy chaining and enabling expansion ports",
    meaning: "The networking category's goal.",
    thread: "empyrean",
  },
  H12: {
    at: "2026-10-21 1:48 PM PDT",
    who: C,
    kind: "said",
    said: "compute - new computer with better gpu",
    meaning: "The compute category's goal.",
    thread: "empyrean",
  },
  H13: {
    at: "2026-10-21 1:48 PM PDT",
    who: C,
    kind: "said",
    said: "weatherproofing - new node & brain boxes. live inside truss next to power boxes.",
    meaning:
      "The weatherproofing category's goal; boxes live inside the truss.",
    thread: "empyrean",
  },
  H14: {
    at: "2026-10-21 1:48 PM PDT",
    who: C,
    kind: "said",
    said: "(no sharing power with data)",
    meaning: "Power and data never share a box.",
    thread: "empyrean",
  },
  H15: {
    at: "2026-10-21 1:48 PM PDT",
    who: C,
    kind: "said",
    said: "expansion - future poe upgrades. cameras. streaming audio to speakers.",
    meaning: "The expansion category's goal.",
    thread: "empyrean",
  },
  H16: {
    at: "2026-10-21 2:11 PM PDT",
    who: C,
    kind: "said",
    said: "share with people the plans for the future in more detail, with hard numbers… visual aides. pie charts. stretch goals. diagrams… the root view should be quick and to the point. make a print view… a mini demo version of the playground… a simple password protection",
    meaning: "What the site is for and what it has.",
    thread: "upgrades",
  },
  H17: {
    at: "2026-10-21 4:56 PM PDT",
    who: C,
    kind: "said",
    said: 'a single twist lock plug that powers the whole ring in a single loop. I\'d love 3-phase, but 2-phase would be enough… a 30-50A waterproof twist-lock. or an "RV" connector (as long as it is twist lock and waterproof)',
    meaning:
      "One twist-lock feed, 30–50 A, for the whole ring. Three-phase preferred, split-phase acceptable.",
    aiReading:
      'The AI made "a single loop" an open ring capped at the far end (code reasons), which the user then approved (H20).',
    thread: "upgrades",
  },
  H18: {
    at: "2026-10-21 5:10 PM PDT",
    who: C,
    kind: "said",
    said: "the current draws an average of only 1500W-2000W for the whole thing. the most important thing is what's commonly available in rental generators",
    meaning:
      "V1 averages 1.5–2 kW. The feed connector follows what rental generators have.",
    thread: "upgrades",
  },
  H19: {
    at: "2026-10-21 6:25 PM PDT",
    who: C,
    kind: "said",
    said: "anyway we can have a remote, non-automated, reset for the breakers without home running everything?",
    meaning: "Asked for a remote, human-triggered breaker reset.",
    supersededBy: "H48",
    thread: "upgrades",
  },
  H20: {
    at: "2026-10-21 9:38 PM PDT",
    who: C,
    kind: "approved",
    said: "Yes",
    meaning:
      "Approved the AI's power design: an L14-30 feed (with an adapter for towables), an 8/4 trunk, an open loop, a ground-fault breaker per segment.",
    thread: "upgrades",
  },
  H21: {
    at: "2026-10-21 9:38 PM PDT",
    who: C,
    kind: "answered",
    said: "no",
    meaning: "No brightness cap in the Empyrean app.",
    thread: "upgrades",
  },
  H22: {
    at: "2026-10-21 9:50 PM PDT",
    who: C,
    kind: "said",
    said: 'this seems expensive. let\'s find off the shelf "extension" cables we can cut in half and use',
    meaning:
      "Joints from off-the-shelf extension cords cut in half, not $355 watertight connectors.",
    aiReading:
      "After the ring grew to 60 ft the AI switched the leading choice to loose plug ends on bulk cord: the 10 ft cords' halves were too short. Cut cords are now only the fallback.",
    thread: "upgrades",
  },
  H23: {
    at: "2026-10-21 9:50 PM PDT",
    who: C,
    kind: "said",
    said: "power boxes will also need a handful of local power plugs in each truss segment",
    meaning: "Local outlets in every segment's power box.",
    thread: "upgrades",
  },
  H24: {
    at: "2026-10-21 10:48 PM PDT",
    who: C,
    kind: "said",
    said: "rain proof is enough for us. we're not going underwater",
    meaning: "Rain-proof joints, not watertight.",
    thread: "upgrades",
  },
  H25: {
    at: "2026-10-21 10:56 PM PDT",
    who: C,
    kind: "approved",
    said: "should be",
    meaning: "Four local outlets per power box.",
    thread: "upgrades",
  },
  H26: {
    at: "2026-10-21 10:56 PM PDT",
    who: C,
    kind: "answered",
    said: "james logistic",
    meaning: "The contact for larger gifts.",
    thread: "upgrades",
  },
  H27: {
    at: "2026-10-21 10:56 PM PDT",
    who: C,
    kind: "approved",
    said: "good idea. round up",
    meaning: "15 % contingency on every tier; goals rounded up to $500.",
    thread: "upgrades",
  },
  H28: {
    at: "2026-10-21 10:56 PM PDT",
    who: C,
    kind: "answered",
    said: "v2",
    meaning: "The industrial show computer is in the V2 goal, not a stretch.",
    aiReading:
      "Which industrial PC (the Neousys Nuvo-9160GC with an RTX 2000E Ada) is the AI's pick.",
    thread: "upgrades",
  },
  H29: {
    at: "2026-10-21 11:11 PM PDT",
    who: "James Logistic",
    kind: "said",
    said: "the Gate is 60’ in diameter, not 50’. The power cable calcs are also based on 50’ times pi",
    meaning: "The ring is 60 ft across.",
    thread: "upgrades",
  },
  H30: {
    at: "2026-10-21 11:23 PM PDT",
    who: C,
    kind: "said",
    said: "i probably know more about the power than james… but he is familiar with the generators more",
    meaning:
      "Generator questions go to James; power design questions to Cameron.",
    thread: "upgrades",
  },
  H31: {
    at: "2026-10-21 11:25 PM PDT",
    who: C,
    kind: "answered",
    said: "estimated max draw I think. the strips never really draw what everyone expects",
    meaning:
      "The V1 drawing's circuit loads (80 A) are estimated maxima, not measured.",
    thread: "upgrades",
  },
  H32: {
    at: "2026-10-21 11:25 PM PDT",
    who: C,
    kind: "said",
    said: "i would be open to increasing the ampacity for maximum expansion - or even showing two options in the plan and comparing pricing.",
    meaning: "Compare a bigger feed against 30 A, with prices.",
    thread: "upgrades",
  },
  H33: {
    at: "2026-10-21 11:25 PM PDT",
    who: C,
    kind: "said",
    said: "we should probably make 20A outlets at our in-truss spider boxes",
    meaning: "The local outlets are 20 A.",
    thread: "upgrades",
  },
  H34: {
    at: "2026-10-21 11:30 PM PDT",
    who: C,
    kind: "said",
    said: 'self climbing/self erecting system. two options, one that replaces half of the arced parts with parts that have a passthrough for the vertical, the other option is a "shelf" that hangs off the verticals',
    meaning: "The rigging category and its two options.",
    aiReading:
      "The AI's leading option (stock sleeve blocks added to the ring, V1 arcs kept) is a third variant, not either of the two the user named.",
    thread: "upgrades",
  },
  H35: {
    at: "2026-10-21 11:30 PM PDT",
    who: C,
    kind: "said",
    said: "another stretch goal is a full solar power system, possibly with enough power to run the speakers",
    meaning: "Solar is a stretch goal; speakers maybe.",
    thread: "upgrades",
  },
  H36: {
    at: "2026-10-21 11:46 PM PDT",
    who: C,
    kind: "said",
    said: "another section for a dedicated shipping container and transport carts that make it easy to roll [everything] in and out",
    meaning: "The transport category.",
    thread: "upgrades",
  },
  H37: {
    at: "2026-10-21 11:59 PM PDT",
    who: C,
    kind: "said",
    said: 'a new "VJ Console" (a USB-C dock based unit that plugs into the computer over long (fiber extended?) USB-C and power, and give a nice touch screen and physical buttons, maybe even sliders, knobs. maybe even flying ones',
    meaning:
      "A VJ console stretch goal: touch screen, buttons, sliders, knobs, maybe motorised faders, on one long cable.",
    aiReading:
      'The AI ruled out the USB-C dock the user described (no video on the show computer\'s USB-C) and uses one Cat6a run instead. "Flying" was read as motorised faders.',
    thread: "upgrades",
  },
  H38: {
    at: "2026-10-22 12:34 AM PDT",
    who: C,
    kind: "answered",
    said: "Oakland. we probably have a storage solution.",
    meaning:
      "The container lives in Oakland between events; storage is likely free.",
    thread: "upgrades",
  },
  H39: {
    at: "2026-10-22 12:34 AM PDT",
    who: C,
    kind: "answered",
    said: "yes",
    meaning: "The Gate goes to events other than Burning Man.",
    thread: "upgrades",
  },
  H40: {
    at: "2026-10-22 12:34 AM PDT",
    who: C,
    kind: "answered",
    said: "with camp, on esplanade",
    meaning: "At Burning Man the Gate is with a camp, on the Esplanade.",
    thread: "upgrades",
  },
  H41: {
    at: "2026-10-22 12:34 AM PDT",
    who: C,
    kind: "answered",
    said: "it fills a 26' box truck. container is slightly shorter, but not much. i haven't measured the truss but looks pretty \"standard\".",
    meaning: "The Gate fills a 26 ft box truck; the truss looks standard.",
    thread: "upgrades",
  },
  H42: {
    at: "2026-10-22 12:34 AM PDT",
    who: C,
    kind: "answered",
    said: "into 8 pieces i think",
    meaning: "The hub breaks down into about 8 pieces.",
    thread: "upgrades",
  },
  H43: {
    at: "2026-10-22 12:34 AM PDT",
    who: C,
    kind: "answered",
    said: "structural spokes are cables. between cables are sails. currently we take LEDs out of sails every event because they were damaged when left in sails once… i think this was a bad call… if we make a rack to hang the sails, we can more likely leave led's in, which makes setup easier too",
    meaning:
      "Spokes are cables with sails between; a rack to hang the sails so the LEDs can stay in.",
    aiReading:
      "Rolling each sail onto its own tube on a wall rack is the AI's design of that rack.",
    thread: "upgrades",
  },
  H44: {
    at: "2026-10-22 12:42 AM PDT",
    who: C,
    kind: "said",
    said: "we might already have a container…",
    meaning: "The crew may already own a container.",
    thread: "upgrades",
  },
  H45: {
    at: "2026-10-22 12:46 AM PDT",
    who: C,
    kind: "answered",
    said: "one sail per node box. so 16… you should be able to compute the cord length from the outer diameter.",
    meaning: "16 sails, one per node box.",
    thread: "upgrades",
  },
  H46: {
    at: "2026-10-22 12:51 AM PDT",
    who: C,
    kind: "said",
    said: "8 legs",
    meaning: "The Gate has 8 legs (the 2022 drawing showed 6).",
    thread: "upgrades",
  },
  H47: {
    at: "2026-10-22 12:52 AM PDT",
    who: C,
    kind: "said",
    said: "we don't need to include these images in the repo… we could change that decision though",
    meaning: "Source drawings stay out of the repo, for now.",
    thread: "upgrades",
  },
  H48: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "said",
    said: "no remote reset. we can point the breakers down and use a stick to reset.",
    meaning: "No remote reset: breakers face down, reset with a pole.",
    aiReading:
      "The breaker (Ericson 1075-AR) and mounting it through the box floor are the AI's.",
    thread: "upgrades",
  },
  H49: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "said",
    said: "no walkway/solar up top.",
    meaning: "Nothing goes on top of the ring.",
    thread: "upgrades",
  },
  H50: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "30A 3 phase should be enough. but let's price out 50A and 100A just in case…",
    meaning:
      "30 A three-phase is the user's preferred feed; price 50 A and 100 A too.",
    thread: "upgrades",
  },
  H51: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "probably, yes. something simple attached to truss above box",
    meaning: "Sun shields: something simple on the truss above the boxes.",
    aiReading:
      "One per segment over both boxes, white aluminium sheet, $50–150 each: the AI's.",
    thread: "upgrades",
  },
  H52: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "crane at burning man, 8 hand at other events. need to rent them every deploy…",
    meaning: "V1 is raised by a crane at Burning Man; rented gear elsewhere.",
    aiReading:
      '"8 hand" was first read as eight hand chain hoists. H63 settles it: eight hand-cranked cable hoists or lifts.',
    thread: "upgrades",
  },
  H53: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "solar and battery is its own dedicated stretch category",
    meaning: "Solar is its own category and goal.",
    thread: "upgrades",
  },
  H54: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "40'… fair…",
    meaning: "The crew's container is a 40 ft, in fair condition.",
    thread: "upgrades",
  },
  H55: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "would be nice to put the computer in the air… but 20' is limit of normal usbc4… there are extender boxes that send the data over fiber that should work, right?",
    meaning:
      "Maybe the show computer goes up in the rig; the console then needs a long link.",
    thread: "upgrades",
  },
  H56: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "answered",
    said: "not important now. drop",
    meaning: "Tier names and order: not a question for now.",
    thread: "upgrades",
  },
  H57: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "approved",
    said: "sure. let's keep it consistent",
    meaning: "The ring diagram is lettered A–P like the V1 drawings.",
    thread: "upgrades",
  },
  H58: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "approved",
    said: "sure",
    meaning: "The draft banner comes off.",
    thread: "upgrades",
  },
  H59: {
    at: "2026-10-22 1:03 AM PDT",
    who: C,
    kind: "approved",
    said: "yes. use the real drawing's dimensions. they should be pretty accurate.",
    meaning: "Fix the ring size in the Empyrean software from the drawings.",
    thread: "upgrades",
  },
  H60: {
    at: "2026-10-22 10:41 PM PDT",
    who: C,
    kind: "said",
    said: "I think L21-30 is 3 phase with neutral.",
    meaning: "True three-phase (L21-30) was meant by H50.",
    thread: "upgrades",
  },
  H61: {
    at: "2026-10-22 10:41 PM PDT",
    who: C,
    kind: "answered",
    said: "no",
    meaning: "The crew's container is not a high cube.",
    thread: "upgrades",
  },
  H62: {
    at: "2026-10-22 10:41 PM PDT",
    who: C,
    kind: "answered",
    said: "if we get a fiber adapter, any length is possible",
    meaning: "The console link can be any length over fiber.",
    thread: "upgrades",
  },
  H63: {
    at: "2026-10-23 1:31 PM PDT",
    who: C,
    kind: "answered",
    said: "right now we rent 8 hand cranked cable hoists/lifts.",
    meaning:
      "At events other than Burning Man, V1 is raised on eight rented hand-cranked cable hoists or lifts.",
    thread: "upgrades",
  },
  H64: {
    at: "2026-10-23 1:31 PM PDT",
    who: C,
    kind: "said",
    said: "I want to run the power supplies from 240VAC... they get more efficient I think.",
    meaning:
      "The pixel and node supplies run line to line (240 V split-phase, 208 V on three-phase), not 120 V.",
    aiReading:
      "Checked: Mean Well's HLG-600H draws 7 A at 115 VAC and 3.3 A at 230 VAC (about 6 % less input for the same output) and takes 90–305 VAC. Line-to-line supplies need a two-pole ground-fault breaker per segment, not yet chosen.",
    thread: "upgrades",
  },
  H65: {
    at: "2026-10-23 1:31 PM PDT",
    who: C,
    kind: "said",
    said: "3 phase triples the total power of 2 phase",
    meaning: "Three-phase is preferred for the extra capacity.",
    aiReading:
      "At 30 A a leg it is 1.5×, not 3×: split-phase 240 × 30 = 7.2 kVA, three-phase 120/208 V √3 × 208 × 30 = 10.8 kVA (5.76 vs 8.64 kVA continuous). It is 3× single-phase 120 V.",
    thread: "upgrades",
  },
  H66: {
    at: "2026-10-22 9:41 PM PDT",
    who: C,
    kind: "said",
    said: "can you add a second password? … so that we can give different numbers to people",
    meaning:
      "A second password, given as a pattern with a number in it, so each person can get their own number.",
    thread: "upgrades",
  },
  H67: {
    at: "2026-10-22 10:30 PM PDT",
    who: C,
    kind: "approved",
    said: "2 + analytics engine sounds good. log it all.",
    meaning:
      "Each numbered password gets its own cookie and can be cancelled alone, and every visit is recorded (Workers Analytics Engine and Workers Logs).",
    thread: "upgrades",
  },
  H68: {
    at: "2026-10-23 3:42 PM PDT",
    who: C,
    kind: "said",
    said: "the point is that it's relatively open but we can secretly give visitor unique tracking links.",
    meaning:
      "The numbered passwords are tracking links, not security: the site is meant to be fairly open. Two digits is enough; that someone could try every number doesn't matter.",
    thread: "upgrades",
  },
  H69: {
    at: "2026-10-24 10:44 PM PDT",
    who: C,
    kind: "said",
    said: "I'm leaning 3-phase. L21.",
    meaning:
      "The feed is three-phase L21-30, not the L14-30 the AI recommended.",
    aiReading:
      "A lean, not a final call. The site now leads with L21-30 on 8/5 cord: 25 A at 50 °C (30 A at 45 °C or below), so about 7.2 kVA continuous in playa heat against the L14-30's 5.76.",
    thread: "upgrades",
  },
  H70: {
    at: "2026-10-24 10:44 PM PDT",
    who: C,
    kind: "said",
    said: "we never want to light half of it. Or you mean for power dist? I guess we should include the option to split the power in half...",
    meaning:
      "The power can be split into two halves of the ring, each able to take its own feed later. The light is never split.",
    thread: "upgrades",
  },
  H71: {
    at: "2026-10-24 10:44 PM PDT",
    who: C,
    kind: "approved",
    said: "yes, merge #6.",
    meaning: "Merge Empyrean PR #6 (the ring size from the 2022 drawings).",
    thread: "upgrades",
  },
  H72: {
    at: "2026-10-25 1:00 AM PDT",
    who: C,
    kind: "said",
    said: "why? can't we force fix it?",
    meaning:
      "The show machine's saved geometry should move to the new ring size on its own, not wait for someone to change it in Settings.",
    aiReading:
      "Only a config still on the old default (exactly 25 / 8 ft) moves; radii set by hand stay.",
    thread: "upgrades",
  },
} as const satisfies Record<string, Said>;

export type HumanId = keyof typeof HUMAN;

export const HUMAN_IDS = Object.keys(HUMAN) as HumanId[];

/**
 * Who drove a piece of content. Absent means an AI draft. `h` names what a
 * human said; `doc` a document the AI read the fact from (a V1 drawing, the
 * Empyrean repo); `what` says which part is theirs when the text says more.
 */
export interface Credit {
  h?: HumanId[];
  doc?: string;
  what?: string;
}

/** Where the AI's call goes against what a human said. Shown first in review. */
export interface Conflict {
  h: HumanId[];
  note: string;
}

/**
 * `human`: a person said it all. `mixed`: a person set the direction (`what`)
 * and the AI filled in the rest, which still needs checking.
 */
export type Origin = "human" | "mixed" | "doc" | "ai";

export function originOf(credit: Credit | undefined): Origin {
  if (credit?.h?.length) return credit.what ? "mixed" : "human";
  if (credit?.doc) return "doc";
  return "ai";
}
