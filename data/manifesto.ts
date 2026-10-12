// Title of the first slide, and the heading on the final full-text screen.
export const manifestoTitle = "A civilisation out of balance";

// Closing paragraph on the final screen, above the join buttons.
export const manifestoClosing =
  "DPRIME is where technology communities stop working in separate rooms. We connect the clubs, meetups and builders already shaping Africa’s future, so they can find each other, share what they know and open doors for the next person. Keep the groups you already love. Bring your work, your questions and your curiosity. This is only the first phase, a quiet room before the lights come on. Come and help us build what comes next.";

// One entry per click. Edit freely; the reveal adapts to any length.
// The text is the club's own manifesto; "DPRIME" stands in for the original
// club name in the sentence that introduces the community.
export const manifesto: string[] = [
  "We live in a time where noise outruns understanding.",
  "Where attention is spent before thought begins.",
  "Where speed is worshipped, but depth is neglected.",
  "Something in that imbalance has left many of us restless.",
  "Not because life is hard, but because it feels shallow.",
  "Not because we lack comfort, but because comfort isn’t meaning.",
  "This restlessness is not a weakness.",
  "It’s the mind recognising that the world it was handed isn’t the world it wishes to inherit.",
  "It’s a response to a civilisation optimised for consumption rather than creation.",
  "Across disciplines, cities, and timelines, there is a quiet group of people who feel this shift.",
  "People who think too much because they see too clearly.",
  "People who build slowly because noise feels dishonest.",
  "People who care about the work because the work is alive.",
  "DPRIME is not a brand or a movement.",
  "It’s a meeting point — a place where these people can recognise each other.",
  "A place for those who design, who invent, who observe, who rebuild.",
  "Not through motivation, but through clarity.",
  "Human capability deserves tools that honour it.",
  "Systems that feel sincere and authentic.",
  "Progress should come from understanding, not acceleration.",
  "The future should be shaped deliberately, not stumbled into.",
  "Our work unfolds in phases.",
  "This first phase is simple.",
  "A quiet room before the lights come on.",
  "A place to gather, to experiment, to find the others.",
  "Nothing polished, nothing final — just the early sparks of something worth building together.",
];

// Set NEXT_PUBLIC_DISCORD_URL to the real invite link.
export const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/your-invite";

// Set NEXT_PUBLIC_WHATSAPP_URL to the real group invite link.
export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://chat.whatsapp.com/your-invite";

// Background track. Drop the file at public/audio/manifesto.mp3. If it is
// missing the page works normally and the sound button is hidden.
export const AUDIO_SRC = "/audio/manifesto.mp3";
