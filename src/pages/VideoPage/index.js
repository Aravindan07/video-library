import React from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import { ReactComponent as AddPlaylistIcon } from "../../icons/add-playlist.svg";
import ModalComponent from "../../components/Modal";
import { useVideoDataContext } from "../../context/videoDataContext";
import "./styles.css";

function VideoPage() {
	const { id } = useParams();

	const { state, addVideoToLikedVideos, dislikeClickHandler } = useVideoDataContext();
	console.log(state);

	const dataToShow = state.videosData.find((item) => item.videoId === id);
	console.log("dataToShow", dataToShow);

	const reactionsClickHandler = (type) => {
		console.log(type);
		if (type === "like") {
			return addVideoToLikedVideos({ ...dataToShow, liked: !dataToShow.liked });
		}
		if (type === "dislike") {
			return dislikeClickHandler({ id: dataToShow.id, disLiked: !dataToShow.disLiked });
		}
	};

	const openModalHandler = () => {
		console.log("Inside modal open handler");
		return <ModalComponent isOpen={true} onRequestClose={true} />;
	};

	return (
		<div className="padding-l16 padding-r16 mb-32">
			{dataToShow && (
				<>
					<YouTube
						videoId={dataToShow.videoId}
						id={dataToShow.id}
						className={`mt-8 w100 video-div br-10`}
					/>
					<div className="flex-row-space-between">
						<div className="flex-col">
							<p className="mt-16 font-18">{dataToShow.name}</p>
							<p className="mt-8 fw-600">{dataToShow.channel}</p>
							<p className="mt-8 gray-text">{dataToShow.publishedDate}</p>
						</div>
						<div className="flex-row">
							<div className="flex-row-center c-pointer mr-16">
								<VideoViewsIcon className="w-20 mr-8" />
								<p>{dataToShow.views}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<LikesIcon
									fill={dataToShow.liked ? "blue" : "var(--background-color)"}
									className="w-20 mr-8"
									onClick={() => reactionsClickHandler("like")}
								/>
								<p>{dataToShow.likes}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<DislikesIcon
									fill={dataToShow.disLiked ? "red" : "var(--background-color)"}
									className="w-20 mr-8"
									onClick={() => reactionsClickHandler("dislike")}
								/>
								<p>{dataToShow.dislikes}</p>
							</div>
							<div className="flex-row-center c-pointer ml-16">
								<AddPlaylistIcon
									className="w-20 mr-8"
									onClick={() => openModalHandler()}
								/>
							</div>
						</div>
					</div>
					<p className="mt-8 mb-8">{dataToShow.description}</p>
				</>
			)}
		</div>
	);
}

export default VideoPage;
