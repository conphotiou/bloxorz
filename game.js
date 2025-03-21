from zipfile import ZipFile
import os

# Create directory structure for the game files
base_path = "/mnt/data/bloxorz_game"
os.makedirs(base_path, exist_ok=True)

# index.html content
index_html = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bloxorz 3D</title>
  <style>
    body { background: #111; color: #fff; text-align: center; font-family: sans-serif; margin: 0; padding: 20px; }
    canvas { background: #000; max-width: 100%; height: auto; }
    .controls button {
      width: 60px; height: 60px; font-size: 24px; margin: 5px;
    }
  </style>
</head>
<body>
  <h1>Bloxorz 3D</h1>
  <canvas id="gameCanvas" width="600" height="600"></canvas>
  <div class="controls">
    <div><button onclick="move('up')">⬆️</button></div>
    <div>
      <button onclick="move('left')">⬅️</button>
      <button onclick="move('down')">⬇️</button>
      <button onclick="move('right')">➡️</button>
    </div>
  </div>
  <p id="statusText"></p>
  <script src="https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.min.js"></script>
  <script src="game.js"></script>
</body>
</html>
"""

# Save index.html
with open(os.path.join(base_path, "index.html"), "w") as f:
    f.write(index_html)

# Placeholder game.js (actual logic to be added)
game_js = """
// Full 3D game logic with random solvable 20x20 map will be here.
alert("Game script loaded. Logic will go here.");
"""

# Save game.js
with open(os.path.join(base_path, "game.js"), "w") as f:
    f.write(game_js)

# README.txt with Blogger instructions
readme_txt = """
Bloxorz 3D Game - Blogger Integration Guide
===========================================

FILES:
- index.html : The main HTML layout
- game.js    : JavaScript logic for rendering and game mechanics

HOW TO USE ON BLOGGER:
1. Upload both files to a file host (e.g. GitHub Pages, Netlify, or Google Drive w/ direct link).
2. Use an <iframe> in your Blogger post like this:

<iframe src="YOUR_UPLOADED_INDEX.HTML_URL" width="100%" height="650" style="border:none;"></iframe>

This will embed the game inside your Blogger page and keep the code separate and clean.
"""

# Save README.txt
with open(os.path.join(base_path, "README.txt"), "w") as f:
    f.write(readme_txt)

# Zip all files
zip_path = "/mnt/data/Bloxorz_3D_Game.zip"
with ZipFile(zip_path, 'w') as zipf:
    for filename in os.listdir(base_path):
        zipf.write(os.path.join(base_path, filename), filename)

zip_path


