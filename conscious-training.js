// Conscious Training System - Hipertrofia Consciente
// Sistema de treino baseado em consciência corporal, não dogmas científicos

const ConsciousTraining = {
    // Estado do dia - perguntado antes do treino
    todayState: {
        bodyFeel: null,      // 'explosivo', 'forte', 'normal', 'cansado', 'dolorido'
        mindState: null,     // 'presente', 'disperso', 'ansioso'
        sleepQuality: null,  // 1-10
        energy: null,        // 1-10
        intuitionNote: ''    // O que seu corpo está pedindo?
    },

    // Último treino registrado
    lastWorkout: null,

    // Programa semanal consciente - cobre TODOS os músculos
    weekProgram: {
        seg: {
            id: 'upper_push',
            name: '💪 Upper Push - Empurrar',
            focus: 'Peito, Ombros, Tríceps',
            muscles: ['peito', 'ombro_frontal', 'ombro_lateral', 'triceps'],
            duration: '45-60 min',
            exercises: [
                { name: 'Supino (Barra ou Halteres)', muscle: 'Peito', sets: '3-4', reps: '6-12', tip: 'Sinta o peito esticando na descida' },
                { name: 'Supino Inclinado', muscle: 'Peito Superior', sets: '3', reps: '8-12', tip: 'Foco na parte de cima do peito' },
                { name: 'Desenvolvimento', muscle: 'Ombros', sets: '3', reps: '8-12', tip: 'Não trave os cotovelos no topo' },
                { name: 'Elevação Lateral', muscle: 'Ombro Lateral', sets: '3', reps: '12-20', tip: 'Peso leve, sinta a queimação' },
                { name: 'Tríceps Pulley ou Francês', muscle: 'Tríceps', sets: '3', reps: '10-15', tip: 'Contração total no final' },
                { name: 'Mergulho ou Flexão Diamante', muscle: 'Tríceps/Peito', sets: '2-3', reps: 'máximo', tip: 'Finalizador até a falha' }
            ]
        },
        ter: {
            id: 'lower_quad',
            name: '🦵 Lower Quad - Quadríceps',
            focus: 'Quadríceps, Glúteos, Panturrilha',
            muscles: ['quadriceps', 'gluteos', 'panturrilha'],
            duration: '45-60 min',
            exercises: [
                { name: 'Agachamento Livre', muscle: 'Quadríceps/Glúteos', sets: '4', reps: '6-10', tip: 'Rei dos exercícios. Core firme.' },
                { name: 'Leg Press', muscle: 'Quadríceps', sets: '3-4', reps: '10-15', tip: 'Não trave os joelhos' },
                { name: 'Cadeira Extensora', muscle: 'Quadríceps', sets: '3', reps: '12-15', tip: 'Segure no topo 1 segundo' },
                { name: 'Afundo/Passada', muscle: 'Glúteos/Quad', sets: '3', reps: '10-12 cada', tip: 'Passo longo = mais glúteo' },
                { name: 'Panturrilha em Pé', muscle: 'Panturrilha', sets: '4', reps: '15-20', tip: 'Amplitude máxima' },
                { name: 'Panturrilha Sentado', muscle: 'Sóleo', sets: '3', reps: '15-20', tip: 'Trabalha o sóleo' }
            ]
        },
        qua: {
            id: 'cardio_core',
            name: '🏃 Cardio + Core + Mobilidade',
            focus: 'Condicionamento, Core, Recuperação Ativa',
            muscles: ['core', 'cardiovascular'],
            duration: '30-45 min',
            isCardioDay: true,
            exercises: [
                { name: 'Corrida ou Caminhada', muscle: 'Cardiovascular', sets: '1', reps: '20-30 min', tip: 'Intensidade que consegue conversar' },
                { name: 'Prancha Frontal', muscle: 'Core', sets: '3', reps: '30-60s', tip: 'Core contraído, não arqueie' },
                { name: 'Prancha Lateral', muscle: 'Oblíquos', sets: '2 cada lado', reps: '30s', tip: 'Quadril alto' },
                { name: 'Elevação de Pernas', muscle: 'Abdômen Inferior', sets: '3', reps: '15-20', tip: 'Controle a descida' },
                { name: 'Alongamento Dinâmico', muscle: 'Mobilidade', sets: '1', reps: '10 min', tip: 'Quadril, ombros, coluna' }
            ]
        },
        qui: {
            id: 'upper_pull',
            name: '💪 Upper Pull - Puxar',
            focus: 'Costas, Bíceps, Posterior Ombro',
            muscles: ['dorsais', 'trapezio', 'biceps', 'ombro_posterior'],
            duration: '45-60 min',
            exercises: [
                { name: 'Barra Fixa ou Puxada', muscle: 'Dorsais', sets: '4', reps: '6-12', tip: 'Puxe com os cotovelos, não com as mãos' },
                { name: 'Remada Curvada', muscle: 'Costas/Espessura', sets: '4', reps: '8-12', tip: 'Aperte as escápulas' },
                { name: 'Remada Unilateral', muscle: 'Dorsal', sets: '3', reps: '10-12', tip: 'Amplitude completa' },
                { name: 'Face Pull', muscle: 'Ombro Posterior', sets: '3', reps: '15-20', tip: 'Essencial para saúde do ombro' },
                { name: 'Rosca Direta', muscle: 'Bíceps', sets: '3', reps: '10-12', tip: 'Cotovelos fixos' },
                { name: 'Rosca Martelo', muscle: 'Braquial', sets: '3', reps: '10-12', tip: 'Deixa o braço mais grosso' }
            ]
        },
        sex: {
            id: 'lower_hinge',
            name: '🦵 Lower Hinge - Posterior',
            focus: 'Posterior, Glúteos, Core',
            muscles: ['posterior', 'gluteos', 'lombar', 'core'],
            duration: '45-60 min',
            exercises: [
                { name: 'Levantamento Terra', muscle: 'Posterior/Costas', sets: '4', reps: '5-8', tip: 'Forma perfeita sempre. O rei.' },
                { name: 'Stiff', muscle: 'Posterior', sets: '3', reps: '10-12', tip: 'Sinta o alongar do posterior' },
                { name: 'Cadeira Flexora', muscle: 'Posterior', sets: '3', reps: '10-12', tip: 'Contração total' },
                { name: 'Hip Thrust', muscle: 'Glúteos', sets: '3', reps: '12-15', tip: 'Aperte no topo' },
                { name: 'Hiperextensão', muscle: 'Lombar', sets: '3', reps: '12-15', tip: 'Fortalece a base' },
                { name: 'Panturrilha no Leg', muscle: 'Panturrilha', sets: '4', reps: '15-20', tip: 'Variação para estímulo diferente' }
            ]
        },
        sab: {
            id: 'active_recovery',
            name: '🧘 Recuperação Ativa',
            focus: 'Mobilidade, Cardio Leve, Conexão',
            muscles: ['recuperacao'],
            duration: '20-40 min',
            isOptional: true,
            exercises: [
                { name: 'Caminhada ao Sol', muscle: 'Cardiovascular', sets: '1', reps: '20-30 min', tip: 'Pegue sol da manhã' },
                { name: 'Yoga ou Alongamento', muscle: 'Mobilidade', sets: '1', reps: '15-20 min', tip: 'Foco em respiração' },
                { name: 'Meditação em Movimento', muscle: 'Mente', sets: '1', reps: '10 min', tip: 'Caminhe com presença total' }
            ]
        },
        dom: {
            id: 'rest',
            name: '😴 Descanso Total',
            focus: 'Recuperação, Crescimento',
            muscles: [],
            duration: '0 min',
            isRest: true,
            exercises: [],
            message: 'O músculo cresce no descanso. Durma bem, coma proteína, honre seu corpo.'
        }
    },

    // Mapa de cobertura muscular
    musclesCoverage: {
        peito: ['seg'],
        ombros: ['seg', 'qui'],
        triceps: ['seg'],
        biceps: ['qui'],
        dorsais: ['qui'],
        trapezio: ['qui'],
        quadriceps: ['ter'],
        posterior: ['ter', 'sex'],
        gluteos: ['ter', 'sex'],
        panturrilha: ['ter', 'sex'],
        core: ['qua', 'sex'],
        lombar: ['sex']
    },

    // Inicializar
    async init() {
        // Carregar último treino do storage
        if (window.DataSync) {
            const workouts = await DataSync.getWorkouts();
            this.lastWorkout = workouts.length > 0 ? workouts[0] : null;
        } else {
            const stored = localStorage.getItem('lastWorkout');
            if (stored) this.lastWorkout = JSON.parse(stored);
        }
        return this;
    },

    // Verificar dias desde último treino
    checkMissedDays() {
        if (!this.lastWorkout) return { status: 'first-time', days: 0 };

        const lastDate = new Date(this.lastWorkout.date);
        const today = new Date();
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return { status: 'trained-today', days: 0 };
        if (diffDays === 1) return { status: 'normal', days: 1 };
        if (diffDays === 2) return { status: 'reorganize', days: 2 };
        if (diffDays >= 3) return { status: 'gentle-return', days: diffDays };

        return { status: 'normal', days: diffDays };
    },

    // Obter treino do dia adaptado ao estado
    getTodayWorkout() {
        const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const todayKey = days[new Date().getDay()];

        let workout = this.weekProgram[todayKey];

        // Tentar usar treinos detalhados do app.js (window.workouts)
        if (window.workouts && window.workouts[todayKey]) {
            const detalhado = window.workouts[todayKey];
            console.log('⚡ Usando treino detalhado de app.js:', detalhado.name);

            workout = {
                id: todayKey,
                name: detalhado.name,
                focus: detalhado.focus,
                duration: detalhado.duration,
                isRest: todayKey === 'dom', // Domingo rest
                exercises: detalhado.exercises.map((ex, i) => ({
                    id: `ex_${todayKey}_${i}`,
                    name: ex.name,
                    muscle: ex.target || 'Geral',
                    sets: ex.sets,
                    reps: ex.reps,
                    tip: ex.notes || 'Foco na execução',
                    rest: ex.rest,
                    load: ex.load
                }))
            };
        }

        const missedStatus = this.checkMissedDays();

        return {
            workout,
            day: todayKey,
            missedStatus,
            recommendation: this.getRecommendation(workout, missedStatus)
        };
    },

    // Recomendação baseada no estado
    getRecommendation(workout, missedStatus) {
        if (workout.isRest) {
            return {
                type: 'rest',
                message: '🧘 Hoje é dia de descanso. Seu corpo agradece.',
                tip: 'Foque em alimentação e sono de qualidade.'
            };
        }

        if (missedStatus.status === 'gentle-return') {
            return {
                type: 'gentle',
                message: `⚠️ Você ficou ${missedStatus.days} dias sem treinar. Voltando devagar.`,
                tip: 'Faça 50-70% do volume normal. Reconecte com seu corpo.',
                volumeMultiplier: 0.6
            };
        }

        if (missedStatus.status === 'reorganize') {
            return {
                type: 'adapt',
                message: '🔄 Faltou ontem? Sem problema. Vamos adaptar.',
                tip: 'Ouça seu corpo. Se estiver bem, treino normal.'
            };
        }

        return {
            type: 'normal',
            message: '💪 Bora! Treino do dia pronto.',
            tip: 'Foco na conexão mente-músculo.'
        };
    },

    // Adaptar treino baseado no estado do dia
    adaptWorkoutToState(workout, todayState) {
        const adapted = { ...workout, exercises: [...workout.exercises] };

        // Se energia baixa, reduz volume
        if (todayState.energy && todayState.energy <= 4) {
            adapted.volumeNote = '⚡ Energia baixa detectada. Volume reduzido.';
            adapted.exercises = adapted.exercises.slice(0, 4); // Menos exercícios
        }

        // Se corpo dolorido, sugere mobilidade
        if (todayState.bodyFeel === 'dolorido') {
            adapted.volumeNote = '🧘 Corpo pedindo recuperação. Considere mobilidade.';
            adapted.suggestAlternative = 'cardio_core';
        }

        // Se explosivo, pode ir mais pesado
        if (todayState.bodyFeel === 'explosivo') {
            adapted.volumeNote = '🔥 Energia alta! Aproveite para ir mais intenso.';
        }

        return adapted;
    },

    // Registrar treino completo
    async logWorkoutComplete(workoutId, exerciseLogs, overallFeel) {
        const today = new Date().toISOString().split('T')[0];
        const workoutLog = {
            id: workoutId,
            date: today,
            exercises: exerciseLogs,
            overallFeel, // 'incrivel', 'bom', 'ok', 'ruim'
            timestamp: Date.now()
        };

        this.lastWorkout = workoutLog;

        // Salvar
        if (window.DataSync) {
            await DataSync.saveWorkout(workoutLog);
        } else {
            localStorage.setItem('lastWorkout', JSON.stringify(workoutLog));
        }

        // Sincronizar com Check-in
        if (window.syncTrainingToCheckin) {
            const workout = Object.values(this.weekProgram).find(w => w.id === workoutId);
            window.syncTrainingToCheckin({
                type: workout?.name || workoutId,
                feel: overallFeel,
                hadRunning: workout?.isCardioDay || false
            });
        }

        return workoutLog;
    },

    // Obter próximo treino
    getNextWorkout() {
        const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const todayIndex = new Date().getDay();

        for (let i = 1; i <= 7; i++) {
            const nextIndex = (todayIndex + i) % 7;
            const workout = this.weekProgram[days[nextIndex]];
            if (!workout.isRest) {
                return {
                    day: days[nextIndex],
                    daysUntil: i,
                    workout
                };
            }
        }
    },

    // Obter mapa de músculos da semana
    getWeekMuscleMap() {
        const muscleMap = {};

        for (const [day, workout] of Object.entries(this.weekProgram)) {
            if (workout.muscles) {
                workout.muscles.forEach(muscle => {
                    if (!muscleMap[muscle]) muscleMap[muscle] = [];
                    muscleMap[muscle].push({ day, workout: workout.name });
                });
            }
        }

        return muscleMap;
    }
};

