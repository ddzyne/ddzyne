import React from 'react'
import { motion } from 'framer-motion'

export const SlideInLeft = (props) =>
  <motion.div 
    {...props}
    initial={{ x: "-100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "-100%", opacity: 0 }}>
    {props.children}
  </motion.div>

export const SlideInRight = (props) =>
  <motion.div 
    {...props}
    initial={{ x: "100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "100%", opacity: 0 }}>
    {props.children}
  </motion.div>

export const SlideInUp = (props) =>
  <motion.div
    {...props}
    positionTransition
    initial={{ y: 500, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 500, opacity: 0 }}>
    {props.children}
  </motion.div>

export const FadeIn = (props) =>
  <motion.div
    {...props}
    initial={{opacity: 0 }}
    animate={{opacity: 1 }}
    exit={{opacity: 0 }}>
    {props.children}
  </motion.div>