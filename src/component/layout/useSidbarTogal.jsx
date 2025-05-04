import React, { useEffect } from 'react'

const useSidbarTogal = ({setdata, setget, isOpen}) => {

    useEffect(() => {
        if (isOpen) {
          openNav();
        } else {
          closeNav();
        }
      }, [isOpen]);
    
      const openNav=()=> {
        setdata(280);
        setget(280);
      }
      const closeNav=()=> {
        setdata(0);
        setget(0);
      }
}

export default useSidbarTogal
