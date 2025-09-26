export function GridBackground() {
  return (
    <div
      className="-z-10  inset-x-0 mx-auto  h-screen fixed top-0 left-0 bg-transparent [--line-color:var(--color-border)]  
        bg-[linear-gradient(0deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,var(--line-color)_25%,var(--line-color)_26%,transparent_27%,transparent_74%,var(--line-color)_75%,var(--line-color)_76%,transparent_77%,transparent)]
        bg-[size:55px_55px] mask-radial-from-0 "
    />
  );
}
