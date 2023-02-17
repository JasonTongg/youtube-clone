import Navbar from '../Components/Navbar/Navbar';
import ListVideo from '@/Components/ListVideo/ListVideo';
import SideBar from '@/Components/SideBar/SideBar';
import Styles from '../styles/Home.module.css';

export async function getStaticProps(context) {
  let getVideo = await fetch(
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=ID&maxResults=100&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks'
  );

  getVideo = await getVideo.json();

  let category = await fetch(
    'https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks'
  );

  category = await category.json();

  return {
    props: {
      videos: getVideo.items.map((item) => item),
      category: category.items.map((item) => item.snippet.title),
    },
  };
}

export default function Home({videos, category}) {
  return (
    <div className={Styles.homeContainer}>
      <SideBar></SideBar>
      <div className={Styles.contentContainer}>
        <Navbar category={category}></Navbar>
        <ListVideo videos={videos}></ListVideo>
      </div>
    </div>
  );
}
