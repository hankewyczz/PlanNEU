import type { NextPage } from "next";
import Filters from "../components/Filters";
import Results from "../components/Results";

const Home: NextPage = () => {
    return (
        <div className="column-container">
            <div className="column-left">
                <Filters />
            </div>
            <div className="column-right">
                <Results />
            </div>
        </div>
    );
};

export default Home;
