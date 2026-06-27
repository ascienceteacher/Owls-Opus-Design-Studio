const TEACHERS = ["Stasny","Chlebina","Marchand","Zuppinger","Henderson","Plummer"];
const PERIODS = ["Period 1","Period 2","Period 3","Period 4","Period 5","Period 6"];

// Firebase-ready settings.
// To activate the shared teacher dashboard:
// 1. Create a Firebase project.
// 2. Enable Firestore Database.
// 3. Paste your Firebase config below.
// 4. Open index.html through a web server, not directly as a file.
const firebaseConfig = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

let firebaseReady = false;
let db = null;

async function initFirebase(){
  try{
    if(!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("PASTE_")) return false;
    const appModule = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const fireModule = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    const fbApp = appModule.initializeApp(firebaseConfig);
    db = fireModule.getFirestore(fbApp);
    window.firebaseTools = fireModule;
    firebaseReady = true;
    return true;
  }catch(err){
    console.warn("Firebase not connected:", err);
    firebaseReady = false;
    return false;
  }
}
initFirebase();

const problemDeck = [
  ["🎒","My backpack is too heavy."], ["🔋","My phone dies too fast."],
  ["🎧","I lose my earbuds."], ["👟","My shoes get muddy."],
  ["🦟","Mosquitoes bite me."], ["🥪","My lunch gets warm."],
  ["💧","My water bottle leaks in my bag."], ["📚","I forget my homework."],
  ["👓","My glasses fog up."], ["🔑","I can't find my keys."],
  ["🔌","I get tangled in charging cords."], ["🥤","I spill things too easily."],
  ["🐶","My dog spills the water bowl."], ["🎧","I can't find a quiet place to study."],
  ["💻","My Chromebook gets too hot."], ["🍪","My snacks get crushed in my backpack."],
  ["🌱","I wish plants stayed watered when I'm away."], ["👕","My clothes take too long to dry."],
  ["📱","I drop things all the time."], ["🧺","My locker is always messy."],
  ["⚽","My sports gear is hard to carry."], ["🥫","It's too hard to open some containers."],
  ["🥶","I get cold drinks from the fridge on my papers."], ["🌬️","Trash blows away in the wind."]
];

const powerDeck = [
  ["🧲","Magnets","Attract and hold things together."], ["☀️","Solar Power","Use sunlight to power an invention."],
  ["📦","Foldable","Fold up to save space."], ["🎈","Inflatable","Fill with air to expand and use."],
  ["💧","Waterproof","Keep things dry and safe."], ["🫧","Self-Cleaning","Clean itself with little extra work."],
  ["📡","Motion Sensor","Detects movement and responds."], ["🎤","Voice Control","Works when you speak a command."],
  ["🤖","AI Assistant","Helps think, plan, organize, and more."], ["🦾","Robotics","Moves and works automatically."],
  ["🌟","Glow in the Dark","Shines when the lights go out."], ["↔️","Expandable","Stretches or grows to fit your needs."],
  ["♻️","Recycled Materials","Made from materials that can be used again."], ["🛞","Wheels","Rolls to make movement easy."],
  ["🧩","Modular","Parts can be added, removed, or swapped."], ["🧵","Fabric","Soft, flexible, and comfortable to use."],
  ["📍","GPS","Knows where you are and where to go."], ["📷","Camera","Sees and captures images or video."],
  ["⏲️","Timer","Keeps track of time for you."], ["🔋","Rechargeable Battery","Power it up and use it again."],
  ["🔊","Sound","Plays sounds, alerts, or messages."], ["🌡️","Temperature Sense","Detects hot or cold and reacts."],
  ["💨","Air","Uses wind or air for power or movement."], ["⚙️","Simple Machines","Levers, pulleys, gears make work easier."]
];

const inspirationDeck = [
  {
    icon:"💧",
    invention:"Tethys Water Tester",
    inventor:"Gitanjali Rao",
    what:"Detects lead in drinking water quickly so communities can stay safe and healthy.",
    problem:"Many communities need easier ways to test if drinking water is safe.",
    science:"Chemistry and sensors help identify lead particles in water.",
    think:"This invention shows how young inventors can make hidden problems easier to detect."
  },
  {
    icon:"🌊",
    invention:"The Ocean Cleanup System",
    inventor:"Boyan Slat",
    what:"Uses ocean currents to collect and remove plastic trash before it harms marine life.",
    problem:"Plastic pollution damages oceans and wildlife.",
    science:"Physics and oceanography help harness natural currents.",
    think:"This invention uses natural movement instead of fighting against it."
  },
  {
    icon:"🔦",
    invention:"NightSearcher Flashlight",
    inventor:"Ann Makosinski",
    what:"Provides safe, reliable light for people who live without electricity.",
    problem:"Many people need light when batteries or electricity are unavailable.",
    science:"Thermodynamics converts body heat into electrical energy.",
    think:"This invention turns a small everyday energy source into something useful."
  },
  {
    icon:"🧪",
    invention:"Eco Absorbent",
    inventor:"Kiara Nirghin",
    what:"Soaks up oil spills from water so they can be removed and reused.",
    problem:"Oil spills harm water, wildlife, and ecosystems.",
    science:"Materials science can create absorbent, reusable powders.",
    think:"This invention solves a cleanup problem using safer materials."
  },
  {
    icon:"🦾",
    invention:"Low-Cost Prosthetic Arm",
    inventor:"Easton LaChappelle",
    what:"A 3D-printed arm that gives more people access to life-changing technology.",
    problem:"Many prosthetic devices are too expensive for the people who need them.",
    science:"Engineering and biomechanics help mimic human movement.",
    think:"This invention focuses on making helpful technology more affordable."
  },
  {
    icon:"🍌",
    invention:"Banana Peel Bioplastic",
    inventor:"Elif Bilgin",
    what:"Turns banana peels into a bioplastic that can replace some plastics.",
    problem:"Plastic waste builds up and harms the environment.",
    science:"Chemistry can extract useful materials from plant waste and turn them into biodegradable products.",
    think:"This invention transforms waste into a new material."
  },
  {
    icon:"🦻",
    invention:"Smart Hearing Aid",
    inventor:"Jordan Reeves",
    what:"Improves sound clarity and adapts to noisy places to help people hear better.",
    problem:"Many people need hearing support that is comfortable, affordable, and useful in daily life.",
    science:"Acoustics, electronics, and engineering help filter and amplify sound.",
    think:"This invention improves access by designing for a specific user need."
  },
  {
    icon:"🧬",
    invention:"Pancreatic Cancer Test",
    inventor:"Jack Andraka",
    what:"A test that can detect pancreatic cancer early using a simple blood sample.",
    problem:"Some diseases are difficult to detect early, which can delay treatment.",
    science:"Biology, sensors, and nanotechnology can help detect biomarkers in samples.",
    think:"This invention shows how science can help identify problems earlier."
  },
  {
    icon:"🛟",
    invention:"Seabin",
    inventor:"Hannah Herbst",
    what:"Collects floating trash and microplastics from marinas and harbors.",
    problem:"Trash and microplastics can collect in waterways and harm ecosystems.",
    science:"Fluid dynamics and filtration help draw in and trap floating debris.",
    think:"This invention applies a simple collection system to a large environmental problem."
  },
  {
    icon:"☀️",
    invention:"Solar Ironing Cart",
    inventor:"Vinisha Umashankar",
    what:"Provides a clean, solar-powered ironing solution for people who need it most.",
    problem:"Traditional ironing carts can create smoke and pollution.",
    science:"Solar energy and heat transfer can power a tool in a cleaner way.",
    think:"This invention updates an everyday tool to make it cleaner and more sustainable."
  },
  {
    icon:"👁️",
    invention:"Eye-Drop Reminder Assistant",
    inventor:"Shreyansh Saurabh",
    what:"Reminds people to use eye drops on time and helps them do it correctly.",
    problem:"People may forget important medicine or use it at the wrong time.",
    science:"Electronics, sensors, and timers can track and alert users.",
    think:"This invention supports health by helping people follow a routine."
  },
  {
    icon:"🩸",
    invention:"The Paperfuge",
    inventor:"Stephen Gray",
    what:"A low-cost paper centrifuge that separates blood components in emergencies.",
    problem:"Some communities need affordable medical tools when electricity or lab equipment is limited.",
    science:"Rotational forces can separate fluids by spinning them quickly.",
    think:"This invention uses simple materials to solve a serious medical challenge."
  },
  {
    icon:"🦯",
    invention:"Smart Crutch Sense",
    inventor:"Anna Connelly",
    what:"Detects falls and sends an alert for help when the user needs it.",
    problem:"People using mobility supports may need faster help after a fall.",
    science:"Sensors and wireless technology can detect impact and motion.",
    think:"This invention makes an existing support tool smarter and safer."
  },
  {
    icon:"🌬️",
    invention:"Bee-Inspired Wind Turbine",
    inventor:"Benjamin Vedas",
    what:"A quieter, more efficient wind turbine inspired by bumblebee wings.",
    problem:"Wind turbines can be noisy or inefficient in some settings.",
    science:"Biomimicry and aerodynamics can reduce noise and increase efficiency.",
    think:"This invention borrows design ideas from nature."
  },
  {
    icon:"⌚",
    invention:"Wearable Braille Device",
    inventor:"Sunu Bandla",
    what:"Displays messages in Braille on the go so people who are blind can read anytime.",
    problem:"People who are blind may need portable ways to receive information.",
    science:"Haptic feedback and electronics can raise Braille dots.",
    think:"This invention changes how information is delivered to meet a user's needs."
  },
  {
    icon:"🎒",
    invention:"Air-Purifying Backpack",
    inventor:"Kevin Zhang",
    what:"Filters polluted air and provides cleaner air to the wearer.",
    problem:"Air pollution affects health, especially in crowded or polluted places.",
    science:"Filtration, airflow, and materials science help trap pollutants.",
    think:"This invention adds a protective function to something people already carry."
  },
  {
    icon:"🚲",
    invention:"Smart Bike Helmet",
    inventor:"Ilan Elborough",
    what:"Helps keep cyclists safe with signals, lights, and crash detection.",
    problem:"Cyclists can be hard to see and may need help quickly after an accident.",
    science:"Sensors, electronics, light, and motion detection improve safety.",
    think:"This invention improves safety by adding alerts to an existing object."
  },
  {
    icon:"🚤",
    invention:"Trash Skimmer Boat",
    inventor:"Nicholas Stepanov",
    what:"Collects floating trash from waterways.",
    problem:"Trash floating in rivers, bays, and canals can harm wildlife and water quality.",
    science:"Buoyancy, motion, and collection systems help remove debris.",
    think:"This invention turns cleanup into a moving collection system."
  },
  {
    icon:"🩸",
    invention:"Portable Blood Test Kit",
    inventor:"Emily Clark",
    what:"Makes blood testing faster, easier, and more affordable.",
    problem:"Medical testing can be slow, expensive, or hard to access.",
    science:"Chemistry, sensors, and biomedical engineering can detect health information.",
    think:"This invention makes testing more portable and accessible."
  },
  {
    icon:"💧",
    invention:"Solar-Powered Desalination Unit",
    inventor:"Aadit Palicha",
    what:"Turns seawater into drinkable water using solar energy.",
    problem:"Some communities need more access to clean drinking water.",
    science:"Solar energy, evaporation, condensation, and filtration help remove salt.",
    think:"This invention uses renewable energy to solve a water problem."
  },
  {
    icon:"♻️",
    invention:"Textile Recycling Machine",
    inventor:"Laura Fenton",
    what:"Breaks down old clothes into new fibers to reduce textile waste.",
    problem:"Clothing waste can fill landfills and waste useful materials.",
    science:"Mechanical engineering and materials science can separate and reuse fibers.",
    think:"This invention redesigns waste as a resource."
  },
  {
    icon:"⚡",
    invention:"Home Energy Monitor",
    inventor:"Alex Lee",
    what:"Helps families track and reduce energy use to save money and protect the planet.",
    problem:"People may not know how much energy they use or waste.",
    science:"Electricity, sensors, and data analysis can track energy patterns.",
    think:"This invention makes invisible energy use easier to see."
  },
  {
    icon:"📚",
    invention:"Smart Study Lamp",
    inventor:"Jasmine Lee",
    what:"Adjusts light and breaks to improve focus and reduce eye strain while studying.",
    problem:"Students can lose focus or strain their eyes while working.",
    science:"Light, timing, ergonomics, and human factors can support learning.",
    think:"This invention improves a familiar school tool by responding to student needs."
  },
  {
    icon:"🌱",
    invention:"Automatic Plant Waterer",
    inventor:"Tyler Phillips",
    what:"Waters plants automatically and saves water using soil moisture sensors.",
    problem:"Plants can dry out when people forget or are away.",
    science:"Sensors, water flow, and plant science help deliver water when needed.",
    think:"This invention helps living things by responding to changing conditions."
  }
];

