import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import uuidv4 from '../utils/genUUID';

const DisplayQuestion = (params) => {
    const {question , type , children , index , prefix } = params;
    const renderChildren = (question_object , index)=>{
        let flag = 0;
        if(index === children.length - 1){
            flag = 1;
        }
        return (
        <>
            <DisplayQuestion key={question_object.id} {...question_object} index={index} prefix={prefix + (params.index + 1) + "."}/>
            {flag !== 1 ?<span className="h-[1px] w-full bg-white/10 mx-auto" /> :<></>}
        </>
    );
    }
    return (
    <div className="flex flex-col w-full">
        <div className="flex gap-5 h-[51px] px-5 w-full">
            <div className="w-full flex gap-[12px] text-xl items-center justify-start">
                <p className="w-fit">
                    {prefix}{index + 1}
                </p>
                <div className="w-full h-full text-white bg-primary flex items-center justify-start px-3 outline-none border-none">
                    {question}
                </div>
            </div>
            <div className="flex w-fit max-w-[250px] min-w-fit gap-2 bg-primary items-center justify-center px-3 ">
                {type === "sa" ? <p>Short Answer</p> : <p>True / False</p>}
            </div>
        </div>
        {type === "tf" && children && children.length > 0 ? 
            <>
                <span className="h-[1px] w-full bg-white/10 mx-auto" />
                <div  className="flex flex-col">
                    {children.map(renderChildren)}
                </div>
            </>
        :<></>}
    </div>
  )
}

export default DisplayQuestion