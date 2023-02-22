import styles from './ListVideo.module.css';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import Video from '../Video/Video';

export default function ListVideo({videos}) {
  return (
    <div className={styles.container}>
      {videos.map((item, idx) => (
        <Video key={idx} item={item} idx={idx} />
      ))}
    </div>
  );
}
