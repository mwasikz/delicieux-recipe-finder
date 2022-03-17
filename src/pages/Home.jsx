import React from 'react'
import Bangladeshi from "../components/Bangladeshi";
import Popular from "../components/Popular";
import { motion } from 'framer-motion';

function Home() {
    return (
        <motion.div
         animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
            <Bangladeshi />
            <Popular />
        </motion.div>
    );
};

export default Home;