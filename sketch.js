/*
Week 4 Side Quest: JSON Level Generation
Course: GBDA302
Date: Feb. 5, 2026

PURPOSE: Generate levels using JSON data with loops to dynamically place tiles.
Bonus: Automatic level progression when goal is reached.
*/

const TS = 40; // Tile Size: 40x40 pixels per grid cell

let data; // Raw JSON data from levels.json
let levelIndex = 0; // Current level index
let level; // Current Level instance

/*
TILE LEGEND:
0 = empty/floor (light beige)
1 = wall (dark gray)
2 = goal (green - reach this to win)
*/

// Level class handles grid data and rendering
class Level {
  constructor(levelData, tileSize) {
    this.name = levelData.name;
    this.grid = levelData.grid;
    this.ts = tileSize;
  }

  cols() {
    return this.grid[0].length;
  }

  rows() {
    return this.grid.length;
  }

  pixelWidth() {
    return this.cols() * this.ts;
  }

  pixelHeight() {
    return this.rows() * this.ts;
  }

  // Check if tile at grid position is a wall
  isWall(r, c) {
    if (r < 0 || r >= this.rows() || c < 0 || c >= this.cols()) {
      return true; // Out of bounds = wall
    }
    return this.grid[r][c] === 1;
  }

  // Check if tile at grid position is the goal
  isGoal(r, c) {
    if (r < 0 || r >= this.rows() || c < 0 || c >= this.cols()) {
      return false;
    }
    return this.grid[r][c] === 2;
  }

  // Draw the entire level using loops
  draw() {
    // Nested loops to iterate through each tile
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        const tileValue = this.grid[r][c];

        // Set color based on tile type
        if (tileValue === 1) {
          fill(60, 60, 70); // Wall - dark gray
        } else if (tileValue === 2) {
          fill(100, 200, 100); // Goal - green
        } else {
          fill(240, 235, 220); // Floor - light beige
        }

        // Convert grid coordinates to pixel coordinates
        const x = c * this.ts;
        const y = r * this.ts;

        // Draw the tile
        rect(x, y, this.ts, this.ts);
      }
    }
  }
}

// Player class for simple grid-based movement
class Player {
  constructor() {
    this.gridX = 1;
    this.gridY = 1;
  }

  // Set starting position from level
  setPosition(x, y) {
    this.gridX = x;
    this.gridY = y;
  }

  // Move player if the target tile is not a wall
  move(dx, dy, level) {
    const newX = this.gridX + dx;
    const newY = this.gridY + dy;

    if (!level.isWall(newY, newX)) {
      this.gridX = newX;
      this.gridY = newY;

      // Check if reached goal (bonus feature)
      if (level.isGoal(newY, newX)) {
        this.reachGoal();
      }
    }
  }

  // Handle reaching the goal
  reachGoal() {
    // Automatically load next level (bonus feature)
    const nextIndex = (levelIndex + 1) % data.levels.length;
    loadLevel(nextIndex);
  }

  // Draw player as a circle
  draw() {
    fill(80, 120, 200); // Blue player
    const centerX = this.gridX * TS + TS / 2;
    const centerY = this.gridY * TS + TS / 2;
    ellipse(centerX, centerY, TS * 0.6, TS * 0.6);
  }
}

let player; // Player instance

// Preload JSON data before setup
function preload() {
  data = loadJSON("levels.json");
}

function setup() {
  player = new Player();
  loadLevel(0); // Load first level

  noStroke();
  textFont("sans-serif");
  textSize(16);
}

function draw() {
  background(240);

  // Draw level
  level.draw();

  // Draw player
  player.draw();

  // UI instructions with background for better visibility
  // Draw semi-transparent background for text
  fill(255, 255, 255, 200); // White with transparency
  noStroke();
  rect(5, 5, 470, 45, 5); // Rounded rectangle background
  
  // Draw text on top
  fill(0);
  textSize(16);
  text(`Level: ${level.name}`, 10, 24);
  text("Arrow keys to move • Reach green to advance", 10, 44);
}

// Handle keyboard input for player movement
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1, 0, level);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1, 0, level);
  } else if (keyCode === UP_ARROW) {
    player.move(0, -1, level);
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 1, level);
  }
}

// Load a level by index
function loadLevel(i) {
  levelIndex = i;
  level = new Level(data.levels[levelIndex], TS);

  // Resize canvas to fit level
  resizeCanvas(level.pixelWidth(), level.pixelHeight());

  // Reset player position to level start
  const startPos = data.levels[levelIndex].start || { x: 1, y: 1 };
  player.setPosition(startPos.x, startPos.y);
}
