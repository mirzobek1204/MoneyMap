# PulPulse - Kundalik Xarajatlar Web App

PulPulse - bu userlarni qayta kirishga undaydigan kreativ xarajat kuzatuvchi web app.

## Yangi retention funksiyalar

- Daily challenge (har kuni yangilanadi)
- Expense streak va Visit streak
- XP + Level tizimi
- Badge lar (milestone ga qarab)
- Oylik budget progress bar
- Aqlli insight (top kategoriya, 7 kunlik trend, budget holati)
- Tez summa tugmalari (10k, 25k, 50k, 100k)
- JSON export/import

## Local ishga tushirish

1. `index.html` ni brauzerda oching.
2. Username kiriting.
3. Xarajat qo'shishni boshlang.

## GitHub ga yuklash (manual usul)

`gh` CLI bu kompyuterda yo'q, shuning uchun eng oson yo'l:

1. GitHub da yangi repo oching (masalan: `pulpulse`).
2. Repo URL ni oling (masalan: `https://github.com/USERNAME/pulpulse.git`).
3. Shu papkada quyidagilarni bajaring:

```bash
git add .
git commit -m "feat: launch PulPulse MVP with retention features"
git branch -M main
git remote add origin https://github.com/USERNAME/pulpulse.git
git push -u origin main
```

## Internetga chiqarish (GitHub bilan)

### Variant A: Vercel

1. [https://vercel.com/new](https://vercel.com/new) ga kiring.
2. GitHub repo ni tanlang.
3. Deploy bosing.

### Variant B: Netlify

1. [https://app.netlify.com/start](https://app.netlify.com/start) ga kiring.
2. GitHub repo ni ulab Deploy qiling.

## Eslatma

Hozircha backend yo'q, ma'lumotlar `localStorage` da saqlanadi. Keyingi bosqichda Node.js + database + auth qo'shish mumkin.
