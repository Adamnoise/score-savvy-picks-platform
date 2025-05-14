
import { motion } from "framer-motion";
import React from "react";

interface AnimatedGroupProps {
  children: React.ReactNode;
  variants?: {
    container?: any;
    item?: any;
  };
  className?: string;
}

export function AnimatedGroup({ children, variants, className }: AnimatedGroupProps) {
  const containerVariants = variants?.container || {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = variants?.item || {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  // Map children to motion.div with variants
  const animatedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // Fix the type issue by using proper type casting
      return React.cloneElement(child, {
        ...child.props,
        as: motion.div,
        variants: itemVariants,
        key: index,
      });
    }
    return child;
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {animatedChildren}
    </motion.div>
  );
}
