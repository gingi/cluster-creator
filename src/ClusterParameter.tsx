import { Icon, IconButton } from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import "./ClusterParameter.css";

export interface IClusterParameterProps {
    details: any[];
    Editor: any;
    icon: string | undefined;
    value: any;
    label: string;
    name: string;
    onEdit?: (values: any) => void;
    showEditor?: boolean;
}

export default function ClusterParameter(props: IClusterParameterProps) {
    const { showEditor = false } = props;
    const [editPanelShown, toggleEditPanel] = useState(showEditor);
    const showEditPanel = () => toggleEditPanel(true);
    const hideEditPanel = () => toggleEditPanel(false);
    const saveAndCloseEditPanel = (values: any) => {
        if (props.onEdit) { props.onEdit(values); }
        hideEditPanel();
    };

    return (
        <div className="ClusterParameter ms-Grid-col ms-lg3 ms-md5 ms-sm11 ms-bgColor-neutralLight">
            {props.icon &&
                <div className="ClusterParameter-icon">
                    <Icon iconName={props.icon} />
                </div>
            }
            <div className="ClusterParameter-edit">
                <IconButton
                    styles={{ root: { backgroundColor: "transparent" }}}
                    iconProps={{ iconName: "Edit" }}
                    aria-label="Edit cluster section"
                    onClick={showEditPanel}/>
            </div>
            <div className="ClusterParameter-content">
                <div className="ClusterParameter-value">
                    {props.label}
                </div>
                {props.details.map(
                    (detail, i) => <div key={`detail-${i}`}
                        className="ClusterParameter-detail">{detail}</div>)}
            </div>
            <props.Editor
                isOpen={editPanelShown}
                onDismiss={hideEditPanel}
                onSave={saveAndCloseEditPanel}
                headerText={`Edit ${props.name}`}
                value={props.value}
            />
        </div>
    );
}