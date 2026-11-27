#!/usr/bin/env python3
"""Generates the course narration as MP3 clips with free, offline neural voices (Kokoro-82M, Apache-2.0).

  /root/.cache/fpcp-tts/venv/bin/python tools/build-audio.py [--only ray,dee] [--force]

Setup once (see .claude/skills/elearning-course-builder/SKILL.md):
  python3 -m venv ~/.cache/fpcp-tts/venv && ~/.cache/fpcp-tts/venv/bin/pip install kokoro-onnx==0.4.9 soundfile
  curl -L -o ~/.cache/fpcp-tts/kokoro-v1.0.onnx  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
  curl -L -o ~/.cache/fpcp-tts/voices-v1.0.bin    https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin

Reads the clip list from tools/list-clips.js and casting from tools/voices.json. Each clip is cached by
(character, text, voice, speed), so editing one line or recasting one character only regenerates those clips.
Writes fall-protection-cp/assets/audio/*.mp3 and fall-protection-cp/content/audio.js (the player's manifest).
"""
import hashlib, json, os, re, subprocess, sys, tempfile, time

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
COURSE = os.path.join(ROOT, 'fall-protection-cp')
AUDIO_DIR = os.path.join(COURSE, 'assets', 'audio')
MANIFEST = os.path.join(COURSE, 'content', 'audio.js')
CACHE = os.path.expanduser('~/.cache/fpcp-tts')
MODEL, VOICES = os.path.join(CACHE, 'kokoro-v1.0.onnx'), os.path.join(CACHE, 'voices-v1.0.bin')

# ---- pronunciation: what is spoken (captions keep the written form) ----
UNITS = {'ft': ('foot', 'feet'), 'in': ('inch', 'inches'), 'lb': ('pound', 'pounds'), 'lbs': ('pound', 'pounds')}
PLURAL_NEXT = {'of', 'to', 'from', 'below', 'above', 'high', 'wide', 'deep', 'long', 'down', 'up', 'away', 'and', 'or',
               'per', 'in', 'on', 'at', 'off', 'out', 'over', 'under', 'past', 'beyond', 'apart', 'tall', 'short', 'clear',
               'or', 'is', 'are', 'was', 'with', 'for', 'before', 'after', 'into', 'than', 'each', 'max', 'minimum', 'maximum'}
def _unit(m):
    n, u, nxt = m.group(1), m.group(2), (m.group(4) or '')
    one, many = UNITS[u]
    word = re.match(r"\s+([A-Za-z][A-Za-z'-]*)", nxt)
    if word and word.group(1).lower() not in PLURAL_NEXT:      # "6 ft lanyard" → "6-foot lanyard"
        return f"{n}-{one}{nxt}"
    return f"{n} {one if n in ('1', '1.0') else many}{nxt}"
SPOKEN = [
    (r'\bSRL-LEs?\b', 'leading-edge S R L'), (r'\bSRLs\b', 'S R Ls'), (r'\bSRL\b', 'S R L'),
    (r'\bPFAS\b', 'P F A S'), (r'\bHLLs?\b', 'horizontal lifeline'), (r'\bGC\b', 'G C'), (r'\bEMS\b', 'E M S'),
    (r'\bTPO\b', 'T P O'), (r'\bRTU\b', 'R T U'), (r'\bMEP\b', 'M E P'), (r'\bCP\b', 'C P'), (r'\bPPE\b', 'P P E'),
    (r'\bQP\b', 'qualified person'), (r'\bSHIB\b', 'safety bulletin'), (r'\bCFOI\b', 'C F O I'), (r'\bBLS\b', 'B L S'),
    (r'\bANSI/ASSP\b', 'ANSI'), (r'\bZ359\.(\d+)\b', r'Z three fifty-nine point \1'), (r'\bA10\.(\d+)\b', r'A ten point \1'),
    (r'(\d)\s?×\s?(\d)', r'\1 by \2'), (r'(\d)\s?%', r'\1 percent'), (r'±', ' plus or minus '), (r'&', ' and '),
    (r'\bmph\b', 'miles an hour'), (r'\be\.g\.', 'for example'), (r'\bi\.e\.', 'that is'), (r'\bvs\.?\b', 'versus'),
    (r'(\d)\s?:\s?12\b', r'\1 in 12'),
]
def spoken(text):
    # an abbreviation period is dropped only mid-sentence ("42 in. high"); a sentence-ending period stays
    t = re.sub(r"(\d+(?:\.\d+)?)\s?(ft|in|lbs?)\b(\.(?=\s+[a-z±]))?(\s+[A-Za-z][A-Za-z'-]*)?", _unit, text)
    for pat, rep in SPOKEN:
        t = re.sub(pat, rep, t)
    t = t.replace('“', '"').replace('”', '"').replace('’', "'").replace('—', ', ').replace('–', ' to ')
    return re.sub(r'\s+', ' ', t).strip()

