import { Check, ISelection, Selection, SelectionMode, SelectionZone } from "office-ui-fabric-react";
import * as React from "react";
import "./ListSelector.css";

type IRenderer = (item: any) => string;

export interface IListSelectorProps {
    items: any[];
    detailRenderer: IRenderer;
}

interface IListSelectorState {
    selection: ISelection;
}

interface IListSelectorCellProps {
    item: any;
    selection: ISelection;
    index: number;
    detailRenderer: IRenderer;
}

const ListSelectorCell:
    React.StatelessComponent<IListSelectorCellProps> =
(props: IListSelectorCellProps) => {
    const detail = props.detailRenderer(props.item);
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
                <div className="List-itemCell-header">{props.item.label}</div>
                <div className="List-itemCell-detail">{detail}</div>
            </div>
        </div>
    );
}

export default class ListSelector
extends React.Component<IListSelectorProps, IListSelectorState> {
    constructor(props: IListSelectorProps) {
        super(props);
        this.state = {
            selection: new Selection({
                onSelectionChanged: () => this.forceUpdate(),
                selectionMode: SelectionMode.single
            })
        };

        this.state.selection.setItems(props.items, false);
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
                        detailRenderer={this.props.detailRenderer}/>
                )}
            </SelectionZone>
        );
    }
}