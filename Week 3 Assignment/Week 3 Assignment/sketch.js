/* DN3008 Generative Art, Rithu Varman 2026
 * Week 3 - Modulo
  Portals
  Played with layering and rotation to create a portal like effect with rectangles and a circle in the center. The rectangles are drawn in a way that they get closer and closer to the center of the canvas and the circle grows to the size of the window height and resets.
  This is really interesting to me as it looks like a breathing living portal to another dimension and theres a vague sense of movement with no discernable direction and it just keeps getting more confusing the more you look at it and the longer it
*/

j = 0;

function setup() { 
    createCanvas(windowWidth, windowHeight);
    frameRate(120);
    //creates a canvas the size of the window and settinng framerate to 120 the speed twice normal
}

function draw() {
    bg = 0; //sets the variable "bg" to 0
    background(bg,10); //draws the background translucent black on every cycle so it fades out old rectangles 
    translate(windowWidth/2, windowHeight/2); //sets the drawing point to the center of the canvas
    i = frameCount; 
    while (i-- > 1) { 
        // noStroke()
        fill(random(50),0,random(255));
        rect(j++ % i, j % i, 5, i/20 % 20); 
        rotate(0.05) 
    }; //draws rectangles that increse in height from 0 to 20 and repeats and draws them closer and closer to the center starting from further away each time
    fill(0, 50); //sets the fill to tranlucent black
    circle(0, 0, frameCount%windowHeight); //draws a circle using the translucent black fron the center that grows to the size of the window height and resets
}
