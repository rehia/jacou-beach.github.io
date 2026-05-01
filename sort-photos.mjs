#!/usr/bin/env node
/**
 * sort-photos.mjs — Réordonne le tableau `photos` dans Firestore
 *                   selon le numéro extrait du nom de fichier.
 *
 * Usage : node sort-photos.mjs [--dry-run]
 *
 * Requiert : Node >= 18 (fetch natif)
 */

const PROJECT = 'immo-rehia';
const API_KEY = 'AIzaSyCw8905RnfKhDB04Tr6k3uw2Ucer5x3D0E';
const BASE    = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const DRY_RUN = process.argv.includes('--dry-run');

/* Extrait le numéro d'une URL comme './img/3.jpg' → 3 */
function photoIndex(url) {
  const m = url.match(/(\d+)\.[^.]+$/);
  return m ? parseInt(m[1], 10) : Infinity;
}

async function run() {
  /* ── 1. Lecture ──────────────────────────────────────── */
  const getRes = await fetch(`${BASE}/config/listing?key=${API_KEY}`);
  const data   = await getRes.json();

  if (!getRes.ok) {
    console.error('Erreur lecture Firestore :', JSON.stringify(data, null, 2));
    process.exit(1);
  }

  const photosField = data.fields?.photos?.arrayValue?.values;
  if (!photosField) {
    console.error('Champ "photos" introuvable dans config/listing.');
    process.exit(1);
  }

  const photos = photosField.map(v => v.stringValue);

  /* ── 2. Tri ──────────────────────────────────────────── */
  const sorted = [...photos].sort((a, b) => photoIndex(a) - photoIndex(b));

  console.log('Avant :');
  photos.forEach((p, i) => console.log(`  [${i}] ${p}`));
  console.log('\nAprès :');
  sorted.forEach((p, i) => console.log(`  [${i}] ${p}`));

  const changed = photos.some((p, i) => p !== sorted[i]);
  if (!changed) {
    console.log('\nDéjà dans le bon ordre — rien à faire.');
    return;
  }

  if (DRY_RUN) {
    console.log('\n[dry-run] Aucune écriture effectuée.');
    return;
  }

  /* ── 3. Écriture (updateMask sur photos uniquement) ───── */
  const body = {
    fields: {
      photos: {
        arrayValue: { values: sorted.map(url => ({ stringValue: url })) },
      },
    },
  };

  const patchRes = await fetch(
    `${BASE}/config/listing?updateMask.fieldPaths=photos&key=${API_KEY}`,
    {
      method : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(body),
    }
  );

  if (!patchRes.ok) {
    const err = await patchRes.json();
    console.error('\nErreur écriture Firestore :', JSON.stringify(err, null, 2));
    process.exit(1);
  }

  console.log('\nOK — photos réordonnées dans Firestore.');
}

run().catch(err => { console.error(err); process.exit(1); });
