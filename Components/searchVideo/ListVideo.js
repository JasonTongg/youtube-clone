import styles from './ListVideo.module.css';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {BsDot} from 'react-icons/bs';
// import moment from 'moment-duration-format';

export default function ListVideo({videos}) {
  console.log(videos);
  let [width, setWidth] = useState(0);
  let [title, setTitle] = useState([]);
  useEffect(() => {
    setWidth(
      document.querySelector('#itemContainer').getBoundingClientRect().width
    );
    Array.from(document.querySelectorAll('#itemContainer #desc')).forEach(
      (item, index) => {
        if (item.getBoundingClientRect().height > 20) {
          setTitle((old) => [...old, index]);
        }
      }
    );
  }, []);

  let processDuration = (duration) => {
    let hour = 0,
      min = 0,
      sec = 0;
    duration = duration.substring(2).split('');
    let durations = duration.join('');
    if (duration.some((item) => item === 'H')) {
      hour = durations.split('H')[0];
      durations = durations.split('H')[1];
    }
    if (duration.some((item) => item === 'M')) {
      min = durations.split('M')[0];
      durations = durations.split('M')[1];
    }
    if (duration.some((item) => item === 'S')) {
      sec = durations.split('S')[0];
      durations = durations.split('S')[1];
    }

    if (hour > '0') {
      return `${hour}:${min}:${sec < 10 ? '0' + sec : sec}`;
    } else {
      if (min > '0') {
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
      } else {
        return `${sec < 10 ? '0' + sec : sec}`;
      }
    }
  };

  function dateDifferent(date) {
    let [year, month, day] = date.split('T')[0].split('-');
    var date1 = new Date(+year, +month, +day);
    var date2 = new Date();

    let diffyear = date2.getFullYear() - date1.getFullYear();
    let diffmonth = date2.getMonth() - date1.getMonth();
    let diffday = date2.getDate() - date1.getDate();

    if (diffyear > 0) {
      return diffyear === 1 ? '1 year ago' : `${diffyear} years ago`;
    }
    if (diffmonth > 0) {
      return diffmonth === 1 ? '1 month ago' : `${diffmonth} months ago`;
    }
    if (diffday > 0) {
      return diffday === 1 ? '1 day ago' : `${diffday} days ago`;
    }
    return 'Now';
  }

  function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
      return num;
    }
    let si = [
      {v: 1e3, s: 'K'},
      {v: 1e6, s: 'M'},
      {v: 1e9, s: 'B'},
      {v: 1e12, s: 'T'},
      {v: 1e15, s: 'P'},
      {v: 1e18, s: 'E'},
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
      si[index].s
    );
  }

  return (
    <div className={styles.container}>
      {videos.map((item, idx) => (
        <div class={styles.itemContainer} key={idx} id="itemContainer">
          <div className={styles.imageContainer}>
            <Image
              src={item.snippet.thumbnails?.high?.url}
              alt="thumbnails"
              height={750}
              width={200}
            />
          </div>
          <div class={styles.itemInfo}>
            <h3>{item.snippet.title}</h3>
            <div className={styles.info}>
              <p>{dateDifferent(item.snippet.publishedAt)}</p>
            </div>
            <p class={styles.title}>{item.snippet.channelTitle}</p>
            <p id="desc">
              {title.some((item) => item === idx)
                ? item.snippet.description.substring(0, width / 11 - 3) + '...'
                : item.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
