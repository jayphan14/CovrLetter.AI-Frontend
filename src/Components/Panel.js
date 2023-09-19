import React, { useState } from 'react'
import { Form, Button, Icon} from 'semantic-ui-react'

function Panel() {
    

    const [selected , setSelected ] = useState(null)
    const [resume , setResume ] = useState(null)
    const [count, setCount] = useState([1])
    const [aiGeneratedLetter, setAiGeneratedLetter] = useState("")
    const toggle = (element_id) => {
        if (selected === element_id){
            return setSelected(null)
        }
        setSelected(element_id)
    }

    async function onFormSubmit(event) {
        var wantedId = (event.target.id);
        var wantedJob = document.getElementById("job-area" + wantedId).value;
        event.preventDefault();
        toggle("closeallelement")
        try {
            var buttonClicked = document.getElementById(wantedId);
            buttonClicked.innerText = "Processing"
            buttonClicked.style.backgroundColor = "orange"
            buttonClicked.style.color = "white"
            const response = await fetch("http://localhost:8000/postData", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputResume : resume, inputJob: wantedJob}),
            });
        
            const data = await response.json();
            
            if (response.status !== 200) {
    
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            document.getElementById("result-area" + String(wantedId)).value = data.result;
            } catch(error) {
            console.error(error);
            alert(error.message);
        }

        //When Finish
        sendToBackend(wantedId)
    }
    const sendToBackend = (item) => {
        console.log("ran") 
        document.getElementById("processButton" + String(item)).style.display = 'none';
        document.getElementById("viewButton" + String(item)).style.display = 'flex';
    }

    const increaseCount = () => {
        setCount(count.concat([count[count.length - 1] + 1]))
    }

    const updateResume = (e) => {
        setResume(e.target.value)
        
        count.forEach(element => {
            document.getElementById("resume-area" + String(element)).value = resume;
        });

    }

    return (
        
        <>
        {count.map((item, i) => {
            return (
                
                <div style = {{maxWidth: "80%", margin: "auto", backgroundColor: 'lightgray', borderRadius:"10px", marginTop : "10px"}}> 
                    <div style = {{display: "flex" , flexDirection : "row", padding: "15px"}}>
                    <div style = {{ display: "flex", flex: 0.01, justifyContent: "center", alignContent : "center"}} > <Button style = {{width:'50px'}} icon = "add" onClick={() => increaseCount()}></Button> </div>
                        <div style = {{ display: "flex", flex: 1, justifyContent: "center", alignContent : "center"}} > <Button style = {{fontSize: '20px'}}onClick={() => toggle("resume-input" + String(item))}> Upload Resume </Button> </div>
                        <div style = {{ display: "flex", flex: 1, justifyContent: "center", alignContent : "center"}} > <Button style = {{fontSize: '20px'}} onClick={() => toggle("job-input"+ String(item))}> Job Description </Button> </div>
                        <div id = {`processButton${item}`} style = {{ display: "flex", flex: 1, justifyContent: "center", alignContent : "center"}} > <Button style = {{fontSize: '20px'}} id =  {String(item)} onClick={(event) => onFormSubmit(event)}> Generate Letter</Button> </div>
                        <div id = {`viewButton${item}`} style = {{ display: "none", flex: 1, justifyContent: "center", alignContent : "center"}} > <Button id =  {"view" + String(item)} onClick={() => toggle("process" + String(item))} style = {{fontSize: '20px', backgroundColor: "green", color:"white"}}> View </Button> </div>
                    </div>
                        
                        <Form id = "form" style = {{margin: "auto", maxWidth:"99%" }}>
                            <div class = {selected === ("resume-input" + String(item))  ? "show" : "hide" }>
                                <textarea id = {"resume-area" + String(item)} 
                                
                                onChange = {(e) => updateResume(e)} 
                                value = {resume} 
                                style = {{height: "1500px", borderRadius: "10px"}} 
                                placeholder='Paste Your Resume Here...' />
                            </div>

                            <div class = {selected === ("job-input" + String(item)) ? "show" : "hide" }>
                                <textarea id = {"job-area" + String(item)} style = {{height: "1500px", borderRadius: "10px"}}  placeholder='Paste Your Job Description Here...' />
                            </div>

                            <div id = {"process" + String(item)} class = {selected === "process" + String(item) ? "show" : "hide" }>
                                <textarea id = {"result-area" + String(item)} style = {{height: "1500px"}}  />
                            </div>
                        </Form>
                    
                    <div style = {{height: "5px"}}>

                    </div>
                </div>
            )
            
        })}
        </>
        
    )
}
export default Panel ;
