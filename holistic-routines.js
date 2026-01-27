// Holistic Routines System for Laboratório Pessoal
// Flexible tracking for sun exposure, meditation, etc.

const HolisticRoutines = {
    // Default routine templates (user can customize)
    routines: {
        sun: {
            id: 'sun',
            name: '☀️ Exposição Solar',
            icon: '☀️',
            description: 'Pegar sol para vitamina D, testosterona e ritmo circadiano',
            benefits: [
                'Vitamina D natural',
                'Aumento de testosterona',
                'Melhora do sono',
                'Regulação do humor'
            ],
            defaultDuration: 15, // minutes
            idealTimes: [
                { label: 'Manhã cedo (ideal)', time: '06:00-09:00', quality: 'optimal' },
                { label: 'Meio da manhã', time: '09:00-11:00', quality: 'good' },
                { label: 'Meio-dia', time: '11:00-14:00', quality: 'ok', warning: 'Use protetor se ficar muito tempo' },
                { label: 'Tarde', time: '14:00-17:00', quality: 'good' }
            ],
            options: {
                duration: [5, 10, 15, 20, 30, 45, 60],
                skinExposure: ['rosto', 'braços', 'tronco', 'pernas', 'corpo todo'],
                withoutSunscreen: true // tracking if was direct exposure
            },
            tips: [
                'Sol da manhã (antes das 9h) é o mais benéfico para o ritmo circadiano',
                'Exposição sem protetor nos primeiros 15-20 min maximiza vitamina D',
                'Olhar para o horizonte (não direto ao sol) ajuda a acordar o cérebro'
            ]
        },

        meditation: {
            id: 'meditation',
            name: '🧘 Meditação',
            icon: '🧘',
            description: 'Prática de presença e clareza mental',
            benefits: [
                'Redução de estresse',
                'Maior foco',
                'Clareza mental',
                'Conexão espiritual'
            ],
            defaultDuration: 10,
            types: [
                { id: 'silent', name: 'Silenciosa', description: 'Apenas observar a respiração' },
                { id: 'guided', name: 'Guiada', description: 'Com áudio/instruções' },
                { id: 'breathing', name: 'Respiração', description: 'Pranayama, Wim Hof, Box Breathing' },
                { id: 'visualization', name: 'Visualização', description: 'Imaginar objetivos alcançados' },
                { id: 'gratitude', name: 'Gratidão', description: 'Foco em agradecer' },
                { id: 'bodyscan', name: 'Body Scan', description: 'Atenção em cada parte do corpo' }
            ],
            options: {
                duration: [5, 10, 15, 20, 30, 45, 60]
            },
            tips: [
                'Consistência > duração. 5 min todo dia é melhor que 1h ocasional',
                'Melhor horário: logo ao acordar ou antes de dormir',
                'Não julgue sua prática - não existe meditação "errada"'
            ]
        },

        coldExposure: {
            id: 'coldExposure',
            name: '🧊 Exposição ao Frio',
            icon: '🧊',
            description: 'Ducha gelada ou banho de gelo para hormese',
            benefits: [
                'Aumento de dopamina (250%+)',
                'Disciplina mental',
                'Redução de inflamação',
                'Melhora da recuperação'
            ],
            defaultDuration: 2, // minutes
            options: {
                duration: [0.5, 1, 2, 3, 5, 10],
                intensity: ['Morna-fria', 'Fria', 'Gelada', 'Gelo puro']
            },
            protocol: {
                beginner: 'Terminar o banho com 30s de água fria',
                intermediate: '1-2 min de água gelada no final',
                advanced: 'Banho inteiro gelado ou imersão em gelo'
            },
            tips: [
                'Respire profundamente antes e durante',
                'Foco na expiração lenta para controlar a reação',
                'Nunca faça sozinho em imersão em gelo'
            ]
        },

        running: {
            id: 'running',
            name: '🏃 Corrida',
            icon: '🏃',
            description: 'Cardio para condicionamento e saúde cardiovascular',
            benefits: [
                'Saúde cardiovascular',
                'Queima de gordura',
                'Clareza mental',
                'Endorfinas'
            ],
            defaultDuration: 20,
            options: {
                duration: [10, 15, 20, 30, 45, 60],
                intensity: ['Caminhada', 'Trote leve', 'Corrida moderada', 'HIIT', 'Sprint'],
                distance: ['1-2km', '2-4km', '4-6km', '6-10km', '10km+']
            },
            weeklyGoal: 3, // sessions per week
            tips: [
                'Para ectomorfos: limite a 2-3x por semana para não atrapalhar ganho de massa',
                'HIIT é mais eficiente para quem quer manter músculos',
                'Correr em jejum pode aumentar queima de gordura'
            ]
        },

        reading: {
            id: 'reading',
            name: '📚 Leitura',
            icon: '📚',
            description: 'Desenvolvimento através de livros',
            benefits: [
                'Conhecimento',
                'Vocabulário',
                'Foco',
                'Criatividade'
            ],
            defaultDuration: 30,
            options: {
                duration: [10, 15, 20, 30, 45, 60],
                type: ['Desenvolvimento pessoal', 'Espiritualidade', 'Negócios', 'Técnico', 'Ficção']
            },
            weeklyGoal: 5 // days
        },

        sleep: {
            id: 'sleep',
            name: '😴 Sono',
            icon: '😴',
            description: 'Qualidade do sono para recuperação e crescimento',
            benefits: [
                'Recuperação muscular',
                'Hormônio do crescimento',
                'Consolidação de memória',
                'Regulação hormonal'
            ],
            idealHours: 8,
            idealBedtime: '22:00',
            idealWakeTime: '06:00',
            options: {
                hours: [5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10],
                quality: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            tips: [
                'Dormir antes das 22h maximiza GH (hormônio do crescimento)',
                'Evite telas 1h antes de dormir',
                'Quarto escuro e frio (18-20°C) é ideal',
                'Consistência de horário é mais importante que quantidade'
            ]
        },

        nutrition: {
            id: 'nutrition',
            name: '🥩 Nutrição',
            icon: '🥩',
            description: 'Alimentação para ganho de massa',
            goals: {
                protein: 150, // grams (2g/kg for 75kg target)
                calories: 3000, // surplus for ectomorph
                meals: 5 // per day
            },
            proteinOptions: [80, 100, 120, 150, 180, 200],
            tips: [
                'Meta: 2g de proteína por kg de peso corporal',
                'Coma a cada 3-4 horas para manter síntese proteica',
                'Gorduras boas são essenciais para hormônios',
                'Carboidratos são seu combustível para treinar pesado'
            ]
        }
    },

    // Get routine by id
    getRoutine(id) {
        return this.routines[id] || null;
    },

    // Get all routines
    getAllRoutines() {
        return Object.values(this.routines);
    },

    // Log a routine completion
    async logRoutine(routineId, data) {
        const today = new Date().toISOString().split('T')[0];
        const log = {
            routineId,
            date: today,
            ...data,
            timestamp: Date.now()
        };

        // Save to DataSync if available
        if (window.DataSync) {
            await window.DataSync.saveRoutine(today, {
                [routineId]: log
            });
        }

        return log;
    }
};

// Export
window.HolisticRoutines = HolisticRoutines;
