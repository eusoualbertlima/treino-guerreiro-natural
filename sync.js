// Cloud Sync Module for Laboratório Pessoal
// Handles data synchronization between devices using Firebase Realtime Database

const CloudSync = {
    // Reference to Firebase database
    db: null,
    userRef: null,
    isOnline: true,
    pendingWrites: [],
    listeners: [],

    // Initialize sync for current user
    init(userId) {
        if (!firebase || !firebase.database) {
            console.error('Firebase not initialized');
            return false;
        }

        this.db = firebase.database();
        this.userRef = this.db.ref(`users/${userId}`);

        // Monitor connection state
        this.db.ref('.info/connected').on('value', (snap) => {
            this.isOnline = snap.val() === true;
            console.log(this.isOnline ? '🟢 Online' : '🔴 Offline');

            if (this.isOnline && this.pendingWrites.length > 0) {
                this.processPendingWrites();
            }
        });

        // Enable offline persistence
        this.db.goOnline();

        console.log('✅ Cloud sync initialized for user:', userId);
        return true;
    },

    // Get user data reference
    getRef(path) {
        return this.userRef.child(path);
    },

    // Save data to cloud
    async save(path, data) {
        const ref = this.getRef(path);

        try {
            await ref.set(data);
            console.log(`✅ Saved to cloud: ${path}`);
            return true;
        } catch (error) {
            console.error(`❌ Save error (${path}):`, error);

            // Queue for later if offline
            if (!this.isOnline) {
                this.pendingWrites.push({ path, data, timestamp: Date.now() });
                // Also save to localStorage as backup
                this.saveLocal(path, data);
            }
            return false;
        }
    },

    // Update data (merge, don't replace)
    async update(path, data) {
        const ref = this.getRef(path);

        try {
            await ref.update(data);
            console.log(`✅ Updated in cloud: ${path}`);
            return true;
        } catch (error) {
            console.error(`❌ Update error (${path}):`, error);
            return false;
        }
    },

    // Push new item to list (auto-generates key)
    async push(path, data) {
        const ref = this.getRef(path);

        try {
            const newRef = await ref.push(data);
            console.log(`✅ Pushed to cloud: ${path}/${newRef.key}`);
            return newRef.key;
        } catch (error) {
            console.error(`❌ Push error (${path}):`, error);
            return null;
        }
    },

    // Get data once
    async get(path) {
        const ref = this.getRef(path);

        try {
            const snapshot = await ref.once('value');
            return snapshot.val();
        } catch (error) {
            console.error(`❌ Get error (${path}):`, error);
            // Try local backup
            return this.getLocal(path);
        }
    },

    // Listen for real-time updates
    listen(path, callback) {
        const ref = this.getRef(path);

        const listener = ref.on('value', (snapshot) => {
            callback(snapshot.val());
        });

        this.listeners.push({ ref, listener });
        return listener;
    },

    // Stop listening
    unlisten(path) {
        const ref = this.getRef(path);
        ref.off();
    },

    // Process pending writes when back online
    async processPendingWrites() {
        console.log(`📤 Processing ${this.pendingWrites.length} pending writes...`);

        for (const write of this.pendingWrites) {
            await this.save(write.path, write.data);
        }

        this.pendingWrites = [];
        console.log('✅ All pending writes processed');
    },

    // Local storage backup
    saveLocal(path, data) {
        const key = `labpessoal_${path.replace(/\//g, '_')}`;
        localStorage.setItem(key, JSON.stringify(data));
    },

    getLocal(path) {
        const key = `labpessoal_${path.replace(/\//g, '_')}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // Cleanup on logout
    cleanup() {
        // Remove all listeners
        for (const { ref } of this.listeners) {
            ref.off();
        }
        this.listeners = [];
        this.userRef = null;
    }
};

// Data sync manager - handles specific data types
const DataSync = {
    // Sync check-ins
    async saveCheckin(checkinData) {
        const today = new Date().toISOString().split('T')[0];
        return await CloudSync.save(`checkins/${today}`, {
            ...checkinData,
            timestamp: Date.now()
        });
    },

    async getCheckin(date) {
        return await CloudSync.get(`checkins/${date}`);
    },

    async getAllCheckins() {
        return await CloudSync.get('checkins') || {};
    },

    // Sync workouts
    async saveWorkout(workoutData) {
        const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return await CloudSync.save(`workouts/${id}`, {
            ...workoutData,
            id,
            timestamp: Date.now()
        });
    },

    async getWorkouts() {
        const workouts = await CloudSync.get('workouts') || {};
        return Object.values(workouts).sort((a, b) => b.timestamp - a.timestamp);
    },

    // Sync experiments
    async saveExperiment(experimentData) {
        const id = experimentData.id || `exp_${Date.now()}`;
        return await CloudSync.save(`experiments/${id}`, {
            ...experimentData,
            id,
            updatedAt: Date.now()
        });
    },

    async getExperiments() {
        const experiments = await CloudSync.get('experiments') || {};
        return Object.values(experiments);
    },

    // Sync user profile/settings
    async saveProfile(profileData) {
        return await CloudSync.save('profile', {
            ...profileData,
            updatedAt: Date.now()
        });
    },

    async getProfile() {
        return await CloudSync.get('profile') || {
            weight: 68,
            goalWeight: 85,
            createdAt: Date.now()
        };
    },

    // Sync routine data (holistic tracking)
    async saveRoutine(date, routineData) {
        return await CloudSync.save(`routine/${date}`, {
            ...routineData,
            date,
            timestamp: Date.now()
        });
    },

    async getRoutine(date) {
        return await CloudSync.get(`routine/${date}`);
    },

    async getRoutineHistory(days = 30) {
        const routine = await CloudSync.get('routine') || {};
        const entries = Object.values(routine);

        // Sort by date, most recent first
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        return entries.slice(0, days);
    }
};

// Start data sync when user logs in
function startDataSync() {
    const user = window.FirebaseAuth?.getCurrentUser();
    if (!user) {
        console.warn('No user logged in, cannot start sync');
        return;
    }

    CloudSync.init(user.uid);

    // Hide login screen and show main app
    hideLoginScreen();

    // Load user data
    loadUserData();
}

// Load all user data from cloud
async function loadUserData() {
    showLoading('Carregando seus dados...');

    try {
        // Load profile
        const profile = await DataSync.getProfile();
        if (profile.weight) {
            currentWeight = profile.weight;
            document.getElementById('weightInput').value = currentWeight;
            document.getElementById('currentWeight').textContent = currentWeight + 'kg';
            updateProgressBar();
        }

        // Load today's checkin if exists
        const today = new Date().toISOString().split('T')[0];
        const todayCheckin = await DataSync.getCheckin(today);
        if (todayCheckin) {
            console.log('✅ Today\'s checkin loaded:', todayCheckin);
        }

        // Load workout history
        const workouts = await DataSync.getWorkouts();
        console.log(`✅ Loaded ${workouts.length} workouts from cloud`);

        hideLoading();
        showSuccess('Dados sincronizados!');

    } catch (error) {
        console.error('Error loading user data:', error);
        hideLoading();
        showError('Erro ao carregar dados. Usando dados locais.');
    }
}

// Migrate local data to cloud (one-time)
async function migrateLocalData() {
    const migrated = localStorage.getItem('dataMigrated');
    if (migrated) return;

    console.log('🔄 Checking for local data to migrate...');

    // Migrate workout history
    const localHistory = localStorage.getItem('workoutHistory');
    if (localHistory) {
        try {
            const workouts = JSON.parse(localHistory);
            if (workouts && workouts.length > 0) {
                console.log(`📤 Migrating ${workouts.length} local workouts to cloud...`);

                for (const workout of workouts) {
                    await DataSync.saveWorkout({
                        date: workout.date,
                        day: workout.day,
                        exercises: workout.exercises,
                        completed: workout.completed,
                        migratedFrom: 'localStorage'
                    });
                }

                console.log('✅ Workout history migrated');
            }
        } catch (error) {
            console.error('Error migrating workout history:', error);
        }
    }

    // Migrate weight
    const localWeight = localStorage.getItem('weight');
    if (localWeight) {
        await DataSync.saveProfile({
            weight: parseFloat(localWeight),
            goalWeight: 85
        });
        console.log('✅ Weight migrated');
    }

    // Mark as migrated
    localStorage.setItem('dataMigrated', 'true');
    showSuccess('Dados antigos migrados para a nuvem!');
}

// Export for global access
window.CloudSync = CloudSync;
window.DataSync = DataSync;
