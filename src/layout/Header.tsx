import * as React from "react";

export default class Header extends React.Component<{title: string}, {}> {
    public render() {
      return (
        <div className="App-header ms-Grid-col ms-lg12">
          <h1 className="App-title">{this.props.title}</h1>
        </div>
      );
    }
  }
  