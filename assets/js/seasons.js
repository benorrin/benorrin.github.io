// Seasonal decorations. The season itself is picked in _includes/season-detect.html.
(() => {
    const root = document.documentElement;
    const season = root.dataset.season || '';
    const today = root.dataset.seasonToday || '';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const GREETINGS = {
        halloween: '🎃 Happy Halloween',
        bonfire: '🎆 Remember, remember the fifth of November',
        christmas: '🎄 Merry Christmas',
        newyear: '🥂 Happy New Year',
        valentines: '💘 Happy Valentine\'s Day',
        easter: '🐣 Happy Easter',
        pride: '🏳️‍🌈 Happy Brighton Pride',
    };

    // Footer note, with a switch for anyone who'd rather not have decorations
    const note = document.querySelector('.season-note');
    const shown = season || today;
    if (note && shown) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'season-toggle';
        button.textContent = season ? 'Hide decorations' : 'Show decorations';
        button.addEventListener('click', () => {
            try {
                sessionStorage.removeItem('season-preview');
                if (season) localStorage.setItem('seasonal', 'off');
                else localStorage.removeItem('seasonal');
            } catch (e) {}
            location.href = location.pathname + location.hash;
        });
        note.append(' · ' + GREETINGS[shown] + ' · ', button);
        note.hidden = false;
    }

    if (!season) return;

    // A full-screen canvas for particle effects
    const makeCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.className = 'season-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = innerWidth * dpr;
            canvas.height = innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);
        return ctx;
    };

    const rand = (min, max) => min + Math.random() * (max - min);

    // ---------- Halloween: a spider ----------
    const hangSpider = () => {
        const spider = document.createElement('button');
        spider.type = 'button';
        spider.className = 'season-spider';
        spider.setAttribute('aria-label', 'A spider. Poke it.');
        spider.innerHTML = '<span class="spider-thread"></span><svg viewBox="0 0 40 32" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 14 6 8 2 12M14 17 4 16 1 21M15 20 7 25 5 31M26 14l8-6 4 4M26 17l10-1 3 5M25 20l8 5 2 6"/></g><ellipse cx="20" cy="17" rx="7" ry="8" fill="currentColor"/><circle cx="20" cy="9" r="4.5" fill="currentColor"/><circle cx="18.4" cy="8.6" r="1.1" fill="#f07f1d"/><circle cx="21.6" cy="8.6" r="1.1" fill="#f07f1d"/></svg>';
        spider.addEventListener('click', () => {
            if (spider.classList.contains('is-up')) return;
            spider.classList.add('is-up');
            setTimeout(() => spider.classList.remove('is-up'), 6000);
        });
        document.body.appendChild(spider);
    };

    // ---------- Bonfire Night and New Year: fireworks ----------
    const fireworks = (hues) => {
        const ctx = makeCanvas();
        const rockets = [];
        const sparks = [];
        let running = false;

        const launch = () => {
            rockets.push({
                x: rand(0.1, 0.9) * innerWidth,
                y: innerHeight,
                targetY: rand(0.08, 0.4) * innerHeight,
                speed: rand(9, 13),
                hue: hues[Math.floor(Math.random() * hues.length)],
            });
            start();
        };

        const burst = (x, y, hue) => {
            const count = Math.round(rand(50, 80));
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = rand(1.5, 4.5);
                sparks.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 0,
                    max: rand(50, 85),
                    hue: hue + rand(-15, 15),
                });
            }
        };

        const frame = () => {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = rockets.length - 1; i >= 0; i--) {
                const r = rockets[i];
                r.y -= r.speed;
                ctx.fillStyle = `hsla(${r.hue}, 100%, 75%, 0.9)`;
                ctx.fillRect(r.x - 1, r.y, 2, 9);
                if (r.y <= r.targetY) {
                    burst(r.x, r.y, r.hue);
                    rockets.splice(i, 1);
                }
            }
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.life++;
                s.vx *= 0.975;
                s.vy = s.vy * 0.975 + 0.05;
                s.x += s.vx;
                s.y += s.vy;
                const alpha = 1 - s.life / s.max;
                if (alpha <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }
                ctx.fillStyle = `hsla(${s.hue}, 95%, 62%, ${alpha})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
            if (rockets.length || sparks.length) {
                requestAnimationFrame(frame);
            } else {
                running = false;
            }
        };

        const start = () => {
            if (running) return;
            running = true;
            requestAnimationFrame(frame);
        };

        // An opening volley, then the odd rocket now and then
        for (let i = 0; i < 5; i++) setTimeout(launch, 400 + i * rand(350, 650));
        const next = () => setTimeout(() => {
            if (!document.hidden) launch();
            next();
        }, rand(4000, 8000));
        next();
    };

    // ---------- Christmas: snow ----------
    const snow = () => {
        const ctx = makeCanvas();
        const count = innerWidth < 600 ? 35 : 65;
        const flakes = Array.from({ length: count }, () => ({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            r: rand(1, 3.2),
            vy: rand(0.3, 1.1),
            drift: rand(0, Math.PI * 2),
        }));
        let colour = '';
        let tick = 0;

        const frame = () => {
            if (tick++ % 30 === 0) colour = getComputedStyle(root).getPropertyValue('--snow').trim() || '#fff';
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            ctx.fillStyle = colour;
            flakes.forEach((f) => {
                f.drift += 0.01;
                f.y += f.vy;
                f.x += Math.sin(f.drift) * 0.4;
                if (f.y > innerHeight + 5) {
                    f.y = -5;
                    f.x = Math.random() * innerWidth;
                }
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    };

    // ---------- Valentine's: hearts ----------
    const floatHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'season-heart';
        heart.setAttribute('aria-hidden', 'true');
        heart.textContent = '♥';
        heart.style.left = rand(5, 95) + 'vw';
        heart.style.fontSize = rand(14, 30) + 'px';
        heart.style.animationDuration = rand(7, 12) + 's';
        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    };

    const every = (fn, min, max) => {
        const go = () => setTimeout(() => {
            if (!document.hidden) fn();
            go();
        }, rand(min, max));
        go();
    };

    if (season === 'halloween') hangSpider();

    if (reduceMotion) return;

    if (season === 'bonfire') {
        fireworks([20, 35, 45, 0, 200, 280]);
    } else if (season === 'newyear') {
        fireworks([45, 50, 55, 0, 190, 320]);
    } else if (season === 'christmas') {
        snow();
    } else if (season === 'valentines') {
        setTimeout(floatHeart, 1000);
        every(floatHeart, 2500, 6000);
    }
})();
