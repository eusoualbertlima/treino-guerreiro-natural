// ========================================
// WORKOUT BUILDER - Biblioteca de Exercícios e Montador de Treinos
// Para uso com localStorage (sem Firebase)
// ========================================

// ========================================
// EXERCISE LIBRARY
// ========================================

const exerciseLibrary = [
    // PEITO
    {
        id: 'supino-reto', name: 'Supino Reto', muscle: 'peito', equipment: 'Barra/Halteres', difficulty: 'intermediario',
        description: 'Deitado no banco, desça a barra até o peito e empurre para cima. Mantenha os cotovelos em 45°.'
    },
    {
        id: 'supino-inclinado', name: 'Supino Inclinado', muscle: 'peito', equipment: 'Barra/Halteres', difficulty: 'intermediario',
        description: 'Banco inclinado 30-45°, desça até o peito superior e empurre. Foca na parte superior do peito.'
    },
    {
        id: 'supino-declinado', name: 'Supino Declinado', muscle: 'peito', equipment: 'Barra/Halteres', difficulty: 'intermediario',
        description: 'Banco declinado, desça até o peito inferior. Trabalha a parte inferior do peitoral.'
    },
    {
        id: 'crucifixo', name: 'Crucifixo', muscle: 'peito', equipment: 'Halteres', difficulty: 'iniciante',
        description: 'Deitado, braços abertos com leve flexão. Junte os halteres sobre o peito em arco.'
    },
    {
        id: 'crossover', name: 'Crossover', muscle: 'peito', equipment: 'Cabo', difficulty: 'intermediario',
        description: 'Em pé entre os cabos, traga as mãos à frente do corpo. Ótimo para definição.'
    },
    {
        id: 'flexao', name: 'Flexão de Braço', muscle: 'peito', equipment: 'Peso corporal', difficulty: 'iniciante',
        description: 'Mãos no chão na largura dos ombros, desça o peito até quase tocar o chão.'
    },
    {
        id: 'peck-deck', name: 'Peck Deck', muscle: 'peito', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Sentado na máquina, junte os braços à frente contraindo o peito.'
    },

    // COSTAS
    {
        id: 'puxada-frontal', name: 'Puxada Frontal', muscle: 'costas', equipment: 'Cabo/Barra', difficulty: 'iniciante',
        description: 'Segure a barra larga e puxe até o peito. Mantenha o peito aberto e ombros para trás.'
    },
    {
        id: 'remada-curvada', name: 'Remada Curvada', muscle: 'costas', equipment: 'Barra', difficulty: 'intermediario',
        description: 'Inclinado 45°, puxe a barra até o abdômen. Contraia as escápulas no topo.'
    },
    {
        id: 'remada-unilateral', name: 'Remada Unilateral', muscle: 'costas', equipment: 'Halter', difficulty: 'iniciante',
        description: 'Apoiado no banco, puxe o halter até a cintura. Trabalha um lado por vez.'
    },
    {
        id: 'pullover', name: 'Pullover', muscle: 'costas', equipment: 'Halter', difficulty: 'intermediario',
        description: 'Deitado, leve o halter atrás da cabeça e volte. Trabalha costas e serrátil.'
    },
    {
        id: 'barra-fixa', name: 'Barra Fixa', muscle: 'costas', equipment: 'Barra', difficulty: 'avancado',
        description: 'Pendure-se e puxe o corpo até o queixo passar a barra. Exercício clássico.'
    },
    {
        id: 'remada-cavalinho', name: 'Remada Cavalinho', muscle: 'costas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Sentado na máquina, puxe as alças até o abdômen contraindo as costas.'
    },
    {
        id: 'puxada-triangulo', name: 'Puxada Triângulo', muscle: 'costas', equipment: 'Cabo', difficulty: 'iniciante',
        description: 'Com pegada neutra (triângulo), puxe até o peito focando no meio das costas.'
    },

    // OMBROS
    {
        id: 'desenvolvimento', name: 'Desenvolvimento', muscle: 'ombros', equipment: 'Barra/Halteres', difficulty: 'intermediario',
        description: 'Sentado ou em pé, empurre o peso acima da cabeça. Não hiperextenda a lombar.'
    },
    {
        id: 'elevacao-lateral', name: 'Elevação Lateral', muscle: 'ombros', equipment: 'Halteres', difficulty: 'iniciante',
        description: 'Em pé, eleve os braços lateralmente até a altura dos ombros. Foca no deltoide lateral.'
    },
    {
        id: 'elevacao-frontal', name: 'Elevação Frontal', muscle: 'ombros', equipment: 'Halteres', difficulty: 'iniciante',
        description: 'Eleve os braços à frente até a altura dos ombros, alternando ou simultâneo.'
    },
    {
        id: 'face-pull', name: 'Face Pull', muscle: 'ombros', equipment: 'Cabo', difficulty: 'iniciante',
        description: 'Puxe a corda em direção ao rosto, abrindo os cotovelos. Ótimo para postura.'
    },
    {
        id: 'arnold-press', name: 'Arnold Press', muscle: 'ombros', equipment: 'Halteres', difficulty: 'avancado',
        description: 'Inicie com palmas para você, gire enquanto empurra para cima. Trabalha os 3 deltoides.'
    },
    {
        id: 'encolhimento', name: 'Encolhimento', muscle: 'ombros', equipment: 'Barra/Halteres', difficulty: 'iniciante',
        description: 'Segure o peso e encolha os ombros. Trabalha o trapézio.'
    },

    // BÍCEPS
    {
        id: 'rosca-direta', name: 'Rosca Direta', muscle: 'biceps', equipment: 'Barra', difficulty: 'iniciante',
        description: 'Em pé, flexione os braços trazendo a barra até os ombros. Não balance o corpo.'
    },
    {
        id: 'rosca-alternada', name: 'Rosca Alternada', muscle: 'biceps', equipment: 'Halteres', difficulty: 'iniciante',
        description: 'Flexione um braço por vez, girando o punho durante o movimento.'
    },
    {
        id: 'rosca-martelo', name: 'Rosca Martelo', muscle: 'biceps', equipment: 'Halteres', difficulty: 'iniciante',
        description: 'Pegada neutra (polegares para cima), flexione os braços. Trabalha braquial.'
    },
    {
        id: 'rosca-concentrada', name: 'Rosca Concentrada', muscle: 'biceps', equipment: 'Halter', difficulty: 'intermediario',
        description: 'Sentado, apoie o cotovelo na coxa e flexione. Máxima contração no bíceps.'
    },
    {
        id: 'rosca-scott', name: 'Rosca Scott', muscle: 'biceps', equipment: 'Barra/Halter', difficulty: 'intermediario',
        description: 'Apoiado no banco Scott, flexione isolando completamente o bíceps.'
    },
    {
        id: 'rosca-inversa', name: 'Rosca Inversa', muscle: 'biceps', equipment: 'Barra', difficulty: 'intermediario',
        description: 'Pegada pronada (palmas para baixo), flexione. Trabalha antebraço.'
    },

    // TRÍCEPS
    {
        id: 'triceps-pulley', name: 'Tríceps Pulley', muscle: 'triceps', equipment: 'Cabo', difficulty: 'iniciante',
        description: 'Em pé, empurre a barra para baixo estendendo os cotovelos. Mantenha cotovelos fixos.'
    },
    {
        id: 'triceps-testa', name: 'Tríceps Testa', muscle: 'triceps', equipment: 'Barra/Halteres', difficulty: 'intermediario',
        description: 'Deitado, desça o peso até a testa e estenda. Cuidado com a técnica.'
    },
    {
        id: 'triceps-frances', name: 'Tríceps Francês', muscle: 'triceps', equipment: 'Halter', difficulty: 'intermediario',
        description: 'Sentado, halter atrás da cabeça, estenda os braços. Trabalha cabeça longa.'
    },
    {
        id: 'mergulho', name: 'Mergulho (Dips)', muscle: 'triceps', equipment: 'Paralelas', difficulty: 'avancado',
        description: 'Nas paralelas, desça o corpo flexionando os cotovelos e empurre.'
    },
    {
        id: 'triceps-corda', name: 'Tríceps Corda', muscle: 'triceps', equipment: 'Cabo', difficulty: 'iniciante',
        description: 'Com a corda no pulley, empurre para baixo abrindo no final.'
    },
    {
        id: 'triceps-banco', name: 'Tríceps Banco', muscle: 'triceps', equipment: 'Banco', difficulty: 'iniciante',
        description: 'Mãos no banco atrás, desça o corpo e empurre. Exercício com peso corporal.'
    },

    // PERNAS
    {
        id: 'agachamento-livre', name: 'Agachamento Livre', muscle: 'pernas', equipment: 'Barra', difficulty: 'intermediario',
        description: 'Barra nas costas, desça até coxas paralelas ao chão. Rei dos exercícios.'
    },
    {
        id: 'leg-press', name: 'Leg Press', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Na máquina, empurre a plataforma estendendo as pernas. Não trave os joelhos.'
    },
    {
        id: 'cadeira-extensora', name: 'Cadeira Extensora', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Sentado, estenda as pernas. Isola o quadríceps.'
    },
    {
        id: 'cadeira-flexora', name: 'Cadeira Flexora', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Deitado ou sentado, flexione as pernas. Trabalha posterior de coxa.'
    },
    {
        id: 'stiff', name: 'Stiff', muscle: 'pernas', equipment: 'Barra/Halteres', difficulty: 'intermediario',
        description: 'Pernas semi-estendidas, desça o peso até sentir alongar. Posterior e glúteos.'
    },
    {
        id: 'afundo', name: 'Afundo (Lunge)', muscle: 'pernas', equipment: 'Halteres', difficulty: 'intermediario',
        description: 'Dê um passo à frente e desça até o joelho quase tocar o chão.'
    },
    {
        id: 'panturrilha-pe', name: 'Panturrilha em Pé', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Na máquina, suba na ponta dos pés contraindo a panturrilha.'
    },
    {
        id: 'panturrilha-sentado', name: 'Panturrilha Sentado', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Sentado, suba os calcanhares. Trabalha o sóleo.'
    },
    {
        id: 'hack-squat', name: 'Hack Squat', muscle: 'pernas', equipment: 'Máquina', difficulty: 'intermediario',
        description: 'Na máquina hack, desça controlado e empurre. Foca no quadríceps.'
    },
    {
        id: 'adutora', name: 'Cadeira Adutora', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Sentado, feche as pernas contra a resistência. Trabalha adutores.'
    },
    {
        id: 'abdutora', name: 'Cadeira Abdutora', muscle: 'pernas', equipment: 'Máquina', difficulty: 'iniciante',
        description: 'Sentado, abra as pernas contra a resistência. Trabalha glúteo médio.'
    },

    // CORE
    {
        id: 'abdominal-crunch', name: 'Abdominal Crunch', muscle: 'core', equipment: 'Peso corporal', difficulty: 'iniciante',
        description: 'Deitado, eleve os ombros do chão contraindo o abdômen.'
    },
    {
        id: 'prancha', name: 'Prancha', muscle: 'core', equipment: 'Peso corporal', difficulty: 'iniciante',
        description: 'Apoiado nos antebraços e pés, mantenha o corpo reto. Isométrico.'
    },
    {
        id: 'prancha-lateral', name: 'Prancha Lateral', muscle: 'core', equipment: 'Peso corporal', difficulty: 'intermediario',
        description: 'De lado, apoiado em um antebraço. Trabalha oblíquos.'
    },
    {
        id: 'elevacao-pernas', name: 'Elevação de Pernas', muscle: 'core', equipment: 'Peso corporal', difficulty: 'intermediario',
        description: 'Deitado ou pendurado, eleve as pernas esticadas. Abdômen inferior.'
    },
    {
        id: 'russian-twist', name: 'Russian Twist', muscle: 'core', equipment: 'Peso corporal/Peso', difficulty: 'intermediario',
        description: 'Sentado, inclinado para trás, gire o tronco de um lado ao outro.'
    },
    {
        id: 'abdominal-infra', name: 'Abdominal Infra', muscle: 'core', equipment: 'Peso corporal', difficulty: 'iniciante',
        description: 'Deitado, eleve o quadril do chão trazendo os joelhos ao peito.'
    },
    {
        id: 'abdominal-bicicleta', name: 'Abdominal Bicicleta', muscle: 'core', equipment: 'Peso corporal', difficulty: 'intermediario',
        description: 'Deitado, alterne cotovelo-joelho oposto simulando pedalar.'
    }
];

