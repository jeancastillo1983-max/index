"""Python twin of tools/profile.js: resolves the course named by COURSE_ID (default fall-protection-cp)."""
import json, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
_all = json.load(open(os.path.join(ROOT, 'tools', 'courses.json')))
ID = os.environ.get('COURSE_ID', 'fall-protection-cp')
_p = _all[ID]
COURSE_DIR = os.path.join(ROOT, _p['dir'])
DELIV = os.path.join(ROOT, _p['deliverables'])
DIST = os.path.join(ROOT, _p['dist'])
PREFIX, SHORT = _p['prefix'], _p['short']
VOICES = os.path.join(ROOT, _p['voices'])
