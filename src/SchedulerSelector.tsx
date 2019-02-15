import * as React from "react";

import ListSelector from "./ListSelector";

const SCHEDULERS = [
    {
        id: "uge",
        label: "Univa Grid Engine",
        name: "UGE",
        version: "6.2u8"
    },
    {
        id: "pbspro",
        label: "Altair PBS Professional",
        name: "PBSPro",
        version: "19.1.1"
    },
    {
        id: "slurm",
        label: "SchedMD Slurm Workload Manager",
        name: "Slurm",
        version: "18.08"
    },
    {
        id: "lsf",
        label: "IBM Spectrum LSF",
        name: "LSF",
        version: "10.1.0"
    }
];

export default class SchedulerSelector extends React.Component {
    constructor(props: any) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }
    public render() {
        return (
            <ListSelector
                items={SCHEDULERS}
                detailRenderer={this.detailRenderer}
                selectedIndex={1}
                onSelectionChanged={this.onSelectionChanged}
            />
        );
    }

    private detailRenderer(item: any) {
        return `Version ${item.version}`;
    }

    private onSelectionChanged(index: number) {
        alert("Selection changed to " + index);
    }
}