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
    recentWorkouts: [],

    // Metas calibradas automaticamente conforme frequência real de treino
    weeklyVolumeTargets: {
        chest_upper: 7,
        chest_mid: 8,
        chest_lower: 5,
        back_width: 8,
        back_thickness: 8,
        lower_back: 4,
        shoulders_front: 5,
        shoulders_lateral: 8,
        shoulders_rear: 6,
        biceps: 8,
        triceps: 8,
        quads: 11,
        hamstrings: 10,
        glutes: 10,
        calves: 10,
        core: 7
    },

    goalProfiles: {
        defaultProfile: 'hypertrophy_5x',
        profiles: {
            hypertrophy_4x: {
                label: 'Hipertrofia Natural 4x',
                targets: {
                    chest_upper: 5,
                    chest_mid: 6,
                    chest_lower: 4,
                    back_width: 6,
                    back_thickness: 6,
                    lower_back: 3,
                    shoulders_front: 4,
                    shoulders_lateral: 6,
                    shoulders_rear: 5,
                    biceps: 6,
                    triceps: 6,
                    quads: 9,
                    hamstrings: 8,
                    glutes: 8,
                    calves: 8,
                    core: 6
                }
            },
            hypertrophy_5x: {
                label: 'Hipertrofia Natural 5x',
                targets: {
                    chest_upper: 7,
                    chest_mid: 8,
                    chest_lower: 5,
                    back_width: 8,
                    back_thickness: 8,
                    lower_back: 4,
                    shoulders_front: 5,
                    shoulders_lateral: 8,
                    shoulders_rear: 6,
                    biceps: 8,
                    triceps: 8,
                    quads: 11,
                    hamstrings: 10,
                    glutes: 10,
                    calves: 10,
                    core: 7
                }
            },
            hypertrophy_6x: {
                label: 'Hipertrofia Natural 6x',
                targets: {
                    chest_upper: 9,
                    chest_mid: 10,
                    chest_lower: 6,
                    back_width: 10,
                    back_thickness: 10,
                    lower_back: 5,
                    shoulders_front: 6,
                    shoulders_lateral: 10,
                    shoulders_rear: 8,
                    biceps: 10,
                    triceps: 10,
                    quads: 13,
                    hamstrings: 12,
                    glutes: 12,
                    calves: 12,
                    core: 9
                }
            }
        }
    },

    activeVolumeProfile: {
        key: 'hypertrophy_5x',
        label: 'Hipertrofia Natural 5x',
        density: null
    },

    partDisplayNames: {
        chest_upper: 'Peito Superior',
        chest_mid: 'Peito Médio',
        chest_lower: 'Peito Inferior',
        back_width: 'Costas Largura',
        back_thickness: 'Costas Espessura',
        lower_back: 'Lombar',
        shoulders_front: 'Ombro Frontal',
        shoulders_lateral: 'Ombro Lateral',
        shoulders_rear: 'Ombro Posterior',
        biceps: 'Bíceps',
        triceps: 'Tríceps',
        quads: 'Quadríceps',
        hamstrings: 'Posterior',
        glutes: 'Glúteos',
        calves: 'Panturrilha',
        core: 'Core'
    },

    partRules: [
        { part: 'chest_upper', keywords: ['supino inclinado', 'inclinado', 'crucifixo inclinado'] },
        { part: 'chest_mid', keywords: ['supino reto', 'peck deck', 'crucifixo', 'crossover', 'flexao'] },
        { part: 'chest_lower', keywords: ['supino declinado', 'declinado', 'mergulho', 'dips', 'flexao diamante'] },
        { part: 'back_width', keywords: ['barra fixa', 'puxada', 'pulldown', 'pullover'] },
        { part: 'back_thickness', keywords: ['remada', 'cavalinho', 'serrote'] },
        { part: 'lower_back', keywords: ['hiperextensao', 'lombar', 'terra', 'levantamento terra'] },
        { part: 'shoulders_front', keywords: ['desenvolvimento', 'arnold press', 'elevacao frontal'] },
        { part: 'shoulders_lateral', keywords: ['elevacao lateral'] },
        { part: 'shoulders_rear', keywords: ['face pull', 'ombro posterior', 'posterior ombro', 'crucifixo invertido'] },
        { part: 'biceps', keywords: ['rosca', 'biceps'] },
        { part: 'triceps', keywords: ['triceps', 'pulley', 'frances', 'testa', 'coice'] },
        { part: 'quads', keywords: ['agachamento', 'hack squat', 'hack', 'leg press', 'extensora', 'sissy', 'afundo', 'passada'] },
        { part: 'hamstrings', keywords: ['stiff', 'romeno', 'flexora', 'posterior', 'mesa flexora'] },
        { part: 'glutes', keywords: ['hip thrust', 'gluteo', 'afundo', 'passada', 'agachamento'] },
        { part: 'calves', keywords: ['panturrilha', 'soleo'] },
        { part: 'core', keywords: ['prancha', 'abdominal', 'core', 'obliquos', 'elevacao de pernas'] }
    ],

    boosterLibrary: {
        chest_upper: { name: 'Supino Inclinado (Booster)', muscle: 'Peito Superior', sets: '2', reps: '10-12', tip: 'Booster para fechar meta semanal de peito superior.' },
        chest_mid: { name: 'Crossover (Booster)', muscle: 'Peito Médio', sets: '2', reps: '12-15', tip: 'Booster para reforçar peitoral na semana.' },
        chest_lower: { name: 'Mergulho (Booster)', muscle: 'Peito Inferior/Tríceps', sets: '2', reps: '8-12', tip: 'Booster para peitoral inferior.' },
        back_width: { name: 'Puxada Frontal (Booster)', muscle: 'Dorsais', sets: '2', reps: '10-12', tip: 'Booster para aumentar largura de costas.' },
        back_thickness: { name: 'Remada Baixa (Booster)', muscle: 'Costas/Espessura', sets: '2', reps: '10-12', tip: 'Booster para espessura de costas.' },
        shoulders_lateral: { name: 'Elevação Lateral (Booster)', muscle: 'Ombro Lateral', sets: '2', reps: '15-20', tip: 'Booster para deltoide lateral.' },
        shoulders_rear: { name: 'Face Pull (Booster)', muscle: 'Ombro Posterior', sets: '2', reps: '15-20', tip: 'Booster para estabilidade e ombro posterior.' },
        triceps: { name: 'Tríceps Corda (Booster)', muscle: 'Tríceps', sets: '2', reps: '12-15', tip: 'Booster para fechar volume de tríceps.' },
        biceps: { name: 'Rosca Alternada (Booster)', muscle: 'Bíceps', sets: '2', reps: '10-12', tip: 'Booster para volume de bíceps.' },
        quads: { name: 'Cadeira Extensora (Booster)', muscle: 'Quadríceps', sets: '2', reps: '12-15', tip: 'Booster para quadríceps.' },
        hamstrings: { name: 'Cadeira Flexora (Booster)', muscle: 'Posterior', sets: '2', reps: '10-12', tip: 'Booster para posterior de coxa.' },
        glutes: { name: 'Hip Thrust (Booster)', muscle: 'Glúteos', sets: '2', reps: '12-15', tip: 'Booster para glúteos.' },
        calves: { name: 'Panturrilha em Pé (Booster)', muscle: 'Panturrilha', sets: '2', reps: '15-20', tip: 'Booster para panturrilhas.' },
        core: { name: 'Prancha + Elevação de Pernas (Booster)', muscle: 'Core', sets: '2', reps: '30-45s', tip: 'Booster para estabilidade do core.' }
    },

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

    normalizeText(text) {
        return String(text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    },

    parseSets(setsValue) {
        if (typeof setsValue === 'number') return setsValue;
        const raw = this.normalizeText(setsValue);
        if (!raw) return 1;

        const range = raw.match(/(\d+)\s*-\s*(\d+)/);
        if (range) {
            const min = parseInt(range[1], 10);
            const max = parseInt(range[2], 10);
            return Math.max(1, Math.round((min + max) / 2));
        }

        const first = raw.match(/\d+/);
        return first ? Math.max(1, parseInt(first[0], 10)) : 1;
    },

    parseRepsRange(repsValue) {
        const raw = this.normalizeText(repsValue);
        if (!raw) return null;

        const numbers = raw.match(/\d+/g);
        if (!numbers || numbers.length === 0) return null;

        const first = parseInt(numbers[0], 10);
        const second = numbers.length > 1 ? parseInt(numbers[1], 10) : first;
        const min = Math.min(first, second);
        const max = Math.max(first, second);

        return { min, max };
    },

    toNumber(value) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : 0;
    },

    getExerciseLoadIncrement(exerciseName = '', muscleHint = '') {
        const normalized = `${this.normalizeText(exerciseName)} ${this.normalizeText(muscleHint)}`;
        const lowerBodyKeywords = [
            'agach',
            'leg press',
            'terra',
            'stiff',
            'panturrilha',
            'cadeira extensora',
            'flexora',
            'hip thrust',
            'afundo',
            'passada'
        ];

        return lowerBodyKeywords.some(keyword => normalized.includes(keyword)) ? 5 : 2.5;
    },

    extractLoggedSets(exerciseLog) {
        if (!exerciseLog) return [];

        if (Array.isArray(exerciseLog.sets)) {
            return exerciseLog.sets.map((set, index) => ({
                setNumber: set?.setNumber || index + 1,
                weight: this.toNumber(set?.weight),
                reps: this.toNumber(set?.reps),
                completed: typeof set?.completed === 'boolean'
                    ? set.completed
                    : (this.toNumber(set?.weight) > 0 || this.toNumber(set?.reps) > 0)
            })).filter(set => set.weight > 0 || set.reps > 0 || set.completed);
        }

        const weight = this.toNumber(exerciseLog.weight);
        const reps = this.toNumber(exerciseLog.reps);
        if (weight > 0 || reps > 0) {
            return [{ setNumber: 1, weight, reps, completed: true }];
        }

        return [];
    },

    getLatestExerciseLog(exerciseName, muscleHint = '') {
        const normalizedTarget = this.normalizeText(exerciseName);
        if (!normalizedTarget) return null;

        const workouts = this.getMergedWorkouts();

        for (const workout of workouts) {
            const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
            for (const exercise of exercises) {
                const currentName = this.extractExerciseName(exercise);
                const normalizedName = this.normalizeText(currentName);
                if (normalizedName !== normalizedTarget) continue;

                const sets = this.extractLoggedSets(exercise)
                    .filter(set => set.completed && (set.weight > 0 || set.reps > 0));
                if (sets.length === 0) continue;

                const maxWeight = Math.max(...sets.map(set => set.weight || 0));
                const avgReps = Math.round(sets.reduce((sum, set) => sum + (set.reps || 0), 0) / sets.length);
                const totalVolume = sets.reduce((sum, set) => sum + ((set.weight || 0) * (set.reps || 0)), 0);

                return {
                    date: workout.date,
                    workoutId: workout.id || workout.day || '',
                    exerciseName: currentName,
                    muscle: exercise?.muscle || muscleHint || '',
                    sets,
                    maxWeight,
                    avgReps,
                    totalVolume
                };
            }
        }

        return null;
    },

    getProgressionSuggestion(exerciseName, targetReps, muscleHint = '') {
        const latest = this.getLatestExerciseLog(exerciseName, muscleHint);
        if (!latest) return null;

        const repsRange = this.parseRepsRange(targetReps);
        const increment = this.getExerciseLoadIncrement(exerciseName, muscleHint);
        let action = 'maintain';
        let suggestedWeight = latest.maxWeight;

        if (repsRange) {
            if (latest.avgReps >= repsRange.max) {
                action = 'increase';
                suggestedWeight = latest.maxWeight + increment;
            } else if (latest.avgReps < repsRange.min - 1) {
                action = 'repeat';
                suggestedWeight = latest.maxWeight;
            }
        }

        const recommendationLabel = action === 'increase'
            ? `Subir para ${suggestedWeight}kg`
            : action === 'repeat'
                ? `Repetir ${suggestedWeight}kg`
                : `Manter ${suggestedWeight}kg`;

        return {
            action,
            suggestedWeight,
            increment,
            repsRange,
            recommendationLabel,
            latest
        };
    },

    formatDisplayDate(dateStr) {
        if (!dateStr) return '';
        const parsed = new Date(dateStr);
        if (Number.isNaN(parsed.getTime())) return dateStr;
        return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    },

    getWeekStartDate(referenceDate = new Date()) {
        const start = new Date(referenceDate);
        start.setHours(0, 0, 0, 0);
        const day = start.getDay(); // 0=domingo
        const offset = day === 0 ? -6 : 1 - day; // segunda como início
        start.setDate(start.getDate() + offset);
        return start;
    },

    getMergedWorkouts() {
        const trackingLogs = typeof TrackingSystem !== 'undefined'
            ? TrackingSystem.getWorkoutHistory()
            : [];

        const syncLogs = Array.isArray(this.recentWorkouts) ? this.recentWorkouts : [];
        const merged = [];
        const seen = new Set();

        [...trackingLogs, ...syncLogs].forEach(workout => {
            if (!workout || !workout.date) return;

            const workoutDate = new Date(workout.date);
            if (Number.isNaN(workoutDate.getTime())) return;

            const workoutType = workout.workoutType || workout.day || '';
            const exerciseSignature = Array.isArray(workout.exercises)
                ? workout.exercises
                    .map(exercise => this.normalizeText(this.extractExerciseName(exercise)))
                    .filter(Boolean)
                    .slice(0, 8)
                    .join('|')
                : '';
            const key = [
                workout.date,
                workoutType,
                Array.isArray(workout.exercises) ? workout.exercises.length : 0,
                exerciseSignature
            ].join('|');

            if (seen.has(key)) return;
            seen.add(key);
            merged.push(workout);
        });

        return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getWorkoutsInRange(startDate, endDateExclusive) {
        return this.getMergedWorkouts().filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= startDate && workoutDate < endDateExclusive;
        });
    },

    getRecentTrainingDensity(daysWindow = 28) {
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const start = new Date(end);
        start.setDate(start.getDate() - (daysWindow - 1));
        start.setHours(0, 0, 0, 0);

        const endExclusive = new Date(end);
        endExclusive.setDate(endExclusive.getDate() + 1);
        endExclusive.setHours(0, 0, 0, 0);

        const workouts = this.getWorkoutsInRange(start, endExclusive);
        const trainedDates = new Set();

        workouts.forEach(workout => {
            const hasExercises = Array.isArray(workout.exercises) && workout.exercises.length > 0;
            if (hasExercises) {
                trainedDates.add(workout.date);
            }
        });

        const weeks = Math.max(1, daysWindow / 7);
        const density = trainedDates.size / weeks;
        return Math.round(density * 10) / 10;
    },

    calibrateWeeklyTargets() {
        const density = this.getRecentTrainingDensity(28);
        const defaultKey = this.goalProfiles.defaultProfile;

        let profileKey = defaultKey;
        if (density >= 5.2) {
            profileKey = 'hypertrophy_6x';
        } else if (density > 0 && density < 4.2) {
            profileKey = 'hypertrophy_4x';
        }

        const profile = this.goalProfiles.profiles[profileKey] || this.goalProfiles.profiles[defaultKey];
        if (!profile || !profile.targets) return;

        this.weeklyVolumeTargets = { ...profile.targets };
        this.activeVolumeProfile = {
            key: profileKey,
            label: profile.label,
            density: density > 0 ? density : null
        };
    },

    extractExerciseName(exerciseLog) {
        return exerciseLog?.name || exerciseLog?.exerciseName || '';
    },

    extractExerciseSets(exerciseLog) {
        if (!exerciseLog) return 0;
        if (Array.isArray(exerciseLog.sets)) {
            const completed = this.extractLoggedSets(exerciseLog)
                .filter(set => set.completed && (set.weight > 0 || set.reps > 0));
            return completed.length;
        }
        if (typeof exerciseLog.sets === 'number' || typeof exerciseLog.sets === 'string') {
            return this.parseSets(exerciseLog.sets);
        }
        if (exerciseLog.setsPlanned) return this.parseSets(exerciseLog.setsPlanned);
        if (exerciseLog.weight || exerciseLog.reps) return 1;
        return 0;
    },

    mapExerciseToParts(exerciseName, muscleHint = '') {
        const normalized = `${this.normalizeText(exerciseName)} ${this.normalizeText(muscleHint)}`;
        if (!normalized.trim()) return [];

        const parts = new Set();
        this.partRules.forEach(rule => {
            if (rule.keywords.some(keyword => normalized.includes(this.normalizeText(keyword)))) {
                parts.add(rule.part);
            }
        });

        // Fallback rápido por grupo muscular genérico
        if (parts.size === 0) {
            if (normalized.includes('peito')) parts.add('chest_mid');
            if (normalized.includes('costa') || normalized.includes('dorsal')) parts.add('back_thickness');
            if (normalized.includes('ombro')) parts.add('shoulders_lateral');
            if (normalized.includes('triceps')) parts.add('triceps');
            if (normalized.includes('biceps')) parts.add('biceps');
            if (normalized.includes('quadriceps')) parts.add('quads');
            if (normalized.includes('posterior')) parts.add('hamstrings');
            if (normalized.includes('gluteo')) parts.add('glutes');
            if (normalized.includes('panturrilha') || normalized.includes('soleo')) parts.add('calves');
            if (normalized.includes('core') || normalized.includes('abdomen')) parts.add('core');
        }

        return [...parts];
    },

    getCurrentWeekWorkouts() {
        const start = this.getWeekStartDate();
        const end = new Date(start);
        end.setDate(end.getDate() + 7);
        return this.getWorkoutsInRange(start, end);
    },

    getWeeklyPartCoverage() {
        const partState = {};
        Object.entries(this.weeklyVolumeTargets).forEach(([part, target]) => {
            partState[part] = {
                target,
                done: 0
            };
        });

        const workouts = this.getCurrentWeekWorkouts();
        workouts.forEach(workout => {
            const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
            exercises.forEach(exercise => {
                const name = this.extractExerciseName(exercise);
                const sets = this.extractExerciseSets(exercise);
                if (!name || sets <= 0) return;

                const parts = this.mapExerciseToParts(name, exercise?.muscle || exercise?.target || '');
                if (parts.length === 0) return;

                const perPartSets = sets / parts.length;
                parts.forEach(part => {
                    if (partState[part]) {
                        partState[part].done += perPartSets;
                    }
                });
            });
        });

        const byPart = Object.entries(partState).map(([part, data]) => {
            const done = Math.round(data.done * 10) / 10;
            const deficit = Math.max(0, Math.round((data.target - done) * 10) / 10);
            const ratio = data.target > 0 ? done / data.target : 1;
            return {
                part,
                label: this.partDisplayNames[part] || part,
                target: data.target,
                done,
                deficit,
                ratio,
                status: ratio >= 1 ? 'ok' : ratio >= 0.7 ? 'warn' : 'low'
            };
        }).sort((a, b) => b.deficit - a.deficit);

        return {
            byPart,
            topDeficits: byPart.filter(item => item.deficit > 0).slice(0, 4),
            calibration: this.activeVolumeProfile
        };
    },

    rebalanceWorkoutForCoverage(workout, weeklyCoverage) {
        if (!workout || workout.isRest || !Array.isArray(workout.exercises)) {
            return workout;
        }

        const deficitMap = {};
        (weeklyCoverage?.byPart || []).forEach(item => {
            deficitMap[item.part] = item.deficit || 0;
        });

        const rebalanced = {
            ...workout,
            exercises: workout.exercises.map(ex => {
                const parts = this.mapExerciseToParts(ex.name, ex.muscle || ex.target || '');
                const priorityScore = parts.reduce((sum, part) => sum + (deficitMap[part] || 0), 0);
                return { ...ex, parts, priorityScore };
            })
        };

        rebalanced.exercises = rebalanced.exercises
            .map((exercise, index) => ({ ...exercise, originalIndex: index }))
            .sort((a, b) => {
                if (b.priorityScore !== a.priorityScore) {
                    return b.priorityScore - a.priorityScore;
                }
                return a.originalIndex - b.originalIndex;
            })
            .map(({ originalIndex, ...exercise }) => exercise);

        const priorityParts = [];
        rebalanced.exercises.forEach(exercise => {
            (exercise.parts || []).forEach(part => {
                if ((deficitMap[part] || 0) > 0 && !priorityParts.includes(part)) {
                    priorityParts.push(part);
                }
            });
        });

        rebalanced.priorityParts = priorityParts.slice(0, 3).map(part => ({
            part,
            label: this.partDisplayNames[part] || part,
            deficit: deficitMap[part]
        }));

        const topGap = rebalanced.priorityParts[0];
        if (topGap && topGap.deficit >= 3) {
            const partExerciseCount = rebalanced.exercises.filter(ex => (ex.parts || []).includes(topGap.part)).length;
            const booster = this.boosterLibrary[topGap.part];
            if (booster && partExerciseCount <= 1) {
                rebalanced.exercises.push({
                    ...booster,
                    isBooster: true,
                    parts: [topGap.part],
                    priorityScore: topGap.deficit
                });
                rebalanced.volumeNote = `🎯 Booster adicionado para ${topGap.label} (déficit semanal de ${topGap.deficit} séries).`;
            }
        }

        return rebalanced;
    },

    // Inicializar
    async init() {
        const trackingHistory = typeof TrackingSystem !== 'undefined'
            ? TrackingSystem.getWorkoutHistory()
            : [];

        // Carregar último treino do storage/cloud
        if (window.DataSync) {
            const workouts = await DataSync.getWorkouts();
            this.recentWorkouts = Array.isArray(workouts) ? workouts : [];
            this.lastWorkout = this.recentWorkouts.length > 0 ? this.recentWorkouts[0] : null;
        }

        // Fallback local caso não haja dados da nuvem
        if (this.recentWorkouts.length === 0 && trackingHistory.length > 0) {
            this.recentWorkouts = [...trackingHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
            this.lastWorkout = this.recentWorkouts[0];
        }

        // Último fallback explícito no localStorage legado
        if (!this.lastWorkout) {
            const key = typeof TrackingSystem !== 'undefined'
                ? TrackingSystem.getStoreKey('lastWorkout')
                : 'lastWorkout';
            const stored = localStorage.getItem(key);
            if (stored) {
                this.lastWorkout = JSON.parse(stored);
                this.recentWorkouts = [this.lastWorkout];
            }
        }

        // Ajusta metas semanais pelo padrão real de treino das últimas semanas
        this.calibrateWeeklyTargets();

        return this;
    },

    // Verificar dias desde último treino (CORRIGIDO - usa histórico real)
    checkMissedDays() {
        const trackingHistory = typeof TrackingSystem !== 'undefined'
            ? TrackingSystem.getWorkoutHistory()
            : [];
        const history = [...trackingHistory, ...this.recentWorkouts].filter(workout => workout?.date);

        if (history.length === 0 && !this.lastWorkout) {
            return { status: 'first-time', days: 0 };
        }

        // Pegar data do treino mais recente do histórico
        let lastDate;
        if (history.length > 0) {
            const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
            lastDate = new Date(sorted[0].date);
        } else if (this.lastWorkout) {
            lastDate = new Date(this.lastWorkout.date);
        } else {
            return { status: 'first-time', days: 0 };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        lastDate.setHours(0, 0, 0, 0);

        const diffTime = today - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Domingo é dia de descanso programado, não conta como "faltou"
        const dayOfWeek = today.getDay();
        const isRestDay = dayOfWeek === 0; // Domingo

        if (diffDays === 0) return { status: 'trained-today', days: 0 };
        if (diffDays === 1) return { status: 'normal', days: 1 };
        if (diffDays === 2 && isRestDay) return { status: 'normal', days: 2 }; // Segunda após domingo
        if (diffDays === 2) return { status: 'reorganize', days: 2 };
        if (diffDays >= 3) return { status: 'gentle-return', days: diffDays };

        return { status: 'normal', days: diffDays };
    },

    // Obter treino do dia adaptado ao estado
    getTodayWorkout() {
        const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const todayKey = days[new Date().getDay()];

        let workout = this.weekProgram[todayKey]
            ? {
                ...this.weekProgram[todayKey],
                exercises: (this.weekProgram[todayKey].exercises || []).map(ex => ({ ...ex }))
            }
            : null;

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

        const weeklyCoverage = this.getWeeklyPartCoverage();
        if (workout && !workout.isRest) {
            workout = this.rebalanceWorkoutForCoverage(workout, weeklyCoverage);
        }

        const missedStatus = this.checkMissedDays();

        return {
            workout,
            day: todayKey,
            missedStatus,
            recommendation: this.getRecommendation(workout, missedStatus),
            weeklyCoverage
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
        const adapted = {
            ...workout,
            exercises: (workout.exercises || []).map(ex => ({ ...ex }))
        };

        const appendVolumeNote = (note) => {
            adapted.volumeNote = adapted.volumeNote
                ? `${adapted.volumeNote} ${note}`
                : note;
        };

        // Se energia baixa, reduz volume
        if (todayState.energy && todayState.energy <= 4) {
            appendVolumeNote('⚡ Energia baixa detectada. Volume reduzido.');
            adapted.exercises = adapted.exercises.slice(0, 4); // Menos exercícios
        }

        // Se corpo dolorido, sugere mobilidade
        if (todayState.bodyFeel === 'dolorido') {
            appendVolumeNote('🧘 Corpo pedindo recuperação. Considere mobilidade.');
            adapted.suggestAlternative = 'cardio_core';
        }

        // Se explosivo, pode ir mais pesado
        if (todayState.bodyFeel === 'explosivo') {
            appendVolumeNote('🔥 Energia alta! Aproveite para ir mais intenso.');
        }

        return adapted;
    },

    // Registrar treino completo
    async logWorkoutComplete(workoutId, exerciseLogs, overallFeel) {
        const today = new Date().toISOString().split('T')[0];
        const workoutLog = {
            id: workoutId,
            workoutType: workoutId,
            day: workoutId,
            date: today,
            exercises: exerciseLogs,
            overallFeel, // 'incrivel', 'bom', 'ok', 'ruim'
            timestamp: Date.now()
        };

        this.lastWorkout = workoutLog;
        this.recentWorkouts = [workoutLog, ...this.recentWorkouts]
            .slice(0, 120)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Salvar
        if (window.DataSync) {
            await DataSync.saveWorkout(workoutLog);
        }
        const key = typeof TrackingSystem !== 'undefined' ? TrackingSystem.getStoreKey('lastWorkout') : 'lastWorkout';
        localStorage.setItem(key, JSON.stringify(workoutLog));

        if (typeof TrackingSystem !== 'undefined' && typeof TrackingSystem.getWorkoutHistory === 'function') {
            const history = TrackingSystem.getWorkoutHistory();
            history.push({
                ...workoutLog,
                completed: true
            });
            localStorage.setItem(TrackingSystem.getStoreKey('workoutHistory'), JSON.stringify(history));
            if (typeof TrackingSystem.createAutoBackup === 'function') {
                TrackingSystem.createAutoBackup();
            }
            if (typeof TrackingSystem.updateStats === 'function') {
                TrackingSystem.updateStats();
            }
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
    const { workout, day, missedStatus, recommendation, weeklyCoverage } = ConsciousTraining.getTodayWorkout();
    const adaptedWorkout = ConsciousTraining.adaptWorkoutToState(workout, ConsciousTraining.todayState);

    renderConsciousWorkout(adaptedWorkout, recommendation, weeklyCoverage);
}

function renderWeeklyCoverageCard(workout, weeklyCoverage) {
    if (!weeklyCoverage || !Array.isArray(weeklyCoverage.byPart) || weeklyCoverage.byPart.length === 0) {
        return '';
    }

    const todayParts = new Set();
    (workout.exercises || []).forEach(exercise => {
        const parts = Array.isArray(exercise.parts)
            ? exercise.parts
            : ConsciousTraining.mapExerciseToParts(exercise.name, exercise.muscle || exercise.target || '');
        parts.forEach(part => todayParts.add(part));
    });

    const todayRows = weeklyCoverage.byPart
        .filter(item => todayParts.has(item.part))
        .sort((a, b) => b.deficit - a.deficit);

    const otherRows = weeklyCoverage.byPart
        .filter(item => !todayParts.has(item.part))
        .sort((a, b) => b.deficit - a.deficit);

    const selectedRows = [...todayRows.slice(0, 6), ...otherRows.slice(0, 2)];

    if (selectedRows.length === 0) return '';

    const calibration = weeklyCoverage.calibration || {};
    const densityInfo = calibration.density
        ? ` • ${calibration.density.toFixed(1)}x/sem (28d)`
        : '';
    const profileInfo = calibration.label || 'Metas por parte muscular';

    const priorityPartsHtml = (workout.priorityParts || []).length > 0
        ? `
            <div class="priority-parts">
                ${workout.priorityParts.map(item => `
                    <span class="priority-tag">${item.label}: -${item.deficit} séries</span>
                `).join('')}
            </div>
        `
        : '';

    return `
        <div class="weekly-coverage-card">
            <div class="weekly-coverage-header">
                <h3>📊 Cobertura Semanal</h3>
                <span>${profileInfo}${densityInfo}</span>
            </div>
            ${priorityPartsHtml}
            <div class="coverage-list">
                ${selectedRows.map(item => `
                    <div class="coverage-row ${item.status} ${todayParts.has(item.part) ? 'today-focus' : ''}">
                        <div class="coverage-row-head">
                            <span class="coverage-part">${item.label}${todayParts.has(item.part) ? ' • hoje' : ''}</span>
                            <span class="coverage-values">${item.done}/${item.target} séries</span>
                        </div>
                        <div class="coverage-bar">
                            <div class="coverage-fill ${item.status}" style="width: ${Math.min(Math.round(item.ratio * 100), 100)}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderExerciseProgressionCard(exercise, suggestion) {
    if (!suggestion || !suggestion.latest) {
        return `
            <div class="exercise-progression empty">
                <p>📌 Primeiro registro deste exercício. Foque em técnica e consistência.</p>
            </div>
        `;
    }

    const lastDate = ConsciousTraining.formatDisplayDate(suggestion.latest.date);
    return `
        <div class="exercise-progression ${suggestion.action}">
            <p class="exercise-progression-title">📈 Último registro (${lastDate})</p>
            <p class="exercise-progression-detail">Topo: ${suggestion.latest.maxWeight}kg • Média: ${suggestion.latest.avgReps} reps</p>
            <p class="exercise-progression-suggest">Sugestão: ${suggestion.recommendationLabel}</p>
        </div>
    `;
}

function renderExerciseSetInputs(exerciseIndex, exercise, plannedSets, suggestion) {
    const weightPlaceholder = suggestion?.suggestedWeight ? String(suggestion.suggestedWeight) : 'kg';
    const repsPlaceholder = exercise.reps || 'reps';

    return Array.from({ length: plannedSets }, (_, setIndex) => `
        <div class="set-input-row">
            <span class="set-chip">S${setIndex + 1}</span>
            <input
                type="number"
                step="0.5"
                class="conscious-input-weight conscious-set-input"
                id="conscious-weight-${exerciseIndex}-${setIndex}"
                placeholder="${weightPlaceholder}"
                oninput="saveTempWorkoutData()"
            >
            <input
                type="number"
                class="conscious-input-reps conscious-set-input"
                id="conscious-reps-${exerciseIndex}-${setIndex}"
                placeholder="${repsPlaceholder}"
                oninput="saveTempWorkoutData()"
            >
        </div>
    `).join('');
}

// Renderizar treino consciente
function renderConsciousWorkout(workout, recommendation, weeklyCoverage) {
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

    const weeklyCoverageHtml = renderWeeklyCoverageCard(workout, weeklyCoverage);

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

            ${weeklyCoverageHtml}
            
            ${workout.volumeNote ? `
                <div class="volume-note">
                    <p>${workout.volumeNote}</p>
                </div>
            ` : ''}
            
            <div class="exercises-list-conscious">
                ${workout.exercises.map((ex, i) => {
                    const plannedSets = ConsciousTraining.parseSets(ex.sets);
                    const suggestion = ConsciousTraining.getProgressionSuggestion(ex.name, ex.reps, ex.muscle || ex.target || '');
                    return `
                    <div class="exercise-card-conscious ${ex.isBooster ? 'booster' : ''}" data-index="${i}" data-planned-sets="${plannedSets}" data-muscle="${ex.muscle || ''}" data-exercise-name="${ex.name}">
                        <div class="exercise-main">
                            <span class="exercise-number">${i + 1}</span>
                            <div class="exercise-info">
                                <h4>${ex.name} ${ex.isBooster ? '<span class="booster-badge">Booster</span>' : ''}</h4>
                                <p class="exercise-muscle">${ex.muscle}</p>
                            </div>
                            <div class="exercise-sets">
                                <span>${ex.sets} séries</span>
                            </div>
                        </div>
                        <p class="exercise-tip">${ex.isBooster ? '🎯' : '💡'} ${ex.tip}</p>

                        ${renderExerciseProgressionCard(ex, suggestion)}

                        <div class="exercise-inputs">
                            <div class="exercise-inputs-header">
                                <label>Carga por Série (kg)</label>
                                <label>Reps por Série</label>
                            </div>
                            <div class="exercise-sets-grid">
                                ${renderExerciseSetInputs(i, ex, plannedSets, suggestion)}
                            </div>
                        </div>

                        <div class="exercise-feel" style="display: none; margin-top: 15px;">
                            <label>Como foi?</label>
                            <div class="feel-buttons">
                                <button onclick="logExerciseFeel(${i}, 'fraco')">😕 Fraco</button>
                                <button onclick="logExerciseFeel(${i}, 'ok')">😊 OK</button>
                                <button onclick="logExerciseFeel(${i}, 'bom')">💪 Bom</button>
                                <button onclick="logExerciseFeel(${i}, 'incrivel')">🔥 Incrível</button>
                            </div>
                        </div>
                        <button class="btn-done-exercise" onclick="markExerciseDone(${i})" style="margin-top: 15px; width: 100%; padding: 10px;">
                            ✅ Feito
                        </button>
                    </div>
                `;
                }).join('')}
            </div>
            
            <button class="btn btn-primary btn-lg" id="btnCompleteConsciousWorkout" 
                    onclick="completeConsciousWorkout('${workout.id}')" 
                    style="width: 100%; margin-top: 20px;">
                ✅ Completar Treino
            </button>
        </div>
    `;

    // Load any previously saved temporary data
    loadTempWorkoutData();
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
function clearExerciseLogs() {
    Object.keys(exerciseLogs).forEach(key => delete exerciseLogs[key]);
}

function logExerciseFeel(index, feel) {
    exerciseLogs[index] = { feel }; // Start object

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

    // Collect data from inputs
    const exerciseData = [];
    const cards = document.querySelectorAll('.exercise-card-conscious');

    cards.forEach((card, index) => {
        const name = card.dataset.exerciseName || card.querySelector('h4')?.textContent || 'Exercício';
        const plannedSets = parseInt(card.dataset.plannedSets || '1', 10);
        const muscle = card.dataset.muscle || card.querySelector('.exercise-muscle')?.textContent || '';
        const feel = exerciseLogs[index]?.feel || 'ok';
        const sets = [];

        for (let setIndex = 0; setIndex < plannedSets; setIndex++) {
            const weightInput = card.querySelector(`#conscious-weight-${index}-${setIndex}`)?.value || '';
            const repsInput = card.querySelector(`#conscious-reps-${index}-${setIndex}`)?.value || '';
            const weight = ConsciousTraining.toNumber(weightInput);
            const reps = ConsciousTraining.toNumber(repsInput);
            const hasData = weight > 0 || reps > 0;
            if (!hasData) continue;

            sets.push({
                setNumber: setIndex + 1,
                weight,
                reps,
                completed: true
            });
        }

        const topWeight = sets.length > 0 ? Math.max(...sets.map(set => set.weight || 0)) : 0;
        const totalReps = sets.reduce((sum, set) => sum + (set.reps || 0), 0);
        const totalVolume = sets.reduce((sum, set) => sum + ((set.weight || 0) * (set.reps || 0)), 0);

        exerciseData.push({
            name,
            muscle,
            setsPlanned: Number.isNaN(plannedSets) ? 1 : plannedSets,
            sets,
            weight: topWeight,
            reps: totalReps,
            totalVolume,
            feel
        });
    });

    await ConsciousTraining.logWorkoutComplete(workoutId, exerciseData, feelMap[overallFeel] || 'bom');

    // Clear temporary data after successful save
    clearTempWorkoutData();
    clearExerciseLogs();

    // Mostrar sucesso
    if (typeof showSuccess === 'function') {
        showSuccess('✅ Treino completado e registrado!');
    } else {
        alert('✅ Treino registrado!');
    }

    // Voltar para a tela inicial do treino
    setTimeout(() => {
        initConsciousTraining();
    }, 1500);
}

// Inicializar sistema de treino consciente
async function initConsciousTraining() {
    await ConsciousTraining.init();
    clearExerciseLogs();

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

// ===== Auto-Save Functions =====
const TEMP_WORKOUT_KEY = 'consc_temp_workout_data';

function saveTempWorkoutData() {
    const cards = document.querySelectorAll('.exercise-card-conscious');
    const tempData = {};
    const today = new Date().toISOString().split('T')[0];

    cards.forEach((card, index) => {
        const plannedSets = parseInt(card.dataset.plannedSets || '1', 10);
        const sets = [];
        let hasAnyData = false;

        for (let setIndex = 0; setIndex < plannedSets; setIndex++) {
            const weight = document.getElementById(`conscious-weight-${index}-${setIndex}`)?.value || '';
            const reps = document.getElementById(`conscious-reps-${index}-${setIndex}`)?.value || '';
            if (weight || reps) hasAnyData = true;
            sets.push({ weight, reps });
        }

        if (hasAnyData) {
            tempData[index] = { sets };
        }
    });

    const user = window.FirebaseAuth?.getCurrentUser();
    const key = user ? `labpessoal_${user.uid}_${TEMP_WORKOUT_KEY}` : TEMP_WORKOUT_KEY;
    localStorage.setItem(key, JSON.stringify({ date: today, data: tempData }));
    console.log('💾 Dados temporários salvos');
}

function loadTempWorkoutData() {
    const user = window.FirebaseAuth?.getCurrentUser();
    const key = user ? `labpessoal_${user.uid}_${TEMP_WORKOUT_KEY}` : TEMP_WORKOUT_KEY;
    const stored = localStorage.getItem(key);

    if (!stored) return;

    try {
        const { date, data } = JSON.parse(stored);
        const today = new Date().toISOString().split('T')[0];

        // Only restore if data is from today
        if (date !== today) {
            clearTempWorkoutData();
            return;
        }

        for (const [index, values] of Object.entries(data)) {
            if (Array.isArray(values?.sets)) {
                values.sets.forEach((setValues, setIndex) => {
                    const weightInput = document.getElementById(`conscious-weight-${index}-${setIndex}`);
                    const repsInput = document.getElementById(`conscious-reps-${index}-${setIndex}`);
                    if (weightInput && setValues?.weight) weightInput.value = setValues.weight;
                    if (repsInput && setValues?.reps) repsInput.value = setValues.reps;
                });
                continue;
            }

            // Compatibilidade com formato antigo (um campo por exercício)
            const legacyWeightInput = document.getElementById(`conscious-weight-${index}-0`);
            const legacyRepsInput = document.getElementById(`conscious-reps-${index}-0`);
            if (legacyWeightInput && values?.weight) legacyWeightInput.value = values.weight;
            if (legacyRepsInput && values?.reps) legacyRepsInput.value = values.reps;
        }
        console.log('✅ Dados temporários restaurados');
    } catch (e) {
        console.warn('Erro ao restaurar dados temporários:', e);
    }
}

function clearTempWorkoutData() {
    const user = window.FirebaseAuth?.getCurrentUser();
    const key = user ? `labpessoal_${user.uid}_${TEMP_WORKOUT_KEY}` : TEMP_WORKOUT_KEY;
    localStorage.removeItem(key);
    console.log('🧹 Dados temporários limpos');
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
window.saveTempWorkoutData = saveTempWorkoutData;
window.loadTempWorkoutData = loadTempWorkoutData;
window.clearTempWorkoutData = clearTempWorkoutData;

// Cleanup for logout
window.resetConsciousTraining = function () {
    ConsciousTraining.todayState = {
        bodyFeel: null,
        mindState: null,
        sleepQuality: null,
        energy: null,
        intuitionNote: ''
    };
    ConsciousTraining.lastWorkout = null;
    ConsciousTraining.recentWorkouts = [];
    const defaultProfileKey = ConsciousTraining.goalProfiles.defaultProfile;
    const defaultProfile = ConsciousTraining.goalProfiles.profiles[defaultProfileKey];
    if (defaultProfile?.targets) {
        ConsciousTraining.weeklyVolumeTargets = { ...defaultProfile.targets };
    }
    ConsciousTraining.activeVolumeProfile = {
        key: defaultProfileKey,
        label: defaultProfile?.label || 'Hipertrofia Natural 5x',
        density: null
    };
    clearTempWorkoutData();
    clearExerciseLogs();
    console.log('🧹 ConsciousTraining state cleared');
};
