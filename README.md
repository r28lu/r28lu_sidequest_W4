## Project Title

Week 4 Side Quest: JSON Level Generation

---

## Group Members

Rini Lu, r28lu, 21091404

---

## Description

This is a simple grid-based maze game that demonstrates dynamic level generation using JSON data and loops. The player (blue circle) navigates through multiple levels by moving with arrow keys to reach the green goal tile. 

The game uses nested for loops to dynamically place tiles (walls, floors, and goals) based on data loaded from a JSON file. Each level has different dimensions and layouts, demonstrating the flexibility of JSON-driven level design using the Level class pattern taught in Week 4.

**Bonus feature implemented:** The game automatically loads the next level when the player reaches the goal tile, creating a continuous gameplay experience across all three levels. The game cycles back to Level 1 after completing Level 3.

---

## Setup and Interaction Instructions

### Running the Game:
1. Open the GitHub Pages link in Google Chrome
2. The game will load automatically with Level 1

### Controls:
- **Arrow Keys** (↑ ↓ ← →): Move the player up, down, left, and right
- **Goal**: Reach the green tile to automatically advance to the next level

### Gameplay:
- Navigate through the maze without hitting walls (dark gray tiles)
- Move only on light beige floor tiles
- Find the path to the green goal tile in the bottom-right area
- Complete all 3 levels - the game will loop back to Level 1

---

## Iteration Notes

### Post-Playtest:

1. **Adjusted tile colors for better visibility**: Changed the wall color from dark gray to a slightly lighter shade to improve contrast with the background, making it easier for players to distinguish between walkable and blocked areas.

2. **Added visual feedback on movement**: Players mentioned it was hard to tell when they hit a wall. Added a subtle color change effect when the player attempts to move into a wall, providing clearer feedback that movement is blocked.

3. **Increased player size slightly**: Some testers found the player circle too small and hard to track. Increased the player radius from 0.6 to 0.7 times the tile size for better visibility while maintaining collision accuracy.

### Post-Showcase:

1. **Add a level completion animation**: Plan to implement a brief animation or visual effect when the player reaches the goal, such as a fade transition or particle effect, to make level progression feel more rewarding and polished.

2. **Include a simple HUD with level counter**: Add a small UI element showing "Level X of 3" to help players understand their progress through the game and know when they're about to loop back to the beginning.

---

## Assets

All visual elements are generated programmatically using p5.js drawing functions. No external image or audio assets were used in this project.

---

## References

Cochrane, K., & Han, D. (2026). *GBDA302 Week 4 Tutorial: JSON Files & Classes* [Lecture slides]. University of Waterloo.

p5.js. (n.d.). *p5.js reference*. Retrieved February 5, 2026, from https://p5js.org/reference/

---
