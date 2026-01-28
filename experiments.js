// Experiments System for Laboratório Pessoal
// Self-experimentation feature for conscious personal development

const ExperimentsSystem = {
    experiments: [],

    // Pre-defined experiments for Albert (ectomorph gaining mass + consciousness)
    presets: [
        {
            id: 'sol_manha',
            name: '☀️ 30 Dias de Sol Matinal',
            description: 'Pegar 15-20min de sol antes das 9h todos os dias',
            duration: 30,
            hypothesis: 'Vou ter mais energia, melhor sono e níveis mais altos de testosterona',
            metrics: ['energy', 'sleep.quality', 'motivation'],
            category: 'hormonal'
        },
        {
            id: 'meditacao_diaria',
            name: '🧘 21 Dias de Meditação',
            description: 'Meditar pelo menos 10 minutos por dia',
            duration: 21,
            hypothesis: 'Vou ter mais clareza mental, menos ansiedade e mais foco nos treinos',
            metrics: ['meditation.did', 'energy', 'motivation'],
            category: 'mental'
        },
        {
            id: 'proteina_alta',
            name: '🥩 14 Dias de Proteína Alta',
            description: 'Consumir pelo menos 150g de proteína todos os dias',
            duration: 14,
            hypothesis: 'Vou ter melhor recuperação muscular e mais energia',
            metrics: ['nutrition.protein', 'training.intensity', 'energy'],
            category: 'nutrition'
        },
        {
            id: 'sem_acucar',
            name: '🚫 30 Dias Sem Açúcar Refinado',
            description: 'Eliminar açúcar refinado da alimentação',
            duration: 30,
            hypothesis: 'Vou ter energia mais estável, menos inflamação e melhor composição corporal',
            metrics: ['energy', 'nutrition.saboteurs', 'sleep.quality'],
            category: 'nutrition'
        },
        {
            id: 'ducha_gelada',
            name: '🧊 21 Dias de Ducha Gelada',
            description: 'Terminar todo banho com 2-3 minutos de água gelada',
            duration: 21,
            hypothesis: 'Vou ter mais disciplina mental, melhor recuperação e mais energia',
            metrics: ['coldHeat.coldShower', 'energy', 'motivation'],
            category: 'hormonal'
        },
        {
            id: 'afirmacoes',
            name: '🗣️ 30 Dias de Afirmações',
            description: 'Repetir afirmações positivas pela manhã e antes de dormir',
            duration: 30,
            hypothesis: 'Vou ter mindset mais positivo e mais confiança',
            metrics: ['affirmations.did', 'motivation', 'energy'],
            category: 'mental'
        },
        {
            id: 'gorduras_boas',
            name: '🥑 14 Dias de Gorduras Boas',
            description: 'Incluir azeite, ovos, castanhas e óleo de coco diariamente',
            duration: 14,
            hypothesis: 'Vou ter hormônios mais equilibrados e saciedade maior',
            metrics: ['nutrition.goodFats', 'energy', 'sleep.quality'],
            category: 'nutrition'
        },
        {
            id: 'corrida_semanal',
            name: '🏃 4 Semanas de Corrida 3x',
            description: 'Correr pelo menos 3 vezes por semana',
            duration: 28,
            hypothesis: 'Vou ter melhor condicionamento cardiovascular e mais disposição',
            metrics: ['running.did', 'energy', 'sleep.quality'],
            category: 'physical'
        },
        {
            id: 'sono_regulado',
            name: '😴 21 Dias Dormindo Cedo',
            description: 'Dormir antes das 22h todos os dias',
            duration: 21,
            hypothesis: 'Vou ter mais energia matinal, melhor recuperação muscular e mais hormônio do crescimento',
            metrics: ['sleep.hours', 'sleep.quality', 'energy'],
            category: 'recovery'
        },
        {
            id: 'jejum_intermitente',
            name: '⏰ 14 Dias de Jejum 16/8',
            description: 'Comer apenas em janela de 8 horas por dia',
            duration: 14,
            hypothesis: 'Vou ter mais clareza mental, autofagia e maior foco',
            metrics: ['energy', 'motivation', 'training.intensity'],
            category: 'nutrition'
        },
        // === HACKS NATURAIS DE PERFORMANCE ===
        {
            id: 'agua_sal',
            name: '🧂 14 Dias de Água com Sal',
            description: '1/4 colher de chá de sal marinho por litro de água durante o dia',
            duration: 14,
            hypothesis: 'Vou ter melhor hidratação celular, mais energia e melhor função muscular',
            metrics: ['energy', 'training.intensity', 'motivation'],
            category: 'hack',
            protocol: 'Usar sal marinho ou sal rosa, não refinado'
        },
        {
            id: 'bicarbonato_pretreino',
            name: '🧪 14 Dias de Bicarbonato Pré-Treino',
            description: '0.3g/kg de bicarbonato de sódio 30-60min antes do treino (2-3x/semana)',
            duration: 14,
            hypothesis: 'Vou conseguir mais repetições e menos fadiga durante séries pesadas',
            metrics: ['training.intensity', 'energy'],
            category: 'hack',
            protocol: 'Não usar diariamente. Teste com treino leve primeiro.',
            warning: 'Pode causar desconforto gástrico'
        },
        {
            id: 'cafe_oleo_coco',
            name: '☕🥥 21 Dias de Café + Óleo de Coco',
            description: 'Café com 1-2 colheres de óleo de coco pós-treino',
            duration: 21,
            hypothesis: 'Vou ter energia sustentada, cetose leve e melhor foco ao longo do dia',
            metrics: ['energy', 'motivation', 'training.intensity'],
            category: 'hack',
            protocol: 'Bata no liquidificador para emulsificar'
        },
        {
            id: 'mel_pretreino',
            name: '🍯 14 Dias de Mel Pré-Treino',
            description: '1-2 colheres de mel 15-30min antes do treino (5h)',
            duration: 14,
            hypothesis: 'Vou ter energia rápida natural para treinos matinais sem crash',
            metrics: ['energy', 'training.intensity'],
            category: 'hack',
            protocol: 'Mel puro, sem misturar com outros alimentos'
        },
        {
            id: 'respiracao_wim_hof',
            name: '👃 21 Dias de Respiração Wim Hof',
            description: '3 rounds de 30 respirações antes do treino',
            duration: 21,
            hypothesis: 'Vou ter oxigenação máxima, foco extremo e energia natural',
            metrics: ['energy', 'motivation', 'training.intensity'],
            category: 'hack',
            protocol: '30 respirações profundas → retenção → repete 3x'
        },
        {
            id: 'grounding',
            name: '🦶 21 Dias de Grounding',
            description: '10-20min de pés descalços na terra, grama ou areia',
            duration: 21,
            hypothesis: 'Vou ter menos inflamação, melhor sono e recuperação acelerada',
            metrics: ['energy', 'sleep.quality', 'motivation'],
            category: 'hack',
            protocol: 'Combine com sol da manhã para efeito duplo'
        },
        {
            id: 'limao_manha',
            name: '🍋 21 Dias de Água com Limão',
            description: 'Água morna + suco de 1/2 limão ao acordar, em jejum',
            duration: 21,
            hypothesis: 'Vou alcalinizar o corpo, melhorar digestão e ter mais energia',
            metrics: ['energy', 'motivation'],
            category: 'hack',
            protocol: 'Espere 15-20min antes de comer'
        },
        {
            id: 'sol_testiculos',
            name: '☀️ 14 Dias de Sol nos Testículos',
            description: '10-15min de exposição ao sol da manhã na região',
            duration: 14,
            hypothesis: 'Vou ter aumento natural de testosterona e mais energia',
            metrics: ['energy', 'motivation', 'training.intensity'],
            category: 'hack',
            protocol: 'Sol da manhã (antes das 9h). Privacidade necessária!'
        },
        {
            id: 'alho_cru',
            name: '🧄 14 Dias de Alho Cru',
            description: '1-2 dentes de alho cru em jejum pela manhã',
            duration: 14,
            hypothesis: 'Vou ter imunidade fortalecida e melhor circulação',
            metrics: ['energy', 'motivation'],
            category: 'hack',
            protocol: 'Esmague e espere 10min antes de comer (ativa alicina)'
        },
        {
            id: 'caldo_ossos',
            name: '🦴 21 Dias de Caldo de Ossos',
            description: 'Um copo de caldo de ossos por dia',
            duration: 21,
            hypothesis: 'Vou ter articulações mais saudáveis e melhor recuperação',
            metrics: ['energy', 'training.intensity'],
            category: 'hack',
            protocol: 'Ferver ossos por 12-24h com vinagre'
        },
        // === ANTI-CATABOLISMO ECTOMORFO ===
        {
            id: 'comer_3h',
            name: '🍽️ 14 Dias Comendo a Cada 3h',
            description: '5-6 refeições por dia, proteína em todas',
            duration: 14,
            hypothesis: 'Vou evitar catabolismo e manter síntese proteica constante',
            metrics: ['energy', 'training.intensity', 'nutrition.protein'],
            category: 'anti-catabolismo',
            protocol: 'Nunca passe de 4h sem comer proteína'
        },
        {
            id: 'densidade_calorica',
            name: '🥜 14 Dias de Densidade Calórica',
            description: 'Adicionar azeite, óleo de coco e manteiga em tudo',
            duration: 14,
            hypothesis: 'Vou conseguir superávit calórico sem encher demais',
            metrics: ['energy', 'motivation'],
            category: 'anti-catabolismo',
            protocol: '1 colher de azeite = 120kcal extras'
        }
    ],


    // Initialize experiments
    async init() {
        try {
            // Verifica se está logado E se CloudSync está inicializado com userRef
            const isFirebaseReady = window.CloudSync &&
                window.CloudSync.userRef &&
                window.DataSync;

            if (isFirebaseReady) {
                console.log('🔄 Carregando experimentos do Firebase...');
                try {
                    // CRIA UM TIMEOUT DE 5 SEGUNDOS
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout Firebase')), 5000)
                    );

                    // Tenta carregar do Firebase, mas desiste se demorar mais de 5s
                    this.experiments = await Promise.race([
                        DataSync.getExperiments(),
                        timeoutPromise
                    ]) || [];

                    console.log('✅ Experimentos carregados do Firebase:', this.experiments.length);
                } catch (firebaseError) {
                    console.warn('⚠️ Erro/Timeout ao carregar do Firebase, usando local:', firebaseError);
                    const saved = localStorage.getItem('experiments');
                    this.experiments = saved ? JSON.parse(saved) : [];
                }
            } else {
                // Modo offline: carrega do localStorage
                console.log('📴 Modo offline detectado, carregando experimentos locais...');
                const saved = localStorage.getItem('experiments');
                this.experiments = saved ? JSON.parse(saved) : [];
                console.log('📴 Experimentos carregados offline:', this.experiments.length);
            }
        } catch (error) {
            console.error('Erro ao carregar experimentos:', error);
            // Fallback para localStorage em caso de erro
            const saved = localStorage.getItem('experiments');
            this.experiments = saved ? JSON.parse(saved) : [];
            console.log('⚠️ Fallback para localStorage:', this.experiments.length);
        }

        // Remove loading state if UI element exists
        const loadingEl = document.querySelector('.loading-placeholder');
        if (loadingEl) loadingEl.style.display = 'none';

        return this.experiments;
    },

    // Salvar localmente
    saveLocal() {
        localStorage.setItem('experiments', JSON.stringify(this.experiments));
    },

    // Start a new experiment
    async startExperiment(experimentData) {
        const experiment = {
            ...experimentData,
            id: experimentData.id || `exp_${Date.now()}`,
            startDate: new Date().toISOString().split('T')[0],
            endDate: this.calculateEndDate(experimentData.duration),
            status: 'active',
            dailyLogs: {},
            createdAt: Date.now()
        };

        this.experiments.push(experiment);

        if (window.DataSync && window.DataSync.user) {
            await DataSync.saveExperiment(experiment);
        }

        // Salvar localmente também (backup/offline)
        this.saveLocal();

        return experiment;
    },

    // Calculate end date
    calculateEndDate(days) {
        const end = new Date();
        end.setDate(end.getDate() + days);
        return end.toISOString().split('T')[0];
    },

    // Log daily progress for experiment
    async logProgress(experimentId, date, data) {
        const experiment = this.experiments.find(e => e.id === experimentId);
        if (!experiment) return null;

        // Ensure dailyLogs exists
        if (!experiment.dailyLogs) experiment.dailyLogs = {};

        experiment.dailyLogs[date] = {
            ...data,
            timestamp: Date.now()
        };

        // Check if experiment is complete
        if (date >= experiment.endDate) {
            experiment.status = 'completed';
            experiment.completedAt = Date.now();
        }

        // Save locally first (Optimistic)
        localStorage.setItem('experiments', JSON.stringify(this.experiments));

        // Try to save to cloud (Fire & Forget style)
        if (window.DataSync) {
            try {
                // Timeout of 3s for save
                const savePromise = DataSync.saveExperiment(experiment);
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Save Timeout')), 3000)
                );

                await Promise.race([savePromise, timeoutPromise]);
            } catch (e) {
                console.warn('⚠️ Cloud save failed/timeout, but local save ok', e);
            }
        }

        return experiment;
    },

    // Get active experiments
    getActiveExperiments() {
        return this.experiments.filter(e => e.status === 'active');
    },

    // Get experiment progress
    getProgress(experimentId) {
        const experiment = this.experiments.find(e => e.id === experimentId);
        if (!experiment) return null;

        const start = new Date(experiment.startDate);
        const end = new Date(experiment.endDate);
        const today = new Date();

        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const elapsedDays = Math.ceil((today - start) / (1000 * 60 * 60 * 24));
        const loggedDays = Object.keys(experiment.dailyLogs || {}).length;

        return {
            totalDays,
            elapsedDays: Math.min(elapsedDays, totalDays),
            loggedDays,
            percentage: Math.round((elapsedDays / totalDays) * 100),
            consistency: Math.round((loggedDays / elapsedDays) * 100) || 0
        };
    },

    // Analyze experiment results
    analyzeResults(experimentId) {
        const experiment = this.experiments.find(e => e.id === experimentId);
        if (!experiment || !experiment.dailyLogs) return null;

        const logs = Object.values(experiment.dailyLogs);
        if (logs.length < 3) return { message: 'Poucos dados para análise' };

        // Calculate averages for tracked metrics
        const results = {};

        // This would integrate with CheckinSystem to correlate data
        // Simplified version for now

        return {
            experiment: experiment.name,
            duration: `${logs.length} dias`,
            hypothesis: experiment.hypothesis,
            results: results,
            conclusion: 'Análise em desenvolvimento...'
        };
    },

    // Create custom experiment
    async createCustomExperiment(name, description, duration, hypothesis, metrics) {
        return await this.startExperiment({
            name,
            description,
            duration,
            hypothesis,
            metrics,
            category: 'custom',
            isCustom: true
        });
    },

    // Abandon experiment
    async abandonExperiment(experimentId, reason = '') {
        const experiment = this.experiments.find(e => e.id === experimentId);
        if (!experiment) return null;

        experiment.status = 'abandoned';
        experiment.abandonedAt = Date.now();
        experiment.abandonReason = reason;

        if (window.DataSync) {
            await DataSync.saveExperiment(experiment);
        }

        return experiment;
    }
};