// Muscle group configuration
const muscleGroups = [
    { id: 'peito', name: 'Peito', icon: '🫁', color: '#ef4444' },
    { id: 'costas', name: 'Costas', icon: '🔙', color: '#3b82f6' },
    { id: 'ombros', name: 'Ombros', icon: '🏔️', color: '#8b5cf6' },
    { id: 'biceps', name: 'Bíceps', icon: '💪', color: '#f59e0b' },
    { id: 'triceps', name: 'Tríceps', icon: '🦾', color: '#10b981' },
    { id: 'pernas', name: 'Pernas', icon: '🦵', color: '#ec4899' },
    { id: 'core', name: 'Core', icon: '🎯', color: '#06b6d4' }
];

// ========================================
// STATE MANAGEMENT
// ========================================

let workoutTemplates = [];
let currentMuscleFilter = 'all';
let selectedExercisesForTemplate = [];
let editingTemplateId = null;
let workoutHistory = [];

// Load data from localStorage
function loadWorkoutData() {
    const templates = localStorage.getItem('guerreiro_templates');
    const history = localStorage.getItem('guerreiro_workout_history');

    if (templates) {
        workoutTemplates = JSON.parse(templates);
    }
    if (history) {
        workoutHistory = JSON.parse(history);
    }
}

// Save data to localStorage
function saveTemplates() {
    localStorage.setItem('guerreiro_templates', JSON.stringify(workoutTemplates));
}