// UI: Renderizar tela de estado pré-treino
function renderPreWorkoutState() {
    // Get Pre-workout hacks
    let hacksHtml = '';
    if (window.NaturalHacks && window.NaturalHacks.categories.preTreino) {
        const hacks = window.NaturalHacks.categories.preTreino.hacks;
        hacksHtml = `
            <div class="state-section hacks-section" style="margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                <label style="margin-bottom: 15px; display: block;">⚡ Protocolos Pré-Treino (Hacks)</label>
                <div class="hacks-checklist-grid">
                    ${hacks.map(hack => `
                        <label class="hack-checkbox-item" style="display: flex; align-items: center; margin-bottom: 12px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;">
                            <input type="checkbox" class="hack-check" value="${hack.id}" style="transform: scale(1.3); margin-right: 12px;">
                            <div>
                                <strong style="display: block; color: #fbbf24;">${hack.name}</strong>
                                <span style="font-size: 0.85em; opacity: 0.8;">${hack.protocol}</span>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    return `
        <div class="conscious-pretraining">
            <h2>🧘 Como está seu corpo hoje?</h2>
            <p class="subtitle">Antes de treinar, conecte-se com você mesmo</p>
            
            <div class="state-section">
                <label>⚡ Corpo</label>
                <div class="state-buttons" id="bodyFeelBtns">
                    <button class="state-btn" data-value="explosivo" onclick="setTodayState('bodyFeel', 'explosivo')">🔥 Explosivo</button>
                    <button class="state-btn" data-value="forte" onclick="setTodayState('bodyFeel', 'forte')">💪 Forte</button>
                    <button class="state-btn" data-value="normal" onclick="setTodayState('bodyFeel', 'normal')">😊 Normal</button>
                    <button class="state-btn" data-value="cansado" onclick="setTodayState('bodyFeel', 'cansado')">😴 Cansado</button>
                    <button class="state-btn" data-value="dolorido" onclick="setTodayState('bodyFeel', 'dolorido')">🤕 Dolorido</button>
                </div>
            </div>
            
            <div class="state-section">
                <label>🧠 Mente</label>
                <div class="state-buttons" id="mindStateBtns">
                    <button class="state-btn" data-value="presente" onclick="setTodayState('mindState', 'presente')">🎯 Presente</button>
                    <button class="state-btn" data-value="disperso" onclick="setTodayState('mindState', 'disperso')">🌀 Disperso</button>
                    <button class="state-btn" data-value="ansioso" onclick="setTodayState('mindState', 'ansioso')">😰 Ansioso</button>
                </div>
            </div>
            
            <div class="state-section">
                <label>💡 Intuição: O que seu corpo pede?</label>
                <textarea id="intuitionNote" placeholder="Ex: Sinto que preciso focar em costas hoje..." 
                          onchange="setTodayState('intuitionNote', this.value)"></textarea>
            </div>

            ${hacksHtml}
            
            <div class="state-section" style="margin-top: 15px;">
                <input type="text" id="customHackInput" placeholder="✨ Outro hack? (Ex: Jejum, Café com Óleo de Coco...)" 
                       style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #333; background: rgba(0,0,0,0.2); color: #fff;">
            </div>
            
            <button class="btn btn-primary btn-lg" onclick="proceedToWorkout()" style="width: 100%; margin-top: 20px;">
                ▶️ Ver Treino do Dia
            </button>
        </div>
    `;
}

// Definir estado do dia
function setTodayState(field, value) {
    ConsciousTraining.todayState[field] = value;

    // Atualizar UI
    const container = document.getElementById(`${field}Btns`) ||
        document.querySelectorAll(`[data-value="${value}"]`)[0]?.parentElement;
    if (container) {
        container.querySelectorAll('.state-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === value);
        });
    }
}

