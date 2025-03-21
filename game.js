
// Bloxorz-style 3D game with random, always-solvable 20x20 map

let scene, camera, renderer, cube, controls;
const tileSize = 1;
const gridSize = 20;
let map = [];
let startX = 0, startZ = 0;
let endX = 0, endZ = 0;
let cubeX = 0, cubeZ = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('gameCanvas').replaceWith(renderer.domElement);

    // Generate map and add tiles
    generateSolvableMap();
    renderMap();

    // Add cube
    const geometry = new THREE.BoxGeometry(tileSize, tileSize, tileSize);
    const material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.set(startX, 0.5, startZ);
    cubeX = startX;
    cubeZ = startZ;

    camera.position.set(gridSize / 2, 20, gridSize / 2);
    camera.lookAt(gridSize / 2, 0, gridSize / 2);

    animate();
}

function generateSolvableMap() {
    map = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    const path = [];

    let x = Math.floor(Math.random() * gridSize);
    let z = Math.floor(Math.random() * gridSize);

    startX = x;
    startZ = z;

    path.push([x, z]);
    map[z][x] = 1;

    const steps = 60 + Math.floor(Math.random() * 40);
    const directions = [
        [1, 0], [-1, 0],
        [0, 1], [0, -1]
    ];

    for (let i = 0; i < steps; i++) {
        const [dx, dz] = directions[Math.floor(Math.random() * directions.length)];
        const nx = x + dx;
        const nz = z + dz;

        if (nx >= 0 && nx < gridSize && nz >= 0 && nz < gridSize && map[nz][nx] === 0) {
            x = nx;
            z = nz;
            path.push([x, z]);
            map[z][x] = 1;
        }
    }

    // End position is the last in the path
    endX = x;
    endZ = z;
    map[endZ][endX] = 2;
}

function renderMap() {
    for (let z = 0; z < gridSize; z++) {
        for (let x = 0; x < gridSize; x++) {
            if (map[z][x] > 0) {
                const tileGeo = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
                const tileMat = new THREE.MeshBasicMaterial({ color: map[z][x] === 2 ? 0x00ff00 : 0x4444ff });
                const tile = new THREE.Mesh(tileGeo, tileMat);
                tile.position.set(x, 0, z);
                scene.add(tile);
            }
        }
    }
}

function move(direction) {
    let dx = 0, dz = 0;
    if (direction === 'up') dz = -1;
    if (direction === 'down') dz = 1;
    if (direction === 'left') dx = -1;
    if (direction === 'right') dx = 1;

    const newX = cubeX + dx;
    const newZ = cubeZ + dz;

    if (
        newX >= 0 && newX < gridSize &&
        newZ >= 0 && newZ < gridSize &&
        map[newZ][newX] > 0
    ) {
        cubeX = newX;
        cubeZ = newZ;
        cube.position.set(cubeX, 0.5, cubeZ);

        if (cubeX === endX && cubeZ === endZ) {
            document.getElementById('statusText').innerText = "🎉 You reached the goal! Generating new level...";
            setTimeout(() => {
                while(scene.children.length > 0){ scene.remove(scene.children[0]); }
                init();
                document.getElementById('statusText').innerText = "";
            }, 2000);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.onload = init;
