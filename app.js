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

const APP_VERSION = "v9";
const SESSION_KEY = "currentInventorSession_v3";
const steps = ["home","drawProblem","drawPower","drawInspiration","cards","problem","power","inspiration","mashup","whatif","originality","science","pitch","studio","summary","inventorWall"];
let state = JSON.parse(localStorage.getItem(SESSION_KEY) || localStorage.getItem("currentInventorSession_v2") || "null") || {
  step:0, student:{name:"", period:"", teacher:""}, problem:null, power:null, inspiration:null, answers:{}, sidekick:{}, notebook:{}, badges:[]
};

const app = document.getElementById("app");

function save(){ localStorage.setItem(SESSION_KEY, JSON.stringify(state)); }
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
  home:["Start","Student Info"],
  drawProblem:["Problem Patrol","Draw problem"],
  drawPower:["Power-Up","Draw power"],
  drawInspiration:["Inspiration","Draw inspiration"],
  cards:["Design Table","Draw/switch cards"],
  problem:["Spot Problem","Explain problem"],
  power:["Pair Power-Up","Connect feature"],
  inspiration:["Remix Inspiration","Learn & remix"],
  mashup:["Mash-Up","Brainstorm ideas"],
  whatif:["What If","Stretch thinking"],
  originality:["Originality","Google search"],
  science:["Science Coach","Explain science"],
  pitch:["Pitch","Explain idea"],
  studio:["Prototype Studio","Draw/upload"],
  summary:["Summary","Submit/print"], inventorWall:["Inventor Wall","Class ideas"]
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
  return `<div class="progress-menu no-print">
    <h3>🧭 Inventor Lab Menu</h3>
    <div class="menu-grid">
      ${steps.map((s,i)=>{
        const labels = stepLabels[s] || [s,""];
        const locked = !canVisitStep(i);
        const active = i === state.step;
        const done = stepIsDone(s);
        return `<button class="menu-item ${active?'active':''} ${done?'done':''} ${locked?'locked':''}" onclick="jumpToStep(${i})" ${locked?'disabled':''}>
          ${done?'✓ ':''}${labels[0]}<small>${labels[1]}</small>
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

function shell(content){
  app.innerHTML = `<div class="app">
    <div class="topbar no-print">
      <div class="brand">
        <div class="owl">🦉</div>
        <div><h1>Owl's Opus Inventor Lab <span class="version-chip">v9</span></h1><p>S.P.A.R.K. Inventor Cycle: Spot • Pair • Ask • Refine • Kickstart</p></div>
      </div>
      <div class="nav">
        <button class="btn secondary" onclick="goHome()">Home</button>
        <button class="btn purple" onclick="teacherLogin()">Teacher Hub</button><button class="btn green" onclick="openInventorWall()">Inventor Wall</button><button id="installAppButton" class="btn green" onclick="installInventorLab()">Install App</button>
      </div>
    </div>
    ${renderProgressMenu()}
    ${content}
    <div class="footer no-print">
      <button class="btn secondary ${state.step===0?'hidden':''}" onclick="back()">Back</button>
      ${selectionSwitchButton()}
      <button class="btn" id="nextButton" onclick="nextAction()">${nextLabel()}</button>
    </div>
  </div>`;
  bindAutosaveInputs();
}

function selectionSwitchButton(){
  const s=steps[state.step];
  if(s==="drawProblem" && state.problem) return `<button class="btn red" onclick="switchCard('problem')">Switch Problem Card</button>`;
  if(s==="drawPower" && state.power) return `<button class="btn red" onclick="switchCard('power')">Switch Power-Up Card</button>`;
  if(s==="drawInspiration" && state.inspiration) return `<button class="btn red" onclick="switchCard('inspiration')">Switch Inspiration Card</button>`;
  return `<button class="btn secondary ${state.step===0?'hidden':''}" onclick="startOver()">Start Over</button>`;
}

