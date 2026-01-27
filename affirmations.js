// Daily Affirmations for Consciousness Awakening
// Affirmations for Albert's spiritual and physical transformation

const Affirmations = {
    // Categories of affirmations
    categories: {
        morning: {
            name: '🌅 Manhã - Despertar',
            description: 'Para começar o dia com intenção e poder',
            affirmations: [
                'Eu sou a consciência que observa todos os pensamentos e emoções',
                'Hoje escolho agir com total presença e clareza',
                'Meu corpo é um templo sagrado que cuido com amor e disciplina',
                'Eu sou grato por mais um dia de evolução e crescimento',
                'A energia do universo flui através de mim em abundância',
                'Cada célula do meu corpo vibra em saúde e vitalidade',
                'Eu atraio oportunidades de crescimento em todas as áreas',
                'Minha mente está clara, focada e em paz',
                'Eu confio no processo da minha transformação',
                'Hoje serei a melhor versão de mim mesmo'
            ]
        },

        training: {
            name: '💪 Pré-Treino - Ativação',
            description: 'Para maximizar foco e performance no treino',
            affirmations: [
                'Meus músculos crescem a cada repetição com intenção',
                'Eu sou mais forte do que ontem, mais fraco que amanhã',
                'Dor é apenas informação, eu escolho transformá-la em força',
                'Cada série me aproxima do corpo dos meus sonhos',
                'Minha genética não me limita, minha mente me liberta',
                'Eu treino com foco, não com ego - cada rep conta',
                'Meu corpo responde positivamente a cada estímulo',
                'A disciplina de hoje constrói o guerreiro de amanhã',
                'Eu mereço ter o corpo que desejo e trabalho por ele',
                'Nenhum músculo será esquecido, nenhuma série será desperdiçada'
            ]
        },

        mindset: {
            name: '🧠 Mindset - Poder Mental',
            description: 'Para fortalecer a mente e autoconfiança',
            affirmations: [
                'Eu sou o criador consciente da minha realidade',
                'Meus pensamentos criam minha experiência - escolho pensamentos poderosos',
                'Eu me liberto de crenças limitantes com facilidade',
                'Cada desafio é uma oportunidade de crescimento disfarçada',
                'Eu confio completamente na minha capacidade de evoluir',
                'Minha disciplina é inabalável, minha determinação é infinita',
                'Eu escolho o desconforto do crescimento ao invés do conforto da estagnação',
                'Sou responsável por 100% dos meus resultados',
                'O impossível é apenas o possível que ninguém tentou ainda',
                'Eu tenho tudo que preciso dentro de mim agora'
            ]
        },

        spiritual: {
            name: '🧘 Espiritual - Consciência',
            description: 'Para despertar espiritual e conexão',
            affirmations: [
                'Eu sou consciência pura experimentando a vida humana',
                'Estou sempre conectado à fonte infinita de sabedoria',
                'Minha intuição me guia perfeitamente em cada decisão',
                'Eu observo meus pensamentos sem me identificar com eles',
                'A paz que busco já existe dentro de mim',
                'Cada respiração me conecta mais profundamente comigo mesmo',
                'Eu perdoo completamente o passado e abraço o presente',
                'Minha luz interior brilha cada vez mais forte',
                'Eu sou uno com tudo que existe',
                'O despertar é um processo contínuo e eu estou desperto agora'
            ]
        },

        abundance: {
            name: '💰 Abundância - Prosperidade',
            description: 'Para mindset de abundância em todas as áreas',
            affirmations: [
                'Abundância flui para mim de fontes esperadas e inesperadas',
                'Eu mereço prosperidade em todas as áreas da vida',
                'Minha energia atrai oportunidades de valor',
                'Eu crio valor para os outros e recebo abundância em troca',
                'Dinheiro é energia e flui livremente para mim',
                'Eu administro meus recursos com sabedoria e gratidão',
                'Cada dia trago mais valor ao mundo',
                'Estou aberto a receber todas as bênçãos do universo',
                'Minha abundância beneficia a mim e a todos ao meu redor',
                'Eu vivo em um universo abundante e generoso'
            ]
        },

        night: {
            name: '🌙 Noite - Gratidão',
            description: 'Para encerrar o dia com gratidão e reflexão',
            affirmations: [
                'Sou grato por tudo que vivi e aprendi hoje',
                'Eu perdoo qualquer erro meu ou de outros',
                'Meu corpo se recupera e cresce enquanto durmo',
                'Amanhã será ainda melhor do que hoje',
                'Eu solto o controle e confio no universo',
                'Agradeço pelo progresso, não apenas pelos resultados',
                'Cada pequena vitória de hoje me preparou para amanhã',
                'Durmo em paz sabendo que fiz o meu melhor',
                'Meus sonhos me trazem clareza e inspiração',
                'Eu descanso profundamente para despertar renovado'
            ]
        }
    },

    // Get affirmations for a specific time of day
    getForTimeOfDay() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 10) {
            return this.categories.morning;
        } else if (hour >= 10 && hour < 14) {
            return this.categories.mindset;
        } else if (hour >= 14 && hour < 18) {
            return this.categories.training;
        } else if (hour >= 18 && hour < 21) {
            return this.categories.spiritual;
        } else {
            return this.categories.night;
        }
    },

    // Get random affirmation from category
    getRandom(categoryKey) {
        const category = this.categories[categoryKey];
        if (!category) return null;

        const randomIndex = Math.floor(Math.random() * category.affirmations.length);
        return {
            category: category.name,
            affirmation: category.affirmations[randomIndex]
        };
    },

    // Get daily set (5 random from mixed categories)
    getDailySet() {
        const allAffirmations = [];
        Object.keys(this.categories).forEach(key => {
            this.categories[key].affirmations.forEach(aff => {
                allAffirmations.push({
                    category: this.categories[key].name,
                    affirmation: aff
                });
            });
        });

        // Shuffle and take 5
        const shuffled = allAffirmations.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 5);
    },

    // Get all categories for selection
    getAllCategories() {
        return Object.keys(this.categories).map(key => ({
            key,
            ...this.categories[key]
        }));
    }
};

