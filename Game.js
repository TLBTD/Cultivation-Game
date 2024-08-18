// Configuración del canvas y contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Jugador y Mapa
let player = { x: 50, y: 50, width: 30, height: 30, color: "blue" };
let mapObjects = []; // Para almacenar objetos en el mapa
const tileSize = 50; // Tamaño de cada "tile" en el mapa

// Inicialización del mapa con objetos aleatorios
function generateMap() {
    for (let i = 0; i < 10; i++) {
        mapObjects.push({
            x: Math.random() * (canvas.width - tileSize),
            y: Math.random() * (canvas.height - tileSize),
            width: tileSize,
            height: tileSize,
            color: "green"
        });
    }
}

// Dibujar jugador y objetos en el mapa
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar objetos en el mapa
    mapObjects.forEach(obj => {
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    });

    // Dibujar al jugador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Movimiento del jugador
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.y -= 10;
            break;
        case 'ArrowDown':
            player.y += 10;
            break;
        case 'ArrowLeft':
            player.x -= 10;
            break;
        case 'ArrowRight':
            player.x += 10;
            break;
    }
    draw();
});

// Explorar el mapa (interactuar con objetos)
document.getElementById('exploreBtn').addEventListener('click', () => {
    let found = false;
    mapObjects.forEach((obj, index) => {
        if (player.x < obj.x + obj.width &&
            player.x + player.width > obj.x &&
            player.y < obj.y + obj.height &&
            player.y + player.height > obj.y) {
            document.getElementById('info').textContent = '¡Encontraste un objeto!';
            found = true;
            // Eliminar objeto encontrado
            mapObjects.splice(index, 1);
        }
    });

    if (!found) {
        document.getElementById('info').textContent = 'No encontraste nada.';
    }
    draw();
});

// Inicialización del juego
generateMap();
draw();
