class Tree {
    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.growth = 0;
        this.maxGrowth = Math.random() * 100 + 50;
        this.branches = [];
        this.color = `hsl(${Math.random() * 60 + 80}, 70%, 50%)`;
        this.swayOffset = 0;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
        if (this.growth < this.maxGrowth) {
            this.growth += 0.5;
        }
        this.swayOffset += this.swaySpeed;
        
        // Generate branches as tree grows
        if (this.growth > 20 && this.branches.length < 3) {
            this.generateBranch();
        }
    }

    generateBranch() {
        const branchHeight = this.growth * 0.7;
        const branch = {
            startX: this.x,
            startY: this.y - branchHeight,
            angle: (Math.random() - 0.5) * Math.PI * 0.5,
            length: Math.random() * 30 + 20
        };
        this.branches.push(branch);
    }

    render(ctx) {
        // Main trunk with sway
        const sway = Math.sin(this.swayOffset) * 2;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + sway, this.y - this.growth);
        ctx.stroke();

        // Branches
        this.branches.forEach(branch => {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(branch.startX, branch.startY);
            ctx.lineTo(
                branch.startX + Math.cos(branch.angle) * branch.length,
                branch.startY - Math.sin(branch.angle) * branch.length
            );
            ctx.stroke();
        });

        // Letter at base
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Courier New';
        ctx.fillText(this.letter, this.x - 5, this.y + 15);
    }
}