function saveWorkoutHistory() {
    localStorage.setItem('guerreiro_workout_history', JSON.stringify(workoutHistory));
}

// ========================================
// RENDER FUNCTIONS
// ========================================

// Render workout templates list
function renderWorkoutTemplates() {
    const container = document.getElementById('templatesList');
    if (!container) return;

    if (workoutTemplates.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center; padding: 20px;">Nenhum treino criado ainda. Crie seu primeiro treino!</p>';
        return;
    }

    container.innerHTML = workoutTemplates.map(template => {
        const exerciseCount = template.exercises?.length || 0;
        const muscles = [...new Set(template.exercises?.map(e => {
            const ex = exerciseLibrary.find(lib => lib.id === e.exerciseId);
            return ex?.muscle;
        }).filter(Boolean))];

        const muscleIcons = muscles.map(m => {
            const group = muscleGroups.find(g => g.id === m);
            return group?.icon || '';
        }).join(' ');

        return `
        <div class="template-card" data-id="${template.id}">
            <div class="template-header">
                <h4 class="template-name">${template.name}</h4>
                <div class="template-actions">
                    <button class="btn-icon" onclick="editTemplate('${template.id}')" title="Editar">✏️</button>
                    <button class="btn-icon" onclick="deleteTemplate('${template.id}')" title="Excluir">🗑️</button>
                </div>
            </div>
            <div class="template-info">
                <span class="template-exercises">${exerciseCount} exercícios</span>
                <span class="template-muscles">${muscleIcons}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="startWorkoutFromTemplate('${template.id}')" style="width: 100%; margin-top: 10px;">
                ▶️ Iniciar Treino
            </button>
        </div>
        `;
    }).join('');
}

