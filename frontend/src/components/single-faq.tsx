import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Props = {
  question: string;
  answer: string;
};

export default function SingleFaq({ question, answer }: Props) {
  return (
    <div className="">
      <AccordionItem value={question}>
        <AccordionTrigger className="text-primary_color">
          {question}
        </AccordionTrigger>
        <AccordionContent className="text-primary_color">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
