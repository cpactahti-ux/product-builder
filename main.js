document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const setsWrapper = document.getElementById('sets-wrapper');
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Results elements
    const winningNumbersContainer = document.getElementById('winning-numbers');
    const winningBonusContainer = document.getElementById('winning-bonus');

    if (!generateBtn || !themeBtn) return;

    // Theme Toggle
    themeBtn.onclick = () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    };

    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const n = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(n)) numbers.push(n);
        }
        const mainNumbers = numbers.sort((a, b) => a - b);
        let bonus;
        do {
            bonus = Math.floor(Math.random() * 45) + 1;
        } while (mainNumbers.includes(bonus));
        return { main: mainNumbers, bonus: bonus };
    }

    // Display "Latest Results" (MOCKED for the session date 2026-05-10)
    function displayLatestResults() {
        if (!winningNumbersContainer || !winningBonusContainer) return;
        
        // Mocked latest results for the current "future" date
        const latest = {
            main: [3, 11, 24, 31, 39, 42],
            bonus: 7
        };

        winningNumbersContainer.innerHTML = '';
        latest.main.forEach((num, idx) => {
            const ball = document.createElement('div');
            ball.className = 'ball small';
            ball.textContent = num;
            ball.style.animationDelay = (idx * 0.1) + 's';
            winningNumbersContainer.appendChild(ball);
        });
        
        winningBonusContainer.textContent = latest.bonus;
    }

    function createSetElement(setIndex) {
        const setDiv = document.createElement('div');
        setDiv.className = 'lotto-set';
        setDiv.style.animationDelay = (setIndex * 0.1) + 's';
        
        const result = generateLottoNumbers();
        
        result.main.forEach((num, idx) => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = num;
            ball.style.animationDelay = ((setIndex * 0.1) + (idx * 0.05)) + 's';
            setDiv.appendChild(ball);
        });

        const plus = document.createElement('div');
        plus.className = 'plus-sign';
        plus.textContent = '+';
        setDiv.appendChild(plus);

        const bonusBall = document.createElement('div');
        bonusBall.className = 'ball bonus';
        bonusBall.textContent = result.bonus;
        bonusBall.style.animationDelay = ((setIndex * 0.1) + (6 * 0.05)) + 's';
        setDiv.appendChild(bonusBall);
        
        return setDiv;
    }

    function displaySets() {
        const radios = document.getElementsByName('sets');
        let count = 3;
        for (const r of radios) {
            if (r.checked) {
                count = parseInt(r.value);
                break;
            }
        }
        
        if (setsWrapper) {
            setsWrapper.innerHTML = '';
            for (let i = 0; i < count; i++) {
                setsWrapper.appendChild(createSetElement(i));
            }
        }
    }

    generateBtn.onclick = () => {
        const btnText = generateBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Revealing...';
        setTimeout(() => {
            if (btnText) btnText.textContent = 'Reveal Numbers';
            displaySets();
        }, 200);
    };

    // Initial load
    displayLatestResults();
});
