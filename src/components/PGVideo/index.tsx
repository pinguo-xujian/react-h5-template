/*
 * @Author: pinguo-xujian
 * @Date: 2023-03-06 18:40:20
 * @LastEditors: pinguo-xujian
 * @LastEditTime: 2023-06-19 11:39:48
 * @Description:视频播放组件
 */
import classNames from 'classnames';
import Styles from './index.less';
import {
  FC,
  VideoHTMLAttributes,
  useRef,
  Ref,
  useEffect,
  useMemo,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import enableInlineVideo from 'iphone-inline-video';
import { useUnmount } from 'ahooks';
import { SpinLoading } from 'antd-mobile';
interface IPGVideoProps {
  value?: any;
  autoPlay?: boolean;
  onLoadStart?: Function;
  onCanPlayThrough?: Function;
  onProgress?: Function;
  onChange?: Function;
}

const PGVideo = forwardRef(
  (
    { value, onChange, autoPlay, onLoadStart, onCanPlayThrough, onProgress, ...reset }: IPGVideoProps,
    ref: Ref<any>,
  ) => {
    // 是否正在播放
    const [isPlay, setIsPlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoPoster, setVideoPoster] = useState('');
    const mediaRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
      document.addEventListener('visibilitychange', onPageHide);
      return () => {
        document.removeEventListener('visibilitychange', onPageHide);
      };
    }, []);
    useEffect(() => {
      const videoUrl = (value && value.url) || '';
      const videoPoster = (value && value.screenshot && value.screenshot.url) || '';
      setVideoUrl(videoUrl);
      setVideoPoster(videoPoster);
    }, [value]);
    const playStatus = useRef<{ autoPlay: boolean; isInit: boolean }>({
      autoPlay: false,
      isInit: false,
    });

    // 播放已暂停
    const autoPlayMedia = () => {
      setIsPlay(false);
      if (mediaRef.current) {
        const playMedia = () => {
          enableInlineVideo(mediaRef.current);
          onChange && onChange(true);
          mediaRef.current?.play();

          if (mediaRef.current?.paused) {
            setTimeout(() => {
              playMedia();
            }, 500);
          } else {
            setIsPlay(true);
            playStatus.current.isInit = true;
          }
        };
        playMedia();
      } else {
        setTimeout(() => {
          autoPlayMedia();
        }, 100);
      }
    };
    useEffect(() => {
      if (autoPlay && videoUrl && mediaRef.current) {
        autoPlayMedia();
      }
    }, [videoUrl, mediaRef.current]);

    const onPageHide = useCallback(() => {
      var visibility = document.visibilityState;
      if (visibility == 'hidden' && mediaRef.current) {
        setIsPlay(false);
        mediaRef.current.pause();
        // var videoElement = document.getElementById('id_of_the_video_element_here');
      }
    }, [mediaRef.current]);
    // 播放已暂停。
    const onVideoPause = (e: any) => {
      enableInlineVideo(mediaRef.current);
      setIsPlay(false);
      onChange && onChange(false);
    };
    // 播放已开始
    const onVideoPlay = () => {
      setLoading(true);
      enableInlineVideo(mediaRef.current);
      setIsPlay(true);
      onChange && onChange(true);
    };
    // 播放视频
    const playVideo = () => {
      enableInlineVideo(mediaRef.current);
      setIsPlay(true);
      onChange && onChange(true);
      mediaRef.current?.play();
    };
    // 停止播放视频
    const stopVideo = () => {
      if (!isPlay) return false;
      enableInlineVideo(mediaRef.current);
      setIsPlay(false);
      onChange && onChange(false);
      mediaRef.current?.pause();
      mediaRef.current?.removeAttribute('src');
      mediaRef.current?.load();
      // mediaRef.current&&mediaRef.current.currentTime = 0;
    };
    const onClickCapture = () => {
      if (!isPlay) return;
      if (loading) return;
      if (isPlay) {
        setIsPlay(false);
        onChange && onChange(false);
        mediaRef.current?.pause();
      } else {
        setIsPlay(true);
        onChange && onChange(true);
        mediaRef.current?.play();
      }
    };
    // 在浏览器加载资源时周期性触发
    const handleProgress = (progress: any) => {
      console.log('onProgress:', progress);

      setLoading(true);
      onProgress && onProgress();
    };
    // 客户端开始请求数据
    const handleLoadStart = () => {
      console.log('onLoadStart:', 'onLoadStart');
      setLoading(true);
      onLoadStart && onLoadStart();
    };

    const handleCanplaythrough = () => {
      console.log('onCanPlayThrough:', 'onCanPlayThrough');
      setLoading(false);
      setIsFinish(true);
      onCanPlayThrough && onCanPlayThrough();
    };
    const onPlaying = (e: any) => {
      console.log('onPlaying', e);
      // setLoading(false);
    };
    const handleStalled = () => {};
    const onWaiting = (e) => {
      console.log('onWaiting', e);
    };
    useImperativeHandle(ref, () => ({
      playVideo,
      stopVideo,
      setVideoUrl,
      setVideoPoster,
      onPageHide,
      autoPlayMedia,
    }));
    useUnmount(() => {
      setVideoUrl('');
      setVideoPoster('');
      onPageHide();
    });
    return (
      <div className={Styles['pg-video']}>
        <video
          id='player'
          controls={false}
          webkit-playsinline='true'
          x5-playsinline='true'
          playsInline={true}
          preload='auto'
          x5-video-player-type='h5'
          ref={mediaRef}
          src={videoUrl}
          poster={videoPoster}
          // poster={`${videoUrl}?vframe/jpg/offset/1`}
          onPlay={onVideoPlay}
          onPlaying={onPlaying}
          onPause={onVideoPause}
          onClickCapture={onClickCapture}
          disablePictureInPicture={false}
          onProgress={handleProgress}
          onLoadStart={handleLoadStart}
          onCanPlayThrough={handleCanplaythrough}
          className='video'
          onStalled={handleStalled}
          onWaiting={onWaiting}
          {...reset}
        >
          {/* <source src='http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' type='video/mp4' /> */}
        </video>
        <SpinLoading
          color='#D0FE18'
          className={classNames('pg-video-loading', { show: loading })}
          style={{ '--size': '32px' }}
        />
      </div>
    );
  },
);
export default PGVideo;
