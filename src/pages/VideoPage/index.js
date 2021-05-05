import React from "react";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import { ReactComponent as VideoViewsIcon } from "../../icons/video-view.svg";
import { ReactComponent as LikesIcon } from "../../icons/thumbs-up.svg";
import { ReactComponent as DislikesIcon } from "../../icons/thumbs-down.svg";
import { ReactComponent as AddPlaylistIcon } from "../../icons/add-playlist.svg";
import { useVideoDataContext } from "../../context/videoDataContext";
import "./styles.css";
import { OPEN__MODAL } from "../../constants";
import { useMediaQuery } from "../../utils/useMediaQueries";

function VideoPage() {
	const { id } = useParams();

	const { state, addVideoToLikedVideos, dislikeClickHandler, dispatch } = useVideoDataContext();
	console.log(state);

	const [width] = useMediaQuery();

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
		return dispatch({
			type: OPEN__MODAL,
			payload: { modalType: "addPlaylist", data: dataToShow },
		});
	};

	const opts = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	};

	return (
		<div className={`${width >= 550 && "padding-l16 padding-r16"} mb-32`}>
			{dataToShow && (
				<div
					className="video"
					style={{
						position: "relative",
						paddingBottom: "56.25%" /* 16:9 */,
						paddingTop: 25,
						height: "100%",
						width: "100%",
					}}
				>
					<YouTube
						videoId={dataToShow.videoId}
						id={dataToShow.id}
						className={`mt-8 w100 video-div br-10`}
						opts={opts}
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
									fill={
										dataToShow.disLiked
											? "var(--complementary-color)"
											: "var(--background-color)"
									}
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
				</div>
			)}
		</div>
	);
}

export default VideoPage;
