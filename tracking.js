// Advanced tracking and progress features
const TrackingSystem = {
    // Get all workout history from localStorage
    getWorkoutHistory() {
        const history = localStorage.getItem('workoutHistory');
        return history ? JSON.parse(history) : [];
    },

    // Save workout completion
    async saveWorkout(day, exercises) {
        const history = this.getWorkoutHistory();
        const today = new Date().toISOString().split('T')[0];

        const newEntry = {
            date: today,
            day: day,
            exercises: exercises,
            completed: true,
            timestamp: Date.now()
        };

        history.push(newEntry);

        // Save to main storage
        localStorage.setItem('workoutHistory', JSON.stringify(history));

        // Save to Cloud (Firebase)
        if (window.DataSync) {
            try {
                await DataSync.saveWorkout(newEntry);
                console.log('✅ Treino sincronizado na nuvem!');
            } catch (e) {
                console.warn('⚠️ Cloud sync failed for workout, saved locally.', e);
            }
        }

        // AUTOMATIC BACKUP - Save redundant copy
        this.createAutoBackup();
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

        // Also ensure holistic data is loaded
        if (this.holisticHistory.length === 0) {
            this.loadHolisticData();
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
    },

    // Create automatic backup (redundant copy)
    createAutoBackup() {
        const data = {
            workoutHistory: this.getWorkoutHistory(),
            weight: localStorage.getItem('weight'),
            programStartDate: localStorage.getItem('programStartDate'),
            backupDate: new Date().toISOString()
        };

        // Save to backup key
        localStorage.setItem('workoutBackup', JSON.stringify(data));
        localStorage.setItem('lastBackupDate', new Date().toISOString());

        // Check if should auto-download (weekly)
        this.checkWeeklyAutoDownload();
    },

    // Try to recover from backup if main data is lost
    tryRecoverFromBackup() {
        const backup = localStorage.getItem('workoutBackup');
        if (!backup) return false;

        try {
            const data = JSON.parse(backup);
            if (data.workoutHistory && data.workoutHistory.length > 0) {
                // Main data is empty or corrupted, restore from backup
                if (this.getWorkoutHistory().length === 0) {
                    this.importData(data);
                    console.log('✅ Dados recuperados automaticamente do backup!');
                    return true;
                }
            }
        } catch (error) {
            console.error('Erro ao recuperar backup:', error);
        }
        return false;
    },

    // Check if should auto-download backup (weekly)
    checkWeeklyAutoDownload() {
        const lastDownload = localStorage.getItem('lastAutoDownload');
        const now = new Date();

        if (!lastDownload) {
            localStorage.setItem('lastAutoDownload', now.toISOString());
            return;
        }

        const lastDate = new Date(lastDownload);
        const daysSince = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

        // Auto-download every 7 days
        if (daysSince >= 7) {
            this.exportData();
            localStorage.setItem('lastAutoDownload', now.toISOString());

            // Show notification
            setTimeout(() => {
                alert('📥 Backup semanal automático!\n\nSeus dados foram baixados para segurança.');
            }, 1000);
        }
    },

    // Holistic data storage
    holisticHistory: [],

    // Load holistic data from cloud
    async loadHolisticData() {
        if (window.DataSync) {
            const checkins = await DataSync.getAllCheckins();
            this.holisticHistory = Object.values(checkins).sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log(`🧘 Loaded ${this.holisticHistory.length} holistic check-ins`);
            // Trigger dashboard refresh if active
            if (document.getElementById('dashboard-container')) {
                document.getElementById('dashboard-container').innerHTML = renderDashboard();
            }
        }
    },

    // Get stats for last X days
    getHolisticStats(days = 7) {
        const history = this.holisticHistory.slice(0, days);
        const count = history.length || 1; // avoid division by zero

        // Initialize sums
        const stats = {
            energy: 0,
            motivation: 0,
            sleep: { hours: 0, quality: 0 },
            habits: {
                meditation: 0,
                sun: 0,
                running: 0,
                coldShower: 0,
                goodFats: 0
            },
            protein: 0
        };

        // Sum up data
        history.forEach(entry => {
            if (entry.energy) stats.energy += parseInt(entry.energy);
            if (entry.motivation) stats.motivation += parseInt(entry.motivation);

            if (entry.sleep) {
                if (entry.sleep.hours) stats.sleep.hours += parseFloat(entry.sleep.hours);
                if (entry.sleep.quality) stats.sleep.quality += parseInt(entry.sleep.quality);
            }

            if (entry.meditation?.did) stats.habits.meditation++;
            if (entry.sun?.did) stats.habits.sun++;
            if (entry.running?.did) stats.habits.running++; // deprecated field support if any
            if (entry.coldHeat?.coldShower) stats.habits.coldShower++;
            if (entry.nutrition?.goodFats) stats.habits.goodFats++;
            if (entry.nutrition?.protein) stats.protein += parseInt(entry.nutrition.protein);
        });

        // Calculate averages
        return {
            daysAnalyzed: count,
            avgEnergy: (stats.energy / count).toFixed(1),
            avgMotivation: (stats.motivation / count).toFixed(1),
            avgSleep: (stats.sleep.hours / count).toFixed(1),
            avgSleepQuality: (stats.sleep.quality / count).toFixed(1),
            avgProtein: Math.round(stats.protein / count),
            habitsCount: stats.habits
        };
    },
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
    const holistic = TrackingSystem.getHolisticStats(7); // Last 7 days stats

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
            <!-- Training Stats -->
            <div class="stat-card">
                <div class="stat-icon">🏋️</div>
                <div class="stat-info">
                    <h3>Treinos (Sem)</h3>
                    <p class="stat-value" id="weekWorkouts">${weekWorkouts.length}/5</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">🔥</div>
                <div class="stat-info">
                    <h3>Sequência</h3>
                    <p class="stat-value" id="currentStreak">${streak} dias</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-info">
                    <h3>Volume</h3>
                    <p class="stat-value" id="weekVolume">${Math.round(volume / 1000)}ton</p>
                </div>
            </div>
            
            <!-- Holistic Stats (NEW) -->
            <div class="stat-card">
                <div class="stat-icon">😴</div>
                <div class="stat-info">
                    <h3>Sono Médio</h3>
                    <p class="stat-value">${holistic.avgSleep}h <span style="font-size:0.7em">(${holistic.avgSleepQuality}/10)</span></p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">🥩</div>
                <div class="stat-info">
                    <h3>Proteína</h3>
                    <p class="stat-value">${holistic.avgProtein}g/dia</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">⚡</div>
                <div class="stat-info">
                    <h3>Energia</h3>
                    <p class="stat-value">${holistic.avgEnergy}/10</p>
                </div>
            </div>

            <!-- Habits Grid -->
            <div class="stat-card full-width habits-summary">
                <div class="stat-info" style="width:100%">
                    <h3>🧘 Hábitos (Últimos 7 dias)</h3>
                    <div class="habits-grid-display">
                        <div class="habit-item">
                            <span>🧘 Meditação</span>
                            <strong>${holistic.habitsCount.meditation}x</strong>
                        </div>
                        <div class="habit-item">
                            <span>🌅 Sol Matinal</span>
                            <strong>${holistic.habitsCount.sun}x</strong>
                        </div>
                        <div class="habit-item">
                            <span>🧊 Banho Gelado</span>
                            <strong>${holistic.habitsCount.coldShower}x</strong>
                        </div>
                        <div class="habit-item">
                            <span>🥑 Gorduras Boas</span>
                            <strong>${holistic.habitsCount.goodFats}x</strong>
                        </div>
                    </div>
                </div>
            </div>
            
             <!-- Milestones (Marcos) -->
            <div class="stat-card full-width">
               <div class="stat-info" style="width:100%">
                    <h3>🎯 Marcos e Metas</h3>
                    <div class="milestones-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;">
                        <div class="milestone-item" style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; text-align: center;">
                            <span style="display:block; color: var(--text-secondary); font-size: 0.8rem;">3 meses</span>
                            <strong style="color: var(--primary);">71-73kg</strong>
                        </div>
                        <div class="milestone-item" style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; text-align: center;">
                            <span style="display:block; color: var(--text-secondary); font-size: 0.8rem;">6 meses</span>
                            <strong style="color: var(--primary);">75-77kg</strong>
                        </div>
                        <div class="milestone-item" style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; text-align: center;">
                            <span style="display:block; color: var(--text-secondary); font-size: 0.8rem;">12 meses</span>
                            <strong style="color: var(--primary);">80-82kg</strong>
                        </div>
                         <div class="milestone-item highlight" style="background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); padding: 10px; border-radius: 8px; text-align: center;">
                            <span style="display:block; color: #fbbf24; font-size: 0.8rem;">18 meses</span>
                            <strong style="color: #fbbf24;">85-90kg 🔥</strong>
                        </div>
                    </div>
               </div>
            </div>

            <!-- Strength Goals -->
            <div class="stat-card full-width">
               <div class="stat-info" style="width:100%">
                    <h3>💪 Metas de Força (12 meses)</h3>
                    <div class="strength-goals-grid" style="display: grid; gap: 10px; margin-top: 10px;">
                         <div class="strength-card" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                            <span style="color: var(--text-secondary);">Agachamento</span>
                            <div>
                                <span style="font-size: 0.85rem; color: #666; margin-right: 5px;">Meta:</span>
                                <strong style="color: var(--primary);">145kg</strong>
                            </div>
                        </div>
                        <div class="strength-card" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                            <span style="color: var(--text-secondary);">Supino</span>
                             <div>
                                <span style="font-size: 0.85rem; color: #666; margin-right: 5px;">Meta:</span>
                                <strong style="color: var(--primary);">95kg</strong>
                            </div>
                        </div>
                        <div class="strength-card" style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--text-secondary);">Levantamento Terra</span>
                             <div>
                                <span style="font-size: 0.85rem; color: #666; margin-right: 5px;">Meta:</span>
                                <strong style="color: var(--primary);">165kg</strong>
                            </div>
                        </div>
                    </div>
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
            <button onclick="showWeeklyReport()" class="action-btn">📈 Relatório Detalhado</button>
            <button onclick="showProgressCharts()" class="action-btn">📊 Gráficos de Evolução</button>
        </div>
        
        <div class="quick-actions">
            <h3>💾 Dados</h3>
             <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                Total de treinos: <strong>${TrackingSystem.getTotalWorkouts()}</strong> | Check-ins: <strong>${TrackingSystem.holisticHistory.length}</strong>
            </p>
            <button onclick="TrackingSystem.exportData()" class="action-btn">📥 Backup</button>
            <button onclick="importBackup()" class="action-btn">📤 Restaurar</button>
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
    // Try to recover from backup if needed
    TrackingSystem.tryRecoverFromBackup();

    // Update stats
    TrackingSystem.updateStats();

    // Check backup status
    const backupDate = localStorage.getItem('lastBackupDate');
    if (backupDate) {
        const daysOld = Math.floor((new Date() - new Date(backupDate)) / (1000 * 60 * 60 * 24));
        console.log(`📦 Último backup: ${daysOld} dia(s) atrás`);
    }
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
