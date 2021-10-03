import React from "react";
import "./App.css";
import LTSGrid from "./LTSGrid";
import CustomTitleBar from "./CustomTitleBar";

function LTS() {
  return (
    <div class="LTS">
      <div class="LTS-header">
        <p>header (sized to content)</p>
      </div>
      <div class="LTS-header">
        <p>header (sized to content)</p>
      </div>
      <div class="LTS-content">
        <p>content (fills remaining space)</p>
      </div>
      <div class="LTS-footer">
        <p>footer (fixed height)</p>
      </div>
    </div>
  );
}

export default LTS;
