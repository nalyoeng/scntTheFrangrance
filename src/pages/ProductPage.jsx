import React, { useState, useEffect } from 'react';

const Mainpage = () => {
  const texts = ['WELCOME TO OUR SHOPPING SITE!', 'ENJOY YOUR SHOPPING!', 'BEST DEALS FOR YOU!'];
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);   // index of text in `texts`
  const [subIndex, setSubIndex] = useState(0); // index of character
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && subIndex < texts[index].length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(texts[index].substring(0, subIndex + 1));
        setSubIndex(subIndex + 1);
      }, 100); // typing speed
    } else if (isDeleting && subIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(texts[index].substring(0, subIndex - 1));
        setSubIndex(subIndex - 1);
      }, 50); // deleting speed
    } else if (!isDeleting && subIndex === texts[index].length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && subIndex === 0) {
      // Move to next text
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, texts, index]);

  return (
    <div className="w-[90%] lg:h-100 h-[250px] flex m-auto mt-20">
      <div className="w-[800px] m-auto">
        <p className="lg:text-7xl md:text-5xl font-serif">{displayedText}|</p>
      </div>
      <img className="lg:w-[600px] w-[250px] h-full" src="/img/main.jpg" alt="main" />
    </div>
  );
};

export default Mainpage;
