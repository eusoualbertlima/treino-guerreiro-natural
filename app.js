// Workout Database - MÉTODO COMPROVADO
// Inspirado em: Tom Platz (The Quadfather) + Arnold (Panturrilha todo dia)
// Divisão: Upper/Lower com PRIORIDADE PERNAS - 6 dias/semana
// Filosofia: Alta intensidade, volume progressivo, consistência
window.workouts = {
    seg: {
        name: "🦵 LEGS - Método Platz (Quadríceps)",
        duration: "75-90min",
        focus: "Quadríceps INTENSO + Panturrilha",
        phase: "legs-quad",
        inspiration: "Tom Platz - 'The Quadfather' - As melhores pernas da história do bodybuilding",
        exercises: [
            {
                name: "Agachamento Livre PROFUNDO",
                target: "Quadríceps, Glúteos, Core",
                sets: 5,
                reps: "8-12",
                rir: "1",
                load: "Pesado progressivo",
                rest: "3-4min",
                notes: "🎯 <strong>MÉTODO PLATZ:</strong> Amplitude ATÉ EMBAIXO. Platz agachava com 500lb+ por 20+ reps. Foco: profundidade > peso. Sem pressa na subida."
            },
            {
                name: "Leg Press 45° (Alto Volume)",
                target: "Quadríceps",
                sets: 4,
                reps: "15-20",
                rir: "1-2",
                load: "Moderado-Pesado",
                rest: "2min",
                notes: "💡 <strong>VOLUME:</strong> Platz fazia séries de 50+ reps no leg press. Objetivo: QUEIMAR. Desça fundo."
            },
            {
                name: "Hack Squat ou Sissy Squat",
                target: "Quadríceps (reto femoral)",
                sets: 3,
                reps: "12-15",
                rir: "1",
                load: "Moderado",
                rest: "90s",
                notes: "🔥 <strong>ISOLAMENTO:</strong> Costas retas no hack. Joelhos passam dos pés = mais quad."
            },
            {
                name: "Cadeira Extensora (Contração)",
                target: "Quadríceps",
                sets: 4,
                reps: "10-15 + isometria",
                rir: "0-1",
                load: "Moderado",
                rest: "60s",
                notes: "🔥 <strong>CONTRAÇÃO MÁXIMA:</strong> Segura 3s no topo de cada rep. Última série: hold até falha."
            },
            {
                name: "Panturrilha em Pé (Arnold Method)",
                target: "Gastrocnêmio",
                sets: 5,
                reps: "10-15",
                rir: "1",
                load: "PESADO",
                rest: "60s",
                notes: "🦵 <strong>ARNOLD:</strong> 'Cada rep como se fosse a última'. Amplitude COMPLETA. Segura 2s no pico."
            },
            {
                name: "Panturrilha Sentado",
                target: "Sóleo",
                sets: 4,
                reps: "15-20",
                rir: "2",
                load: "Moderado",
                rest: "45s",
                notes: "🦵 Pausa 3s no ALONGAMENTO. Sóleo responde a reps altas."
            }
        ]
    },

    ter: {
        name: "💪 UPPER A - Push & Pull (Força)",
        duration: "60-70min",
        focus: "Upper Body Completo + Panturrilha",
        phase: "upper",
        exercises: [
            {
                name: "Supino Reto com Barra",
                target: "Peitoral, Tríceps",
                sets: 4,
                reps: "6-8",
                rir: "2",
                load: "Pesado",
                rest: "3min",
                notes: "💪 Mantém força de empurrar. Progressão de carga semanal."
            },
            {
                name: "Barra Fixa ou Puxada",
                target: "Dorsais, Bíceps",
                sets: 4,
                reps: "8-10",
                rir: "2",
                load: "Peso corporal/Lastro",
                rest: "2min",
                notes: "💪 Largura das costas. Pegada pronada."
            },
            {
                name: "Desenvolvimento Sentado",
                target: "Deltóides",
                sets: 3,
                reps: "8-10",
                rir: "2",
                load: "Moderado-Pesado",
                rest: "2min",
                notes: "💡 Ombros 3D. Core firme."
            },
            {
                name: "Remada Curvada",
                target: "Costas (espessura)",
                sets: 3,
                reps: "8-10",
                rir: "2",
                load: "Moderado-Pesado",
                rest: "2min",
                notes: "💡 Costas grossas. Aperta escápulas."
            },
            {
                name: "Superset: Rosca + Tríceps",
                target: "Bíceps, Tríceps",
                sets: 3,
                reps: "10-12 cada",
                rir: "2",
                load: "Moderado",
                rest: "60s após superset",
                notes: "💪 Braços eficiente."
            },
            {
                name: "Panturrilha em Pé (Arnold)",
                target: "Gastrocnêmio",
                sets: 4,
                reps: "12-15",
                rir: "1",
                load: "Pesado",
                rest: "45s",
                notes: "🦵 <strong>TODO DIA É DIA DE PANTU.</strong> Arnold treinava panturrilha 6x/semana quando era fraqueza."
            }
        ]
    },

    qua: {
        name: "🦵 LEGS - Posterior & Glúteos",
        duration: "70-80min",
        focus: "Posterior + Glúteos + Panturrilha",
        phase: "legs-post",
        exercises: [
            {
                name: "Levantamento Terra Romeno",
                target: "Posterior, Glúteos, Lombar",
                sets: 4,
                reps: "8-10",
                rir: "2",
                load: "Moderado-Pesado",
                rest: "2-3min",
                notes: "🎯 <strong>POSTERIOR FORTE = PERNAS COMPLETAS.</strong> Sinta o alongamento. Costas reta."
            },
            {
                name: "Cadeira Flexora",
                target: "Posterior de Coxa",
                sets: 4,
                reps: "10-12",
                rir: "1",
                load: "Moderado",
                rest: "90s",
                notes: "🔥 Contração MÁXIMA no topo. Pause 2s."
            },
            {
                name: "Hip Thrust (Barra)",
                target: "Glúteos",
                sets: 4,
                reps: "10-12",
                rir: "2",
                load: "Pesado",
                rest: "2min",
                notes: "🍑 Aperta FORTE no topo. Amplitude total."
            },
            {
                name: "Avanço Caminhando",
                target: "Glúteos, Quadríceps",
                sets: 3,
                reps: "12 cada perna",
                rir: "2",
                load: "Halteres",
                rest: "90s",
                notes: "💡 Passos longos = mais glúteo. Tronco vertical."
            },
            {
                name: "Panturrilha Donkey ou 45°",
                target: "Gastrocnêmio",
                sets: 5,
                reps: "15-20",
                rir: "1",
                load: "Moderado-Pesado",
                rest: "60s",
                notes: "🦵 <strong>VARIAÇÃO ARNOLD:</strong> Donkey calf raise era favorito dele. Amplitude máxima."
            },
            {
                name: "Panturrilha Sentado",
                target: "Sóleo",
                sets: 3,
                reps: "20-25",
                rir: "2",
                load: "Moderado",
                rest: "45s",
                notes: "🦵 Sóleo = volume no meio da panturrilha. Reps altas."
            }
        ]
    },

    qui: {
        name: "💪 UPPER B - Push & Pull (Volume)",
        duration: "60-70min",
        focus: "Upper Body Completo + Panturrilha",
        phase: "upper",
        exercises: [
            {
                name: "Supino Inclinado Halteres",
                target: "Peitoral Superior",
                sets: 4,
                reps: "10-12",
                rir: "2",
                load: "Moderado-Pesado",
                rest: "90s",
                notes: "💪 Peito superior definido. Alongamento profundo."
            },
            {
                name: "Remada Cavalinho",
                target: "Dorsais, Trapézio",
                sets: 4,
                reps: "10-12",
                rir: "2",
                load: "Moderado-Pesado",
                rest: "2min",
                notes: "💪 Costas GROSSAS. Escápulas!"
            },
            {
                name: "Elevação Lateral + Face Pull",
                target: "Deltóide Lateral, Posterior",
                sets: 4,
                reps: "12-15 cada",
                rir: "2",
                load: "Leve-Moderado",
                rest: "60s",
                notes: "💡 Ombros 3D. Saúde articular."
            },
            {
                name: "Puxada Supinada",
                target: "Dorsais, Bíceps",
                sets: 3,
                reps: "10-12",
                rir: "2",
                load: "Moderado",
                rest: "90s",
                notes: "💡 Costas + Bíceps."
            },
            {
                name: "Crucifixo + Tríceps Pulley",
                target: "Peitoral, Tríceps",
                sets: 3,
                reps: "12-15 cada",
                rir: "1",
                load: "Leve-Moderado",
                rest: "60s",
                notes: "🔥 Isolamento. Pump máximo."
            },
            {
                name: "Panturrilha em Pé (Arnold)",
                target: "Gastrocnêmio",
                sets: 4,
                reps: "12-15",
                rir: "1",
                load: "Pesado",
                rest: "45s",
                notes: "🦵 Consistência > Intensidade ocasional. Todo treino conta."
            }
        ]
    },

    sex: {
        name: "🦵 LEGS - Full Power (Platz Day)",
        duration: "80-90min",
        focus: "Pernas COMPLETO + Panturrilha EXTRA",
        phase: "legs-full",
        inspiration: "Tom Platz treinava pernas até não conseguir andar. Você não precisa ir tão longe, mas precisa SENTIR.",
        exercises: [
            {
                name: "Agachamento Livre (Volume)",
                target: "Quadríceps, Glúteos",
                sets: 4,
                reps: "12-15",
                rir: "2",
                load: "Moderado-Pesado",
                rest: "2-3min",
                notes: "🎯 <strong>HOJE É DIA DE VOLUME.</strong> Menos peso que segunda, mais reps. Sinta cada rep."
            },
            {
                name: "Leg Press Unilateral",
                target: "Quadríceps (equilíbrio)",
                sets: 3,
                reps: "12-15 cada",
                rir: "2",
                load: "Moderado",
                rest: "45s/perna",
                notes: "💡 Iguala as pernas. Corrige assimetrias."
            },
            {
                name: "Stiff Unilateral",
                target: "Posterior",
                sets: 3,
                reps: "10-12 cada",
                rir: "2",
                load: "Moderado",
                rest: "45s/lado",
                notes: "🔥 Alongamento profundo. Cada perna separada."
            },
            {
                name: "Cadeira Flexora",
                target: "Posterior",
                sets: 3,
                reps: "12-15",
                rir: "1",
                load: "Moderado",
                rest: "60s",
                notes: "💡 Contração máxima."
            },
            {
                name: "🔥 Panturrilha em Pé (PRIORIDADE)",
                target: "Gastrocnêmio",
                sets: 6,
                reps: "10-15",
                rir: "0-1",
                load: "PESADO",
                rest: "75s",
                notes: "🦵 <strong>SESSÃO PRINCIPAL!</strong> 6 séries pesadas. Hoje é dia de CRESCER pantu."
            },
            {
                name: "Panturrilha Sentado DROPSET",
                target: "Sóleo",
                sets: 4,
                reps: "15 + drop",
                rir: "0",
                load: "Moderado→Leve",
                rest: "45s",
                notes: "🦵 Faz 15, tira peso, vai até falha. QUEIMAÇÃO."
            }
        ]
    },

    sab: {
        name: "🦵 LEGS - Especialização (Quad + Pantu)",
        duration: "60-70min",
        focus: "Quadríceps + PANTURRILHA ESPECIALIZAÇÃO",
        phase: "legs-spec",
        inspiration: "Arnold cortou a calça pra mostrar as panturrilhas fracas. Treinou todo dia até crescerem. Disciplina.",
        exercises: [
            {
                name: "Agachamento Frontal ou Goblet",
                target: "Quadríceps (ênfase)",
                sets: 4,
                reps: "10-12",
                rir: "2",
                load: "Moderado",
                rest: "2min",
                notes: "🎯 <strong>VARIAÇÃO:</strong> Mais quad, menos lombar. Tronco vertical."
            },
            {
                name: "Leg Press Pés Juntos",
                target: "Vasto Lateral",
                sets: 3,
                reps: "12-15",
                rir: "2",
                load: "Moderado",
                rest: "90s",
                notes: "💡 Pés juntos no meio da plataforma = trabalha o 'sweep' externo."
            },
            {
                name: "Extensora Unilateral",
                target: "Quadríceps",
                sets: 3,
                reps: "12-15 cada",
                rir: "1",
                load: "Moderado",
                rest: "45s/perna",
                notes: "🔥 Uma perna de cada vez. Iguala e isola."
            },
            {
                name: "🦵 Panturrilha em Pé (MÁXIMO)",
                target: "Gastrocnêmio",
                sets: 6,
                reps: "10-12",
                rir: "0-1",
                load: "MÁXIMO",
                rest: "90s",
                notes: "🦵 <strong>ESPECIALIZAÇÃO:</strong> Carga máxima. Amplitude total. Pausa 3s no pico."
            },
            {
                name: "Panturrilha Sentado (Sóleo Focus)",
                target: "Sóleo",
                sets: 5,
                reps: "15-20",
                rir: "1",
                load: "Moderado-Pesado",
                rest: "60s",
                notes: "🦵 Sóleo cresce com volume. Não economiza."
            },
            {
                name: "Panturrilha Unilateral (Finalizador)",
                target: "Panturrilha",
                sets: 2,
                reps: "Até falha cada",
                rir: "0",
                load: "Peso corporal",
                rest: "30s",
                notes: "🔥 <strong>FINALIZADOR:</strong> Sem peso, só corpo. Vai até NÃO CONSEGUIR MAIS."
            }
        ]
    },

    dom: {
        name: "😴 DESCANSO TOTAL",
        duration: "0min",
        focus: "Recuperação e Crescimento",
        phase: "rest",
        isRest: true,
        exercises: [],
        message: "💪 'The muscle grows when you rest, not when you train.' - Tom Platz. Durma 7-9h, coma 2g proteína/kg, hidrate-se."
    }
};

