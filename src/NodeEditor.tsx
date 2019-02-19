import * as React from "react";
import ListSelector from "./ListSelector";
import MachineTypes from "./models/MachineTypes";

export default function NodeEditor() {
    const labelRenderer = (nodeType: any) => {
        return nodeType.name;
    };
    const detailRenderer = (nodeType: any) => {
        return [
            `${nodeType.cores} vCPUs`,
            `${nodeType.memory} GB RAM`
        ].join(", ");
    }
    return (
        <>
            <h2>CPU Size</h2>
            <ListSelector
                items={MachineTypes}
                selectedIndex={0}
                detailRenderer={detailRenderer}
                labelRenderer={labelRenderer}
            />
            <h2>Networking</h2>
        </>
    );
}