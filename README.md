# PulPulse - Multi-Page Expense Tracker

PulPulse endi alohida sahifalarga bo'lingan:

- `index.html` - login
- `dashboard.html` - umumiy ko'rinish, tez xarajat qo'shish, budget/progress
- `expenses.html` - xarajatlar ro'yxati, filter, o'chirish

## Asosiy imkoniyatlar

- 3 til: Uzbek / English / Russian (o'ng yuqorida switcher)
- Ism bilan kirish, keyin to'liq foydalanish
- Kundalik xarajat kiritish
- Oylik budget va progress
- Insight, streak va challenge
- Xarajatlar sahifasida filter va o'chirish

## Local ishga tushirish

1. `index.html` ni brauzerda oching.
2. Ism kiriting va `Kirish` bosing.
3. Dashboard va Expenses sahifalaridan foydalaning.

## Firebase sozlash

1. Firebase konsolida yangi loyiha yarating.
2. Firestore va Authentication xizmatlarini yoqing.
3. `MoneyMap/js/firebase.js` faylida `firebaseConfig` maydonlarini o'z loyihangiz ma'lumotlari bilan to'ldiring.
4. Sahifalarni qayta yuklang va bir xil username/parol bilan boshqa qurilmada ma'lumotlar saqlanishini tekshiring.

## GitHub ga yuklash (manual)

```bash
git add .
git commit -m "feat: redesign multipage ux"
git push
```

## Eslatma

Hozircha backend yo'q, ma'lumotlar `localStorage` da saqlanadi. Keyingi bosqichda Node.js + database + auth qo'shish mumkin.