// Render exercise library with filters - SIMPLIFIED VIEW
function renderExerciseLibrary() {
    const container = document.getElementById('exerciseLibraryList');
    if (!container) return;

    const filteredExercises = currentMuscleFilter === 'all'
        ? exerciseLibrary
        : exerciseLibrary.filter(e => e.muscle === currentMuscleFilter);

    container.innerHTML = filteredExercises.map(exercise => {
        const muscleGroup = muscleGroups.find(g => g.id === exercise.muscle);
        const isSelected = selectedExercisesForTemplate.some(e => e.exerciseId === exercise.id);

        return `
        <div class="exercise-row ${isSelected ? 'selected' : ''}" data-id="${exercise.id}" onclick="toggleExerciseSelection('${exercise.id}')">
            <div class="exercise-main">
                <span class="exercise-name">${exercise.name}</span>
                <span class="muscle-badge-mini" style="background: ${muscleGroup?.color}20; color: ${muscleGroup?.color}">
                    ${muscleGroup?.icon}
                </span>
            </div>
            <div class="exercise-right">
                <span class="equipment-tag">${exercise.equipment}</span>
                <span class="add-indicator">${isSelected ? '✓' : '+'}</span>
            </div>
        </div>
        `;
    }).join('');
}


// Render muscle filter buttons
function renderMuscleFilters() {
    const container = document.getElementById('muscleFilters');
    if (!container) return;

    container.innerHTML = `
        <button class="muscle-filter-btn ${currentMuscleFilter === 'all' ? 'active' : ''}" 
                onclick="filterByMuscle('all')">
            Todos
        </button>
        ${muscleGroups.map(group => `
            <button class="muscle-filter-btn ${currentMuscleFilter === group.id ? 'active' : ''}" 
                    onclick="filterByMuscle('${group.id}')"
                    style="--filter-color: ${group.color}">
                ${group.icon} ${group.name}
            </button>
        `).join('')}
    `;
}

