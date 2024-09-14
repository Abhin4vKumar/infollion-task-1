import { useEffect, useState } from "react";
import Question from "./components/Question";
import uuidv4 from "./utils/genUUID";
import DisplayQuestion from "./components/DisplayQuestion";

function App() {
  const [rootQuestions , setRootQuestions] = useState([]);
  const [updateSignal , setUpdateSignal] = useState(0);
  const [submitPageDisplay , setSubmitPageDisplay] = useState(0);
  //Structure (Recursive)
  //Question , Type , Delete Button
  //Add Child Question Element
  //State Structure
  // [{
  //   question:"",
  //   type:"sa" / "tf",
  //   children : [
  //     //again question
  //   ]
  // }]

  useEffect(()=>{
    const state = localStorage.getItem('state');
    if(state && state.trim() != ""){
      const parsedState = JSON.parse(state);
      setRootQuestions(parsedState);
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('state', JSON.stringify(rootQuestions));
  },[updateSignal,rootQuestions])

  const addQuestion = (e)=>{
    const id = uuidv4();
    const question_object = {
      id:id,
      question:"",
      type:"sa",
      ans:"F",
      children:[],
    }
    setRootQuestions((prev)=>{
      return [...prev , question_object];
    })
  }

  const renderQuestions = (question_object , index) =>{
    return (<Question key={question_object.id} {...question_object} index={index} prefix={"Q."} updateState={setRootQuestions}  sendSignal={setUpdateSignal} version={updateSignal} />);
  }

  const renderQuestionsDisplay = (question_object , index) =>{
    let flag = 0;
    if(index === rootQuestions.length - 1){
      flag = 1;
    }
    return (
    <>
      <DisplayQuestion key={question_object.id} {...question_object} index={index} prefix={"Q."} />
      {flag !== 1 ?<span className="h-[1px] w-full bg-white/10 mx-auto" /> :<></>}
    </>
    );
  }
  
  const handleSubmit = (e)=>{
    setSubmitPageDisplay(1);
  }

  const handleClose = (e)=>{
    setSubmitPageDisplay(0);
  }
  return (
    <div className="h-svh relative w-screen overflow-x-hidden bg-primary">
      <nav className="top-0 sticky border-b-[1px] border-accent-hover w-full h-[60px] bg-primary z-50 items-center justify-between text-3xl flex px-5">QuestionList <button onClick={handleSubmit} className="text-primary bg-accent rounded-full p-2 text-sm">Submit</button></nav>
      <div className="flex flex-col gap-5 mt-5">
        {/* Root Level Questions */}
        {rootQuestions && rootQuestions.length === 0 ? <p className="w-full h-[50px] flex items-center justify-center text-lg">No Questions Available</p>:<></>}
        {rootQuestions && rootQuestions.length ? rootQuestions.map(renderQuestions) : <></>}
      </div>
      <div className="w-full flex items-center justify-center mt-5 mb-5">
        <button onClick={addQuestion}>Add New Question</button>
      </div>
      {submitPageDisplay === 1 ? 
      <div className="fixed top-0 left-0 h-svh w-screen z-[60] bg-primary">
        <nav className="top-0 sticky border-b-[1px] border-accent-hover w-full h-[60px] bg-primary z-[70] items-center justify-between text-3xl flex px-5">QuestionList <button onClick={handleClose} className="text-primary bg-accent rounded-full p-2 text-sm">Close</button></nav>
        <div className="flex flex-col">
          {rootQuestions && rootQuestions.length ? rootQuestions.map(renderQuestionsDisplay) : <></>}
        </div>
      </div>:<></>}
    </div>
  );
}

export default App;
