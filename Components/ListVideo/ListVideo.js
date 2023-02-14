import styles from './ListVideo.module.css';
import Image from 'next/image';

export default function ListVideo({videos}) {
  console.log(videos);
  return (
    <div className={styles.container}>
      {videos.map((item, idx) => (
        <Image
          src={item.snippet.thumbnails.high.url}
          key={idx}
          alt="thumbnails"
          height={200}
          width={200}
        />
      ))}
    </div>
  );
}