// Prosseguir para treino adaptado
async function proceedToWorkout() {
    // 1. Capture Checked Hacks & Log them
    const checkedHacks = document.querySelectorAll('.hack-check:checked');
    const customHack = document.getElementById('customHackInput')?.value;

    let loggedCount = 0;

    if ((checkedHacks.length > 0 || customHack) && window.logExperimentToday) {
        console.log(`📝 Registrando hacks pré-treino...`);

        // Log checked hacks
        for (const checkbox of checkedHacks) {
            try {
                await logExperimentToday(checkbox.value);
                loggedCount++;
            } catch (e) {
                console.warn('Hack log warning:', e);
            }
        }

        // Log custom hack
        if (customHack && customHack.trim() !== '') {
            try {
                // Generate a temp ID for the custom hack
                const hackId = `custom_${Date.now()}`;
                // We fake an experiment log specifically for this string
                await logExperimentToday({
                    id: hackId,
                    name: customHack,
                    type: 'custom_hack',
                    logged: true
                });
                loggedCount++;
                console.log('📝 Custom hack logged:', customHack);
            } catch (e) {
                console.warn('Custom hack log failed', e);
            }
        }

        if (loggedCount > 0) showSuccess(`✅ ${loggedCount} Hacks/Rituais Registrados!`);
    }

    // 2. Load Workout
    const { workout, day, missedStatus, recommendation } = ConsciousTraining.getTodayWorkout();
    const adaptedWorkout = ConsciousTraining.adaptWorkoutToState(workout, ConsciousTraining.todayState);

    renderConsciousWorkout(adaptedWorkout, recommendation);
}

