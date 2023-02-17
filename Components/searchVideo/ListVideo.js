import styles from './ListVideo.module.css';
import SearchVideo from '../Video/SearchVideo';

export default function ListVideo({videos}) {
  console.log(videos);

  return (
    <div className={styles.container}>
      {videos.map((item, idx) => (
        <SearchVideo item={item} key={idx} idx={idx}></SearchVideo>
      ))}
    </div>
  );
}
