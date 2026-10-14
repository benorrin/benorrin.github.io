// The sea glass hunt. Pieces are hidden around the site; finds are kept in this browser only.
(() => {
    const TOTAL = 8;
    const KEY = 'seaglass';
    let memory = [];

    const load = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
            return Array.isArray(saved) ? saved.filter((n) => Number.isInteger(n)) : [];
        } catch (e) {
            return memory;
        }
    };

    const save = (found) => {
        memory = found;
        try { localStorage.setItem(KEY, JSON.stringify(found)); } catch (e) {}
    };

    const notify = (message) => (window.toast ? window.toast(message) : window.alert(message));

    const SeaGlass = {
        total: TOTAL,
        found: load,
        has: (id) => load().includes(id),
        reset: () => save([]),
        collect(id) {
            const found = load();
            if (found.includes(id)) return;
            found.push(id);
            save(found);
            const left = TOTAL - found.length;
            notify(left === 0
                ? '✨ That\'s all ' + TOTAL + ' pieces of sea glass! Claim your prize at /treasure/'
                : '💎 Sea glass! ' + found.length + ' of ' + TOTAL + ' found. ' + (found.length === 1 ? 'Your collection lives at /treasure/' : left + ' to go.'));
            document.dispatchEvent(new CustomEvent('seaglass:found', { detail: { id, found } }));
        },
    };

    window.SeaGlass = SeaGlass;

    // Pieces already found are shown as collected
    const markFound = () => {
        const found = load();
        document.querySelectorAll('.seaglass[data-glass]').forEach((el) => {
            el.classList.toggle('is-found', found.includes(Number(el.dataset.glass)));
        });
    };

    document.addEventListener('click', (e) => {
        const piece = e.target.closest && e.target.closest('.seaglass[data-glass]');
        if (!piece) return;
        e.preventDefault();
        e.stopPropagation();
        piece.classList.add('is-collecting');
        SeaGlass.collect(Number(piece.dataset.glass));
        setTimeout(markFound, 600);
    }, true);

    markFound();
})();
