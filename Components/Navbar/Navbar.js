import Logo from '../../public/static/youtube.png';
import Image from 'next/image';
import styles from './Navbar.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {BsPersonCircle} from 'react-icons/bs';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {useState} from 'react';
import Link from 'next/link';
import Router, {useRouter} from 'next/router';

export default function Navbar({category}) {
  let Routers = useRouter();
  let {searchId} = Routers.query;
  let [scroll, setScroll] = useState([false, true]);
  let [search, setSearch] = useState('');

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

  let searchFunction = (e) => {
    e.preventDefault();
    Router.push(`/search/${search}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div
          className={styles.logo}
          onClick={() => {
            Router.replace('/');
          }}
        >
          <Image src={Logo} alt="logo" height={50} width={50} />
          <h2>Youtube</h2>
        </div>
        <form className={styles.search} onSubmit={searchFunction}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
          />
          <div className={styles.searchContainer}>
            <AiOutlineSearch></AiOutlineSearch>
          </div>
        </form>
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
          {Routers.pathname === '/' ? (
            <Link href={'/'}>
              <button className={styles.active}>All</button>
            </Link>
          ) : (
            <Link href={'/'}>
              <button>All</button>
            </Link>
          )}

          {category.map((item, idx) => (
            <Link href={`/search/${item}`} key={idx}>
              <button className={item === searchId ? styles.active : ''}>
                {item}
              </button>
            </Link>
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
