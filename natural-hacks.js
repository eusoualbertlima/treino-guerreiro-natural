// Natural Performance Hacks - Hipertrofia Consciente
// Hacks naturais para otimizar performance e ganho de massa

const NaturalHacks = {
    // Hacks organizados por categoria
    categories: {
        preTreino: {
            name: '⚡ Pré-Treino Natural',
            description: 'Energia e foco antes do treino',
            hacks: [
                {
                    id: 'mel_pretreino',
                    name: '🍯 Mel Pré-Treino',
                    description: '1-2 colheres de mel 15-30min antes',
                    when: '15-30min antes do treino',
                    benefits: ['Glicose rápida natural', 'Energia instantânea', 'Sem crash'],
                    protocol: '1-2 colheres de mel puro',
                    tip: 'Ideal para treinos às 5h da manhã'
                },
                {
                    id: 'bicarbonato',
                    name: '🧪 Bicarbonato de Sódio',
                    description: 'Buffer de lactato para mais repetições',
                    when: '30-60min antes do treino',
                    benefits: ['Mais reps até a falha', 'Reduz acidez muscular', 'Aumenta resistência'],
                    protocol: '0.3g por kg de peso corporal (ex: 20g para 70kg)',
                    tip: 'Pode causar desconforto gástrico. Teste em treino leve primeiro.',
                    warning: 'Não use diariamente. 2-3x por semana máximo.'
                },
                {
                    id: 'wim_hof',
                    name: '👃 Respiração Wim Hof',
                    description: '3 rounds de 30 respirações antes do treino',
                    when: '5-10min antes',
                    benefits: ['Oxigenação máxima', 'Foco extremo', 'Energia natural', 'Alcaliniza'],
                    protocol: '30 respirações profundas → retenção → repete 3x',
                    tip: 'Faça sentado. Não faça na água ou dirigindo.'
                },
                {
                    id: 'cafe_simples',
                    name: '☕ Café Puro',
                    description: 'Cafeína natural para foco e energia',
                    when: '20-30min antes',
                    benefits: ['Foco', 'Energia', 'Oxidação de gordura'],
                    protocol: '1-2 xícaras de café preto',
                    tip: 'Sem açúcar. Pode combinar com mel se treinar às 5h.'
                },
                {
                    id: 'jejum_intermitente',
                    name: '🌙 Jejum Intermitente',
                    description: 'Treinar em jejum para GH e foco',
                    when: 'Pular café da manhã ou jantar',
                    benefits: ['Aumento de GH', 'Sensibilidade à insulina', 'Autofagia', 'Foco mental'],
                    protocol: '12-16h sem comer antes do treino',
                    tip: 'Beba muita água e café preto. Quebre o jejum com proteína.'
                }
            ]
        },
        posTreino: {
            name: '🔄 Pós-Treino Anabólico',
            description: 'Recuperação e síntese proteica',
            hacks: [
                {
                    id: 'cafe_oleo_coco',
                    name: '☕🥥 Café + Óleo de Coco',
                    description: 'Energia sustentada e cetose leve',
                    when: 'Logo após o treino (6h)',
                    benefits: ['Energia sustentada', 'MCT para o cérebro', 'Cetose leve'],
                    protocol: '1 xícara de café + 1-2 colheres de óleo de coco',
                    tip: 'Bata no liquidificador para emulsificar'
                },
                {
                    id: 'mel_canela',
                    name: '🍯 Mel + Canela',
                    description: 'Anti-inflamatório natural anabólico',
                    when: 'Pós-treino ou antes de dormir',
                    benefits: ['Anti-inflamatório', 'Regula glicose', 'Anabólico natural'],
                    protocol: '1 colher mel + 1/2 colher canela',
                    tip: 'Canela do Ceilão é a mais pura'
                },
                {
                    id: 'gemas_cruas',
                    name: '🥚 Gemas Cruas',
                    description: 'Colina + nutrientes intactos',
                    when: 'Pós-treino ou manhã',
                    benefits: ['Colina para o cérebro', 'Vitaminas intactas', 'Colesterol = testosterona'],
                    protocol: '2-4 gemas cruas (de ovos caipira se possível)',
                    tip: 'Ovos caipira têm menos risco. Lave a casca antes de quebrar.'
                }
            ]
        },
        hidratacao: {
            name: '💧 Hidratação Otimizada',
            description: 'Eletrólitos e absorção celular',
            hacks: [
                {
                    id: 'agua_sal',
                    name: '🧂 Água com Sal',
                    description: 'Eletrólitos naturais para hidratação celular',
                    when: 'Durante o dia todo',
                    benefits: ['Hidratação celular real', 'Eletrólitos', 'Mais energia', 'Melhor função muscular'],
                    protocol: '1/4 colher de chá de sal marinho por litro de água',
                    tip: 'Use sal marinho ou sal rosa, não sal refinado'
                },
                {
                    id: 'limao_manha',
                    name: '🍋 Água + Limão',
                    description: 'Alcaliniza e estimula digestão',
                    when: 'Ao acordar, em jejum',
                    benefits: ['Alcaliniza o corpo', 'Estimula digestão', 'Vitamina C', 'Detox suave'],
                    protocol: '1 copo de água morna + suco de 1/2 limão',
                    tip: 'Espere 15-20min antes de comer'
                }
            ]
        },
        hormonal: {
            name: '💪 Otimização Hormonal',
            description: 'Testosterona e hormônios naturalmente',
            hacks: [
                {
                    id: 'sol_testiculos',
                    name: '☀️ Sol nos Testículos',
                    description: 'Vitamina D direta + testosterona',
                    when: 'Manhã cedo (sol suave)',
                    benefits: ['Testosterona naturalmente', 'Vitamina D direta', 'Energia'],
                    protocol: '10-15min de sol na região, sem protetor',
                    tip: 'Sol da manhã (antes das 9h) é mais suave. Privacidade necessária!'
                },
                {
                    id: 'gelo_testiculos',
                    name: '🧊 Gelo nos Testículos',
                    description: 'Hormese para produção de testosterona',
                    when: 'Manhã ou noite',
                    benefits: ['Aumenta testosterona', 'Melhora qualidade do esperma', 'Disciplina mental'],
                    protocol: 'Toalha fria ou gelo (com pano) por 5-10min',
                    tip: 'Nunca gelo direto na pele. Use toalha.'
                },
                {
                    id: 'ducha_gelada',
                    name: '🧊 Ducha Gelada',
                    description: 'Dopamina 250%+ e disciplina',
                    when: 'Final do banho ou banho inteiro',
                    benefits: ['Dopamina natural (250%+)', 'Testosterona', 'Disciplina mental', 'Recuperação'],
                    protocol: 'Terminar o banho com 2-3min de água gelada',
                    tip: 'Comece com 30s e vá aumentando. Respire profundamente.'
                },
                {
                    id: 'gorduras_boas',
                    name: '🥑 Gorduras Boas',
                    description: 'Colesterol = precursor de testosterona',
                    when: 'Todas as refeições',
                    benefits: ['Testosterona', 'Saciedade', 'Energia estável'],
                    protocol: 'Ovos inteiros, azeite, coco, castanhas, carnes gordas',
                    tip: 'Nunca jogue a gema fora. O colesterol é essencial.'
                }
            ]
        },
        antiCatabolismo: {
            name: '🛡️ Anti-Catabolismo (Ectomorfo)',
            description: 'Estratégias para evitar perda de massa',
            hacks: [
                {
                    id: 'comer_frequente',
                    name: '🍽️ Comer a Cada 3h',
                    description: 'Manter fluxo constante de aminoácidos',
                    when: 'Dia todo',
                    benefits: ['Evita catabolismo', 'Síntese proteica constante', 'Mais fácil bater calorias'],
                    protocol: '5-6 refeições por dia, proteína em todas',
                    tip: 'Nunca passe de 4h sem comer proteína'
                },
                {
                    id: 'shake_noturno',
                    name: '🥛 Proteína Antes de Dormir',
                    description: 'Evita catabolismo noturno',
                    when: '30min antes de dormir',
                    benefits: ['Evita catabolismo de 8h de sono', 'Síntese proteica durante sono'],
                    protocol: 'Ovos, queijo, ou carne antes de dormir',
                    tip: 'Proteínas de digestão lenta: queijo, ovos cozidos'
                },
                {
                    id: 'treino_curto',
                    name: '⏱️ Treinos Curtos e Intensos',
                    description: 'Menos cortisol, mais anabolismo',
                    when: 'Todo treino',
                    benefits: ['Menos cortisol', 'Mais GH', 'Menos catabolismo'],
                    protocol: 'Treinos de 45-60min máximo',
                    tip: 'Depois de 60min, cortisol sobe. Seja eficiente.'
                },
                {
                    id: 'dormir_8h',
                    name: '😴 Dormir 7-9 Horas',
                    description: 'GH é liberado no sono profundo',
                    when: 'Toda noite',
                    benefits: ['GH (hormônio do crescimento)', 'Recuperação muscular', 'Testosterona'],
                    protocol: 'Dormir antes das 22h, acordar naturalmente',
                    tip: 'Cada hora antes da meia-noite vale por duas'
                },
                {
                    id: 'cardio_moderado',
                    name: '🏃 Limitar Cardio',
                    description: 'Muito cardio = catabolismo',
                    when: 'Planejar a semana',
                    benefits: ['Preserva massa muscular', 'Menos cortisol', 'Energia para pesos'],
                    protocol: 'Máximo 2-3x por semana, 20-30min',
                    tip: 'HIIT é melhor que cardio longo para ectomorfos'
                },
                {
                    id: 'densidade_calorica',
                    name: '🥜 Densidade Calórica',
                    description: 'Mais calorias sem volume',
                    when: 'Toda refeição',
                    benefits: ['Calorias sem encher', 'Mais fácil superávit'],
                    protocol: 'Azeite extra, óleo de coco, manteiga, castanhas',
                    tip: '1 colher de azeite = 120kcal extras. Adicione em tudo.'
                }
            ]
        },
        jejum: {
            name: '⏰ Jejum Estratégico',
            description: 'Jejum para ectomorfo sem perder massa',
            hacks: [
                {
                    id: 'jejum_curto',
                    name: '⏰ Jejum Curto (12-14h)',
                    description: 'Benefícios sem catabolismo',
                    when: 'Noturno natural (jantar 20h → café 8h)',
                    benefits: ['Autofagia leve', 'GH noturno preservado', 'Sem perda de massa'],
                    protocol: '12-14h de jejum (não mais que isso para ectomorfos)',
                    tip: 'Ectomorfo: jejum CURTO. Mais de 16h pode catabolizar.'
                },
                {
                    id: 'treino_jejum_curto',
                    name: '🏋️ Treino em Jejum (Curto)',
                    description: 'Treinar às 5h e comer às 6h',
                    when: 'Treino às 5h, café às 6h (seu protocolo)',
                    benefits: ['GH elevado durante treino', 'Oxidação de gordura', 'Foco mental'],
                    protocol: 'Mel antes do treino → Café bomba depois',
                    tip: 'Seu protocolo já está otimizado: mel 5h → treino → café 6h'
                },
                {
                    id: 'nao_jejuar_demais',
                    name: '⚠️ Evitar Jejum Longo',
                    description: 'Ectomorfo + jejum longo = perda de massa',
                    when: 'Sempre',
                    benefits: ['Preserva músculos', 'Mantém metabolismo'],
                    protocol: 'Máximo 14-16h de jejum. Nunca mais.',
                    tip: 'Se está perdendo peso, ENCURTE o jejum ou elimine.'
                }
            ]
        },
        superfoods: {
            name: '🦴 Superfoods Ancestrais',
            description: 'Nutrição densa como nossos ancestrais',
            hacks: [
                {
                    id: 'caldo_ossos',
                    name: '🦴 Caldo de Ossos',
                    description: 'Colágeno e minerais ancestrais',
                    when: 'Diariamente ou pré-treino',
                    benefits: ['Colágeno para articulações', 'Minerais', 'Gut health'],
                    protocol: 'Ferver ossos por 12-24h com vinagre',
                    tip: 'Adicione um pouco de vinagre para extrair mais minerais'
                },
                {
                    id: 'figado',
                    name: '🥩 Fígado',
                    description: 'O multivitamínico natural mais potente',
                    when: '2-3x por semana',
                    benefits: ['Vitamina A', 'B12', 'Ferro', 'Cobre', 'Mais energia'],
                    protocol: '100-150g de fígado de boi, 2-3x por semana',
                    tip: 'Se não gosta do gosto, misture com carne moída'
                },
                {
                    id: 'polen',
                    name: '🌰 Pólen de Abelha',
                    description: 'Superalimento energético',
                    when: 'Manhã',
                    benefits: ['Energia', 'Hormônios', 'Nutrientes completos'],
                    protocol: '1 colher de chá pela manhã',
                    tip: 'Comece com pouco para ver se tem alergia'
                },
                {
                    id: 'alho_cru',
                    name: '🧄 Alho Cru',
                    description: 'Antibiótico natural, circulação',
                    when: 'Manhã em jejum',
                    benefits: ['Antibiótico natural', 'Circulação', 'Imunidade'],
                    protocol: '1-2 dentes de alho cru em jejum',
                    tip: 'Esmague e espere 10min antes de comer (ativa alicina)'
                }
            ]
        },
        recuperacao: {
            name: '🧘 Recuperação Consciente',
            description: 'Descanso ativo e regeneração',
            hacks: [
                {
                    id: 'grounding',
                    name: '🦶 Grounding (Pés Descalços)',
                    description: 'Aterramento elétrico do corpo',
                    when: 'Manhã ou pós-treino, 10-20min',
                    benefits: ['Reduz inflamação', 'Melhora sono', 'Equilibra cortisol'],
                    protocol: 'Caminhar descalço na grama, areia ou terra',
                    tip: 'Combine com sol da manhã para efeito duplo'
                },
                {
                    id: 'sol_manha',
                    name: '☀️ Sol da Manhã',
                    description: 'Ritmo circadiano e vitamina D',
                    when: 'Primeiros 30min após acordar',
                    benefits: ['Ritmo circadiano', 'Vitamina D', 'Cortisol saudável', 'Melhor sono à noite'],
                    protocol: '10-30min de sol antes das 9h',
                    tip: 'Olhe para o horizonte (não direto ao sol)'
                },
                {
                    id: 'meditacao_movimento',
                    name: '🧘 Meditação em Movimento',
                    description: 'Presença total no treino',
                    when: 'Durante cada exercício',
                    benefits: ['Conexão mente-músculo', 'Menos lesões', 'Mais ganhos'],
                    protocol: 'Foque 100% no músculo trabalhando',
                    tip: 'Cada repetição é uma meditação'
                }
            ]
        }
    },

    // Obter todos os hacks
    getAllHacks() {
        const allHacks = [];
        for (const category of Object.values(this.categories)) {
            allHacks.push(...category.hacks);
        }
        return allHacks;
    },

    // Obter hacks como experimentos
    getHacksAsExperiments() {
        return this.getAllHacks().map(hack => ({
            id: `hack_${hack.id}`,
            name: hack.name,
            description: hack.description,
            duration: 14, // 2 semanas para testar
            hypothesis: `Ao usar ${hack.name}, vou sentir: ${hack.benefits.join(', ')}`,
            metrics: ['energy', 'motivation', 'training.intensity'],
            category: 'hack',
            protocol: hack.protocol,
            tip: hack.tip
        }));
    },

    // Obter hacks anti-catabolismo para ectomorfo
    getEctomorphStrategies() {
        return this.categories.antiCatabolismo.hacks;
    },

    // Obter protocolos de jejum seguro para ectomorfo
    getEctomorphFastingProtocol() {
        return this.categories.jejum.hacks;
    },

    // Renderizar hacks na UI
    renderHacksSection() {
        return `
            <div class="hacks-container">
                <h2>⚡ Hacks Naturais de Performance</h2>
                <p class="subtitle">Conhecimento ancestral que a ciência mainstream ignora</p>
                
                ${Object.entries(this.categories).map(([key, category]) => `
                    <div class="hack-category">
                        <h3>${category.name}</h3>
                        <p class="category-desc">${category.description}</p>
                        <div class="hacks-grid">
                            ${category.hacks.map(hack => `
                                <div class="hack-card" data-hack-id="${hack.id}">
                                    <h4>${hack.name}</h4>
                                    <p>${hack.description}</p>
                                    <div class="hack-when">⏰ ${hack.when}</div>
                                    <div class="hack-benefits">
                                        ${hack.benefits.map(b => `<span class="benefit-tag">${b}</span>`).join('')}
                                    </div>
                                    <div class="hack-protocol">
                                        <strong>Protocolo:</strong> ${hack.protocol}
                                    </div>
                                    ${hack.tip ? `<p class="hack-tip">💡 ${hack.tip}</p>` : ''}
                                    ${hack.warning ? `<p class="hack-warning">⚠️ ${hack.warning}</p>` : ''}
                                    <button class="btn btn-sm" onclick="startHackExperiment('${hack.id}')">
                                        🧪 Testar por 14 dias
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// Iniciar experimento de um hack
async function startHackExperiment(hackId) {
    const hack = NaturalHacks.getAllHacks().find(h => h.id === hackId);
    if (!hack) return;

    const experiment = {
        id: `hack_${hackId}_${Date.now()}`,
        name: hack.name,
        description: hack.protocol,
        duration: 14,
        hypothesis: `Benefícios esperados: ${hack.benefits.join(', ')}`,
        metrics: ['energy', 'motivation'],
        category: 'hack',
        tip: hack.tip
    };

    if (window.ExperimentsSystem) {
        await ExperimentsSystem.startExperiment(experiment);
        if (typeof showSuccess === 'function') {
            showSuccess(`🧪 Experimento "${hack.name}" iniciado por 14 dias!`);
        }
    }
}

// Exportar
window.NaturalHacks = NaturalHacks;
window.startHackExperiment = startHackExperiment;
