import DarkMode from './components/ChangeMode.js';
import SearchSection from './components/SearchSection.js';
import ResultSection from './components/ResultSection.js';
import {getItem, setItem} from "./util/localStorage.js";
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
            if(isRandom){
                console.log("isRandom1 : ", isRandom);
                response = await api.fetchCats(keyword);
            } else {
                console.log("isRandom2 : ", isRandom);
                response = await api.fetchRandomCats();
            }
            console.log(response);
            resultSection.setState(response);
            const recent = JSON.stringify(response);
            setItem("recent", recent);
            loader.closeLoader();
        }

        const darkMode = new DarkMode($target);
        const searchSection = new SearchSection({$target, onSearch, keywords});

        getInitialData(keywords);
        const resultSection = new ResultSection($target, initialData);
    }
}