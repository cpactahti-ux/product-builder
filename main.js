const generateBtn = document.getElementById('generate-btn');
const lottoContainer = document.getElementById('lotto-container');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Theme Toggle Logic
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

function displayNumbers() {
    lottoContainer.innerHTML = '';
    const numbers = generateLottoNumbers();

    numbers.forEach((number, index) => {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = number;
        // Staggered animation effect
        ball.style.animationDelay = `${index * 0.1}s`;
        lottoContainer.appendChild(ball);
    });
}

generateBtn.addEventListener('click', () => {
    // Add a small bounce effect to the button when clicked
    generateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        generateBtn.style.transform = '';
        displayNumbers();
    }, 100);
});