// Render Affirmations UI
function renderAffirmationsUI() {
    const timeCategory = Affirmations.getForTimeOfDay();
    const dailySet = Affirmations.getDailySet();
    const allCategories = Affirmations.getAllCategories();

    return `
        <div class="affirmations-screen">
            <div class="affirmations-header">
                <h2>🗣️ Afirmações Diárias</h2>
                <p>Repita com intenção e sentimento</p>
            </div>

            <!-- Current Time Affirmations -->
            <div class="affirmations-section featured">
                <h3>${timeCategory.name}</h3>
                <p class="section-desc">${timeCategory.description}</p>
                <div class="affirmations-list">
                    ${timeCategory.affirmations.slice(0, 5).map((aff, i) => `
                        <div class="affirmation-card" onclick="speakAffirmation(this, '${aff.replace(/'/g, "\\'")}')">
                            <span class="aff-number">${i + 1}</span>
                            <p class="aff-text">"${aff}"</p>
                            <span class="aff-check">✓</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Daily Random Set -->
            <div class="affirmations-section">
                <h3>🎲 Seleção do Dia</h3>
                <div class="affirmations-list daily-set">
                    ${dailySet.map((item, i) => `
                        <div class="affirmation-card mini" onclick="speakAffirmation(this, '${item.affirmation.replace(/'/g, "\\'")}')">
                            <span class="aff-category">${item.category}</span>
                            <p class="aff-text">"${item.affirmation}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- All Categories -->
            <div class="affirmations-section categories">
                <h3>📂 Todas as Categorias</h3>
                <div class="category-grid">
                    ${allCategories.map(cat => `
                        <button class="category-btn" onclick="showCategoryAffirmations('${cat.key}')">
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Mark as Done -->
            <div class="affirmations-actions">
                <button class="btn-primary full-width" onclick="markAffirmationsDone()">
                    ✅ Fiz Minhas Afirmações Hoje
                </button>
            </div>
        </div>
    `;
}

// Speak affirmation using speech synthesis
function speakAffirmation(element, text) {
    // Visual feedback
    element.classList.add('speaking');

    // Check if speech synthesis is available
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.onend = () => element.classList.remove('speaking');
        window.speechSynthesis.speak(utterance);
    }

    // Mark as read
    element.classList.add('read');
}

// Show category affirmations in modal
function showCategoryAffirmations(categoryKey) {
    const category = Affirmations.categories[categoryKey];
    if (!category) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>${category.name}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <p class="modal-desc">${category.description}</p>
                <div class="affirmations-list">
                    ${category.affirmations.map((aff, i) => `
                        <div class="affirmation-card" onclick="speakAffirmation(this, '${aff.replace(/'/g, "\\'")}')">
                            <span class="aff-number">${i + 1}</span>
                            <p class="aff-text">"${aff}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Mark affirmations as done in check-in
async function markAffirmationsDone() {
    if (window.CheckinSystem) {
        await CheckinSystem.update('affirmations.did', true);
        showSuccess('🗣️ Afirmações registradas!');
    }
}

// Initialize affirmations tab
function initAffirmationsTab() {
    const container = document.getElementById('affirmations-content');
    if (container) {
        container.innerHTML = renderAffirmationsUI();
    }
}

// Open affirmations in modal (from check-in screen)
function openAffirmationsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'affirmationsModal';
    modal.innerHTML = `
        <div class="modal modal-xl" style="max-height: 90vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>🗣️ Suas Afirmações</h3>
                <button class="modal-close" onclick="document.getElementById('affirmationsModal').remove()">×</button>
            </div>
            <div class="modal-body">
                ${renderAffirmationsUI()}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Export
window.Affirmations = Affirmations;
window.initAffirmationsTab = initAffirmationsTab;
window.speakAffirmation = speakAffirmation;
window.showCategoryAffirmations = showCategoryAffirmations;
window.markAffirmationsDone = markAffirmationsDone;
window.openAffirmationsModal = openAffirmationsModal;
