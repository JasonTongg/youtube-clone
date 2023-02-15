import Logo from '../../public/static/youtube.png';
import Image from 'next/image';
import styles from './Navbar.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {BsPersonCircle} from 'react-icons/bs';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {useState} from 'react';

export default function Navbar({category}) {
  let [categoryActive, setCategoryActive] = useState(0);
  let [scroll, setScroll] = useState([false, true]);

  let cekScroll = (e) => {
    let left = e.target.scrollLeft;
    let right = e.target
      .querySelectorAll('button')
      [
        e.target.querySelectorAll('button').length - 1
      ].getBoundingClientRect().right;
    if (right < window.innerWidth - 43.6 + 80) {
      setScroll([true, false]);
    } else if (left >= 20 && left <= 2300) {
      setScroll([true, true]);
    } else if (left < 20) {
      setScroll([false, true]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="logo" height={50} width={50} />
          <h2>Youtube</h2>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
          <div className={styles.searchContainer}>
            <AiOutlineSearch></AiOutlineSearch>
          </div>
        </div>
        <div className={styles.profile}>
          <BsPersonCircle></BsPersonCircle>
        </div>
      </div>
      <div className={styles.arrowContainer}>
        {scroll[0] && (
          <div className={`${styles.arrow} ${styles.left}`}>
            <FiChevronLeft></FiChevronLeft>
          </div>
        )}

        <div
          className={styles.buttonContainer}
          id="buttonScroll"
          onScroll={cekScroll}
        >
          {['All', ...category].map((item, idx) => (
            <button
              key={idx}
              className={idx === categoryActive && styles.active}
            >
              {item}
            </button>
          ))}
        </div>
        {scroll[1] && (
          <div className={`${styles.arrow} ${styles.right}`}>
            <FiChevronRight></FiChevronRight>
          </div>
        )}
      </div>
    </div>
  );
}
