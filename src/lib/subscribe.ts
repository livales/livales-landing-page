import type { Language } from "@/contexts/LanguageContext";

// Firebase project "livales" (company website — separate from the app
// projects). The web config is public by design; access is enforced by
// firestore.rules in this repo (collection `landing_subscribers`:
// create-only, validated). Test with `npm run test:rules`.
const firebaseConfig = {
  apiKey: "AIzaSyBUjYmswqH9xcfj0B4oldtBUPFTHYACqmQ",
  authDomain: "livales.firebaseapp.com",
  projectId: "livales",
  appId: "1:443820313833:web:e325c376dc72e2a91a3478",
};

async function getDb() {
  // Loaded on demand so the SDK doesn't weigh down the first page load.
  const [{ initializeApp, getApps }, { getFirestore }] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore/lite"),
  ]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  return getFirestore(app);
}

/** Saves an email sign-up to Firestore. Throws if the write is rejected. */
export async function subscribe(email: string, lang: Language, source: string) {
  const db = await getDb();
  const { addDoc, collection, serverTimestamp } = await import("firebase/firestore/lite");
  await addDoc(collection(db, "landing_subscribers"), {
    email: email.trim().toLowerCase(),
    lang,
    source,
    createdAt: serverTimestamp(),
  });
}
