import * as React from "react";
import ListSelector from "./ListSelector";
import MachineTypes from "./models/MachineTypes";

export default function NodeEditor(props: any) {
    const labelRenderer = (nodeType: any) => {
        return nodeType.name;
    };
    const detailRenderer = (nodeType: any) => {
        return [
            `${nodeType.cores} vCPUs`,
            `${nodeType.memory} GB RAM`
        ].join(", ");
    }
    const itemMatcher = (value: string, item: any) => item.name === value;
    return (
        <>
            <h2>CPU Size</h2>
            <ListSelector
                items={MachineTypes}
                initialValue={props.value.machineType}
                detailRenderer={detailRenderer}
                labelRenderer={labelRenderer}
                itemMatcher={itemMatcher}
            />
            <h2>Networking</h2>
        </>
    );
}