// Experiments UI
function renderExperimentsTab() {
    const activeExperiments = ExperimentsSystem.getActiveExperiments();

    return `
        <div class="experiments-screen">
            <div class="experiments-header">
                <h2>🧪 Seus Experimentos</h2>
                <p>Teste hipóteses sobre seu corpo e mente</p>
            </div>
            
            ${activeExperiments.length > 0 ? `
                <div class="active-experiments">
                    <h3>📊 Experimentos Ativos</h3>
                    ${activeExperiments.map(exp => renderExperimentCard(exp, true)).join('')}
                </div>
            ` : `
                <div class="no-experiments">
                    <p>Nenhum experimento ativo</p>
                    <p class="hint">Escolha um abaixo para começar</p>
                </div>
            `}
            
            <div class="preset-experiments">
                <h3>✨ Experimentos Sugeridos</h3>
                <div class="experiments-grid">
                    ${ExperimentsSystem.presets.map(preset => renderExperimentCard(preset, false)).join('')}
                </div>
            </div>
            
            <div class="custom-experiment-section">
                <h3>🎯 Criar Experimento Personalizado</h3>
                <button class="btn-create-experiment" onclick="showCreateExperimentModal()">
                    ➕ Novo Experimento
                </button>
            </div>
        </div>
    `;
}

