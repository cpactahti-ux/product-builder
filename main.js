document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const setsWrapper = document.getElementById('sets-wrapper');
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!generateBtn || !themeBtn) {
        console.error('Required elements not found');
        return;
    }

    // Theme Toggle Logic
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
    });

    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    function createSetElement(setIndex) {
        const setDiv = document.createElement('div');
        setDiv.classList.add('lotto-set');
        setDiv.style.animationDelay = `${setIndex * 0.1}s`;
        
        const numbers = generateLottoNumbers();
        numbers.forEach((num, numIndex) => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = num;
            ball.style.animationDelay = `${(setIndex * 0.15) + (numIndex * 0.05)}s`;
            setDiv.appendChild(ball);
        });
        
        return setDiv;
    }

    function displaySets() {
        const radioButtons = document.getElementsByName('sets');
        let selectedValue = "3"; // fallback
        
        for (const rb of radioButtons) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }
        
        const count = parseInt(selectedValue);
        if (setsWrapper) {
            setsWrapper.innerHTML = '';
            for (let i = 0; i < count; i++) {
                setsWrapper.appendChild(createSetElement(i));
            }
        }
    }

    generateBtn.addEventListener('click', () => {
        generateBtn.style.transform = 'scale(0.95)';
        const btnText = generateBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Revealing...';
        
        setTimeout(() => {
            generateBtn.style.transform = '';
            if (btnText) btnText.textContent = 'Reveal Numbers';
            displaySets();
        }, 200);
    });
});
