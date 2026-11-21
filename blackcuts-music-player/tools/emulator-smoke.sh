#!/usr/bin/env bash
set -Eeuo pipefail
trap 'status=$?; adb logcat -d -t 1800 > /tmp/blackcuts-logcat.txt || true; adb shell uiautomator dump /sdcard/last-window.xml >/dev/null 2>&1 && adb shell cat /sdcard/last-window.xml > /tmp/blackcuts-last-window.xml || true; echo "::error::Smoke test failed at line $LINENO (exit $status)"; exit "$status"' ERR
adb wait-for-device
adb shell settings put system screen_off_timeout 600000
adb install -r /tmp/blackcuts-apk/app-debug.apk
API=$(adb shell getprop ro.build.version.sdk | tr -d '\r')
if [ "$API" -ge 33 ]; then
  adb shell pm grant com.blackcuts.musicplayer android.permission.READ_MEDIA_AUDIO
else
  adb shell pm grant com.blackcuts.musicplayer android.permission.READ_EXTERNAL_STORAGE
fi
if [ "$API" -le 28 ]; then adb shell pm grant com.blackcuts.musicplayer android.permission.WRITE_EXTERNAL_STORAGE; fi
python3 - <<'PY'
import wave, math, struct
with wave.open('/tmp/blackcuts-smoke.wav', 'wb') as out:
    out.setnchannels(1); out.setsampwidth(2); out.setframerate(44100)
    out.writeframes(b''.join(struct.pack('<h', int(7000 * math.sin(2 * math.pi * 440 * n / 44100))) for n in range(44100 * 45)))
PY
adb shell mkdir -p /sdcard/Music
adb push /tmp/blackcuts-smoke.wav /sdcard/Music/blackcuts-smoke.wav
adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/Music/blackcuts-smoke.wav
for i in {1..30}; do
  if adb shell content query --uri content://media/external/audio/media --projection _display_name | grep -q blackcuts-smoke.wav; then break; fi
  if [ "$i" = 30 ]; then echo 'MediaStore did not index test audio' >&2; exit 1; fi
  sleep 2
