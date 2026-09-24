// Uji security rules Firestore untuk form pendaftar di landing page.
// Jalankan: npm run test:rules

import { readFileSync } from 'node:fs';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const testEnv = await initializeTestEnvironment({
  projectId: 'livales-rules-test',
  firestore: {
    rules: readFileSync('firestore.rules', 'utf8'),
    host: '127.0.0.1',
    port: 8085,
  },
});

let passed = 0;
let failed = 0;

async function it(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ❌ ${name}\n     ${err.message.split('\n')[0]}`);
  }
}

const anon = () => testEnv.unauthenticatedContext().firestore();
const user = () => testEnv.authenticatedContext('uid_someone').firestore();
const sub = (db, id) => doc(db, 'landing_subscribers', id);
const subscriber = (extra = {}) => ({
  email: 'kamu@contoh.com',
  lang: 'id',
  source: 'updates',
  createdAt: serverTimestamp(),
  ...extra,
});

console.log('\nPENDAFTAR LANDING PAGE');
await it('pengunjung anonim bisa mendaftarkan email', async () => {
  await assertSucceeds(setDoc(sub(anon(), 'ok1'), subscriber()));
  await assertSucceeds(setDoc(sub(anon(), 'ok2'), subscriber({ lang: 'en' })));
});
await it('pendaftar tidak bisa dibaca, diubah, atau dihapus', async () => {
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(sub(ctx.firestore(), 'seeded'), { email: 'a@b.co' });
  });
  await assertFails(getDoc(sub(anon(), 'seeded')));
  await assertFails(getDoc(sub(user(), 'seeded')));
  await assertFails(updateDoc(sub(anon(), 'seeded'), { email: 'x@y.co' }));
  await assertFails(deleteDoc(sub(anon(), 'seeded')));
});
await it('email tidak valid ditolak', async () => {
  await assertFails(setDoc(sub(anon(), 'bad1'), subscriber({ email: 'bukan-email' })));
  await assertFails(setDoc(sub(anon(), 'bad2'), subscriber({ email: 'a'.repeat(250) + '@b.co' })));
  await assertFails(setDoc(sub(anon(), 'bad3'), subscriber({ email: 42 })));
});
await it('field tambahan, field hilang, bahasa lain, atau waktu palsu ditolak', async () => {
  await assertFails(setDoc(sub(anon(), 'bad4'), subscriber({ isAdmin: true })));
  const { source: _omit, ...noSource } = subscriber();
  await assertFails(setDoc(sub(anon(), 'bad5'), noSource));
  await assertFails(setDoc(sub(anon(), 'bad6'), subscriber({ lang: 'fr' })));
  await assertFails(setDoc(sub(anon(), 'bad7'), subscriber({ createdAt: new Date(0) })));
});

console.log('\nKOLEKSI LAIN');
await it('collection lain ditolak', async () => {
  await assertFails(setDoc(doc(anon(), 'random', 'x'), { a: 1 }));
  await assertFails(setDoc(doc(user(), 'random', 'x'), { a: 1 }));
});

await testEnv.cleanup();
console.log(`\n${passed} lulus, ${failed} gagal\n`);
process.exit(failed > 0 ? 1 : 0);
