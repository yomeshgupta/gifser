const SOURCE_API = 'http://api.giphy.com/v1/gifs/search';
const API_KEY = 'F2yTfZvLf3OWJqgBV0UtMBTp0R0CeS8D';
const RESPONSE_LIMIT = 18;
const TABS = [
	{
		id: 1,
		name: 'Home',
		value: 1
	},
	{
		id: 2,
		name: 'Trending',
		value: 2
	},
	{
		id: 3,
		name: 'Random',
		value: 3
	}
];
const TAB_KEYS = {
	HOME: 1,
	TRENDING: 2,
	RANDOM: 3
};
const DEFAULT_TAB = 1;
const GIF_SEARCH_CONTROLS = {
	play: true,
	download: true
};

export { SOURCE_API, API_KEY, RESPONSE_LIMIT, TABS, DEFAULT_TAB, TAB_KEYS, GIF_SEARCH_CONTROLS };
