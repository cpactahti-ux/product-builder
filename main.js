document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const setsWrapper = document.getElementById('sets-wrapper');
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!generateBtn || !themeBtn) return;

    // Theme Toggle
    themeBtn.onclick = () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    };

    function generateLottoNumbers() {
        const numbers = [];
        // Generate 6 unique numbers
        while (numbers.length < 6) {
            const n = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(n)) numbers.push(n);
        }
        const mainNumbers = numbers.sort((a, b) => a - b);
        
        // Generate 1 unique bonus number
        let bonus;
        do {
            bonus = Math.floor(Math.random() * 45) + 1;
        } while (mainNumbers.includes(bonus));
        
        return { main: mainNumbers, bonus: bonus };
    }

    function createSetElement(setIndex) {
        const setDiv = document.createElement('div');
        setDiv.className = 'lotto-set';
        setDiv.style.animationDelay = (setIndex * 0.1) + 's';
        
        const result = generateLottoNumbers();
        const main = result.main;
        const bonus = result.bonus;
        
        // Render Main Numbers
        main.forEach((num, idx) => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = num;
            ball.style.animationDelay = ((setIndex * 0.1) + (idx * 0.05)) + 's';
            setDiv.appendChild(ball);
        });

        // Add Plus Sign
        const plus = document.createElement('div');
        plus.className = 'plus-sign';
        plus.textContent = '+';
        setDiv.appendChild(plus);

        // Render Bonus Number
        const bonusBall = document.createElement('div');
        bonusBall.className = 'ball bonus';
        bonusBall.textContent = bonus;
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
});
