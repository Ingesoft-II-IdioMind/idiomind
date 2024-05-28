import { AboutUsContent } from "app/components/home/AboutUs";
import { TeamCards } from "app/components/home/TeamCard";

export default function AboutUs() {
  return (
    <>
      <h1>About us</h1>
      <p className="ST">
        Idiomind transforms the language learning experience, offering our users
        a customizable approach that adapts to their individual needs, through
        immersive and effective tools.
      </p>
      <AboutUsContent />
      <h2>Development team:</h2>
      <TeamCards />
    </>
  );
}
