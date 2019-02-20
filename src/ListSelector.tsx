import { Check, ISelection, Selection, SelectionMode, SelectionZone } from "office-ui-fabric-react";
import * as React from "react";
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

interface IListSelectorState {
    selection: ISelection;
}

interface IListSelectorCellProps {
    item: any;
    selection: ISelection;
    index: number;
    detailRenderer?: IRenderer;
    labelRenderer?: IRenderer;
}

const ListSelectorCell:
    React.StatelessComponent<IListSelectorCellProps> =
(props: IListSelectorCellProps) => {
    const detail = props.detailRenderer ?
        props.detailRenderer(props.item) : null;
    const label = props.labelRenderer ?
        props.labelRenderer(props.item) : props.item.label;
    const isSelected = props.selection.isIndexSelected(props.index);
    return (
        <div className="List-itemCell"
             data-selection-index={props.index}
             data-is-focusable={true}>
            <div className="List-itemCell-checkbox"
                 data-selection-toggle={true}>
                <Check checked={isSelected}/>
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

export default class ListSelector
extends React.Component<IListSelectorProps, IListSelectorState> {
    private hasMounted = false;

    constructor(props: IListSelectorProps) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.state = {
            selection: new Selection({
                onSelectionChanged: this.onSelectionChanged,
                selectionMode: SelectionMode.single
            })
        };

        this.state.selection.setItems(props.items, false);
        const selectedIndex = this.getInitialIndex(props);
        this.state.selection.setIndexSelected(selectedIndex, true, true);
    }
    public componentDidMount() {
        this.hasMounted = true;
    }
    public render() {
        const { selection } = this.state;
        return (
            <SelectionZone selection={selection}>
                {this.props.items.map((item, index) =>
                    <ListSelectorCell
                        key={index}
                        item={item}
                        index={index}
                        selection={selection}
                        detailRenderer={this.props.detailRenderer}
                        labelRenderer={this.props.labelRenderer}/>
                )}
            </SelectionZone>
        );
    }
    private onSelectionChanged() {
        if (!this.hasMounted) {
            return;
        }
        this.forceUpdate();
        if (this.props.onSelectionChanged) {
            const index = this.state.selection.getSelectedIndices()[0];
            this.props.onSelectionChanged(index);
        }
    }

    private getInitialIndex(props: any) {
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
}