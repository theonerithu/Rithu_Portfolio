// * DN3008 Generative Art, Rithu Varman 2026
//  * Week 7 - Cybernetics & Emergence
//  * Steersman
// Stance: Exposure (After Haacke)
//  * This is a simulation of a simple ecosystem where agents move around and consume resources from the ground. The agents' behavior is influenced by the amount of resources available in their environment, leading to emergent patterns of movement and resource consumption. The system demonstrates how simple rules can lead to complex behaviors and interactions within an ecosystem.

const COLS = 90;   // the ground is a 90 x 90 grid
let res = [];      // how much resource is left in each square

function cellOf(a) {
  const cx = constrain(floor(a.x / width * COLS), 0, COLS - 1);
  const cy = constrain(floor(a.y / height * COLS), 0, COLS - 1);
  return cx + cy * COLS;
}

let gain = 5.0;
let agents = [];

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  for (let i = 0; i < COLS * COLS; i++) res.push(1);
  for (let i = 0; i < 200; i++) {
    agents.push({ x: random(width), y: random(height), a: random(TWO_PI), wealth: 0 });
  }
}

function draw() {
  const reading = sense(); // 1. Read back something the system produced
  update(reading); // 2. lLet that reading change what happens next
  render(); // 3. Draw it
}

function sense() {
  // How bright is the canvas under each agent?
  loadPixels();
  return agents.map((a) => pixels[4 * (floor(a.y) * width + floor(a.x))] / 255);
}

function update(reading) {
  agents.forEach(a => {
    const c = cellOf(a);
    const take = min(res[c], 0.02 * (1 + a.wealth * gain));   // the rich take more
    res[c] -= take;
    a.wealth += take;
    a.a += (1 - res[c]) * random(-1, 1);   // wander more where the ground is bare
    a.x = (a.x + cos(a.a) * 1.5 + width) % width;
    a.y = (a.y + sin(a.a) * 1.5 + height) % height;
  });
  for (let i = 0; i < res.length; i++) res[i] = min(1, res[i] + 0.0015);   // slow regrowth
}

function render() {
  background(20);
  noStroke();
  const s = width / COLS;
  for (let i = 0; i < res.length; i++) {
    fill(60, 110, 100, res[i] * 255);
    rect((i % COLS) * s, floor(i / COLS) * s, s, s);
  }
  fill(240, 170, 50, 180);
  agents.forEach(a => circle(a.x, a.y, min(30, 2 + sqrt(a.wealth) * 2)));
}