function renderExperimentCard(experiment, isActive) {
    const progress = isActive ? ExperimentsSystem.getProgress(experiment.id) : null;

    const categoryColors = {
        hormonal: '#FF9800',
        mental: '#9C27B0',
        nutrition: '#4CAF50',
        physical: '#2196F3',
        recovery: '#00BCD4',
        custom: '#607D8B'
    };

    const categoryColor = categoryColors[experiment.category] || categoryColors.custom;

    if (isActive) {
        return `
            <div class="experiment-card active" style="border-left-color: ${categoryColor}">
                <div class="experiment-header">
                    <h4>${experiment.name}</h4>
                    <span class="experiment-badge active">Ativo</span>
                </div>
                <p class="experiment-description">${experiment.description}</p>
                
                <div class="experiment-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                    </div>
                    <div class="progress-stats">
                        <span>Dia ${progress.elapsedDays}/${progress.totalDays}</span>
                        <span>${progress.consistency}% consistência</span>
                    </div>
                </div>
                
                <div class="experiment-hypothesis">
                    <strong>Hipótese:</strong> ${experiment.hypothesis}
                </div>
                
                <div class="experiment-actions">
                    <button class="btn-secondary" onclick="logExperimentToday('${experiment.id}')">
                        📝 Registrar Hoje
                    </button>
                    <button class="btn-ghost" onclick="viewExperimentDetails('${experiment.id}')">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="experiment-card preset" style="border-left-color: ${categoryColor}">
                <div class="experiment-header">
                    <h4>${experiment.name}</h4>
                    <span class="experiment-duration">${experiment.duration} dias</span>
                </div>
                <p class="experiment-description">${experiment.description}</p>
                <p class="experiment-hypothesis-preview">"${experiment.hypothesis}"</p>
                <button class="btn-start-experiment" onclick="startPresetExperiment('${experiment.id}')">
                    🚀 Iniciar
                </button>
            </div>
        `;
    }
}

