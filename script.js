document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. HIỆU ỨNG CANVAS HẠT SÁNG TÍM & HỒNG RƠI MỌNG MƠ --- */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 3.5 + 1;
            this.speedY = Math.random() * 1.2 + 0.4;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
            // Màu Tím & Hồng ngẫu nhiên
            const colors = ['rgba(236, 72, 153, ', 'rgba(168, 85, 247, ', 'rgba(253, 224, 71, '];
            this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.6 + 0.2;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y > canvas.height) {
                this.reset();
                this.y = 0;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.colorPrefix + this.opacity + ')';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ec4899';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    /* --- 2. ĐỔI THEME SÁNG / TỐI --- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        themeToggleBtn.innerHTML = newTheme === 'dark' 
            ? '<i class="fa-solid fa-moon"></i>' 
            : '<i class="fa-solid fa-sun"></i>';
    });

    /* --- 3. GỬI FORM LIÊN HỆ & TOAST NOTIFICATION --- */
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        document.getElementById('nameError').textContent = name ? '' : 'Vui lòng nhập họ tên!';
        document.getElementById('emailError').textContent = email ? '' : 'Vui lòng nhập email!';
        document.getElementById('messageError').textContent = message ? '' : 'Vui lòng nhập lời nhắn!';

        if (name && email && message) {
            toast.classList.add('show');
            contactForm.reset();
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    });
});