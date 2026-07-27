import { BuildArc } from "@/components/scene/BuildArc";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { Engagement } from "@/components/sections/Engagement";
import { Budget } from "@/components/sections/Budget";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      {/* One continuous scene runs behind the hero and the capability list:
          the build is assembled once, not re-staged per section. */}
      <BuildArc>
        <Hero />
        <Capabilities />
      </BuildArc>

      <SelectedWork />
      <Process />
      <Engagement />
      <Budget />
      <Contact />
    </>
  );
}
