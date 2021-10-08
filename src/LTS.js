import React, { useCallback } from "react";
import "./App.css";
import LTSGrid from "./LTSGrid";
import LTSTopBar from "./LTSTopBar";
import { connect } from "react-redux";
import { addPlayer } from "./features/initiative/initiativeSlice";
import { useDropzone } from "react-dropzone";
import LTSBotBar from "./LTSBotBar";
import LTSTitleBar from "./LTSTitleBar";

function LTS(props) {
  const { addPlayer } = props;

  const parseFiles = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;

        const players = JSON.parse(contents).players;
        console.log(players);
        if (players?.length > 0) {
          players.forEach((p) => {
            addPlayer(p);
          });
        }
      };
      reader.readAsText(file);
    });
  };
  const onDrop = useCallback(parseFiles, [addPlayer]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: ".json",
  });

  return (
    <div className="LTS">
      <div className="LTS-title">
        <LTSTitleBar />
      </div>
      <div className="LTS-header">
        <LTSTopBar getInputProps={getInputProps} open={open} />
      </div>
      <div className="LTS-content">
        <LTSGrid
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          open={open}
        />
      </div>
      <div className="LTS-footer">
        <LTSBotBar />
      </div>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    addPlayer: (p) => dispatch(addPlayer(p)),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LTS);
