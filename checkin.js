// Daily Check-in System for Laboratório Pessoal
// Tracks holistic daily routine: treino, meditação, afirmações, sol, corrida, sono, nutrição

const CheckinSystem = {
    // Today's checkin data
    todayData: null,

    // Default checkin structure
    getDefaultCheckin() {
        return {
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),

            // Core states
            energy: 7,
            motivation: 7,

            // Sleep
            sleep: {
                hours: null,
                quality: 7,
                wakeTime: null
            },

            // Training
            training: {
                status: null, // 'trained', 'rest', 'skipped', 'no-time'
                type: null,   // 'upper', 'lower', 'fullbody', 'cardio', 'custom'
                intensity: null,
                notes: ''
            },

            // Running/Cardio
            running: {
                did: false,
                duration: null,
                distance: null,
                feeling: null
            },

            // Meditation
            meditation: {
                did: false,
                duration: null,
                type: null, // 'guided', 'silent', 'breathing', 'visualization'
                notes: ''
            },

            // Affirmations
            affirmations: {
                did: false,
                count: null,
                feeling: null
            },

            // Sun exposure
            sun: {
                did: false,
                duration: null,
                time: null, // 'morning', 'afternoon', 'evening'
                bare: false // skin exposure
            },

            // Nutrition
            nutrition: {
                protein: null, // estimated grams
                goodFats: false, // eggs, olive oil, coconut, nuts
                water: null, // liters
                saboteurs: [] // 'alcohol', 'sugar', 'processed'
            },

            // Cold/Heat exposure
            coldHeat: {
                coldShower: false,
                sauna: false,
                duration: null
            },

            // Free notes
            notes: '',
            gratitude: ''
        };
    },

    // Initialize checkin for today
    async init() {
        const today = new Date().toISOString().split('T')[0];

        // Try to load from cloud
        if (window.DataSync) {
            this.todayData = await DataSync.getCheckin(today);
        }

        // If no data, create new
        if (!this.todayData) {
            this.todayData = this.getDefaultCheckin();
        }

        return this.todayData;
    },

    // Update checkin field
    async update(field, value) {
        if (!this.todayData) {
            await this.init();
        }

        // Handle nested fields (e.g., 'sleep.hours')
        const parts = field.split('.');
        let obj = this.todayData;

        for (let i = 0; i < parts.length - 1; i++) {
            obj = obj[parts[i]];
        }

        obj[parts[parts.length - 1]] = value;
        this.todayData.timestamp = Date.now();

        // Save to cloud
        if (window.DataSync) {
            await DataSync.saveCheckin(this.todayData);
        }

        return this.todayData;
    },

    // Get checkin summary for display
    getSummary() {
        if (!this.todayData) return null;

        const d = this.todayData;
        const completed = [];
        const pending = [];

        // Check each area
        if (d.training.status) completed.push('💪 Treino');
        else pending.push('💪 Treino');

        if (d.meditation.did) completed.push('🧘 Meditação');
        else pending.push('🧘 Meditação');

        if (d.affirmations.did) completed.push('🗣️ Afirmações');
        else pending.push('🗣️ Afirmações');

        if (d.sun.did) completed.push('🌅 Sol');
        else pending.push('🌅 Sol');

        if (d.running.did) completed.push('🏃 Corrida');
        // Running is optional, don't add to pending

        if (d.coldHeat.coldShower) completed.push('🧊 Ducha Gelada');

        return { completed, pending };
    }
};