const APP_VERSION = "2.0-sprint5A-safe";
const SESSION_KEY = "currentInventorSession_v3";
const GOOGLE_SAVE_URL = "https://script.google.com/macros/s/AKfycbwmaY6jbQrS9xZepJhcDV49hf0Eelg9cgcVkTkgEHQV5cRv74ExWCuP6KcDb8sqBMzC/exec";
let currentProjectKey = localStorage.getItem("owlProjectKey") || "";
const steps = ["home","drawProblem","drawPower","drawInspiration","cards","problem","power","inspiration","mashup","whatif","originality","science","studio","pitch","summary","inventorWall"];
let state = JSON.parse(localStorage.getItem(SESSION_KEY) || localStorage.getItem("currentInventorSession_v2") || "null") || {
  step:0, student:{name:"", period:"", teacher:""}, problem:null, power:null, inspiration:null, answers:{}, sidekick:{}, notebook:{}, badges:[]
};

const app = document.getElementById("app");

function save(){
  localStorage.setItem(SESSION_KEY, JSON.stringify(state));
  if (currentProjectKey) {
    saveToGoogleSheet();
  }
}
function shuffleArray(array){
  const copy = [...array];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getDeckArray(type){
  if(type === "problem") return problemDeck;
  if(type === "power") return powerDeck;
  if(type === "inspiration") return inspirationDeck;
  return [];
}

function getCardTitle(card){
  if(Array.isArray(card)) return card[1];
  return card.invention || "";
}

function ensureDeckState(){
  state.deckQueues = state.deckQueues || {problem:[], power:[], inspiration:[]};
  state.deckHistory = state.deckHistory || {problem:[], power:[], inspiration:[]};
}

function ensureSwitchLimits(){
  state.switchLimits = state.switchLimits || {};
  if(typeof state.switchLimits.hand !== "number") state.switchLimits.hand = 3;
  if(typeof state.switchLimits.problem !== "number") state.switchLimits.problem = 2;
  if(typeof state.switchLimits.power !== "number") state.switchLimits.power = 2;
  if(typeof state.switchLimits.inspiration !== "number") state.switchLimits.inspiration = 2;
}

function canConsumeSwitch(type){
  ensureSwitchLimits();
  return (state.switchLimits[type] || 0) > 0;
}

function consumeSwitch(type){
  ensureSwitchLimits();
  if((state.switchLimits[type] || 0) <= 0) return false;
  state.switchLimits[type] -= 1;
  return true;
}

function switchLabel(type, label){
  ensureSwitchLimits();
  const left = state.switchLimits[type] ?? 0;
  return `${label} (${left} left)`;
}

function sparksDisplay(){
  ensureSwitchLimits();
  const left = state.switchLimits.hand ?? 0;
  return Array.from({length:3}, (_,i)=>`<span class="spark-dot ${i < left ? 'active' : 'empty'}">${i < left ? '💡' : '○'}</span>`).join('');
}

function switchLimitMessage(type){
  if(type === "hand") return "You used all 3 Inspiration Sparks. Now it is time to think like an inventor and build from the cards you have.";
  const names = {problem:"Problem", power:"Power-Up", inspiration:"Inspiration"};
  return `You used your ${names[type] || 'card'} switches. Try asking Rowlie for a new way to connect this card.`;
}

function drawFromDeck(type, currentCard=null){
  ensureDeckState();
  const deck = getDeckArray(type);
  if(!state.deckQueues[type] || state.deckQueues[type].length === 0){
    state.deckQueues[type] = shuffleArray(deck);
  }

  let card = state.deckQueues[type].shift();

  // Avoid immediate repeat if possible.
  if(currentCard && getCardTitle(card) === getCardTitle(currentCard) && state.deckQueues[type].length > 0){
    state.deckQueues[type].push(card);
    card = state.deckQueues[type].shift();
  }

  state.deckHistory[type].push(getCardTitle(card));
  if(state.deckHistory[type].length > 6) state.deckHistory[type].shift();

  return card;
}

function remainingCount(type){
  ensureDeckState();
  return state.deckQueues[type]?.length ?? getDeckArray(type).length;
}

function draw(a){return a[Math.floor(Math.random()*a.length)]}
function esc(s){ return String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }


const stepLabels = {
  home:["Start","Welcome"],
  drawProblem:["Mission 1","Problem Patrol"],
  drawPower:["Mission 2","Power-Up"],
  drawInspiration:["Mission 2","Inspiration"],
  cards:["Mission 2","Design Table"],
  problem:["Mission 1","Spot the Problem"],
  power:["Mission 2","Power Up"],
  inspiration:["Mission 2","Remix Inspiration"],
  mashup:["Mission 2","Mash-Up"],
  whatif:["Mission 3","Ask Better Questions"],
  originality:["Mission 3","Originality Coach"],
  science:["Mission 3","Science Coach"],
  studio:["Mission 4","Prototype Studio"],
  pitch:["Mission 5","Pitch Your Invention"],
  summary:["Mission 5","Summary"],
  inventorWall:["Mission 5","Student Showcase"]
};

function canVisitStep(index){
  // Students can always go back. To jump forward, the cards needed for that area must exist.
  if(index <= state.step) return true;
  const step = steps[index];
  if(step === "inventorWall") return true;
  if(!state.student?.name || !state.student?.period || !state.student?.teacher) return step === "home";
  if(["drawProblem"].includes(step)) return true;
  if(!state.problem && index > steps.indexOf("drawProblem")) return false;
  if(["drawPower"].includes(step)) return true;
  if(!state.power && index > steps.indexOf("drawPower")) return false;
  if(["drawInspiration"].includes(step)) return true;
  if(!state.inspiration && index > steps.indexOf("drawInspiration")) return false;
  // Allow navigation to any working page after all cards are selected.
  return !!(state.problem && state.power && state.inspiration);
}

function stepIsDone(step){
  if(step === "home") return !!(state.student?.name && state.student?.period && state.student?.teacher);
  if(step === "drawProblem") return !!state.problem;
  if(step === "drawPower") return !!state.power;
  if(step === "drawInspiration") return !!state.inspiration;
  if(step === "cards") return !!(state.problem && state.power && state.inspiration);
  const answerKeys = {
    problem:"problemWhy_text",
    power:"powerHow_text",
    inspiration:"inspirationLearn_text",
    mashup:"mashupIdeas",
    whatif:"whatIf",
    originality:"originality_text",
    science:"science_text",
    pitch:"pitch1",
    studio:"prototypeSketch",
    summary:"pitch1"
  };
  const key = answerKeys[step];
  return key ? (state.answers?.[key] || "").trim().length >= 12 : false;
}

function renderProgressMenu(){
  // Display the menu in true S.P.A.R.K. order, even though the app's
  // working flow still draws cards before students begin writing.
  const menuOrder = [
    "home",
    "drawProblem", "problem",
    "drawPower", "drawInspiration", "cards", "power", "inspiration", "mashup",
    "whatif", "originality", "science",
    "studio",
    "pitch", "summary", "inventorWall"
  ];
  return `<div class="progress-menu mission-menu no-print">
    <div class="mission-menu-title"><span>▦</span><div><b>Inventor Lab Menu</b><small>Move through your design missions in S.P.A.R.K. order.</small></div></div>
    <div class="menu-grid mission-menu-grid">
      ${menuOrder.map((s)=>{
        const i = steps.indexOf(s);
        const labels = stepLabels[s] || [s,""];
        const locked = !canVisitStep(i);
        const active = i === state.step;
        const done = stepIsDone(s);
        const stage = sparkStageForStep(s);
        return `<button class="menu-item mission-menu-item stage-${stage.toLowerCase()} ${active?'active':''} ${done?'done':''} ${locked?'locked':''}" onclick="jumpToStep(${i})" ${locked?'disabled':''}>
          <span class="menu-stage">${stage}</span><span class="menu-main">${done?'✓ ':''}${labels[0]}</span><small>${labels[1]}</small>
        </button>`;
      }).join("")}
    </div>
  </div>`;
}
function jumpToStep(index){
  if(!canVisitStep(index)){
    alert("Complete the earlier step first.");
    return;
  }
  saveInputs();
  state.step = index;
  save();
  render();
}

function sparkStageForStep(stepName){
  if(["home","drawProblem","problem"].includes(stepName)) return "S";
  if(["drawPower","drawInspiration","cards","power","inspiration","mashup"].includes(stepName)) return "P";
  if(["whatif","originality","science"].includes(stepName)) return "A";
  if(["studio"].includes(stepName)) return "R";
  if(["pitch","summary","inventorWall"].includes(stepName)) return "K";
  return "S";
}

function missionInfoForStep(stepName){
  const map = {
    drawProblem:["🎯","Mission 1","Spot a Problem","Every great invention begins by noticing a problem worth solving."],
    problem:["🎯","Mission 1","Spot the Problem","Look closely at who has the problem, when it happens, and why it matters."],
    drawPower:["⚡","Mission 2","Power Up","Add a feature, material, technology, or science idea to your invention."],
    drawInspiration:["⚡","Mission 2","Find Inspiration","Learn how real young inventors turned problems into solutions."],
    cards:["⚡","Mission 2","Design Table","Explore your card combination and decide what idea has potential."],
    power:["⚡","Mission 2","Power Up","Connect your power-up card to the problem you want to solve."],
    inspiration:["⚡","Mission 2","Remix Inspiration","Borrow the thinking move, not the invention."],
    mashup:["⚡","Mission 2","Mash Everything Together","Combine the problem, power-up, and inspiration into possible invention ideas."],
    whatif:["🦉","Mission 3","Ask Better Questions","Push your idea by asking what could change, improve, or surprise people."],
    originality:["🦉","Mission 3","Originality Coach","Check what already exists and explain how your idea will be different."],
    science:["🦉","Mission 3","Science Coach","Explain what science or engineering could make your invention work."],
    studio:["✏️","Mission 4","Prototype Studio","Sketch, label, test, and refine your invention."],
    pitch:["🚀","Mission 5","Pitch Your Invention","Explain your idea clearly so others understand the problem, solution, and impact."],
    summary:["🚀","Mission 5","Inventor Lab Summary","Review your inventor snapshot, then save, submit, or share your work."],
    inventorWall:["🏆","Mission 5","Student Inventor Showcase","Celebrate ideas, notice clever features, and get inspired without copying."]
  };
  return map[stepName] || ["🦉","Mission","Inventor Lab","Keep building your idea."];
}

function missionHeader(stepName){
  const [icon, mission, title, desc] = missionInfoForStep(stepName);
  const stage = sparkStageForStep(stepName);
  return `<div class="mission-banner stage-${stage.toLowerCase()}">
    <div class="mission-icon">${icon}</div>
    <div><div class="stage-kicker">${mission} • ${stage}</div><h2>${title}</h2><p>${desc}</p></div>
  </div>`;
}

function renderSparkTrail(){
  const active = sparkStageForStep(steps[state.step]);
  const items = [
    ["S","Spot a Problem","Notice a real-world problem worth solving."],
    ["P","Power Up","Add a feature, technology, or science idea."],
    ["A","Ask Questions","Think deeper with Rowlie."],
    ["R","Refine","Sketch, test, improve, and revise."],
    ["K","Kick Off","Build, share, and inspire others."]
  ];
  return `<div class="spark-trail no-print">
    <div class="spark-title"><b>S.P.A.R.K.</b><span>The Inventor's Process</span></div>
    ${items.map(([letter,title,desc])=>`<div class="spark-step ${letter===active?'active':''}"><b>${letter}</b><span>${title}</span><small>${desc}</small></div>`).join('<div class="spark-arrow">→</div>')}
  </div>`;
}

function shell(content){
  const isHome = steps[state.step] === "home";
  app.innerHTML = `<div class="app theme-refresh ${isHome?'home-app':''}">
    <div class="topbar no-print">
      <div class="brand">
        <img class="school-logo-img" src="assets/rowlett-logo-mock.png" alt="Rowlett Middle Academy logo">
        <div><h1>Owl's Opus <span>Inventor Lab</span> <span class="version-chip">2.0</span></h1><p>S.P.A.R.K. — The Inventor's Process</p></div>
      </div>
      <div class="nav">
        <button class="nav-tile ${steps[state.step]==='home'?'active':''}" onclick="goHome()"><span>⌂</span>Home</button>
        <button class="nav-tile ${steps[state.step]==='cards'?'active':''}" onclick="jumpToStep(${steps.indexOf('cards')})"><span>◎</span>Design Table</button>
        <button class="nav-tile ${['problem','power','inspiration','mashup','whatif','originality','science'].includes(steps[state.step])?'active':''}" onclick="jumpToStep(${steps.indexOf('problem')})"><span>🦉</span>Coach</button>
        <button class="nav-tile ${steps[state.step]==='studio'?'active':''}" onclick="jumpToStep(${steps.indexOf('studio')})"><span>✎</span>Studio</button>
        <button class="nav-tile ${steps[state.step]==='inventorWall'?'active':''}" onclick="openInventorWall()"><span>🏆</span>Showcase</button>
        <button class="nav-tile teacher-link" onclick="teacherLogin()"><span>▤</span>Teacher Hub</button> <button class="btn gold" onclick="loginToGoogleSave()">Save / Load Project</button>
<button class="btn secondary" onclick="logoutProject()">Start Fresh</button>
      </div>
    </div>
    ${isHome ? '' : renderSparkTrail()}
    ${isHome ? '' : renderProgressMenu()}
    ${content}
    <div class="footer no-print ${isHome?'home-footer-hidden':''}">
      <button class="btn secondary ${state.step===0?'hidden':''}" onclick="back()">Back</button>
      ${selectionSwitchButton()}
      <button class="btn" id="nextButton" onclick="nextAction()">${nextLabel()}</button>
    </div>
  </div>`;
  bindAutosaveInputs();
}

function selectionSwitchButton(){
  const s=steps[state.step];
  if(s==="drawProblem" && state.problem) return `<button class="btn red" onclick="switchCard('problem')" ${canConsumeSwitch("problem") ? "" : "disabled"}>${switchLabel("problem", "Switch Problem Card")}</button>`;
  if(s==="drawPower" && state.power) return `<button class="btn red" onclick="switchCard('power')" ${canConsumeSwitch("power") ? "" : "disabled"}>${switchLabel("power", "Switch Power-Up Card")}</button>`;
  if(s==="drawInspiration" && state.inspiration) return `<button class="btn red" onclick="switchCard('inspiration')" ${canConsumeSwitch("inspiration") ? "" : "disabled"}>${switchLabel("inspiration", "Switch Inspiration Card")}</button>`;
  return `<button class="btn secondary ${state.step===0?'hidden':''}" onclick="startOver()">Start Over</button>`;
}

function nextLabel(){
  const name = steps[state.step];
  if(name==="home") return "Start Inventing";
  if(name==="drawProblem") return state.problem ? "Keep Problem Card" : "Randomly Select Problem Card";
  if(name==="drawPower") return state.power ? "Keep Power-Up Card" : "Randomly Select Power-Up Card";
  if(name==="drawInspiration") return state.inspiration ? "Keep Inspiration Card" : "Randomly Select Inspiration Card";
  if(name==="cards") return "Let's Build This Idea";
  if(name==="studio") return "Create Summary";
  if(name==="summary") return "Print / Save PDF";
  if(name==="inventorWall") return "Back to Design Table";
  return "Next";
}

function validateCurrentStep(){
  const s=steps[state.step];
  if(s==="home"){
    const name=document.getElementById("studentName")?.value.trim();
    const period=document.getElementById("studentPeriod")?.value;
    const teacher=document.getElementById("studentTeacher")?.value;
    if(!name || !period || !teacher) return "Please enter your name, period, and teacher before starting.";
  }
  const requiredText = {
    problem:"problemWhy_text",
    power:"powerHow_text",
    inspiration:"inspirationLearn_text",
    mashup:"mashupIdeas",
    whatif:"whatIf",
    science:"science_text",
    pitch:"pitch1"
  };
  if(requiredText[s]){
    const el=document.getElementById(requiredText[s]);
    if(!el || el.value.trim().length < 12) return "Add a little more thinking before moving on. Try writing at least one complete sentence.";
  }
  if(s==="originality"){
    const brief=document.getElementById("inventionBrief")?.value.trim() || "";
    const different=document.getElementById("originality_text")?.value.trim() || "";
    if(brief.length < 25 || different.length < 12) return "Describe your invention and explain how your idea will be different before moving on.";
  }
  return "";
}

function showWarning(msg){
  const existing=document.querySelector(".warning");
  if(existing) existing.remove();
  const panel=document.querySelector(".panel");
  if(panel) panel.insertAdjacentHTML("afterbegin", `<div class="warning">🦉 ${msg}</div>`);
}


function drawAllThree(){
  dealNewHand();
}

function keepAllThree(){
  if(!(state.problem && state.power && state.inspiration)){ dealNewHand(); return; }
  state.cardsLocked = true;
  state.step = steps.indexOf("problem");
  save();
  render();
}


function openInventorWall(){
  saveInputs();
  state.step = steps.indexOf("inventorWall");
  save();
  render();
}

function getCurrentCardSet(){
  return {
    problem: state.problem ? getCardTitle(state.problem) : "",
    power: state.power ? getCardTitle(state.power) : "",
    inspiration: state.inspiration ? getCardTitle(state.inspiration) : ""
  };
}

function dealNewHand(){
  ensureSwitchLimits();
  const alreadyHasHand = !!(state.problem && state.power && state.inspiration);
  if(alreadyHasHand && !consumeSwitch("hand")){
    state.rowlieCoach = state.rowlieCoach || {};
    state.rowlieCoach.cards = {topic:"stuck", prompt:"What is one surprising connection you can find between these three cards?", hint:switchLimitMessage("hand")};
    save();
    render();
    return;
  }
  state.problem = drawFromDeck("problem", state.problem);
  state.power = drawFromDeck("power", state.power);
  state.inspiration = drawFromDeck("inspiration", state.inspiration);
  state.inspirationFeeling = 3;
  resetRowlieCoach("cards");
  save();
  state.step = steps.indexOf("cards");
  render();
}

function rowlieCardReaction(){
  if(!state.problem || !state.power || !state.inspiration) return "Let's draw your three cards first.";
  const p = getCardTitle(state.problem);
  const w = getCardTitle(state.power);
  const i = getCardTitle(state.inspiration);
  return `Interesting combination: ${p} + ${w} + ${i}. What do these three ideas have in common?`;
}

function rowliePromptBank(topic){
  const set = getCurrentCardSet();
  const banks = {
    problem:[
      `Who experiences "${set.problem}" most often?`,
      `When does "${set.problem}" become most frustrating?`,
      `What happens right before this problem begins?`,
      `What do people already do to deal with this problem?`
    ],
    user:[
      "Can you describe one specific person who would use your invention?",
      "Would this help 6th, 7th, or 8th graders most? Why?",
      "Could this help someone outside of school too?",
      "Who might need this invention but be overlooked?"
    ],
    science:[
      `What science could connect "${set.power}" to your problem?`,
      "Would your idea use force, energy, materials, sensors, or living things?",
      "How could you test whether the science actually works?",
      "What data could you collect from your prototype?"
    ],
    originality:[
      "What might already exist that is similar?",
      "How could your idea be smaller, safer, cheaper, greener, or easier to use?",
      "What feature would make your invention meaningfully different?",
      "What problem does your idea solve better than existing solutions?"
    ],
    prototype:[
      "What part of your invention would you build first?",
      "Which material would be easiest to test with?",
      "What part might break or fail first?",
      "Could you make a simple cardboard or recycled-material version first?"
    ],
    stuck:[
      "Let's zoom in. What is one tiny part of the problem you could solve first?",
      "What if your invention only had to help one person?",
      "What would the weird version look like? Now what would the simple version look like?",
      "Start with this sentence: My invention could help by..."
    ]
  };
  return banks[topic] || banks.stuck;
}

function ensureRowlieCoach(page){
  state.rowlieCoach = state.rowlieCoach || {};
  if(!state.rowlieCoach[page]){
    const defaults = {
      cards:{topic:"problem", prompt:"Which card feels easiest to connect to your invention idea?", hint:"Look for one small connection between the problem, the power-up, and the inspiration card."},
      problem:{topic:"problem", prompt:"Who experiences this problem most often?", hint:"Start with one real person or group. Do not solve the whole problem yet."},
      power:{topic:"prototype", prompt:"How could your power-up change or improve the problem?", hint:"Think about whether it protects, moves, organizes, alerts, powers, or simplifies something."},
      inspiration:{topic:"originality", prompt:"What thinking move can you borrow from this inventor without copying the invention?", hint:"Look at how the inventor noticed a problem, used science, or helped a specific group of people."},
      mashup:{topic:"stuck", prompt:"What is one invention idea that connects your problem and your power-up?", hint:"Try this sentence: My invention could help by _____."},
      whatif:{topic:"stuck", prompt:"What is one way you could stretch your idea to make it more useful?", hint:"Make it smaller, safer, cheaper, greener, stronger, easier, or more accessible."},
      originality:{topic:"originality", prompt:"What would make your invention different from something that already exists?", hint:"Different can mean safer, cheaper, easier to use, more helpful, more sustainable, or designed for a specific user."},
      science:{topic:"science", prompt:"What science makes your invention possible?", hint:"Think about force, energy, materials, sensors, living things, or data."},
      pitch:{topic:"user", prompt:"Who would use this invention first, and why would they care?", hint:"A strong pitch starts with the problem, then explains the solution and why it matters."}
    };
    state.rowlieCoach[page] = defaults[page] || {topic:"stuck", prompt:"What is one part of your idea you want to think through first?", hint:"Start small. You do not have to solve the whole problem yet."};
  }
  return state.rowlieCoach[page];
}

function resetRowlieCoach(page){
  state.rowlieCoach = state.rowlieCoach || {};
  state.rowlieCoach[page] = {
    topic:"problem",
    prompt:"Which card feels easiest to connect to your invention idea?",
    hint:"Look for one small connection between the problem, the power-up, and the inspiration card."
  };
}

function askRowlie(topic){
  const page = steps[state.step] || "general";
  const list = rowliePromptBank(topic);
  const q = list[Math.floor(Math.random()*list.length)];
  state.rowlieCoach = state.rowlieCoach || {};
  state.rowlieCoach[page] = {
    topic,
    prompt:q,
    hint:rowlieHint(topic)
  };
  save();
  render();
}

function rowlieHint(topic){
  const hints = {
    problem:"Instead of solving the whole problem, solve one annoying part first.",
    user:"Picture one real person using this. What would make their day easier?",
    science:"Think about force, energy, materials, sensors, living things, or data.",
    originality:"Do not quit if something similar exists. Make yours safer, cheaper, smaller, greener, or easier to use.",
    prototype:"Build the simplest test version first. Cardboard, paper, recycled materials, or a quick sketch can count.",
    stuck:"Try this sentence: My invention could help by _____."
  };
  return hints[topic] || hints.stuck;
}

function rowlieNudge(page){
  const coach = ensureRowlieCoach(page);
  return `<div class="chat-bubble rowlie"><b>💭 Rowlie notices:</b><br>${esc(rowlieSummary(page))}</div>
    <div class="chat-bubble rowlie"><b>🤔 Think about this:</b><br>${esc(coach.prompt)}</div>`;
}

function rowlieSummary(page){
  if(!state.problem || !state.power || !state.inspiration) return "Your invention idea will grow one choice at a time.";
  const pageNotes = {
    cards:"Your cards can become an invention if you look for one small connection first.",
    problem:"You are not solving everything yet. You are noticing who has the problem and why it matters.",
    power:"Your power-up is a tool. The goal is to decide how it helps solve the problem.",
    inspiration:"Inspiration is for learning from another inventor's thinking, not copying their invention.",
    mashup:"This is the messy idea stage. A rough idea is enough to keep moving.",
    whatif:"Inventors stretch ideas before they settle on a final design.",
    originality:"Original does not have to mean brand new. It can mean improved, redesigned, or made for a specific user.",
    science:"Science explains why your invention could actually work.",
    pitch:"A clear pitch helps someone understand the problem, solution, and why it matters."
  };
  const feeling = Number(state.inspirationFeeling || 3);
  if(page === "cards" && feeling <= 2) return "This set might not feel connected yet. That is normal for inventors.";
  return pageNotes[page] || "Rowlie can help you think through one step at a time.";
}

function rowlieHelperPanel(page){
  const coach = ensureRowlieCoach(page);
  return `<div class="rowlie-chat inventor-coach phase2-rowlie">
    <div class="rowlie-side"><img src="assets/rowlie-goggles-mock.png" alt="Rowlie inventor coach"></div>
    <div class="rowlie-main">
      <h3>Ask Rowlie</h3>
      <div class="rowlie-notice"><b>Rowlie notices:</b> ${esc(rowlieSummary(page))}</div>
      <div class="rowlie-question"><b>Think about this:</b><br>${esc(coach.prompt)}</div>
      <details class="rowlie-hint-box">
        <summary>💡 Give me a hint</summary>
        <p>${esc(coach.hint)}</p>
      </details>
      <div class="chat-controls">
        <button class="btn primary-gold" onclick="askRowlie('${coach.topic || 'problem'}')">🎲 Ask Another Question</button>
        <button class="btn secondary" onclick="askRowlie('problem')">Problem</button>
        <button class="btn secondary" onclick="askRowlie('user')">User</button>
        <button class="btn secondary" onclick="askRowlie('science')">Science</button>
        <button class="btn secondary" onclick="askRowlie('originality')">Originality</button>
        <button class="btn secondary" onclick="askRowlie('prototype')">Prototype</button>
        <button class="btn red" onclick="askRowlie('stuck')">I'm Really Stuck</button>
      </div>
    </div>
  </div>`;
}

function sendRowlieReply(page){
  // Kept for compatibility with older saved sessions, but Rowlie now shows one prompt at a time.
  askRowlie('stuck');
}

function setInspirationFeeling(value){
  state.inspirationFeeling = Number(value);
  save();
}

function notFeelingIt(){
  state.inspirationFeeling = 1;
  state.rowlieCoach = state.rowlieCoach || {};
  state.rowlieCoach.cards = {
    topic:"stuck",
    prompt:"Which card feels like it does not belong yet? Try switching only that one first.",
    hint:"Inventors often test several idea combinations before one clicks. You are not stuck; you are sorting."
  };
  save();
  render();
}

function publishToInventorWall(){
  saveInputs();
  updateNotebook();
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  const ideaTitle = (state.answers.wallTitle || state.answers.inventionBrief || state.answers.pitch1 || "Inventor Idea").trim();
  const item = {
    id: Date.now(),
    title: ideaTitle,
    problem: getCardTitle(state.problem),
    power: getCardTitle(state.power),
    inspiration: getCardTitle(state.inspiration),
    pitch: state.answers.pitch1 || state.answers.inventionBrief || state.answers.mashupIdeas || "Idea in progress",
    favoriteFeature: state.answers.powerHow_text || state.answers.pitch2 || "Feature still being refined.",
    science: state.answers.science_text || "",
    prototype: state.answers.prototypeSketch || "",
    likes: 0,
    submittedAt: new Date().toLocaleString()
  };
  wall.push(item);
  localStorage.setItem("inventorWall", JSON.stringify(wall));
  alert("Published anonymously to the Student Inventor Showcase on this device.");
}

function likeWallIdea(id){
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  const item = wall.find(x => x.id === id);
  if(item) item.likes = (item.likes || 0) + 1;
  localStorage.setItem("inventorWall", JSON.stringify(wall));
  renderInventorWall();
}

function wallTitle(item){
  return esc((item.title || item.pitch || "Inventor Idea").slice(0,70)) + ((item.title || item.pitch || "").length>70?"...":"");
}

function wallCard(item){
  return `<div class="wall-card">
    <h3>${wallTitle(item)}</h3>
    <p><b>Problem solved:</b> ${esc(item.problem || "Problem still being refined.")}</p>
    <p><b>Favorite feature:</b> ${esc(item.favoriteFeature || item.power || "Feature still being refined.")}</p>
    <p><b>Inspired by:</b> ${esc(item.inspiration || "Inventor thinking")}</p>
    <button class="btn secondary" onclick="likeWallIdea(${item.id})">💡 This gave me an idea!</button>
    <span class="wall-like">${item.likes||0} inspired</span>
  </div>`;
}

function renderInventorWall(){
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  shell(`<section class="sprint4-page showcase-page">
    <div class="sprint4-banner showcase-banner">
      <div>
        <div class="stage-kicker">K — Kick Off</div>
        <h2>Student Inventor Showcase</h2>
        <p>Celebrate creative invention ideas without posting student names or class periods.</p>
      </div>
      <div class="banner-badge">Be inspired. Don’t copy.</div>
    </div>
    <div class="sprint4-helper-card">
      <h3>How to use this showcase</h3>
      <p>Look for clever problems, useful features, and smart science connections. Use classmates’ ideas to spark your own thinking, not to copy their invention.</p>
    </div>
    <div class="wall-grid sprint4-wall-grid">
      ${wall.map(item=>wallCard(item)).join("") || `<div class="wall-card empty-showcase-card"><h3>No ideas yet</h3><p>Publish from the Summary page to add projects here.</p><button class="btn primary-gold" onclick="jumpToStep(${steps.indexOf('summary')})">Go to Summary</button></div>`}
    </div>
  </section>`);
}

function render(){
  const step = steps[state.step];
  if(step==="home") return renderHome();
  if(step==="drawProblem") return renderDrawProblem();
  if(step==="drawPower") return renderDrawPower();
  if(step==="drawInspiration") return renderDrawInspiration();
  if(step==="cards") return renderCards();
  if(step==="problem") return renderQuestion("Spot the Problem", `Why is this problem frustrating? ${state.problem[1]}`, "problemWhy", ["It wastes time","It makes a mess","It is unsafe","It makes people frustrated","It costs money","It affects many people"], sidekickFor("problem"));
  if(step==="power") return renderQuestion("Pair the Power-Up", `How could ${state.power[1]} help with this problem?`, "powerHow", ["Protect something","Organize something","Warn someone","Move something","Save energy","Make it easier"], sidekickFor("power"));
  if(step==="inspiration") return renderInspiration();
  if(step==="mashup") return renderTextQuestion("Mash Everything Together", `Look at all three cards: ${state.problem[1]} + ${state.power[1]} + ${state.inspiration.invention}. What invention ideas do these cards make you think of?`, "mashupIdeas", sidekickFor("mashup"));
  if(step==="whatif") return renderTextQuestion("Ask Better Questions", randomWhatIf(), "whatIf", sidekickFor("whatif"));
  if(step==="originality") return renderOriginality();
  if(step==="science") return renderQuestion("Science Coach", "What science could help your invention work?", "science", ["Forces & Motion","Energy","Electricity","Magnets","Heat","Sound","Materials","Biology","Engineering","Technology"], sidekickFor("science"));
  if(step==="pitch") return renderPitch();
  if(step==="studio") return renderStudio();
  if(step==="summary") return renderSummary();
  if(step==="inventorWall") return renderInventorWall();
}

function sampleGalleryCards(){
  return inspirationDeck.slice(0,3).map((item,idx)=>`<div class="wall-card preview-card">
    <h3>${esc(item.invention)}</h3>
    <p>${esc(item.what)}</p>
    <button class="btn secondary" onclick="state.step=steps.indexOf('drawInspiration'); save(); render();">View Inspiration</button>
  </div>`).join("");
}

function sampleWallCards(){
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  const samples = wall.slice(-3).reverse();
  if(samples.length){ return samples.map(item=>wallCard(item)).join(""); }
  return `<div class="wall-card preview-card"><h3>No ideas yet</h3><p>Student ideas will appear here after they publish from the Summary page.</p></div>`;
}

function openInspirationGallery(){
  saveInputs();
  state.step = steps.indexOf("drawInspiration");
  save();
  render();
}

function renderHome(){
  shell(`<section class="home-landing no-print">
    <div class="home-hero-mock">
      <div class="mondrian m-left"><span class="red"></span><span class="gold"></span><span class="blue"></span></div>
      <div class="mondrian m-right"><span class="red"></span><span class="blue"></span><span class="gold"></span></div>
      <div class="rowlie-mock"><img src="assets/rowlie-goggles-mock.png" alt="Rowlie wearing safety goggles"></div>
      <div class="hero-message-mock">
        <h2>Every great invention <span>starts with a spark.</span></h2>
        <p>You’ve got the curiosity. We’ve got the tools.<br>Let’s turn your ideas into real solutions.</p>
        <button class="mock-start" onclick="startFromHome()">Let’s Start Inventing <span>→</span></button>
      </div>
    </div>
    <div class="spark-process-mock">
      <div class="spark-label"><b>S.P.A.R.K.</b><span>The Inventor’s Process</span></div>
      <div class="spark-card"><b class="s">S</b><div><strong>Spot<br>a Problem</strong><small>Notice a real-world problem worth solving.</small></div></div>
      <div class="arrow">→</div>
      <div class="spark-card"><b class="p">P</b><div><strong>Power Up</strong><small>Add a feature, technology, or science idea.</small></div></div>
      <div class="arrow">→</div>
      <div class="spark-card"><b class="a">A</b><div><strong>Ask<br>Questions</strong><small>Think deeper with Rowlie and explore possibilities.</small></div></div>
      <div class="arrow">→</div>
      <div class="spark-card"><b class="r">R</b><div><strong>Refine</strong><small>Sketch, test, improve, and revise your invention.</small></div></div>
      <div class="arrow">→</div>
      <div class="spark-card"><b class="k">K</b><div><strong>Kick Off</strong><small>Build, share, and inspire others.</small></div></div>
    </div>
    <div class="home-panels-mock">
      <button class="home-panel-mock gallery" onclick="openInspirationGallery()">
        <span class="panel-icon">◎</span>
        <span><b>Inspiration Gallery</b><em>See inventions created by real young inventors from around the world. Learn how they noticed problems and turned them into creative solutions.</em><strong>Visit Inspiration Gallery →</strong></span>
      </button>
      <button class="home-panel-mock showcase" onclick="openInventorWall()">
        <span class="panel-icon">🏆</span>
        <span><b>Student Inventor Showcase</b><em>Explore inventions created by students in our class. Celebrate creative thinking, discover new ideas, and remember — be inspired, don’t copy!</em><strong>Visit Student Showcase →</strong></span>
      </button>
    </div>
    <input type="hidden" id="studentName" value="${esc(state.student.name || 'Inventor')}">
    <input type="hidden" id="studentPeriod" value="${esc(state.student.period || 'Period 1')}">
    <input type="hidden" id="studentTeacher" value="${esc(state.student.teacher || 'Stasny')}">
  </section>`);
}

function startFromHome(){
  state.student.name = state.student.name || "Inventor";
  state.student.period = state.student.period || "Period 1";
  state.student.teacher = state.student.teacher || "Stasny";
  state.step = steps.indexOf("drawProblem");
  save();
  render();
}

function renderDrawProblem(){
  shell(`<section class="phase2-stage stage-problem">
    <div class="stage-art"><img src="assets/deck1_problem_patrol.png" alt="Problem Patrol deck"></div>
    <div class="stage-copy">
      <div class="stage-kicker">S — Spot a Problem</div>
      <h2>Problem Patrol</h2>
      <p class="stage-lede">Draw a real-world problem. This becomes the need your invention will try to solve.</p>
      <div class="stage-tip"><b>Inventor Move:</b> Great inventions start by noticing what frustrates, slows down, wastes, spills, breaks, or gets in the way.</div>
      ${state.problem ? card("problem","DECK 1: PROBLEM PATROL",state.problem[0],state.problem[1],"This is the problem your invention will try to solve.") : `<div class="phase2-empty-card"><b>Ready for Deck 1?</b><span>Use the button below to randomly select your Problem Patrol card.</span></div>`}
    </div>
  </section>`);
}

function renderDrawPower(){
  shell(`<section class="phase2-stage stage-power">
    <div class="stage-art"><img src="assets/deck2_powerup_cards.png" alt="Power-Up deck"></div>
    <div class="stage-copy">
      <div class="stage-kicker">P — Power Up</div>
      <h2>Power-Up Cards</h2>
      <p class="stage-lede">Draw a feature, material, tool, or technology that can transform your idea.</p>
      <div class="stage-tip"><b>Inventor Move:</b> Do not worry if the connection is not obvious yet. Surprising combinations often lead to the best designs.</div>
      ${state.power ? card("power","DECK 2: POWER-UP",state.power[0],state.power[1],state.power[2]) : `<div class="phase2-empty-card"><b>Ready for Deck 2?</b><span>Use the button below to randomly select your Power-Up card.</span></div>`}
    </div>
  </section>`);
}

function renderDrawInspiration(){
  shell(`<section class="phase2-stage stage-inspiration">
    <div class="stage-art"><img src="assets/deck3_inspiration_cards.png" alt="Inspiration deck"></div>
    <div class="stage-copy">
      <div class="stage-kicker">P — Power Up with Inspiration</div>
      <h2>Inventor Inspiration</h2>
      <p class="stage-lede">Draw a real young inventor example. Use it to learn a thinking move, not to copy an invention.</p>
      <div class="stage-tip"><b>Inventor Move:</b> Notice how another inventor spotted a problem, used science, and helped people.</div>
      ${state.inspiration ? card("inspiration","DECK 3: INSPIRATION",state.inspiration.icon,state.inspiration.invention,`<b>Inventor:</b> ${state.inspiration.inventor}<br><b>What it does:</b> ${state.inspiration.what}<br><b>Science:</b> ${state.inspiration.science}`) : `<div class="phase2-empty-card"><b>Ready for Deck 3?</b><span>Use the button below to randomly select your Inspiration card.</span></div>`}
    </div>
  </section>`);
}

function card(type,label,icon,title,body){
  return `<div class="draw-card ${type}">
    <div class="deck-label">${label}</div>
    <div class="icon">${icon}</div>
    <h3>${title}</h3>
    <p>${body}</p>
  </div>`;
}

function renderCards(){
  shell(`<section class="phase2-table-page">
    <div class="table-hero">
      <div>
        <div class="stage-kicker">P — Power Up Your Idea</div>
        <h2>Owl's Opus Design Table</h2>
        <p>There are no wrong combinations. These cards are meant to spark ideas, not assign your invention.</p>
      </div>
      <div class="table-rule"><b>Your choices:</b><br>Ask Rowlie for support, switch one card, deal a new hand, or keep the set when it gets your imagination moving.</div>
      <div class="spark-budget"><b>Inspiration Sparks</b><div class="spark-dots">${sparksDisplay()}</div><small>Use a spark to deal a full new hand. When the sparks are gone, build from the cards you have.</small></div>
    </div>
    <div class="phase2-card-grid">
      <div class="phase2-selected-card problem-card">
        <div class="mini-label">Deck 1</div><h3>Problem Patrol</h3>
        <div class="big-icon">${state.problem ? state.problem[0] : '🎴'}</div>
        <h4>${state.problem ? esc(state.problem[1]) : 'Draw a problem card.'}</h4>
        <p>${state.problem ? `<span class="deck-count">${remainingCount("problem")} cards left before reshuffle</span>` : 'This becomes the need your invention will solve.'}</p>
        <button class="btn red" onclick="switchCard('problem')" ${canConsumeSwitch("problem") ? "" : "disabled"}>${switchLabel("problem", "Switch Problem")}</button>
      </div>
      <div class="phase2-selected-card power-card">
        <div class="mini-label">Deck 2</div><h3>Power-Up</h3>
        <div class="big-icon">${state.power ? state.power[0] : '⚡'}</div>
        <h4>${state.power ? esc(state.power[1]) : 'Draw a power-up card.'}</h4>
        <p>${state.power ? `${esc(state.power[2])}<br><span class="deck-count">${remainingCount("power")} cards left before reshuffle</span>` : 'This adds a feature, material, or technology.'}</p>
        <button class="btn red" onclick="switchCard('power')" ${canConsumeSwitch("power") ? "" : "disabled"}>${switchLabel("power", "Switch Power-Up")}</button>
      </div>
      <div class="phase2-selected-card inspiration-card">
        <div class="mini-label">Deck 3</div><h3>Inspiration</h3>
        <div class="big-icon">${state.inspiration ? state.inspiration.icon : '◎'}</div>
        <h4>${state.inspiration ? esc(state.inspiration.invention) : 'Draw an inspiration card.'}</h4>
        <p>${state.inspiration ? `<b>Inventor:</b> ${esc(state.inspiration.inventor)}<br><b>Science:</b> ${esc(state.inspiration.science)}<br><span class="deck-count">${remainingCount("inspiration")} cards left before reshuffle</span>` : 'This helps you learn from another inventor.'}</p>
        <button class="btn red" onclick="switchCard('inspiration')" ${canConsumeSwitch("inspiration") ? "" : "disabled"}>${switchLabel("inspiration", "Switch Inspiration")}</button>
      </div>
    </div>
    <div class="phase2-controls">
      <div class="inspiration-slider phase2-slider">
        <b>How inspired do you feel by this combination?</b>
        <input type="range" min="1" max="5" value="${state.inspirationFeeling || 3}" onchange="setInspirationFeeling(this.value)">
        <div>😕 Not yet &nbsp;&nbsp; 🤔 Maybe &nbsp;&nbsp; 😃 I have an idea!</div>
      </div>
      <div class="design-actions no-print">
        <button class="btn navy" onclick="drawAllThree()" ${canConsumeSwitch("hand") || !(state.problem && state.power && state.inspiration) ? "" : "disabled"}>🎲 ${state.problem && state.power && state.inspiration ? switchLabel("hand", "Deal New Hand") : "Draw All Three"}</button>
        <button class="btn secondary" onclick="notFeelingIt()">😕 Not Feeling It</button>
        <button class="btn primary-gold" onclick="keepAllThree()">🚀 Let's Build This Idea</button>
      </div>
    </div>
    ${rowlieHelperPanel("cards")}
  </section>`);
}
function sidekickFor(step){
  const prompts = {
    problem:["Who is bothered by this problem the most?","When does this problem happen?","What makes this problem annoying, unsafe, messy, or expensive?","What happens right before this problem?","What happens after this problem?"],
    power:["Could this power-up protect, move, organize, warn, or connect something?","Would this power-up work better hidden, attached, wearable, or portable?","What would this power-up change about the problem?","What would be the simplest way to use this power-up?"],
    mashup:["Try starting with: My invention could...","What if you combined only one part of the power-up with the problem?","Could your invention help a younger student, an older adult, or a pet?","What would the first rough version look like?"],
    whatif:["Push your idea past normal. What is the weird version?","Now shrink the idea. What is the simple version?","What could it do automatically?","Could it solve two problems at once?"],
    science:["What force, energy, material, sensor, or body system makes it work?","How could you test if it works?","What data could you collect?","What part is science and what part is engineering?"]
  };
  return prompts[step] || [];
}

function getSentenceStarter(step){
  const prompt = state.sidekick[step] || "";
  if(step === "problem"){
    if(prompt.includes("Who")) return "This problem affects ___ because...";
    if(prompt.includes("When")) return "This problem usually happens when...";
    if(prompt.includes("annoying") || prompt.includes("unsafe") || prompt.includes("messy")) return "This problem is frustrating because...";
    if(prompt.includes("right before")) return "Right before this problem happens...";
    if(prompt.includes("after")) return "After this problem happens...";
    return "This problem matters because...";
  }
  if(step === "power"){
    if(prompt.includes("protect")) return "This power-up could help by...";
    if(prompt.includes("hidden") || prompt.includes("attached") || prompt.includes("wearable")) return "This power-up could be used as a...";
    if(prompt.includes("change")) return "This power-up would change the problem by...";
    if(prompt.includes("simplest")) return "The simplest way to use this power-up would be...";
    return "This power-up could help by...";
  }
  if(step === "inspiration"){
    if(prompt.includes("notice")) return "This inventor first noticed...";
    if(prompt.includes("science")) return "Science helped this invention by...";
    if(prompt.includes("borrow")) return "I can remix this idea by...";
    if(prompt.includes("benefited")) return "This invention helped...";
    return "I can remix this invention by...";
  }
  if(step === "mashup") return "One possible remix idea is...";
  if(step === "whatif") return "If I changed one thing, I could...";
  if(step === "originality") return "My invention would be different because...";
  if(step === "science") return "The science behind my invention is...";
  if(step === "pitch") return "My invention solves...";
  return "I think...";
}


function coachFeedback(text){
  const t=(text||"").trim().toLowerCase();
  if(t.length<12 || ["idk","i don't know","yes","no","asdf","aaaa","1234"].includes(t)){
    return ["stop","Hmm... that does not look like inventor thinking yet. Add one complete sentence with who, when, or why."];
  }
  const words=["because","when","who","material","science","test","energy","force","data","problem","different","user","people","help"];
  const score=words.filter(w=>t.includes(w)).length;
  if(score>=2 || t.length>80) return ["strong","⭐ Strong thinking. You gave useful details. Rowlie can now help you stretch this idea deeper."];
  return ["revise","You're on the right track. Add one more detail: who it helps, when it happens, why it matters, or how science connects."];
}
function meterFor(text){
  const n=(text||"").length;
  return `<div class="meter"><div class="${n>20?'filled':''}">🌱 Notice</div><div class="${n>50?'filled':''}">🌿 Understand</div><div class="${n>90?'filled':''}">🌳 Imagine</div><div class="${n>130?'filled':''}">🚀 Invent</div></div>`;
}
function coachPanel(step, prompts){
  // v10.3: Use the same streamlined Ask Rowlie / Inventor Coach style on all student thinking pages.
  // The original coach panel kept feedback history and extra reading; this keeps one clear prompt at a time.
  return rowlieHelperPanel(step);
}

function renderQuestion(title,prompt,key,choices,sidekickPrompts=[]){
  const pageKey = key==="problemWhy" ? "problem" : key==="powerHow" ? "power" : key;
  const stepName = steps[state.step];
  const starter = getSentenceStarter(pageKey);
  const checklist = pageKey === "science" ? ["Name the science idea.","Explain how it helps the invention work.","Describe one way to test it."] : pageKey === "power" ? ["Explain how the power-up helps.","Connect it to the problem.","Add one detail about the user."] : ["Name who is affected.","Explain when it happens.","Explain why it matters."];
  shell(`<section class="mission-page mission-${pageKey}">
    ${missionHeader(stepName)}
    <div class="mission-card thinking-card clean-thinking-card">
      <div class="prompt mission-prompt">${prompt}</div>
      <h3>Choose what matters most</h3>
      <p class="microcopy">Pick any ideas that connect to your invention. These choices help organize your thinking.</p>
      <div class="choices sprint3-choices clean-choices">
        ${choices.map(c=>`<div class="choice ${(state.answers[key]||[]).includes(c)?'selected':''}" onclick="toggleChoice('${key}', '${esc(c)}', this)">${c}</div>`).join("")}
      </div>
      <h3>My Thinking</h3>
      <p class="sentence-starter"><b>Try starting:</b> ${esc(starter)}</p>
      <textarea id="${key}_text" placeholder="Explain your thinking in at least one complete sentence...">${esc(state.answers[key+"_text"]||"")}</textarea>
      <div class="inline-checklist"><b>Before the next mission:</b> ${checklist.map(x=>`<span>${x}</span>`).join("")}</div>
    </div>
    ${coachPanel(pageKey, sidekickPrompts)}
  </section>`);
}

function renderInspiration(){
  const i = state.inspiration;
  shell(`<section class="phase2-learn-page">
    <div class="learn-banner">
      <div class="stage-kicker">P — Learn from Inspiration</div>
      <h2>${esc(i.invention)}</h2>
      <p>Study the inventor's thinking. Then remix the thinking move into your own original invention.</p>
    </div>
    <div class="learn-grid">
      ${card("inspiration","DECK 3: INSPIRATION",i.icon,i.invention,`<b>Young inventor:</b> ${i.inventor}`)}
      <div class="learn-panels">
        <div class="info-box"><h3>Problem Solved</h3><p>${i.problem}</p></div>
        <div class="info-box"><h3>What It Does</h3><p>${i.what}</p></div>
        <div class="info-box"><h3>Science Behind It</h3><p>${i.science}</p></div>
        <div class="info-box"><h3>Inventor Thinking</h3><p>${i.think}</p></div>
      </div>
    </div>
    ${rowlieHelperPanel("inspiration")}
    <div class="prompt">What can you learn from this invention? How can you remix part of its thinking into your own invention without copying it?</div>
    <textarea oninput="liveSave()" id="inspirationLearn_text" placeholder="I can remix this invention by...">${esc(state.answers.inspirationLearn_text||"")}</textarea>
  </section>`);
}

function renderTextQuestion(title,prompt,key,sidekickPrompts=[]){
  const pageKey = key==="mashupIdeas" ? "mashup" : "whatif";
  const stepName = steps[state.step];
  const starter = getSentenceStarter(pageKey);
  shell(`<section class="mission-page mission-${pageKey}">
    ${missionHeader(stepName)}
    <div class="mission-card thinking-card clean-thinking-card wide-writing">
      <div class="prompt mission-prompt">${prompt}</div>
      <h3>Inventor Thinking Space</h3>
      <p class="sentence-starter"><b>Try starting:</b> ${esc(starter)}</p>
      <textarea id="${key}" placeholder="Type your ideas here in at least one complete sentence...">${esc(state.answers[key]||"")}</textarea>
      <div class="idea-strips clean-strips">
        <span>Make it safer</span><span>Make it smaller</span><span>Make it greener</span><span>Make it easier</span><span>Help a new user</span>
      </div>
    </div>
    ${coachPanel(pageKey, sidekickPrompts)}
  </section>`);
}

function renderOriginality(){
  shell(`<section class="mission-page mission-originality">
    ${missionHeader("originality")}
    <div class="mission-card thinking-card clean-thinking-card">
      <h3>1. Describe your invention</h3>
      <p class="microcopy">Write 3–6 sentences in your own words. Explain the problem, how it works, who would use it, and what makes it different.</p>
      <textarea oninput="liveSave()" id="inventionBrief" placeholder="My invention is... It helps... It works by... What makes it different is...">${esc(state.answers.inventionBrief||"")}</textarea>
      <h3>2. Search for similar ideas</h3>
      <div class="search-row sprint3-search-row clean-search-row">
        <div class="field"><label>Search terms</label><input id="searchTerms" value="${esc(state.answers.searchTerms || "")}" placeholder="Example: backpack solar charger invention"></div>
        <button class="btn primary-gold" onclick="openGoogleSearch()">Open Search</button>
      </div>
      <p class="small-note">Search for similar products, patents, videos, or inventions. Then return here and write what you found.</p>
      <div class="choices sprint3-choices clean-choices">
        ${["Yes, something similar exists","Kind of / partly exists","No, I did not find anything similar","I need more research"].map(c=>`<div class="choice ${(state.answers.similarExists||[]).includes(c)?'selected':''}" onclick="toggleChoice('similarExists', '${esc(c)}', this)">${c}</div>`).join("")}
      </div>
      <h3>3. What did you find?</h3>
      <textarea oninput="liveSave()" id="searchEvidence" placeholder="List websites, products, keywords, or notes from your search.">${esc(state.answers.searchEvidence||"")}</textarea>
      <h3>4. How is yours different?</h3>
      <textarea oninput="liveSave()" id="originality_text" placeholder="Smaller? Safer? Cheaper? Greener? Easier to use? Helps a different group?">${esc(state.answers.originality_text||"")}</textarea>
    </div>
    ${coachPanel("originality",["What problem does your invention solve?","Who would use your invention?","What makes your idea different from things that already exist?","Different can mean smaller, safer, cheaper, greener, or easier to use."])}
  </section>`);
}

function renderPitch(){
  shell(`<section class="mission-page mission-pitch">
    ${missionHeader("pitch")}
    <div class="mission-card thinking-card clean-thinking-card">
      <h3>Build your pitch</h3>
      <p><b>My invention solves...</b></p><textarea oninput="liveSave()" id="pitch1" placeholder="Name the problem and your solution.">${esc(state.answers.pitch1||"")}</textarea>
      <p><b>People need this because...</b></p><textarea oninput="liveSave()" id="pitch2" placeholder="Explain who it helps and why it matters.">${esc(state.answers.pitch2||"")}</textarea>
      <p><b>The science behind it is...</b></p><textarea oninput="liveSave()" id="pitch3" placeholder="Explain what makes it work.">${esc(state.answers.pitch3||"")}</textarea>
      <div class="inline-checklist"><b>Strong pitch checklist:</b><span>Problem is clear</span><span>User is clear</span><span>Solution is clear</span><span>Science connection is clear</span></div>
    </div>
    ${coachPanel("pitch",["Start with the problem, then explain your solution.","What is the most important feature?","Who would use it first?","What science makes it work?"])}
  </section>`);
}

function updateNotebook(){
  state.notebook={
    problem:state.answers.problemWhy_text||"",
    user:(state.answers.problemWhy_text||"").toLowerCase().includes("student")?"Students":((state.answers.problemWhy_text||"").toLowerCase().includes("people")?"People with this problem":""),
    power:state.answers.powerHow_text||"",
    remix:state.answers.inspirationLearn_text||"",
    ideas:state.answers.mashupIdeas||"",
    originality:state.answers.originality_text||"",
    science:state.answers.science_text||"",
    pitch:state.answers.pitch1||"",
    prototype:state.answers.prototypeSketch||"",
    test:state.answers.testPlan||""
  };
  state.badges=[];
}
function note(title,text){return `<div class="note-item"><b>${title}</b><br>${esc(text||"Not added yet.")}</div>`;}
function addCanvasStarter(t){const el=document.getElementById("prototypeSketch"); if(el){el.value=el.value?el.value+"\n"+t:t; liveSave(); el.focus();}}
function renderStudio(){
  updateNotebook();
  shell(`<section class="mission-page mission-studio">
    ${missionHeader("studio")}
    <div class="selected-card-strip clean-card-strip">
      ${card("problem","PROBLEM",state.problem[0],state.problem[1],"")}
      ${card("power","POWER-UP",state.power[0],state.power[1],"")}
      ${card("inspiration","INSPIRATION",state.inspiration.icon,state.inspiration.invention,"")}
    </div>

    <div class="mission-card prototype-board clean-prototype-board">
      <h3>Prototype Canvas</h3>
      <p class="prototype-note">Draw with your finger, Apple Pencil, or mouse. You can also upload a photo of a paper sketch or prototype.</p>
      <div class="prototype-toolbar no-print clean-toolbar">
        <button class="btn secondary" onclick="setTool('pen')">Pen</button>
        <button class="btn secondary" onclick="setTool('eraser')">Eraser</button>
        <button class="btn secondary" onclick="clearPrototypeCanvas()">Clear</button>
        <button class="btn primary-gold" onclick="savePrototypeCanvas()">Save Drawing</button>
        <label>Color <input type="color" id="drawColor" value="#171717"></label>
        <label>Size <input type="range" id="drawSize" min="2" max="24" value="5"></label>
      </div>
      <div class="prototype-toolbar no-print clean-toolbar">
        <input type="file" id="photoUpload" accept="image/*" onchange="uploadPrototypePhoto(event)">
        <button class="btn blue" onclick="downloadPrototypeImage()">Download Image</button>
      </div>
      ${state.answers.prototypePhoto ? `<img class="photo-preview" src="${state.answers.prototypePhoto}" alt="Uploaded prototype photo">` : ""}
      <div class="canvas-wrap"><canvas id="prototypeCanvas" width="900" height="420"></canvas></div>
      <p><b>Prototype Notes</b></p>
      <textarea id="prototypeSketch" oninput="liveSave()" placeholder="Describe your drawing. Label the parts, materials, science, and how it works.">${esc(state.answers.prototypeSketch||"")}</textarea>
      <p><b>Testing Plan</b></p>
      <textarea id="testPlan" oninput="liveSave()" placeholder="How could you test if this prototype works? What data could you collect?">${esc(state.answers.testPlan||"")}</textarea>
    </div>

    <div class="prototype-bank mission-card">
      <h3>Prototype Bank</h3>
      <p>Use these labels to plan your sketch and explain how your invention works.</p>
      <div class="label-bank clean-label-bank">
        ${["Part A","Material","Science","Input","Output","Energy","Safety","Test"].map(x=>`<span class="label-chip" onclick="addCanvasStarter('${x}:')">${x}</span>`).join("")}
      </div>
      <div class="buildability-row">
        ${["Materials","Power/source","Size","Safety","Cost","Testing"].map(x=>`<span>${x}</span>`).join("")}
      </div>
    </div>

    <div class="mission-card inventor-snapshot-mini">
      <h3>Inventor Notebook Snapshot</h3>
      <div class="snapshot-grid">
        ${note("Problem",state.notebook.problem)}
        ${note("Who it helps",state.notebook.user)}
        ${note("Power-Up",state.notebook.power)}
        ${note("Remix",state.notebook.remix)}
        ${note("Originality",state.notebook.originality)}
        ${note("Science",state.notebook.science)}
      </div>
    </div>
    ${rowlieHelperPanel("prototype")}
  </section>`);
  setTimeout(initPrototypeCanvas, 50);
}
function renderSummary(){
  updateNotebook();
  shell(`<section class="mission-page summary-page mission-summary">
    ${missionHeader("summary")}

    <div class="summary-hero-grid clean-summary-hero">
      <div class="summary-feature-card mission-card">
        <h3>Your Invention Pitch</h3>
        <p>${esc(state.answers.pitch1 || state.answers.inventionBrief || state.answers.mashupIdeas || "Your pitch will appear here after you write it.")}</p>
      </div>
      <div class="summary-action-card mission-card no-print">
        <h3>Next Step</h3>
        <p>Choose how you want to save or share this brainstorm sheet.</p>
        <div class="summary-actions">
          <button class="btn green" onclick="submitResult()">Submit to Teacher Hub</button>
          <button class="btn blue" onclick="publishToInventorWall()">Publish to Showcase</button>
          <button class="btn primary-gold" onclick="window.print()">Print / Save PDF</button>
        </div>
      </div>
    </div>

    <div class="mission-card inventor-snapshot">
      <h3>My Inventor Snapshot</h3>
      <div class="snapshot-grid">
        <div class="summary-box"><h3>Problem</h3><p>${esc(state.answers.problemWhy_text||"Not added yet.")}</p></div>
        <div class="summary-box"><h3>Best Feature</h3><p>${esc(state.answers.powerHow_text||state.power?.[1]||"Not added yet.")}</p></div>
        <div class="summary-box"><h3>Science</h3><p>${esc(state.answers.science_text||"Not added yet.")}</p></div>
        <div class="summary-box"><h3>Biggest Challenge</h3><p>${esc(state.answers.whatIf||state.answers.originality_text||"Not added yet.")}</p></div>
        <div class="summary-box"><h3>Prototype</h3><p>${esc(state.answers.prototypeSketch||"Not added yet.")}</p></div>
        <div class="summary-box"><h3>Next Step</h3><p>${esc(state.answers.testPlan||"Test the first prototype and collect feedback.")}</p></div>
      </div>
    </div>

    <div class="summary-grid sprint4-summary-grid clean-card-summary">
      <div class="summary-box"><h3>Student Info</h3><p><b>Name:</b> ${esc(state.student.name)}<br><b>Period:</b> ${esc(state.student.period)}<br><b>Teacher:</b> ${esc(state.student.teacher)}</p></div>
      <div class="summary-box"><h3>Problem Card</h3><p>${state.problem[0]} ${state.problem[1]}</p></div>
      <div class="summary-box"><h3>Power-Up Card</h3><p>${state.power[0]} ${state.power[1]}<br><span>${state.power[2]}</span></p></div>
      <div class="summary-box"><h3>Inspiration Card</h3><p><b>${state.inspiration.invention}</b><br>${state.inspiration.what}<br><b>Inventor:</b> ${state.inspiration.inventor}</p></div>
    </div>

    <div class="evidence-grid clean-evidence-grid">
      <div class="evidence-card"><h3>Inspiration Remix</h3><p>${esc(state.answers.inspirationLearn_text||"Not added yet.")}</p></div>
      <div class="evidence-card"><h3>Mash-Up Ideas</h3><p>${esc(state.answers.mashupIdeas||"Not added yet.")}</p></div>
      <div class="evidence-card"><h3>Originality Search</h3><p><b>Search notes:</b> ${esc(state.answers.searchEvidence||"Not added yet.")}<br><b>How mine is different:</b> ${esc(state.answers.originality_text||"Not added yet.")}</p></div>
      <div class="evidence-card"><h3>Prototype + Test Plan</h3><p><b>Prototype:</b> ${esc(state.answers.prototypeSketch||"Not added yet.")}<br><b>Testing:</b> ${esc(state.answers.testPlan||"Not added yet.")}</p></div>
    </div>
  </section>`);
}

function nextAction(){
  const step = steps[state.step];
  saveInputs();
  if(step==="home"){
    state.student.name = document.getElementById("studentName")?.value || "";
    state.student.period = document.getElementById("studentPeriod")?.value || "";
    state.student.teacher = document.getElementById("studentTeacher")?.value || "";
  }
  if(step==="drawProblem" && !state.problem){ state.problem = drawFromDeck("problem", state.problem); save(); render(); return; }
  if(step==="drawPower" && !state.power){ state.power = drawFromDeck("power", state.power); save(); render(); return; }
  if(step==="drawInspiration" && !state.inspiration){ state.inspiration = drawFromDeck("inspiration", state.inspiration); save(); render(); return; }
  if(step==="summary"){ window.print(); return; }
  if(step==="inventorWall"){ state.step = steps.indexOf("cards"); save(); render(); return; }
  const warning = validateCurrentStep();
  if(warning){ showWarning(warning); return; }
  state.step++;
  save();
  render();
}

function switchCard(type){
  ensureSwitchLimits();
  const hasCurrent = !!state[type];
  if(hasCurrent && !consumeSwitch(type)){
    state.rowlieCoach = state.rowlieCoach || {};
    state.rowlieCoach.cards = {topic:"stuck", prompt:"How could this card become useful if you looked at it from a different angle?", hint:switchLimitMessage(type)};
    save();
    render();
    return;
  }
  state.cardsLocked=false;
  if(type==="problem") state.problem=drawFromDeck("problem", state.problem);
  if(type==="power") state.power=drawFromDeck("power", state.power);
  if(type==="inspiration") state.inspiration=drawFromDeck("inspiration", state.inspiration);
  resetRowlieCoach("cards");
  save();
  render();
}

function back(){ saveInputs(); state.step = Math.max(0,state.step-1); save(); render(); }
function goHome(){ saveInputs(); state.step = 0; save(); render(); }
function startOver(){
  if(confirm("Start over with new random cards?")){
    state = {step:0, student:{name:"",period:"",teacher:""}, problem:null, power:null, inspiration:null, answers:{}, sidekick:{}, notebook:{}, badges:[], deckQueues:{problem:[],power:[],inspiration:[]}, deckHistory:{problem:[],power:[],inspiration:[]}, rowlieChat:{}, rowlieCoach:{}, inspirationFeeling:3, switchLimits:{hand:3, problem:2, power:2, inspiration:2}};
    save(); render();
  }
}

function saveInputs(){
  document.querySelectorAll("textarea,input,select").forEach(el=>{
    if(["studentName","studentPeriod","studentTeacher"].includes(el.id)) return;
    if(el.id) state.answers[el.id]=el.value;
  });
}

function liveSave(){ saveInputs(); save(); }

function bindAutosaveInputs(){
  document.querySelectorAll("textarea,input,select").forEach(el => {
    if(el.dataset.autosaveBound) return;
    el.dataset.autosaveBound = "true";
    el.addEventListener("input", liveSave);
    el.addEventListener("change", liveSave);
  });
}

function toggleChoice(key,val,el){
  state.answers[key] = state.answers[key] || [];
  if(state.answers[key].includes(val)) state.answers[key] = state.answers[key].filter(x=>x!==val);
  else state.answers[key].push(val);
  el.classList.toggle("selected");
  save();
}

function newCoachQuestion(step){
  const prompts = {
    problem:["Who is bothered by this problem the most?","When does this problem happen?","What makes this problem annoying, unsafe, messy, or expensive?","What happens right before this problem?","What do people do now to deal with it?"],
    power:["Could this power-up protect, move, organize, warn, or connect something?","Would this power-up work better hidden, attached, wearable, or portable?","What would this power-up change about the problem?","What would be the simplest way to use this power-up?","What could go wrong with this power-up?"],
    inspiration:["What did this inventor notice first?","How did science help solve the problem?","What can you remix as a thinking move, not copy as an invention?","Who benefited from this invention?","How could the same science be used in a different way?"],
    mashup:["What are three very different versions of this idea?","What would the simplest first prototype look like?","Who would use this first?","What part of the inspiration card could you remix?","Could your idea solve two problems at once?"],
    whatif:["Push your idea past normal. What is the weird version?","Now shrink the idea. What is the simple version?","What could it do automatically?","Could it work without electricity?","Could nature inspire the design?"],
    originality:["What search terms will help you find similar inventions?","If something exists, how will yours be different?","Can yours be safer, cheaper, smaller, or greener?","What user group does your idea help better?","What unique feature does your idea have?"],
    science:["What force, energy, material, sensor, or body system makes it work?","How could you test if it works?","What data could you collect?","What part is science and what part is engineering?","What might fail and why?"],
    pitch:["Start with the problem, then explain your solution.","What is the most important feature?","Who would use it first?","What science makes it work?","Why is it different from existing ideas?"]
  };
  const list = prompts[step] || ["What else could you try?"];
  const cur=state.sidekick[step];
  state.sidekick[step] = list[(list.indexOf(cur)+1)%list.length];
  save(); render();
}

function showStrongExample(step){
  const examples={problem:"Strong thinking: This problem affects middle school students because it happens every morning and causes them to lose time.",power:"Strong thinking: This power-up could organize the parts so the user can find items faster.",inspiration:"Strong thinking: I can remix the science idea, but use it for a different problem and user.",mashup:"Strong thinking: One version would solve the problem at school, and another version would help at home.",whatif:"Strong thinking: If it worked without electricity, it could use gravity, springs, or simple machines.",originality:"Strong thinking: Similar products exist, but mine would be different because it is designed for middle school students and uses recycled materials.",science:"Strong thinking: The invention uses force and materials because the structure must hold weight without breaking.",pitch:"Strong thinking: My invention solves a real problem for a specific group and uses science to make it work."};
  alert(examples[step]||"Add who, when, why, and how.");
}

function sentenceStarter(step){
  const active = document.querySelector("textarea");
  if(active){
    const starter = getSentenceStarter(step);
    active.value = active.value ? active.value + "\n" + starter : starter;
    active.focus();
  }
}
function openGoogleSearch(){
  const terms = document.getElementById("searchTerms").value;
  state.answers.searchTerms = terms;
  save();
  window.open(`https://www.google.com/search?q=${encodeURIComponent(terms)}`, "_blank");
}

function randomWhatIf(){
  return [
    "What if your invention folded, changed shape, or fit in a backpack?",
    "What if your invention warned someone before the problem happened?",
    "What if your invention used recycled materials?",
    "What if your invention helped two problems at the same time?",
    "What if your invention worked without electricity?",
    "What if nature inspired part of your design?",
    "What if your invention had to cost less than $20?"
  ][Math.floor(Math.random()*7)];
}

async function submitResult(){
  saveInputs();
  updateNotebook();
  const result = {...state, submittedAt:new Date().toLocaleString(), submittedAtISO:new Date().toISOString()};

  if(firebaseReady && db && window.firebaseTools){
    try{
      await window.firebaseTools.addDoc(window.firebaseTools.collection(db, "inventorLabResults"), result);
      alert("Submitted to Teacher Hub.");
      return;
    }catch(err){
      console.warn("Firestore submit failed. Saving locally instead.", err);
    }
  }

  const all = JSON.parse(localStorage.getItem("inventorLabResults_v2") || "[]");
  all.push(result);
  localStorage.setItem("inventorLabResults_v2", JSON.stringify(all));
  alert("Submitted to Teacher Hub on this device. Firebase is not connected yet.");
}

function teacherLogin(){
  const teacher = prompt("Teacher name:");
  if(!TEACHERS.includes(teacher)){ alert("Teacher name not recognized."); return; }
  const pass = prompt("Password:");
  if(pass !== teacher){ alert("Incorrect password."); return; }
  renderTeacherHub(teacher);
}

async function getTeacherResults(teacher){
  if(firebaseReady && db && window.firebaseTools){
    try{
      const q = window.firebaseTools.query(
        window.firebaseTools.collection(db, "inventorLabResults"),
        window.firebaseTools.where("student.teacher", "==", teacher)
      );
      const snap = await window.firebaseTools.getDocs(q);
      const results = [];
      snap.forEach(doc => results.push({id: doc.id, ...doc.data()}));
      return {source:"Firestore", results};
    }catch(err){
      console.warn("Firestore read failed. Using local results.", err);
    }
  }
  const results = JSON.parse(localStorage.getItem("inventorLabResults_v2") || "[]")
    .filter(r => r.student?.teacher === teacher);
  return {source:"Local browser storage", results};
}

async function renderTeacherHub(teacher){
  app.innerHTML = `<div class="app theme-refresh">
    <div class="topbar no-print">
      <div class="brand"><img class="school-logo-img" src="assets/rowlett-logo-mock.png" alt="Rowlett logo"><div><h1>${esc(teacher)} <span>Teacher Hub</span></h1><p>Loading student results...</p></div></div>
      <div class="nav"><button class="nav-tile" onclick="render()"><span>⌂</span>Back to App</button></div>
    </div>
    <section class="panel"><h2>Loading...</h2></section>
  </div>`;

  const {source, results} = await getTeacherResults(teacher);
  app.innerHTML = `<div class="app theme-refresh">
    <div class="topbar no-print">
      <div class="brand"><img class="school-logo-img" src="assets/rowlett-logo-mock.png" alt="Rowlett logo"><div><h1>${esc(teacher)} <span>Teacher Hub</span></h1><p>Password-protected student results dashboard</p></div></div>
      <div class="nav"><button class="nav-tile" onclick="render()"><span>⌂</span>Back to App</button><button class="nav-tile teacher-link" onclick="clearResults('${esc(teacher)}')"><span>×</span>Clear Local</button></div>
    </div>
    <section class="sprint4-page teacher-page">
      <div class="sprint4-banner teacher-banner">
        <div>
          <div class="stage-kicker">Teacher View</div>
          <h2>Student Results</h2>
          <p>Review student thinking, originality notes, science evidence, and prototype plans.</p>
        </div>
        <div class="banner-badge">${results.length} submissions</div>
      </div>
      <div class="firebase-status sprint4-status">Data source: ${esc(source)} ${source==="Firestore" ? "✅ Shared dashboard connected." : "⚠️ Local browser storage. Add Firebase for a shared classroom dashboard."}</div>
      <div class="teacher-card-grid">
        ${results.map(r=>`<article class="teacher-result-card">
          <header><h3>${esc(r.student?.name || "Student")}</h3><span>${esc(r.student?.period || "")}</span></header>
          <p class="date-line">${esc(r.submittedAt || r.submittedAtISO || "")}</p>
          <div class="mini-data"><b>Problem</b><span>${esc(r.problem?.[1] || "")}</span></div>
          <div class="mini-data"><b>Power-Up</b><span>${esc(r.power?.[1] || "")}</span></div>
          <div class="mini-data"><b>Inspiration</b><span>${esc(r.inspiration?.invention || "")}</span></div>
          <div class="teacher-evidence"><h4>Idea / Pitch</h4><p>${esc(r.answers?.pitch1 || r.answers?.mashupIdeas || "")}</p></div>
          <div class="teacher-evidence"><h4>Originality</h4><p><b>Terms:</b> ${esc(r.answers?.searchTerms || "")}<br><b>Evidence:</b> ${esc(r.answers?.searchEvidence || "")}<br><b>Different:</b> ${esc(r.answers?.originality_text || "")}</p></div>
          <div class="teacher-evidence"><h4>Science / Prototype</h4><p><b>Science:</b> ${esc(r.answers?.science_text || "")}<br><b>Prototype:</b> ${esc(r.answers?.prototypeSketch || "")}</p></div>
        </article>`).join("") || `<div class="empty-teacher-card"><h3>No submissions yet</h3><p>Student work will appear here after they submit from the Summary page.</p></div>`}
      </div>
    </section>
  </div>`;
}

function clearResults(teacher){
  if(confirm("Clear local student results for this teacher? This does not delete Firestore records.")){
    const all = JSON.parse(localStorage.getItem("inventorLabResults_v2") || "[]");
    localStorage.setItem("inventorLabResults_v2", JSON.stringify(all.filter(r => r.student?.teacher !== teacher)));
    renderTeacherHub(teacher);
  }
}

let drawTool = "pen";
let drawing = false;
let canvasCtx = null;
let lastPoint = null;

function setTool(tool){
  drawTool = tool;
}

function initPrototypeCanvas(){
  const canvas = document.getElementById("prototypeCanvas");
  if(!canvas) return;
  canvasCtx = canvas.getContext("2d");
  canvasCtx.lineCap = "round";
  canvasCtx.lineJoin = "round";
  canvasCtx.fillStyle = "#ffffff";
  canvasCtx.fillRect(0,0,canvas.width,canvas.height);

  if(state.answers.prototypeCanvas){
    const img = new Image();
    img.onload = () => canvasCtx.drawImage(img,0,0,canvas.width,canvas.height);
    img.src = state.answers.prototypeCanvas;
  }

  const getPoint = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    drawing = true;
    lastPoint = getPoint(e);
  };
  const moveDraw = (e) => {
    if(!drawing) return;
    e.preventDefault();
    const p = getPoint(e);
    const color = document.getElementById("drawColor")?.value || "#171717";
    const size = Number(document.getElementById("drawSize")?.value || 5);
    canvasCtx.strokeStyle = drawTool === "eraser" ? "#ffffff" : color;
    canvasCtx.lineWidth = drawTool === "eraser" ? size * 2.5 : size;
    canvasCtx.beginPath();
    canvasCtx.moveTo(lastPoint.x, lastPoint.y);
    canvasCtx.lineTo(p.x, p.y);
    canvasCtx.stroke();
    lastPoint = p;
  };
  const stopDraw = () => {
    if(drawing){
      drawing = false;
      savePrototypeCanvas(false);
    }
  };

  canvas.onmousedown = startDraw;
  canvas.onmousemove = moveDraw;
  window.onmouseup = stopDraw;
  canvas.ontouchstart = startDraw;
  canvas.ontouchmove = moveDraw;
  canvas.ontouchend = stopDraw;
}

