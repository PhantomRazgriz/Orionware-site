// ===== SERVICE ANIMATIONS CONTROLLER =====

class ServiceAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupCodeAnimation();
        this.setupMobileAnimation();
        this.setupCloudAnimation();
        this.setupConsultingAnimation();
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }

    // ===== SVILUPPO SOFTWARE ANIMATION =====
    setupCodeAnimation() {
        const codeLines = document.querySelectorAll('.code-line');
        const cursor = document.querySelector('.cursor');
        
        if (!codeLines.length || !cursor) return;

        codeLines.forEach((line, index) => {
            const text = line.dataset.text;
            if (!text) return;

            // Clear initial content
            line.textContent = '';
            
            setTimeout(() => {
                this.typeText(line, text, 50);
            }, (index + 1) * 1000);
        });

        // Setup tech bubble interactions
        const techBubbles = document.querySelectorAll('.tech-bubble');
        techBubbles.forEach(bubble => {
            bubble.addEventListener('mouseenter', () => {
                bubble.style.transform = 'scale(1.2)';
                bubble.style.boxShadow = '0 0 20px rgba(207, 53, 75, 0.6)';
            });

            bubble.addEventListener('mouseleave', () => {
                bubble.style.transform = '';
                bubble.style.boxShadow = '';
            });
        });
    }

    typeText(element, text, speed = 50) {
        let i = 0;
        const typing = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typing);
            }
        }, speed);
    }

    // ===== APP MOBILE ANIMATION =====
    setupMobileAnimation() {
        const appIcons = document.querySelectorAll('.app-icon');
        const notification = document.querySelector('.notification');
        
        // Set app icon colors from data attributes
        appIcons.forEach(icon => {
            const color = icon.dataset.color;
            if (color) {
                icon.style.background = color;
            }
        });

        // App icon click effects
        appIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = 'app-pulse 0.6s ease-out';
                
                // Create ripple effect
                this.createRippleEffect(icon);
            });
        });

        // Notification interaction
        if (notification) {
            notification.addEventListener('click', () => {
                notification.style.transform = 'translateY(-100px) scale(0.8)';
                notification.style.opacity = '0';
                
                setTimeout(() => {
                    notification.style.transform = '';
                    notification.style.opacity = '';
                }, 2000);
            });
        }
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // ===== CLOUD SOLUTIONS ANIMATION =====
    setupCloudAnimation() {
        const cloudMain = document.querySelector('.cloud-main');
        const servers = document.querySelectorAll('.server');
        const connectionPaths = document.querySelectorAll('.connection-path');

        // Interactive cloud
        if (cloudMain) {
            cloudMain.addEventListener('mouseenter', () => {
                const icon = cloudMain.querySelector('i');
                if (icon) {
                    icon.style.color = '#ff6b6b';
                    icon.style.transform = 'scale(1.1)';
                }
            });

            cloudMain.addEventListener('mouseleave', () => {
                const icon = cloudMain.querySelector('i');
                if (icon) {
                    icon.style.color = '';
                    icon.style.transform = '';
                }
            });
        }

        // Server status simulation
        servers.forEach((server, index) => {
            setInterval(() => {
                this.updateServerStatus(server);
            }, 3000 + (index * 1000));
        });

        // Dynamic connection visualization
        this.animateConnections(connectionPaths);
    }

    updateServerStatus(server) {
        const lights = server.querySelectorAll('.light');
        const statuses = ['green', 'orange', 'green'];
        
        lights.forEach((light, index) => {
            // Remove all status classes
            light.className = 'light';
            
            // Add random status
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            light.classList.add(randomStatus);
        });
    }

    animateConnections(paths) {
        paths.forEach((path, index) => {
            setInterval(() => {
                // Create data pulse effect
                const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                pulse.setAttribute("r", "3");
                pulse.setAttribute("fill", "#00ff00");
                
                const pathLength = path.getTotalLength();
                let distance = 0;
                
                const animatePulse = () => {
                    if (distance <= pathLength) {
                        const point = path.getPointAtLength(distance);
                        pulse.setAttribute("cx", point.x);
                        pulse.setAttribute("cy", point.y);
                        distance += 5;
                        requestAnimationFrame(animatePulse);
                    } else {
                        pulse.remove();
                    }
                };
                
                path.parentNode.appendChild(pulse);
                animatePulse();
                
            }, 2000 + (index * 1000));
        });
    }

    // ===== CONSULENZA IT ANIMATION =====
    setupConsultingAnimation() {
        const metricValues = document.querySelectorAll('.metric-value');
        const chartBars = document.querySelectorAll('.chart-bar');
        const analysisPoints = document.querySelectorAll('.point');

        // Animate metric counters
        metricValues.forEach(metric => {
            const target = parseInt(metric.dataset.target) || 0;
            this.animateCounter(metric, target);
        });

        // Set chart bar heights and animate
        chartBars.forEach(bar => {
            const height = bar.dataset.height;
            if (height) {
                bar.style.setProperty('--target-height', height);
                // Restart animation on hover
                bar.addEventListener('mouseenter', () => {
                    bar.style.background = 'linear-gradient(to top, #ff6b6b, #ff8e8e)';
                });
                bar.addEventListener('mouseleave', () => {
                    bar.style.background = '';
                });
            }
        });

        // Analysis points tooltips
        analysisPoints.forEach(point => {
            const insight = point.dataset.insight;
            if (insight) {
                point.addEventListener('mouseenter', (e) => {
                    this.showTooltip(e.target, insight);
                });
                point.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            }
        });
    }

    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    showTooltip(element, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'animation-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(20, 20, 30, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            border: 1px solid rgba(207, 53, 75, 0.5);
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        // Fade in
        tooltip.style.opacity = '0';
        requestAnimationFrame(() => {
            tooltip.style.transition = 'opacity 0.3s';
            tooltip.style.opacity = '1';
        });
    }

    hideTooltip() {
        const tooltip = document.querySelector('.animation-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const serviceImages = document.querySelectorAll('.service-image');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.startServiceAnimation(entry.target);
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, { threshold: 0.3 });

        serviceImages.forEach(image => {
            observer.observe(image);
        });
    }

    startServiceAnimation(serviceImage) {
        // Restart specific animations when service comes into view
        const codeLines = serviceImage.querySelectorAll('.code-line');
        const appIcons = serviceImage.querySelectorAll('.app-icon');
        const chartBars = serviceImage.querySelectorAll('.chart-bar');
        const metricValues = serviceImage.querySelectorAll('.metric-value');

        // Reset and restart code animation
        if (codeLines.length > 0) {
            codeLines.forEach((line, index) => {
                line.textContent = '';
                const text = line.dataset.text;
                if (text) {
                    setTimeout(() => {
                        this.typeText(line, text, 30);
                    }, (index + 1) * 500);
                }
            });
        }

        // Reset and restart counter animations
        if (metricValues.length > 0) {
            metricValues.forEach(metric => {
                const target = parseInt(metric.dataset.target) || 0;
                metric.textContent = '0';
                setTimeout(() => {
                    this.animateCounter(metric, target);
                }, 500);
            });
        }
    }

    // ===== HOVER EFFECTS =====
    setupHoverEffects() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const serviceImage = item.querySelector('.service-image');
                if (serviceImage) {
                    serviceImage.style.transform = 'scale(1.02)';
                    serviceImage.style.filter = 'brightness(1.1)';
                }
            });

            item.addEventListener('mouseleave', () => {
                const serviceImage = item.querySelector('.service-image');
                if (serviceImage) {
                    serviceImage.style.transform = '';
                    serviceImage.style.filter = '';
                }
            });
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    new ServiceAnimations();
});

// Optional: Add smooth scrolling to service links
document.addEventListener('click', (e) => {
    if (e.target.closest('.service-link')) {
        e.preventDefault();
        const href = e.target.closest('.service-link').getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// Performance optimization: Pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
    const serviceImages = document.querySelectorAll('.service-image');
    
    if (document.hidden) {
        // Pause animations
        serviceImages.forEach(image => {
            image.style.animationPlayState = 'paused';
            const animatedElements = image.querySelectorAll('*');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        });
    } else {
        // Resume animations
        serviceImages.forEach(image => {
            image.style.animationPlayState = 'running';
            const animatedElements = image.querySelectorAll('*');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        });
    }
});