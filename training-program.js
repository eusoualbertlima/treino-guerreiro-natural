// Complete Training Program for Ectomorph Mass Gain
// Albert: 68kg → 85kg goal
// Focus: Hypertrophy, hit every muscle, progressive overload

const TrainingProgram = {
    // User profile
    profile: {
        name: 'Albert',
        currentWeight: 68,
        goalWeight: 85,
        bodyType: 'ectomorfo',
        experience: 'intermediário',
        daysPerWeek: 4, // Default, can be 3-5
        goal: 'hipertrofia'
    },

    // Program structure: Upper/Lower Split (best for natural ectomorphs)
    // 4 days: Upper A, Lower A, Upper B, Lower B
    // Can also do 3 days with Full Body

    programs: {
        // 4-DAY UPPER/LOWER SPLIT
        upperLower4: {
            name: 'Upper/Lower 4x Semana',
            description: 'Split focado em hipertrofia para ectomorfos. Cada músculo 2x por semana.',
            daysPerWeek: 4,
            schedule: {
                seg: 'upperA',
                ter: 'lowerA',
                qua: 'rest',
                qui: 'upperB',
                sex: 'lowerB',
                sab: 'cardioLight',
                dom: 'rest'
            },
            workouts: {
                upperA: {
                    name: '💪 Upper A - Peito & Costas',
                    focus: 'Peito, Costas, Ombros, Bíceps, Tríceps',
                    duration: '60-75 min',
                    exercises: [
                        {
                            name: 'Supino Reto com Barra',
                            muscle: 'Peito',
                            sets: 4,
                            reps: '8-10',
                            rest: '2-3 min',
                            notes: 'Controle a descida (2-3s). Não trave os cotovelos no topo.',
                            progression: 'Adicione 2.5kg quando conseguir 4x10'
                        },
                        {
                            name: 'Remada Curvada',
                            muscle: 'Costas',
                            sets: 4,
                            reps: '8-10',
                            rest: '2-3 min',
                            notes: 'Puxe o cotovelo para trás, aperte as escápulas.',
                            progression: 'Foque na conexão mente-músculo'
                        },
                        {
                            name: 'Supino Inclinado com Halteres',
                            muscle: 'Peito Superior',
                            sets: 3,
                            reps: '10-12',
                            rest: '90s',
                            notes: 'Inclinação de 30-45 graus. Alongue bem na descida.'
                        },
                        {
                            name: 'Puxada Frontal',
                            muscle: 'Costas/Dorsais',
                            sets: 3,
                            reps: '10-12',
                            rest: '90s',
                            notes: 'Puxe até o queixo, curve levemente o tronco.'
                        },
                        {
                            name: 'Desenvolvimento com Halteres',
                            muscle: 'Ombros',
                            sets: 3,
                            reps: '10-12',
                            rest: '90s',
                            notes: 'Não deixe os halteres baterem no topo.'
                        },
                        {
                            name: 'Rosca Direta com Barra',
                            muscle: 'Bíceps',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s',
                            notes: 'Cotovelos fixos, sem balançar o corpo.'
                        },
                        {
                            name: 'Tríceps Pulley (Corda)',
                            muscle: 'Tríceps',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s',
                            notes: 'Abra a corda no final do movimento.'
                        },
                        {
                            name: 'Elevação Lateral',
                            muscle: 'Ombro Lateral',
                            sets: 3,
                            reps: '15-20',
                            rest: '45s',
                            notes: 'Peso leve, foco na contração. Polegar levemente para baixo.'
                        }
                    ]
                },
                lowerA: {
                    name: '🦵 Lower A - Quadríceps Focus',
                    focus: 'Quadríceps, Glúteos, Posterior, Panturrilha',
                    duration: '60-75 min',
                    exercises: [
                        {
                            name: 'Agachamento Livre',
                            muscle: 'Quadríceps/Glúteos',
                            sets: 4,
                            reps: '6-8',
                            rest: '3 min',
                            notes: 'Desça até paralelo ou abaixo. Core ativado.',
                            progression: 'Rei dos exercícios. Adicione 2.5kg por semana.'
                        },
                        {
                            name: 'Leg Press 45°',
                            muscle: 'Quadríceps',
                            sets: 4,
                            reps: '10-12',
                            rest: '2 min',
                            notes: 'Pés na largura dos ombros, meio da plataforma.'
                        },
                        {
                            name: 'Cadeira Extensora',
                            muscle: 'Quadríceps',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s',
                            notes: 'Segure no topo por 1s. Foco no vasto medial.'
                        },
                        {
                            name: 'Stiff (Levantamento Terra Romeno)',
                            muscle: 'Posterior/Glúteos',
                            sets: 4,
                            reps: '10-12',
                            rest: '2 min',
                            notes: 'Joelhos levemente flexionados. Sinta o alongar do posterior.'
                        },
                        {
                            name: 'Mesa Flexora',
                            muscle: 'Posterior',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s',
                            notes: 'Contração total no topo. Não use impulso.'
                        },
                        {
                            name: 'Panturrilha em Pé',
                            muscle: 'Panturrilha',
                            sets: 4,
                            reps: '15-20',
                            rest: '45s',
                            notes: 'Alongue bem embaixo, suba na ponta dos pés. Segure 1s no topo.'
                        },
                        {
                            name: 'Panturrilha Sentado',
                            muscle: 'Sóleo',
                            sets: 3,
                            reps: '15-20',
                            rest: '45s',
                            notes: 'Trabalha o sóleo. Essencial para panturrilhas completas.'
                        }
                    ]
                },
                upperB: {
                    name: '💪 Upper B - Costas & Ombros',
                    focus: 'Costas, Ombros, Peito, Bíceps, Tríceps',
                    duration: '60-75 min',
                    exercises: [
                        {
                            name: 'Barra Fixa (ou Graviton)',
                            muscle: 'Dorsais',
                            sets: 4,
                            reps: '6-10',
                            rest: '2-3 min',
                            notes: 'Pegada pronada, largura maior que ombros. Rei das costas.',
                            progression: 'Adicione peso quando fizer 4x10'
                        },
                        {
                            name: 'Remada Cavalinho',
                            muscle: 'Costas/Espessura',
                            sets: 4,
                            reps: '8-10',
                            rest: '2 min',
                            notes: 'Peito no apoio, puxe com os cotovelos.'
                        },
                        {
                            name: 'Supino Reto com Halteres',
                            muscle: 'Peito',
                            sets: 3,
                            reps: '10-12',
                            rest: '90s',
                            notes: 'Maior amplitude que barra. Ótimo para ativar peito.'
                        },
                        {
                            name: 'Crucifixo Inclinado',
                            muscle: 'Peito Superior',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s',
                            notes: 'Movimento de abraço. Cotovelos levemente flexionados.'
                        },
                        {
                            name: 'Elevação Frontal (Halteres)',
                            muscle: 'Ombro Frontal',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s',
                            notes: 'Alterne os braços. Não passe da altura do ombro.'
                        },
                        {
                            name: 'Face Pull',
                            muscle: 'Ombro Posterior/Rotadores',
                            sets: 3,
                            reps: '15-20',
                            rest: '45s',
                            notes: 'Essencial para saúde do ombro. Puxe para o rosto, abra os braços.'
                        },
                        {
                            name: 'Rosca Martelo',
                            muscle: 'Bíceps/Braquial',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s',
                            notes: 'Trabalha o braquial. Deixa o braço mais grosso.'
                        },
                        {
                            name: 'Tríceps Testa',
                            muscle: 'Tríceps',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s',
                            notes: 'Desça até a testa, suba travando os cotovelos.'
                        }
                    ]
                },
                lowerB: {
                    name: '🦵 Lower B - Posterior Focus',
                    focus: 'Posterior, Glúteos, Quadríceps, Panturrilha, Core',
                    duration: '60-75 min',
                    exercises: [
                        {
                            name: 'Levantamento Terra',
                            muscle: 'Posterior/Costas/Glúteos',
                            sets: 4,
                            reps: '5-6',
                            rest: '3-4 min',
                            notes: 'O exercício mais completo. Foco em forma perfeita.',
                            progression: 'Adicione 2.5kg quando conseguir 4x6 com boa forma'
                        },
                        {
                            name: 'Afundo/Passada',
                            muscle: 'Glúteos/Quadríceps',
                            sets: 3,
                            reps: '10-12 cada perna',
                            rest: '90s',
                            notes: 'Passo longo para glúteos, curto para quadríceps.'
                        },
                        {
                            name: 'Hack Squat',
                            muscle: 'Quadríceps',
                            sets: 3,
                            reps: '10-12',
                            rest: '2 min',
                            notes: 'Pés baixos na plataforma para mais quadríceps.'
                        },
                        {
                            name: 'Cadeira Flexora',
                            muscle: 'Posterior',
                            sets: 4,
                            reps: '10-12',
                            rest: '60s',
                            notes: 'Sentado ativa mais os isquiotibiais superiores.'
                        },
                        {
                            name: 'Elevação Pélvica (Hip Thrust)',
                            muscle: 'Glúteos',
                            sets: 3,
                            reps: '12-15',
                            rest: '90s',
                            notes: 'Melhor exercício para glúteos. Aperte no topo.'
                        },
                        {
                            name: 'Panturrilha no Leg Press',
                            muscle: 'Panturrilha',
                            sets: 4,
                            reps: '15-20',
                            rest: '45s',
                            notes: 'Amplitude máxima. Variação para estímulo diferente.'
                        },
                        {
                            name: 'Abdominais (Infra + Prancha)',
                            muscle: 'Core',
                            sets: 3,
                            reps: '15-20 + 30-60s',
                            rest: '45s',
                            notes: 'Elevação de pernas + prancha. Core forte = mais força.'
                        }
                    ]
                },
                cardioLight: {
                    name: '🏃 Cardio Leve + Mobilidade',
                    focus: 'Recuperação ativa, condicionamento',
                    duration: '30-45 min',
                    exercises: [
                        {
                            name: 'Caminhada ou Bike Leve',
                            muscle: 'Cardiovascular',
                            sets: 1,
                            reps: '20-30 min',
                            rest: '-',
                            notes: 'Intensidade baixa. Apenas para circulação e recuperação.'
                        },
                        {
                            name: 'Alongamento Dinâmico',
                            muscle: 'Mobilidade',
                            sets: 1,
                            reps: '10 min',
                            rest: '-',
                            notes: 'Foco em quadril, ombros e coluna.'
                        }
                    ]
                },
                rest: {
                    name: '😴 Dia de Descanso',
                    focus: 'Recuperação total',
                    duration: '0 min',
                    exercises: [],
                    notes: 'Crescimento acontece no descanso! Durma bem, coma proteína.'
                }
            }
        },

        // 3-DAY FULL BODY (for busy weeks)
        fullBody3: {
            name: 'Full Body 3x Semana',
            description: 'Para semanas corridas. Cada músculo 3x por semana com menor volume.',
            daysPerWeek: 3,
            schedule: {
                seg: 'fullA',
                ter: 'rest',
                qua: 'fullB',
                qui: 'rest',
                sex: 'fullC',
                sab: 'rest',
                dom: 'rest'
            },
            workouts: {
                fullA: {
                    name: '💪 Full Body A',
                    focus: 'Todos os grupos musculares',
                    duration: '60 min',
                    exercises: [
                        { name: 'Agachamento Livre', muscle: 'Pernas', sets: 4, reps: '6-8', rest: '3 min' },
                        { name: 'Supino Reto', muscle: 'Peito', sets: 3, reps: '8-10', rest: '2 min' },
                        { name: 'Remada Curvada', muscle: 'Costas', sets: 3, reps: '8-10', rest: '2 min' },
                        { name: 'Desenvolvimento', muscle: 'Ombros', sets: 3, reps: '10-12', rest: '90s' },
                        { name: 'Rosca Direta', muscle: 'Bíceps', sets: 2, reps: '10-12', rest: '60s' },
                        { name: 'Tríceps Pulley', muscle: 'Tríceps', sets: 2, reps: '12-15', rest: '60s' },
                        { name: 'Panturrilha', muscle: 'Panturrilha', sets: 3, reps: '15-20', rest: '45s' }
                    ]
                },
                fullB: {
                    name: '💪 Full Body B',
                    focus: 'Todos os grupos musculares',
                    duration: '60 min',
                    exercises: [
                        { name: 'Levantamento Terra', muscle: 'Posterior/Costas', sets: 4, reps: '5-6', rest: '3 min' },
                        { name: 'Supino Inclinado Halteres', muscle: 'Peito', sets: 3, reps: '10-12', rest: '90s' },
                        { name: 'Puxada Frontal', muscle: 'Costas', sets: 3, reps: '10-12', rest: '90s' },
                        { name: 'Elevação Lateral', muscle: 'Ombros', sets: 3, reps: '15-20', rest: '45s' },
                        { name: 'Rosca Martelo', muscle: 'Bíceps', sets: 2, reps: '10-12', rest: '60s' },
                        { name: 'Tríceps Testa', muscle: 'Tríceps', sets: 2, reps: '10-12', rest: '60s' },
                        { name: 'Leg Press', muscle: 'Quadríceps', sets: 3, reps: '12-15', rest: '90s' }
                    ]
                },
                fullC: {
                    name: '💪 Full Body C',
                    focus: 'Todos os grupos musculares',
                    duration: '60 min',
                    exercises: [
                        { name: 'Hack Squat', muscle: 'Quadríceps', sets: 4, reps: '10-12', rest: '2 min' },
                        { name: 'Supino Reto Halteres', muscle: 'Peito', sets: 3, reps: '10-12', rest: '90s' },
                        { name: 'Barra Fixa', muscle: 'Costas', sets: 3, reps: 'máximo', rest: '2 min' },
                        { name: 'Face Pull', muscle: 'Ombros/Rotadores', sets: 3, reps: '15-20', rest: '45s' },
                        { name: 'Stiff', muscle: 'Posterior', sets: 3, reps: '10-12', rest: '90s' },
                        { name: 'Rosca + Tríceps (Superset)', muscle: 'Braços', sets: 3, reps: '12-15', rest: '60s' },
                        { name: 'Abdominais', muscle: 'Core', sets: 3, reps: '15-20', rest: '45s' }
                    ]
                },
                rest: {
                    name: '😴 Dia de Descanso',
                    focus: 'Recuperação',
                    exercises: []
                }
            }
        }
    },

    // Get today's workout
    getTodayWorkout(programKey = 'upperLower4') {
        const program = this.programs[programKey];
        const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const today = days[new Date().getDay()];
        const workoutKey = program.schedule[today];
        return {
            day: today,
            workout: program.workouts[workoutKey],
            isRest: workoutKey === 'rest'
        };
    },

    // Get next workout
    getNextWorkout(programKey = 'upperLower4') {
        const program = this.programs[programKey];
        const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        const todayIndex = new Date().getDay();

        for (let i = 1; i <= 7; i++) {
            const nextIndex = (todayIndex + i) % 7;
            const workoutKey = program.schedule[days[nextIndex]];
            if (workoutKey !== 'rest' && workoutKey !== 'cardioLight') {
                return {
                    day: days[nextIndex],
                    daysUntil: i,
                    workout: program.workouts[workoutKey]
                };
            }
        }
    },

    // Get workout by day
    getWorkoutByDay(day, programKey = 'upperLower4') {
        const program = this.programs[programKey];
        const workoutKey = program.schedule[day];
        return program.workouts[workoutKey];
    }
};

// Export for global use
window.TrainingProgram = TrainingProgram;
