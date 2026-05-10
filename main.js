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
    // Basic stagger for the set itself
    setDiv.style.animationDelay = `${setIndex * 0.1}s`;
    
    const numbers = generateLottoNumbers();
    numbers.forEach((num, numIndex) => {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = num;
        // Fine-tuned stagger for each ball
        ball.style.animationDelay = `${(setIndex * 0.15) + (numIndex * 0.05)}s`;
        setDiv.appendChild(ball);
    });
    
    return setDiv;
}

function displaySets() {
    // Correctly find the checked radio button
    const radioButtons = document.getElementsByName('sets');
    let selectedValue = "1"; // default
    
    for (const rb of radioButtons) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    
    const count = parseInt(selectedValue);
    setsWrapper.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const setElement = createSetElement(i);
        setsWrapper.appendChild(setElement);
    }
}

generateBtn.addEventListener('click', () => {
    // UI Feedback: Button animation
    generateBtn.disabled = true;
    generateBtn.style.transform = 'scale(0.95)';
    generateBtn.querySelector('.btn-text').textContent = 'Revealing...';
    
    setTimeout(() => {
        generateBtn.style.transform = '';
        generateBtn.disabled = false;
        generateBtn.querySelector('.btn-text').textContent = 'Reveal Numbers';
        displaySets();
    }, 300);
});