// Render selected exercises for template
function renderSelectedExercises() {
    const container = document.getElementById('selectedExercisesList');
    if (!container) return;

    if (selectedExercisesForTemplate.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center; padding: 15px;">Nenhum exercício selecionado</p>';
        return;
    }

    container.innerHTML = selectedExercisesForTemplate.map((item, index) => {
        const exercise = exerciseLibrary.find(e => e.id === item.exerciseId);
        const muscleGroup = muscleGroups.find(g => g.id === exercise?.muscle);

        return `
        <div class="selected-exercise-item" data-index="${index}">
            <div class="exercise-order">
                <button class="btn-icon btn-sm" onclick="moveExercise(${index}, -1)" ${index === 0 ? 'disabled' : ''}>⬆️</button>
                <span class="order-number">${index + 1}</span>
                <button class="btn-icon btn-sm" onclick="moveExercise(${index}, 1)" ${index === selectedExercisesForTemplate.length - 1 ? 'disabled' : ''}>⬇️</button>
            </div>
            <div class="exercise-info">
                <span class="exercise-name">${exercise?.name}</span>
                <span class="muscle-badge" style="background: ${muscleGroup?.color}20; color: ${muscleGroup?.color}">
                    ${muscleGroup?.icon}
                </span>
            </div>
            <div class="exercise-config">
                <div class="config-group">
                    <label>Séries</label>
                    <input type="number" class="input input-sm" value="${item.sets}" min="1" max="10"
                           onchange="updateExerciseConfig(${index}, 'sets', this.value)">
                </div>
                <div class="config-group">
                    <label>Reps</label>
                    <input type="number" class="input input-sm" value="${item.reps}" min="1" max="50"
                           onchange="updateExerciseConfig(${index}, 'reps', this.value)">
                </div>
            </div>
            <button class="btn-icon btn-danger" onclick="removeExercise(${index})">✕</button>
        </div>
        `;
    }).join('');
}

// ========================================
// FILTER & SELECTION FUNCTIONS
// ========================================

// Filter exercises by muscle group
window.filterByMuscle = (muscle) => {
    currentMuscleFilter = muscle;
    renderMuscleFilters();
    renderExerciseLibrary();
};

