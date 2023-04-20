import React, { useEffect, useState, useRef } from 'react';

function Song({ title, artist, position, image, audio }) {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioSrc = useRef(null);
  const playButtonRef = useRef(null);

  const altTag = `${title} by ${artist}`;

  // const handlePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  // };

  const handlePlayPause = async () => {
    if (!audioSrc.current) return;

    if (isPlaying) {
      // Pause the audio if it's already playing
      audioSrc.current.pause();
      setIsPlaying(false);
    } else {
      // Pause any other playing audio
      const audioElements = document.getElementsByTagName('audio');
      for (let i = 0; i < audioElements.length; i++) {
        if (audioElements[i] !== audioSrc.current) {
          audioElements[i].pause();
        }
      }

      // Start playing the audio if it's not playing
      try {
        await audioSrc.current.play();
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
        console.error('Could not play audio:', err);
      }
    }
  };

  // useEffect(() => {
  //   if (isPlaying === null) {
  //     return;
  //   }

  //   isPlaying ? audioSrc.current.play() : audioSrc.current.pause();
  // }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && playButtonRef.current) {
      audioSrc.current.play();
      playButtonRef.current.classList.add('playing');
    } else if (playButtonRef.current) {
      audioSrc.current.pause();
      playButtonRef.current.classList.remove('playing');
    }
  }, [isPlaying]);

  return (
    <div className='song'>
      {!isPlaying ? (
        <img
          alt={'Pause ' + altTag}
          id={position}
          className={`audio-control 'playing'}`}
          src='https://image.freepik.com/free-icon/play-button_318-42541.jpg'
          onClick={handlePlayPause}
        />
      ) : (
        <img
          alt={'Pause ' + altTag}
          id={position}
          className={`audio-control ''}`}
          src='https://cdn-icons-png.flaticon.com/512/1101/1101992.png'
          onClick={handlePlayPause}
        />
      )}

      <img src={image} alt={altTag} />

      <div className='details'>
        <h3>
          {position}. {title}
        </h3>
        <h4>{artist}</h4>
      </div>

      <audio ref={audioSrc} id={'audio' + position} src={audio} />
    </div>
  );
}

export default Song;
