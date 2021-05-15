import { VideoListingCard } from "../../components";
import "./styles.css";
import { useVideoDataContext } from "../../context/videoDataContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

function Home() {
	useDocumentTitle("Home | CricTube");
	const {
		state: { videosData },
	} = useVideoDataContext();

	return (
		<div>
			<h2>Videos for you</h2>
			{videosData.map((video) => (
				<VideoListingCard key={video._id} video={video} />
			))}
		</div>
	);
}

export default Home;