function savePrototypeCanvas(showAlert=true){
  const canvas = document.getElementById("prototypeCanvas");
  if(!canvas) return;
  state.answers.prototypeCanvas = canvas.toDataURL("image/png");
  save();
  if(showAlert) alert("Prototype drawing saved.");
}

function clearPrototypeCanvas(){
  const canvas = document.getElementById("prototypeCanvas");
  if(!canvas || !confirm("Clear your drawing?")) return;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  state.answers.prototypeCanvas = canvas.toDataURL("image/png");
  save();
}

function uploadPrototypePhoto(event){
  const file = event.target.files && event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.answers.prototypePhoto = reader.result;
    save();
    renderStudio();
  };
  reader.readAsDataURL(file);
}

function downloadPrototypeImage(){
  const canvas = document.getElementById("prototypeCanvas");
  if(!canvas) return;
  savePrototypeCanvas(false);
  const link = document.createElement("a");
  link.download = "owls-opus-prototype-sketch.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

render();
async function googleRequest(payload){
  const response = await fetch(GOOGLE_SAVE_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return await response.json();
}

async function loginToGoogleSave(){
  const firstName = prompt("First name:");
  const lastInitial = prompt("Last initial:");
  const period = prompt("Class period, example: Period 2");
  const pin = prompt("Create or enter your 4-digit PIN:");

  if (!firstName || !lastInitial || !period || !pin) {
    alert("Please enter all login information.");
    return;
  }

  const result = await googleRequest({
    action: "login",
    firstName,
    lastInitial,
    period,
    pin,
    projectData: state
  });

  if (!result.success) {
    alert(result.message || "Login failed.");
    return;
  }

  currentProjectKey = result.projectKey;
  localStorage.setItem("owlProjectKey", currentProjectKey);

  if (result.exists && result.projectData) {
    state = result.projectData;
    alert("Your saved project loaded.");
  } else {
    alert("New project created.");
  }

  save();
  render();
}

async function saveToGoogleSheet(){
  if (!currentProjectKey) return;

  await googleRequest({
    action: "save",
    projectKey: currentProjectKey,
    inventionTitle: state.answers?.pitch1 || "Untitled Invention",
    projectData: state
  });
}

function logoutProject(){
  currentProjectKey = "";
  localStorage.removeItem("owlProjectKey");
  localStorage.removeItem(SESSION_KEY);
  location.reload();
}
