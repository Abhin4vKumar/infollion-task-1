import { useState } from "react";
import Question from "./components/Question";
import { FaPlus } from "react-icons/fa6";
import uuidv4 from "./utils/genUUID";

function App() {
  const [rootQuestions , setRootQuestions] = useState([]);
  const [updateSignal , setUpdateSignal] = useState(0);
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
  const validityCheck = (str) => {
    if(str && str.length && str.trim() !== ""){
      return true;
    }
    return false;
  }
  
  const addQuestion = (e)=>{
    const id = uuidv4();
    const question_object = {
      id:id,
      question:"",
      type:"sa",
      children:[],
    }
    setRootQuestions((prev)=>{
      return [...prev , question_object];
    })
  }

  const renderQuestions = (question_object , index) =>{
    return (<Question key={question_object.id} {...question_object} index={index} prefix={"Q."} updateState={setRootQuestions} validityCheck={validityCheck}  sendSignal={setUpdateSignal} version={updateSignal} />);
  }

  return (
    <div className="h-svh w-screen overflow-x-hidden bg-primary">
      <nav className="top-0 sticky border-b-[1px] border-accent-hover w-full h-[60px] bg-primary z-50 items-center justify-between text-3xl flex px-5">QuestionList <button className="text-primary bg-accent rounded-full p-2 text-sm">Submit</button></nav>
      <div className="flex flex-col gap-5">
        {/* Root Level Questions */}
        {rootQuestions && rootQuestions.length === 0 ? <p className="w-full h-[50px] flex items-center justify-center text-lg">No Questions Available</p>:<></>}
        {rootQuestions && rootQuestions.length ? rootQuestions.map(renderQuestions) : <></>}
      </div>
      <div className="w-full flex items-center justify-center">
        <button onClick={addQuestion}>Add New Question</button>
      </div>
    </div>
  );
}

export default App;
