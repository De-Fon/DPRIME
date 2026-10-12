import ManifestoReveal from "@/components/manifesto/ManifestoReveal";
import { DISCORD_URL, manifesto } from "@/data/manifesto";

export const metadata = { title: "Manifesto | DPRIME" };

export default function ManifestoPage() {
  return <ManifestoReveal sentences={manifesto} discordUrl={DISCORD_URL} />;
}