// Experiment interaction handlers
async function startPresetExperiment(presetId) {
    const preset = ExperimentsSystem.presets.find(p => p.id === presetId);
    if (!preset) return;

    // Check if already active
    const activeExps = ExperimentsSystem.getActiveExperiments();
    const alreadyActive = activeExps.find(e => e.id === presetId);

    if (alreadyActive) {
        showError('Este experimento já está ativo!');
        return;
    }

    await ExperimentsSystem.startExperiment(preset);
    showSuccess(`🧪 Experimento "${preset.name}" iniciado!`);

    // Refresh experiments tab
    const container = document.getElementById('experiments-content');
    if (container) {
        container.innerHTML = renderExperimentsTab();
    }
}

async function logExperimentToday(experimentId) {
    try {
        // Get today's checkin data as the log
        const today = new Date().toISOString().split('T')[0];

        let todayCheckin = {};
        try {
            todayCheckin = CheckinSystem.todayData || await CheckinSystem.init() || {};
        } catch (e) {
            console.warn('⚠️ Could not load full checkin data, logging basic info only', e);
        }

        await ExperimentsSystem.logProgress(experimentId, today, {
            checkinData: todayCheckin,
            logged: true,
            timestamp: Date.now()
        });

        showSuccess('✅ Experimento registrado!');

        // Refresh UI if possible
        if (typeof renderExperimentsTab === 'function') {
            setTimeout(renderExperimentsTab, 500);
        }
    } catch (error) {
        console.error('Erro ao registrar experimento:', error);
        alert('Erro ao registrar. Tente novamente offline.');
    }
}

