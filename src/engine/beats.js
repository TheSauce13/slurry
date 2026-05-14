// Beat structure
// Each beat has:
//   scenetype        — dramatic description of what kind of scene this is
//   objective        — one-line player goal shown in sidebar
//   descriptiveFocus — what the AI should foreground in its prose
//   anchors          — 2-3 example situations; AI draws from one, doesn't reproduce verbatim
//   rules            — hard constraints passed to the AI
//   location         — canonical location name (passed as spatial context)
//   prose            — static fallback paragraphs if API fails
//   prompt           — static fallback choice question if API fails
//   options          — mechanical choices (stat checks + effects unchanged)

export const BEATS = [
  {
    id: 1,
    name: 'Arrival',
    type: 'world-building',
    location: 'The Wharf — the canal docks and waterfront',
    objective: 'Get your bearings of the town.',

    scenetype: 'The player arrives in Greylock Wharf.',
    descriptiveFocus: 'The docks of Greylock Wharf and its existence next to the Slurry. Early industrial, a town in a fenland region. The Slurry\'s thick gloopy nature and its necessity for life in this world.',
    anchors: [
      'It\'s a foggy early morning on the dock. It\'s quiet, but workers are starting to arrive and begin their day\'s work. The sound is quiet, even some local birds can be heard. The smell of fresh morning dew and damp wood of the boats are almost pleasant but interrupted by wafts of the Slurry below.',
      'Mid morning, it\'s lightly raining — the drops smack against the thick Slurry and it doesn\'t react as water but more thick sludge. The wharf is busy with dockhands and stevedores unloading, foremen ordering people about and clerks tracking the daily goods. As lunchtime nears, local traders are setting up their wares for the lunch rush — a woman selling eels, a baker with water crust pies. The smell of fresh simple food mixed with the smells of a busy dock and the Slurry below combine to confuse the nose.',
      'Early evening. After a rainy day the clouds have begun to break to show a low orange sunset through the red clouds, contrasting with the black sludge of the Slurry. The final barges of the day have pulled in. The smell from the Slurry is ripe at the end of the day after being churned up by a day\'s traffic. The wharf is quieting now, but noise can be heard from the nearby tavern.',
    ],
    rules: [
      'Nothing too dramatic — this is the player\'s first introduction to the world.',
      'The Tollmaster does not appear in this beat.',
      'Locals may notice the player but do not confront them directly yet.',
    ],

    prose: [
      'Greylock Wharf announces itself through the nose before the eyes have a chance to adjust. The Slurry is low today, its black surface near-still, a morning mist sitting on it like a lid on a pot of something you\'d rather not identify.',
      'The wharf is busy in the manner of a thing that has been busy so long it no longer notices. Canal workers with eel-grey faces haul sacking from a flatboat. A pair of constables stand outside a grain chandler\'s, not doing anything in particular with great conviction.',
      'You are here. The town has not yet noticed.',
    ],
    prompt: 'How do you enter the situation?',
    options: [
      {
        id: 'push',
        label: 'Push through openly',
        checks: ['brawn', 'brass'],
        success: {
          prose: 'You move through the crowd with the particular energy of someone who has decided not to be stopped. Heads turn. A few step aside. Nobody says anything — yet. Your presence in Greylock Wharf has been noted.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You push forward, but the crowd doesn\'t part so much as absorb you. An elbow catches your side. A cart blocks the lane at the worst moment. You arrive looking slightly rumpled and slightly lost, which is the opposite of the impression you intended.',
          effects: { reputation: -1 },
        },
      },
      {
        id: 'observe',
        label: 'Observe before moving',
        checks: ['lurk', 'wit'],
        success: {
          prose: 'You find a doorway and watch. Ten minutes of stillness and you have a clearer picture of the ground than most people acquire in a month of living here. You step out knowing exactly where not to go.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You wait and watch, but the wharf gives up little. The motion is too dense, the patterns too layered. By the time you move, things have shifted and you proceed on instinct, which is what you should have done to begin with.',
          effects: {},
        },
      },
      {
        id: 'talk',
        label: 'Find someone to talk to',
        checks: ['brass', 'wit'],
        success: {
          prose: 'You locate the least-suspicious-looking person in your immediate vicinity and offer a pleasantry. She tells you, briefly and accurately, everything you\'d want to know about getting through the wharf without incident. She asks nothing in return, which is its own kind of warning.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You open a conversation with the least-suspicious-looking person on the dock. She turns out to be suspicious in ways that weren\'t visible from a distance. She tells you very little and watches you walk away with an expression that suggests she has already filed you somewhere unpleasant.',
          effects: {},
        },
      },
    ],
  },

  {
    id: 2,
    name: 'The Slurry Moment',
    type: 'survival',
    location: 'The Wharf — the canal edge and working waterfront',
    objective: 'React to what the Slurry throws at you.',

    scenetype: 'An incident near the Slurry forces the player to act — or to choose not to.',
    descriptiveFocus: 'The physical reality of the Slurry — its thickness, its smell, the way things disappear into it. The bleak fact of ordinary life built around something poisonous.',
    anchors: [
      'Dock workers gather at the wharf edge waiting for cargo. Children run messages between points on the dock, darting under the legs of the bigger working men. One child, cutting too close to the edge, loses his footing on the slick stone and goes in — swallowed immediately by the thick black water. The men nearby stop and stare. Nobody moves first.',
      'Along the wall of the Slurry, locals without work fish for their dinner with simple lines. The water is thick and barely moves. A man\'s line snags something heavy below the surface — whatever it is pulls back. He\'s dragged forward before he can let go, boots scrabbling at the wet stone, halfway over the edge.',
      'The morning rush is at full swing, a crane swinging a loaded cargo net out over the water. The chain gives a sound it shouldn\'t — a single bad link — and the net drops, half into the Slurry and half across the bow of a moored punt. The punt tips. A bargeman who was sleeping on it goes into the water face first.',
    ],
    rules: [
      'A person ends up in or about to go into the Slurry. This is the central situation.',
      'The player\'s choices determine whether and how they help.',
      'Keep the incident minor — nobody dies unless the player does nothing, and even then it stays ambiguous.',
      'The Tollmaster does not appear in this beat.',
    ],

    prose: [
      'The bridge across the south inlet is narrow, worn to a shine in the middle, and busy with foot traffic that has learned not to look down.',
      'A barge nudges the bridge stanchion — badly loaded, no steerer visible on deck — and the impact sends a crate sliding off the near gunwale. The crate goes into the Slurry. So does the boy who was sitting on it.',
      'The canal is not deep here. It is also not clean. The boy is perhaps twelve, flailing with the specific panic of someone who can swim just well enough to know they are in trouble. People on the bridge stop and watch with the paralysed attention of a crowd that has not yet decided whether this is their problem.',
    ],
    prompt: 'What do you do?',
    options: [
      {
        id: 'physical',
        label: 'Go in after them',
        checks: ['brawn', 'guts'],
        success: {
          prose: 'You are over the rail before you have properly decided to jump. The Slurry receives you with cold indifference. It is thick, black, and tastes of things you will try to forget. You get an arm under them and haul. The person is on solid ground, coughing black water. You are soaked through and will smell of the canal for the rest of the day.',
          effects: { health: -1, honour: 3 },
        },
        failure: {
          prose: 'You go in. The Slurry is deeper than it looked and thicker than it should be. You manage — just — but it takes too long and costs more than it should. You haul them onto the bank and sit there for a full minute, breathing. Your coat is ruined. Something in your side aches in a way that will still ache tomorrow.',
          effects: { health: -2, honour: 2 },
        },
      },
      {
        id: 'clever',
        label: 'Find something to reach them with',
        checks: ['wit', 'graft'],
        success: {
          prose: 'Your eye catches a mooring pole on the near bollard. You have it unshipped and extended in seconds. "Grab it." They grab it. You pull. The crowd, which had been thoroughly useless, begins to applaud.',
          effects: { honour: 2 },
        },
        failure: {
          prose: 'You spot a mooring pole and go for it — but it\'s chained, a detail you missed. By the time you\'ve found a rope instead, a dockhand does what you were trying to do. You hand back the rope. The dockhand doesn\'t say anything.',
          effects: { honour: 1 },
        },
      },
      {
        id: 'walk',
        label: 'Walk away',
        checks: [],
        prose: 'You keep moving. Behind you, eventually, other voices rise and someone does something. You do not look back. You tell yourself it resolved. It sits differently than you expected.',
        effects: { honour: -2 },
      },
      {
        id: 'call',
        label: 'Shout for help',
        checks: ['brass'],
        success: {
          prose: 'Your voice cuts through the frozen crowd. Not a shout — a command. The crowd, which had been waiting for permission, receives it. Three people are suddenly useful. The person is out of the water in under a minute. You have learned something about crowds: they are mostly waiting for someone to tell them what to do.',
          effects: { honour: 1, reputation: 1 },
        },
        failure: {
          prose: 'You shout. The crowd looks at you. Then at the water. The gap between instruction and action is long enough that a dockhand, arriving at a jog, resolves the situation before you do. The person is fine. You are not the reason.',
          effects: { honour: 1 },
        },
      },
    ],
  },

  {
    id: 3,
    name: 'Into the Town',
    type: 'social',
    location: 'Greylock Wharf — the town beyond the docks',
    objective: 'Find out where the Tollmaster is and how to reach him.',

    scenetype: 'A local encounter away from the docks — the player must read someone to get what they need.',
    descriptiveFocus: 'The town of Greylock Wharf beyond the docks — a fenland inland port with most buildings lined along the Slurry. The wider world of the town: its commerce, its poverty, its ordinary people going about their business.',
    anchors: [
      'A marketplace just off the river. The smell of wares from the barges mixes with local produce — turnips, eels, celery, lettuces. There is a general malaise; the economy is not doing well and everyone can feel it. A stall-holder selling eels from a bucket watches the player with the particular attention of someone who notices newcomers for professional reasons. He knows the town. He is not unfriendly, but he is not free either.',
      'Along the North Brink, where the more affluent buildings stand — but they are becoming more shoddy, the effects of the wider country stifling even here. Subtle signs of poverty in a place that used to have none. A clerk comes out of one of the better buildings looking harried, a ledger pressed close to his chest. He works for someone important. He clearly does not want a conversation.',
      'Near the Waders tavern, a crowd of dock workers gathers for the first pint after work. The smell of stale beer and roasted eel comes from inside. Supplies are short and the men grow restless. In the crowd, one man is louder than the rest about the Tollmaster\'s latest levy — he has opinions, and he is not keeping them quiet.',
    ],
    rules: [
      'The player must leave this beat with information about how to reach the Tollmaster.',
      'The information can come through conversation, observation, or overhearing — but it must come.',
      'The Tollmaster does not appear in this beat.',
    ],

    prose: [
      'The town beyond the docks has the particular quality of a place that has been making do for long enough that making do has become the only mode it knows.',
      'On the North Brink, the better buildings face the Slurry with the air of men refusing to acknowledge a smell. A clerk hurries out of one of them without looking up. Further along, the market is setting up with the slow efficiency of people who have done this too many times to be enthusiastic about it.',
      'Someone here knows where to find the Tollmaster. Most people here know most things about most people. The question is what it costs to find out.',
    ],
    prompt: 'How do you find what you need?',
    options: [
      {
        id: 'threaten',
        label: 'Threaten or intimidate',
        checks: ['brawn', 'guts'],
        success: {
          prose: 'You make your meaning clear without raising your voice. The person in front of you decides that the information costs them nothing and gives it up quickly. You have the name of the guildhall and a rough sense of the Tollmaster\'s hours.',
          effects: { honour: -1 },
        },
        failure: {
          prose: 'Your approach lands wrong. The person closes up, gives you something vague and probably inaccurate, and finds somewhere else to be. You have a direction. Whether it\'s the right one is another matter.',
          effects: { honour: -1, reputation: -1 },
        },
      },
      {
        id: 'negotiate',
        label: 'Negotiate or barter',
        checks: ['brass'],
        cost: { coin: 1 },
        success: {
          prose: 'One coin, placed without ceremony. The transaction is understood on both sides. You get a clean answer: the guildhall, near the top of the Brink, you can\'t miss it. The information is worth more than you paid.',
          effects: { flag: { beat2Ally: true } },
        },
        failure: {
          prose: 'The coin changes hands. What comes back is less clear than you\'d hoped — directions that might be accurate, given with the enthusiasm of someone who has taken your money and is now done with you.',
          effects: {},
        },
      },
      {
        id: 'deceive',
        label: 'Deceive or misdirect',
        checks: ['wit', 'lurk'],
        success: {
          prose: 'You construct a story that makes asking seem natural — an old acquaintance, a delivery, a misremembered address. It works. The person answers the question you needed answered without knowing they\'ve done it.',
          effects: { honour: -1 },
        },
        failure: {
          prose: 'Your story has a detail that doesn\'t quite fit. Nobody calls you on it directly, but the answer you get is shorter than it should be, and the person\'s eyes have a quality of having filed something away about you.',
          effects: { honour: -1, reputation: -1 },
        },
      },
      {
        id: 'help',
        label: 'Help someone genuinely',
        checks: [],
        prose: 'You stop and actually listen to what\'s in front of you. The person with a problem is more use than they looked. They answer your question without you having to ask it directly, because people who feel heard tend to give things freely. The guildhall. Top of the Brink. Ask for the secretary.',
        effects: { honour: 2, flag: { beat2Ally: true } },
      },
    ],
  },

  {
    id: 4,
    name: "The Tollmaster's Threshold",
    type: 'gatekeeper',
    location: 'The Guildhouse — the entrance hall and secretary\'s desk',
    objective: 'Get through the door.',

    scenetype: 'The player must get past whatever stands between them and an audience with the Tollmaster.',
    descriptiveFocus: 'The outside and inner entrance of the Guildhouse — the tallest building in the town. An imposing window on the top floor gazes down like an eye overseeing the docks and the Slurry below.',
    anchors: [
      'A queue of people waiting — merchants, petitioners, someone who has been there since morning. The secretary processes them one by one from behind a high desk. Getting to the front is not the problem; being admitted is.',
      'The front entrance is closed. A handwritten notice says appointments only. A side passage leads round to the coal delivery entrance, which appears unguarded.',
      'A man is being turned away as the player arrives — loudly, humiliatingly. The secretary watches from the doorway. The player sees exactly what they are dealing with before they have said a word.',
    ],
    rules: [
      'The beat ends with the player either inside or turned away — Beat 5 picks up from here.',
      'The Tollmaster does not appear in this beat. He is behind the door, not at it.',
    ],

    prose: [
      'The old guildhall squats at the centre of Greylock Wharf. Its stonework is serious, its windows tall and narrow as accusations, and the Tollmaster\'s seal has been cut into the lintel with the permanence of something that expects to be obeyed.',
      'The entrance is guarded by a secretary. She sits at a desk in the outer hall with the particular stillness of someone who has processed a great many people and found all of them wanting.',
      '"Name and business," she says. "The Tollmaster is occupied. Appointments are by arrangement."',
    ],
    prompt: 'How do you get in?',
    options: [
      {
        id: 'talk',
        label: 'Talk your way past',
        checks: ['brass'],
        success: {
          prose: 'You tell her something true enough to be verifiable and interesting enough to be worth reporting. By the time you finish, she has stopped writing and is writing something on a separate slip. Forty seconds later a clerk returns with a different expression. "The Tollmaster will see you."',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You make your case. It\'s not a bad case. She listens and returns to her ledger. "Chandler\'s Lane," she says. You are about to press the point when a distraction opens a gap. You move through it. It works, which is the important thing.',
          effects: { reputation: -1 },
        },
      },
      {
        id: 'bribe',
        label: 'Offer a consideration',
        checks: [],
        cost: { coin: 2 },
        prose: 'You place two coins on the ledger — not in her hand, which would be crude, but near enough to her pen that the gesture is legible. She looks at the coins. She looks at you. A bell is rung. "A moment of the Tollmaster\'s time has become available."',
        effects: {},
      },
      {
        id: 'sneak',
        label: 'Find another way in',
        checks: ['lurk', 'graft'],
        success: {
          prose: 'The guildhall\'s rear connects to a service lane. The back door is bolted but the frame has warped. Ten minutes of patient attention and you are inside a corridor that smells of lamp oil. You follow the sound of a voice that has learned to project. You find a door. You knock on it from the inside. "Well," says the voice. "Come in, then."',
          effects: {},
        },
        failure: {
          prose: 'You find the service lane and spend an instructive ten minutes discovering that the bolt is newer than the frame suggests. When you finally get the door open, a junior clerk is standing on the other side, looking at you with the expression of someone told to watch for exactly this. He escorts you to the front desk, which is arguably worse.',
          effects: { reputation: -1 },
        },
      },
      {
        id: 'contact',
        label: 'Use your contact',
        checks: [],
        requiresFlag: 'beat2Ally',
        prose: '"Doyle sent me" is a sentence with consequences in Greylock Wharf. The secretary\'s pen stops. She looks at you properly for the first time. She goes through the door herself. When she returns, she holds it open. "He\'s between appointments."',
        effects: {},
      },
    ],
  },

  {
    id: 5,
    name: 'The Audience',
    type: 'climax',
    location: 'The Guildhouse — the Tollmaster\'s private office',
    objective: 'Face the Tollmaster. Leave with a reason to keep moving.',

    scenetype: 'The Tollmaster receives the player and sets the course for Chapter 2.',
    descriptiveFocus: 'Inside the Tollmaster\'s office — the accumulated weight of his authority in a small room. Papers, ledgers, the view over the Slurry from above. Late in the day: candles being lit, the last light going.',
    anchors: [
      'It is night, candles burned most of the way down, a small fire in the corner providing little warmth. The walls are lined with stacks of papers and ledgers in no discernible order — a chaotic system, possibly deliberate. A large wooden desk near the back. Behind it a huge window looks down over the dock and the Slurry below. The Tollmaster stands with his back to the door, looking out, as the player enters.',
      'Behind the desk, the Tollmaster reads through a long scroll — a ledger of the month\'s shipments. His eyes do not move from it as the player enters. He begins to speak without looking up.',
      'As the player comes through the door a small man rushes out the other way, note in hand — a runner. He catches the player with his elbow as he passes. The Tollmaster, watching from behind his desk, beckons the player over with a wry smile.',
    ],
    rules: [
      'Must happen late in the day — it has taken the character the full day to get here.',
      'The Tollmaster must instruct the player to travel to the Isle of Eels and make contact with the Church. This is the hook for Chapter 2.',
      'The Tollmaster is theatrical and self-important but not a fool. He has read the player already before they speak.',
    ],

    prose: [
      'The Tollmaster is smaller than expected and more theatrical than necessary. He stands behind a desk the size of a small barge, flanked by ledgers, framed proclamations, and a portrait of himself that has been commissioned with the specific instruction that he appear taller.',
      '"Sit," he says, without looking up. "Or don\'t. People\'s relationship to furniture tells me a great deal."',
      'He asks questions he already knows the answers to, then watches what you do with that knowledge. He talks about the town\'s factions with the fluency of a man who has profited from all of them. Finally, he leans back. "I have a proposition. Everyone who passes through Greylock Wharf is useful to someone. I would prefer you be useful to me."',
    ],
    prompt: 'How do you leave this meeting?',
    options: [
      {
        id: 'accept',
        label: 'Accept his terms',
        checks: [],
        prose: 'You nod — not eagerly, which he would have despised, but with the measured air of someone calculating interest. He produces a document. "Sensible," he says. As you leave, his secretary hands you a brass token embossed with scales. It will open certain doors.',
        effects: { reputation: 1, tollmasterRelation: 'accepted' },
      },
      {
        id: 'refuse',
        label: 'Refuse outright',
        checks: [],
        prose: 'You tell him no clearly enough that there is no useful ambiguity. He regards you with an expression that is more interested than offended. "Rare," he says. "Inadvisable, but rare." You are dismissed. The token is not offered.',
        effects: { reputation: -1, honour: 1, tollmasterRelation: 'refused' },
      },
      {
        id: 'counter',
        label: 'Counter-offer',
        checks: ['wit', 'brass'],
        success: {
          prose: 'You tell him his terms are generous, which you both know means you find them insufficient. You propose a revision — narrower, more specific, with an exit clause he will never use but appreciates being offered. "Revised," he says, and reworks the document himself. What you sign is better than what he offered. He seems pleased by this.',
          effects: { reputation: 2, tollmasterRelation: 'countered' },
        },
        failure: {
          prose: 'You make your counter. He examines it. In the end he sets it aside. "I admire the attempt," he says. "Sign here." The terms are his. You have, however, demonstrated that you are not simply obedient, which he files away.',
          effects: { reputation: 1, tollmasterRelation: 'accepted' },
        },
      },
      {
        id: 'threaten',
        label: 'Threaten him',
        checks: ['brawn', 'guts'],
        success: {
          prose: 'You make clear — without raising your voice — that the Tollmaster\'s continued comfort depends in some measure on your goodwill. The room gets very quiet. His hand moves toward the bell and then, after a calculation, moves away. "Interesting," he says. He is frightened and furious and, buried under both, impressed.',
          effects: { reputation: 1, honour: -1, tollmasterRelation: 'threatened' },
        },
        failure: {
          prose: 'You make the threat. He listens. Then he rings the bell — not the small one but the large one mounted on the wall. Two men appear in under ten seconds. "Show our guest out." He is not angry. That is the most frightening thing about it.',
          effects: { reputation: -2, honour: -1, tollmasterRelation: 'refused' },
        },
      },
    ],
  },
];
