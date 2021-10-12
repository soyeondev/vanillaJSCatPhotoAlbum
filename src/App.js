import DarkMode from './components/ChangeMode.js';
import SearchSection from './components/SearchSection.js';
import ResultSection from './components/ResultSection.js';
import {getItem} from "./util/localStorage.js";
import api from "./api/theCatAPI.js";
import Loader from './components/Loader.js';

export default class App {
    constructor($target){
        let keywords = getItem("keywords");
        console.log("keywords: ", keywords);
        let initialData = null;
        if(keywords){
            keywords = keywords.split(",");
        } else {
            keywords = [];
        }

        const getInitialData = async (keywords) => {
            if(keywords){
                initialData = JSON.parse(getItem("recent"));
            } else {
                return null;
            }
        }

        const onSearch = async (keyword, isRandom) => {
            const loader = new Loader($target);
            let response = null;
            console.log("isRandom: ", isRandom);
            if(isRandom){
                response = await api.fetchCats(keyword);
            } else {
                response = await api.fetchRandomCats();
            }
            resultSection.setState(response);
        }

        const darkMode = new DarkMode($target);
        const searchSection = new SearchSection({$target, onSearch, keywords});

        getInitialData(keywords);
        const resultSection = new ResultSection($target);
    }
}