done
adb shell am start -n com.blackcuts.musicplayer/.MainActivity
sleep 8
adb shell uiautomator dump /sdcard/window.xml >/dev/null
adb shell cat /sdcard/window.xml > /tmp/blackcuts-window.xml
python3 - <<'PY'
import xml.etree.ElementTree as ET, re, subprocess
root=ET.parse('/tmp/blackcuts-window.xml')
for n in root.iter():
    if n.attrib.get('text') == 'Ouvir agora':
        # Compose may put click on an ancestor. Tapping the text's center hits the button.
        bounds=list(map(int,re.findall(r'\d+', n.attrib['bounds'])))
        subprocess.run(['adb','shell','input','tap',str((bounds[0]+bounds[2])//2),str((bounds[1]+bounds[3])//2)],check=True)
        break
else:
    raise SystemExit('Play button not found in UI; inspect hierarchy artifact')
PY
sleep 8
adb shell input keyevent KEYCODE_HOME
sleep 3
adb shell dumpsys media_session > /tmp/blackcuts-media-session.txt
if ! grep -q 'com.blackcuts.musicplayer' /tmp/blackcuts-media-session.txt; then echo 'Media session not found' >&2; exit 1; fi
if ! grep -Eq 'state=PlaybackState \{state=3|state=3,' /tmp/blackcuts-media-session.txt; then echo 'No playing media session found' >&2; exit 1; fi
adb shell pidof com.blackcuts.musicplayer >/dev/null
echo 'Installed, indexed local WAV, started playback and found a playing media session after HOME.'

# Open the new player and capture its layout for visual inspection.
adb shell am start -n com.blackcuts.musicplayer/.MainActivity >/dev/null
sleep 3
adb shell uiautomator dump /sdcard/window.xml >/dev/null
adb shell cat /sdcard/window.xml > /tmp/blackcuts-window.xml
python3 - <<'PY_PLAYER'
import xml.etree.ElementTree as ET, re, subprocess
root = ET.parse('/tmp/blackcuts-window.xml')
candidates=[]
for n in root.iter():
    if 'blackcuts-smoke' in n.attrib.get('text', '').lower():
        b=list(map(int,re.findall(r'\d+',n.attrib['bounds'])))
        candidates.append(b)
if not candidates: raise SystemExit('Current track not visible in mini player')
b=max(candidates, key=lambda x:x[1])
subprocess.run(['adb','shell','input','tap',str((b[0]+b[2])//2),str((b[1]+b[3])//2)],check=True)
PY_PLAYER
sleep 3
adb shell uiautomator dump /sdcard/player.xml >/dev/null
adb shell cat /sdcard/player.xml | grep -q 'TOCANDO AGORA' || { echo 'Full player was not opened' >&2; exit 1; }
adb exec-out screencap -p > /tmp/blackcuts-player.png
adb shell input keyevent KEYCODE_BACK
sleep 2

# Test cancellation first, then approve deletion of the test file only.
dump_delete_ui() {
  for attempt in {1..6}; do
    adb shell rm -f /sdcard/delete-window.xml
    adb shell uiautomator dump /sdcard/delete-window.xml >/dev/null 2>&1 || true
    if adb shell cat /sdcard/delete-window.xml > /tmp/blackcuts-delete-window.xml 2>/dev/null && grep -q '<hierarchy' /tmp/blackcuts-delete-window.xml; then return 0; fi
    sleep 2
  done
  echo 'Could not get current UI hierarchy' >&2; return 1
}
tap_ui() {
  local label="$1"
  dump_delete_ui
  python3 - "$label" <<'PY_TAP'
import xml.etree.ElementTree as ET, re, subprocess, sys
label=sys.argv[1]
for n in ET.parse('/tmp/blackcuts-delete-window.xml').iter():
    if label.lower() in (n.attrib.get('text','').lower(), n.attrib.get('content-desc','').lower()) or (label == 'Opções de' and n.attrib.get('content-desc','').startswith(label)):
        b=list(map(int,re.findall(r'\d+',n.attrib['bounds'])))
        subprocess.run(['adb','shell','input','tap',str((b[0]+b[2])//2),str((b[1]+b[3])//2)],check=True); break
else: raise SystemExit('UI element not found: '+label)
PY_TAP
  sleep 2
}
tap_ui 'Biblioteca'
tap_ui 'Opções de'
tap_ui 'Excluir do aparelho'
tap_ui 'CANCELAR'
adb shell test -f /sdcard/Music/blackcuts-smoke.wav
tap_ui 'Opções de'
tap_ui 'Excluir do aparelho'
tap_ui 'EXCLUIR DO APARELHO'
# Android 10+ may ask for system confirmation in the emulator locale.
dump_delete_ui
python3 - <<'PY_SYSTEM'
import xml.etree.ElementTree as ET, re, subprocess
labels = {'allow', 'delete', 'move to trash', 'permitir', 'excluir', 'mover para a lixeira'}
for n in ET.parse('/tmp/blackcuts-delete-window.xml').iter():
    if n.attrib.get('text','').strip().lower() in labels:
        b=list(map(int,re.findall(r'\d+',n.attrib['bounds'])))
        subprocess.run(['adb','shell','input','tap',str((b[0]+b[2])//2),str((b[1]+b[3])//2)],check=True); break
PY_SYSTEM
sleep 5
dump_delete_ui
cp /tmp/blackcuts-delete-window.xml /tmp/blackcuts-after-delete.xml
if adb shell test -f /sdcard/Music/blackcuts-smoke.wav; then echo 'Test audio still exists after deletion' >&2; exit 1; fi
if adb shell content query --uri content://media/external/audio/media --projection _display_name | grep -q blackcuts-smoke.wav; then echo 'Test audio still indexed after deletion' >&2; exit 1; fi
echo "Deletion cancellation and confirmed deletion passed on API $API."
