window.PulPulseFirebase = (() => {
  const firebaseConfig = {
    apiKey: "<FIREBASE_API_KEY>",
    authDomain: "<FIREBASE_AUTH_DOMAIN>",
    projectId: "<FIREBASE_PROJECT_ID>",
    storageBucket: "<FIREBASE_STORAGE_BUCKET>",
    messagingSenderId: "<FIREBASE_MESSAGING_SENDER_ID>",
    appId: "<FIREBASE_APP_ID>",
  };

  const enabled = Object.values(firebaseConfig).every((value) => value && !value.includes("<"));
  let app = null;
  let firestore = null;

  if (enabled && window.firebase) {
    try {
      app = firebase.initializeApp(firebaseConfig);
      firestore = firebase.firestore();
    } catch (error) {
      console.warn("PulPulse Firebase init failed:", error);
    }
  }

  const normalize = (value) => String(value || "").trim().toLowerCase();
  const isEnabled = () => Boolean(enabled && firestore);

  function getUserRef(username) {
    return firestore.collection("users").doc(normalize(username));
  }

  async function getUserDoc(username) {
    if (!isEnabled()) return null;
    const snapshot = await getUserRef(username).get();
    return snapshot.exists ? snapshot.data() : null;
  }

  async function createUserDoc(username, data) {
    if (!isEnabled()) return null;
    const ref = getUserRef(username);
    return firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);
      if (snapshot.exists) throw new Error("exists");
      transaction.set(ref, data);
      return data;
    });
  }

  async function updateUserDoc(username, data) {
    if (!isEnabled()) return null;
    return getUserRef(username).set(data, { merge: true });
  }

  async function getExpenses(username) {
    if (!isEnabled()) return [];
    const snapshot = await getUserRef(username).collection("expenses").orderBy("date", "desc").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async function addExpense(username, expense) {
    if (!isEnabled()) return null;
    const userRef = getUserRef(username).collection("expenses");
    const id = expense.id || crypto?.randomUUID?.() || String(Date.now());
    await userRef.doc(id).set({ ...expense, id });
    return id;
  }

  async function deleteExpense(username, expenseId) {
    if (!isEnabled()) return null;
    return getUserRef(username).collection("expenses").doc(String(expenseId)).delete();
  }

  async function getUserSettings(username) {
    const doc = await getUserDoc(username);
    return {
      currency: doc?.currency || "UZS",
      budget: Number(doc?.budget || 0),
      lastVisit: String(doc?.lastVisit || ""),
      visitStreak: Number(doc?.visitStreak || 0),
    };
  }

  async function setUserSettings(username, changes) {
    if (!isEnabled()) return null;
    return updateUserDoc(username, changes);
  }

  async function getBudget(username) {
    const doc = await getUserDoc(username);
    return Number(doc?.budget || 0);
  }

  async function setBudget(username, value) {
    return setUserSettings(username, { budget: Number(value || 0) });
  }

  async function loginWithPassword(username, hash) {
    const normalized = normalize(username);
    if (!normalized) return { ok: false, reason: "empty_name" };
    if (!hash) return { ok: false, reason: "too_short" };

    const existing = await getUserDoc(normalized);
    if (existing) {
      if (existing.hash !== hash) return { ok: false, reason: "invalid" };
      return { ok: true, created: false, settings: await getUserSettings(normalized) };
    }

    const data = {
      username: String(username).trim(),
      hash,
      createdAt: new Date().toISOString(),
      currency: "UZS",
      budget: 0,
      visitStreak: 0,
      lastVisit: "",
    };
    await createUserDoc(normalized, data);
    return { ok: true, created: true, settings: await getUserSettings(normalized) };
  }

  return {
    enabled: isEnabled(),
    loginWithPassword,
    getUserDoc,
    getExpenses,
    addExpense,
    deleteExpense,
    getBudget,
    setBudget,
    getUserSettings,
    setUserSettings,
  };
})();
