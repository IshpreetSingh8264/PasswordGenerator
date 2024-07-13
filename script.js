document.getElementById('generate').addEventListener('click', function () {
    const length = document.getElementById('length').value;
    const complexity = document.getElementById('complexity').value;

    const password = generatePassword(length, complexity);
    document.getElementById('password').value = password;

    const strength = getPasswordStrength(password);
    updateStrengthMeter(strength);
});

function generatePassword(length, complexity) {
    let charset = '';
    if (complexity === 'low') {
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    } else if (complexity === 'medium') {
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
    } else if (complexity === 'high') {
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?`~';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) {
        strength++;
    }
    if (password.match(/[a-z]/)) {
        strength++;
    }
    if (password.match(/[A-Z]/)) {
        strength++;
    }
    if (password.match(/[0-9]/)) {
        strength++;
    }
    if (password.match(/[!@#$%^&*()-_=+[{]}\\|;:\'",<.>\/ ? `~]/)) {
        strength++;
    }

    return strength;
}

function updateStrengthMeter(strength) {
    const meter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('strength-text');

    // Remove all previous strength classes
    meter.classList.remove('low', 'medium', 'high');

    // Add appropriate strength class
    if (strength === 1) {
        meter.classList.add('low');
        strengthText.textContent = 'Weak';
    } else if (strength === 2 || strength === 3) {
        meter.classList.add('medium');
        strengthText.textContent = 'Medium';
    } else if (strength >= 4) {
        meter.classList.add('high');
        strengthText.textContent = 'Strong';
    }
}
