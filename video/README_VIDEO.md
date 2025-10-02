# SchulPlan Pro – Video Kit (Linux)

## 1) SVGs in PNG umwandeln (1280x720)
sudo apt-get update && sudo apt-get install -y librsvg2-bin ffmpeg
rsvg-convert -w 1280 -h 720 video/title.svg -o video/title.png
rsvg-convert -w 1280 -h 200 video/lower_third.svg -o video/lower_third.png
rsvg-convert -w 1280 -h 720 video/outro.svg -o video/outro.png

## 2) Screencast aufnehmen (X11-Beispiel)
ffmpeg -y -video_size 1280x720 -framerate 60 -f x11grab -i :0.0+0,0 \
  -f pulse -i default -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k screencast.mp4

## 3) Voiceover (optional)
ffmpeg -f pulse -i default -ac 2 -ar 48000 -c:a aac -b:a 192k video/voiceover.m4a

## 4) Intro & Outro hinzufügen
ffmpeg -loop 1 -t 5 -i video/title.png -c:v libx264 -pix_fmt yuv420p -r 30 video/title_5s.mp4
ffmpeg -loop 1 -t 5 -i video/outro.png -c:v libx264 -pix_fmt yuv420p -r 30 video/outro_5s.mp4
printf "file 'video/title_5s.mp4'\nfile 'screencast.mp4'\nfile 'video/outro_5s.mp4'\n" > video/concat.txt
ffmpeg -f concat -safe 0 -i video/concat.txt -c copy video/docu_raw.mp4

## 5) Untertitel (optional) – einbrennen
ffmpeg -i video/docu_raw.mp4 -vf subtitles=video/captions_de.srt -c:a copy video/docu_subtitled.mp4

## 6) Voiceover & Musik mischen (optional)
# Voiceover separat aufgenommen?
ffmpeg -i video/docu_raw.mp4 -i video/voiceover.m4a -filter_complex "[1:a]volume=1.0[a1]" -map 0:v -map "[a1]" -c:v copy -c:a aac -shortest video/docu_vo.mp4
# Hintergrundmusik leise untermischen (bgm.mp3 anpassen/ablegen):
ffmpeg -i video/docu_vo.mp4 -i bgm.mp3 -filter_complex "[0:a][1:a]amix=inputs=2:weights=1 0.25:normalize=1[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest video/docu_final.mp4

## 7) Lower-Third (0–5s) einblenden
ffmpeg -i video/docu_final.mp4 -i video/lower_third.png -filter_complex "overlay=(W-w)/2:H-200:enable='between(t,0,5)'" -c:a copy video/docu_final_overlay.mp4

# Ergebnis: video/docu_final_overlay.mp4
