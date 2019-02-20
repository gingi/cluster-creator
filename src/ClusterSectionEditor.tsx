import { Panel, PanelType, PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import { Component, SyntheticEvent } from "react";

export interface IClusterSectionEditorProps {
    isOpen: boolean;
    onDismiss: (event: SyntheticEvent<HTMLElement>) => void;
    onSave: (values: any) => void;
    headerText: string;
}

export default function createEditor(WrappedEditor: any) {
    return class Editor extends Component<IClusterSectionEditorProps> {
        public state = {
            changed: false,
            values: {}
        };
        public render() {
            const { isOpen, onDismiss, headerText, ...extraProps } = this.props;
            const onSaveEditor = this.onSaveEditor.bind(this);
            const handleChange = this.handleChange.bind(this);
            return (
                <Panel
                    isOpen={isOpen}
                    type={PanelType.smallFixedFar}
                    onDismiss={onDismiss}
                    headerText={headerText}>
                    <WrappedEditor onChange={handleChange} {...extraProps} />
                    <PrimaryButton text="Save" onClick={onSaveEditor}/>
                </Panel>
            );
        }

        private onSaveEditor() {
            if (this.state.changed) {
                this.props.onSave(this.state.values);
            }
        }

        private handleChange(value: any) {
            this.setState({
                changed: true,
                values: Object.assign({}, this.state.values, value)
            });
        }
    }
}