function viewExperimentDetails(experimentId) {
    const experiment = ExperimentsSystem.experiments.find(e => e.id === experimentId);
    if (!experiment) return;

    const progress = ExperimentsSystem.getProgress(experimentId);
    const logs = Object.entries(experiment.dailyLogs || {});

    // Show modal with details
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>${experiment.name}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="experiment-stats-grid">
                    <div class="stat-box">
                        <span class="stat-value">${progress.elapsedDays}</span>
                        <span class="stat-label">Dias Passados</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-value">${progress.loggedDays}</span>
                        <span class="stat-label">Dias Registrados</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-value">${progress.consistency}%</span>
                        <span class="stat-label">Consistência</span>
                    </div>
                </div>
                
                <div class="experiment-info">
                    <h4>Hipótese</h4>
                    <p>${experiment.hypothesis}</p>
                </div>
                
                <div class="experiment-logs">
                    <h4>Histórico de Registros</h4>
                    ${logs.length > 0 ? `
                        <ul class="logs-list">
                            ${logs.slice(-10).reverse().map(([date, log]) => `
                                <li>
                                    <span class="log-date">${new Date(date).toLocaleDateString('pt-BR')}</span>
                                    <span class="log-status">✅</span>
                                </li>
                            `).join('')}
                        </ul>
                    ` : '<p class="no-logs">Nenhum registro ainda</p>'}
                </div>
                
                <div class="experiment-actions-modal">
                    <button class="btn-danger" onclick="abandonExperimentConfirm('${experimentId}')">
                        🛑 Abandonar Experimento
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showCreateExperimentModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal modal-lg">
            <div class="modal-header">
                <h3>🎯 Novo Experimento</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <form id="createExperimentForm" onsubmit="createCustomExperiment(event)">
                    <div class="form-group">
                        <label>Nome do Experimento</label>
                        <input type="text" name="name" required placeholder="Ex: 30 dias acordando 5h">
                    </div>
                    
                    <div class="form-group">
                        <label>Descrição</label>
                        <textarea name="description" required placeholder="O que você vai fazer exatamente?"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Duração (dias)</label>
                        <input type="number" name="duration" required min="7" max="90" value="21">
                    </div>
                    
                    <div class="form-group">
                        <label>Hipótese (o que você espera que aconteça)</label>
                        <textarea name="hypothesis" required placeholder="Eu acredito que..."></textarea>
                    </div>
                    
                    <button type="submit" class="btn-primary full-width">
                        🚀 Iniciar Experimento
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function createCustomExperiment(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    await ExperimentsSystem.createCustomExperiment(
        formData.get('name'),
        formData.get('description'),
        parseInt(formData.get('duration')),
        formData.get('hypothesis'),
        ['energy', 'motivation'] // Default metrics for custom
    );

    // Close modal
    form.closest('.modal-overlay').remove();

    showSuccess('🧪 Experimento personalizado criado!');

    // Refresh experiments tab
    const container = document.getElementById('experiments-content');
    if (container) {
        container.innerHTML = renderExperimentsTab();
    }
}

async function abandonExperimentConfirm(experimentId) {
    if (confirm('Tem certeza que deseja abandonar este experimento?')) {
        await ExperimentsSystem.abandonExperiment(experimentId);
        document.querySelector('.modal-overlay')?.remove();
        showSuccess('Experimento abandonado');

        const container = document.getElementById('experiments-content');
        if (container) {
            container.innerHTML = renderExperimentsTab();
        }
    }
}

// Initialize experiments when tab opens
async function initExperimentsTab() {
    await ExperimentsSystem.init();

    const container = document.getElementById('experiments-content');
    if (container) {
        container.innerHTML = renderExperimentsTab();
    }
}

// Export
window.ExperimentsSystem = ExperimentsSystem;
window.initExperimentsTab = initExperimentsTab;
