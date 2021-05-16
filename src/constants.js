export const initialState = {
	videosData: [],
	user: {},
	likedVideos: [],
	dislikedVideos: [],
	playlists: [],
	watchLater: [],
	savedVideos: [],
	modal: {
		isModalOpen: false,
		modalType: "",
		data: null,
	},
	openMobileMenu: false,
	isAuthenticated: false,
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
	{
		id: "6",
		videoId: "P1XTumYOpto",
		name: "Smart Methods To Handle Fast Bowlers",
		imageUrl: "https://img.youtube.com/vi/P1XTumYOpto/hqdefault.jpg",
		description:
			"A beginner cricketer will most likely just want to give the ball a thump but if your youngster is ready for some simple coaching tips, this video covers the batting basics.",
		thumbnail:
			"https://i.ytimg.com/an_webp/P1XTumYOpto/mqdefault_6s.webp?du=3000&sqp=CNaPy4QG&rs=AOn4CLB0UNO5CZrprpH8E3VYQj0pmn_KIg",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "24k",
		likes: 0,
		dislikes: 0,
		watchLength: "9:08",
		publishedDate: "Nov 30,2020",
		channel: "Nothing But Cricket",
	},
	{
		id: "7",
		videoId: "nFUSQX-hcpQ",
		name: "Hanging ball practice",
		imageUrl: "https://img.youtube.com/vi/nFUSQX-hcpQ/hqdefault.jpg",
		description:
			"This video is about Hanging ball practice. How to play hanging ball and how to practice cricket at home are few questions that I will answer in this video.For Hanging ball cricket practice, I have used a bat in this video which is known as middling bat, it is a great equipment to practice your batting.",
		thumbnail:
			"https://i.ytimg.com/an_webp/nFUSQX-hcpQ/mqdefault_6s.webp?du=3000&sqp=CLzQyoQG&rs=AOn4CLAkJ3CeSYEgcHv13scUuwcmWFz9rQ",
		liked: false,
		disLiked: false,
		watchLater: false,
		playLists: [],
		views: "63k",
		likes: 0,
		dislikes: 0,
		watchLength: "9:08",
		publishedDate: "Feb 19, 2018",
		channel: "Safal Future in cricket",
	},
];

export const LOAD__VIDEOS__DATA = "LOAD__VIDEOS__DATA";
export const ADD__TO__LIKED__VIDEOS = "ADD__TO__LIKED__VIDEOS";
export const CLICKED__ON__DISLIKE = "CLICKED__ON__DISLIKE";
export const OPEN__MODAL = "OPEN__MODAL";
export const CLOSE__MODAL = "CLOSE__MODAL";
export const ADD__TO__PLAYLIST = "ADD__TO__PLAYLIST";
export const ADD__VIDEO__TO__EXISTING__PLAYLIST = "ADD__VIDEO__TO__EXISTING__PLAYLIST";
export const REMOVE__VIDEO__FROM__PLAYLIST = "REMOVE__VIDEO__FROM__PLAYLIST";
export const REMOVE__PLAYLIST = "REMOVE__PLAYLIST";
export const OPEN__MOBILE__MENU = "OPEN__MOBILE__MENU";
export const CLOSE__MOBILE__MENU = "CLOSE__MOBILE__MENU";
export const ADD__OR__REMOVE__VIDEO__FROM__WATCHLATER = "ADD__OR__REMOVE__VIDEO__FROM__WATCHLATER";
export const SET__LOGIN = "SET__LOGIN";
export const SET__SIGNUP = "SET__SIGNUP";
export const SET__LOGOUT = "SET__LOGOUT";
export const LOAD__USER = "LOAD__USER";
export const LOAD__LIKED__VIDEOS = "LOAD__LIKED__VIDEOS";
export const ADD__OR__REMOVE__VIDEO__FROM__SAVED__VIDEOS = "ADD__VIDEO__TO__SAVED__VIDEOS";
