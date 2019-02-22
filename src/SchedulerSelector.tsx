import * as React from "react";
import { IEditorRendererProps } from "./ClusterSectionEditor";
import ListSelector from "./ListSelector";
import Schedulers from "./models/Schedulers";

export default function SchedulerSelector(props: IEditorRendererProps) {
    const detailRenderer = (item: any) => {
        return `Version ${item.version}`;
    }
    const onSelectionChanged = (index: number) => {
        props.onChange({ scheduler: Schedulers[index].id });
    }

    const itemMatcher = (value: string, item: any) =>
        item.id.toLowerCase() === value.toLowerCase();

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