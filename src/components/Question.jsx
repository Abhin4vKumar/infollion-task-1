import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import uuidv4 from '../utils/genUUID';

const Question = (params) => {
    const {question , type , children , index , updateState , sendSignal , validityCheck , prefix , version} = params;
    const [questionValue , setQuestionValue] = useState(question);
    const [questionType , setQuestionType] = useState(type);
    const [childrenState , setChildrenState] = useState(children);
    const [updateSignal , setUpdateSignal] = useState(version);
    const [localVersion , setLocalVersion] = useState(0);
    const [ans , setAns] = useState("F");

    useEffect(()=>{
        if(updateSignal !== version){
            handleUpdate();
        }
    },[updateSignal])

    useEffect(()=>{
        if(localVersion !== 0){
            handleUpdate();
        }else{
            setLocalVersion((prev)=>prev+1);
        }
    },[questionValue,questionType,childrenState])

    const handleUpdate = (e)=>{
        //update at index of rootQuestions
        updateState((prev)=>{
            let temp = prev;
            temp[index] = {
                id:params.id,
                question:questionValue,
                type:questionType,
                children:childrenState
            };
            return temp;
        })
        if(updateSignal != version){
            //signal is comming from child
            sendSignal(updateSignal);
        }else{
            //updated current node , child nodes are same
            sendSignal(updateSignal+1);
        }
    }
    
    const updateQuesValue = (e)=>{
        setQuestionValue(e.target.value);
    }

    const updateQuesType = (e)=>{
        setQuestionType(e.target.value);
    }
    
    const addQuestion = (e)=>{
        const id = uuidv4();
        const questionObject = {
            id:id,
            question:"",
            type:"sa",
            children:[],
        }
        setChildrenState((prev)=>{
            return [...prev , questionObject];
        })
        setUpdateSignal((prev)=>prev+1);
    }

    const deleteQuestion = (e)=>{
        updateState((prev)=>{
            let temp = prev;
            temp = temp.filter(q=>q.id !== params.id);
            return temp;
        })
        sendSignal(updateSignal + 1);
    }

    const renderChildren = (question_object , index)=>{
        
        return (<Question key={question_object.id} {...question_object} index={index} prefix={prefix + (params.index + 1) + "."} updateState={setChildrenState} validityCheck={validityCheck} sendSignal={setUpdateSignal} version={updateSignal} />);
    }

    return (
    <div className="flex flex-col w-full gap-2">
        <div className="flex gap-5 h-[51px] px-5 w-full">
            <div className="w-full flex gap-[12px] text-xl items-center justify-start">
                <p className="w-fit">
                    {prefix}{index + 1}
                </p>
                <input onChange={updateQuesValue} type="text" className="w-full h-full text-white bg-white/10 px-3 outline-none border-none" value={question} placeholder={prefix + (index + 1)}/>
            </div>
            <div className="flex w-fit max-w-[250px] min-w-fit gap-2">
                <div>
                    <select value={type} onChange={updateQuesType} name="type" className="bg-primary text-white outline-none p-3 h-[51px] border-none">
                        <option value="sa" readOnly>Short Answer</option>
                        <option value="tf" readOnly>True / False</option>
                    </select>
                </div>
                <button onClick={deleteQuestion} className="p-3 w-[51px] h-[51px] bg-primary m-0 border-none outline-none flex items-center justify-center text-2xl text-accent hover:text-accent-hover duration-300"><MdDelete/></button>
                {ans ==="T" && questionType === "tf" ? <button onClick={addQuestion} className="p-3 w-fit h-[51px] bg-primary text-accent hover:text-accent-hover text-2xl m-0 border-none outline-none flex items-center justify-center"><FaPlus/></button> : <></>}
            </div>
        </div>
        <div className="flex items-center justify-center">
        {questionType === "sa" ? 
            <input className="w-3/4 outline-none border-b border-white bg-primary p-2 text-xl" />
         : 
            <select className="bg-primary text-xl p-3 border-none outline-none" value={ans} onChange={(e)=>{setAns(e.target.value)}}>
                <option value="T" readOnly>True</option>
                <option value="F" readOnly>False</option>
            </select>    
        }
        </div>
        {ans === "T" ? 
            <div>
                {childrenState && childrenState.length > 0 ? 
                    <div  className="flex flex-col gap-5">
                        {childrenState.map(renderChildren)}
                    </div>
                :<></>}
            </div>
        :<></>}
    </div>
  )
}

export default Question