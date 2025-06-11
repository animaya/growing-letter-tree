class LetterTreeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.trees = [];
        this.setupCanvas();
        this.setupInput();
        this.gameLoop();
    }

    playSound(letter) {
    // Simulate different sounds for different letters
    const frequency = 200 + (letter.charCodeAt(0) - 65) * 20;
    console.log(`Playing sound at ${frequency}Hz for letter: ${letter}`);
    
    // In a real implementation, you'd use Web Audio API here
    // For now, we'll just log the sound
}

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupInput() {
        document.addEventListener('keypress', (e) => {
            this.createTree(e.key);
        });
    }

    createTree(letter) {
        
    const tree = new Tree(
        Math.random() * this.canvas.width,
        this.canvas.height - 50,
        letter
    );
    this.playSound(letter);
    this.trees.push(tree);
}
        
    

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.trees.forEach(tree => {
        tree.update();
    });
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.trees.forEach(tree => {
        tree.render(this.ctx);
    });
    }

    drawTree(tree) {
        this.ctx.strokeStyle = tree.color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(tree.x, tree.y);
        this.ctx.lineTo(tree.x, tree.y - (tree.growth * 50));
        this.ctx.stroke();
        
        // Draw letter at base
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px Courier New';
        this.ctx.fillText(tree.letter, tree.x - 5, tree.y + 15);
    }
}

// Start the game
new LetterTreeGame()
