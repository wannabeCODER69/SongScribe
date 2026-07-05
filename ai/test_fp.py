import acoustid
import os

os.environ["FPCALC"] = (
    r"C:\Users\Gairik Kairy\AppData\Local\Microsoft\WinGet\Packages"
    r"\AcoustID.Chromaprint_Microsoft.Winget.Source_8wekyb3d8bbwe"
    r"\chromaprint-fpcalc-1.6.0-windows-x86_64\fpcalc.exe"
)

API_KEY = "S6n8npQHOJ"

FILE = r"E:\projects\subtitles\backend\jobs\1783276510310\original.mp3"

try:
    found = False

    for score, recording_id, title, artist in acoustid.match(
        API_KEY,
        FILE,
        force_fpcalc=True,
    ):
        found = True
        print("Score      :", score)
        print("Recording  :", recording_id)
        print("Title      :", title)
        print("Artist     :", artist)
        print()

    if not found:
        print("NO MATCHES")

except Exception as e:
    print(type(e).__name__)
    print(e)