// Current state
let currentDay = 'seg';
let currentWeight = 68;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in before selecting day
    if (window.FirebaseAuth && window.FirebaseAuth.isLoggedIn()) {
        selectDay('seg');
    }
    updateProgressBar();
});

// Tab Management
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none'; // Force hide all
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block'; // Force show selected
    }

    // Update top tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Update bottom nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const navBtn = document.querySelector(`[onclick="showTab('${tabName}')"].nav-btn`);
    if (navBtn) navBtn.classList.add('active');

    // Load dashboard content if dashboard tab
    if (tabName === 'dashboard' && typeof renderDashboard !== 'undefined') {
        const container = document.getElementById('dashboard-container');
        if (container) {
            container.innerHTML = renderDashboard();
        }
    } else if (tabName === 'dashboard' && typeof window.renderDashboard !== 'undefined') {
        // Fallback scope check
        const container = document.getElementById('dashboard-container');
        if (container) {
            container.innerHTML = window.renderDashboard();
        }
    }

    // Initialize Conscious Training for treino tab
    if (tabName === 'treino' && typeof initConsciousTraining !== 'undefined') {
        initConsciousTraining();
    }
}

// Day Selection
function selectDay(day) {
    currentDay = day;

    // Update day buttons
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(day) || btn.dataset.day === day) {
            btn.classList.add('active');
        }
    });

    // Load workout
    loadWorkout(day);
}

