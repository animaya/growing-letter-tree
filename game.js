class LetterTreeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.trees = [];
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.typedLettersEl = document.getElementById('typed-letters');
        this.clearBtn = document.getElementById('clear-btn');
        this.setupCanvas();
        this.setupInput();
        this.setupUI();
        this.gameLoop();
    }

    playSound(letter) {
        const frequency = 200 + (letter.toUpperCase().charCodeAt(0) - 65) * 20;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.1);
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            if (/^[a-zA-Z]$/.test(e.key)) {
                if (this.audioCtx.state === 'suspended') {
                    this.audioCtx.resume();
                }
                this.createTree(e.key);
                this.typedLettersEl.textContent += e.key;
            } else if (e.key === 'Backspace') {
                this.removeLastTree();
            }
        });
    }

    setupUI() {
        this.clearBtn.addEventListener('click', () => {
            this.trees = [];
            this.typedLettersEl.textContent = '';
            this.render();
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

    removeLastTree() {
        if (this.trees.length > 0) {
            this.trees.pop();
            const text = this.typedLettersEl.textContent;
            this.typedLettersEl.textContent = text.slice(0, -1);
        }
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
