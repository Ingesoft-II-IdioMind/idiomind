import "app/styles/main.scss";
import { WelcomeBanner } from "app/components/home/Welcome/WelcomeBanner";
import { Reasons } from "app/components/home/Welcome/Reasons";
import { ModuleFAQ } from "app/components/home/Welcome/FAQ";
import { FirstMessage } from "app/components/home/Welcome/FirstMessage";
import { SecondMessage } from "app/components/home/Welcome/SecondMessage";

export default function Home() {
  return (
    <>
      <WelcomeBanner/>
      <FirstMessage />
      <Reasons/>
      <SecondMessage/>
      <ModuleFAQ />
    </>
  );
}
