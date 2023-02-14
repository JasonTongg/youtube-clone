import Logo from '../../public/static/youtube.png';
import Image from 'next/image';
import styles from './Navbar.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {BsPersonCircle} from 'react-icons/bs';
import {useState} from 'react';

export default function Navbar({category}) {
  let [categoryActive, setCategoryActive] = useState(0);
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
      <div className={styles.buttonContainer}>
        {['All', ...category].map((item, idx) => (
          <button key={idx} className={idx === categoryActive && styles.active}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
