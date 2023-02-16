import React from 'react';
import Navbar from '@/Components/Navbar/Navbar';
import SideBar from '@/Components/SideBar/SideBar';
import ListVideo from '@/Components/ListVideo/ListVideo';
import Styles from '../../styles/Home.module.css';

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

  return {
    props: {
      category: category.items.map((item) => item.snippet.title),
      id: searchId,
    },
  };
}

export default function searchId({category}) {
  return (
    <div className={Styles.homeContainer}>
      <SideBar></SideBar>
      <div className={Styles.contentContainer}>
        <Navbar category={category}></Navbar>
        {/* <ListVideo videos={videos}></ListVideo> */}
      </div>
    </div>
  );
}
