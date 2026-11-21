#!/usr/bin/env bash
set -euo pipefail
adb wait-for-device
adb shell settings put system screen_off_timeout 600000
adb install -r /tmp/blackcuts-apk/app-debug.apk
adb shell pm grant com.blackcuts.musicplayer android.permission.READ_EXTERNAL_STORAGE
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
