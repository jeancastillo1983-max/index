#!/usr/bin/env python3
"""Small JPEG thumbnails (520 px wide) for the storyboard: photos, video posters, rendered art and
scene reveals. Run after tools/render-art.js. Output: dist/thumbs/<name>.jpg"""
import os, glob
from PIL import Image

import sys; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import profile as PF
ROOT = PF.ROOT
OUT = os.path.join(PF.DIST, 'thumbs')
os.makedirs(OUT, exist_ok=True)
srcs = (glob.glob(os.path.join(PF.COURSE_DIR, 'assets/img/*.jpg'))
        + glob.glob(os.path.join(PF.COURSE_DIR, 'assets/video/*.jpg'))
        + glob.glob(os.path.join(PF.DIST, 'png/art/*.png'))
        + glob.glob(os.path.join(PF.DIST, 'png/scenes/*.png')))
n = 0
for s in srcs:
    name = os.path.splitext(os.path.basename(s))[0]
    if '/scenes/' in s:
        name = 'scene-' + name
    im = Image.open(s)
    if im.mode in ('RGBA', 'LA', 'P'):
        bg = Image.new('RGB', im.size, (255, 255, 255))
        im = im.convert('RGBA'); bg.paste(im, mask=im.split()[-1]); im = bg
    im = im.convert('RGB')
    w = 520
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + '.jpg'), quality=78, optimize=True)
    n += 1
print(f'{n} thumbnails → dist/thumbs')

# Deck-size scene images (JPEG, 1920 px) — PowerPoint embeds each use, so keep them light.
DECK = os.path.join(PF.DIST, 'deck')
os.makedirs(DECK, exist_ok=True)
for s in glob.glob(os.path.join(PF.DIST, 'png/scenes/*.png')):
    im = Image.open(s).convert('RGB')
    if im.width > 1920:
        im = im.resize((1920, round(im.height * 1920 / im.width)), Image.LANCZOS)
    im.save(os.path.join(DECK, os.path.splitext(os.path.basename(s))[0] + '.jpg'), quality=84, optimize=True)
print('deck scene images → dist/deck')

# Deck-size art (JPEG on white, 1600 px). Every deck slide that shows art has a white ground.
for s in glob.glob(os.path.join(ROOT, 'dist/png/art/*.png')):
    im = Image.open(s)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA'); bg = Image.new('RGB', im.size, (255, 255, 255)); bg.paste(im, mask=im.split()[-1]); im = bg
    im = im.convert('RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(os.path.join(DECK, 'art-' + os.path.splitext(os.path.basename(s))[0] + '.jpg'), quality=86, optimize=True)
print('deck art images → dist/deck')