// Load Workout (Delegates to Conscious Training)
function loadWorkout(day) {
    // Instead of loading rigid workouts, we initialize the Conscious flow
    // visual feedback for day selection is kept for reference but functionality changes
    console.log('Selecionado dia:', day);

    // Update day buttons visual state
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(day)) {
            btn.classList.add('active');
        }
    });

    const container = document.getElementById('workout-content');
    if (!container) return;

    // Use Conscious Training System
    if (typeof initConsciousTraining !== 'undefined') {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px;">
                <div class="loading-spinner"></div>
                <p style="margin-top:15px; color:#888;">🧘 Conectando com sua intuição...</p>
            </div>
        `;
        setTimeout(() => {
            initConsciousTraining();
        }, 300);
    } else {
        container.innerHTML = '<p>Sistema Consciente carregando...</p>';
    }
}

// Generate Sets Tracker
function generateSetsTracker(numSets, exIndex, lastData = null) {
    let html = '';
    for (let i = 1; i <= numSets; i++) {
        // Pre-fill with last workout data if available
        const lastWeight = lastData && lastData.sets && lastData.sets[i - 1] ? lastData.sets[i - 1].weight : '';
        const lastReps = lastData && lastData.sets && lastData.sets[i - 1] ? lastData.sets[i - 1].reps : '';

        html += `
            <div class="set-row">
                <input type="checkbox" class="set-checkbox" id="set-${exIndex}-${i}">
                <span class="set-info">Série ${i}:</span>
                <input type="number" class="weight-input" placeholder="${lastWeight || 'kg'}" value="${lastWeight}" step="0.5">
                <span>x</span>
                <input type="number" class="weight-input" placeholder="${lastReps || 'reps'}" value="${lastReps}" style="width: 60px;">
            </div>
        `;
    }
    return html;
}

// Update Weight
function updateWeight() {
    const input = document.getElementById('weightInput');
    currentWeight = parseFloat(input.value);
    document.getElementById('currentWeight').textContent = currentWeight + 'kg';
    updateProgressBar();

    // Save to localStorage (user-isolated)
    const key = typeof TrackingSystem !== 'undefined' ? TrackingSystem.getStoreKey('weight') : 'weight';
    localStorage.setItem(key, currentWeight);
}

// Update Progress Bar
function updateProgressBar() {
    const start = 68;
    const goal = 85;
    const current = currentWeight;

    const progress = ((current - start) / (goal - start)) * 100;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (progressBar) {
        progressBar.style.width = Math.min(progress, 100) + '%';
        progressText.textContent = Math.round(progress) + '% completo';
    }
}

// Save current workout
function saveCurrentWorkout() {
    const workout = workouts[currentDay];
    if (!workout) return;

    // Collect exercise data from inputs
    const exercisesData = [];
    workout.exercises.forEach((ex, index) => {
        const sets = [];
        for (let i = 1; i <= ex.sets; i++) {
            const checkbox = document.getElementById(`set-${index}-${i}`);
            const weightInputs = document.querySelectorAll(`#workout-content .exercise-card:nth-child(${index + 2}) .set-row:nth-child(${i}) .weight-input`);

            if (weightInputs.length >= 2) {
                const weight = parseFloat(weightInputs[0].value) || 0;
                const reps = parseFloat(weightInputs[1].value) || 0;
                const completed = checkbox ? checkbox.checked : false;

                sets.push({ weight, reps, completed });
            }
        }

        exercisesData.push({
            name: ex.name,
            sets: sets
        });
    });

    // Save to tracking system if available
    if (typeof TrackingSystem !== 'undefined') {
        TrackingSystem.saveWorkout(currentDay, exercisesData);

        // Show success message
        alert('✅ Treino salvo com sucesso!\n\nConfira suas estatísticas na aba Dashboard!');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('✅ Treino completado!\n\nDados salvos localmente.');
    }
}

