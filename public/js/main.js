// DOM content loaded event
document.addEventListener('DOMContentLoaded', function() {
    console.log('TedGit Web Service - Frontend loaded');
    
    // Initialize animations and interactions
    initAnimations();
    initApiInfo();
    initThemeToggle();
});

// Initialize page animations
function initAnimations() {
    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${0.6 + (index * 0.2)}s`;
    });
    
    // Add hover effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        mainTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add click animation to feature cards
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Initialize API information display
function initApiInfo() {
    // Fetch and display server info
    fetch('/api/info')
        .then(response => response.json())
        .then(data => {
            console.log('Server Info:', data);
            updateServerInfo(data);
        })
        .catch(error => {
            console.error('Error fetching server info:', error);
        });
    
    // Check server health
    fetch('/health')
        .then(response => response.json())
        .then(data => {
            console.log('Health Status:', data);
            updateHealthStatus(data);
        })
        .catch(error => {
            console.error('Error checking health:', error);
        });
}

// Update server information display
function updateServerInfo(serverInfo) {
    // You can update the UI with server info if needed
    // For example, update the version in the footer
    const footer = document.querySelector('.footer');
    if (footer && serverInfo.version) {
        const versionInfo = document.createElement('p');
        versionInfo.textContent = `版本: ${serverInfo.version}`;
        versionInfo.style.fontSize = '0.9rem';
        versionInfo.style.color = 'rgba(255, 255, 255, 0.6)';
        footer.appendChild(versionInfo);
    }
}

// Update health status display
function updateHealthStatus(healthData) {
    // Create a small status indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'status-indicator';
    statusIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${healthData.status === 'OK' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    statusIndicator.textContent = `服务器状态: ${healthData.status}`;
    
    document.body.appendChild(statusIndicator);
    
    // Remove status indicator after 5 seconds
    setTimeout(() => {
        statusIndicator.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (statusIndicator.parentNode) {
                statusIndicator.parentNode.removeChild(statusIndicator);
            }
        }, 300);
    }, 5000);
}

// Theme toggle functionality (optional)
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    
    document.body.appendChild(themeToggle);
}

// Toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = '☀️';
        }
    }
}

// Add CSS for light theme
const lightThemeStyles = `
    body.light-theme {
        background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    }
    
    body.light-theme .main-title {
        background: linear-gradient(45deg, #2d3436, #636e72);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Inject light theme styles
const styleSheet = document.createElement('style');
styleSheet.textContent = lightThemeStyles;
document.head.appendChild(styleSheet);

// Load theme preference on page load
loadThemePreference();

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

// Service Worker registration for PWA support (optional)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Uncomment to enable service worker
// registerServiceWorker();