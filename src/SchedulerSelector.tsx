import * as React from "react";
import ListSelector from "./ListSelector";
import Schedulers from "./models/Schedulers";

interface ISchedulerSelectorProps {
    value: string;
    onChange?: (value: any, oldValue?: any) => void;
}

export default function SchedulerSelector(props: ISchedulerSelectorProps) {
    const detailRenderer = (item: any) => {
        return `Version ${item.version}`;
    }
    const onSelectionChanged = (index: number) => {
        if (props.onChange) {
            props.onChange({ scheduler: Schedulers[index].id });
        }
    }

    const itemMatcher = (value: string, item: any) => item.id === value;

    return (
        <ListSelector
            items={Schedulers}
            detailRenderer={detailRenderer}
            initialValue={props.value}
            onSelectionChanged={onSelectionChanged}
            itemMatcher={itemMatcher}
        />
    );
}