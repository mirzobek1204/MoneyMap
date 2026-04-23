document.addEventListener('DOMContentLoaded', () => {
    // 1. Avtorizatsiyani tekshirish (Agar login qilmagan bo'lsa, index.html ga haydaydi)
    const user = window.PulPulse.requireAuth();
    if (!user) return;

    // 2. Sahifadagi barcha matnlarni tarjima qilish
    window.PulPulse.applyI18n();
    window.PulPulse.bindLanguageSelect(document.getElementById('languageSelect'));

    // 3. UI elementlarini yangilash funksiyasi
    const updateUI = () => {
        const stats = window.PulPulse.getStats(user);
        const budget = window.PulPulse.getBudget(user);
        const insight = window.PulPulse.getInsight(user);
        const challenge = window.PulPulse.getChallenge(user);

        // Statistikani kartochkalarga chiqarish
        document.getElementById('todayExpense').textContent = window.PulPulse.formatCurrency(stats.today);
        document.getElementById('monthExpense').textContent = window.PulPulse.formatCurrency(stats.month);
        document.getElementById('totalExpense').textContent = window.PulPulse.formatCurrency(stats.total);

        // Budget ma'lumotlari
        const budgetStatus = document.getElementById('budgetStatus');
        if (budget > 0) {
            const left = budget - stats.month;
            budgetStatus.textContent = left >= 0 
                ? `Qolgan budget: ${window.PulPulse.formatCurrency(left)}` 
                : `Limitdan oshdi: ${window.PulPulse.formatCurrency(Math.abs(left))}`;
        } else {
            budgetStatus.textContent = "Budget belgilanmagan";
        }

        // Insight va Challenge
        document.getElementById('insightText').textContent = insight;
        document.getElementById('challengeText').textContent = challenge;

        // Xarajatlar ro'yxatini chiqarish (Jadval)
        renderExpenses();
    };

    // 4. Xarajatlarni jadvalga chiqarish
    const renderExpenses = () => {
        const expenses = window.PulPulse.getExpenses(user);
        const container = document.getElementById('expenseList');
        if (!container) return;

        container.innerHTML = expenses.reverse().map(exp => `
            <div class="expense-item">
                <div class="info">
                    <strong>${window.PulPulse.t('category.' + exp.category)}</strong>
                    <span>${exp.note || 'Izoh yo\'q'}</span>
                    <small>${exp.date}</small>
                </div>
                <div class="amount">
                    <span>-${window.PulPulse.formatCurrency(exp.amount)}</span>
                    <button onclick="deleteExp('${exp.id}')">×</button>
                </div>
            </div>
        `).join('');
    };

    // 5. Yangi xarajat qo'shish
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = document.getElementById('amountInput').value;
            const category = document.getElementById('categorySelect').value;
            const note = document.getElementById('noteInput').value;

            window.PulPulse.addExpense(user, {
                date: window.PulPulse.todayIso(),
                amount: amount,
                category: category,
                note: note
            });

            window.PulPulse.showToast(window.PulPulse.t('toast.saved'));
            expenseForm.reset();
            updateUI();
        });
    }

    // 6. O'chirish funksiyasini global qilish
    window.deleteExp = (id) => {
        if (confirm(window.PulPulse.t('danger.confirm'))) {
            window.PulPulse.deleteExpense(user, id);
            window.PulPulse.showToast(window.PulPulse.t('toast.deleted'));
            updateUI();
        }
    };

    // Logout tugmasi
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        window.PulPulse.logout();
    });

    // Sahifa yuklanganda UI ni yangilash
    updateUI();
});
