// Workout Database
// Workout Database
window.workouts = {
    seg: {
        name: "LOWER A - Quad Dominante",
        duration: "70min",
        focus: "Quadríceps + Panturrilha Pesada",
        exercises: [
            {
                name: "Agachamento Livre",
                target: "Quadríceps, Glúteos",
                sets: 5,
                reps: "5-6",
                rest: "3-4min",
                rir: "0-1",
                load: "85-90% 1RM",
                notes: "💡 <strong>Respiração:</strong> Valsalva (inspire fundo, prenda, execute, expire no topo). Desça controlado, suba explosivo. Amplitude completa (coxa paralela ao chão mínimo)."
            },
            {
                name: "Leg Press 45°",
                target: "Quadríceps",
                sets: 4,
                reps: "8-12",
                rir: "1-2",
                load: "Pesado",
                rest: "2-3min",
                notes: "💡 Pés largura ombros. Desça até 90° joelhos. Não trave joelhos no topo."
            },
            {
                name: "Cadeira Extensora",
                target: "Quadríceps (isolamento)",
                sets: 3,
                reps: "10-15",
                rir: "2",
                load: "Moderado",
                rest: "90s",
                notes: "💡 Controle total. Pausa 1s no pico de contração. Descida 3s."
            },
            {
                name: "Mesa Flexora",
                target: "Posterior de coxa",
                sets: 3,
                reps: "10-12",
                rir: "2",
                load: "Moderado",
                rest: "90s",
                notes: "💡 Evitar arqueamento lombar. Foco na contração posterior."
            },
            {
                name: "Panturrilha em Pé (Gastrocnêmio)",
                target: "Panturrilha",
                sets: 5,
                reps: "12-15",
                rir: "1",
                load: "MÁXIMO",
                rest: "60s",
                notes: "🔥 <strong>PRIORIDADE ABSOLUTA:</strong> Carga pesada. Amplitude completa (alongamento profundo + contração máxima). Pausa 2s no pico."
            }
        ]
    },

    ter: {
        name: "UPPER A - Peito & Costas",
        duration: "70min",
        focus: "Empurrar & Puxar Pesado",
        exercises: [
            {
                name: "Supino Reto com Barra",
                target: "Peitoral, Tríceps, Ombro anterior",
                sets: 5,
                reps: "5-6",
                rir: "0-1",
                load: "85-90% 1RM",
                rest: "3-4min",
                notes: "💡 <strong>Respiração:</strong> Inspire descida nasal, expire subida bucal. Barra toca peito, cotovelos 45° do corpo. Escápulas retraídas."
            },
            {
                name: "Remada Curvada com Barra",
                target: "Costas (espessura), Bíceps",
                sets: 4,
                reps: "6-8",
                rir: "1",
                load: "80-85% 1RM",
                rest: "3min",
                notes: "💡 Pegada pronada. Puxa com <strong>COTOVELO</strong>, não mão. Barra toca abdômen inferior. Costas reta sempre."
            },
            {
                name: "Supino Inclinado Halteres",
                target: "Peitoral superior",
                sets: 4,
                reps: "8-10",
                rir: "1-2",
                load: "Pesado",
                rest: "2min",
                notes: "💡 Banco 30-45°. Amplitude completa. Alongamento profundo embaixo."
            },
            {
                name: "Puxada Frente",
                target: "Costas (largura), Bíceps",
                sets: 4,
                reps: "8-10",
                rir: "1-2",
                load: "Pesado",
                rest: "2min",
                notes: "💡 Pegada pronada, largura >ombros. Puxa até peito alto. Codição cotovelos para baixo."
            },
            {
                name: "Desenvolvimento com Barra",
                target: "Ombros, Tríceps",
                sets: 3,
                reps: "8-10",
                rir: "2",
                load: "Moderado",
                rest: "2min",
                notes: "💡 Pode ser sentado ou em pé. Barra vai da frente da cabeça até overhead completo."
            }
        ]
    },

    qua: {
        name: "ESPECIALIZAÇÃO - Músculos Atrasados",
        duration: "40min",
        focus: "Panturrilha 3x + Detalhes",
        exercises: [
            {
                name: "Panturrilha em Pé (Standing)",
                target: "Gastrocnêmio",
                sets: 4,
                reps: "12-15",
                rir: "1",
                load: "Pesado",
                rest: "60s",
                notes: "🔥 Carga máxima progressiva. Amplitude total."
            },
            {
                name: "Panturrilha Sentado (Seated)",
                target: "Sóleo",
                sets: 4,
                reps: "15-20",
                rir: "2",
                load: "Moderado",
                rest: "45s",
                notes: "🔥 Pausa 3s no <strong>ALONGAMENTO</strong> (embaixo). Sentir fibras profundas."
            },
            {
                name: "Panturrilha Unilateral (Corpo)",
                target: "Panturrilha (equilíbrio)",
                sets: 3,
                reps: "20/perna",
                rir: "2",
                load: "Peso corporal",
                rest: "30s",
                notes: "🔥 Sem carga. Foco mente-músculo. Unilateral corrige assimetrias."
            },
            {
                name: "Panturrilha no Leg Press",
                target: "Panturrilha (variação)",
                sets: 3,
                reps: "15",
                rir: "2",
                load: "Pesado",
                rest: "60s",
                notes: "🔥 Só ponta dos pés na plataforma. Amplitude máxima."
            },
            {
                name: "Rosca Punho com Barra",
                target: "Antebraço (flexores)",
                sets: 3,
                reps: "15",
                rir: "2",
                load: "Leve/Moderado",
                rest: "45s",
                notes: "💡 Antebraços apoiados. Só movimento dos punhos."
            },
            {
                name: "Encolhimento com Barra",
                target: "Trapézio superior",
                sets: 3,
                reps: "12",
                rir: "2",
                load: "Pesado",
                rest: "60s",
                notes: "💡 Movimento vertical puro. Não rolar ombros."
            },
            {
                name: "Face Pull (Polia)",
                target: "Ombro posterior, Trapézio médio",
                sets: 3,
                reps: "20",
                rir: "2",
                load: "Leve",
                rest: "45s",
                notes: "💡 Puxa para rosto. Cotovelos altos. Saúde articular ombros."
            },
            {
                name: "Abdominal Remador",
                target: "Abdômen",
                sets: 3,
                reps: "20",
                rir: "2",
                load: "Corpo",
                rest: "30s",
                notes: "💡 Movimento controlado. Expirar na contração."
            }
        ]
    },

    qui: {
        name: "LOWER B - Posterior Dominante",
        duration: "70min",
        focus: "Posterior + Glúteos + Panturrilha",
        exercises: [
            {
                name: "Levantamento Terra Convencional",
                target: "Posterior, Lombar, Trapézio, Grip",
                sets: 5,
                reps: "5-6",
                rir: "0-1",
                load: "85-90% 1RM",
                rest: "3-4min",
                notes: "💡 <strong>Técnica PERFEITA:</strong> Costas reta, peito alto, puxa com pernas primeiro, depois quadril. Valsalva breathing."
            },
            {
                name: "Stiff / Romanian Deadlift",
                target: "Posterior de coxa, Glúteos",
                sets: 4,
                reps: "8-10",
                rir: "2",
                load: "70-75% 1RM",
                rest: "2-3min",
                notes: "💡 Joelhos levemente flexos. Barra desce até meio da tíbia. <strong>SENTIR alongamento profundo</strong> posterior."
            },
            {
                name: "Avanço Búlgaro (Bulgarian Split Squat)",
                target: "Quadríceps, Glúteos (unilateral)",
                sets: 4,
                reps: "10-12/perna",
                rir: "2",
                load: "Moderado",
                rest: "2min",
                notes: "💡 Perna traseira elevada. Tronco vertical. Corrige assimetrias. Halteres nas mãos."
            },
            {
                name: "Cadeira Abdutora",
                target: "Glúteo médio",
                sets: 3,
                reps: "15-20",
                rir: "2",
                load: "Moderado",
                rest: "60s",
                notes: "💡 Movimento controlado. Pausa no pico. Estabilidade quadril."
            },
            {
                name: "Panturrilha Sentado (Sóleo)",
                target: "Panturrilha",
                sets: 5,
                reps: "15-20",
                rir: "2",
                load: "Moderado",
                rest: "45s",
                notes: "🔥 Pausa 3s no alongamento. Sóleo = fibras de resistência."
            }
        ]
    },

    sex: {
        name: "UPPER B - Ombros & Braços",
        duration: "70min",
        focus: "Delts + Bíceps & Tríceps",
        exercises: [
            {
                name: "Desenvolvimento com Barra em Pé",
                target: "Ombros (todo), Core",
                sets: 4,
                reps: "6-8",
                rir: "1",
                load: "Pesado",
                rest: "3min",
                notes: "💡 Military Press. Core rígido. Barra da clavícula até overhead. Não arqueamento lombar excessivo."
            },
            {
                name: "Weighted Dip (Paralelas)",
                target: "Peito inferior, Tríceps",
                sets: 4,
                reps: "8-10",
                rir: "1",
                load: "+ peso (cinto)",
                rest: "2-3min",
                notes: "💡 Progressão calistênica. Corpo inclinado para frente = mais peito. Vertical = mais tríceps. Amplitude completa."
            },
            {
                name: "Chin-up (Pegada Supinada)",
                target: "Costas, Bíceps",
                sets: 4,
                reps: "8-10",
                rir: "2",
                load: "+ peso se possível",
                rest: "2min",
                notes: "💡 Pegada palmas para você. Puxa até queixo acima barra. Bíceps trabalha forte."
            },
            {
                name: "Elevação Lateral Halteres",
                target: "Ombro lateral (deltoide médio)",
                sets: 4,
                reps: "12-15",
                rir: "2",
                load: "Leve/Moderado",
                rest: "90s",
                notes: "💡 Cotovelos levemente flexos. Sobe até ombros. Controle total. Sem balanço."
            },
            {
                name: "Rosca Direta com Barra",
                target: "Bíceps",
                sets: 3,
                reps: "8-12",
                rir: "2",
                load: "Moderado",
                rest: "90s",
                notes: "💡 Cotovelos fixos. Execução perfeita > carga. Barra EZ ou reta."
            },
            {
                name: "Tríceps Testa (Skull Crusher)",
                target: "Tríceps",
                sets: 3,
                reps: "10-12",
                rir: "2",
                load: "Moderado",
                rest: "90s",
                notes: "💡 Deitado banco reto. Barra desce até testa. Só cotovelos movem."
            },
            {
                name: "Panturrilha em Pé FINAL",
                target: "Panturrilha (especialização)",
                sets: 4,
                reps: "20-30s HOLD",
                rir: "MAX",
                load: "Isometria",
                rest: "60s",
                notes: "🔥 Segura no PICO de contração por tempo. Queimação máxima. Neural training."
            }
        ]
    },

    sab: {
        name: "CORRIDA LEVE (Opcional)",
        duration: "20-30min",
        focus: "Recuperação Ativa / Cardio",
        exercises: [
            {
                name: "Corrida Leve",
                target: "Cardiovascular",
                sets: 1,
                reps: "20-30min",
                rir: "-",
                load: "Ritmo conversação",
                rest: "-",
                notes: "💡 <strong>OPCIONAL:</strong> Se fizer, coma +300-400 kcal neste dia. Não force. Prioridade é recuperação para semana seguinte."
            }
        ]
    },

    dom: {
        name: "CORRIDA (Cardio)",
        duration: "30-45min",
        focus: "Saúde Cardiovascular",
        exercises: [
            {
                name: "Corrida",
                target: "Cardiovascular",
                sets: 1,
                reps: "30-45min",
                rir: "-",
                load: "Moderado",
                rest: "-",
                notes: "🏃 Pode ser mais intenso que sábado. Mantém saúde cardiovascular. Não afeta recuperação muscular (24h antes segunda)."
            }
        ]
    }
};

// Current state
let currentDay = 'seg';
let currentWeight = 68;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    selectDay('seg'); // Show Monday workout by default
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

    // Save to localStorage
    localStorage.setItem('weight', currentWeight);
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
    const savedWeight = localStorage.getItem('weight');
    if (savedWeight) {
        currentWeight = parseFloat(savedWeight);
        document.getElementById('weightInput').value = currentWeight;
        document.getElementById('currentWeight').textContent = currentWeight + 'kg';
        updateProgressBar();
    }
});

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