// Check-in UI Component
function renderCheckinScreen() {
    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    const greeting = getGreeting();
    const userName = window.FirebaseAuth?.getCurrentUser()?.displayName?.split(' ')[0] || 'Guerreiro';

    return `
        <div class="checkin-screen">
            <div class="checkin-header">
                <h2>${greeting}, ${userName}!</h2>
                <p class="checkin-date">${today}</p>
            </div>
            
            <div class="checkin-quick-status" id="checkinStatus">
                <!-- Will be populated dynamically -->
            </div>
            
            <!-- Energy & Motivation -->
            <div class="checkin-section">
                <h3>Como está se sentindo?</h3>
                <div class="slider-group">
                    <label>
                        <span>⚡ Energia</span>
                        <input type="range" min="1" max="10" value="7" 
                               id="energySlider" onchange="updateCheckin('energy', this.value)">
                        <span id="energyValue">7</span>
                    </label>
                    <label>
                        <span>🔥 Motivação</span>
                        <input type="range" min="1" max="10" value="7" 
                               id="motivationSlider" onchange="updateCheckin('motivation', this.value)">
                        <span id="motivationValue">7</span>
                    </label>
                </div>
            </div>
            
            <!-- Sleep -->
            <div class="checkin-section">
                <h3>😴 Como dormiu?</h3>
                <div class="input-row">
                    <label>
                        <span>Horas</span>
                        <input type="number" min="0" max="12" step="0.5" 
                               id="sleepHours" placeholder="7" 
                               onchange="updateCheckin('sleep.hours', this.value)">
                    </label>
                    <label>
                        <span>Acordou</span>
                        <input type="time" id="wakeTime" 
                               onchange="updateCheckin('sleep.wakeTime', this.value)">
                    </label>
                </div>
                <div class="slider-group">
                    <label>
                        <span>Qualidade</span>
                        <input type="range" min="1" max="10" value="7" 
                               id="sleepQuality" onchange="updateCheckin('sleep.quality', this.value)">
                        <span id="sleepQualityValue">7</span>
                    </label>
                </div>
            </div>
            
            <!-- Training Status -->
            <div class="checkin-section">
                <h3>💪 Treino Hoje</h3>
                <div class="status-buttons" id="trainingStatus">
                    <button class="status-btn" onclick="setTrainingStatus('trained')">
                        🏋️ Treinei
                    </button>
                    <button class="status-btn" onclick="setTrainingStatus('will-train')">
                        💪 Vou Treinar
                    </button>
                    <button class="status-btn" onclick="setTrainingStatus('rest')">
                        🧘 Descanso
                    </button>
                    <button class="status-btn" onclick="setTrainingStatus('skipped')">
                        😴 Corpo Pediu
                    </button>
                    <button class="status-btn" onclick="setTrainingStatus('no-time')">
                        ⚡ Sem Tempo
                    </button>
                </div>
            </div>
            
            <!-- Quick Activities -->
            <div class="checkin-section">
                <h3>✅ Práticas do Dia</h3>
                <div class="toggle-grid">
                    <button class="toggle-btn" id="btnMeditation" onclick="toggleActivity('meditation')">
                        <span class="toggle-icon">🧘</span>
                        <span>Meditação</span>
                    </button>
                    <button class="toggle-btn" id="btnAffirmations" onclick="openAffirmationsModal()">
                        <span class="toggle-icon">🗣️</span>
                        <span>Afirmações</span>
                    </button>
                    <button class="toggle-btn" id="btnSun" onclick="toggleActivity('sun')">
                        <span class="toggle-icon">🌅</span>
                        <span>Sol</span>
                    </button>
                    <button class="toggle-btn" id="btnRunning" onclick="toggleActivity('running')">
                        <span class="toggle-icon">🏃</span>
                        <span>Corrida</span>
                    </button>
                    <button class="toggle-btn" id="btnColdShower" onclick="toggleActivity('coldShower')">
                        <span class="toggle-icon">🧊</span>
                        <span>Ducha Gelada</span>
                    </button>
                    <button class="toggle-btn" id="btnGoodFats" onclick="toggleActivity('goodFats')">
                        <span class="toggle-icon">🥑</span>
                        <span>Gorduras Boas</span>
                    </button>
                </div>
            </div>
            
            <!-- Protein Tracking -->
            <div class="checkin-section">
                <h3>🥩 Proteína (estimativa)</h3>
                <div class="protein-buttons">
                    <button onclick="setProtein(100)">100g</button>
                    <button onclick="setProtein(120)">120g</button>
                    <button onclick="setProtein(150)">150g</button>
                    <button onclick="setProtein(180)">180g+</button>
                </div>
                <p class="hint">Meta: ~150g/dia (2g/kg)</p>
            </div>
            
            <!-- Saboteurs -->
            <div class="checkin-section">
                <h3>🚫 Sabotadores</h3>
                <div class="toggle-grid saboteurs">
                    <button class="toggle-btn negative" id="btnAlcohol" onclick="toggleSaboteur('alcohol')">
                        <span>🍺</span> Álcool
                    </button>
                    <button class="toggle-btn negative" id="btnSugar" onclick="toggleSaboteur('sugar')">
                        <span>🍬</span> Açúcar
                    </button>
                    <button class="toggle-btn negative" id="btnProcessed" onclick="toggleSaboteur('processed')">
                        <span>🍔</span> Ultraprocessado
                    </button>
                </div>
            </div>
            
            <!-- Gratitude -->
            <div class="checkin-section">
                <h3>🙏 Gratidão do Dia</h3>
                <textarea id="gratitudeText" placeholder="Pelo que você é grato hoje?" 
                          onchange="updateCheckin('gratitude', this.value)"></textarea>
            </div>
            
            <!-- Notes -->
            <div class="checkin-section">
                <h3>📝 Notas</h3>
                <textarea id="notesText" placeholder="Observações, insights, como se sentiu..." 
                          onchange="updateCheckin('notes', this.value)"></textarea>
            </div>
        </div>
    `;
}