// Renderizar treino consciente
function renderConsciousWorkout(workout, recommendation) {
    const container = document.getElementById('workout-content') ||
        document.getElementById('conscious-workout-container');
    if (!container) return;

    if (workout.isRest) {
        container.innerHTML = `
            <div class="rest-day-card">
                <h2>${workout.name}</h2>
                <p class="rest-message">${workout.message}</p>
                <div class="rest-tips">
                    <p>🥩 Coma proteína de qualidade</p>
                    <p>💤 Durma 7-9 horas</p>
                    <p>☀️ Pegue sol da manhã</p>
                    <p>🧘 Medite ou alongue</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="conscious-workout">
            <div class="workout-header-conscious">
                <h2>${workout.name}</h2>
                <p class="workout-focus">${workout.focus}</p>
                <p class="workout-duration">⏱️ ${workout.duration}</p>
            </div>
            
            ${recommendation ? `
                <div class="recommendation-card ${recommendation.type}">
                    <p>${recommendation.message}</p>
                    <small>${recommendation.tip}</small>
                </div>
            ` : ''}
            
            ${workout.volumeNote ? `
                <div class="volume-note">
                    <p>${workout.volumeNote}</p>
                </div>
            ` : ''}
            
            <div class="exercises-list-conscious">
                ${workout.exercises.map((ex, i) => `
                    <div class="exercise-card-conscious" data-index="${i}">
                        <div class="exercise-main">
                            <span class="exercise-number">${i + 1}</span>
                            <div class="exercise-info">
                                <h4>${ex.name}</h4>
                                <p class="exercise-muscle">${ex.muscle}</p>
                            </div>
                            <div class="exercise-sets">
                                <span>${ex.sets} x ${ex.reps}</span>
                            </div>
                        </div>
                        <p class="exercise-tip">💡 ${ex.tip}</p>
                        <div class="exercise-feel" style="display: none;">
                            <label>Como foi?</label>
                            <div class="feel-buttons">
                                <button onclick="logExerciseFeel(${i}, 'fraco')">😕 Fraco</button>
                                <button onclick="logExerciseFeel(${i}, 'ok')">😊 OK</button>
                                <button onclick="logExerciseFeel(${i}, 'bom')">💪 Bom</button>
                                <button onclick="logExerciseFeel(${i}, 'incrivel')">🔥 Incrível</button>
                            </div>
                        </div>
                        <button class="btn-done-exercise" onclick="markExerciseDone(${i})">
                            ✅ Feito
                        </button>
                    </div>
                `).join('')}
            </div>
            
            <button class="btn btn-primary btn-lg" id="btnCompleteConsciousWorkout" 
                    onclick="completeConsciousWorkout('${workout.id}')" 
                    style="width: 100%; margin-top: 20px;">
                ✅ Completar Treino
            </button>
        </div>
    `;
}

// Marcar exercício como feito
function markExerciseDone(index) {
    const card = document.querySelector(`.exercise-card-conscious[data-index="${index}"]`);
    if (!card) return;

    card.classList.add('done');
    card.querySelector('.exercise-feel').style.display = 'block';
    card.querySelector('.btn-done-exercise').style.display = 'none';
}

// Registrar sensação do exercício
const exerciseLogs = {};
function logExerciseFeel(index, feel) {
    exerciseLogs[index] = feel;

    const card = document.querySelector(`.exercise-card-conscious[data-index="${index}"]`);
    if (card) {
        card.querySelector('.exercise-feel').innerHTML = `<span class="feel-logged">✓ ${feel}</span>`;
    }
}

// Completar treino consciente
async function completeConsciousWorkout(workoutId) {
    // Pedir sensação geral
    const overallFeel = prompt('Como foi o treino geral?\n1 = Ruim\n2 = OK\n3 = Bom\n4 = Incrível') || '3';
    const feelMap = { '1': 'ruim', '2': 'ok', '3': 'bom', '4': 'incrivel' };

    await ConsciousTraining.logWorkoutComplete(workoutId, exerciseLogs, feelMap[overallFeel] || 'bom');

    // Mostrar sucesso
    if (typeof showSuccess === 'function') {
        showSuccess('✅ Treino completado e registrado no Check-in!');
    }

    // Voltar para a tela inicial do treino
    setTimeout(() => {
        initConsciousTraining();
    }, 1500);
}

// Inicializar sistema de treino consciente
async function initConsciousTraining() {
    await ConsciousTraining.init();

    const container = document.getElementById('workout-content');
    if (!container) return;

    // Verificar estado de dias faltados primeiro
    const missedStatus = ConsciousTraining.checkMissedDays();

    // Mostrar tela apropriada
    if (missedStatus.status === 'gentle-return') {
        container.innerHTML = `
            <div class="return-message">
                <h2>🙏 Bem-vindo de volta!</h2>
                <p>Você ficou ${missedStatus.days} dias sem treinar. Tudo bem, a vida acontece.</p>
                <p>Vamos voltar devagar, ouvindo seu corpo.</p>
                <button class="btn btn-primary" onclick="showPreWorkoutState()">
                    ▶️ Começar
                </button>
            </div>
        `;
    } else {
        showPreWorkoutState();
    }
}

function showPreWorkoutState() {
    const container = document.getElementById('workout-content');
    if (container) {
        container.innerHTML = renderPreWorkoutState();
    }
}

// Exportar
window.ConsciousTraining = ConsciousTraining;
window.initConsciousTraining = initConsciousTraining;
window.setTodayState = setTodayState;
window.proceedToWorkout = proceedToWorkout;
window.markExerciseDone = markExerciseDone;
window.logExerciseFeel = logExerciseFeel;
window.completeConsciousWorkout = completeConsciousWorkout;
window.showPreWorkoutState = showPreWorkoutState;
