import * as React from "react";
import { Meta } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";

export default {
  title: "UI/Resizable Panels",
  component: ResizablePanelGroup,
} as Meta;

export const Horizontal = () => (
  <ResizablePanelGroup
    direction="horizontal"
    className="max-w-md rounded-lg border"
  >
    <ResizablePanel defaultSize={50}>
      <div className="flex h-[200px] items-center justify-center p-6">
        <span className="font-semibold">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Two</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
);

export const Vertical = () => (
  <ResizablePanelGroup
    direction="vertical"
    className="min-h-[200px] max-w-md rounded-lg border"
  >
    <ResizablePanel defaultSize={50}>
      <div className="flex h-[200px] items-center justify-center p-6">
        <span className="font-semibold">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Two</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
);
