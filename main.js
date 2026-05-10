const generateBtn = document.getElementById('generate-btn');
const setsWrapper = document.getElementById('sets-wrapper');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Theme Toggle
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
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
    setDiv.style.animationDelay = `${setIndex * 0.15}s`;
    
    const numbers = generateLottoNumbers();
    numbers.forEach((num, numIndex) => {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = num;
        ball.style.animationDelay = `${(setIndex * 0.15) + (numIndex * 0.08)}s`;
        setDiv.appendChild(ball);
    });
    
    return setDiv;
}

function displaySets() {
    const selectedSets = document.querySelector('input[name="sets"]:checked').value;
    setsWrapper.innerHTML = '';
    
    for (let i = 0; i < parseInt(selectedSets); i++) {
        const setElement = createSetElement(i);
        setsWrapper.appendChild(setElement);
    }
}

generateBtn.addEventListener('click', () => {
    // Add haptic-like feedback animation
    generateBtn.style.transform = 'scale(0.92)';
    setTimeout(() => {
        generateBtn.style.transform = '';
        displaySets();
    }, 150);
});
