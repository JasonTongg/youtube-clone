import React from 'react';
import Navbar from '@/Components/Navbar/Navbar';
import SideBar from '@/Components/SideBar/SideBar';
import ListVideo from '@/Components/searchVideo/ListVideo';
import Styles from '../../styles/Home.module.css';
import styless from '../Components/SideBar/SideBar.module.css';

export async function getStaticPaths() {
  let category = await fetch(
    'https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks'
  );

  category = await category.json();
  category = category.items.map((item) => item.snippet.title);

  return {
    paths: category.map((item) => {
      return {
        params: {
          searchId: item,
        },
      };
    }),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  let category = await fetch(
    'https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks'
  );

  category = await category.json();

  let {searchId} = context.params;

  let searchVideo = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchId}&type=video&maxResults=100&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks`
  );

  searchVideo = await searchVideo.json();

  return {
    props: {
      category: category.items.map((item) => item.snippet.title),
      videos: searchVideo.items,
    },
  };
}

export default function searchId({category, videos}) {
  return (
    <div className={Styles.homeContainer}>
      <SideBar></SideBar>
      <div className={styless.containerss}></div>
      <div className={Styles.contentContainer}>
        <Navbar category={category}></Navbar>
        <ListVideo videos={videos}></ListVideo>
      </div>
    </div>
  );
}