// Helper functions
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Bom dia';
    if (hour < 18) return '☀️ Boa tarde';
    return '🌙 Boa noite';
}

// Checkin interaction handlers
async function updateCheckin(field, value) {
    await CheckinSystem.update(field, value);

    // Update visual feedback
    if (field === 'energy') {
        document.getElementById('energyValue').textContent = value;
    } else if (field === 'motivation') {
        document.getElementById('motivationValue').textContent = value;
    } else if (field === 'sleep.quality') {
        document.getElementById('sleepQualityValue').textContent = value;
    }

    updateCheckinStatus();
}

function setTrainingStatus(status) {
    // Update buttons
    document.querySelectorAll('#trainingStatus .status-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    CheckinSystem.update('training.status', status);
    updateCheckinStatus();

    // If trained or will-train, suggest going to workout
    if (status === 'trained' || status === 'will-train') {
        showSuccess('Bora! Vá para a aba Treino 💪');
    }
}

function toggleActivity(activity) {
    const btn = document.getElementById(`btn${activity.charAt(0).toUpperCase() + activity.slice(1)}`);
    const isActive = btn.classList.toggle('active');

    if (activity === 'meditation') {
        CheckinSystem.update('meditation.did', isActive);
    } else if (activity === 'affirmations') {
        CheckinSystem.update('affirmations.did', isActive);
    } else if (activity === 'sun') {
        CheckinSystem.update('sun.did', isActive);
    } else if (activity === 'running') {
        CheckinSystem.update('running.did', isActive);
    } else if (activity === 'coldShower') {
        CheckinSystem.update('coldHeat.coldShower', isActive);
    } else if (activity === 'goodFats') {
        CheckinSystem.update('nutrition.goodFats', isActive);
    }

    updateCheckinStatus();
}

function setProtein(grams) {
    document.querySelectorAll('.protein-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    CheckinSystem.update('nutrition.protein', grams);
}

function toggleSaboteur(saboteur) {
    const btn = event.target.closest('.toggle-btn');
    const isActive = btn.classList.toggle('active');

    const currentSaboteurs = CheckinSystem.todayData?.nutrition?.saboteurs || [];

    if (isActive) {
        currentSaboteurs.push(saboteur);
    } else {
        const index = currentSaboteurs.indexOf(saboteur);
        if (index > -1) currentSaboteurs.splice(index, 1);
    }

    CheckinSystem.update('nutrition.saboteurs', currentSaboteurs);
}

function updateCheckinStatus() {
    const summary = CheckinSystem.getSummary();
    if (!summary) return;

    const statusEl = document.getElementById('checkinStatus');
    if (!statusEl) return;

    const completedCount = summary.completed.length;
    const totalCount = completedCount + summary.pending.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    statusEl.innerHTML = `
        <div class="status-progress">
            <div class="status-bar">
                <div class="status-fill" style="width: ${percentage}%"></div>
            </div>
            <span>${completedCount}/${totalCount} práticas</span>
        </div>
        <div class="status-items">
            ${summary.completed.map(item => `<span class="done">${item}</span>`).join('')}
            ${summary.pending.map(item => `<span class="pending">${item}</span>`).join('')}
        </div>
    `;
}

// Initialize checkin when tab opens
async function initCheckinTab() {
    await CheckinSystem.init();

    const container = document.getElementById('checkin-content');
    if (container) {
        container.innerHTML = renderCheckinScreen();

        // Populate with existing data
        if (CheckinSystem.todayData) {
            populateCheckinForm(CheckinSystem.todayData);
        }

        updateCheckinStatus();
    }
}

// Populate form with existing data
function populateCheckinForm(data) {
    // Energy & Motivation
    if (data.energy) {
        document.getElementById('energySlider').value = data.energy;
        document.getElementById('energyValue').textContent = data.energy;
    }
    if (data.motivation) {
        document.getElementById('motivationSlider').value = data.motivation;
        document.getElementById('motivationValue').textContent = data.motivation;
    }

    // Sleep
    if (data.sleep?.hours) {
        document.getElementById('sleepHours').value = data.sleep.hours;
    }
    if (data.sleep?.wakeTime) {
        document.getElementById('wakeTime').value = data.sleep.wakeTime;
    }
    if (data.sleep?.quality) {
        document.getElementById('sleepQuality').value = data.sleep.quality;
        document.getElementById('sleepQualityValue').textContent = data.sleep.quality;
    }

    // Training status
    if (data.training?.status) {
        const statusBtns = document.querySelectorAll('#trainingStatus .status-btn');
        statusBtns.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(data.training.status)) {
                btn.classList.add('active');
            }
        });
    }

    // Activities
    if (data.meditation?.did) document.getElementById('btnMeditation')?.classList.add('active');
    if (data.affirmations?.did) document.getElementById('btnAffirmations')?.classList.add('active');
    if (data.sun?.did) document.getElementById('btnSun')?.classList.add('active');
    if (data.running?.did) document.getElementById('btnRunning')?.classList.add('active');
    if (data.coldHeat?.coldShower) document.getElementById('btnColdShower')?.classList.add('active');
    if (data.nutrition?.goodFats) document.getElementById('btnGoodFats')?.classList.add('active');

    // Protein
    if (data.nutrition?.protein) {
        document.querySelectorAll('.protein-buttons button').forEach(btn => {
            if (btn.textContent.includes(data.nutrition.protein)) {
                btn.classList.add('active');
            }
        });
    }

    // Saboteurs
    if (data.nutrition?.saboteurs) {
        data.nutrition.saboteurs.forEach(sab => {
            document.getElementById(`btn${sab.charAt(0).toUpperCase() + sab.slice(1)}`)?.classList.add('active');
        });
    }

    // Texts
    if (data.gratitude) document.getElementById('gratitudeText').value = data.gratitude;
    if (data.notes) document.getElementById('notesText').value = data.notes;
}

// Sincroniza treino → check-in automaticamente
async function syncTrainingToCheckin(workoutData) {
    // Garante que o check-in está inicializado
    if (!CheckinSystem.todayData) {
        await CheckinSystem.init();
    }

    // Atualiza status do treino
    await CheckinSystem.update('training.status', 'trained');

    if (workoutData.type) {
        await CheckinSystem.update('training.type', workoutData.type);
    }

    if (workoutData.feel) {
        await CheckinSystem.update('training.feel', workoutData.feel);
    }

    // Se teve corrida, marca também
    if (workoutData.hadRunning) {
        await CheckinSystem.update('running.did', true);
        if (workoutData.runningDuration) {
            await CheckinSystem.update('running.duration', workoutData.runningDuration);
        }
    }

    // Atualiza UI se estiver na aba de check-in
    updateCheckinStatus();

    console.log('✅ Check-in sincronizado com treino:', workoutData);
}

// Export
window.CheckinSystem = CheckinSystem;
window.initCheckinTab = initCheckinTab;
window.syncTrainingToCheckin = syncTrainingToCheckin;