def vtag(cfg):
    return hashlib.sha1(f"{cfg['voice']}:{cfg['speed']}:kokoro-v1.0".encode()).hexdigest()[:6]

def main():
    args = sys.argv[1:]
    force = '--force' in args
    only = set(args[args.index('--only') + 1].split(',')) if '--only' in args else None
    clips = json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'tools', 'list-clips.js')], cwd=ROOT))
    cast = {k: v for k, v in json.load(open(os.path.join(ROOT, 'tools', 'voices.json'))).items() if not k.startswith('_')}
    os.makedirs(AUDIO_DIR, exist_ok=True)

    # existing manifest (durations) so unchanged clips need no re-probe
    prev = {}
    if os.path.exists(MANIFEST):
        for k, src, dur in re.findall(r'"([0-9a-f]{8})":\s*\["([^"]+)",\s*([\d.]+)\]', open(MANIFEST).read()):
            prev[src] = float(dur)

    from kokoro_onnx import Kokoro
    import soundfile as sf
    kok = Kokoro(MODEL, VOICES)

    manifest, made, t0 = {}, 0, time.time()
    todo = [c for c in clips]
    for i, c in enumerate(todo):
        cfg = cast.get(c['who']) or cast['tasha']
        fname = f"{c['key']}-{vtag(cfg)}.mp3"
        path = os.path.join(AUDIO_DIR, fname)
        rel = f"assets/audio/{fname}"
        regen = force and (only is None or c['who'] in only)
        if os.path.exists(path) and not regen:
            dur = prev.get(rel)
            if dur is None:
                out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout.strip()
                dur = float(out or 0)
            manifest[c['key']] = (rel, round(dur, 2)); continue
        if only is not None and c['who'] not in only and not os.path.exists(path):
            pass  # still generate missing clips for others so the manifest stays complete
        samples, sr = kok.create(spoken(c['text']), voice=cfg['voice'], speed=float(cfg['speed']), lang='en-us')
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
            sf.write(tmp.name, samples, sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp.name, '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '48k', path], check=True)
        os.unlink(tmp.name)
        manifest[c['key']] = (rel, round(len(samples) / sr, 2))
        made += 1
        if made % 25 == 0:
            print(f"  {i + 1}/{len(todo)} clips · {made} generated · {time.time() - t0:.0f}s", flush=True)

    # remove clips no longer referenced (old voices, edited lines)
    keep = {os.path.basename(v[0]) for v in manifest.values()}
    stale = [f for f in os.listdir(AUDIO_DIR) if f.endswith('.mp3') and f not in keep]
    for f in stale:
        os.unlink(os.path.join(AUDIO_DIR, f))

    total = sum(v[1] for v in manifest.values())
    with open(MANIFEST, 'w') as fh:
        fh.write('/* GENERATED by tools/build-audio.py — narration clips (Kokoro-82M voices, cast in tools/voices.json).\n'
                 '   clipKey → [file, seconds]. Do not edit by hand; edit content or voices.json and rebuild. */\n')
        fh.write('COURSE.addAudio({\n')
        fh.write(',\n'.join(f'  "{k}": ["{v[0]}", {v[1]}]' for k, v in sorted(manifest.items())))
        fh.write('\n});\n')
    size = sum(os.path.getsize(os.path.join(AUDIO_DIR, f)) for f in os.listdir(AUDIO_DIR)) / 1048576
    print(f"audio: {len(manifest)} clips ({made} new, {len(stale)} stale removed), {total / 60:.1f} min, {size:.1f} MB → assets/audio, content/audio.js")

if __name__ == '__main__':
    main()
