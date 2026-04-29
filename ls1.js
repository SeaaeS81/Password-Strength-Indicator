const inputTest = document.getElementById("inputTest");
const feedback = document.getElementById("passwordFeedback");
const scoreValue = document.getElementById("scoreValue");
const entropyValue = document.getElementById("entropyValue");
const crackValue = document.getElementById("crackValue");
const sections = Array.from(document.querySelectorAll(".section"));
const generatePasswordBtn = document.getElementById("generatePassword");
const copyPasswordBtn = document.getElementById("copyPassword");
const toggleVisibilityBtn = document.getElementById("toggleVisibility");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const insightList = document.getElementById("insightList");
const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
const commonPasswords = ["123456", "password", "qwerty", "admin", "111111", "letmein", "welcome"];
const historyKey = "password-lab-history";
const langKey = "password-lab-lang";
let currentLang = localStorage.getItem(langKey) || "en";

const i18n = {
    en: {
        appTitle: "Password Lab Pro",
        subtitle: "Security-focused password strength analyzer",
        passwordPlaceholder: "Try a password...",
        showBtn: "Show",
        hideBtn: "Hide",
        generateBtn: "Generate strong password",
        copyBtn: "Copy",
        copiedBtn: "Copied",
        scoreLabel: "Score",
        entropyLabel: "Entropy",
        crackLabel: "Crack time",
        checkLength: "At least 12 characters",
        checkUpper: "Uppercase letters",
        checkLower: "Lowercase letters",
        checkDigit: "Numbers",
        checkSpecial: "Special symbols",
        checkCommon: "Not a common password",
        insightsTitle: "Why this password is weak",
        historyTitle: "Recent checks",
        historySubtitle: "Saved locally in your browser",
        clearHistoryBtn: "Clear history",
        footerNote: "Build for portfolio: UX + security + product thinking.",
        noChecks: "No checks yet.",
        emptyMessage: "Enter a password to analyze.",
        weak: "Weak password.",
        medium: "Medium password.",
        good: "Good password.",
        strong: "Strong password.",
        tooCommon: "This password is too common.",
        instant: "Instant",
        years: "years",
        days: "days",
        hours: "h",
        minutes: "min",
        seconds: "sec",
        weakReasons: [
            "Increase length to at least 12 characters.",
            "Add uppercase letters.",
            "Add lowercase letters.",
            "Add numbers.",
            "Add special symbols.",
            "Avoid common passwords."
        ],
        strongReasons: ["Looks strong. Keep it unique for every account."]
    },
    de: {
        appTitle: "Password Lab Pro",
        subtitle: "Sicherheitsorientierter Passwort-Analysator",
        passwordPlaceholder: "Passwort eingeben...",
        showBtn: "Anzeigen",
        hideBtn: "Verbergen",
        generateBtn: "Starkes Passwort erzeugen",
        copyBtn: "Kopieren",
        copiedBtn: "Kopiert",
        scoreLabel: "Score",
        entropyLabel: "Entropie",
        crackLabel: "Knackzeit",
        checkLength: "Mindestens 12 Zeichen",
        checkUpper: "Großbuchstaben",
        checkLower: "Kleinbuchstaben",
        checkDigit: "Zahlen",
        checkSpecial: "Sonderzeichen",
        checkCommon: "Kein häufiges Passwort",
        insightsTitle: "Warum dieses Passwort schwach ist",
        historyTitle: "Letzte Prüfungen",
        historySubtitle: "Lokal im Browser gespeichert",
        clearHistoryBtn: "Verlauf löschen",
        footerNote: "Portfolio-Build: UX + Sicherheit + Product Thinking.",
        noChecks: "Noch keine Prüfungen.",
        emptyMessage: "Passwort eingeben und analysieren.",
        weak: "Schwaches Passwort.",
        medium: "Mittleres Passwort.",
        good: "Gutes Passwort.",
        strong: "Starkes Passwort.",
        tooCommon: "Dieses Passwort ist zu häufig.",
        instant: "Sofort",
        years: "Jahre",
        days: "Tage",
        hours: "Std",
        minutes: "Min",
        seconds: "Sek",
        weakReasons: [
            "Erhöhe die Länge auf mindestens 12 Zeichen.",
            "Füge Großbuchstaben hinzu.",
            "Füge Kleinbuchstaben hinzu.",
            "Füge Zahlen hinzu.",
            "Füge Sonderzeichen hinzu.",
            "Vermeide häufige Passwörter."
        ],
        strongReasons: ["Sieht stark aus. Für jedes Konto ein eigenes Passwort nutzen."]
    },
    uk: {
        appTitle: "Password Lab Pro",
        subtitle: "Аналізатор надійності пароля з акцентом на безпеку",
        passwordPlaceholder: "Введіть пароль...",
        showBtn: "Показати",
        hideBtn: "Сховати",
        generateBtn: "Згенерувати сильний пароль",
        copyBtn: "Копіювати",
        copiedBtn: "Скопійовано",
        scoreLabel: "Оцінка",
        entropyLabel: "Ентропія",
        crackLabel: "Час злому",
        checkLength: "Щонайменше 12 символів",
        checkUpper: "Великі літери",
        checkLower: "Малі літери",
        checkDigit: "Цифри",
        checkSpecial: "Спецсимволи",
        checkCommon: "Не поширений пароль",
        insightsTitle: "Чому цей пароль слабкий",
        historyTitle: "Останні перевірки",
        historySubtitle: "Збережено локально у браузері",
        clearHistoryBtn: "Очистити історію",
        footerNote: "Проєкт для портфоліо: UX + безпека + продуктове мислення.",
        noChecks: "Поки немає перевірок.",
        emptyMessage: "Введіть пароль для аналізу.",
        weak: "Слабкий пароль.",
        medium: "Середній пароль.",
        good: "Хороший пароль.",
        strong: "Сильний пароль.",
        tooCommon: "Цей пароль занадто поширений.",
        instant: "Миттєво",
        years: "років",
        days: "днів",
        hours: "год",
        minutes: "хв",
        seconds: "сек",
        weakReasons: [
            "Збільште довжину до 12+ символів.",
            "Додайте великі літери.",
            "Додайте малі літери.",
            "Додайте цифри.",
            "Додайте спецсимволи.",
            "Уникайте поширених паролів."
        ],
        strongReasons: ["Виглядає надійно. Використовуйте унікальний пароль для кожного акаунта."]
    }
};

