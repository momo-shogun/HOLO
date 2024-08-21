import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className=" py-8 w-full">
      <Separator className="my-4 pu-8" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className=" text-sm">
            Designed and developed by{" "}
            <a
              className="font-semibold text-primary hover:text-primary-dark"
              href="#"
            >
              Krishna
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
