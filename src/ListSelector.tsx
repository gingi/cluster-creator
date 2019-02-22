import { Check, List, Selection, SelectionMode, SelectionZone } from "office-ui-fabric-react";
import * as React from "react";
import { useEffect, useState } from "react";
import "./ListSelector.css";

type IRenderer = (item: any) => string;

export interface IListSelectorProps {
    items: any[];
    detailRenderer?: IRenderer;
    labelRenderer?: IRenderer;
    initialValue?: any;
    itemMatcher?: (value: string, item: any) => boolean;
    onSelectionChanged?: (index: number) => void;
}

interface IListSelectorCellProps {
    item: any;
    isSelected: boolean;
    index: number;
    detailRenderer?: IRenderer;
    labelRenderer?: IRenderer;
}

const ListSelectorCell = (props: IListSelectorCellProps) => {
    const detail = props.detailRenderer ?
        props.detailRenderer(props.item) : null;
    const label = props.labelRenderer ?
        props.labelRenderer(props.item) : props.item.label;
    return (
        <div className="List-itemCell"
             data-selection-index={props.index}
             data-is-focusable={true}>
            <div className="List-itemCell-checkbox"
                 data-selection-toggle={true}>
                <Check checked={props.isSelected}/>
            </div>
            <div className="List-itemCell-content" data-selection-select={true}>
                <div className="List-itemCell-header">{label}</div>
                {detail &&
                    <div className="List-itemCell-detail">{detail}</div>
                }
            </div>
        </div>
    );
}

const getInitialIndex = (props: any) => {
    const { initialValue, itemMatcher, items } = props;
    if (!initialValue) {
        return 0;
    }
    const matches = itemMatcher ? itemMatcher :
        (value: string, item: any) => value === item;
    for (let i = 0; i < items.length; i++) {
        if (matches(initialValue, items[i])) {
            return i;
        }
    }
    return 0;
}

const ListSelector = (props: IListSelectorProps) => {
    let hasMounted = false;
    let listComponent: any;

    const [ selectedIndex, setSelectedIndex ] =
        useState(getInitialIndex(props));

    const onSelectionChanged = () => {
        if (!hasMounted) {
            return;
        }
        const index = selection.getSelectedIndices()[0];
        if (props.onSelectionChanged) {
            props.onSelectionChanged(index);
            if (listComponent) {
                listComponent.forceUpdate();
            }
        }
        setSelectedIndex(index);
    }

    const selection = new Selection({
        onSelectionChanged,
        selectionMode: SelectionMode.single
    })
    selection.setItems(props.items, false);
    selection.setIndexSelected(selectedIndex, true, true);

    useEffect(() => { hasMounted = true; });

    const onRenderCell = (item: any, index: number) => {
        const isSelected = selectedIndex === index;
        return (
            <ListSelectorCell item={item}
                isSelected={isSelected}
                index={index}
                detailRenderer={props.detailRenderer}
                labelRenderer={props.labelRenderer}
             />
        )
    };
    const listRef = (ref: any) => { listComponent = ref; }

    return (
        <SelectionZone selection={selection}>
            <div className="ListSelector-container" data-is-scrollable={true}>
                <List
                    items={props.items}
                    onRenderCell={onRenderCell}
                    componentRef={listRef}
                />
            </div>
        </SelectionZone>
    );
}

export default ListSelector;