import ListSelector from "./ListSelector";

import * as React from "react";
import Projects from "./models/Projects";

const ProjectSelector = () => {
    return (
        <ListSelector items={Projects} />
    );
}

export default ProjectSelector;