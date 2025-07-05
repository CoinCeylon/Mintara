import Heading from "@components/heading";
import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <main className="max-w-7xl mx-auto overflow-hidden">
      <div className="mt-[60px]">
        <Heading>Join the Battle</Heading>
        <RegisterForm />
      </div>
    </main>
  );
}
