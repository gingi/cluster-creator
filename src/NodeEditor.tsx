import * as React from "react";
import { IEditorRendererProps } from "./ClusterSectionEditor";
import ListSelector from "./ListSelector";
import MachineTypes from "./models/MachineTypes";

export default function NodeEditor(props: IEditorRendererProps) {
    const labelRenderer = (nodeType: any) => {
        return nodeType.name;
    };
    const detailRenderer = (nodeType: any) => {
        return [
            `${nodeType.type}`,
            `${nodeType.cores} vCPUs`,
            `${nodeType.memory} GB RAM`
        ].join(", ");
    }
    const onMachineTypeSelectionChange = (index: number) => {
        props.onChange({ machineType: MachineTypes[index].name });
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
                onSelectionChanged={onMachineTypeSelectionChange}
                height={400}
                filter={true}
            />
            <h2>Project</h2>
            <h2>Networking</h2>

        </>
    );
}