function nextLabel(){
  const name = steps[state.step];
  if(name==="home") return "Start Card Challenge";
  if(name==="drawProblem") return state.problem ? "Keep Problem Card" : "Randomly Select Problem Card";
  if(name==="drawPower") return state.power ? "Keep Power-Up Card" : "Randomly Select Power-Up Card";
  if(name==="drawInspiration") return state.inspiration ? "Keep Inspiration Card" : "Randomly Select Inspiration Card";
  if(name==="cards") return "Begin Brainstorming";
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
    const evidence=document.getElementById("searchEvidence")?.value.trim() || "";
    const different=document.getElementById("originality_text")?.value.trim() || "";
    if(evidence.length < 12 || different.length < 12) return "Complete your Google search notes and explain how your idea will be different before moving on.";
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
  state.problem = drawFromDeck("problem", state.problem);
  state.power = drawFromDeck("power", state.power);
  state.inspiration = drawFromDeck("inspiration", state.inspiration);
  save();
  state.step = steps.indexOf("cards");
  state.rowlieChat = state.rowlieChat || {};
  state.rowlieChat.cards = [{role:"rowlie", text: rowlieCardReaction()}];
  render();
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
  state.problem = drawFromDeck("problem", state.problem);
  state.power = drawFromDeck("power", state.power);
  state.inspiration = drawFromDeck("inspiration", state.inspiration);
  state.inspirationFeeling = 3;
  state.rowlieChat = state.rowlieChat || {};
  state.rowlieChat.cards = [
    {role:"rowlie", text: rowlieCardReaction()}
  ];
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

function askRowlie(topic){
  state.rowlieChat = state.rowlieChat || {};
  const page = steps[state.step] || "general";
  const key = page;
  const list = rowliePromptBank(topic);
  const q = list[Math.floor(Math.random()*list.length)];
  state.rowlieChat[key] = state.rowlieChat[key] || [];
  state.rowlieChat[key].push({role:"rowlie", text:q});
  save();
  render();
}

function addStudentChat(page, text){
  state.rowlieChat = state.rowlieChat || {};
  state.rowlieChat[page] = state.rowlieChat[page] || [];
  if(text && text.trim().length){
    state.rowlieChat[page].push({role:"student", text:text.trim()});
  }
}

function rowlieHelperPanel(page){
  state.rowlieChat = state.rowlieChat || {};
  state.rowlieChat[page] = state.rowlieChat[page] || [{role:"rowlie", text:"I'm Rowlie. I won't invent for you, but I can help you think deeper. What do you want help with?"}];
  return `<div class="rowlie-chat">
    <h3>🦉 Rowlie AI Helper</h3>
    ${state.rowlieChat[page].slice(-5).map(m=>`<div class="chat-bubble ${m.role}">${esc(m.text)}</div>`).join("")}
    <textarea id="rowlieReply" placeholder="Reply to Rowlie or add your thinking here..."></textarea>
    <div class="chat-controls">
      <button class="btn purple" onclick="sendRowlieReply('${page}')">Send to Rowlie</button>
      <button class="btn secondary" onclick="askRowlie('problem')">Problem</button>
      <button class="btn secondary" onclick="askRowlie('user')">User</button>
      <button class="btn secondary" onclick="askRowlie('science')">Science</button>
      <button class="btn secondary" onclick="askRowlie('originality')">Originality</button>
      <button class="btn secondary" onclick="askRowlie('prototype')">Prototype</button>
      <button class="btn red" onclick="askRowlie('stuck')">I'm stuck</button>
    </div>
  </div>`;
}

function sendRowlieReply(page){
  const el = document.getElementById("rowlieReply");
  const text = el ? el.value : "";
  addStudentChat(page, text);
  if(text.trim().length){
    const lower = text.toLowerCase();
    let topic = "stuck";
    if(lower.includes("science") || lower.includes("force") || lower.includes("energy")) topic = "science";
    else if(lower.includes("different") || lower.includes("original")) topic = "originality";
    else if(lower.includes("build") || lower.includes("prototype") || lower.includes("material")) topic = "prototype";
    else if(lower.includes("who") || lower.includes("people") || lower.includes("student")) topic = "user";
    else if(lower.includes("problem") || lower.includes("annoy")) topic = "problem";
    const follow = rowliePromptBank(topic)[Math.floor(Math.random()*rowliePromptBank(topic).length)];
    state.rowlieChat[page].push({role:"rowlie", text: follow});
  }
  save();
  render();
}

function setInspirationFeeling(value){
  state.inspirationFeeling = Number(value);
  save();
}

function notFeelingIt(){
  state.inspirationFeeling = 1;
  state.rowlieChat = state.rowlieChat || {};
  state.rowlieChat.cards = state.rowlieChat.cards || [];
  state.rowlieChat.cards.push({role:"rowlie", text:"Not feeling it yet? That's normal. Try switching one card first, or deal a whole new hand if the whole set feels stuck."});
  save();
  render();
}

function publishToInventorWall(){
  saveInputs();
  updateNotebook();
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  const item = {
    id: Date.now(),
    student: state.student,
    problem: getCardTitle(state.problem),
    power: getCardTitle(state.power),
    inspiration: getCardTitle(state.inspiration),
    pitch: state.answers.pitch1 || state.answers.mashupIdeas || "Idea in progress",
    science: state.answers.science_text || "",
    prototype: state.answers.prototypeSketch || "",
    badges: state.badges || [],
    likes: 0,
    submittedAt: new Date().toLocaleString()
  };
  wall.push(item);
  localStorage.setItem("inventorWall", JSON.stringify(wall));
  alert("Published to the Inventor Wall on this device.");
}

function likeWallIdea(id){
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  const item = wall.find(x => x.id === id);
  if(item) item.likes = (item.likes || 0) + 1;
  localStorage.setItem("inventorWall", JSON.stringify(wall));
  renderInventorWall();
}

function renderInventorWall(){
  const wall = JSON.parse(localStorage.getItem("inventorWall") || "[]");
  shell(`<section class="panel">
    <h2 style="font-size:38px;margin-top:0">🌟 Inventor Wall</h2>
    <p class="callout">Celebrate invention ideas. Use this wall to notice creative thinking, not to copy.</p>
    <div class="wall-grid">
      ${wall.map(item=>`<div class="wall-card">
        <h3>${esc(item.pitch).slice(0,70)}${esc(item.pitch).length>70?"...":""}</h3>
        <div class="wall-meta"><b>${esc(item.student?.name || "Inventor")}</b> • ${esc(item.student?.period || "")} • ${esc(item.submittedAt || "")}</div>
        <p><b>Problem:</b> ${esc(item.problem)}</p>
        <p><b>Power-Up:</b> ${esc(item.power)}</p>
        <p><b>Inspiration:</b> ${esc(item.inspiration)}</p>
        <p><b>Science:</b> ${esc(item.science || "Not added yet.")}</p>
        <p>${(item.badges||[]).map(b=>`<span class="badge">${esc(b)}</span>`).join("")}</p>
        <button class="btn secondary" onclick="likeWallIdea(${item.id})">❤️ Inspired Me</button>
        <span class="wall-like">${item.likes||0} inspired</span>
      </div>`).join("") || `<div class="wall-card"><h3>No ideas yet</h3><p>Publish from the Summary page to add projects here.</p></div>`}
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

function renderHome(){
  shell(`<section class="panel hero">
    <div class="hero-inner">
      <h2>Welcome, Inventor!</h2>
      <p>Randomly draw one card from each deck, then answer guided questions to build an original invention idea.</p>
      <div class="callout">AI is not here to invent for you. The owl helps you ask better questions so <b>you</b> can create the solution.</div>
      <div class="student-form">
        <div class="field"><label>Student Name</label><input id="studentName" value="${esc(state.student.name)}" placeholder="Name"></div>
        <div class="field"><label>Class Period</label><select id="studentPeriod"><option value="">Choose period</option>${PERIODS.map(p=>`<option ${state.student.period===p?'selected':''}>${p}</option>`).join("")}</select></div>
        <div class="field"><label>Teacher</label><select id="studentTeacher"><option value="">Choose teacher</option>${TEACHERS.map(t=>`<option ${state.student.teacher===t?'selected':''}>${t}</option>`).join("")}</select></div>
      </div>
      <div class="spark">
        <div><b>S</b>Spot Problem</div><div><b>P</b>Pair Power-Up</div><div><b>A</b>Ask Questions</div><div><b>R</b>Refine Idea</div><div><b>K</b>Kickstart Prototype</div>
      </div>
    </div>
  </section>`);
}
function renderDrawProblem(){
  shell(`<section class="panel deck-stage">
    <div class="deck-reference"><img src="assets/deck1_problem_patrol.png" alt="Problem Patrol deck"></div>
    <div class="draw-area">
      <h2>Deck 1: Problem Patrol</h2>
      <p>Randomly select a real-world problem to solve.</p>
      ${state.problem ? card("problem","DECK 1: PROBLEM PATROL",state.problem[0],state.problem[1],"This is the problem your invention will try to solve.") : `<div class="callout">Tap the button below to draw your Problem Patrol card.</div>`}
    </div>
  </section>`);
}

function renderDrawPower(){
  shell(`<section class="panel deck-stage">
    <div class="deck-reference"><img src="assets/deck2_powerup_cards.png" alt="Power-Up deck"></div>
    <div class="draw-area">
      <h2>Deck 2: Power-Up Cards</h2>
      <p>Randomly select a feature, material, or technology to add.</p>
      ${state.power ? card("power","DECK 2: POWER-UP",state.power[0],state.power[1],state.power[2]) : `<div class="callout">Tap the button below to draw your Power-Up card.</div>`}
    </div>
  </section>`);
}

function renderDrawInspiration(){
  shell(`<section class="panel deck-stage">
    <div class="deck-reference"><img src="assets/deck3_inspiration_cards.png" alt="Inspiration deck"></div>
    <div class="draw-area">
      <h2>Deck 3: Inventor Hall of Fame</h2>
      <p>Randomly select a young inventor exhibit to inspire your thinking.</p>
      ${state.inspiration ? card("inspiration","DECK 3: HALL OF FAME",state.inspiration.icon,state.inspiration.invention,`<b>Inventor:</b> ${state.inspiration.inventor}<br><b>What it does:</b> ${state.inspiration.what}<br><b>Science:</b> ${state.inspiration.science}`) : `<div class="callout">Tap the button below to draw your Inspiration card.</div>`}
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
  shell(`<section class="panel">
    <h2 style="font-size:38px;margin-top:0">Owl's Opus Design Table</h2>
    <p class="callout">Draw one card from each deck. Keep the set, switch one card, or deal a whole new hand.</p>
    <div class="design-table">
      ${state.problem ? card("problem","DECK 1: PROBLEM PATROL",state.problem[0],state.problem[1],`<span class="deck-count">${remainingCount("problem")} cards left before reshuffle</span>`) : card("problem","DECK 1: PROBLEM PATROL","🎴","Problem Patrol","Draw a problem card.")}
      ${state.power ? card("power","DECK 2: POWER-UP",state.power[0],state.power[1],`${state.power[2]}<br><span class="deck-count">${remainingCount("power")} cards left before reshuffle</span>`) : card("power","DECK 2: POWER-UP","⚡","Power-Up","Draw a power-up card.")}
      ${state.inspiration ? card("inspiration","DECK 3: HALL OF FAME",state.inspiration.icon,state.inspiration.invention,`<b>Inventor:</b> ${state.inspiration.inventor}<br><b>Science:</b> ${state.inspiration.science}<br><span class="deck-count">${remainingCount("inspiration")} cards left before reshuffle</span>`) : card("inspiration","DECK 3: HALL OF FAME","🏛","Inventor Hall of Fame","Draw an inventor exhibit.")}
    </div>
    <div class="inspiration-slider">
      <b>How inspired do you feel by this combination?</b>
      <input type="range" min="1" max="5" value="${state.inspirationFeeling || 3}" onchange="setInspirationFeeling(this.value)">
      <div>😕 Not yet &nbsp;&nbsp; 🤔 Maybe &nbsp;&nbsp; 😃 I have an idea!</div>
    </div>
    ${rowlieHelperPanel("cards")}
    <div class="design-actions no-print">
      <button class="btn purple" onclick="drawAllThree()">🎲 Draw All Three</button>
      <button class="btn purple" onclick="dealNewHand()">🎲 Deal Me a Whole New Hand</button>
      <button class="btn red" onclick="switchCard('problem')">Switch Problem</button>
      <button class="btn red" onclick="switchCard('power')">Switch Power-Up</button>
      <button class="btn red" onclick="switchCard('inspiration')">Switch Hall of Fame</button>
      <button class="btn secondary" onclick="notFeelingIt()">😕 Not Feeling It</button>
      <button class="btn green" onclick="keepAllThree()">❤️ Keep This Set</button>
    </div>
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
  if(!state.sidekick[step]) state.sidekick[step] = prompts[0] || "What else could you try?";
  const current = state.sidekick[step];
  const textKeyMap={problem:"problemWhy_text",power:"powerHow_text",inspiration:"inspirationLearn_text",mashup:"mashupIdeas",whatif:"whatIf",originality:"originality_text",science:"science_text",pitch:"pitch1"};
  const currentText=state.answers[textKeyMap[step]]||"";
  const fb=coachFeedback(currentText);
  return `<div class="coach-panel">
    <h3>🦉 Rowlie Coach Panel</h3>
    <p><b>Rowlie is wondering:</b> ${current}</p>
    ${meterFor(currentText)}
    <div class="feedback ${fb[0]}">${fb[1]}</div>
    <div class="coach-buttons">
      <button class="btn purple" onclick="newCoachQuestion('${step}')">Coach Me More</button>
      <button class="btn secondary" onclick="sentenceStarter('${step}')">Matching Sentence Starter</button>
      <button class="btn blue" onclick="showStrongExample('${step}')">Show Strong Thinking</button>
    </div>
  </div>`;
}
function renderQuestion(title,prompt,key,choices,sidekickPrompts=[]){
  shell(`<section class="panel question">
    <h2>${title}</h2>
    <div class="prompt">${prompt}</div>
    ${coachPanel(key==="problemWhy"?"problem":key==="powerHow"?"power":key, sidekickPrompts)}
    <div class="choices">
      ${choices.map(c=>`<div class="choice ${(state.answers[key]||[]).includes(c)?'selected':''}" onclick="toggleChoice('${key}', '${esc(c)}', this)">${c}</div>`).join("")}
    </div>
    <textarea id="${key}_text" placeholder="Explain your thinking in at least one complete sentence...">${esc(state.answers[key+"_text"]||"")}</textarea>
  </section>`);
}

function renderInspiration(){
  const i = state.inspiration;
  shell(`<section class="panel">
    <h2 style="font-size:38px;margin-top:0">Learn from Inspiration</h2>
    <div class="inspiration-detail">
      ${card("inspiration","DECK 3: HALL OF FAME",i.icon,i.invention,`<b>Young inventor:</b> ${i.inventor}`)}
      <div>
        <div class="info-box"><h3>What problem did it solve?</h3><p>${i.problem}</p></div>
        <div class="info-box"><h3>What does the invention do?</h3><p>${i.what}</p></div>
        <div class="info-box"><h3>The science behind it</h3><p>${i.science}</p></div>
        <div class="info-box"><h3>Inventor Thinking</h3><p>${i.think}</p></div>
        ${coachPanel("inspiration",["What did this inventor notice first?","How did science help solve the problem?","What can you borrow as a thinking move, not as an invention?","Who benefited from this invention?"])}
        <div class="prompt">What can you learn from this invention? How can you REMIX part of its thinking into your own invention without copying it?</div>
        <textarea oninput="liveSave()" id="inspirationLearn_text" placeholder="I can remix this invention by...">${esc(state.answers.inspirationLearn_text||"")}</textarea>
      </div>
    </div>
  </section>`);
}

function renderTextQuestion(title,prompt,key,sidekickPrompts=[]){
  shell(`<section class="panel question">
    <h2>${title}</h2>
    <div class="prompt">${prompt}</div>
    ${coachPanel(key==="mashupIdeas"?"mashup":"whatif", sidekickPrompts)}
    <textarea id="${key}" placeholder="Type your ideas here in at least one complete sentence...">${esc(state.answers[key]||"")}</textarea>
  </section>`);
}

function renderOriginality(){
  shell(`<section class="panel question">
    <h2>Originality Coach</h2>
    <div class="prompt">Inventors research before they build. Do a quick Google search to see if something similar already exists.</div>
    ${coachPanel("originality",["Try searching the problem + your power-up + the word invention.","Look for products, patents, videos, or science fair projects.","If something exists, ask: How could mine be different?","Different can mean smaller, safer, cheaper, greener, or easier to use."])}
    <div class="search-box">
      <h3>Step 1: Search your idea</h3>
      <div class="search-row">
        <div class="field"><label>Search terms</label><input id="searchTerms" value="${esc(state.answers.searchTerms || `${state.problem[1]} ${state.power[1]} invention`)}"></div>
        <button class="btn purple" onclick="openGoogleSearch()">Open Google Search</button>
      </div>
      <p class="small-note">A new tab will open. Search for similar products, patents, or inventions. Then come back and write what you found.</p>
    </div>
    <div class="choices">
      ${["Yes, something similar exists","Kind of / partly exists","No, I did not find anything similar","I need more research"].map(c=>`<div class="choice ${(state.answers.similarExists||[]).includes(c)?'selected':''}" onclick="toggleChoice('similarExists', '${esc(c)}', this)">${c}</div>`).join("")}
    </div>
    <p><b>Step 2: What did you find?</b></p>
    <textarea oninput="liveSave()" id="searchEvidence" placeholder="List websites, products, keywords, or notes from your search.">${esc(state.answers.searchEvidence||"")}</textarea>
    <p><b>Step 3: How will your invention be different?</b></p>
    <textarea oninput="liveSave()" id="originality_text" placeholder="Smaller? Safer? Cheaper? Greener? Easier to use? Helps a different group?">${esc(state.answers.originality_text||"")}</textarea>
  </section>`);
}

function renderPitch(){
  shell(`<section class="panel question">
    <h2>Kickstart Your Prototype</h2>
    <div class="prompt">Write your first elevator pitch.</div>
    ${coachPanel("pitch",["Start with the problem, then explain your solution.","What is the most important feature?","Who would use it first?","What science makes it work?"])}
    <p><b>My invention solves...</b></p><textarea oninput="liveSave()" id="pitch1">${esc(state.answers.pitch1||"")}</textarea>
    <p><b>People need this because...</b></p><textarea oninput="liveSave()" id="pitch2">${esc(state.answers.pitch2||"")}</textarea>
    <p><b>The science behind it is...</b></p><textarea oninput="liveSave()" id="pitch3">${esc(state.answers.pitch3||"")}</textarea>
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
  if(state.notebook.problem) state.badges.push("👀 Problem Spotter");
  if(state.notebook.user) state.badges.push("❤️ Empathy Builder");
  if(state.notebook.remix) state.badges.push("♻️ Creative Remixer");
  if(state.notebook.science) state.badges.push("🔬 Science Thinker");
  if(state.notebook.prototype) state.badges.push("🛠 Prototype Planner");
}
function note(title,text){return `<div class="note-item"><b>${title}</b><br>${esc(text||"Not added yet.")}</div>`;}
function addCanvasStarter(t){const el=document.getElementById("prototypeSketch"); if(el){el.value=el.value?el.value+"\n"+t:t; liveSave(); el.focus();}}
function renderStudio(){
  updateNotebook();
  shell(`<section class="panel">
    <h2 style="font-size:38px;margin-top:0">Rowlie's Prototype Studio</h2>
    <div class="three-cards">
      ${card("problem","PROBLEM",state.problem[0],state.problem[1],"")}
      ${card("power","POWER-UP",state.power[0],state.power[1],"")}
      ${card("inspiration","INSPIRATION",state.inspiration.icon,state.inspiration.invention,"")}
    </div>
    <br>
    <div class="studio">
      <div class="notebook">
        <h3>📒 Rowlie's Notebook</h3>
        ${note("Problem",state.notebook.problem)}
        ${note("Who it helps",state.notebook.user)}
        ${note("Power-Up",state.notebook.power)}
        ${note("Remix",state.notebook.remix)}
        ${note("Originality",state.notebook.originality)}
        ${note("Science",state.notebook.science)}
        <h3>Badges</h3>
        ${state.badges.map(b=>`<span class="badge">${b}</span>`).join("")}
      </div>

      <div class="prototype-board">
        <h3>✏️ Prototype Canvas</h3>
        <p class="prototype-note">Draw with your finger, Apple Pencil, or mouse. You can also upload a photo of a paper sketch or prototype and label it.</p>
        <div class="prototype-toolbar no-print">
          <button class="btn secondary" onclick="setTool('pen')">✏️ Pen</button>
          <button class="btn secondary" onclick="setTool('eraser')">🧽 Eraser</button>
          <button class="btn secondary" onclick="clearPrototypeCanvas()">Clear</button>
          <button class="btn purple" onclick="savePrototypeCanvas()">Save Drawing</button>
          <label>Color <input type="color" id="drawColor" value="#171717"></label>
          <label>Size <input type="range" id="drawSize" min="2" max="24" value="5"></label>
        </div>
        <div class="prototype-toolbar no-print">
          <input type="file" id="photoUpload" accept="image/*" onchange="uploadPrototypePhoto(event)">
          <button class="btn blue" onclick="downloadPrototypeImage()">Download Image</button>
        </div>
        ${state.answers.prototypePhoto ? `<img class="photo-preview" src="${state.answers.prototypePhoto}" alt="Uploaded prototype photo">` : ""}
        <div class="canvas-wrap">
          <canvas id="prototypeCanvas" width="900" height="420"></canvas>
        </div>

        <p><b>Prototype Notes</b></p>
        <textarea id="prototypeSketch" oninput="liveSave()" placeholder="Describe your drawing or uploaded photo. Label the parts, materials, science, and how it works.">${esc(state.answers.prototypeSketch||"")}</textarea>
        <p><b>Testing Plan</b></p>
        <textarea id="testPlan" oninput="liveSave()" placeholder="How could you test if this prototype works? What data could you collect?">${esc(state.answers.testPlan||"")}</textarea>
      </div>

      <div class="prototype-side">
        <h3>🦉 Rowlie Coach</h3>
        <p>Earlier, you said: <b>${esc((state.notebook.problem||"your problem").slice(0,90))}</b></p>
        <p><b>Coach question:</b> Which part of your prototype actually solves that problem?</p>
        <div class="label-bank">
          ${["Part A","Material","Science","Input","Output","Energy","Safety","Test"].map(x=>`<span class="label-chip" onclick="addCanvasStarter('${x}:')">${x}</span>`).join("")}
        </div>
        <button class="btn purple" onclick="addCanvasStarter('Rowlie question: Which part might fail first?')">Add Rowlie Question</button>
        <p><b>Buildability Check</b></p>
        ${["Materials","Power/source","Size","Safety","Cost","Testing"].map(x=>`<span class="badge">${x}</span>`).join("")}
      </div>
    </div>
  </section>`);
  setTimeout(initPrototypeCanvas, 50);
}
function renderSummary(){
  updateNotebook();
  shell(`<section class="panel">
    <h2 style="font-size:38px;margin-top:0">🎉 Inventor Lab Brainstorm Sheet</h2>
    <div class="summary-grid">
      <div class="summary-box"><h3>Student</h3><p><b>Name:</b> ${esc(state.student.name)}<br><b>Period:</b> ${esc(state.student.period)}<br><b>Teacher:</b> ${esc(state.student.teacher)}</p></div>
      <div class="summary-box"><h3>Problem Card</h3><p>${state.problem[0]} ${state.problem[1]}</p></div>
      <div class="summary-box"><h3>Power-Up Card</h3><p>${state.power[0]} ${state.power[1]} — ${state.power[2]}</p></div>
      <div class="summary-box"><h3>Inspiration Card</h3><p><b>${state.inspiration.invention}</b><br>${state.inspiration.what}<br><b>Inventor:</b> ${state.inspiration.inventor}<br><b>Science:</b> ${state.inspiration.science}</p></div>
    </div>
    <h3>Brainstorming Notes</h3>
    <p><b>Problem:</b> ${esc(state.answers.problemWhy_text||"")}</p>
    <p><b>Power-Up:</b> ${esc(state.answers.powerHow_text||"")}</p>
    <p><b>Inspiration:</b> ${esc(state.answers.inspirationLearn_text||"")}</p>
    <p><b>Mash-Up Ideas:</b> ${esc(state.answers.mashupIdeas||"")}</p>
    <p><b>What If:</b> ${esc(state.answers.whatIf||"")}</p>
    <p><b>Originality Search:</b> ${esc(state.answers.searchEvidence||"")}</p>
    <p><b>How It Is Different:</b> ${esc(state.answers.originality_text||"")}</p>
    <p><b>Science:</b> ${esc(state.answers.science_text||"")}</p>
    <p><b>Pitch:</b> ${esc(state.answers.pitch1||"")} ${esc(state.answers.pitch2||"")} ${esc(state.answers.pitch3||"")}</p><p><b>Prototype:</b> ${esc(state.answers.prototypeSketch||"")}</p><p><b>Testing Plan:</b> ${esc(state.answers.testPlan||"")}</p><p><b>Badges:</b> ${state.badges.map(b=>`<span class="badge">${b}</span>`).join("")}</p>
    <button class="btn green no-print" onclick="submitResult()">Submit to Teacher Hub</button><button class="btn purple no-print" onclick="publishToInventorWall()">Publish to Inventor Wall</button>
    <button class="btn purple no-print" onclick="window.print()">Print / Save PDF</button>
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

function switchCard(type){state.cardsLocked=false;if(type==="problem")state.problem=drawFromDeck("problem", state.problem);if(type==="power")state.power=drawFromDeck("power", state.power);if(type==="inspiration")state.inspiration=drawFromDeck("inspiration", state.inspiration);state.rowlieChat=state.rowlieChat||{};state.rowlieChat.cards=state.rowlieChat.cards||[];state.rowlieChat.cards.push({role:"rowlie",text:rowlieCardReaction()});save();render()}

function back(){ saveInputs(); state.step = Math.max(0,state.step-1); save(); render(); }
function goHome(){ saveInputs(); state.step = 0; save(); render(); }
function startOver(){
  if(confirm("Start over with new random cards?")){
    state = {step:0, student:{name:"",period:"",teacher:""}, problem:null, power:null, inspiration:null, answers:{}, sidekick:{}, notebook:{}, badges:[], deckQueues:{problem:[],power:[],inspiration:[]}, deckHistory:{problem:[],power:[],inspiration:[]}, rowlieChat:{}, inspirationFeeling:3};
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
  app.innerHTML = `<div class="app">
    <div class="topbar no-print">
      <div class="brand"><div class="owl">🦉</div><div><h1>${esc(teacher)} Teacher Hub</h1><p>Loading student results...</p></div></div>
      <div class="nav"><button class="btn secondary" onclick="render()">Back to App</button></div>
    </div>
    <section class="panel"><h2>Loading...</h2></section>
  </div>`;

  const {source, results} = await getTeacherResults(teacher);
  app.innerHTML = `<div class="app">
    <div class="topbar no-print">
      <div class="brand"><div class="owl">🦉</div><div><h1>${esc(teacher)} Teacher Hub</h1><p>Password-protected student results dashboard</p></div></div>
      <div class="nav"><button class="btn secondary" onclick="render()">Back to App</button><button class="btn red" onclick="clearResults('${esc(teacher)}')">Clear Local Results</button></div>
    </div>
    <section class="panel">
      <h2 style="font-size:38px;margin-top:0">Student Results</h2>
      <div class="firebase-status">Data source: ${esc(source)} ${source==="Firestore" ? "✅ Shared dashboard connected." : "⚠️ Firebase config needed for a true shared dashboard."}</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Student</th><th>Cards</th><th>Idea / Pitch</th><th>Originality Search</th><th>Science / Prototype</th></tr></thead>
          <tbody>${results.map(r=>`<tr>
            <td><b>${esc(r.student?.name)}</b><br>${esc(r.student?.period)}<br>${esc(r.submittedAt || r.submittedAtISO || "")}</td>
            <td><b>Problem:</b> ${esc(r.problem?.[1])}<br><b>Power:</b> ${esc(r.power?.[1])}<br><b>Inspiration:</b> ${esc(r.inspiration?.invention)}</td>
            <td>${esc(r.answers?.pitch1 || r.answers?.mashupIdeas || "")}</td>
            <td><b>Terms:</b> ${esc(r.answers?.searchTerms || "")}<br><b>Evidence:</b> ${esc(r.answers?.searchEvidence || "")}<br><b>Different:</b> ${esc(r.answers?.originality_text || "")}</td>
            <td><b>Science:</b> ${esc(r.answers?.science_text || "")}<br><b>Prototype:</b> ${esc(r.answers?.prototypeSketch || "")}</td>
          </tr>`).join("") || `<tr><td colspan="5">No submissions yet for ${esc(teacher)}.</td></tr>`}</tbody>
        </table>
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