// Load saved weight on init
window.addEventListener('load', () => {
    const key = typeof TrackingSystem !== 'undefined' ? TrackingSystem.getStoreKey('weight') : 'weight';
    const savedWeight = localStorage.getItem(key);
    if (savedWeight) {
        currentWeight = parseFloat(savedWeight);
        const weightInput = document.getElementById('weightInput');
        if (weightInput) weightInput.value = currentWeight;
        const currentWeightEl = document.getElementById('currentWeight');
        if (currentWeightEl) currentWeightEl.textContent = currentWeight + 'kg';
        updateProgressBar();
    }
});

// Reset application state (called on logout/login transition)
window.resetAppState = function () {
    console.log('🧹 Resetting app state...');

    // Reset memory state
    currentDay = 'seg';
    currentWeight = 68;

    // Reset UI
    const weightInput = document.getElementById('weightInput');
    if (weightInput) weightInput.value = 68;
    const currentWeightEl = document.getElementById('currentWeight');
    if (currentWeightEl) currentWeightEl.textContent = '68kg';

    const workoutContent = document.getElementById('workout-content');
    if (workoutContent) workoutContent.innerHTML = '';

    const dashboardContainer = document.getElementById('dashboard-container');
    if (dashboardContainer) dashboardContainer.innerHTML = '';

    // Reset other systems
    if (typeof resetTrackingSystem === 'function') resetTrackingSystem();
    if (typeof resetConsciousTraining === 'function') resetConsciousTraining();

    updateProgressBar();
};

