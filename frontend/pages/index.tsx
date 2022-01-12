import type { NextPage } from "next";
import { FiltersProvider } from "./contexts/FiltersContext";
import Filters from "../components/Filters";
import Results from "../components/Results";

const Home: NextPage = () => {

    return (
        <FiltersProvider>
            <div className="column-container">
                <div className="column-left">
                    <Filters />
                </div>
                <div className="column-spacer"></div>
                <div className="column-right">
                    <Results />
                </div>
            </div>
        </FiltersProvider>
    );
};

export default Home;