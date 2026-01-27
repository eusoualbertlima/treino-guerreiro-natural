// Firebase Configuration for Laboratório Pessoal
// This file contains the Firebase setup for cloud sync and Google Auth

// Firebase SDK imports (using CDN for simplicity)
// These are loaded via script tags in index.html

// Firebase configuration object - REAL CREDENTIALS
const firebaseConfig = {
    apiKey: "AIzaSyAdHNkds94m547AfuzVoaWd-V6uUCCEDCo",
    authDomain: "laboratorio-pessoal.firebaseapp.com",
    databaseURL: "https://laboratorio-pessoal-default-rtdb.firebaseio.com",
    projectId: "laboratorio-pessoal",
    storageBucket: "laboratorio-pessoal.firebasestorage.app",
    messagingSenderId: "948925291956",
    appId: "1:948925291956:web:6b3656d476bf219b8926e1",
    measurementId: "G-EL2CF44NBE"
};

// Initialize Firebase when SDK is loaded
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDB = null;
let currentUser = null;

function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded yet');
        return false;
    }

    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        firebaseAuth = firebase.auth();
        firebaseDB = firebase.database();

        // Listen for auth state changes
        firebaseAuth.onAuthStateChanged(handleAuthStateChange);

        console.log('✅ Firebase initialized');
        return true;
    } catch (error) {
        console.error('❌ Firebase init error:', error);
        return false;
    }
}

// Handle auth state changes
function handleAuthStateChange(user) {
    currentUser = user;

    if (user) {
        console.log('✅ Logged in as:', user.displayName || user.email);
        document.body.classList.add('logged-in');
        document.body.classList.remove('logged-out');

        // Update UI with user info
        updateUserUI(user);

        // Start data sync
        startDataSync();

        // Migrate local data if exists
        migrateLocalData();
    } else {
        console.log('❌ Not logged in');
        document.body.classList.add('logged-out');
        document.body.classList.remove('logged-in');

        // Show login screen
        showLoginScreen();
    }
}

// Google Sign In (1 click)
async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        showLoading('Entrando com Google...');
        const result = await firebaseAuth.signInWithPopup(provider);
        console.log('✅ Google sign in successful:', result.user.displayName);
        hideLoading();
        return result.user;
    } catch (error) {
        console.error('❌ Google sign in error:', error);
        hideLoading();
        showError('Erro ao entrar com Google. Tente novamente.');
        return null;
    }
}

// Sign out
async function signOut() {
    try {
        await firebaseAuth.signOut();
        console.log('✅ Signed out');
    } catch (error) {
        console.error('❌ Sign out error:', error);
    }
}

// Update UI with user info
function updateUserUI(user) {
    const userNameEl = document.getElementById('userName');
    const userPhotoEl = document.getElementById('userPhoto');

    if (userNameEl) {
        userNameEl.textContent = user.displayName || 'Guerreiro';
    }

    if (userPhotoEl && user.photoURL) {
        userPhotoEl.src = user.photoURL;
        userPhotoEl.style.display = 'block';
    }
}

// Show/hide loading overlay
function showLoading(message = 'Carregando...') {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p class="loading-message">${message}</p>
        `;
        document.body.appendChild(overlay);
    } else {
        overlay.querySelector('.loading-message').textContent = message;
        overlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

// Show error message
function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show success message
function showSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show login screen
function showLoginScreen() {
    const mainContent = document.querySelector('.main-content');
    const bottomNav = document.querySelector('.bottom-nav');

    if (mainContent) mainContent.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';

    // Create login screen if not exists
    let loginScreen = document.getElementById('loginScreen');
    if (!loginScreen) {
        loginScreen = document.createElement('div');
        loginScreen.id = 'loginScreen';
        loginScreen.className = 'login-screen';
        loginScreen.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <h1>🧪 Laboratório Pessoal</h1>
                    <p>Seu sistema de despertar consciente</p>
                </div>
                
                <div class="login-features">
                    <div class="feature">
                        <span>💪</span>
                        <p>Treino Adaptativo</p>
                    </div>
                    <div class="feature">
                        <span>🧘</span>
                        <p>Meditação</p>
                    </div>
                    <div class="feature">
                        <span>🌅</span>
                        <p>Rotina Holística</p>
                    </div>
                    <div class="feature">
                        <span>🧪</span>
                        <p>Experimentos</p>
                    </div>
                </div>
                
                <button onclick="signInWithGoogle()" class="google-signin-btn">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Entrar com Google
                </button>
                
                <p class="login-note">
                    Seus dados sincronizam entre celular e computador
                </p>
            </div>
        `;
        document.body.appendChild(loginScreen);
    } else {
        loginScreen.style.display = 'flex';
    }
}

// Hide login screen
function hideLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.querySelector('.main-content');
    const bottomNav = document.querySelector('.bottom-nav');

    if (loginScreen) loginScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    if (bottomNav) bottomNav.style.display = 'flex';
}

// Export for use in other modules
window.FirebaseAuth = {
    init: initFirebase,
    signIn: signInWithGoogle,
    signOut: signOut,
    getCurrentUser: () => currentUser,
    isLoggedIn: () => currentUser !== null
};
