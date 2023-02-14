import Navbar from '../Components/Navbar/Navbar';
import ListVideo from '@/Components/ListVideo/ListVideo';

export async function getStaticProps(context) {
  let getVideo = await fetch(
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=100&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks'
  );

  https: getVideo = await getVideo.json();

  let category = await fetch(
    'https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAAqzOZ3dCCyrwUEJoDsyiS5XJjI0zc6ks'
  );

  category = await category.json();
  console.log(category);

  return {
    props: {
      videos: getVideo.items.map((item) => item),
      category: category.items.map((item) => item.snippet.title),
    },
  };
}

export default function Home({videos, category}) {
  return (
    <>
      <Navbar category={category}></Navbar>
      <ListVideo videos={videos}></ListVideo>
    </>
  );
}
