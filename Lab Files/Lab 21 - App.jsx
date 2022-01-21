import React, { useState, useEffect } from "react";
import { models, Report, Embed, service, Page } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import './App.css';

function App() {

  const [responseConfig, setResponseConfig] = useState({});

  useEffect(() => {
    var url = "[INSERT FUNCTION URL HERE]"
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setResponseConfig(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <h1>Power BI Embed: </h1>
      <PowerBIEmbed
          embedConfig={{
            //hostname: "https://app.powerbigov.us/",
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: responseConfig.ReportId,
            embedUrl: responseConfig.EmbedUrl,
            accessToken: responseConfig.EmbedToken,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
                pageNavigation: {
                  visible: false,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
               function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={"report-style-class"}
        />
      </header>
    </div>
  );
}

export default App;