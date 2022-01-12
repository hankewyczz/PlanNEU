import { ReactElement } from "react";
import { SectionWithCourse } from "../types/types";

interface Props {
    sections: Record<string, SectionWithCourse>;
    crns: string[];
}

const ICSDownload = (props): ReactElement => {


    return <div className="col text-center">
    <button type="submit" className={`btn`}>
        Apply Filters
    </button>
</div>




}

export default ICSDownload