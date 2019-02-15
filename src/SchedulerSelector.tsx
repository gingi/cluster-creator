import * as React from "react";
import { Component } from "react";
import ListSelector from "./ListSelector";
import Schedulers from "./models/Schedulers";


export default class SchedulerSelector extends Component {
    constructor(props: any) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }
    public render() {
        return (
            <ListSelector
                items={Schedulers}
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