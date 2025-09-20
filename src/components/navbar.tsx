import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <nav className="z-10 fixed top-0 left-0 bg-background/65 backdrop-blur-md flex justify-end p-2  border-b-[0.5px]  inset-x-0">
      <ModeToggle />
    </nav>
  );
};
