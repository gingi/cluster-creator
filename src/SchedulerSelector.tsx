import * as React from "react";
import ListSelector from "./ListSelector";
import Schedulers from "./models/Schedulers";

interface ISchedulerSelectorProps {
    value: number;
    onSave?: () => void;
}

export default function SchedulerSelector(props: ISchedulerSelectorProps) {
    const detailRenderer = (item: any) => {
        return `Version ${item.version}`;
    }
    const onSelectionChanged = (index: number) => {
        if (props.onSave) {
            props.onSave();
        }
    }

    return (
        <ListSelector
            items={Schedulers}
            detailRenderer={detailRenderer}
            selectedIndex={props.value}
            onSelectionChanged={onSelectionChanged}
        />
    );
}