import { FC } from "react";
import Logo from "./ui/Logo";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div  className="  pt-4 mt-6">
      <footer className="footer items-center p-4   ">
        <aside className="items-center grid-flow-col">
          <Logo sidebar={false} />
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end md:pr-12  ">
          <a>
            <TwitterLogoIcon className="h-5 w-5 " />
          </a>
          <a>
            <GitHubLogoIcon className="h-5 w-5 " />
          </a>
          <a>
            <LinkedInLogoIcon className="h-5 w-5" />
          </a>
          <a>
            <InstagramLogoIcon className="h-5 w-5" />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
