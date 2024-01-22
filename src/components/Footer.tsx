import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <footer className="border-top w-100 position-fixed bottom-0 bg-dark text-light text-center py-1">
        <div>Created by Liron David-Shiloah &copy;</div>
      </footer>
    </>
  );
};

export default Footer;
