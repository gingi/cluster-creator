import * as React from "react";

export default function ButtonContainer(props: any) {
    return (
        <div className="ms-Grid-row ButtonPanel">
            <div className="ms-Grid-col">
                {props.children}
            </div>
        </div>
    )
}