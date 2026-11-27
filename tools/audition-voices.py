#!/usr/bin/env python3
"""Voice audition pack: each character says one of their real lines in several candidate voices.
  ~/.cache/fpcp-tts/venv/bin/python tools/audition-voices.py
Output: deliverables/FallProtection-CP_Voice-Auditions.zip (MP3s named <character>_<option>_<voice>.mp3 + README).
Pick a voice per character, put it in tools/voices.json, rerun tools/build-audio.py."""
import importlib.util, json, os, subprocess, tempfile, zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
spec = importlib.util.spec_from_file_location('ba', os.path.join(ROOT, 'tools', 'build-audio.py'))
ba = importlib.util.module_from_spec(spec); spec.loader.exec_module(ba)

CANDIDATES = {
    'tasha': ['af_heart', 'af_bella', 'af_sarah', 'af_nicole'],
    'ray':   ['am_fenrir', 'am_onyx', 'am_eric', 'am_liam'],
    'marco': ['am_michael', 'am_eric', 'am_liam', 'am_puck'],
    'dee':   ['af_bella', 'af_sky', 'af_nova', 'af_jessica'],
    'luis':  ['am_puck', 'am_echo', 'am_eric', 'am_michael'],
}
LINES = {
    'tasha': "Probably nothing about tying off. A lot about what you stop seeing. That's what this course is about: what you notice, what you tolerate, and what you say when the schedule is pushing.",
    'ray':   "I've been doing this twenty-eight years. What's a course going to tell me? I've walked that edge a hundred times.",
    'marco': "Curtain wall starts Thursday. Can we pull the cable on the east side and just tie those guys off? Rail's in their way and we can't lose another day.",
    'dee':   "I'm good. I'm clipped to the deck anchor, the one with the tag. Ray said it's rated for five thousand.",
    'luis':  "I did everything they told me. Harness, lanyard, clipped to a ring in the floor. Twelve feet up. I still hit the concrete. Nobody ever told me the lanyard needs room.",
}

def main():
    from kokoro_onnx import Kokoro
    import soundfile as sf
    cast = json.load(open(os.path.join(ROOT, 'tools', 'voices.json')))
    kok = Kokoro(ba.MODEL, ba.VOICES)
    out_dir = os.path.join(ROOT, 'dist', 'voice-auditions'); os.makedirs(out_dir, exist_ok=True)
    files, lines = [], ['Voice auditions — Fall Protection Competent Person', '',
                        'Each character reads one real line in four candidate voices. Option A is the voice used in the course now.',
                        'To change a voice: edit tools/voices.json (voice name shown in the file name) and rerun tools/build-audio.py.', '']
    for who, voices in CANDIDATES.items():
        speed = float(cast[who]['speed'])
        lines.append(f"{who.capitalize()} — {cast[who].get('note', '')}")
        for i, v in enumerate(voices):
            name = f"{who}_{chr(65 + i)}_{v}.mp3"
            samples, sr = kok.create(ba.spoken(LINES[who]), voice=v, speed=speed, lang='en-us')
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as t:
                sf.write(t.name, samples, sr)
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', t.name, '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '64k', os.path.join(out_dir, name)], check=True)
            os.unlink(t.name); files.append(name)
            lines.append(f"  {chr(65 + i)}. {v}{'  (current)' if v == cast[who]['voice'] else ''}")
        lines.append('')
    open(os.path.join(out_dir, 'README.txt'), 'w').write('\n'.join(lines))
    dest = os.path.join(ROOT, 'deliverables', 'FallProtection-CP_Voice-Auditions.zip')
    with zipfile.ZipFile(dest, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in files + ['README.txt']:
            z.write(os.path.join(out_dir, f), f)
    print(f'{len(files)} audition clips → {os.path.relpath(dest, ROOT)}')

if __name__ == '__main__':
    main()
