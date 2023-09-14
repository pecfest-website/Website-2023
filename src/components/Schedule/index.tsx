import React from "react";
import { Epg, Layout } from "planby";

// Import hooks
import { useApp } from "./useApp";

// Import components
import { Timeline, ChannelItem, ProgramItem } from "./components";

function Schedule() {
  const { isLoading, getEpgProps, getLayoutProps } = useApp();

  return (
    <div>
      <div style={{ height: "80vh", width: "100%" }}>
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderTimeline={(props) => <Timeline {...props} />}
            renderProgram={({ program, ...rest }) => (
              <ProgramItem key={program.data.id} program={program} {...rest} />
            )}
            renderChannel={({ channel }) => (
              <ChannelItem key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </div>
    </div>
  );
}

export default Schedule;