// Get last workout data for specific exercise
function getLastWorkoutData(day, exerciseName) {
    if (typeof TrackingSystem === 'undefined') return null;

    const history = TrackingSystem.getWorkoutHistory();
    if (!history || history.length === 0) return null;

    // Find last workout for this day
    const dayWorkouts = history.filter(w => w.day === day).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    if (dayWorkouts.length === 0) return null;

    // Get most recent workout
    const lastWorkout = dayWorkouts[0];

    // Find this exercise in the workout
    const exerciseData = lastWorkout.exercises.find(e => e.name === exerciseName);
    if (!exerciseData || !exerciseData.sets || exerciseData.sets.length === 0) return null;

    // Calculate stats
    const validSets = exerciseData.sets.filter(s => s.weight > 0 && s.reps > 0);
    if (validSets.length === 0) return null;

    const maxWeight = Math.max(...validSets.map(s => s.weight));
    const avgReps = Math.round(validSets.reduce((sum, s) => sum + s.reps, 0) / validSets.length);

    return {
        maxWeight,
        avgReps,
        sets: exerciseData.sets,
        date: lastWorkout.date
    };
}

// Get progression suggestion
function getProgressionSuggestion(exerciseName, lastData) {
    if (!lastData) return null;

    // Check if it's a lower body exercise (bigger jumps)
    const lowerBodyExercises = ['Agachamento', 'Leg Press', 'Levantamento Terra', 'Stiff'];
    const isLowerBody = lowerBodyExercises.some(ex => exerciseName.includes(ex));

    // Progression increment
    const increment = isLowerBody ? 5 : 2.5;

    // Suggest progression if avg reps was good (>= 80% of target or completed all)
    const suggestion = lastData.maxWeight + increment;

    return suggestion;
}
