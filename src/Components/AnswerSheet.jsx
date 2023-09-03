import React from 'react';
import { Document, Page } from 'react-pdf';

const AnswerSheet = () => {
  return (
    <div>

      <img width="80%" src='https://i.ibb.co/mhgCbnS/markerpaper-compressed.jpg'
      onClick={()=>{
        window.open("https://github.com/TusharAMD/hack-for-classroom/raw/master/public/markerpaper.pdf")
      }}
      >

      </img>

    </div>
  );
};

export default AnswerSheet;
