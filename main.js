class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const numbers = this.generateLottoNumbers();
        const style = `
            <style>
                .lotto-set {
                    margin-bottom: 10px;
                    font-size: 1.2em;
                }
            </style>
        `;
        this.shadowRoot.innerHTML = `${style}<div class="lotto-set">${numbers.join(', ')}</div>`;
    }

    generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
}

customElements.define('lotto-numbers', LottoNumbers);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoContainer = document.getElementById('lotto-container');
    lottoContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const lottoSet = document.createElement('lotto-numbers');
        lottoContainer.appendChild(lottoSet);
    }
});