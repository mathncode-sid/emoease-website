export type ResourceArticle = {
  slug: string;
  topic: string;
  title: string;
  description: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
  smallSteps: string[];
  whenToReachOut: string[];
  source: { label: string; href: string };
};

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "stress-low-mood",
    topic: "Stress and low mood",
    title: "When the weight of the week starts to stay with you",
    description: "A practical starting point for stress, low mood, fatigue, and feeling unlike yourself.",
    introduction: "Stress and low mood can show up as tiredness, irritability, poor sleep, pulling away from people, or feeling like even ordinary tasks take too much effort. You do not need to label it perfectly before taking it seriously.",
    sections: [
      { heading: "Start by noticing the pattern", paragraphs: ["Try to name what has changed: sleep, energy, appetite, concentration, motivation, or how connected you feel to other people. A short note on your phone can make a vague feeling more concrete.", "Pressure at work, money worries, relationship strain, loss, illness, and isolation can all affect how someone feels. There may not be one single cause."] },
      { heading: "Small actions are still actions", paragraphs: ["When everything feels heavy, a small next step is often more realistic than trying to fix your whole life in one day. Choose something manageable and specific, then let that be enough for today."] },
    ],
    smallSteps: ["Message one person you trust and say you have been having a difficult time.", "Choose one basic task: drink water, eat something, take a shower, or step outside for a few minutes.", "Set one small task for tomorrow rather than carrying an endless list in your head.", "Avoid relying on alcohol, drugs, gambling, or isolation as your only way to cope."],
    whenToReachOut: ["Your low mood is lasting, affecting daily life, or feels difficult to manage alone.", "You are withdrawing from people or losing interest in things that usually matter to you.", "You want to talk to a counsellor, therapist, doctor, or trusted support person."],
    source: { label: "NHS: Low mood, sadness and depression", href: "https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/low-mood-sadness-depression/" },
  },
  {
    slug: "pressure-expectations",
    topic: "Pressure and expectations",
    title: "You can carry responsibility without carrying it alone",
    description: "A guide for the pressure of providing, performing, and being the person everyone relies on.",
    introduction: "Pressure can become normal enough that you stop noticing its cost. You may be working, looking for work, studying, caring for family, managing money worries, or trying to be strong for everyone around you. None of that means you have to handle it in silence.",
    sections: [
      { heading: "Separate the facts from the story", paragraphs: ["Stress often brings a harsh story with it: that you are failing, behind, or letting people down. Pause and identify the actual problem in front of you. Is it a bill, a conflict, an unanswered message, a deadline, or several things at once?", "Naming the facts does not make the problem disappear, but it can make the next decision clearer."] },
      { heading: "Ask for practical support", paragraphs: ["Support is not only about talking. It can mean asking someone to help you make a call, review a budget, watch the children, attend an appointment, or sit with you while you work through a difficult task."] },
    ],
    smallSteps: ["Write down the three pressures taking the most energy right now.", "Choose one pressure you can pause, share, postpone, or ask for help with.", "Tell one trusted person what you need, using a direct sentence such as: 'I am under a lot of pressure and I need to talk.'", "Make room for one activity that helps your body come down from stress, such as a walk, rest, or time away from your phone."],
    whenToReachOut: ["The pressure is affecting sleep, work, relationships, or your ability to cope.", "Anger, numbness, worry, or exhaustion are becoming your everyday state.", "You feel trapped or cannot see a safe next step."],
    source: { label: "WHO: Doing What Matters in Times of Stress", href: "https://www.who.int/publications/i/item/9789240003927" },
  },
  {
    slug: "relationships-fatherhood",
    topic: "Relationships and fatherhood",
    title: "Start with the conversation you have been avoiding",
    description: "A grounded approach to communication, conflict, repair, and showing up for the people you love.",
    introduction: "Relationships can be a source of support and a source of pressure at the same time. When communication breaks down, it is easy to focus on winning an argument or going quiet. A clearer conversation can be a more useful place to begin.",
    sections: [
      { heading: "Slow the moment down", paragraphs: ["If a conversation is heated, take a pause before saying something you will regret. A pause is not avoidance when you name it and return: 'I want to talk about this, but I need a little time to settle first.'", "When you return, speak from your own experience rather than making a case against the other person. Try 'I have been feeling overwhelmed' before 'You never understand me.'"] },
      { heading: "Repair is a skill", paragraphs: ["Repair can be simple: acknowledge harm, apologise without adding excuses, ask what would help, and follow through on one change. It does not mean every issue is solved at once."] },
    ],
    smallSteps: ["Choose a calm time to raise one issue instead of bringing up everything at once.", "Ask one genuine question and listen to the answer without preparing your reply.", "Name one thing you appreciate about the other person or your family.", "If conflict feels unsafe, reach out to a trusted professional or support service rather than trying to manage it alone."],
    whenToReachOut: ["Conflict is escalating, feels unsafe, or involves threats, control, or violence.", "You feel constantly shut down, angry, isolated, or unable to communicate.", "You would benefit from individual, relationship, or family support."],
    source: { label: "WHO: Self-care for health and well-being", href: "https://www.who.int/news-room/questions-and-answers/item/self-care-for-health-and-well-being" },
  },
  {
    slug: "when-it-feels-urgent",
    topic: "Urgent support",
    title: "When you are worried about your safety or someone else's",
    description: "What to do when waiting or handling things alone no longer feels safe.",
    introduction: "If you are in immediate danger, or think you may harm yourself or someone else, this needs urgent in-person help. EmoEase cannot provide emergency intervention through this website.",
    sections: [
      { heading: "Make the next safe move", paragraphs: ["Contact local emergency services, go to the nearest hospital, or tell a trusted person you need immediate help. If you are worried about someone else, stay with them if it is safe to do so and help them reach emergency care.", "Talking openly and calmly about safety can help someone feel less alone. Take all words or actions that suggest immediate risk seriously."] },
      { heading: "Do not wait for a message back", paragraphs: ["A message to EmoEase can be a useful next step once you are safe, but it is not a substitute for emergency services, hospital care, or a health professional in an urgent situation."] },
    ],
    smallSteps: ["Move toward another person or a safer public place if you can.", "Tell someone directly: 'I need help staying safe right now.'", "Contact emergency medical help or go to the nearest hospital.", "Use the EmoEase urgent-help page for a simple reminder of the next steps."],
    whenToReachOut: ["You are having thoughts of harming yourself or another person.", "You feel unable to keep yourself safe.", "Someone you know has said or done something that makes you fear for their immediate safety."],
    source: { label: "WHO: Suicide questions and answers", href: "https://www.who.int/news-room/questions-and-answers/item/suicide" },
  },
];

export function getResourceArticle(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}