const checksUi = {
    checkLength: document.getElementById("checkLength"),
    checkUpper: document.getElementById("checkUpper"),
    checkLower: document.getElementById("checkLower"),
    checkDigit: document.getElementById("checkDigit"),
    checkSpecial: document.getElementById("checkSpecial"),
    checkCommon: document.getElementById("checkCommon")
};

const t = (key) => (i18n[currentLang] && i18n[currentLang][key]) || i18n.en[key] || key;

const applyTranslations = () => {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    const isHidden = inputTest.type === "password";
    toggleVisibilityBtn.textContent = isHidden ? t("showBtn") : t("hideBtn");
    copyPasswordBtn.textContent = t("copyBtn");
    renderHistory();
};

const formatTime = (seconds) => {
    if (seconds < 1) return t("instant");
    if (seconds < 60) return `${Math.round(seconds)} ${t("seconds")}`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} ${t("minutes")}`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} ${t("hours")}`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} ${t("days")}`;
    return `${Math.round(seconds / 31536000)} ${t("years")}`;
};

const getCharsetSize = (password) => {
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/\d/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 33;
    return charset || 1;
};

const evaluatePassword = (password) => {
    const checks = {
        length: password.length >= 12,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        digit: /\d/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
        uncommon: !commonPasswords.includes(password.toLowerCase())
    };

    const passedCoreChecks = [checks.length, checks.upper, checks.lower, checks.digit, checks.special].filter(Boolean).length;
    const charset = getCharsetSize(password);
    const entropy = password.length * Math.log2(charset);
    const crackSeconds = Math.pow(charset, password.length) / 1e9;
    const entropyBonus = Math.min(30, Math.round(entropy / 2.5));
    const score = Math.max(0, Math.min(100, passedCoreChecks * 14 + entropyBonus + (checks.uncommon ? 0 : -20)));

    let level = "weak";
    if (score >= 80) level = "strong";
    else if (score >= 60) level = "good";
    else if (score >= 40) level = "medium";

    let feedbackMessage = t("emptyMessage");
    if (password.length > 0) {
        feedbackMessage = t(level);
        if (!checks.uncommon) feedbackMessage += ` ${t("tooCommon")}`;
    }

    const reasons = [];
    if (!checks.length) reasons.push(i18n[currentLang].weakReasons[0]);
    if (!checks.upper) reasons.push(i18n[currentLang].weakReasons[1]);
    if (!checks.lower) reasons.push(i18n[currentLang].weakReasons[2]);
    if (!checks.digit) reasons.push(i18n[currentLang].weakReasons[3]);
    if (!checks.special) reasons.push(i18n[currentLang].weakReasons[4]);
    if (!checks.uncommon) reasons.push(i18n[currentLang].weakReasons[5]);
    if (reasons.length === 0) reasons.push(i18n[currentLang].strongReasons[0]);

    return { checks, score, entropy, crackSeconds, feedbackMessage, reasons };
};

const paintMeter = (score) => {
    sections.forEach((section) => {
        section.style.background = "var(--empty)";
    });

    const activeBars = Math.ceil(score / 20);
    let color = "var(--weak)";
    if (score >= 80) color = "var(--strong)";
    else if (score >= 40) color = "var(--medium)";

    for (let i = 0; i < activeBars; i += 1) {
        if (sections[i]) {
            sections[i].style.background = color;
        }
    }
};

const setCheckState = (node, isPass) => {
    node.classList.remove("pass", "fail");
    node.classList.add(isPass ? "pass" : "fail");
};

const saveToHistory = (password, score) => {
    if (!password) return;
    const safePassword = `${password.slice(0, 2)}${"*".repeat(Math.max(0, password.length - 4))}${password.slice(-2)}`;
    const item = `${safePassword} - ${score}/100`;
    const existing = JSON.parse(localStorage.getItem(historyKey) || "[]");
    const next = [item, ...existing.filter((x) => x !== item)].slice(0, 5);
    localStorage.setItem(historyKey, JSON.stringify(next));
    renderHistory();
};

const renderHistory = () => {
    const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
    historyList.innerHTML = "";
    if (history.length === 0) {
        historyList.innerHTML = `<li>${t("noChecks")}</li>`;
        return;
    }
    history.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
};

const updateUI = (result) => {
    paintMeter(result.score);
    scoreValue.textContent = `${result.score}/100`;
    entropyValue.textContent = `${Math.round(result.entropy || 0)} bits`;
    crackValue.textContent = formatTime(result.crackSeconds);
    feedback.textContent = result.feedbackMessage;
    insightList.innerHTML = "";
    result.reasons.forEach((reason) => {
        const li = document.createElement("li");
        li.textContent = reason;
        insightList.appendChild(li);
    });

    setCheckState(checksUi.checkLength, result.checks.length);
    setCheckState(checksUi.checkUpper, result.checks.upper);
    setCheckState(checksUi.checkLower, result.checks.lower);
    setCheckState(checksUi.checkDigit, result.checks.digit);
    setCheckState(checksUi.checkSpecial, result.checks.special);
    setCheckState(checksUi.checkCommon, result.checks.uncommon);
};

const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";
    let generated = "";
    for (let i = 0; i < 16; i += 1) {
        generated += chars[Math.floor(Math.random() * chars.length)];
    }
    inputTest.value = generated;
    const result = evaluatePassword(generated);
    updateUI(result);
    saveToHistory(generated, result.score);
};

inputTest.addEventListener("input", () => {
    const result = evaluatePassword(inputTest.value);
    updateUI(result);
});

inputTest.addEventListener("blur", () => {
    const result = evaluatePassword(inputTest.value);
    saveToHistory(inputTest.value, result.score);
});

generatePasswordBtn.addEventListener("click", generatePassword);

copyPasswordBtn.addEventListener("click", async () => {
    if (!inputTest.value) return;
    await navigator.clipboard.writeText(inputTest.value);
    copyPasswordBtn.textContent = t("copiedBtn");
    setTimeout(() => {
        copyPasswordBtn.textContent = t("copyBtn");
    }, 1200);
});

toggleVisibilityBtn.addEventListener("click", () => {
    const nextType = inputTest.type === "password" ? "text" : "password";
    inputTest.type = nextType;
    toggleVisibilityBtn.textContent = nextType === "password" ? t("showBtn") : t("hideBtn");
});

clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem(historyKey);
    renderHistory();
});

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentLang = button.dataset.lang;
        localStorage.setItem(langKey, currentLang);
        langButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === currentLang));
        applyTranslations();
        updateUI(evaluatePassword(inputTest.value));
    });
});

langButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === currentLang));
applyTranslations();
renderHistory();
updateUI(evaluatePassword(""));