// Advanced tracking and progress features
const TrackingSystem = {
    // Get all workout history from localStorage
    getWorkoutHistory() {
        const history = localStorage.getItem('workoutHistory');
        return history ? JSON.parse(history) : [];
    },

    // Save workout completion
    saveWorkout(day, exercises) {
        const history = this.getWorkoutHistory();
        const today = new Date().toISOString().split('T')[0];

        history.push({
            date: today,
            day: day,
            exercises: exercises,
            completed: true
        });

        localStorage.setItem('workoutHistory', JSON.stringify(history));
        this.updateStats();
    },

    // Get current week workouts
    getWeekWorkouts() {
        const history = this.getWorkoutHistory();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return history.filter(w => new Date(w.date) >= weekAgo);
    },

    // Calculate streak
    getStreak() {
        const history = this.getWorkoutHistory();
        if (history.length === 0) return 0;

        // Sort by date descending
        const sorted = history.sort((a, b) => new Date(b.date) - new Date(a.date));

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let workout of sorted) {
            const workoutDate = new Date(workout.date);
            workoutDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((currentDate - workoutDate) / (1000 * 60 * 60 * 24));

            if (diffDays <= 1) {
                streak++;
                currentDate = workoutDate;
            } else {
                break;
            }
        }

        return streak;
    },

    // Get total volume this week
    getWeekVolume() {
        const weekWorkouts = this.getWeekWorkouts();
        let totalVolume = 0;

        weekWorkouts.forEach(workout => {
            workout.exercises.forEach(ex => {
                if (ex.sets) {
                    ex.sets.forEach(set => {
                        if (set.weight && set.reps) {
                            totalVolume += set.weight * set.reps;
                        }
                    });
                }
            });
        });

        return totalVolume;
    },

    // Update dashboard stats
    updateStats() {
        const weekWorkouts = this.getWeekWorkouts();
        const streak = this.getStreak();
        const volume = this.getWeekVolume();

        // Update UI if elements exist
        if (document.getElementById('weekWorkouts')) {
            document.getElementById('weekWorkouts').textContent = weekWorkouts.length;
        }
        if (document.getElementById('currentStreak')) {
            document.getElementById('currentStreak').textContent = streak;
        }
        if (document.getElementById('weekVolume')) {
            document.getElementById('weekVolume').textContent = Math.round(volume / 1000) + 'ton';
        }
    },

    // Get exercise progress (last 10 workouts)
    getExerciseProgress(exerciseName) {
        const history = this.getWorkoutHistory();
        const exerciseData = [];

        history.forEach(workout => {
            workout.exercises.forEach(ex => {
                if (ex.name === exerciseName && ex.sets && ex.sets.length > 0) {
                    const maxWeight = Math.max(...ex.sets.map(s => s.weight || 0));
                    exerciseData.push({
                        date: workout.date,
                        weight: maxWeight
                    });
                }
            });
        });

        return exerciseData.slice(-10); // Last 10 occurrences
    },

    // Export data to JSON (for backup)
    exportData() {
        const data = {
            workoutHistory: this.getWorkoutHistory(),
            weight: localStorage.getItem('weight'),
            programStartDate: localStorage.getItem('programStartDate'),
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `treino-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    },

    // Import data from JSON
    importData(jsonData) {
        try {
            if (jsonData.workoutHistory) {
                localStorage.setItem('workoutHistory', JSON.stringify(jsonData.workoutHistory));
            }
            if (jsonData.weight) {
                localStorage.setItem('weight', jsonData.weight);
            }
            if (jsonData.programStartDate) {
                localStorage.setItem('programStartDate', jsonData.programStartDate);
            }

            this.updateStats();
            return true;
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    },

    // Get total workouts count
    getTotalWorkouts() {
        return this.getWorkoutHistory().length;
    }
};

// Exercise variation system
const VariationSystem = {
    variations: {
        // Peito
        'Supino Inclinado Halteres': ['Crucifixo Inclinado', 'Flexão Declinada', 'Supino Máquina'],
        'Crucifixo': ['Crossover Polia', 'Peck Deck', 'Flexão com Resistência'],

        // Costas
        'Barbell Row': ['Remada Curvada Pronada', 'Remada Cavalinho', 'Remada Máquina'],
        'Puxada Frente': ['Puxada Supinada', 'Puxada Triângulo', 'Puxada Pegada Larga'],

        // Ombros
        'Elevação Lateral Halteres': ['Elevação Lateral Polia', 'Elevação Frontal', 'Arnold Press'],
        'Face Pull': ['Remada Alta', 'Crucifixo Inverso', 'Pássaro Halteres'],

        // Braços
        'Rosca Direta com Barra': ['Rosca Alternada Halteres', 'Rosca Martelo', 'Rosca Scott'],
        'Tríceps Testa': ['Tríceps Polia', 'Tríceps Francês', 'Mergulho na Paralela'],

        // Pernas
        'Leg Press 45°': ['Hack Squat', 'Leg Press Horizontal', 'Agachamento Frontal'],
        'Romanian Deadlift': ['Good Morning', 'Hiperextensão', 'Stiff Unilateral']
    },

    // Get current cycle week (1-6)
    getCurrentCycle() {
        const startDate = localStorage.getItem('programStartDate');
        if (!startDate) {
            localStorage.setItem('programStartDate', new Date().toISOString());
            return 1;
        }

        const start = new Date(startDate);
        const now = new Date();
        const weeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));

        return (weeks % 6) + 1; // Cycles of 6 weeks
    },

    // Check if should rotate (every 6 weeks)
    shouldRotate() {
        return this.getCurrentCycle() === 1;
    },

    // Get variation for exercise
    getVariation(exerciseName) {
        if (!this.variations[exerciseName]) return exerciseName;

        const cycle = Math.floor((this.getCurrentCycle() - 1) / 6);
        const options = this.variations[exerciseName];
        return options[cycle % options.length] || exerciseName;
    }
};

// Chart rendering (simple text-based progress indicator)
function renderProgressChart(exerciseName) {
    const data = TrackingSystem.getExerciseProgress(exerciseName);
    if (data.length === 0) return '<p>Nenhum dado ainda</p>';

    const maxWeight = Math.max(...data.map(d => d.weight));
    const minWeight = Math.min(...data.map(d => d.weight));
    const range = maxWeight - minWeight || 1;

    let chart = '<div class="progress-chart">';
    data.forEach((point, index) => {
        const height = ((point.weight - minWeight) / range) * 100;
        const date = new Date(point.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        chart += `
            <div class="chart-bar">
                <div class="bar" style="height: ${height}%"></div>
                <span class="bar-label">${point.weight}kg</span>
                <span class="bar-date">${date}</span>
            </div>
        `;
    });
    chart += '</div>';

    return chart;
}

// Dashboard render
function renderDashboard() {
    const weekWorkouts = TrackingSystem.getWeekWorkouts();
    const streak = TrackingSystem.getStreak();
    const volume = TrackingSystem.getWeekVolume();
    const cycle = VariationSystem.getCurrentCycle();

    let phaseInfo = '';
    if (cycle <= 3) {
        phaseInfo = `<span class="phase-accumulation">Fase Acumulação (Sem ${cycle}/3)</span>`;
    } else if (cycle <= 5) {
        phaseInfo = `<span class="phase-intensification">Fase Intensificação (Sem ${cycle - 3}/2)</span>`;
    } else {
        phaseInfo = `<span class="phase-deload">Fase Desload (Sem 1/1)</span>`;
    }

    return `
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-icon">🏋️</div>
                <div class="stat-info">
                    <h3>Treinos Esta Semana</h3>
                    <p class="stat-value" id="weekWorkouts">${weekWorkouts.length}/5</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🔥</div>
                <div class="stat-info">
                    <h3>Sequência Atual</h3>
                    <p class="stat-value" id="currentStreak">${streak} dias</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-info">
                    <h3>Volume Semanal</h3>
                    <p class="stat-value" id="weekVolume">${Math.round(volume / 1000)}ton</p>
                </div>
            </div>
            
            <div class="stat-card full-width">
                <div class="stat-icon">📅</div>
                <div class="stat-info">
                    <h3>Ciclo Atual</h3>
                    <p class="stat-value">Semana ${cycle}/6</p>
                    ${phaseInfo}
                </div>
            </div>
        </div>
        
        <div class="quick-actions">
            <h3>Ações Rápidas</h3>
            <button onclick="showWeeklyReport()" class="action-btn">📈 Ver Relatório Semanal</button>
            <button onclick="showProgressCharts()" class="action-btn">📊 Gráficos de Evolução</button>
        </div>
        
        <div class="quick-actions">
            <h3>💾 Gerenciar Dados</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                Total de treinos salvos: <strong>${TrackingSystem.getTotalWorkouts()}</strong>
            </p>
            <button onclick="TrackingSystem.exportData()" class="action-btn">📥 Exportar Backup</button>
            <button onclick="importBackup()" class="action-btn">📤 Importar Backup</button>
            <input type="file" id="importFile" accept=".json" style="display:none" onchange="handleImport(event)">
        </div>
    `;
}

// Weekly report
function showWeeklyReport() {
    const weekWorkouts = TrackingSystem.getWeekWorkouts();
    const volume = TrackingSystem.getWeekVolume();

    let report = `
        <div class="weekly-report">
            <h2>📊 Relatório Semanal</h2>
            <p class="report-period">${new Date().toLocaleDateString('pt-BR')}</p>
            
            <div class="report-section">
                <h3>Resumo</h3>
                <ul>
                    <li>✅ Treinos completados: ${weekWorkouts.length}/5</li>
                    <li>💪 Volume total: ${Math.round(volume / 1000)} toneladas</li>
                    <li>📈 Média por treino: ${Math.round(volume / weekWorkouts.length / 1000)}ton</li>
                </ul>
            </div>
            
            <div class="report-section">
                <h3>Exercícios Mais Realizados</h3>
                <ul>
                    ${getTopExercises(weekWorkouts).map(ex =>
        `<li>${ex.name}: ${ex.count}x</li>`
    ).join('')}
                </ul>
            </div>
            
            <div class="report-section">
                <h3>Próxima Semana</h3>
                <p>${getNextWeekAdvice()}</p>
            </div>
            
            <button onclick="closeDashboard()" class="action-btn">Fechar</button>
        </div>
    `;

    document.getElementById('workout-content').innerHTML = report;
}

function getTopExercises(workouts) {
    const exerciseCount = {};
    workouts.forEach(w => {
        w.exercises.forEach(ex => {
            exerciseCount[ex.name] = (exerciseCount[ex.name] || 0) + 1;
        });
    });

    return Object.entries(exerciseCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));
}

function getNextWeekAdvice() {
    const cycle = VariationSystem.getCurrentCycle();

    if (cycle === 6) {
        return '⚠️ Próxima semana é DESLOAD! Reduza volume para 50% e recupere.';
    } else if (cycle === 3) {
        return '🔥 Última semana de acumulação! Termine forte antes da intensificação!';
    } else if (cycle === 5) {
        return '💪 Última semana de intensificação! Cargas máximas, foco total!';
    } else {
        return '✅ Continue o bom trabalho! Mantenha o foco e progressão.';
    }
}

// Progress charts view
function showProgressCharts() {
    const keyExercises = [
        'Agachamento Livre',
        'Supino Reto com Barra',
        'Levantamento Terra Convencional'
    ];

    let chartsHTML = '<div class="charts-view"><h2>📊 Evolução de Cargas</h2>';

    keyExercises.forEach(ex => {
        chartsHTML += `
            <div class="chart-section">
                <h3>${ex}</h3>
                ${renderProgressChart(ex)}
            </div>
        `;
    });

    chartsHTML += '<button onclick="loadWorkout(currentDay)" class="action-btn">Voltar ao Treino</button></div>';

    document.getElementById('workout-content').innerHTML = chartsHTML;
}

function closeDashboard() {
    loadWorkout(currentDay);
}

// Initialize on load
window.addEventListener('load', () => {
    TrackingSystem.updateStats();
});

// Import backup handlers
function importBackup() {
    document.getElementById('importFile').click();
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (TrackingSystem.importData(data)) {
                alert('✅ Dados importados com sucesso!\n\nTreinos restaurados: ' + data.workoutHistory.length);
                location.reload(); // Refresh to show imported data
            } else {
                alert('❌ Erro ao importar dados. Verifique o arquivo.');
            }
        } catch (error) {
            alert('❌ Arquivo inválido. Use apenas backups exportados pelo app.');
        }
    };
    reader.readAsText(file);
}
