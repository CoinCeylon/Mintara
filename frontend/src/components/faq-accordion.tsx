import React from "react";
import { faqItem } from "@/lib/data";
import { Accordion } from "@components/ui/accordion";
import SingleFaq from "@/components/single-faq";
import { Icons } from "@components/ui/icons";
import Heading from "./heading";

const FaqAccordion = () => {
  return (
    <>
      <Heading>Frequently Asked Questions</Heading>
      <div className="relative ">
        <div className="mx-auto  px-[24px] py-[40px] w-full">
          <Icons.topLeftBorder className="absolute top-0 left-0" />
          <Icons.topRightBorder className="absolute top-0 right-0" />
          <Icons.bottomLeftBorder className="absolute bottom-0 left-0" />
          <Icons.bottomRightBorder className="absolute bottom-0 right-0" />
          <Accordion type="single" collapsible>
            {faqItem.map((item) => (
              <SingleFaq
                key={item.answer}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FaqAccordion;