// Toggle exercise selection
window.toggleExerciseSelection = (exerciseId) => {
    const index = selectedExercisesForTemplate.findIndex(e => e.exerciseId === exerciseId);

    if (index >= 0) {
        selectedExercisesForTemplate.splice(index, 1);
    } else {
        selectedExercisesForTemplate.push({
            exerciseId,
            sets: 3,
            reps: 12,
            order: selectedExercisesForTemplate.length
        });
    }

    renderExerciseLibrary();
    renderSelectedExercises();
};

// Update exercise configuration
window.updateExerciseConfig = (index, field, value) => {
    if (selectedExercisesForTemplate[index]) {
        selectedExercisesForTemplate[index][field] = parseInt(value) || 1;
    }
};

// Move exercise up/down
window.moveExercise = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= selectedExercisesForTemplate.length) return;

    const temp = selectedExercisesForTemplate[index];
    selectedExercisesForTemplate[index] = selectedExercisesForTemplate[newIndex];
    selectedExercisesForTemplate[newIndex] = temp;

    selectedExercisesForTemplate.forEach((e, i) => e.order = i);
    renderSelectedExercises();
};

// Remove exercise from template
window.removeExercise = (index) => {
    selectedExercisesForTemplate.splice(index, 1);
    selectedExercisesForTemplate.forEach((e, i) => e.order = i);
    renderExerciseLibrary();
    renderSelectedExercises();
};

// ========================================
// TEMPLATE MANAGEMENT
// ========================================

// Open template manager modal
window.openTemplateManager = () => {
    document.getElementById('templateManagerModal').classList.remove('hidden');
    renderWorkoutTemplates();
};

// Open create template modal
window.openCreateTemplate = () => {
    editingTemplateId = null;
    selectedExercisesForTemplate = [];
    document.getElementById('templateName').value = '';
    document.getElementById('createTemplateModal').classList.remove('hidden');
    currentMuscleFilter = 'all';
    renderMuscleFilters();
    renderExerciseLibrary();
    renderSelectedExercises();
};

// Edit existing template
window.editTemplate = (templateId) => {
    const template = workoutTemplates.find(t => t.id === templateId);
    if (!template) return;

    editingTemplateId = templateId;
    selectedExercisesForTemplate = [...(template.exercises || [])];
    document.getElementById('templateName').value = template.name;
    document.getElementById('createTemplateModal').classList.remove('hidden');
    currentMuscleFilter = 'all';
    renderMuscleFilters();
    renderExerciseLibrary();
    renderSelectedExercises();
};

// Save template (create or update)
window.saveTemplate = () => {
    const name = document.getElementById('templateName').value.trim();

    if (!name) {
        alert('Por favor, dê um nome ao treino');
        return;
    }

    if (selectedExercisesForTemplate.length === 0) {
        alert('Adicione pelo menos um exercício ao treino');
        return;
    }

    const templateData = {
        name,
        exercises: selectedExercisesForTemplate,
        updatedAt: new Date().toISOString()
    };

    if (editingTemplateId) {
        // Update existing
        const index = workoutTemplates.findIndex(t => t.id === editingTemplateId);
        if (index >= 0) {
            workoutTemplates[index] = { ...workoutTemplates[index], ...templateData };
        }
    } else {
        // Create new
        templateData.id = 'template_' + Date.now();
        templateData.createdAt = new Date().toISOString();
        workoutTemplates.push(templateData);
    }

    saveTemplates();
    document.getElementById('createTemplateModal').classList.add('hidden');
    selectedExercisesForTemplate = [];
    editingTemplateId = null;
    renderWorkoutTemplates();
};

// Delete template
window.deleteTemplate = (templateId) => {
    if (!confirm('Deseja realmente excluir este treino?')) return;

    workoutTemplates = workoutTemplates.filter(t => t.id !== templateId);
    saveTemplates();
    renderWorkoutTemplates();
};

// ========================================
// WORKOUT EXECUTION
// ========================================

// Start workout from template
window.startWorkoutFromTemplate = (templateId) => {
    const template = workoutTemplates.find(t => t.id === templateId);
    if (!template) return;

    document.getElementById('templateManagerModal').classList.add('hidden');
    renderWorkoutExecution(template);
    document.getElementById('workoutExecutionModal').classList.remove('hidden');
};

