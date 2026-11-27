/* DN3008 Generative Art, Rithu Varman 2026
 * Week 9 - Fractals & Recursion 
  *Night Tree
  Added two functions, drawSunDownUp() and drawDay() to simulate sunrise and sunset. The sun moves up and down, while a blue box overlays the background to simulate daytime. The tree blooms and shrinks with the sun's movement, creating a dynamic and visually appealing scene. The tree's branches sway gently in the wind, adding to the realism of the scene.
  This tree is inspired by the flowers that only bloom at night, such as the Night-blooming Cereus. This tree itself blooms and shrinks with the sun's movement, creating a dynamic and visually appealing scene. This is meant to almost look like a timelapse of the tree in its habitat but less jerky and more fluid.
*/

const DEPTH = 11;
let seed = 9;
let sky;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  sky = createGraphics(width, height);
  paintSky(sky);
}

function draw() {  
  image(sky, 0, 0);
  randomSeed(seed);   
  drawDay()
  drawSunDownUp()

  const wave = -cos(frameCount * 0.015); // creates a wave that oscillates between -1 and 1,
  const angle = map(wave, -1, 1, 0.15, 0.75); //maps the wave to range of angles for branches

  push();
  translate(width / 2, height - 90);
  branch(135, DEPTH, angle);
  pop();

  noStroke();
  fill(250, 45, 12);
  ellipse(width / 2, height + 40, width * 1.6, 300);
}

function branch(len, depth, angle) {
  const t = 1 - depth / DEPTH;                    // NEW: 0 at the trunk, 1 at the tips
  const bark = color(20, 45, 22);                 // NEW: dark brown
  const twig = color(330, 35, 70);                // NEW: dusty pink
  stroke(lerpColor(bark, twig, pow(t, 1.6)));     
  strokeWeight(map(depth, 0, DEPTH, 0.6, 16));    
  strokeCap(ROUND);                               // NEW: smooth joints
  line(0, 0, 0, -len);
  translate(0, -len);
  if (depth === 0){                              
   blossom();                                   
   return;
}

  const wind = (noise(depth * 0.3, frameCount * 0.008) - 0.8) * 0.5 * t;
  const a1 = angle + random(-0.15, 0.15) + wind;         // wobble the right angle
  const a2 = -angle + random(-0.15, 0.15) + wind;

  push();                                
  rotate(a1);                         // turn right
  branch(len * random(0.66, 0.78), depth - 1, angle);
  pop();                                 
 
  push();                              
  rotate(a2);                        // turn left
  branch(len * random(0.66, 0.78), depth - 1, angle);  
  pop();
}

function blossom() {
  fill(random(320, 360) % 360, 45, 100, 55);      // pinks, slightly see-through
  circle(0, 0, random(5, 11));                    // (0, 0) is the branch tip
}

//Draws a sun that moves up and down to simulate sunrise and sunset.
function drawSunDownUp() {
  const sunX = width * 0.78;
  const centerY = 500;
  const travelRange = 350;
  const speed = 0.03;

  const sunY = centerY - cos(frameCount * speed) * travelRange;

  push();
  noStroke();
  fill(40, 20, 100, 95);
  circle(sunX, sunY, 70);
  pop();
}

//Draws a blue box over background to simulate daytime.
function drawDay() {
  const speed = 0.015;
  const wave = -cos(frameCount * speed); // -1 to 1
  const alpha = map(wave, -1, 1, 50, 0); // 50 (blue) to 0 (transparent)

  push();
  noStroke();
  fill(220, 80, 100, alpha);
  square(0, 0, 800);
  pop();
}

// --- given: the dusk sky (you don't need to change this) ---
function paintSky(g) {
  g.colorMode(HSB, 360, 100, 100, 100);
  g.noStroke();
  for (let y = 0; y < g.height; y++) {
    const t = y / g.height;
    g.fill(lerpColor(color(250, 60, 14), color(15, 55, 75), pow(t, 1.8)));
    g.rect(0, y, g.width, 1);
  }
  randomSeed(3);
  for (let i = 0; i < 140; i++) {
    g.fill(0, 0, 100, random(20, 80));
    g.circle(random(g.width), random(g.height * 0.55), random(0.8, 2.2));
  }
  // g.fill(40, 20, 100, 90);
  // g.circle(g.width * 0.78, g.height * 0.24, 70);
}

function keyPressed() {
  if (key === "r" || key === "R") seed = floor(random(100000));
  if (key === "s" || key === "S") saveCanvas("living-tree", "png");
}
