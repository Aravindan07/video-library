export const initialState = {
	videosData: [],
	likedVideos: [],
	playlists: [{ playlistId: "1", playListName: "Batting", videos: [{}, {}] }],
	watchLater: [],
};

export const videoData = [
	{
		id: "1",
		videoId: "g-beFHld19c",
		name: "What Is Cricket? Get to know the sport",
		imageUrl: "https://img.youtube.com/vi/g-beFHld19c/hqdefault.jpg",
		description:
			"For our 'What is Cricket?' series, we begin by explaining the basics of the sport.",
		thumbnail:
			"https://i.ytimg.com/an_webp/g-beFHld19c/mqdefault_6s.webp?du=3000&sqp=CMndz4MG&rs=AOn4CLBbah7yMITVff7YTtRkk6_n3X-zpQ",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "1.5M",
		likes: 0,
		dislikes: 0,
		watchLength: "2:00",
		publishedDate: "Oct 5,2018",
		channel: "ICC",
	},
	{
		id: "2",
		videoId: "wHEIT32ZEVs",
		name: "Cricket rules explained in 2 minutes",
		imageUrl: "https://img.youtube.com/vi/wHEIT32ZEVs/hqdefault.jpg",
		description:
			"The game's rules, shape of the pitch and the length of matches can confuse fans unfamiliar with the sport.So, how is the game played? Here are the basics in two minutes.",
		thumbnail:
			"https://i.ytimg.com/an_webp/wHEIT32ZEVs/mqdefault_6s.webp?du=3000&sqp=CJ_4z4MG&rs=AOn4CLClxj1d5YMvJErFlJIrmI8KlINcBQ",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "66,408",
		likes: 0,
		dislikes: 0,
		watchLength: "2:00",
		publishedDate: "Jul 11,2019",
		channel: "Global News",
	},
	{
		id: "3",
		videoId: "wjTHAFNvm7Q",
		name: "The Laws of Cricket Explained | Narrated by Stephen Fry!",
		imageUrl: "https://img.youtube.com/vi/wjTHAFNvm7Q/hqdefault.jpg",
		description: "Stephen Fry narrates a series of videos on the laws of cricket.",
		thumbnail:
			"https://i.ytimg.com/an_webp/wjTHAFNvm7Q/mqdefault_6s.webp?du=3000&sqp=CMTXz4MG&rs=AOn4CLD5QpKnoRCWIN5-H4p4C7jKAaQbOA",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "29k",
		likes: 0,
		dislikes: 0,
		watchLength: "25:12",
		publishedDate: "Aug 25,2020",
		channel: "Lord's Cricket Ground",
	},
	{
		id: "4",
		videoId: "8oOj2x4_OMs",
		name: "Batting for Beginners",
		imageUrl: "https://img.youtube.com/vi/8oOj2x4_OMs/hqdefault.jpg",
		description:
			"A beginner cricketer will most likely just want to give the ball a thump but if your youngster is ready for some simple coaching tips, this video covers the batting basics.",
		thumbnail:
			"https://i.ytimg.com/an_webp/8oOj2x4_OMs/mqdefault_6s.webp?du=3000&sqp=CK3kwYMG&rs=AOn4CLDYBM2GZeKi9q6lbG4X37MPecnNrA",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "1.5M",
		likes: 0,
		dislikes: 0,
		watchLength: "12:07",
		publishedDate: "Aug 7,2019",
		channel: "Ben Williams - My Cricket Coach",
	},
	{
		id: "5",
		videoId: "ro38zYAXdcs",
		name: "How to focus on Ball",
		imageUrl: "https://img.youtube.com/vi/ro38zYAXdcs/hqdefault.jpg",
		description:
			"A beginner cricketer will most likely just want to give the ball a thump but if your youngster is ready for some simple coaching tips, this video covers the batting basics.",
		thumbnail:
			"https://i.ytimg.com/an_webp/ro38zYAXdcs/mqdefault_6s.webp?du=3000&sqp=CLD4wYMG&rs=AOn4CLBr26lip4XEvbS_k9Tw94jmCHNxSQ",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "4.6M",
		likes: 0,
		dislikes: 0,
		watchLength: "12:07",
		publishedDate: "Aug 7,2019",
		channel: "Ben Williams - My Cricket Coach",
	},
];

export const LOAD__VIDEOS__DATA = "LOAD__VIDEOS__DATA";
export const ADD__TO__LIKED__VIDEOS = "ADD__TO__LIKED__VIDEOS";
export const ADD__TO__WATCH__LATER = "ADD__TO__WATCH__LATER";
export const CLICKED__ON__DISLIKE = "CLICKED__ON__DISLIKE";
