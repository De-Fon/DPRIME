import ManifestoReveal from "@/components/manifesto/ManifestoReveal";
import { AUDIO_SRC, DISCORD_URL, WHATSAPP_URL, manifesto, manifestoClosing, manifestoTitle } from "@/data/manifesto";

export const metadata = { title: "Manifesto | DPRIME" };

export default function ManifestoPage() {
  return (
    <ManifestoReveal
      title={manifestoTitle}
      sentences={manifesto}
      closing={manifestoClosing}
      discordUrl={DISCORD_URL}
      whatsappUrl={WHATSAPP_URL}
      audioSrc={AUDIO_SRC}
    />
  );
}
