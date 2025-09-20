// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "./ui/button";
// import { XIcon } from "lucide-react";

// export const ModalButton = ({ children }: { children: React.ReactNode }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const handleKeyPress = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsModalOpen(false);
//       } else if (event.key === "e" && !isModalOpen) {
//         // We check !isModalOpen here to prevent re-opening if it's already open
//         setIsModalOpen(true);
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);

//     // Cleanup listener on component unmount
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//     // Add isModalOpen to the dependency array
//     // This ensures the key press logic always has the latest state
//   }, [isModalOpen]);

//   const enter = `
// ███████╗███╗   ██╗████████╗███████╗██████╗
// ██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
// █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
// ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
// ███████╗██║ ╚████║   ██║   ███████╗██║  ██║
// ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
//   `;

//   return (
//     <>
//       <Button size={"lg"} onClick={() => setIsModalOpen(true)}>
//         {children}
//       </Button>

//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-screen h-screen bg-background border-r-4 z-50 p-8 flex justify-center items-center"
//             // --- ANIMATION CHANGES START ---
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
//             // initial={{ opacity: 0, scale: 0.95 }}
//             // animate={{ opacity: 1, scale: 1 }}
//             // exit={{ opacity: 0, scale: 0.95 }}
//             // transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             // --- ANIMATION CHANGES END ---
//           >
//             {/* Added a container to keep your content centered and sized appropriately */}
//             <div className="flex flex-col justify-center items-center gap-y-2 relative w-full max-w-md">
//               <div
//                 className="absolute -top-12 -right-4 sm:top-4 sm:right-4 cursor-pointer"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <XIcon />
//               </div>

//               <pre className="[line-height:1] text-[10px]">{enter}</pre>

//               <input
//                 className="font-mono p-2 rounded-md border border-neutral-100"
//                 placeholder="username"
//               />

//               <input
//                 className="font-mono p-2 rounded-md border border-neutral-100"
//                 placeholder="password"
//               />

//               <Button className="bg-neutral-100 text-background ">
//                 Submit
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "./ui/button";
// import { XIcon } from "lucide-react";

// // Define animation variants for the container and its children
// const modalVariants = {
//   open: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1, // This will orchestrate the children's animations
//       delayChildren: 0.2, // A small delay before the children start animating
//     },
//   },
//   closed: {
//     opacity: 0,
//   },
// };

// const itemVariants = {
//   open: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 24,
//     },
//   },
//   closed: { y: 20, opacity: 0 },
// };

// export const ModalButton = ({ children }: { children: React.ReactNode }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const handleKeyPress = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setIsModalOpen(false);
//       else if (event.key === "e" && !isModalOpen) setIsModalOpen(true);
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [isModalOpen]);

//   const enter = `
// ███████╗███╗   ██╗████████╗███████╗██████╗
// ██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
// █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
// ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
// ███████╗██║ ╚████║   ██║   ███████╗██║  ██║
// ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
//   `;

//   return (
//     <>
//       <Button size={"lg"} onClick={() => setIsModalOpen(true)}>
//         {children}
//       </Button>

//       <AnimatePresence>
//         {isModalOpen && (
//           // The main container now just fades in/out. Its only job is to be the backdrop
//           // and orchestrate the children's animations.
//           <motion.div
//             className="fixed top-0 left-0 w-screen h-screen bg-background z-50 p-8 flex justify-center items-center"
//             initial="closed"
//             animate="open"
//             exit="closed"
//             variants={modalVariants}
//           >
//             {/* We wrap the content in a motion.div to apply the item variants */}
//             <div className="flex flex-col justify-center items-center gap-y-2 relative">
//               <motion.div
//                 variants={itemVariants}
//                 className="absolute -top-16 -right-16 cursor-pointer"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <XIcon />
//               </motion.div>

//               <motion.pre
//                 variants={itemVariants}
//                 className="[line-height:1] text-[10px]"
//               >
//                 {enter}
//               </motion.pre>

//               <motion.input
//                 variants={itemVariants}
//                 className="font-mono p-2 rounded-md border border-neutral-100"
//                 placeholder="username"
//               />

//               <motion.input
//                 variants={itemVariants}
//                 className="font-mono p-2 rounded-md border border-neutral-100"
//                 placeholder="password"
//               />

//               <motion.div variants={itemVariants}>
//                 <Button className="bg-neutral-100 text-background ">
//                   Submit
//                 </Button>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

export const ModalButton = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect remains the same
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
      else if (event.key === "e" && !isModalOpen) setIsModalOpen(true);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  return (
    <>
      <Button size={"sm"} onClick={() => setIsModalOpen(true)}>
        {children}
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-background z-50 p-8 flex justify-center items-center"
            // --- ANIMATION CHANGES START ---
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(75% at 50% 50%)" }} // 75% is enough to cover the corners
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
            // --- ANIMATION CHANGES END ---
          >
            {/* The content inside can have its own subtle fade-in animation */}
            {/* This makes it appear just after the iris wipe is completing */}
            <motion.div
              className="flex flex-col justify-center items-center gap-y-2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <EnterModal setIsModalOpen={setIsModalOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const EnterModal = ({ setIsModalOpen }: { setIsModalOpen: any }) => {
  const enter = `
███████╗███╗   ██╗████████╗███████╗██████╗
██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
█████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
███████╗██║ ╚████║   ██║   ███████╗██║  ██║
╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
  `;

  const login = `
██╗      ██████╗  ██████╗     ██╗███╗   ██╗
██║     ██╔═══██╗██╔════╝     ██║████╗  ██║
██║     ██║   ██║██║  ███╗    ██║██╔██╗ ██║
██║     ██║   ██║██║   ██║    ██║██║╚██╗██║
███████╗╚██████╔╝╚██████╔╝    ██║██║ ╚████║
╚══════╝ ╚═════╝  ╚═════╝     ╚═╝╚═╝  ╚═══╝
  `;
  return (
    <>
      <div
        className="absolute -top-5 -right-7 cursor-pointer"
        onClick={() => setIsModalOpen(false)}
      >
        <XIcon />
      </div>
      <pre className="ascii-art text-[6px] lg:text-[8px]">{login}</pre>
      {/* <h1 className="font-bold text-2xl font-mono">Enter TmpLockr</h1> */}
      <Input placeholder="username" />
      <Input placeholder="password" />
      <Button>Submit</Button>
    </>
  );
};

export const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      className="font-mono px-2 py-1 outline-none border-b-[0.1px] border-neutral-100 shadow-none "
      placeholder={placeholder}
    />
  );
};
