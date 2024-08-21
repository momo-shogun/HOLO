import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";

function MnemonicCont({ mnemonic }) {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            Your Secret Phrase
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2">
              {mnemonic.split(" ").map((word, index) => (
                <div className="col-span-1" key={index}>
                  <div className=" p-3 bg-gray-700 rounded-md text-xl  text-white">
                    {word}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default MnemonicCont;
