import DarkMode from './components/ChangeMode.js';
import SearchSection from './components/SearchSection.js';

export default class App {
    constructor($target){
        const darkMode = new DarkMode($target);
        
        const searchSection = new SearchSection($target);
    }

}