// Render workout execution
function renderWorkoutExecution(template) {
    const container = document.getElementById('workoutExecutionContent');
    if (!container) return;

    document.getElementById('executionTemplateName').textContent = template.name;

    container.innerHTML = template.exercises.map((item, index) => {
        const exercise = exerciseLibrary.find(e => e.id === item.exerciseId);
        const muscleGroup = muscleGroups.find(g => g.id === exercise?.muscle);

        // Get last weight used for this exercise
        const lastWorkout = workoutHistory.find(w => w.exerciseId === item.exerciseId);
        const lastWeight = lastWorkout?.weight || '';

        return `
        <div class="execution-exercise" data-index="${index}">
            <div class="execution-header">
                <span class="execution-order">${index + 1}</span>
                <div class="execution-info">
                    <h4>${exercise?.name}</h4>
                    <span class="muscle-badge" style="background: ${muscleGroup?.color}20; color: ${muscleGroup?.color}">
                        ${muscleGroup?.icon} ${muscleGroup?.name}
                    </span>
                </div>
            </div>
            <p class="execution-description">${exercise?.description}</p>
            <div class="execution-config">
                <div class="config-display">
                    <span>📊 ${item.sets} séries × ${item.reps} reps</span>
                </div>
                <div class="weight-input">
                    <label>Peso (kg)</label>
                    <input type="number" class="input" id="weight-${index}" 
                           value="${lastWeight}" placeholder="0"
                           step="0.5">
                    ${lastWeight ? `<small class="last-weight">Último: ${lastWeight}kg</small>` : ''}
                </div>
            </div>
        </div>
        `;
    }).join('');

    container.dataset.templateId = template.id;
}

// Complete workout
window.completeWorkout = () => {
    const container = document.getElementById('workoutExecutionContent');
    const templateId = container.dataset.templateId;
    const template = workoutTemplates.find(t => t.id === templateId);

    if (!template) return;

    const workoutDate = new Date().toISOString();

    // Save each exercise
    template.exercises.forEach((item, i) => {
        const exercise = exerciseLibrary.find(e => e.id === item.exerciseId);
        const weightInput = document.getElementById(`weight-${i}`);
        const weight = weightInput?.value ? parseFloat(weightInput.value) : null;

        const workoutEntry = {
            id: 'workout_' + Date.now() + '_' + i,
            exerciseId: item.exerciseId,
            exerciseName: exercise?.name,
            sets: item.sets,
            reps: item.reps,
            weight,
            templateId,
            templateName: template.name,
            date: workoutDate
        };

        // Update or add to history
        const existingIndex = workoutHistory.findIndex(w => w.exerciseId === item.exerciseId);
        if (existingIndex >= 0 && weight) {
            workoutHistory[existingIndex] = workoutEntry;
        } else if (weight) {
            workoutHistory.push(workoutEntry);
        }
    });

    saveWorkoutHistory();
    document.getElementById('workoutExecutionModal').classList.add('hidden');
    alert('Treino completado com sucesso! 💪');
};

// ========================================
// MODAL CONTROLS
// ========================================

// Close modals
document.addEventListener('DOMContentLoaded', () => {
    loadWorkoutData();

    document.getElementById('closeTemplateManager')?.addEventListener('click', () => {
        document.getElementById('templateManagerModal').classList.add('hidden');
    });

    document.getElementById('closeCreateTemplate')?.addEventListener('click', () => {
        document.getElementById('createTemplateModal').classList.add('hidden');
    });

    document.getElementById('closeWorkoutExecution')?.addEventListener('click', () => {
        document.getElementById('workoutExecutionModal').classList.add('hidden');
    });

    document.getElementById('btnSaveTemplate')?.addEventListener('click', saveTemplate);
    document.getElementById('btnCompleteWorkout')?.addEventListener('click', completeWorkout);

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.add('hidden');
            }
        });
    });
});
