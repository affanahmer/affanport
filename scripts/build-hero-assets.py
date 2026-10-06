import os
import subprocess
import numpy as np

# Requirements: ffmpeg installed and in PATH, numpy installed.
# Run pip install numpy before running this script.

def build_hero_assets(input_file="intro.mp4", out_dir="public/hero"):
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs("public", exist_ok=True)

    # We process the first 10.5 seconds
    # Video crossfade: split into part1 (0 to 10s) and part2 (10s to 10.5s)
    # Then crossfade part2 over the START of part1.
    # Wait, the prompt says: "Cross-fade the last 0.5 s of the picture into the first 0.5 s"
    # Actually, a seamless loop is created by taking [0.5s ... 10.0s] and crossfading [10.0s...10.5s] over [0.0s...0.5s].
    # Let's do it simply using ffmpeg:

    # 1. Extract exactly 10.5s of video
    temp_vid = "temp_10_5s.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-i", input_file, 
        "-t", "10.5", 
        "-c:v", "copy", "-c:a", "copy", temp_vid
    ], check=True)

    # 2. Extract audio and do crossfade in numpy
    # Dump audio to wav
    subprocess.run([
        "ffmpeg", "-y", "-i", temp_vid, 
        "-vn", "-ac", "2", "-ar", "48000", "-c:a", "pcm_s16le", "temp_audio.wav"
    ], check=True)

    # Numpy audio processing
    import wave
    with wave.open("temp_audio.wav", "rb") as w:
        params = w.getparams()
        frames = w.readframes(w.getnframes())
        audio_data = np.frombuffer(frames, dtype=np.int16).reshape(-1, params.nchannels).copy()

    sample_rate = params.framerate
    total_samples = len(audio_data)
    total_duration = total_samples / sample_rate
    target_time = total_duration - 0.5
    if target_time > 10.0:
        target_time = 10.0
        
    target_samples = int(target_time * sample_rate)
    fade_samples = int(0.5 * sample_rate)

    if target_samples > 0 and (target_samples + fade_samples) <= total_samples:
        # Crossfade
        start_segment = audio_data[:fade_samples].copy().astype(np.float32)
        end_segment = audio_data[target_samples:target_samples+fade_samples].copy().astype(np.float32)

        fade_in = np.linspace(0, 1, fade_samples).reshape(-1, 1)
        fade_out = np.linspace(1, 0, fade_samples).reshape(-1, 1)

        # Mix end over start
        start_segment = start_segment * fade_in + end_segment * fade_out
        audio_data[:fade_samples] = start_segment.astype(np.int16)
        
        # Trim
        audio_data = audio_data[:target_samples]
    else:
        target_samples = total_samples


    with wave.open("temp_audio_looped.wav", "wb") as w:
        w.setparams(params)
        w.writeframes(audio_data.tobytes())

    # 3. Video processing: crop, colorlevels, and crossfade
    # We will use ffmpeg filter complex for the video crossfade.
    # The filter logic:
    # [0:v] split [v1][v2];
    # [v1] trim=start=0:end=10 [main];
    # [v2] trim=start=10:end=10.5, setpts=PTS-STARTPTS [fade_out];
    # [main] trim=start=0:end=0.5 [fade_in];
    # [fade_out][fade_in] blend=all_expr='A*(1-T/0.5)+B*(T/0.5)' [mixed];
    # [main] trim=start=0.5, setpts=PTS-STARTPTS [rest];
    # [mixed][rest] concat=n=2:v=1:a=0 [outv]
    
    # Wait, simpler ffmpeg xfade:
    # We have temp_vid (10.5s).
    # We want to overlap the last 0.5s with the first 0.5s. 
    # But since audio is fixed, let's just make it simple.
    
    crop_scale = "crop=800:1000:(in_w-800)/2:80,scale=768:960"
    whiten = "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    
    filter_complex = f"""
    [0:v]{crop_scale},{whiten}[pre];
    [pre]split[v1][v2];
    [v1]trim=start=0.5:end={target_time+0.5},setpts=PTS-STARTPTS[main];
    [v2]trim=start=0:end=0.5,setpts=PTS-STARTPTS[fade];
    [main][fade]xfade=transition=fade:duration=0.5:offset={target_time-0.5}[outv]
    """

    # 4. Export MP4
    subprocess.run([
        "ffmpeg", "-y", 
        "-i", temp_vid, 
        "-i", "temp_audio_looped.wav",
        "-filter_complex", filter_complex,
        "-map", "[outv]", "-map", "1:a",
        "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        "-t", f"{target_time}",
        os.path.join(out_dir, "hero.mp4")
    ], check=True)

    # Export WebM
    subprocess.run([
        "ffmpeg", "-y", 
        "-i", temp_vid, 
        "-i", "temp_audio_looped.wav",
        "-filter_complex", filter_complex,
        "-map", "[outv]", "-map", "1:a",
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        "-t", f"{target_time}",
        os.path.join(out_dir, "hero.webm")
    ], check=True)

    # 5. Stills
    # Portrait still 480x600 (center crop)
    subprocess.run([
        "ffmpeg", "-y", "-ss", "00:00:02", "-i", input_file,
        "-vframes", "1",
        "-vf", "crop=800:1000:(in_w-800)/2:80,scale=480:600,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98",
        "public/portrait-bust.webp"
    ], check=True)

    # OG Image 1200x630
    subprocess.run([
        "ffmpeg", "-y", "-ss", "00:00:02", "-i", input_file,
        "-vframes", "1",
        "-vf", "crop=1200:630:(in_w-1200)/2:(in_h-630)/2,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98",
        "public/og.jpg"
    ], check=True)

    # Cleanup
    for f in [temp_vid, "temp_audio.wav", "temp_audio_looped.wav"]:
        if os.path.exists(f):
            os.remove(f)

if __name__ == "__main__":
    build_hero_assets()
