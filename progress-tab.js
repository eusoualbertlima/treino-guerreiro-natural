// Progress tab for workout evolution
const ProgressTab = {
    toNumber(value) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
    },

    getExerciseSets(exercise) {
        if (!exercise) return [];

        if (window.ConsciousTraining && typeof ConsciousTraining.extractLoggedSets === 'function') {
            return ConsciousTraining.extractLoggedSets(exercise)
                .filter(set => set.completed && (set.weight > 0 || set.reps > 0));
        }

        if (Array.isArray(exercise.sets)) {
            return exercise.sets.map(set => ({
                weight: this.toNumber(set?.weight),
                reps: this.toNumber(set?.reps),
                completed: set?.completed === true || this.toNumber(set?.weight) > 0 || this.toNumber(set?.reps) > 0
            })).filter(set => set.completed && (set.weight > 0 || set.reps > 0));
        }

        const weight = this.toNumber(exercise.weight);
        const reps = this.toNumber(exercise.reps);
        if (weight > 0 || reps > 0) {
            return [{ weight, reps, completed: true }];
        }

        return [];
    },

    getWorkoutVolume(workout) {
        const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
        return exercises.reduce((sum, exercise) => {
            const sets = this.getExerciseSets(exercise);
            return sum + sets.reduce((setSum, set) => setSum + (set.weight * set.reps), 0);
        }, 0);
    },

    getTrainedDates(workouts) {
        const dates = new Set();
        workouts.forEach(workout => {
            if (workout?.date) dates.add(workout.date);
        });
        return [...dates].sort((a, b) => new Date(b) - new Date(a));
    },

    getStreak(workouts) {
        const trainedDates = this.getTrainedDates(workouts);
        if (trainedDates.length === 0) return 0;

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (const dateStr of trainedDates) {
            const workoutDate = new Date(dateStr);
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

    getWorkoutsLastDays(workouts, days = 30) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - (days - 1));

        return workouts.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= start;
        });
    },

    buildExerciseStats(workouts) {
        const ascending = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
        const map = new Map();

        ascending.forEach(workout => {
            const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
            exercises.forEach(exercise => {
                const exerciseName = (window.ConsciousTraining?.extractExerciseName?.(exercise) || exercise?.name || '').trim();
                if (!exerciseName) return;

                const sets = this.getExerciseSets(exercise);
                if (sets.length === 0) return;

                const key = window.ConsciousTraining?.normalizeText?.(exerciseName) || exerciseName.toLowerCase();
                const topWeight = Math.max(...sets.map(set => set.weight || 0));
                const avgReps = Math.round(sets.reduce((sum, set) => sum + (set.reps || 0), 0) / sets.length);
                const volume = sets.reduce((sum, set) => sum + ((set.weight || 0) * (set.reps || 0)), 0);

                if (!map.has(key)) {
                    map.set(key, { name: exerciseName, entries: [] });
                }

                map.get(key).entries.push({
                    date: workout.date,
                    topWeight,
                    avgReps,
                    volume
                });
            });
        });

        const stats = [];
        map.forEach((item, key) => {
            if (item.entries.length === 0) return;

            const latest = item.entries[item.entries.length - 1];
            const previous = item.entries.length > 1 ? item.entries[item.entries.length - 2] : null;
            const bestWeight = Math.max(...item.entries.map(entry => entry.topWeight || 0));
            const deltaWeight = previous ? latest.topWeight - previous.topWeight : 0;

            stats.push({
                key,
                name: item.name,
                entries: item.entries,
                latest,
                previous,
                bestWeight,
                deltaWeight
            });
        });

        return stats.sort((a, b) => new Date(b.latest.date) - new Date(a.latest.date));
    },

    formatDate(dateStr) {
        const parsed = new Date(dateStr);
        if (Number.isNaN(parsed.getTime())) return dateStr;
        return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    },

    getWorkoutLabel(workout) {
        if (workout?.workoutType) return workout.workoutType;
        if (workout?.day) return workout.day;
        if (workout?.name) return workout.name;
        if (workout?.id) return workout.id;
        return 'Treino';
    },

    renderSummaryCards(workouts) {
        const workouts30 = this.getWorkoutsLastDays(workouts, 30);
        const volume30 = workouts30.reduce((sum, workout) => sum + this.getWorkoutVolume(workout), 0);
        const streak = this.getStreak(workouts);
        const trainedDates30 = this.getTrainedDates(workouts30).length;

        return `
            <div class="progress-cards">
                <div class="progress-card">
                    <span class="progress-card-label">Treinos (30d)</span>
                    <strong>${workouts30.length}</strong>
                </div>
                <div class="progress-card">
                    <span class="progress-card-label">Dias Ativos (30d)</span>
                    <strong>${trainedDates30}</strong>
                </div>
                <div class="progress-card">
                    <span class="progress-card-label">Volume (30d)</span>
                    <strong>${Math.round(volume30 / 1000)} ton</strong>
                </div>
                <div class="progress-card">
                    <span class="progress-card-label">Sequência</span>
                    <strong>${streak} dia(s)</strong>
                </div>
            </div>
        `;
    },

    renderExerciseEvolution(workouts) {
        const stats = this.buildExerciseStats(workouts);
        if (stats.length === 0) {
            return `
                <div class="progress-empty">
                    <p>Sem histórico suficiente por exercício ainda.</p>
                </div>
            `;
        }

        return `
            <div class="progress-section-card">
                <h3>📈 Evolução por Exercício</h3>
                <div class="exercise-evolution-list">
                    ${stats.slice(0, 12).map(stat => {
            const trendClass = stat.deltaWeight > 0 ? 'up' : stat.deltaWeight < 0 ? 'down' : 'flat';
            const trendLabel = stat.deltaWeight > 0
                ? `+${stat.deltaWeight}kg`
                : stat.deltaWeight < 0
                    ? `${stat.deltaWeight}kg`
                    : '0kg';

            const bestPct = stat.bestWeight > 0
                ? Math.max(8, Math.min(100, Math.round((stat.latest.topWeight / stat.bestWeight) * 100)))
                : 8;

            return `
                            <div class="exercise-evolution-item">
                                <div class="exercise-evolution-head">
                                    <strong>${stat.name}</strong>
                                    <span>${this.formatDate(stat.latest.date)}</span>
                                </div>
                                <div class="exercise-evolution-metrics">
                                    <span>Último topo: <strong>${stat.latest.topWeight}kg</strong></span>
                                    <span>Tendência: <strong class="${trendClass}">${trendLabel}</strong></span>
                                    <span>Média reps: <strong>${stat.latest.avgReps}</strong></span>
                                </div>
                                <div class="exercise-progress-bar">
                                    <div class="exercise-progress-fill" style="width:${bestPct}%"></div>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    },

    renderRecentWorkouts(workouts) {
        const list = workouts.slice(0, 12);
        if (list.length === 0) {
            return '';
        }

        return `
            <div class="progress-section-card">
                <h3>🗂️ Últimos Treinos</h3>
                <div class="recent-workouts-list">
                    ${list.map(workout => {
            const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
            const volume = this.getWorkoutVolume(workout);
            return `
                            <div class="recent-workout-item">
                                <div>
                                    <strong>${this.getWorkoutLabel(workout)}</strong>
                                    <p>${this.formatDate(workout.date)} • ${exercises.length} exercícios</p>
                                </div>
                                <span>${Math.round(volume)} kg-reps</span>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    },

    render(workouts) {
        if (!workouts || workouts.length === 0) {
            return `
                <div class="progress-tab">
                    <div class="progress-empty">
                        <h3>Sem dados ainda</h3>
                        <p>Complete seu primeiro treino para visualizar evolução.</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="progress-tab">
                <h2>📊 Progresso de Treino</h2>
                <p class="progress-subtitle">Histórico consolidado (nuvem + local)</p>
                ${this.renderSummaryCards(workouts)}
                ${this.renderExerciseEvolution(workouts)}
                ${this.renderRecentWorkouts(workouts)}
            </div>
        `;
    },

    async init() {
        const container = document.getElementById('progress-content');
        if (!container) return;

        container.innerHTML = `
            <div class="progress-loading">
                <p>Carregando evolução...</p>
            </div>
        `;

        if (!window.ConsciousTraining) {
            container.innerHTML = `
                <div class="progress-empty">
                    <p>Módulo de treino não encontrado.</p>
                </div>
            `;
            return;
        }

        await ConsciousTraining.init();
        const workouts = ConsciousTraining.getMergedWorkouts()
            .filter(workout => Array.isArray(workout.exercises) && workout.exercises.length > 0);

        container.innerHTML = this.render(workouts);
    }
};

window.initProgressTab = function () {
    ProgressTab.init();
};
