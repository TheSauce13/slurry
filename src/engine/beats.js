// Each option has either:
//   checks: ['stat', ...]  → success / failure outcomes (highest stat used)
//   checks: []             → prose / effects (single neutral outcome)
// Cost is always deducted before the check.

export const BEATS = [
  {
    id: 1,
    name: 'Arrival / Orientation',
    type: 'world-building',
    location: 'The Wharf — the canal docks and waterfront',
    prose: [
      'Greylock Wharf announces itself through the nose before the eyes have a chance to adjust. The Slurry is low today, its black surface near-still, a morning mist sitting on it like a lid on a pot of something you\'d rather not identify. Barges line the near bank, most of them half-loaded or long-abandoned, their hulls patched and re-patched until the original timber is a philosophical question.',
      'The wharf is busy in the manner of a thing that has been busy so long it no longer notices. Canal workers with eel-grey faces haul sacking from a flatboat. A pair of constables stand outside a grain chandler\'s, not doing anything in particular with great conviction. Somewhere up the lane, a broadsheet seller is hollering about the Tollmaster\'s latest proclamation, though the words are lost in the general din.',
      'You are here. The town has not yet noticed.',
    ],
    prompt: 'How do you enter the situation?',
    options: [
      {
        id: 'push',
        label: 'Push through openly',
        checks: ['brawn', 'brass'],
        success: {
          prose: 'You move through the crowd with the particular energy of someone who has decided not to be stopped. Heads turn. A few step aside. A chandler\'s boy scurries out of your path and gives you a look that contains equal parts fear and professional assessment. Nobody says anything — yet. Your presence in Greylock Wharf has been noted.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You push forward, but the crowd doesn\'t part so much as absorb you. An elbow catches your side. A cart blocks the lane at the worst moment. You arrive at the far end of the wharf looking slightly rumpled and slightly lost, which is the opposite of the impression you intended. A constable\'s eyes follow you for a moment longer than is comfortable.',
          effects: { reputation: -1 },
        },
      },
      {
        id: 'observe',
        label: 'Observe before moving',
        checks: ['lurk', 'wit'],
        success: {
          prose: 'You find a doorway and watch. The constables rotate clockwise on the hour. The chandler\'s boy runs messages on a fixed route. The broadsheet man\'s eyes are not fixed on his papers. Ten minutes of stillness and you have a clearer picture of the ground than most people acquire in a month of living here. You step out knowing exactly where not to go.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You wait and watch, but the wharf gives up little. The motion is too dense, the patterns too layered. You note the constables, the carts, the faces — but by the time you move, two of the constables have swapped posts and a gate you intended to use is now latched. You proceed on instinct, which is what you should have done to begin with.',
          effects: {},
        },
      },
      {
        id: 'talk',
        label: 'Find someone to talk to',
        checks: ['brass', 'wit'],
        success: {
          prose: 'You locate the least-suspicious-looking person in your immediate vicinity — a woman repairing rope on a bollard — and offer a pleasantry. She looks at you. Then she tells you, briefly and accurately, everything you\'d want to know about getting through the wharf without incident. The Tollmaster\'s men work the south gate. The north channel is quicker but watched. She asks nothing in return, which is its own kind of warning.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You open a conversation with the least-suspicious-looking person on the dock. She is, it turns out, suspicious in ways that weren\'t visible from a distance. She tells you very little, charges you nothing, and watches you walk away with an expression that suggests she has already filed you somewhere in her memory under a heading you wouldn\'t choose for yourself.',
          effects: {},
        },
      },
    ],
  },

  {
    id: 2,
    name: 'Someone Wants Something',
    type: 'social',
    location: 'The Wharf — the main waterfront, near the dock entrance',
    prose: [
      'You are barely twenty yards into the wharf proper when he finds you. A man — thin in the way that is not elegant, with a coat two sizes too large and eyes doing too much work — steps from between two bollards and into your path with the practised ease of someone who has been waiting.',
      '"New face," he says. It is not a question. "Word of advice, gratis: the Tollmaster\'s office levies a registration fee on newcomers. Coin up front or they hold you at the guildhall gate until someone vouches. I can vouch." He pauses. "For a consideration."',
      'He may be exactly what he appears. He may be working for someone. In Greylock Wharf, the two are not mutually exclusive.',
    ],
    prompt: 'How do you handle this person?',
    options: [
      {
        id: 'threaten',
        label: 'Threaten or intimidate',
        checks: ['brawn', 'guts'],
        success: {
          prose: 'You hold his gaze for three seconds longer than is comfortable. Something in your expression communicates information that renders further negotiation unnecessary. He steps back. "No offence meant," he says, and means it. He doesn\'t run, which tells you he has some pride. He does leave, which tells you he has some sense.',
          effects: { honour: -1 },
        },
        failure: {
          prose: 'You fix him with a look intended to be intimidating. He receives it with the mild interest of a man who has been threatened by people considerably more frightening than you and is still, notably, alive. "Right," he says, as if you\'ve confirmed something. He doesn\'t leave — he just repositions, leaning against a post with the patience of someone who has nowhere better to be and knows it.',
          effects: { honour: -1, reputation: -1 },
        },
      },
      {
        id: 'negotiate',
        label: 'Negotiate or barter',
        checks: ['brass'],
        cost: { coin: 1 },
        success: {
          prose: 'You give him one coin — less than he wanted, more than he expected. He pockets it with the speed of a man who has learned not to count in public. "Doyle," he says, by way of introduction or receipt. "I know the wharf. You need anything clarified." He produces a card that is mostly grease. You take it anyway. In a town like this, knowing someone who knows where bodies are is not nothing.',
          effects: { flag: { beat2Ally: true } },
        },
        failure: {
          prose: 'You make your pitch with the coin already in hand. He listens. He takes it. But something in your delivery didn\'t land quite right — too eager, or not eager enough — and the transaction concludes without the warmth you\'d hoped for. "Right," he says. He pockets the money. He does not offer his name. You\'ve paid for the privilege of being tolerated, which is not the same as being helped.',
          effects: {},
        },
      },
      {
        id: 'deceive',
        label: 'Deceive or misdirect',
        checks: ['wit', 'lurk'],
        success: {
          prose: 'You tell him you\'ve already been registered — arrived yesterday, in fact, through the south gate, got your papers signed by a Sergeant Culver or Culliver, something like that. You are pleasantly vague about the details. By the time he decides you might be lying, you are already past him and into the crowd. A useful reminder: certainty is a luxury; plausibility is a tool.',
          effects: { honour: -1 },
        },
        failure: {
          prose: 'Your story has one detail too many, or perhaps one too few. His eyes don\'t change, but something behind them does. "Sergeant Culver\'s been reassigned," he says, pleasantly. "Three months ago." He doesn\'t press the point further — but he doesn\'t move, either, and when you finally extract yourself from the conversation, you have the distinct sense that something has been noted about you.',
          effects: { honour: -1, reputation: -1 },
        },
      },
      {
        id: 'help',
        label: 'Help them genuinely',
        checks: [],
        prose: 'You hear him out properly. He\'s not a tout — or not only a tout. His sister works in the guildhall laundry and the week\'s wages were docked for a breakage she didn\'t cause. He wants to know if there\'s a complaints process. There isn\'t, not really, but you tell him what you do know and you say it like you mean it. He looks at you with an expression you haven\'t seen much in this town yet: gratitude. "Doyle," he says. "Remember that name."',
        effects: { honour: 2, flag: { beat2Ally: true } },
      },
    ],
  },

  {
    id: 3,
    name: 'The Slurry Moment',
    type: 'survival',
    location: 'The bridge over the south inlet — a narrow canal crossing between the docks and the town centre',
    prose: [
      'The bridge across the south inlet is narrow, worn to a shine in the middle, and busy with foot traffic that has learned not to look down. You are halfway across when it happens.',
      'A barge nudges the bridge stanchion — badly loaded, no steerer visible on deck — and the impact sends a crate sliding off the near gunwale. The crate goes into the Slurry. So does the boy who was sitting on it.',
      'The canal is not deep here. It is also not clean. The boy is perhaps twelve, flailing with the specific panic of someone who can swim just well enough to know they are in trouble. The barge drifts on. People on the bridge stop and watch with the paralysed attention of a crowd that has not yet decided whether this is their problem.',
    ],
    prompt: 'What do you do?',
    options: [
      {
        id: 'physical',
        label: 'Go in after him',
        checks: ['brawn', 'guts'],
        success: {
          prose: 'You are over the rail before you have properly decided to jump. The Slurry receives you with cold indifference. It is thick, black, and tastes of things you will try to forget. You get an arm under the boy and haul. A dockhand finally comes to help and between you, the boy is on solid ground, coughing black water. You are soaked through and will smell of the canal for the rest of the day. The boy looks at you like you are the strangest thing that has ever happened to him.',
          effects: { health: -1, honour: 3 },
        },
        failure: {
          prose: 'You go in. The Slurry is deeper than it looked and thicker than it should be, and pulling a panicking twelve-year-old through it is harder than anticipated. You manage — just — but it takes too long and costs more than it should. You haul the boy onto the bank and sit there for a full minute, breathing. Your coat is ruined. Something in your side aches in a way that will still ache tomorrow.',
          effects: { health: -2, honour: 2 },
        },
      },
      {
        id: 'clever',
        label: 'Find something to reach him with',
        checks: ['wit', 'graft'],
        success: {
          prose: 'Your eye catches a mooring pole on the near bollard — six feet of wood with a hook at the end. You have it unshipped and extended over the rail in seconds. "Grab it," you say, loudly and without room for misunderstanding. The boy grabs it. You pull. He scrapes up the stone facing of the bank and collapses on the planking, heaving. You return the pole. The crowd, which had been thoroughly useless up to this point, begins to applaud.',
          effects: { honour: 2 },
        },
        failure: {
          prose: 'You spot a mooring pole and go for it — but it\'s chained to the bollard, a detail you missed, and by the time you\'ve located a length of rope instead, the boy has drifted another few yards downstream. A dockhand finally does what you were trying to do, hauling the boy out with practised efficiency. You hand back the rope. The dockhand doesn\'t say anything. Neither do you.',
          effects: { honour: 1 },
        },
      },
      {
        id: 'walk',
        label: 'Walk away',
        checks: [],
        prose: 'You keep moving. Behind you, eventually, other voices rise and someone does something. You do not look back. By the time you reach the far bank the shouting has resolved into the particular tone of a near-miss rather than a tragedy. You tell yourself that. It sits differently than you expected.',
        effects: { honour: -2 },
      },
      {
        id: 'call',
        label: 'Shout for help',
        checks: ['brass'],
        success: {
          prose: 'Your voice cuts through the frozen crowd like a thing with an edge. Not a shout — a command. "You — get that pole. You — go for the chandler\'s rope. Move." The crowd, which had been waiting for permission, receives it. Three people are suddenly useful. The boy is out of the water in under a minute, coughing and alive. You have learned something about crowds: they are mostly just waiting for someone to tell them what to do.',
          effects: { honour: 1, reputation: 1 },
        },
        failure: {
          prose: 'You shout. The crowd looks at you. Then it looks at the boy. Then it looks at you again. The gap between instruction and action is long enough that you seriously consider going in yourself before a dockhand, arriving from somewhere at a jog, resolves the situation with a rope and a practiced arm. The boy is fine. You are not the reason.',
          effects: { honour: 1 },
        },
      },
    ],
  },

  {
    id: 4,
    name: "The Tollmaster's Threshold",
    type: 'gatekeeper',
    location: 'The Guildhouse — the entrance hall and secretary\'s desk',
    prose: [
      'The old guildhall squats at the centre of Greylock Wharf like a man who has decided he owns the table. Its stonework is serious, its windows tall and narrow as accusations, and the Tollmaster\'s seal — a set of scales with a coin on each side — has been cut into the lintel with the permanence of something that expects to be obeyed.',
      'The entrance is guarded by a secretary. She sits at a desk in the outer hall with the particular stillness of someone who has processed a great many people and found all of them wanting. A ledger is open in front of her. A pen is in her hand. She does not look up when you enter.',
      '"Name and business," she says. "The Tollmaster is occupied. Appointments are by arrangement. Unregistered persons are redirected to the processing office on Chandler\'s Lane." She says all of this at a speed which suggests it has been said many times.',
    ],
    prompt: 'How do you get in?',
    options: [
      {
        id: 'talk',
        label: 'Talk your way past',
        checks: ['brass'],
        success: {
          prose: 'You tell her something true enough to be verifiable and interesting enough to be worth reporting. You do not claim urgency — urgency is for amateurs. You claim relevance. By the time you finish, she has stopped writing in her ledger and started writing something on a separate slip. She sends it through the door with a clerk. Forty seconds later the clerk returns with a different expression. "The Tollmaster will see you," she says.',
          effects: { reputation: 1 },
        },
        failure: {
          prose: 'You make your case. It\'s not a bad case. She listens to it with the practised patience of someone who has heard better and worse, then returns to her ledger and writes something that is not your name. "Chandler\'s Lane," she says. You are about to press the point when a door opens behind her and a clerk emerges looking harried. In the distraction, you move past both of them. It works, which is the important thing.',
          effects: { reputation: -1 },
        },
      },
      {
        id: 'bribe',
        label: 'Offer a consideration',
        checks: [],
        cost: { coin: 2 },
        prose: 'You place two coins on the ledger — not in her hand, which would be crude, but near enough to her pen that the gesture is legible. She looks at the coins. She looks at you. She writes something in the ledger that you suspect is not your name. A bell is rung. "A moment of the Tollmaster\'s time has become available," she says, which is the most expensive sentence you have heard today.',
        effects: {},
      },
      {
        id: 'sneak',
        label: 'Find another way in',
        checks: ['lurk', 'graft'],
        success: {
          prose: 'The guildhall\'s rear is connected to a service lane used for coal delivery. The back door is bolted but the bolt is old and the frame has warped. Ten minutes of patient attention and you are inside a corridor that smells of lamp oil and old paper. You follow the sound of a voice that has learned to project. You find a door. You knock on it from the inside. There is a pause. "Well," says the voice. "Come in, then."',
          effects: {},
        },
        failure: {
          prose: 'You find the service lane, find the back door, and spend an instructive ten minutes discovering that the bolt is newer than the frame suggests. When you finally get it open, a junior clerk is standing on the other side, looking at you with the expression of someone who has been told to watch for exactly this. He does not call for the constables. He does, however, escort you to the front desk, which is arguably worse.',
          effects: { reputation: -1 },
        },
      },
      {
        id: 'contact',
        label: 'Use your contact',
        checks: [],
        requiresFlag: 'beat2Ally',
        prose: '"Doyle sent me" is, it turns out, a sentence with consequences in Greylock Wharf. The secretary\'s pen stops. She looks at you properly for the first time. Something is weighed and found to be, if not in your favour, then at least not against you. She goes through the door herself. When she returns, she holds it open. "He\'s between appointments," she says. It is a distinction without much difference, but you\'ll take it.',
        effects: {},
      },
    ],
  },

  {
    id: 5,
    name: 'The Audience',
    type: 'climax',
    location: 'The Guildhouse — the Tollmaster\'s private office',
    prose: [
      'The Tollmaster is smaller than expected and more theatrical than necessary. He stands behind a desk the size of a small barge, flanked by ledgers, framed proclamations, and a portrait of himself that has been commissioned with the specific instruction that he appear taller. He wears a coat of such determined impressiveness that it has almost succeeded.',
      '"Sit," he says, without looking up from whatever he is reading. "Or don\'t. People\'s relationship to furniture tells me a great deal." He sets down his document. He looks at you.',
      'What follows is an assessment conducted through conversation. He asks questions he already knows the answers to, then watches what you do with that knowledge. He talks about the town\'s factions — the Canal Guild, the Reformers, the Merchant Assembly — with the fluency of a man who has profited from all of them. He makes observations about your character that are uncomfortably accurate.',
      'Finally, he leans back. "I have a simple proposition. Everyone who passes through Greylock Wharf is useful to someone. The question is whether they are useful to me before they become useful to my enemies. I would prefer the former." He pauses. "What say you?"',
    ],
    prompt: 'How do you leave this meeting?',
    options: [
      {
        id: 'accept',
        label: 'Accept his terms',
        checks: [],
        prose: 'You nod — not eagerly, which he would have despised, but with the measured air of someone calculating interest. He produces a document. You sign it or something like it. "Sensible," he says, which in his vocabulary is high praise. As you leave, his secretary hands you a token — brass, embossed with the scales — that will open certain doors and close certain mouths.',
        effects: { reputation: 1, tollmasterRelation: 'accepted' },
      },
      {
        id: 'refuse',
        label: 'Refuse outright',
        checks: [],
        prose: 'You tell him no, and you tell him clearly enough that there is no useful ambiguity about it. He regards you for a moment with an expression that is more interested than offended. "Rare," he says. "Inadvisable, but rare." He waves his hand. You are dismissed. The token is not offered. The door closes behind you with a finality that is not quite a threat but knows where threats live.',
        effects: { reputation: -1, honour: 1, tollmasterRelation: 'refused' },
      },
      {
        id: 'counter',
        label: 'Counter-offer',
        checks: ['wit', 'brass'],
        success: {
          prose: 'You tell him his terms are generous, which you both know means you have found them insufficient. You propose a revision — narrower in scope, more specific in benefit, with an exit clause he will never use but appreciates being offered. He listens. He makes a sound that could be disapproval and could be amusement. "Revised," he says, and reworks the document himself. What you sign is better than what he offered. He seems pleased by this. You suspect that was also the plan.',
          effects: { reputation: 2, tollmasterRelation: 'countered' },
        },
        failure: {
          prose: 'You make your counter. It\'s not without merit, and he examines it the way a man examines a stone he\'s considering throwing — assessing weight, trajectory, likely damage. In the end he sets it aside. "I admire the attempt," he says. "Sign here." The terms are his. You have, however, demonstrated that you are not simply obedient, which he files away for future use.',
          effects: { reputation: 1, tollmasterRelation: 'accepted' },
        },
      },
      {
        id: 'threaten',
        label: 'Threaten him',
        checks: ['brawn', 'guts'],
        success: {
          prose: 'You make clear — without raising your voice, which is the important part — that the Tollmaster\'s continued comfort depends in some measure on your goodwill. The room gets very quiet. His hand moves toward the bell on his desk and then, after a moment\'s calculation, moves away from it. "Interesting," he says, at last. He is frightened and he is furious and he is, buried under both, impressed. The terms he offers are better. So is the danger.',
          effects: { reputation: 1, honour: -1, tollmasterRelation: 'threatened' },
        },
        failure: {
          prose: 'You make the threat. He listens to it. Then he rings the bell — not the small one on his desk but a larger one mounted on the wall, whose note carries through the building with the authority of long practice. Two men appear in under ten seconds. "Show our guest out," the Tollmaster says. He is not angry. That is the most frightening thing about it. "We\'ll speak again when the terms of engagement are better understood."',
          effects: { reputation: -2, honour: -1, tollmasterRelation: 'refused' },
        },
      },
    ],
  },
];
