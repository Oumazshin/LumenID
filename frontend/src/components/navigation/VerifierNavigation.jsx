import { ShieldCheck } from "lucide-react";
import { BaseNavigation } from "./BaseNavigation";
import { SiteLogo } from "../ui/SiteLogo";

export function VerifierNavigation() {
  return (
    <BaseNavigation
      logo={{
        to: "/",
        icon: ShieldCheck,
        image: <SiteLogo width={48} height={48} className="rounded" />,
        iconGradient: "from-emerald-500 via-teal-500 to-cyan-500",
        text: "LumenID Verifier",
        textGradient: "from-emerald-400 via-teal-400 to-cyan-400",
        ariaLabel: "LumenID Verifier Portal"
      }}
      leftContent={null}
      rightContent={null}
    />
  );
}