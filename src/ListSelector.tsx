import { Check, List, Selection, SelectionMode, SelectionZone, TextField } from "office-ui-fabric-react";
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
    height?: number;
    filter?: boolean;
}

interface IListSelectorCellProps {
    item: any;
    isSelected: boolean;
    index: number;
    detail: string | undefined;
    label: string;
}

const ListSelectorCell = (props: IListSelectorCellProps) => {
    return (
        <div className="List-itemCell"
             data-selection-index={props.index}
             data-is-focusable={true}>
            <div className="List-itemCell-checkbox"
                 data-selection-toggle={true}>
                <Check checked={props.isSelected}/>
            </div>
            <div className="List-itemCell-content" data-selection-select={true}>
                <div className="List-itemCell-header">{props.label}</div>
                {props.detail &&
                    <div className="List-itemCell-detail">{props.detail}</div>
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

interface IWrappedItem {
    key: number;
    originalItem: any;
}

const withKey = (items: any[]): IWrappedItem[] =>
    items.map((item, index) => {
        return { originalItem: item, key: index };
    });

const ListSelector = (props: IListSelectorProps) => {
    const {
        height = document.body.clientHeight,
        filter = false,
        labelRenderer = (item: any) => item.label,
        detailRenderer = () => undefined
    } = props;
    let hasMounted = false;
    let listComponent: any;
    const initialItems = withKey(props.items);

    const [ selectedKey, setSelectedKey ] =
        useState(getInitialIndex(props));
    const [ shownItems, setShownItems ] = useState(initialItems);
    const [ , setFilterText ] = useState("");

    const onSelectionChanged = () => {
        if (!hasMounted) {
            return;
        }
        const selected = selection.getSelection()[0] as IWrappedItem;
        if (props.onSelectionChanged && selected) {
            props.onSelectionChanged(selected.key);
            setSelectedKey(selected.key);
        }
        if (listComponent) {
            listComponent.forceUpdate();
        }
}

    const selection = new Selection({
        onSelectionChanged,
        selectionMode: SelectionMode.single
    });

    selection.setItems(shownItems, false);
    selection.setIndexSelected(selectedKey, true, true);
    useEffect(() => { hasMounted = true; });

    const onRenderCell = (wrappedItem: IWrappedItem, index: number) => {
        const isSelected = selectedKey === wrappedItem.key;
        const item = wrappedItem.originalItem;
        return (
            <ListSelectorCell
                item={item}
                isSelected={isSelected}
                index={index}
                detail={detailRenderer(item)}
                label={labelRenderer(item)}
            />
        )
    };
    const listRef = (ref: any) => { listComponent = ref; }

    const onFilterChanged = (text: string) => {
        if (text) {
            setFilterText(text);
            const lcText = text.toLowerCase();
            const filtered = initialItems.filter(wrapper => {
                const item = wrapper.originalItem;
                if (labelRenderer(item).toLowerCase().indexOf(lcText) >= 0) {
                    return true;
                }
                const details = detailRenderer(item);
                if (details) {
                    return details.toLowerCase().indexOf(lcText) >= 0;
                }
                return false;
            });
            setShownItems(filtered);
            // selection.setItems(filtered, true);
        } else {
            setShownItems(initialItems);
            // selection.setItems(initialItems, true);
        }
    };

    const statusLabel = filter ?
        (<TextField
            label={
                `Showing ${shownItems.length} of ${initialItems.length} items`
            }
            onBeforeChange={onFilterChanged}
        />)
        : <div>Showing {initialItems.length} items</div>

    return (
        <SelectionZone selection={selection}>
            {statusLabel}
            <div style={{ height, overflow: "auto" }}
                 className="ListSelector-container"
                 data-is-scrollable={true}>
                <List
                    items={shownItems}
                    onRenderCell={onRenderCell}
                    componentRef={listRef}
                />
            </div>
        </SelectionZone>
    );
}

export default ListSelector;